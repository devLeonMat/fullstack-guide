import { java } from './mark.js';

export default function isp(tx) {
  return {
    id: 'isp',
    letter: 'I',
    color: 'cyan',
    nameEn: 'Interface Segregation Principle',
    nameEs: 'Principio de Segregación de Interfaces',
    tagline: tx('No obligues a una clase a depender de métodos que no necesita.', 'Do not force a class to depend on methods it does not need.'),
    definition: tx(
      'Interfaces pequeñas, diseñadas según lo que necesita quien las usa.',
      'Small interfaces, designed around what their users need.'
    ),
    solves: tx(
      'Implementaciones falsas que lanzan excepciones en métodos que no aplican.',
      'Fake implementations that throw on methods that do not apply.'
    ),
    focus: tx('si una interfaz obliga a depender de métodos innecesarios', 'whether an interface forces dependence on unneeded methods'),
    summary: {
      question: tx('¿Esta interfaz tiene el tamaño correcto para quien la usa?', 'Is this interface the right size for its users?'),
      signal: tx('`UnsupportedOperationException`, métodos vacíos, consumidores que usan 1 de N métodos.', '`UnsupportedOperationException`, empty methods, consumers using 1 of N methods.'),
      solution: tx('Dividir en interfaces según las necesidades de los consumidores.', 'Split into interfaces based on consumers\' needs.'),
      example: 'NotificationService → EmailNotifier, SmsNotifier, PushNotifier',
    },
    visual: {
      takeaway: tx('Una interfaz gorda se parte en interfaces pequeñas: cada uno usa solo lo suyo.', 'One fat interface splits into small ones: everyone uses only what they need.'),
      before: {
        caption: tx('todos dependen de todo', 'everyone depends on everything'),
        description: tx('CodigoSeguridadService usa NotificationService, que tiene tres métodos. EmailNotificationService la implementa pero lanza excepciones en SMS y push.', 'CodigoSeguridadService uses NotificationService, which has three methods. EmailNotificationService implements it but throws on SMS and push.'),
        rows: [[
          { title: 'CodigoSeguridadService', note: tx('solo necesita SMS', 'only needs SMS') },
          { arrow: 'forward', label: tx('usa', 'uses') },
          { title: 'NotificationService', kind: 'interface', chips: ['enviarEmail', 'enviarSMS', 'enviarPush'] },
          { arrow: 'backward', label: tx('implementa', 'implements') },
          {
            title: 'EmailNotificationService',
            status: 'bad',
            chips: ['enviarEmail ✅', { text: 'enviarSMS 💥', status: 'bad' }, { text: 'enviarPush 💥', status: 'bad' }],
          },
        ]],
      },
      after: {
        caption: tx('interfaces pequeñas por capacidad', 'small interfaces per capability'),
        description: tx('CodigoSeguridadService usa solo SmsNotifier. SnsNotifier implementa SmsNotifier y PushNotifier. EmailNotificationService implementa solo EmailNotifier.', 'CodigoSeguridadService uses only SmsNotifier. SnsNotifier implements SmsNotifier and PushNotifier. EmailNotificationService implements only EmailNotifier.'),
        rows: [
          [
            { title: 'CodigoSeguridadService' },
            { arrow: 'forward', label: tx('usa', 'uses') },
            { title: 'SmsNotifier', kind: 'interface' },
            { arrow: 'backward', label: tx('implementa', 'implements') },
            { title: 'SnsNotifier', status: 'ok', note: tx('también PushNotifier', 'also PushNotifier') },
          ],
          [
            { title: 'EmailNotificationService', status: 'ok' },
            { arrow: 'forward', label: tx('implementa', 'implements') },
            { title: 'EmailNotifier', kind: 'interface', note: tx('solo email', 'email only') },
          ],
        ],
      },
    },
    steps: {
      simple: [
        {
          type: 'p',
          text: tx(
            'Imagina que para ser cajero del banco te hacen firmar un contrato que también te exige pilotear el helicóptero de la empresa y operar la bóveda. Nunca lo harás, pero si alguien te lo pide, solo puedes responder «no sé hacerlo».',
            'Imagine that to become a bank teller you must sign a contract that also requires you to fly the company helicopter and run the vault. You will never do it, but if someone asks, all you can say is "I can\'t do that".'
          ),
        },
        {
          type: 'p',
          text: tx(
            'En código, una interfaz es un contrato. Si es demasiado grande, **obliga a las clases a implementar métodos que no tienen sentido para ellas** y **obliga a los consumidores a depender de métodos que nunca llaman**.',
            'In code, an interface is a contract. If it is too big, it **forces classes to implement methods that make no sense for them** and **forces consumers to depend on methods they never call**.'
          ),
        },
        {
          type: 'callout',
          tone: 'info',
          title: tx('ISP se mira desde el consumidor', 'ISP looks from the consumer\'s side'),
          text: tx(
            'La pregunta clave no es «¿qué puede hacer el proveedor?», sino «¿qué necesita realmente quien usa esta interfaz?».',
            'The key question is not "what can the provider do?" but "what does whoever uses this interface really need?".'
          ),
        },
      ],
      scenario: [
        {
          type: 'p',
          text: tx(
            'El banco envía notificaciones: confirmaciones de transferencia por **email**, códigos de seguridad por **SMS** y alertas de fraude por **SMS y push**. Alguien diseñó una única interfaz para todo:',
            'The bank sends notifications: transfer confirmations by **email**, security codes by **SMS** and fraud alerts by **SMS and push**. Someone designed a single interface for everything:'
          ),
        },
        java(`
public interface NotificationService {

    void enviarEmail(String mensaje);

    void enviarSMS(String mensaje);

    void enviarPush(String mensaje);
}`, { title: 'NotificationService.java', unit: 'isp-bad' }),
        {
          type: 'p',
          text: tx(
            'El primer proveedor contratado **solo envía emails**. Aun así, su clase tiene que implementar la interfaz completa.',
            'The first provider hired **only sends emails**. Even so, its class has to implement the whole interface.'
          ),
        },
        {
          type: 'callout',
          tone: 'tip',
          title: tx('Nota', 'Note'),
          text: tx(
            'Los mensajes están simplificados: en un sistema real cada método recibiría también el destinatario.',
            'Messages are simplified: in a real system each method would also receive the recipient.'
          ),
        },
      ],
      bad: [
        java(`
import org.springframework.stereotype.Service;

@Service
public class EmailNotificationService implements NotificationService {

    @Override
    public void enviarEmail(String mensaje) {
        System.out.println("📧 Enviando email: " + mensaje);
    }

!    @Override
!    public void enviarSMS(String mensaje) {
!        throw new UnsupportedOperationException("Este proveedor no envía SMS");
!    }

!    @Override
!    public void enviarPush(String mensaje) {
!        throw new UnsupportedOperationException("Este proveedor no envía push");
!    }
}`, {
          title: 'EmailNotificationService.java',
          tone: 'bad',
          lineNumbers: true,
          unit: 'isp-bad',
          notes: [
            tx('Dos de sus tres métodos son falsos: existen solo para que compile.', 'Two of its three methods are fake: they exist only so it compiles.'),
          ],
        }),
        {
          type: 'p',
          text: tx('Ahora un consumidor que solo necesita SMS recibe la interfaz completa:', 'Now a consumer that only needs SMS receives the whole interface:'),
        },
        java(`
import org.springframework.stereotype.Service;

@Service
public class CodigoSeguridadService {

!    private final NotificationService notificaciones;

    public CodigoSeguridadService(NotificationService notificaciones) {
        this.notificaciones = notificaciones;
    }

    public void enviarCodigo(String codigo) {
!        notificaciones.enviarSMS("Tu código de seguridad es " + codigo); // 💥 en runtime
    }
}`, {
          title: 'CodigoSeguridadService.java',
          tone: 'bad',
          lineNumbers: true,
          unit: 'isp-bad',
          notes: [
            tx('Depende de tres métodos y usa uno. Spring le inyecta `EmailNotificationService` (el único bean) y el envío del código explota en producción.', 'It depends on three methods and uses one. Spring injects `EmailNotificationService` (the only bean) and sending the code blows up in production.'),
          ],
        }),
      ],
      why: [
        {
          type: 'table',
          caption: tx('Lo que la interfaz dice vs. lo que la clase realmente hace', 'What the interface says vs. what the class really does'),
          headers: [tx('Clase', 'Class'), 'enviarEmail', 'enviarSMS', 'enviarPush'],
          rows: [
            ['`EmailNotificationService`', tx('✅ real', '✅ real'), tx('💥 lanza excepción', '💥 throws'), tx('💥 lanza excepción', '💥 throws')],
          ],
        },
        {
          type: 'cards',
          items: [
            {
              title: tx('Qué está ocurriendo', 'What is happening'),
              text: tx(
                'La clase de email está obligada a «implementar» SMS y push lanzando excepciones. Y `CodigoSeguridadService` depende de tres métodos para usar uno.',
                'The email class is forced to "implement" SMS and push by throwing exceptions. And `CodigoSeguridadService` depends on three methods to use one.'
              ),
            },
            {
              title: tx('Por qué es un problema', 'Why it is a problem'),
              text: tx(
                'La interfaz miente: dice que el objeto sabe enviar SMS. El compilador da todo por bueno y el error aparece recién al ejecutar.',
                'The interface lies: it says the object can send SMS. The compiler accepts everything and the error only appears at runtime.'
              ),
            },
            {
              title: tx('Consecuencias en producción', 'Consequences in production'),
              text: tx(
                'El código de seguridad (2FA) nunca llega: los clientes no pueden confirmar sus transferencias y el call center colapsa.',
                'The security code (2FA) never arrives: customers cannot confirm their transfers and the call center is overwhelmed.'
              ),
            },
            {
              title: tx('Dificultades de mantenimiento', 'Maintenance pain'),
              text: tx(
                'Agregar `enviarWhatsApp()` obliga a modificar **todas** las implementaciones. Los mocks de los tests deben simular métodos irrelevantes.',
                'Adding `enviarWhatsApp()` forces you to modify **every** implementation. Test mocks must fake irrelevant methods.'
              ),
            },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: tx('Conexión con Liskov', 'Link with Liskov'),
          text: tx(
            'Las `UnsupportedOperationException` también violan LSP: la clase no cumple lo que la interfaz promete. Una interfaz demasiado grande suele empujar a romper Liskov.',
            'Those `UnsupportedOperationException`s also violate LSP: the class does not keep the interface\'s promises. An oversized interface often pushes you into breaking Liskov.'
          ),
        },
        {
          type: 'details',
          title: tx('¿Cómo identifico una violación de ISP?', 'How do I spot an ISP violation?'),
          blocks: [
            {
              type: 'list',
              items: [
                tx('Implementaciones con `UnsupportedOperationException`, métodos vacíos o `return null` «porque no aplica».', 'Implementations with `UnsupportedOperationException`, empty methods or `return null` "because it does not apply".'),
                tx('Consumidores que usan 1 o 2 de los muchos métodos de la interfaz.', 'Consumers that use 1 or 2 of the interface\'s many methods.'),
                tx('Interfaces con nombres genéricos (`Manager`, `Service`, `Helper`) y 15 métodos.', 'Interfaces with generic names (`Manager`, `Service`, `Helper`) and 15 methods.'),
                tx('Un cambio en un método que no usas te obliga a tocar tu clase.', 'A change to a method you do not use forces you to touch your class.'),
              ],
            },
          ],
        },
      ],
      fix: [
        {
          type: 'p',
          text: tx(
            'Vamos a dividir la interfaz según las **capacidades** que necesitan los consumidores.',
            'We will split the interface by the **capabilities** consumers need.'
          ),
        },
        {
          type: 'steps',
          items: [
            {
              title: tx('Separa las capacidades', 'Separate the capabilities'),
              blocks: [
                java(`
public interface EmailNotifier {
    void enviarEmail(String mensaje);
}`, { title: 'EmailNotifier.java', unit: 'isp-good' }),
                java(`
public interface SmsNotifier {
    void enviarSMS(String mensaje);
}`, { title: 'SmsNotifier.java', unit: 'isp-good' }),
                java(`
public interface PushNotifier {
    void enviarPush(String mensaje);
}`, { title: 'PushNotifier.java', unit: 'isp-good' }),
              ],
            },
            {
              title: tx('El proveedor de email implementa solo lo que sabe hacer', 'The email provider implements only what it can do'),
              blocks: [
                java(`
import org.springframework.stereotype.Service;

@Service
public class EmailNotificationService implements EmailNotifier {

    @Override
    public void enviarEmail(String mensaje) {
        System.out.println("📧 Enviando email: " + mensaje);
    }
}`, { title: 'EmailNotificationService.java', tone: 'good', unit: 'isp-good' }),
                {
                  type: 'p',
                  text: tx('Sin métodos falsos. Todo lo que declara, lo cumple.', 'No fake methods. Everything it declares, it delivers.'),
                },
              ],
            },
            {
              title: tx('Una clase puede implementar varias, si realmente las ofrece', 'A class may implement several, if it really offers them'),
              blocks: [
                {
                  type: 'p',
                  text: tx(
                    'Amazon SNS permite enviar SMS **y** notificaciones push. Implementar dos interfaces aquí es honesto: la clase ofrece ambas capacidades de verdad.',
                    'Amazon SNS can send SMS **and** push notifications. Implementing two interfaces here is honest: the class truly offers both capabilities.'
                  ),
                },
                java(`
import org.springframework.stereotype.Service;

@Service
public class SnsNotifier implements SmsNotifier, PushNotifier {

    @Override
    public void enviarSMS(String mensaje) {
        System.out.println("📱 SMS vía Amazon SNS: " + mensaje);
    }

    @Override
    public void enviarPush(String mensaje) {
        System.out.println("🔔 Push vía Amazon SNS: " + mensaje);
    }
}`, { title: 'SnsNotifier.java', tone: 'good', unit: 'isp-good' }),
              ],
            },
            {
              title: tx('Cada consumidor pide solo lo que usa', 'Each consumer asks only for what it uses'),
              blocks: [
                java(`
import org.springframework.stereotype.Service;

@Service
public class CodigoSeguridadService {

!    private final SmsNotifier sms;

    public CodigoSeguridadService(SmsNotifier sms) {
        this.sms = sms;
    }

    public void enviarCodigo(String codigo) {
        sms.enviarSMS("Tu código de seguridad es " + codigo);
    }
}`, { title: 'CodigoSeguridadService.java', tone: 'good', unit: 'isp-good' }),
                java(`
import org.springframework.stereotype.Service;

@Service
public class AlertaFraudeService {

    private final SmsNotifier sms;
    private final PushNotifier push;

    public AlertaFraudeService(SmsNotifier sms, PushNotifier push) {
        this.sms = sms;
        this.push = push;
    }

    public void alertar(String detalle) {
        String mensaje = "Alerta de seguridad: " + detalle;
        sms.enviarSMS(mensaje);
        push.enviarPush(mensaje);
    }
}`, { title: 'AlertaFraudeService.java', unit: 'isp-good' }),
                {
                  type: 'p',
                  text: tx(
                    'Spring inyecta el mismo bean `SnsNotifier` en ambos parámetros de `AlertaFraudeService`, que no sabe (ni le importa) que es un solo objeto. Si mañana el push pasa a Firebase, solo cambia la clase que implementa `PushNotifier`.',
                    'Spring injects the same `SnsNotifier` bean into both parameters of `AlertaFraudeService`, which neither knows nor cares that it is a single object. If push moves to Firebase tomorrow, only the class implementing `PushNotifier` changes.'
                  ),
                },
              ],
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: tx('ISP no significa crear obligatoriamente una interfaz por cada método', 'ISP does not mean one interface per method'),
          text: tx(
            'Diseña las interfaces según sus consumidores. Si **todos** los consumidores siempre usan email y SMS juntos, una sola interfaz `NotificadorCliente` con ambos métodos está bien. Un `CuentaRepository` con `buscarPorId`, `guardar` y `listarPorCliente` también, si quienes lo usan necesitan esas operaciones.',
            'Design interfaces around their consumers. If **every** consumer always uses email and SMS together, a single `NotificadorCliente` interface with both methods is fine. So is a `CuentaRepository` with `buscarPorId`, `guardar` and `listarPorCliente`, if its users need those operations.'
          ),
        },
      ],
      compare: [
        {
          type: 'compare',
          before: java(`
public interface NotificationService {
    void enviarEmail(String mensaje);
    void enviarSMS(String mensaje);
    void enviarPush(String mensaje);
}

public class EmailNotificationService implements NotificationService {
    public void enviarEmail(String mensaje) { /* real */ }
!    public void enviarSMS(String mensaje)   { throw new UnsupportedOperationException(); }
!    public void enviarPush(String mensaje)  { throw new UnsupportedOperationException(); }
}`),
          after: java(`
public interface EmailNotifier { void enviarEmail(String mensaje); }
public interface SmsNotifier   { void enviarSMS(String mensaje); }
public interface PushNotifier  { void enviarPush(String mensaje); }

!public class EmailNotificationService implements EmailNotifier { /* solo email */ }
!public class SnsNotifier implements SmsNotifier, PushNotifier  { /* SMS y push */ }`),
          rows: [
            [tx('Clase de email', 'Email class'), tx('3 métodos, 2 lanzan excepción', '3 methods, 2 throw'), tx('1 método, todos reales', '1 method, all real')],
            [tx('Inyección equivocada', 'Wrong injection'), tx('Falla en runtime', 'Fails at runtime'), tx('Falla al compilar: un `EmailNotificationService` no es un `SmsNotifier`', 'Fails at compile time: an `EmailNotificationService` is not a `SmsNotifier`')],
            [tx('Agregar WhatsApp', 'Adding WhatsApp'), tx('Modificar todas las implementaciones', 'Modify every implementation'), tx('Nueva interfaz `WhatsAppNotifier`; nadie más cambia', 'New `WhatsAppNotifier` interface; nobody else changes')],
            [tx('Lo que ve `CodigoSeguridadService`', 'What `CodigoSeguridadService` sees'), tx('3 métodos', '3 methods'), tx('Solo `enviarSMS`', 'Only `enviarSMS`')],
            [tx('Mocks en tests', 'Test mocks'), tx('Toda la interfaz', 'The whole interface'), tx('Solo lo que el consumidor usa', 'Only what the consumer uses')],
          ],
        },
        {
          type: 'table',
          caption: tx('Después: cada clase declara solo lo que de verdad ofrece', 'After: each class declares only what it really offers'),
          headers: [tx('Clase', 'Class'), 'EmailNotifier', 'SmsNotifier', 'PushNotifier'],
          rows: [
            ['`EmailNotificationService`', '✅', '—', '—'],
            ['`SnsNotifier`', '—', '✅', '✅'],
          ],
        },
      ],
      professional: [
        {
          type: 'list',
          items: [
            tx('**Spring Data:** en vez de heredar de `JpaRepository` (más de 20 métodos, incluido `deleteAll()`), un servicio de solo lectura puede extender `Repository<T, ID>` y declarar solo lo que usa.', '**Spring Data:** instead of extending `JpaRepository` (20+ methods, including `deleteAll()`), a read-only service can extend `Repository<T, ID>` and declare only what it uses.'),
            tx('**Puertos por caso de uso:** `BuscarCuentaPort` y `GuardarCuentaPort` en lugar de un `CuentaPort` gigante.', '**Ports per use case:** `BuscarCuentaPort` and `GuardarCuentaPort` instead of a giant `CuentaPort`.'),
            tx('**Clientes REST:** un cliente por API externa o capacidad, no un `IntegracionesClient` con 30 métodos.', '**REST clients:** one client per external API or capability, not an `IntegracionesClient` with 30 methods.'),
            tx('**El propio Spring:** `InitializingBean`, `DisposableBean` o `ApplicationListener` son interfaces pequeñas; implementas solo las que necesitas.', '**Spring itself:** `InitializingBean`, `DisposableBean` or `ApplicationListener` are small interfaces; you implement only the ones you need.'),
          ],
        },
        {
          type: 'details',
          title: tx('¿Cómo se aplica en Spring Boot?', 'How does it look in Spring Boot?'),
          blocks: [
            java(`
import java.util.Optional;
import org.springframework.data.repository.Repository;

public interface CuentaConsultaRepository extends Repository<CuentaEntity, Long> {

    Optional<CuentaEntity> findById(Long id);
}`, { title: 'CuentaConsultaRepository.java' }),
            {
              type: 'p',
              text: tx(
                'Spring Data genera la implementación solo para `findById`. Quien inyecte `CuentaConsultaRepository` no puede borrar cuentas por accidente: ese método ni siquiera existe para él.',
                'Spring Data generates the implementation only for `findById`. Whoever injects `CuentaConsultaRepository` cannot delete accounts by accident: that method does not even exist for them.'
              ),
            },
          ],
        },
        {
          type: 'callout',
          tone: 'danger',
          title: tx('Errores comunes', 'Common mistakes'),
          items: [
            tx('Crear una interfaz por método por reflejo, aunque los consumidores siempre usen el grupo completo.', 'Creating one interface per method by reflex, even when consumers always use the whole group.'),
            tx('Diseñar la interfaz desde lo que ofrece el proveedor y no desde lo que necesita el consumidor.', 'Designing the interface from what the provider offers instead of what the consumer needs.'),
            tx('Dejar métodos vacíos o con `UnsupportedOperationException` «para cumplir».', 'Leaving empty methods or `UnsupportedOperationException` "to comply".'),
            tx('Depender de la clase concreta (`SnsNotifier`) en lugar de la interfaz pequeña (`SmsNotifier`).', 'Depending on the concrete class (`SnsNotifier`) instead of the small interface (`SmsNotifier`).'),
          ],
        },
      ],
      rule: [
        { type: 'rule', text: tx('No obligues a una clase a depender de métodos que no necesita.', 'Do not force a class to depend on methods it does not need.') },
        { type: 'p', text: tx('Truco para recordarlo: **interfaces a la medida de quien las usa, no de quien las implementa.**', 'Memory trick: **interfaces tailored to whoever uses them, not whoever implements them.**') },
        {
          type: 'five',
          problem: tx('Clases obligadas a implementar (y consumidores a depender de) métodos inútiles.', 'Classes forced to implement (and consumers to depend on) useless methods.'),
          identify: tx('`UnsupportedOperationException`, métodos vacíos, consumidores que usan 1 de N métodos.', '`UnsupportedOperationException`, empty methods, consumers using 1 of N methods.'),
          fix: tx('Dividir la interfaz por capacidades según los consumidores.', 'Split the interface into capabilities based on consumers.'),
          when: tx('Notificaciones, integraciones, repositorios y puertos con consumidores distintos.', 'Notifications, integrations, repositories and ports with different consumers.'),
          mistakes: tx('Una interfaz por método «por regla» o diseñar desde el proveedor.', 'One interface per method "as a rule" or designing from the provider\'s side.'),
        },
      ],
    },
    exercises: [
      {
        id: 'isp-1',
        prompt: tx(
          'Crearás `RecordatorioPagoService`, que avisa por SMS el vencimiento de la tarjeta. ¿De qué debería depender?',
          'You will create `RecordatorioPagoService`, which sends a card due-date reminder by SMS. What should it depend on?'
        ),
        options: [
          {
            id: 'a',
            text: tx('De `NotificationService` (la interfaz original).', 'On `NotificationService` (the original interface).'),
            explanation: tx(
              'Volverías a depender de email y push sin usarlos, y Spring podría inyectar una implementación que lanza `UnsupportedOperationException`.',
              'You would depend on email and push again without using them, and Spring could inject an implementation that throws `UnsupportedOperationException`.'
            ),
          },
          {
            id: 'b',
            text: tx('De `SmsNotifier`.', 'On `SmsNotifier`.'),
            correct: true,
            explanation: tx(
              'Correcto. Es exactamente la capacidad que usa: nada más, nada menos.',
              'Correct. It is exactly the capability it uses: nothing more, nothing less.'
            ),
          },
          {
            id: 'c',
            text: tx('De `SnsNotifier` (la clase concreta).', 'On `SnsNotifier` (the concrete class).'),
            explanation: tx(
              'Funciona hoy, pero acopla el servicio a Amazon SNS y le expone `enviarPush`. Eso choca con DIP: depende de un detalle técnico en lugar de una abstracción.',
              'It works today, but it couples the service to Amazon SNS and exposes `enviarPush`. That clashes with DIP: it depends on a technical detail instead of an abstraction.'
            ),
          },
          {
            id: 'd',
            text: tx('De `SmsNotifier` y `PushNotifier`, por si acaso.', 'On `SmsNotifier` and `PushNotifier`, just in case.'),
            explanation: tx(
              '«Por si acaso» es justo lo que ISP evita: no dependas de lo que no usas hoy. Si mañana necesitas push, lo agregas entonces.',
              '"Just in case" is exactly what ISP avoids: do not depend on what you do not use today. If you need push tomorrow, add it then.'
            ),
          },
        ],
      },
      {
        id: 'isp-2',
        prompt: tx('¿Cuál es la señal más clara de una violación de ISP?', 'Which is the clearest sign of an ISP violation?'),
        options: [
          {
            id: 'a',
            text: tx('Una interfaz tiene tres métodos.', 'An interface has three methods.'),
            explanation: tx(
              'El número de métodos por sí solo no dice nada. Tres métodos que todos los consumidores usan juntos están bien.',
              'Method count alone means nothing. Three methods that every consumer uses together are fine.'
            ),
          },
          {
            id: 'b',
            text: tx('Una clase implementa dos interfaces.', 'A class implements two interfaces.'),
            explanation: tx(
              'Es normal y sano cuando la clase ofrece ambas capacidades de verdad, como `SnsNotifier`.',
              'It is normal and healthy when the class truly offers both capabilities, like `SnsNotifier`.'
            ),
          },
          {
            id: 'c',
            text: tx(
              'Implementaciones que lanzan `UnsupportedOperationException` o dejan métodos vacíos porque «no aplican».',
              'Implementations that throw `UnsupportedOperationException` or leave methods empty because they "do not apply".'
            ),
            correct: true,
            explanation: tx(
              'Correcto. Es la prueba de que la interfaz obliga a implementar algo que no corresponde: hay que dividirla.',
              'Correct. It proves the interface forces implementing something that does not belong: it needs splitting.'
            ),
          },
          {
            id: 'd',
            text: tx('Una interfaz tiene un solo método.', 'An interface has a single method.'),
            explanation: tx(
              'Una interfaz de un método puede ser perfecta (`SmsNotifier`). ISP no prohíbe interfaces pequeñas: las fomenta cuando el consumidor lo pide.',
              'A single-method interface can be perfect (`SmsNotifier`). ISP does not forbid small interfaces: it encourages them when the consumer calls for it.'
            ),
          },
        ],
      },
    ],
  };
}
