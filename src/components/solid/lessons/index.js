import srp from './srp.js';
import ocp from './ocp.js';
import lsp from './lsp.js';
import isp from './isp.js';
import dip from './dip.js';

export const STEP_KEYS = ['simple', 'scenario', 'bad', 'why', 'fix', 'compare', 'professional', 'rule'];

export function buildLessons(tx) {
  return [srp(tx), ocp(tx), lsp(tx), isp(tx), dip(tx)];
}

export function buildIntro(tx) {
  return {
    blocks: [
      {
        type: 'p',
        text: tx(
          '**SOLID** es un acrónimo de cinco principios de diseño orientado a objetos, popularizados por Robert C. Martin a inicios de los 2000. No son una librería ni un framework: son **criterios** para decidir cómo repartir el código entre clases e interfaces.',
          '**SOLID** is an acronym for five object-oriented design principles, popularized by Robert C. Martin in the early 2000s. They are not a library or a framework: they are **criteria** for deciding how to split code between classes and interfaces.'
        ),
      },
      {
        type: 'cards',
        items: [
          {
            title: tx('¿Por qué existen?', 'Why do they exist?'),
            text: tx(
              'Porque el software **cambia**: nuevas reglas, nuevos proveedores, nuevas bases de datos. El código que no está preparado para cambiar se vuelve frágil y caro.',
              'Because software **changes**: new rules, new providers, new databases. Code that is not ready to change becomes fragile and expensive.'
            ),
          },
          {
            title: tx('¿Qué problemas resuelven?', 'Which problems do they solve?'),
            text: tx(
              'Clases gigantes, cambios en cascada («toqué aquí y se rompió allá»), código imposible de probar y miedo a modificar lo que ya funciona.',
              'Giant classes, cascading changes ("I touched this and that broke"), untestable code and fear of modifying what already works.'
            ),
          },
          {
            title: tx('¿Cómo ayudan al mantenimiento?', 'How do they help maintenance?'),
            text: tx(
              'Un sistema pasa la mayor parte de su vida siendo **modificado**, no escrito. SOLID hace que cada cambio toque pocas clases y que esas clases sean fáciles de entender y probar.',
              'A system spends most of its life being **modified**, not written. SOLID makes each change touch few classes, and makes those classes easy to understand and test.'
            ),
          },
          {
            title: tx('¿Por qué importan en sistemas empresariales?', 'Why do they matter in enterprise systems?'),
            text: tx(
              'Un sistema bancario vive 10 o 20 años, lo mantienen decenas de personas y está sujeto a auditorías y regulaciones. Ahí, un diseño frágil cuesta dinero real.',
              'A banking system lives 10 or 20 years, is maintained by dozens of people and is subject to audits and regulations. There, fragile design costs real money.'
            ),
          },
        ],
      },
      {
        type: 'analogy',
        title: tx('Analogía: construir una casa', 'Analogy: building a house'),
        items: [
          { letter: 'S', text: tx('Cada ambiente tiene una función: no cocinas en el baño ni duermes en la cocina.', 'Each room has one purpose: you do not cook in the bathroom or sleep in the kitchen.') },
          { letter: 'O', text: tx('Los enchufes son estándar: conectas un aparato nuevo sin recablear la pared.', 'Sockets are standard: you plug in a new appliance without rewiring the wall.') },
          { letter: 'L', text: tx('Cualquier foco con rosca estándar funciona en cualquier lámpara: cumple la norma prometida.', 'Any bulb with a standard thread works in any lamp: it meets the promised norm.') },
          { letter: 'I', text: tx('El electricista recibe los planos eléctricos, no los de gasfitería que no necesita.', 'The electrician gets the electrical plans, not the plumbing ones they do not need.') },
          { letter: 'D', text: tx('Los aparatos dependen del enchufe (estándar), no de la central eléctrica (detalle).', 'Appliances depend on the socket (standard), not the power plant (detail).') },
        ],
      },
      {
        type: 'callout',
        tone: 'warning',
        title: tx('Lo que SOLID no es', 'What SOLID is not'),
        items: [
          tx('No son **patrones de diseño** (Strategy, Factory…), aunque a veces los patrones ayudan a aplicarlos.', 'They are not **design patterns** (Strategy, Factory…), although patterns sometimes help apply them.'),
          tx('No son una **arquitectura** (hexagonal, capas…), aunque las buenas arquitecturas se apoyan en ellos.', 'They are not an **architecture** (hexagonal, layers…), although good architectures rely on them.'),
          tx('No son **leyes**: son guías. Aplicarlos sin necesidad también genera código malo (sobreingeniería).', 'They are not **laws**: they are guidelines. Applying them needlessly also produces bad code (over-engineering).'),
        ],
      },
    ],
    path: [
      tx('Entiendo el problema', 'I understand the problem'),
      tx('Identifico por qué el código está mal', 'I see why the code is wrong'),
      tx('Aprendo a corregirlo', 'I learn to fix it'),
      tx('Comprendo el beneficio', 'I understand the benefit'),
      tx('Reconozco cuándo aplicarlo', 'I recognize when to apply it'),
      tx('Resuelvo un ejercicio sin ayuda', 'I solve an exercise on my own'),
    ],
  };
}

export function buildReview(tx) {
  return {
    lens: [
      {
        letter: 'L',
        title: tx('LSP mira el comportamiento', 'LSP looks at behavior'),
        question: tx('¿La implementación cumple lo que la interfaz promete?', 'Does the implementation keep the interface\'s promises?'),
        example: tx('¿`OracleCuentaRepository` devuelve `Optional.empty()` como promete el contrato?', 'Does `OracleCuentaRepository` return `Optional.empty()` as the contract promises?'),
      },
      {
        letter: 'I',
        title: tx('ISP mira el tamaño', 'ISP looks at size'),
        question: tx('¿La interfaz tiene solo lo que su consumidor necesita?', 'Does the interface hold only what its consumer needs?'),
        example: tx('¿`ConsultaSaldoService` necesita los 12 métodos de un repositorio o solo `buscarPorId`?', 'Does `ConsultaSaldoService` need a repository\'s 12 methods or only `buscarPorId`?'),
      },
      {
        letter: 'D',
        title: tx('DIP mira la dirección', 'DIP looks at direction'),
        question: tx('¿El negocio depende de la abstracción o del detalle técnico?', 'Does the business depend on the abstraction or the technical detail?'),
        example: tx('¿`ConsultaSaldoService` recibe `CuentaRepository` o `OracleCuentaRepository`?', 'Does `ConsultaSaldoService` receive `CuentaRepository` or `OracleCuentaRepository`?'),
      },
    ],
    quiz: [
      {
        id: 'mix-1',
        answer: 'S',
        prompt: tx(
          '`ReporteMensualService` calcula los intereses del mes, arma un Excel con Apache POI y lo sube a un servidor SFTP.',
          '`ReporteMensualService` calculates monthly interest, builds an Excel file with Apache POI and uploads it to an SFTP server.'
        ),
        explanation: tx(
          'S: tres trabajos con tres razones para cambiar (reglas financieras, formato del reporte y transporte del archivo).',
          'S: three jobs with three reasons to change (financial rules, report format and file transport).'
        ),
      },
      {
        id: 'mix-2',
        answer: 'O',
        prompt: tx(
          'Para soportar un nuevo tipo de cuenta (CTS) hay que agregar un `case` en seis `switch` repartidos por el código.',
          'Supporting a new account type (CTS) means adding a `case` to six `switch` statements spread across the code.'
        ),
        explanation: tx(
          'O: cada variante nueva obliga a editar código existente en varios lugares. Una interfaz `TipoCuenta` con una clase por tipo lo resolvería.',
          'O: every new variant forces edits to existing code in several places. A `TipoCuenta` interface with one class per type would solve it.'
        ),
      },
      {
        id: 'mix-3',
        answer: 'L',
        prompt: tx(
          '`CuentaRepositoryEnMemoria`, usada en los tests, lanza `NoSuchElementException` si el id no existe, mientras que la implementación real devuelve `Optional.empty()`.',
          '`CuentaRepositoryEnMemoria`, used in tests, throws `NoSuchElementException` when the id does not exist, while the real implementation returns `Optional.empty()`.'
        ),
        explanation: tx(
          'L: el fake no cumple el mismo contrato que la implementación real, así que los tests no prueban el comportamiento de producción.',
          'L: the fake does not honor the same contract as the real implementation, so tests do not exercise production behavior.'
        ),
      },
      {
        id: 'mix-4',
        answer: 'I',
        prompt: tx(
          '`IntegracionesClient` tiene 25 métodos. El servicio de tipo de cambio solo usa `obtenerTipoCambio()`, pero su mock tiene que implementar los 25.',
          '`IntegracionesClient` has 25 methods. The exchange-rate service only uses `obtenerTipoCambio()`, but its mock must implement all 25.'
        ),
        explanation: tx(
          'I: el consumidor depende de muchos métodos que no usa. Una interfaz `TipoCambioClient` con un método bastaría.',
          'I: the consumer depends on many methods it does not use. A `TipoCambioClient` interface with one method would be enough.'
        ),
      },
      {
        id: 'mix-5',
        answer: 'D',
        prompt: tx(
          '`PrestamoService` hace `RestClient.create("https://api.buro-credito.pe")` dentro del método que evalúa el préstamo.',
          '`PrestamoService` calls `RestClient.create("https://api.buro-credito.pe")` inside the method that evaluates the loan.'
        ),
        explanation: tx(
          'D: la regla de negocio crea y usa directamente un detalle técnico (cliente HTTP y URL). Debería depender de una interfaz como `BuroCreditoPort`.',
          'D: the business rule directly creates and uses a technical detail (HTTP client and URL). It should depend on an interface such as `BuroCreditoPort`.'
        ),
      },
    ],
    tips: [
      tx('Aplica SOLID cuando el código **duele** (cambios caros, tests difíciles), no por reflejo.', 'Apply SOLID when code **hurts** (expensive changes, hard tests), not by reflex.'),
      tx('Una interfaz con una sola implementación y sin frontera técnica suele ser ruido.', 'An interface with a single implementation and no technical boundary is usually noise.'),
      tx('Los principios se refuerzan: separar responsabilidades (S) facilita extender (O) e invertir dependencias (D).', 'The principles reinforce each other: separating responsibilities (S) makes extending (O) and inverting dependencies (D) easier.'),
      tx('En una entrevista, explica con un caso real: «tenía este problema, lo noté por esta señal y lo corregí así».', 'In an interview, explain with a real case: "I had this problem, noticed it by this sign and fixed it like this".'),
    ],
  };
}
