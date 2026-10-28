import { java } from './mark.js';

export default function ocp(tx) {
  return {
    id: 'ocp',
    letter: 'O',
    color: 'blue',
    nameEn: 'Open/Closed Principle',
    nameEs: 'Principio Abierto/Cerrado',
    tagline: tx(
      'Permite agregar nuevos comportamientos sin modificar constantemente el código existente.',
      'Let new behavior be added without constantly modifying existing code.'
    ),
    definition: tx(
      'Agregar una variante nueva debería ser agregar código, no editar el que ya funciona.',
      'Adding a new variant should mean adding code, not editing code that already works.'
    ),
    solves: tx(
      'Cadenas de if/else que crecen y se rompen con cada caso nuevo.',
      'if/else chains that grow and break with every new case.'
    ),
    focus: tx('si agregar una variante obliga a editar código existente', 'whether adding a variant forces you to edit existing code'),
    summary: {
      question: tx('¿Agregar un caso nuevo me obliga a editar el núcleo?', 'Does adding a new case force me to edit the core?'),
      signal: tx('if/else o switch sobre un «tipo» repetidos en varios métodos.', 'if/else or switch on a "type" repeated across methods.'),
      solution: tx('Una interfaz para la variación y una clase por variante.', 'An interface for the variation and one class per variant.'),
      example: 'ProcesadorPagos + MetodoPago (Tarjeta, Yape, Plin…)',
    },
    visual: {
      takeaway: tx('El núcleo no se toca: las variantes nuevas se enchufan como clases nuevas.', 'The core stays untouched: new variants plug in as new classes.'),
      before: {
        caption: tx('cada método nuevo = editar el if', 'each new method = edit the if'),
        description: tx('ProcesadorPagos contiene una cadena de if/else por cada método de pago.', 'ProcesadorPagos contains an if/else chain for every payment method.'),
        rows: [[
          {
            title: 'ProcesadorPagos',
            status: 'bad',
            chips: ['if TARJETA', 'else if TRANSFERENCIA', 'else if YAPE', { text: 'else if PLIN ✏️', status: 'bad' }],
          },
        ]],
      },
      after: {
        caption: tx('cada método nuevo = una clase nueva', 'each new method = one new class'),
        description: tx('ProcesadorPagos usa la interfaz MetodoPago; cada método de pago la implementa y Plin se agrega como clase nueva.', 'ProcesadorPagos uses the MetodoPago interface; each payment method implements it and Plin is added as a new class.'),
        rows: [[
          { title: 'ProcesadorPagos', note: tx('no cambia', 'never changes') },
          { arrow: 'forward', label: tx('usa', 'uses') },
          { title: 'MetodoPago', kind: 'interface' },
          { arrow: 'backward', label: tx('implementan', 'implement') },
          {
            group: tx('se agregan', 'added'),
            items: [
              { title: 'PagoConTarjeta' },
              { title: 'PagoConYape' },
              { title: 'PagoConPlin', status: 'new', note: tx('nuevo', 'new') },
            ],
          },
        ]],
      },
    },
    steps: {
      simple: [
        {
          type: 'p',
          text: tx(
            'Piensa en los enchufes de tu casa: cuando compras un aparato nuevo, lo conectas. No llamas a un electricista para recablear la pared. La pared está **cerrada** (no la tocas), pero **abierta** a aparatos nuevos.',
            'Think of the sockets in your house: when you buy a new appliance, you plug it in. You do not call an electrician to rewire the wall. The wall is **closed** (you do not touch it) but **open** to new appliances.'
          ),
        },
        {
          type: 'p',
          text: tx(
            'En código: cuando el negocio pide un comportamiento nuevo **del mismo tipo** (otro método de pago, otro formato de reporte), lo ideal es **agregar** una clase nueva en lugar de **editar** una y otra vez la misma clase central.',
            'In code: when the business asks for new behavior **of the same kind** (another payment method, another report format), ideally you **add** a new class instead of **editing** the same central class over and over.'
          ),
        },
        {
          type: 'cards',
          items: [
            {
              title: tx('Abierto a extensión', 'Open for extension'),
              text: tx('Puedes sumar comportamientos nuevos.', 'You can add new behavior.'),
              tone: 'good',
            },
            {
              title: tx('Cerrado a modificación', 'Closed for modification'),
              text: tx('El código que ya funciona y está probado no se toca para lograrlo.', 'Working, tested code is not touched to achieve it.'),
              tone: 'info',
            },
          ],
        },
      ],
      scenario: [
        {
          type: 'p',
          text: tx(
            'Tu equipo mantiene el módulo de pagos de una app peruana. Se aceptan **tarjeta**, **transferencia bancaria** y **Yape**. Producto anuncia: «el próximo sprint agregamos **Plin**», y ya se habla de PagoEfectivo.',
            'Your team maintains the payments module of a Peruvian app. It accepts **card**, **bank transfer** and **Yape**. Product announces: "next sprint we add **Plin**", and PagoEfectivo is already being discussed.'
          ),
        },
        {
          type: 'table',
          headers: [tx('Método', 'Method'), tx('Comisión (ficticia)', 'Fee (fictional)'), tx('Cómo se cobra', 'How it is charged')],
          rows: [
            [tx('Tarjeta', 'Card'), '3.5 %', tx('Pasarela de tarjetas', 'Card gateway')],
            [tx('Transferencia', 'Bank transfer'), 'S/ 2.00', tx('Orden al banco', 'Order to the bank')],
            ['Yape', 'S/ 0', tx('API de la billetera', 'Wallet API')],
            [tx('Plin (nuevo)', 'Plin (new)'), 'S/ 0', tx('API de la billetera', 'Wallet API')],
          ],
        },
      ],
      bad: [
        {
          type: 'p',
          text: tx(
            'Así quedó `ProcesadorPagos` después de agregar Plin «a la manera rápida». Las líneas en rojo son las ramas que hubo que editar. Los `println` representan las llamadas reales a cada proveedor.',
            'This is how `ProcesadorPagos` looked after adding Plin "the quick way". The red lines are the branches that had to be edited. The `println` calls stand in for the real calls to each provider.'
          ),
        },
        java(`
import java.math.BigDecimal;
import java.math.RoundingMode;
import org.springframework.stereotype.Service;

@Service
public class ProcesadorPagos {

    public BigDecimal procesar(String metodo, BigDecimal monto) {
        BigDecimal total = monto.add(calcularComision(metodo, monto));

!        if (metodo.equals("TARJETA")) {
            System.out.println("Cobrando S/ " + total + " con la pasarela de tarjetas");
!        } else if (metodo.equals("TRANSFERENCIA")) {
            System.out.println("Generando orden de transferencia por S/ " + total);
!        } else if (metodo.equals("YAPE")) {
            System.out.println("Enviando cobro de S/ " + total + " a la API de Yape");
!        } else if (metodo.equals("PLIN")) {
!            System.out.println("Enviando cobro de S/ " + total + " a la API de Plin");
        } else {
            throw new IllegalArgumentException("Método no soportado: " + metodo);
        }
        return total;
    }

    private BigDecimal calcularComision(String metodo, BigDecimal monto) {
!        if (metodo.equals("TARJETA")) {
            return monto.multiply(new BigDecimal("0.035")).setScale(2, RoundingMode.HALF_UP);
!        } else if (metodo.equals("TRANSFERENCIA")) {
            return new BigDecimal("2.00");
!        } else if (metodo.equals("YAPE") || metodo.equals("PLIN")) {
            return BigDecimal.ZERO;
        }
        throw new IllegalArgumentException("Método no soportado: " + metodo);
    }
}`, {
          title: 'ProcesadorPagos.java',
          tone: 'bad',
          lineNumbers: true,
          unit: 'ocp-bad',
          notes: [
            tx('Para agregar Plin hubo que tocar **dos** cadenas de `if/else` dentro de la misma clase.', 'Adding Plin required touching **two** `if/else` chains inside the same class.'),
            tx('Los códigos `"TARJETA"`, `"YAPE"`… son strings mágicos repetidos en varios lugares.', 'The codes `"TARJETA"`, `"YAPE"`… are magic strings repeated in several places.'),
            tx('Las reglas de todos los proveedores conviven en una sola clase.', 'Every provider\'s rules live together in one class.'),
          ],
        }),
      ],
      why: [
        {
          type: 'cards',
          items: [
            {
              title: tx('Qué está ocurriendo', 'What is happening'),
              text: tx(
                'Cada método de pago nuevo obliga a abrir `ProcesadorPagos` y añadir ramas en varios lugares.',
                'Every new payment method forces you to open `ProcesadorPagos` and add branches in several places.'
              ),
            },
            {
              title: tx('Por qué es un problema', 'Why it is a problem'),
              text: tx(
                'La clase crece sin límite y mezcla las reglas de todos los proveedores. Tocarla para agregar Plin puede romper el cobro con tarjeta, que ya funcionaba.',
                'The class grows without limit and mixes every provider\'s rules. Touching it to add Plin can break card payments, which already worked.'
              ),
            },
            {
              title: tx('Consecuencias en producción', 'Consequences in production'),
              text: tx(
                'Si alguien agrega `"PAGOEFECTIVO"` en `procesar` pero olvida `calcularComision`, el error aparece recién en producción, con un cliente intentando pagar.',
                'If someone adds `"PAGOEFECTIVO"` to `procesar` but forgets `calcularComision`, the error only shows up in production, with a customer trying to pay.'
              ),
            },
            {
              title: tx('Dificultades de mantenimiento', 'Maintenance pain'),
              text: tx(
                'Dos equipos integrando proveedores a la vez editan el mismo archivo. Cada cambio exige volver a probar todos los métodos de pago.',
                'Two teams integrating providers at the same time edit the same file. Every change requires retesting every payment method.'
              ),
            },
          ],
        },
        {
          type: 'details',
          title: tx('¿Cómo identifico una violación de OCP?', 'How do I spot an OCP violation?'),
          blocks: [
            {
              type: 'list',
              items: [
                tx('`if/else` o `switch` sobre un «tipo» que se repiten en varios métodos.', '`if/else` or `switch` on a "type" repeated across methods.'),
                tx('Cada variante nueva modifica la misma clase central.', 'Every new variant modifies the same central class.'),
                tx('Comentarios como `// agregar nuevo método de pago aquí`.', 'Comments such as `// add new payment method here`.'),
                tx('Bugs que aparecen al olvidar una rama en uno de los `if`.', 'Bugs caused by forgetting a branch in one of the `if`s.'),
              ],
            },
          ],
        },
      ],
      fix: [
        {
          type: 'p',
          text: tx(
            'La idea: identificar **lo que varía** (cómo se calcula la comisión y cómo se cobra) y darle una interfaz. Cada método de pago será una clase que implementa esa interfaz.',
            'The idea: identify **what varies** (how the fee is calculated and how the charge is made) and give it an interface. Each payment method becomes a class implementing it.'
          ),
        },
        {
          type: 'steps',
          items: [
            {
              title: tx('Define el contrato de lo que varía', 'Define a contract for what varies'),
              blocks: [
                java(`
import java.math.BigDecimal;

public interface MetodoPago {

    /** Código con el que el cliente elige el método: "TARJETA", "YAPE"... */
    String codigo();

    BigDecimal calcularComision(BigDecimal monto);

    void cobrar(BigDecimal total);
}`, { title: 'MetodoPago.java', unit: 'ocp-good' }),
              ],
            },
            {
              title: tx('Una clase por método de pago', 'One class per payment method'),
              blocks: [
                java(`
import java.math.BigDecimal;
import java.math.RoundingMode;
import org.springframework.stereotype.Component;

@Component
public class PagoConTarjeta implements MetodoPago {

    private static final BigDecimal TASA = new BigDecimal("0.035");

    @Override
    public String codigo() {
        return "TARJETA";
    }

    @Override
    public BigDecimal calcularComision(BigDecimal monto) {
        return monto.multiply(TASA).setScale(2, RoundingMode.HALF_UP);
    }

    @Override
    public void cobrar(BigDecimal total) {
        System.out.println("Cobrando S/ " + total + " con la pasarela de tarjetas");
    }
}`, { title: 'PagoConTarjeta.java', unit: 'ocp-good' }),
                java(`
import java.math.BigDecimal;
import org.springframework.stereotype.Component;

@Component
public class PagoConYape implements MetodoPago {

    @Override
    public String codigo() {
        return "YAPE";
    }

    @Override
    public BigDecimal calcularComision(BigDecimal monto) {
        return BigDecimal.ZERO;
    }

    @Override
    public void cobrar(BigDecimal total) {
        System.out.println("Enviando cobro de S/ " + total + " a la API de Yape");
    }
}`, { title: 'PagoConYape.java', unit: 'ocp-good' }),
                {
                  type: 'p',
                  text: tx(
                    '`PagoConTransferencia` sigue el mismo molde. Cada clase contiene **solo** las reglas de su proveedor.',
                    '`PagoConTransferencia` follows the same template. Each class contains **only** its provider\'s rules.'
                  ),
                },
              ],
            },
            {
              title: tx('El procesador depende de la interfaz', 'The processor depends on the interface'),
              blocks: [
                java(`
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class ProcesadorPagos {

    private final Map<String, MetodoPago> metodos;

!    public ProcesadorPagos(List<MetodoPago> metodos) {
!        this.metodos = metodos.stream()
!                .collect(Collectors.toMap(MetodoPago::codigo, Function.identity()));
!    }

    public BigDecimal procesar(String codigoMetodo, BigDecimal monto) {
        MetodoPago metodo = metodos.get(codigoMetodo);
        if (metodo == null) {
            throw new IllegalArgumentException("Método no soportado: " + codigoMetodo);
        }
        BigDecimal total = monto.add(metodo.calcularComision(monto));
        metodo.cobrar(total);
        return total;
    }
}`, { title: 'ProcesadorPagos.java', tone: 'good', unit: 'ocp-good' }),
                {
                  type: 'p',
                  text: tx(
                    'Spring inyecta en `List<MetodoPago>` **todos** los beans que implementan la interfaz. El procesador ya no sabe cuántos métodos existen ni cómo se llaman. Bonus: si dos clases declaran el mismo código, `Collectors.toMap` falla **al arrancar** la aplicación, no con un cliente pagando.',
                    'Spring injects **every** bean implementing the interface into `List<MetodoPago>`. The processor no longer knows how many methods exist or what they are called. Bonus: if two classes declare the same code, `Collectors.toMap` fails **at startup**, not while a customer is paying.'
                  ),
                },
              ],
            },
            {
              title: tx('Agrega Plin sin tocar nada', 'Add Plin without touching anything'),
              blocks: [
                java(`
import java.math.BigDecimal;
import org.springframework.stereotype.Component;

@Component
public class PagoConPlin implements MetodoPago {

    @Override
    public String codigo() {
        return "PLIN";
    }

    @Override
    public BigDecimal calcularComision(BigDecimal monto) {
        return BigDecimal.ZERO;
    }

    @Override
    public void cobrar(BigDecimal total) {
        System.out.println("Enviando cobro de S/ " + total + " a la API de Plin");
    }
}`, { title: tx('PagoConPlin.java (archivo nuevo)', 'PagoConPlin.java (new file)'), unit: 'ocp-good' }),
                {
                  type: 'callout',
                  tone: 'success',
                  title: tx('Resultado', 'Result'),
                  text: tx(
                    'Archivos modificados para agregar Plin: **cero**. Archivos nuevos: **uno**. `ProcesadorPagos`, `PagoConTarjeta` y `PagoConYape` ni se enteran.',
                    'Files modified to add Plin: **zero**. New files: **one**. `ProcesadorPagos`, `PagoConTarjeta` and `PagoConYape` are not even aware.'
                  ),
                },
              ],
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: tx('OCP no prohíbe modificar código', 'OCP does not forbid modifying code'),
          text: tx(
            'Si hay un bug en `ProcesadorPagos` o cambia el flujo de cobro (por ejemplo, agregar un control antifraude), lo modificas sin culpa. OCP solo dice que no deberías tener que editar el núcleo **cada vez que agregas una variante del mismo tipo**.',
            'If there is a bug in `ProcesadorPagos` or the payment flow changes (say, adding a fraud check), you modify it without guilt. OCP only says you should not have to edit the core **every time you add a variant of the same kind**.'
          ),
        },
        {
          type: 'callout',
          tone: 'info',
          title: tx('No abstraigas para extensiones hipotéticas', 'Do not abstract for hypothetical extensions'),
          text: tx(
            'Si tu sistema solo acepta tarjeta y nadie planea otro método, un código directo es mejor que una interfaz con una sola implementación. Abstrae cuando la variación es real: cuando llega (o se confirma) la segunda variante.',
            'If your system only accepts cards and nobody plans another method, direct code beats an interface with a single implementation. Abstract when the variation is real: when the second variant arrives (or is confirmed).'
          ),
        },
      ],
      compare: [
        {
          type: 'compare',
          before: java(`
public BigDecimal procesar(String metodo, BigDecimal monto) {
    if (metodo.equals("TARJETA")) {
        // cobrar con tarjeta
    } else if (metodo.equals("TRANSFERENCIA")) {
        // cobrar con transferencia
    } else if (metodo.equals("YAPE")) {
        // cobrar con Yape
!    } else if (metodo.equals("PLIN")) {   // ✏️ editado
!        // cobrar con Plin
    }
    // ...y otra cadena igual en calcularComision()
}`),
          after: java(`
// ProcesadorPagos: sin cambios ✅

!@Component
!public class PagoConPlin implements MetodoPago {   // ✨ nuevo
!    public String codigo() { return "PLIN"; }
!    public BigDecimal calcularComision(BigDecimal monto) { return BigDecimal.ZERO; }
!    public void cobrar(BigDecimal total) { /* API de Plin */ }
!}`),
          rows: [
            [tx('Agregar Plin', 'Adding Plin'), tx('Editar 2 cadenas `if/else`', 'Edit 2 `if/else` chains'), tx('Crear `PagoConPlin` (1 archivo nuevo)', 'Create `PagoConPlin` (1 new file)')],
            [tx('Riesgo al agregar', 'Risk when adding'), tx('Puedes romper Tarjeta o Yape', 'You may break Card or Yape'), tx('El código existente no se toca', 'Existing code is untouched')],
            [tx('Reglas de cada proveedor', 'Each provider\'s rules'), tx('Mezcladas en una clase', 'Mixed in one class'), tx('Cada una en su clase', 'Each in its own class')],
            [tx('Tests', 'Tests'), tx('Un test gigante con todas las ramas', 'One giant test with every branch'), tx('Un test pequeño por método', 'One small test per method')],
            [tx('Error de configuración', 'Configuration error'), tx('Rama olvidada → falla en producción', 'Forgotten branch → fails in production'), tx('Código duplicado → falla al arrancar', 'Duplicate code → fails at startup')],
          ],
        },
      ],
      professional: [
        {
          type: 'p',
          text: tx(
            'Spring facilita OCP porque puede inyectar **todas** las implementaciones de una interfaz (`List<Interfaz>` o `Map<String, Interfaz>`). Lo verás en:',
            'Spring makes OCP easy because it can inject **every** implementation of an interface (`List<Interface>` or `Map<String, Interface>`). You will see it in:'
          ),
        },
        {
          type: 'list',
          items: [
            tx('Métodos de pago, canales de notificación y exportadores (PDF, Excel, CSV).', 'Payment methods, notification channels and exporters (PDF, Excel, CSV).'),
            tx('Cálculo de comisiones o tasas por tipo de producto bancario.', 'Fee or rate calculation per banking product type.'),
            tx('Reglas de validación encadenadas: `List<ReglaTransferencia>`, donde agregar una regla es agregar un `@Component`.', 'Chained validation rules: `List<ReglaTransferencia>`, where adding a rule means adding a `@Component`.'),
            tx('El propio Spring: agregas filtros, `HandlerInterceptor` o `HealthIndicator` registrando beans nuevos, sin modificar el framework.', 'Spring itself: you add filters, `HandlerInterceptor`s or `HealthIndicator`s by registering new beans, without modifying the framework.'),
          ],
        },
        {
          type: 'details',
          title: tx('¿Cómo se aplica en Spring Boot?', 'How does it look in Spring Boot?'),
          blocks: [
            {
              type: 'p',
              text: tx(
                'También puedes pedir un `Map<String, MetodoPago>`: Spring usa el **nombre del bean** como clave (`"pagoConTarjeta"`). Funciona, pero acopla tu API al nombre de la clase. Por eso en el ejemplo cada método declara su propio `codigo()`: es una decisión de negocio explícita.',
                'You can also ask for a `Map<String, MetodoPago>`: Spring uses the **bean name** as the key (`"pagoConTarjeta"`). It works, but it couples your API to class names. That is why each method declares its own `codigo()` in the example: an explicit business decision.'
              ),
            },
            {
              type: 'p',
              text: tx(
                'Para activar un método solo en ciertos entornos, combínalo con `@ConditionalOnProperty` o `@Profile`: el procesador sigue sin cambiar.',
                'To enable a method only in some environments, combine it with `@ConditionalOnProperty` or `@Profile`: the processor still does not change.'
              ),
            },
          ],
        },
        {
          type: 'callout',
          tone: 'danger',
          title: tx('Errores comunes', 'Common mistakes'),
          items: [
            tx('Crear interfaces «por si acaso» que tendrán una sola implementación para siempre.', 'Creating "just in case" interfaces that will only ever have one implementation.'),
            tx('Usar herencia profunda (`PagoBase` → `PagoDigital` → `PagoYape`) en lugar de una interfaz simple.', 'Using deep inheritance (`PagoBase` → `PagoDigital` → `PagoYape`) instead of a simple interface.'),
            tx('Creer que OCP prohíbe tocar código: los bugs y los cambios de flujo sí se editan.', 'Believing OCP forbids touching code: bugs and flow changes are edited.'),
            tx('Esconder el `switch` en una «Factory»: si cada método nuevo obliga a editarla, el problema solo se movió.', 'Hiding the `switch` in a "Factory": if every new method forces you to edit it, the problem just moved.'),
          ],
        },
      ],
      rule: [
        { type: 'rule', text: tx('Permite agregar nuevos comportamientos sin modificar constantemente el código existente.', 'Let new behavior be added without constantly modifying existing code.') },
        { type: 'p', text: tx('Truco para recordarlo: **agregar un método de pago debería ser crear una clase, no editar un `if`.**', 'Memory trick: **adding a payment method should mean creating a class, not editing an `if`.**') },
        {
          type: 'five',
          problem: tx('Cadenas de `if/else` que crecen y se rompen con cada variante.', '`if/else` chains that grow and break with every variant.'),
          identify: tx('El mismo `switch` sobre un tipo aparece en varios lugares.', 'The same `switch` on a type appears in several places.'),
          fix: tx('Interfaz para lo que varía + una clase por variante + inyección de todas.', 'Interface for what varies + one class per variant + inject them all.'),
          when: tx('Cuando ya hay (o se confirma) una segunda o tercera variante real.', 'When a second or third real variant exists (or is confirmed).'),
          mistakes: tx('Abstraer para casos hipotéticos o creer que nunca se puede editar código.', 'Abstracting for hypothetical cases or believing code can never be edited.'),
        },
      ],
    },
    exercises: [
      {
        id: 'ocp-1',
        prompt: tx(
          'Producto pide aceptar **PagoEfectivo** (código `"PAGOEFECTIVO"`, comisión fija de S/ 1.50). Con el diseño corregido, ¿qué haces?',
          'Product wants to accept **PagoEfectivo** (code `"PAGOEFECTIVO"`, flat fee of S/ 1.50). With the fixed design, what do you do?'
        ),
        options: [
          {
            id: 'a',
            text: tx('Crear `PagoConPagoEfectivo implements MetodoPago` anotada con `@Component`.', 'Create `PagoConPagoEfectivo implements MetodoPago` annotated with `@Component`.'),
            correct: true,
            explanation: tx(
              'Correcto. Spring la detecta, la agrega a `List<MetodoPago>` y el procesador la usa sin que edites ninguna clase existente.',
              'Correct. Spring detects it, adds it to `List<MetodoPago>` and the processor uses it without you editing any existing class.'
            ),
          },
          {
            id: 'b',
            text: tx('Agregar un `else if ("PAGOEFECTIVO")` en `ProcesadorPagos`.', 'Add an `else if ("PAGOEFECTIVO")` to `ProcesadorPagos`.'),
            explanation: tx(
              'Volverías al diseño anterior: el procesador ya no conoce métodos concretos y no necesita conocerlos.',
              'You would go back to the old design: the processor no longer knows concrete methods and does not need to.'
            ),
          },
          {
            id: 'c',
            text: tx('Agregar `cobrarEnEfectivo()` a la interfaz `MetodoPago`.', 'Add `cobrarEnEfectivo()` to the `MetodoPago` interface.'),
            explanation: tx(
              'Obligarías a Tarjeta, Yape y Plin a implementar algo que no usan (eso además viola ISP). `cobrar()` ya expresa la operación.',
              'You would force Card, Yape and Plin to implement something they do not use (which also violates ISP). `cobrar()` already expresses the operation.'
            ),
          },
          {
            id: 'd',
            text: tx('Copiar `ProcesadorPagos` en un `ProcesadorPagosV2`.', 'Copy `ProcesadorPagos` into a `ProcesadorPagosV2`.'),
            explanation: tx(
              'Duplicar no es extender: tendrías dos procesadores que mantener y mantener sincronizados.',
              'Duplicating is not extending: you would have two processors to maintain and keep in sync.'
            ),
          },
        ],
      },
      {
        id: 'ocp-2',
        prompt: tx(
          'Tu sistema solo calcula un impuesto: el IGV del 18 %. Nadie ha pedido otro. Un compañero propone `interface CalculadoraImpuesto` + una fábrica + una única implementación. ¿Qué opinas?',
          'Your system only calculates one tax: the 18% IGV. Nobody has asked for another. A teammate proposes `interface CalculadoraImpuesto` + a factory + a single implementation. What do you think?'
        ),
        options: [
          {
            id: 'a',
            text: tx('Hay que hacerlo: OCP exige interfaces para todo cálculo.', 'Do it: OCP requires interfaces for every calculation.'),
            explanation: tx(
              'OCP no exige abstraer todo. Sin variación real, la interfaz solo agrega archivos e indirección.',
              'OCP does not require abstracting everything. Without real variation, the interface only adds files and indirection.'
            ),
          },
          {
            id: 'b',
            text: tx('Por ahora no: un método simple basta. Abstrae cuando aparezca una segunda forma real de calcular.', 'Not yet: a simple method is enough. Abstract when a second real calculation appears.'),
            correct: true,
            explanation: tx(
              'Exacto. OCP se aplica donde hay variación real. Refactorizar a una interfaz cuando llegue el segundo impuesto es barato.',
              'Exactly. OCP applies where variation is real. Refactoring to an interface when the second tax arrives is cheap.'
            ),
          },
          {
            id: 'c',
            text: tx('No, porque las interfaces violan SRP.', 'No, because interfaces violate SRP.'),
            explanation: tx(
              'Las interfaces no violan SRP. El motivo para no crearla es que no hay variación que la justifique.',
              'Interfaces do not violate SRP. The reason to skip it is that there is no variation to justify it.'
            ),
          },
          {
            id: 'd',
            text: tx('Mejor una clase abstracta `ImpuestoBase` con herencia.', 'Better an abstract `ImpuestoBase` class with inheritance.'),
            explanation: tx(
              'Cambia el mecanismo, no el problema: seguiría siendo una abstracción para una extensión hipotética.',
              'It changes the mechanism, not the problem: it is still an abstraction for a hypothetical extension.'
            ),
          },
        ],
      },
    ],
  };
}
