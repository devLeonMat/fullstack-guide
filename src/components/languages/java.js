// Java Pro content as plain data (no JSX) so it can be tested with Node.
// Versions note where each release was used (client projects from the CV);
// interview answers are short, spoken-style, with an optional "inPractice" line.

export function buildJavaVersions(tx) {
  return [
    {
      id: 'java8',
      version: 'Java 8',
      year: '2014',
      usedAt: tx(
        'Mi base durante años: ERP de Olva Courier, Equifax, SURA e Intercorp.',
        'My baseline for years: Olva Courier’s ERP, Equifax, SURA and Intercorp.'
      ),
      features: [
        {
          name: 'Lambdas + Stream API',
          desc: tx(
            'El cambio más grande de Java moderno: pasar de bucles con ifs a describir qué quieres de la colección.',
            'The biggest shift in modern Java: from loops full of ifs to describing what you want from the collection.'
          ),
          code: `List<String> activos = clientes.stream()
        .filter(Cliente::activo)
        .map(Cliente::nombre)
        .sorted()
        .collect(Collectors.toList());`,
        },
        {
          name: 'Optional',
          desc: tx(
            'Un tipo de retorno que dice “puede no haber valor” sin devolver null. Spring Data lo usa en findById.',
            'A return type that says “there may be no value” without returning null. Spring Data uses it in findById.'
          ),
          code: `Cuenta cuenta = cuentas.findById(id)
        .orElseThrow(() -> new CuentaNoEncontradaException(id));`,
        },
        {
          name: 'Default methods',
          desc: tx(
            'Interfaces con métodos implementados. Así se pudo agregar stream() a Collection sin romper a nadie.',
            'Interfaces with implemented methods. That’s how stream() was added to Collection without breaking anyone.'
          ),
          code: `interface Auditable {
    Instant creadoEn();

    default boolean esReciente() {
        return creadoEn().isAfter(Instant.now().minus(Duration.ofDays(1)));
    }
}`,
        },
        {
          name: 'java.time',
          desc: tx(
            'Fechas inmutables y claras. Adiós a Date y Calendar.',
            'Immutable, clear dates. Goodbye Date and Calendar.'
          ),
          code: `LocalDate hoy = LocalDate.now();
LocalDate vence = hoy.plusDays(30);
Duration espera = Duration.ofMinutes(5);`,
        },
        {
          name: 'CompletableFuture',
          desc: tx(
            'Componer tareas asíncronas sin bloquear con get(). La base antes de llegar a lo reactivo.',
            'Compose async tasks without blocking on get(). The foundation before going reactive.'
          ),
          code: `CompletableFuture.supplyAsync(() -> consultarCliente(id))
        .thenCombine(CompletableFuture.supplyAsync(() -> consultarCuentas(id)), Resumen::new)
        .thenAccept(this::enviar);`,
        },
      ],
    },
    {
      id: 'java11',
      version: 'Java 11 LTS',
      year: '2018',
      usedAt: tx(
        'Lynk (NCB), Tío Grou (BCP) y Banco GNB Paraguay.',
        'Lynk (NCB), Tío Grou (BCP) and Banco GNB Paraguay.'
      ),
      features: [
        {
          name: 'var',
          desc: tx(
            'Inferencia de tipos en variables locales (llegó en Java 10; 11 es la primera LTS que lo trae). Úsalo cuando el tipo ya se ve a la derecha.',
            'Type inference for local variables (it arrived in Java 10; 11 is the first LTS with it). Use it when the type is already visible on the right.'
          ),
          code: `var clientes = new ArrayList<Cliente>();   // claro
var resultado = servicio.procesar();       // ¿qué tipo es? mejor explícito`,
        },
        {
          name: tx('Métodos nuevos de String', 'New String methods'),
          desc: tx(
            'isBlank(), strip(), lines() y repeat(): pequeños, pero se usan todos los días.',
            'isBlank(), strip(), lines() and repeat(): small, but you use them every day.'
          ),
          code: `"   ".isBlank();          // true
"  hola  ".strip();       // "hola" (entiende Unicode, a diferencia de trim)
texto.lines().count();    // número de líneas`,
        },
        {
          name: 'HttpClient',
          desc: tx(
            'Cliente HTTP nativo, con soporte síncrono y asíncrono, sin depender de librerías.',
            'Native HTTP client, sync and async, no extra libraries needed.'
          ),
          code: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder(URI.create("https://api.banco.local/tasas"))
        .timeout(Duration.ofSeconds(3))
        .build();
String body = client.send(request, HttpResponse.BodyHandlers.ofString()).body();`,
        },
        {
          name: 'Java Flight Recorder',
          desc: tx(
            'Profiler de bajo costo, abierto desde Java 11. Se puede dejar corriendo en producción.',
            'Low-overhead profiler, open-sourced in Java 11. You can leave it running in production.'
          ),
          code: `jcmd <pid> JFR.start duration=60s filename=registro.jfr
# luego se abre con JDK Mission Control`,
        },
      ],
    },
    {
      id: 'java17',
      version: 'Java 17 LTS',
      year: '2021',
      usedAt: tx(
        'Qorta (SambaSafety): microservicios con arquitectura hexagonal.',
        'Qorta (SambaSafety): microservices with hexagonal architecture.'
      ),
      features: [
        {
          name: 'Records',
          desc: tx(
            'Clases de datos inmutables en una línea: constructor, getters, equals, hashCode y toString incluidos. Ideales para DTOs y eventos.',
            'Immutable data classes in one line: constructor, accessors, equals, hashCode and toString included. Great for DTOs and events.'
          ),
          code: `public record InfraccionDetectada(String conductorId, String tipo, Instant fecha) {}

var evento = new InfraccionDetectada("C-102", "EXCESO_VELOCIDAD", Instant.now());
evento.tipo(); // accesor, sin "get"`,
        },
        {
          name: 'Sealed classes',
          desc: tx(
            'Decides exactamente qué clases pueden implementar una interfaz. Junto con switch, el compilador te avisa si olvidas un caso.',
            'You decide exactly which classes can implement an interface. Combined with switch, the compiler tells you when you miss a case.'
          ),
          code: `public sealed interface ResultadoPago permits Aprobado, Rechazado, Pendiente {}

public record Aprobado(String autorizacion) implements ResultadoPago {}
public record Rechazado(String motivo) implements ResultadoPago {}
public record Pendiente() implements ResultadoPago {}`,
        },
        {
          name: 'Pattern matching (instanceof)',
          desc: tx(
            'Chequeas el tipo y obtienes la variable ya casteada en la misma línea.',
            'Check the type and get the already-cast variable in the same line.'
          ),
          code: `if (resultado instanceof Rechazado r) {
    log.warn("Pago rechazado: {}", r.motivo());
}`,
        },
        {
          name: 'Text blocks',
          desc: tx(
            'Strings multilínea legibles: SQL, JSON o plantillas sin concatenar ni escapar comillas.',
            'Readable multi-line strings: SQL, JSON or templates without concatenation or escaped quotes.'
          ),
          code: `String sql = """
        SELECT c.id, c.nombre
        FROM conductores c
        WHERE c.estado = 'ACTIVO'
        """;`,
        },
        {
          name: tx('NullPointerException con detalle', 'Helpful NullPointerExceptions'),
          desc: tx(
            'El mensaje dice exactamente qué era null. Ahorra mucho tiempo leyendo logs.',
            'The message tells you exactly what was null. Saves a lot of time reading logs.'
          ),
          code: `// Cannot invoke "String.length()" because "cliente.direccion().calle()" is null`,
        },
      ],
    },
    {
      id: 'java21',
      version: 'Java 21 LTS',
      year: '2023',
      usedAt: tx(
        'No fue la versión base de ningún proyecto mío; lo que más uso de aquí lo aprovecho hoy en Java 25.',
        'It wasn’t the baseline of any of my projects; what I use most from it I use today on Java 25.'
      ),
      features: [
        {
          name: 'Virtual threads',
          desc: tx(
            'Hilos baratos que maneja la JVM: puedes tener uno por request y escribir código bloqueante normal sin agotar el pool.',
            'Cheap JVM-managed threads: you can have one per request and write normal blocking code without exhausting the pool.'
          ),
          code: `try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    pedidos.forEach(p -> executor.submit(() -> procesar(p)));
}

// Spring Boot 3.2+: spring.threads.virtual.enabled=true`,
        },
        {
          name: 'Pattern matching para switch',
          desc: tx(
            'Final en Java 21 (en 17 era preview). Con sealed + records, el switch cubre todos los casos sin default.',
            'Final in Java 21 (it was a preview in 17). With sealed + records, the switch covers every case without a default.'
          ),
          code: `String mensaje = switch (resultado) {
    case Aprobado a -> "Aprobado: " + a.autorizacion();
    case Rechazado r when r.motivo().contains("saldo") -> "Saldo insuficiente";
    case Rechazado r -> "Rechazado: " + r.motivo();
    case Pendiente p -> "En proceso";
};`,
        },
        {
          name: 'Record patterns',
          desc: tx(
            'Desarmas un record directamente en el patrón.',
            'Destructure a record right in the pattern.'
          ),
          code: `if (evento instanceof InfraccionDetectada(var conductor, var tipo, var fecha)) {
    alertar(conductor, tipo);
}`,
        },
        {
          name: 'Sequenced collections',
          desc: tx(
            'getFirst(), getLast() y reversed() en List, Deque y LinkedHashMap, con la misma API.',
            'getFirst(), getLast() and reversed() on List, Deque and LinkedHashMap, with the same API.'
          ),
          code: `var ultimo = movimientos.getLast();
var masRecientes = movimientos.reversed();`,
        },
        {
          name: 'String templates',
          desc: tx(
            'Ojo: fue preview en 21 y 22 y se retiró en Java 23. Si aparece en una entrevista, la respuesta correcta es que ya no existe.',
            'Careful: it was a preview in 21 and 22 and was withdrawn in Java 23. If it comes up in an interview, the right answer is that it no longer exists.'
          ),
          code: `// Ya no compila en Java 23+
// String msg = STR."Hola \\{nombre}";

String msg = "Hola %s".formatted(nombre); // la alternativa estable`,
        },
      ],
    },
    {
      id: 'java25',
      version: 'Java 25 LTS',
      year: '2025',
      usedAt: tx(
        'Scotiabank Perú: pagos QR con Spring Boot 4 y WebFlux.',
        'Scotiabank Peru: QR payments with Spring Boot 4 and WebFlux.'
      ),
      features: [
        {
          name: 'Scoped values',
          desc: tx(
            'Final en 25. Reemplazo inmutable de ThreadLocal para pasar contexto (usuario, request id) y que funciona bien con virtual threads.',
            'Final in 25. Immutable replacement for ThreadLocal to pass context (user, request id) that plays well with virtual threads.'
          ),
          code: `static final ScopedValue<String> REQUEST_ID = ScopedValue.newInstance();

ScopedValue.where(REQUEST_ID, "req-8f2a").run(() -> procesarPago());

void procesarPago() {
    log.info("[{}] procesando", REQUEST_ID.get());
}`,
        },
        {
          name: tx('Constructores flexibles', 'Flexible constructor bodies'),
          desc: tx(
            'Puedes validar argumentos antes de llamar a super(). Antes había que meter esa lógica en un método estático.',
            'You can validate arguments before calling super(). Before, that logic had to live in a static helper.'
          ),
          code: `class PagoQr extends Pago {
    PagoQr(BigDecimal monto) {
        if (monto.signum() <= 0) {
            throw new IllegalArgumentException("Monto inválido");
        }
        super(monto);
    }
}`,
        },
        {
          name: tx('Archivos compactos y main de instancia', 'Compact source files and instance main'),
          desc: tx(
            'Un programa sin clase ni public static void main. Útil para scripts y para enseñar; en servicios no cambia nada.',
            'A program with no class and no public static void main. Handy for scripts and teaching; for services nothing changes.'
          ),
          code: `void main() {
    IO.println("Hola desde Java 25");
}`,
        },
        {
          name: 'Module import declarations',
          desc: tx(
            'import module java.base; trae todos los paquetes exportados de un módulo de una vez.',
            'import module java.base; pulls in every package a module exports at once.'
          ),
          code: `import module java.base;

void main() {
    var monedas = List.of("PEN", "USD");
    IO.println(monedas);
}`,
        },
        {
          name: 'Compact object headers',
          desc: tx(
            'Reduce el encabezado de cada objeto a 64 bits: menos memoria en heaps con muchos objetos pequeños. En 25 se activa con un flag; no es el default.',
            'Shrinks every object header to 64 bits: less memory on heaps full of small objects. In 25 you enable it with a flag; it’s not the default.'
          ),
          code: `java -XX:+UseCompactObjectHeaders -jar pagos-qr.jar`,
        },
        {
          name: 'Structured concurrency (preview)',
          desc: tx(
            'Sigue en preview (quinta). Lanza subtareas en paralelo y, si una falla, cancela las demás. Útil para saber hacia dónde va Java, no para producción todavía.',
            'Still in preview (fifth round). Launch subtasks in parallel and, if one fails, cancel the rest. Good to know where Java is heading, not for production yet.'
          ),
          code: `try (var scope = StructuredTaskScope.open()) {
    var cliente = scope.fork(() -> buscarCliente(id));
    var cuentas = scope.fork(() -> buscarCuentas(id));
    scope.join(); // si una falla, la otra se cancela
    return new Resumen(cliente.get(), cuentas.get());
}`,
        },
      ],
    },
  ];
}

export function buildJavaFundamentals(tx) {
  return [
    {
      id: 'jvm',
      topic: tx('La JVM', 'The JVM'),
      description: tx(
        'Compilas a bytecode una vez y la JVM lo ejecuta en cualquier sistema. Por dentro tiene tres piezas que vale la pena saber explicar.',
        'You compile to bytecode once and the JVM runs it on any system. Inside there are three pieces worth being able to explain.'
      ),
      points: [
        tx(
          'Class loaders: cargan las clases cuando se necesitan. Desde Java 9 son Bootstrap, Platform y Application, y delegan primero al padre.',
          'Class loaders: load classes when needed. Since Java 9 they are Bootstrap, Platform and Application, and they delegate to the parent first.'
        ),
        tx(
          'Áreas de memoria: el heap (objetos, compartido), un stack por hilo (variables locales y llamadas) y el metaspace (metadata de clases).',
          'Memory areas: the heap (objects, shared), one stack per thread (locals and calls) and metaspace (class metadata).'
        ),
        tx(
          'Motor de ejecución: interpreta el bytecode, y el JIT compila a código nativo lo que más se usa. Por eso un servicio Java “calienta” después de arrancar.',
          'Execution engine: interprets bytecode, and the JIT compiles the hottest code to native. That’s why a Java service “warms up” after startup.'
        ),
      ],
      code: `Runtime rt = Runtime.getRuntime();
long maxMb = rt.maxMemory() / (1024 * 1024);
long usadoMb = (rt.totalMemory() - rt.freeMemory()) / (1024 * 1024);
System.out.printf("Heap usado: %d MB de %d MB%n", usadoMb, maxMb);`,
    },
    {
      id: 'memory',
      topic: tx('Memoria', 'Memory'),
      description: tx(
        'La pregunta clásica es heap vs stack. La respuesta corta: los objetos viven en el heap; las variables locales y las referencias, en el stack de cada hilo.',
        'The classic question is heap vs stack. Short answer: objects live on the heap; local variables and references live on each thread’s stack.'
      ),
      points: [
        tx(
          'El heap se divide en generaciones: la mayoría de objetos muere joven, así que limpiar la young generation seguido es barato.',
          'The heap is split into generations: most objects die young, so collecting the young generation often is cheap.'
        ),
        tx(
          'El stack es por hilo y se libera solo al terminar cada método. Si una recursión no termina, ves StackOverflowError.',
          'The stack is per thread and frees itself when each method returns. If a recursion never ends, you get StackOverflowError.'
        ),
        tx(
          'Metaspace (desde Java 8) guarda la metadata de clases fuera del heap y reemplazó a PermGen.',
          'Metaspace (since Java 8) stores class metadata outside the heap and replaced PermGen.'
        ),
        tx(
          'Un memory leak en Java es un objeto que sigue referenciado sin que lo necesites: colecciones estáticas, cachés sin límite, ThreadLocal sin limpiar.',
          'A memory leak in Java is an object that stays referenced when you no longer need it: static collections, unbounded caches, ThreadLocals never cleaned.'
        ),
      ],
      code: `public void procesar() {
    int intentos = 3;                       // stack
    var pago = new Pago(BigDecimal.TEN);    // referencia en stack, objeto en heap
}   // al salir, el frame del stack desaparece; el objeto queda para el GC

// Leak típico: una caché estática que nunca se limpia
private static final Map<String, byte[]> CACHE = new HashMap<>();`,
    },
    {
      id: 'gc',
      topic: tx('Garbage collection', 'Garbage collection'),
      description: tx(
        'El GC libera objetos que ya nadie referencia. Lo importante en entrevista no es recitar algoritmos sino saber elegir y medir.',
        'The GC frees objects nobody references anymore. What matters in an interview isn’t reciting algorithms but knowing how to choose and measure.'
      ),
      points: [
        tx(
          'G1 es el default desde Java 9: buen equilibrio entre pausas y throughput. Es la respuesta segura para casi cualquier servicio.',
          'G1 has been the default since Java 9: a good balance of pauses and throughput. It’s the safe answer for almost any service.'
        ),
        tx(
          'ZGC y Shenandoah apuntan a pausas de pocos milisegundos incluso con heaps enormes. ZGC es generacional por defecto desde Java 23.',
          'ZGC and Shenandoah aim for pauses of a few milliseconds even on huge heaps. ZGC has been generational by default since Java 23.'
        ),
        tx(
          'Parallel GC prioriza throughput: buena opción para procesos batch donde las pausas no importan.',
          'Parallel GC favors throughput: a good fit for batch jobs where pauses don’t matter.'
        ),
        tx(
          'Antes de tocar flags, mira los logs del GC. Los flags viejos como PrintGCDetails ya no existen desde Java 9; ahora es -Xlog:gc*.',
          'Before touching flags, read the GC logs. Old flags like PrintGCDetails are gone since Java 9; now it’s -Xlog:gc*.'
        ),
      ],
      code: `# Servicio típico: G1 con heap fijo
java -XX:+UseG1GC -Xms2g -Xmx2g -XX:MaxGCPauseMillis=200 -jar app.jar

# Latencia muy baja
java -XX:+UseZGC -Xmx16g -jar app.jar

# Logs del GC (unified logging)
java -Xlog:gc*:file=gc.log:time,uptime -jar app.jar`,
    },
    {
      id: 'oop',
      topic: tx('Programación orientada a objetos', 'Object-oriented programming'),
      description: tx(
        'Los cuatro pilares, dichos como los explicaría en una entrevista y no como en un libro.',
        'The four pillars, the way I’d explain them in an interview rather than a textbook.'
      ),
      points: [
        tx(
          'Encapsulación: el objeto protege sus reglas. Una Cuenta no expone setSaldo(); expone debitar() y valida ahí.',
          'Encapsulation: the object guards its own rules. An Account doesn’t expose setBalance(); it exposes debit() and validates there.'
        ),
        tx(
          'Herencia: reutilizar por relación “es un”. Úsala con cuidado; casi siempre la composición es más flexible.',
          'Inheritance: reuse through an “is a” relationship. Use it carefully; composition is almost always more flexible.'
        ),
        tx(
          'Polimorfismo: el mismo llamado hace cosas distintas según el objeto real. Es lo que hace funcionar Strategy y la inyección de dependencias.',
          'Polymorphism: the same call does different things depending on the real object. It’s what makes Strategy and dependency injection work.'
        ),
        tx(
          'Abstracción: mostrar el qué y esconder el cómo, normalmente con interfaces.',
          'Abstraction: show the what and hide the how, usually with interfaces.'
        ),
      ],
      code: `public class Cuenta {
    private BigDecimal saldo = BigDecimal.ZERO; // encapsulado

    public void debitar(BigDecimal monto) {
        if (monto.compareTo(saldo) > 0) {
            throw new SaldoInsuficienteException();
        }
        saldo = saldo.subtract(monto);
    }
}

interface Notificador { void enviar(String mensaje); }      // abstracción

class NotificadorSms implements Notificador {
    public void enviar(String mensaje) { /* Twilio */ }
}

Notificador n = new NotificadorSms();                         // polimorfismo
n.enviar("Tu código es 4821");`,
    },
    {
      id: 'collections',
      topic: tx('Colecciones', 'Collections'),
      description: tx(
        'Elegir la colección correcta es elegir la complejidad correcta. En el día a día, ArrayList y HashMap cubren casi todo.',
        'Picking the right collection is picking the right complexity. Day to day, ArrayList and HashMap cover almost everything.'
      ),
      points: [
        tx(
          'ArrayList: acceso por índice O(1). LinkedList casi nunca gana en la práctica, incluso para inserciones, por cómo funciona la caché del CPU.',
          'ArrayList: O(1) index access. LinkedList almost never wins in practice, even for inserts, because of how CPU caches work.'
        ),
        tx(
          'HashMap / HashSet: O(1) promedio, sin orden. LinkedHashMap mantiene el orden de inserción; TreeMap ordena por clave en O(log n).',
          'HashMap / HashSet: O(1) on average, no order. LinkedHashMap keeps insertion order; TreeMap sorts by key in O(log n).'
        ),
        tx(
          'ArrayDeque para pilas y colas (mejor que Stack, que es legacy). PriorityQueue cuando necesitas sacar siempre el menor.',
          'ArrayDeque for stacks and queues (better than Stack, which is legacy). PriorityQueue when you always need the smallest item.'
        ),
        tx(
          'List.of() y Map.of() crean colecciones inmutables: perfectas para constantes y retornos.',
          'List.of() and Map.of() create immutable collections: perfect for constants and return values.'
        ),
      ],
      code: `List<String> monedas = List.of("PEN", "USD");          // inmutable
Map<String, ProveedorMvr> porEstado = new HashMap<>();   // lookup O(1)
Map<String, Integer> conteo = new TreeMap<>();           // claves ordenadas

Deque<String> pila = new ArrayDeque<>();
pila.push("a");
pila.pop();

PriorityQueue<Tarea> cola = new PriorityQueue<>(Comparator.comparing(Tarea::prioridad));`,
    },
    {
      id: 'concurrency',
      topic: tx('Concurrencia', 'Concurrency'),
      description: tx(
        'Más que saber crear hilos, importa saber compartir estado sin romperlo. Y hoy hay tres modelos: pools clásicos, reactivo y virtual threads.',
        'More than knowing how to create threads, what matters is sharing state without breaking it. And today there are three models: classic pools, reactive and virtual threads.'
      ),
      points: [
        tx(
          'Nunca crees hilos sueltos en un servicio: usa un ExecutorService o lo que te da el framework.',
          'Never spawn loose threads in a service: use an ExecutorService or whatever the framework gives you.'
        ),
        tx(
          'Estados de un Thread: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING y TERMINATED. “Running” no es un estado aparte en Java.',
          'Thread states: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING and TERMINATED. “Running” isn’t a separate state in Java.'
        ),
        tx(
          'synchronized y Lock dan exclusión; volatile solo da visibilidad; las clases Atomic hacen operaciones atómicas sin bloquear.',
          'synchronized and Lock give mutual exclusion; volatile only gives visibility; Atomic classes do atomic operations without locking.'
        ),
        tx(
          'Para cargas de I/O: WebFlux (lo uso en Scotiabank) o virtual threads (Java 21+). Ambos atienden muchas conexiones con pocos hilos de plataforma.',
          'For I/O-heavy loads: WebFlux (what I use at Scotiabank) or virtual threads (Java 21+). Both serve many connections with few platform threads.'
        ),
      ],
      code: `// Contador compartido sin locks
private final AtomicLong procesados = new AtomicLong();
procesados.incrementAndGet();

// Pool con tamaño acotado
ExecutorService pool = Executors.newFixedThreadPool(8);
Future<Resumen> futuro = pool.submit(() -> generarResumen(id));

// Mapa compartido entre hilos
ConcurrentHashMap<String, Integer> intentos = new ConcurrentHashMap<>();
intentos.merge(usuario, 1, Integer::sum);`,
    },
    {
      id: 'exceptions',
      topic: tx('Excepciones', 'Exceptions'),
      description: tx(
        'Lo que más se nota en code review no es la sintaxis, sino dónde se capturan y qué se hace con ellas.',
        'What shows in code review isn’t the syntax, it’s where exceptions are caught and what’s done with them.'
      ),
      points: [
        tx(
          'Checked (IOException, SQLException): el compilador obliga a manejarlas. Unchecked (RuntimeException): no.',
          'Checked (IOException, SQLException): the compiler forces you to handle them. Unchecked (RuntimeException): it doesn’t.'
        ),
        tx(
          'En servicios Spring uso excepciones de dominio unchecked (SaldoInsuficienteException) y las traduzco a HTTP en un solo @RestControllerAdvice.',
          'In Spring services I use unchecked domain exceptions (SaldoInsuficienteException) and translate them to HTTP in a single @RestControllerAdvice.'
        ),
        tx(
          'try-with-resources para todo lo que se cierra: conexiones, streams, archivos.',
          'try-with-resources for anything that closes: connections, streams, files.'
        ),
        tx(
          'Nunca un catch vacío, y no uses excepciones para controlar el flujo normal.',
          'Never an empty catch, and don’t use exceptions for normal control flow.'
        ),
      ],
      code: `public class SaldoInsuficienteException extends RuntimeException {
    public SaldoInsuficienteException() {
        super("Saldo insuficiente");
    }
}

@RestControllerAdvice
class ManejadorErrores {

    @ExceptionHandler(SaldoInsuficienteException.class)
    ResponseEntity<ErrorDto> saldo(SaldoInsuficienteException e) {
        return ResponseEntity.unprocessableEntity().body(new ErrorDto("SALDO", e.getMessage()));
    }
}

try (var lector = Files.newBufferedReader(Path.of("tramas.txt"))) {
    lector.lines().forEach(this::procesar);
}`,
    },
    {
      id: 'performance',
      topic: tx('Rendimiento', 'Performance'),
      description: tx(
        'La regla número uno: mide antes de optimizar. La mayoría de los problemas reales están en la base de datos o en llamadas de red, no en el código Java.',
        'Rule number one: measure before optimizing. Most real problems are in the database or network calls, not in the Java code.'
      ),
      points: [
        tx(
          'Primero mira consultas: N+1 en JPA, índices faltantes, traer columnas que no usas. En Qorta y Scotiabank las mejoras grandes vinieron de ahí.',
          'Look at queries first: JPA N+1, missing indexes, fetching columns you don’t use. At Qorta and Scotiabank the big wins came from there.'
        ),
        tx(
          'StringBuilder para concatenar dentro de bucles; fuera de bucles el compilador ya optimiza el +.',
          'StringBuilder for concatenation inside loops; outside loops the compiler already optimizes +.'
        ),
        tx(
          'Evita boxing en bucles calientes (int vs Integer) y dale capacidad inicial a colecciones grandes.',
          'Avoid boxing in hot loops (int vs Integer) and give large collections an initial capacity.'
        ),
        tx(
          'Herramientas: JFR y async-profiler en producción, VisualVM en local.',
          'Tools: JFR and async-profiler in production, VisualVM locally.'
        ),
      ],
      code: `// N+1: una consulta por cada pedido para traer sus items
List<Pedido> pedidos = pedidoRepository.findAll();
pedidos.forEach(p -> p.getItems().size());

// Una sola consulta con fetch join
@Query("SELECT p FROM Pedido p JOIN FETCH p.items WHERE p.estado = :estado")
List<Pedido> conItems(@Param("estado") Estado estado);

// Concatenar en bucle
var sb = new StringBuilder();
for (var linea : lineas) {
    sb.append(linea).append('\\n');
}`,
    },
  ];
}

export function buildJavaInterview(tx) {
  return [
    {
      level: 'Junior',
      items: [
        {
          q: tx('¿Qué es la programación orientada a objetos?', 'What is object-oriented programming?'),
          a: tx(
            'Organizar el código en objetos que juntan datos y comportamiento. Se apoya en cuatro ideas: encapsulación (el objeto protege sus reglas), herencia, polimorfismo y abstracción. En la práctica, lo que más uso son encapsulación y polimorfismo a través de interfaces.',
            'Organizing code into objects that bundle data and behavior. It rests on four ideas: encapsulation (the object guards its rules), inheritance, polymorphism and abstraction. In practice, what I use most is encapsulation and polymorphism through interfaces.'
          ),
        },
        {
          q: tx('¿== vs equals()?', '== vs equals()?'),
          a: tx(
            '== compara si son el mismo objeto en memoria; equals() compara el contenido según lo que defina la clase. Con Strings y BigDecimal siempre equals (o compareTo en BigDecimal, porque 1.0 y 1.00 no son equals).',
            '== checks whether they’re the same object in memory; equals() compares content as the class defines it. With Strings and BigDecimal always use equals (or compareTo for BigDecimal, since 1.0 and 1.00 aren’t equal).'
          ),
          inPractice: tx(
            'En banca el detalle de BigDecimal importa: comparar montos con equals puede dar false aunque valgan lo mismo.',
            'In banking the BigDecimal detail matters: comparing amounts with equals can return false even when they’re worth the same.'
          ),
        },
        {
          q: tx('¿Qué pasa si sobrescribes equals() sin hashCode()?', 'What happens if you override equals() without hashCode()?'),
          a: tx(
            'Rompes HashMap y HashSet: dos objetos “iguales” caen en buckets distintos y el mapa no los encuentra. El contrato es que si equals da true, hashCode debe ser igual. Los records lo resuelven solos.',
            'You break HashMap and HashSet: two “equal” objects land in different buckets and the map can’t find them. The contract is that if equals is true, hashCode must match. Records handle this for you.'
          ),
        },
        {
          q: tx('¿String vs StringBuilder vs StringBuffer?', 'String vs StringBuilder vs StringBuffer?'),
          a: tx(
            'String es inmutable: cada cambio crea un objeto nuevo. StringBuilder es mutable y rápido, para armar texto en bucles. StringBuffer es lo mismo pero sincronizado; casi nunca hace falta.',
            'String is immutable: every change creates a new object. StringBuilder is mutable and fast, for building text in loops. StringBuffer is the same but synchronized; you almost never need it.'
          ),
        },
        {
          q: tx('¿Excepción checked vs unchecked?', 'Checked vs unchecked exception?'),
          a: tx(
            'Las checked (IOException) el compilador te obliga a capturarlas o declararlas. Las unchecked (RuntimeException) no. Para errores de negocio prefiero unchecked y un manejador central.',
            'Checked ones (IOException) the compiler forces you to catch or declare. Unchecked ones (RuntimeException) it doesn’t. For business errors I prefer unchecked plus a central handler.'
          ),
          inPractice: tx(
            'En Spring: excepciones de dominio + @RestControllerAdvice que las convierte en respuestas HTTP con un formato único.',
            'In Spring: domain exceptions + a @RestControllerAdvice that turns them into HTTP responses with a single format.'
          ),
        },
        {
          q: tx('¿Clase abstracta vs interfaz?', 'Abstract class vs interface?'),
          a: tx(
            'Una clase abstracta puede tener estado y constructor, y solo heredas de una. Una interfaz define un contrato; puedes implementar varias, y desde Java 8 y 9 también tiene métodos default, static y private. Hoy uso interfaces para casi todo y clases abstractas solo cuando comparto estado.',
            'An abstract class can have state and a constructor, and you can extend only one. An interface defines a contract; you can implement many, and since Java 8 and 9 it can also have default, static and private methods. Today I use interfaces for almost everything and abstract classes only when sharing state.'
          ),
        },
        {
          q: 'final, finally, finalize',
          a: tx(
            'final: no se puede reasignar, sobrescribir o heredar. finally: bloque que corre siempre después de un try. finalize: método que llamaba el GC antes de liberar un objeto; está deprecado y no se debe usar.',
            'final: can’t be reassigned, overridden or extended. finally: a block that always runs after a try. finalize: a method the GC used to call before freeing an object; it’s deprecated and shouldn’t be used.'
          ),
        },
        {
          q: tx('¿ArrayList vs LinkedList?', 'ArrayList vs LinkedList?'),
          a: tx(
            'En teoría LinkedList inserta en O(1), pero solo si ya estás parado en esa posición. En la práctica ArrayList gana casi siempre por localidad de memoria. Mi respuesta corta: ArrayList por defecto.',
            'In theory LinkedList inserts in O(1), but only if you’re already at that position. In practice ArrayList almost always wins thanks to memory locality. My short answer: ArrayList by default.'
          ),
        },
        {
          q: tx('¿Overloading vs overriding?', 'Overloading vs overriding?'),
          a: tx(
            'Overloading: mismo nombre, distintos parámetros, se decide al compilar. Overriding: la subclase redefine un método con la misma firma y se decide en runtime. El overriding es el polimorfismo de verdad.',
            'Overloading: same name, different parameters, decided at compile time. Overriding: the subclass redefines a method with the same signature and it’s decided at runtime. Overriding is the real polymorphism.'
          ),
        },
        {
          q: tx('¿Qué significa static?', 'What does static mean?'),
          a: tx(
            'Que pertenece a la clase y no a cada instancia. Útil para constantes y utilidades. Cuidado con estado static mutable: es global y compartido entre hilos.',
            'That it belongs to the class, not to each instance. Useful for constants and utilities. Watch out for mutable static state: it’s global and shared across threads.'
          ),
        },
      ],
    },
    {
      level: 'Mid',
      items: [
        {
          q: tx('¿Cómo funciona un HashMap por dentro?', 'How does a HashMap work internally?'),
          a: tx(
            'Calcula el hashCode de la clave para elegir un bucket dentro de un arreglo. Si dos claves caen en el mismo bucket, se guardan en una lista, y desde Java 8 si esa lista crece mucho se convierte en un árbol. get y put son O(1) en promedio, y cuando se llena más del 75% duplica su tamaño.',
            'It hashes the key to pick a bucket in an array. If two keys land in the same bucket, they’re stored in a list, and since Java 8, if that list grows too long it becomes a tree. get and put are O(1) on average, and when it’s more than 75% full it doubles in size.'
          ),
          inPractice: tx(
            'Es lo que hay detrás de los Map<String, Proveedor> que uso para elegir implementaciones (Factory/Strategy) en tiempo constante.',
            'It’s what sits behind the Map<String, Provider> I use to pick implementations (Factory/Strategy) in constant time.'
          ),
        },
        {
          q: tx('Streams: ¿ventajas y cuándo no usarlos?', 'Streams: advantages and when not to use them?'),
          a: tx(
            'Hacen el código declarativo y fácil de leer para filtrar, transformar y agrupar. No los uso cuando necesito índices, cuando hay lógica con muchos efectos secundarios o en bucles muy calientes donde un for simple es más claro. Y parallelStream casi nunca en un servicio web: compite con los hilos del servidor.',
            'They make filtering, mapping and grouping declarative and easy to read. I skip them when I need indexes, when there’s logic full of side effects, or in very hot loops where a plain for is clearer. And almost never parallelStream in a web service: it competes with the server’s threads.'
          ),
        },
        {
          q: tx('¿Optional: cuándo y cómo?', 'Optional: when and how?'),
          a: tx(
            'Como tipo de retorno cuando puede no haber resultado. No como campo ni como parámetro. Y nunca .get() sin verificar: usa orElse, orElseThrow o map.',
            'As a return type when there may be no result. Not as a field or a parameter. And never .get() without checking: use orElse, orElseThrow or map.'
          ),
          inPractice: tx(
            'repository.findById(id).orElseThrow(...) es probablemente la línea que más he escrito con Spring Data.',
            'repository.findById(id).orElseThrow(...) is probably the line I’ve written most with Spring Data.'
          ),
        },
        {
          q: tx('¿synchronized vs volatile vs Atomic?', 'synchronized vs volatile vs Atomic?'),
          a: tx(
            'synchronized deja entrar a un hilo a la vez y además garantiza visibilidad. volatile solo garantiza que todos vean el último valor, pero count++ sigue sin ser seguro. Las clases Atomic hacen operaciones como incrementAndGet de forma atómica sin bloquear.',
            'synchronized lets one thread in at a time and also guarantees visibility. volatile only guarantees everyone sees the latest value, but count++ is still unsafe. Atomic classes do operations like incrementAndGet atomically without locking.'
          ),
        },
        {
          q: tx('¿ConcurrentHashMap vs Hashtable vs Collections.synchronizedMap?', 'ConcurrentHashMap vs Hashtable vs Collections.synchronizedMap?'),
          a: tx(
            'Hashtable y synchronizedMap bloquean todo el mapa en cada operación. ConcurrentHashMap lee sin bloquear y, desde Java 8, al escribir usa CAS y bloquea solo el bucket afectado (ya no usa segmentos). Además trae operaciones atómicas como merge y computeIfAbsent. No acepta claves ni valores null.',
            'Hashtable and synchronizedMap lock the whole map on every operation. ConcurrentHashMap reads without locking and, since Java 8, writes use CAS and lock only the affected bucket (it no longer uses segments). It also offers atomic operations like merge and computeIfAbsent. It doesn’t accept null keys or values.'
          ),
        },
        {
          q: tx('¿Comparable vs Comparator?', 'Comparable vs Comparator?'),
          a: tx(
            'Comparable define el orden natural dentro de la clase (compareTo). Comparator define órdenes externos, y puedes tener varios. Con Comparator.comparing(...).thenComparing(...) queda muy legible.',
            'Comparable defines the natural order inside the class (compareTo). Comparator defines external orders, and you can have several. With Comparator.comparing(...).thenComparing(...) it reads very well.'
          ),
        },
        {
          q: tx('¿Por qué importa la inmutabilidad?', 'Why does immutability matter?'),
          a: tx(
            'Un objeto que no cambia es seguro entre hilos sin sincronizar, sirve como clave de un Map y es más fácil de razonar. Records, List.of y los value objects del dominio van en esa línea.',
            'An object that doesn’t change is thread-safe without synchronization, works as a Map key and is easier to reason about. Records, List.of and domain value objects all go that way.'
          ),
        },
        {
          q: tx('Generics y type erasure', 'Generics and type erasure'),
          a: tx(
            'Los genéricos dan seguridad de tipos al compilar y evitan casts. Pero en runtime el tipo se borra: List<String> y List<Integer> son la misma clase. Por eso no puedes hacer new T() ni instanceof List<String>.',
            'Generics give compile-time type safety and remove casts. But at runtime the type is erased: List<String> and List<Integer> are the same class. That’s why you can’t do new T() or instanceof List<String>.'
          ),
        },
        {
          q: tx('¿Interfaces funcionales y lambdas?', 'Functional interfaces and lambdas?'),
          a: tx(
            'Una interfaz con un solo método abstracto se puede implementar con una lambda. Las que más uso: Function, Predicate, Consumer y Supplier. Spring Cloud Stream, por ejemplo, define consumidores como beans Consumer<T>.',
            'An interface with a single abstract method can be implemented with a lambda. The ones I use most: Function, Predicate, Consumer and Supplier. Spring Cloud Stream, for example, defines consumers as Consumer<T> beans.'
          ),
        },
        {
          q: tx('¿Iteradores fail-fast vs fail-safe?', 'Fail-fast vs fail-safe iterators?'),
          a: tx(
            'Fail-fast (ArrayList, HashMap) lanzan ConcurrentModificationException si modificas la colección mientras la recorres. Los de colecciones concurrentes (CopyOnWriteArrayList, ConcurrentHashMap) no fallan: recorren una copia o una vista consistente. Para borrar mientras iteras, usa removeIf.',
            'Fail-fast ones (ArrayList, HashMap) throw ConcurrentModificationException if you modify the collection while iterating. Concurrent collections (CopyOnWriteArrayList, ConcurrentHashMap) don’t fail: they walk a copy or a consistent view. To delete while iterating, use removeIf.'
          ),
        },
        {
          q: tx('¿Buenas prácticas con excepciones?', 'Exception handling best practices?'),
          a: tx(
            'Captura lo específico, no Exception. Nunca un catch vacío. Si la relanzas, envuelve la original como causa. try-with-resources para recursos. Y loguea en un solo lugar, no en cada capa.',
            'Catch specific types, not Exception. Never an empty catch. If you rethrow, wrap the original as the cause. try-with-resources for resources. And log in one place, not in every layer.'
          ),
          inPractice: tx(
            'En GNB los tests cubrían también los caminos de error: excepciones controladas probadas con JUnit y Mockito para pasar el gate de cobertura.',
            'At GNB tests also covered the error paths: handled exceptions tested with JUnit and Mockito to pass the coverage gate.'
          ),
        },
        {
          q: tx('¿JPA vs Hibernate vs Spring Data JPA?', 'JPA vs Hibernate vs Spring Data JPA?'),
          a: tx(
            'JPA es la especificación. Hibernate es la implementación que la cumple. Spring Data JPA es la capa de Spring encima que te genera los repositorios a partir de interfaces y nombres de métodos.',
            'JPA is the specification. Hibernate is the implementation. Spring Data JPA is Spring’s layer on top that generates repositories from interfaces and method names.'
          ),
          inPractice: tx(
            'En Banco GNB la persistencia era JPA/Hibernate sobre SQL Server; el problema típico a vigilar era el N+1.',
            'At Banco GNB persistence was JPA/Hibernate on SQL Server; the classic problem to watch for was N+1.'
          ),
        },
      ],
    },
    {
      level: 'Senior',
      items: [
        {
          q: tx('¿Virtual threads o WebFlux?', 'Virtual threads or WebFlux?'),
          a: tx(
            'Los dos resuelven lo mismo: muchas conexiones de I/O con pocos hilos de plataforma. Virtual threads te deja escribir código bloqueante normal; WebFlux exige programar con Mono y Flux, pero te da backpressure y streaming. Para un servicio nuevo con drivers bloqueantes, hoy elegiría virtual threads.',
            'Both solve the same thing: many I/O connections with few platform threads. Virtual threads let you write normal blocking code; WebFlux makes you program with Mono and Flux, but gives you backpressure and streaming. For a new service with blocking drivers, today I’d choose virtual threads.'
          ),
          inPractice: tx(
            'En Scotiabank los pagos QR corren sobre WebFlux; lo importante ahí es no bloquear nunca el event loop (por ejemplo, con un driver JDBC).',
            'At Scotiabank the QR payments run on WebFlux; the key there is never blocking the event loop (with a JDBC driver, for example).'
          ),
        },
        {
          q: tx('¿Cómo manejas transacciones entre microservicios?', 'How do you handle transactions across microservices?'),
          a: tx(
            'No hay un @Transactional que cruce servicios. Uso sagas: cada paso tiene su compensación si algo falla después. Pueden ser coreografiadas (eventos) u orquestadas (un coordinador). Y el patrón outbox para que guardar en la base y publicar el evento no se desincronicen.',
            'There’s no @Transactional that spans services. I use sagas: each step has a compensation if something fails later. They can be choreographed (events) or orchestrated (a coordinator). And the outbox pattern so saving to the database and publishing the event don’t drift apart.'
          ),
          inPractice: tx(
            'En Lynk y AgentCloud la comunicación asíncrona iba por Kafka, así que la idempotencia de los consumidores era obligatoria.',
            'At Lynk and AgentCloud async communication went through Kafka, so idempotent consumers were mandatory.'
          ),
        },
        {
          q: tx('¿Cómo implementas un circuit breaker?', 'How do you implement a circuit breaker?'),
          a: tx(
            'Con Resilience4j (Hystrix ya no se mantiene). Tiene tres estados: cerrado (todo normal), abierto (deja de llamar y responde con fallback) y semiabierto (prueba si el servicio volvió). Siempre va junto con timeouts; un breaker sin timeout no protege nada.',
            'With Resilience4j (Hystrix is no longer maintained). It has three states: closed (normal), open (stops calling and returns a fallback) and half-open (checks whether the service is back). It always goes with timeouts; a breaker without a timeout protects nothing.'
          ),
          inPractice: tx(
            'En Lynk cada cliente Feign tenía timeout y fallback para que un servicio caído no arrastrara a la billetera completa.',
            'At Lynk every Feign client had a timeout and a fallback so one service going down wouldn’t drag the whole wallet with it.'
          ),
        },
        {
          q: tx('Memory leaks en Java: causas y cómo encontrarlos', 'Memory leaks in Java: causes and how to find them'),
          a: tx(
            'Causas típicas: colecciones estáticas que crecen, cachés sin límite, ThreadLocal sin limpiar en pools, listeners que nunca se quitan. Para encontrarlos: heap dump (jcmd GC.heap_dump) y analizarlo con Eclipse MAT buscando qué retiene más memoria.',
            'Typical causes: growing static collections, unbounded caches, ThreadLocals not cleaned in pools, listeners never removed. To find them: take a heap dump (jcmd GC.heap_dump) and analyze it with Eclipse MAT, looking at what retains the most memory.'
          ),
        },
        {
          q: tx('¿Cómo ajustas el GC para un servicio con mucha carga?', 'How do you tune the GC for a high-load service?'),
          a: tx(
            'Primero mido: logs del GC y métricas de pausas. Fijo -Xms igual a -Xmx en contenedores para evitar redimensionar. G1 para casi todo; ZGC si las pausas importan de verdad. Y reviso que el límite de memoria del contenedor deje espacio fuera del heap.',
            'First I measure: GC logs and pause metrics. I set -Xms equal to -Xmx in containers to avoid resizing. G1 for almost everything; ZGC if pauses really matter. And I check the container memory limit leaves room outside the heap.'
          ),
        },
        {
          q: tx('¿Cómo diagnosticas un problema de rendimiento en producción?', 'How do you diagnose a performance problem in production?'),
          a: tx(
            'Empiezo por las métricas y las trazas para ubicar dónde se va el tiempo: casi siempre es la base de datos o una llamada externa. Si es la JVM, uso JFR o async-profiler para ver un flame graph, y thread dumps si sospecho de bloqueos.',
            'I start with metrics and traces to see where time goes: it’s almost always the database or an external call. If it’s the JVM, I use JFR or async-profiler for a flame graph, and thread dumps if I suspect blocking.'
          ),
          inPractice: tx(
            'En Scotiabank optimicé la capa de persistencia en SQL Server para cargas transaccionales altas; en Qorta, consultas PostgreSQL sobre volúmenes grandes de conductores.',
            'At Scotiabank I optimized the SQL Server persistence layer for high transactional loads; at Qorta, PostgreSQL queries over large driver datasets.'
          ),
        },
        {
          q: tx('¿Cómo escribes código seguro en Java?', 'How do you write secure Java code?'),
          a: tx(
            'Consultas parametrizadas siempre (nunca concatenar SQL), validación de entrada con Bean Validation, secretos fuera del código, dependencias actualizadas y autenticación con Spring Security. Y no devolver stack traces ni datos internos en los errores.',
            'Always parameterized queries (never concatenated SQL), input validation with Bean Validation, secrets out of the code, up-to-date dependencies and authentication with Spring Security. And never return stack traces or internal data in errors.'
          ),
          inPractice: tx(
            'En Scotiabank remediamos las vulnerabilidades que reportaban las pruebas de penetración, con SonarCloud como gate en el pipeline.',
            'At Scotiabank we fixed the vulnerabilities reported by penetration tests, with SonarCloud as a gate in the pipeline.'
          ),
        },
        {
          q: tx('¿Cómo diseñarías un rate limiter distribuido?', 'How would you design a distributed rate limiter?'),
          a: tx(
            'Con token bucket o sliding window, guardando los contadores en Redis para que todas las instancias compartan el mismo estado, y operaciones atómicas (un script Lua o INCR con expiración). Muchas veces conviene resolverlo en el API gateway y no en cada servicio.',
            'With a token bucket or sliding window, storing counters in Redis so every instance shares the same state, using atomic operations (a Lua script or INCR with expiry). Often it’s better solved at the API gateway rather than in each service.'
          ),
        },
        {
          q: tx('¿Cómo diseñarías una caché distribuida?', 'How would you design a distributed cache?'),
          a: tx(
            'Redis como almacén, con TTL en todo y una política de expulsión (LRU). Cache-aside para lecturas: buscas en caché y, si no está, vas a la base y guardas. Lo difícil es la invalidación: decide qué dato puede estar viejo y cuánto tiempo.',
            'Redis as the store, TTLs on everything and an eviction policy (LRU). Cache-aside for reads: check the cache and, on a miss, go to the database and store it. The hard part is invalidation: decide which data can be stale and for how long.'
          ),
          inPractice: tx(
            'En Tío Grou cacheamos reportes de ventas en Redis con @Cacheable.',
            'At Tío Grou we cached sales reports in Redis with @Cacheable.'
          ),
        },
        {
          q: tx('¿Event sourcing vs CRUD?', 'Event sourcing vs CRUD?'),
          a: tx(
            'CRUD guarda el estado actual. Event sourcing guarda cada cambio como evento y reconstruye el estado a partir de ellos: auditoría completa y puedes ver cómo estaba todo en cualquier momento, a cambio de más complejidad. Lo usaría en dominios donde el historial es el negocio, como un libro contable.',
            'CRUD stores the current state. Event sourcing stores every change as an event and rebuilds state from them: full audit trail and you can see the state at any point in time, at the cost of more complexity. I’d use it where history is the business, like a ledger.'
          ),
        },
        {
          q: tx('¿CompletableFuture vs Future?', 'CompletableFuture vs Future?'),
          a: tx(
            'Future solo te deja esperar con get(), que bloquea. CompletableFuture permite encadenar (thenApply), combinar varias tareas (thenCombine, allOf) y manejar errores (exceptionally) sin bloquear.',
            'Future only lets you wait with get(), which blocks. CompletableFuture lets you chain (thenApply), combine several tasks (thenCombine, allOf) and handle errors (exceptionally) without blocking.'
          ),
        },
        {
          q: tx('¿Cómo funcionan los class loaders?', 'How do class loaders work?'),
          a: tx(
            'Hay una jerarquía: Bootstrap, Platform y Application. Cada uno pregunta primero a su padre antes de cargar una clase. Los custom class loaders se usan para plugins o recarga en caliente, y son una fuente clásica de leaks de metaspace.',
            'There’s a hierarchy: Bootstrap, Platform and Application. Each asks its parent first before loading a class. Custom class loaders are used for plugins or hot reload, and they’re a classic source of metaspace leaks.'
          ),
        },
      ],
    },
  ];
}
