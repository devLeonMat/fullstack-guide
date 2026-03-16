import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Layers, MessageCircleQuestion, Coffee } from 'lucide-react';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';

function JavaPro() {
    const { language } = useLanguage();
    const [activeSection, setActiveSection] = useState('features');
    const [expandedFeatures, setExpandedFeatures] = useState({});
    const [expandedVersions, setExpandedVersions] = useState({
        0: true, // Java 8 abierto por default
    });
    const [expandedFundamentals, setExpandedFundamentals] = useState({
        0: true, // Primer fundamental abierto por default
    });
    const [expandedQuestions, setExpandedQuestions] = useState({});
    const [expandedLevels, setExpandedLevels] = useState({
        junior: true, // Junior level abierto por default
    });

    const toggleFeature = (versionIdx, featureIdx) => {
        const key = `${versionIdx}-${featureIdx}`;
        setExpandedFeatures(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const toggleVersion = (versionIdx) => {
        setExpandedVersions(prev => ({
            ...prev,
            [versionIdx]: !prev[versionIdx]
        }));
    };

    const toggleFundamental = (idx) => {
        setExpandedFundamentals(prev => ({
            ...prev,
            [idx]: !prev[idx]
        }));
    };

    const toggleQuestion = (level, idx) => {
        const key = `${level}-${idx}`;
        setExpandedQuestions(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const toggleLevel = (level) => {
        setExpandedLevels(prev => ({
            ...prev,
            [level]: !prev[level]
        }));
    };

    const sections = {
        features: {
            id: 'features',
            title: 'Features Java 8-25',
            subtitle: 'Características modernas / Modern features',
            icon: Coffee,
            content: [
                {
                    version: 'Java 8 (2014)',
                    features: [
                        { name: 'Lambda Expressions', desc: 'Programación funcional', code: 'List<String> names = list.stream()\n  .filter(s -> s.startsWith("A"))\n  .collect(Collectors.toList());' },
                        { name: 'Stream API', desc: 'Procesamiento de colecciones funcional', code: 'int sum = numbers.stream()\n  .filter(n -> n % 2 == 0)\n  .mapToInt(Integer::intValue)\n  .sum();' },
                        { name: 'Optional', desc: 'Manejo de nulls', code: 'Optional<String> opt = Optional.ofNullable(value);\nString result = opt.orElse("default");' },
                        { name: 'Method References', desc: 'Referencias a métodos (::)', code: 'list.forEach(System.out::println);\nlist.sort(String::compareToIgnoreCase);' },
                        { name: 'Default Methods', desc: 'Métodos en interfaces', code: 'interface MyInterface {\n  default void log(String msg) {\n    System.out.println(msg);\n  }\n}' },
                        { name: 'Date/Time API', desc: 'Nueva API de fechas (java.time)', code: 'LocalDate today = LocalDate.now();\nLocalDateTime dt = LocalDateTime.parse("2024-01-01T10:30");' },
                        { name: 'Nashorn JavaScript', desc: 'Motor JavaScript integrado', code: 'ScriptEngine engine = new ScriptEngineManager()\n  .getEngineByName("nashorn");' },
                        { name: 'CompletableFuture', desc: 'Programación asíncrona', code: 'CompletableFuture.supplyAsync(() -> getData())\n  .thenApply(data -> process(data))\n  .thenAccept(System.out::println);' }
                    ]
                },
                {
                    version: 'Java 11 LTS (2018)',
                    features: [
                        { name: 'var keyword', desc: 'Inferencia de tipos local', code: 'var list = new ArrayList<String>();\nvar result = getData();' },
                        { name: 'String methods', desc: 'isBlank(), strip(), lines(), repeat()', code: 'String text = "  Hello  ";\nboolean blank = text.isBlank();\nString stripped = text.strip();\nString repeated = "Hi".repeat(3);' },
                        { name: 'HTTP Client', desc: 'Cliente HTTP nativo (java.net.http)', code: 'HttpClient client = HttpClient.newHttpClient();\nHttpRequest request = HttpRequest.newBuilder()\n  .uri(URI.create("https://api.example.com"))\n  .build();\nHttpResponse<String> response = \n  client.send(request, BodyHandlers.ofString());' },
                        { name: 'Files methods', desc: 'readString(), writeString()', code: 'String content = Files.readString(Path.of("file.txt"));\nFiles.writeString(Path.of("out.txt"), "data");' },
                        { name: 'Lambda var parameters', desc: 'Anotaciones en lambdas', code: '(@NonNull var x, @Nullable var y) -> x + y' },
                        { name: 'Collection.toArray()', desc: 'Método simplificado', code: 'String[] array = list.toArray(String[]::new);' },
                        { name: 'Epsilon GC', desc: 'No-op garbage collector', code: '-XX:+UseEpsilonGC' },
                        { name: 'Flight Recorder', desc: 'Profiling y diagnóstico', code: 'jcmd <pid> JFR.start' }
                    ]
                },
                {
                    version: 'Java 17 LTS (2021)',
                    features: [
                        { name: 'Records', desc: 'Clases de datos inmutables', code: 'record Person(String name, int age) {}\nPerson p = new Person("John", 30);\nString name = p.name();' },
                        { name: 'Sealed Classes', desc: 'Control de herencia', code: 'sealed interface Shape permits Circle, Square {}\nfinal class Circle implements Shape {}\nfinal class Square implements Shape {}' },
                        { name: 'Pattern Matching for switch', desc: 'Switch mejorado con patterns', code: 'String result = switch(obj) {\n  case Integer i -> "Number: " + i;\n  case String s -> "Text: " + s;\n  case null -> "Null";\n  default -> "Unknown";\n};' },
                        { name: 'Pattern Matching for instanceof', desc: 'Cast automático', code: 'if (obj instanceof String s) {\n  System.out.println(s.toUpperCase());\n}' },
                        { name: 'Text Blocks', desc: 'Strings multilínea', code: 'String json = """\n  {\n    "name": "John",\n    "age": 30\n  }\n  """;' },
                        { name: 'NullPointerException detallado', desc: 'Mensajes descriptivos', code: '// Muestra exactamente qué fue null:\n// Cannot invoke "String.length()"\n// because "name" is null' },
                        { name: 'Stream.toList()', desc: 'Método conveniente', code: 'List<String> list = stream\n  .filter(s -> s.length() > 5)\n  .toList();' },
                        { name: 'Random Generators', desc: 'Nueva API de randoms', code: 'RandomGenerator rng = RandomGenerator.of("L64X128MixRandom");' }
                    ]
                },
                {
                    version: 'Java 21 LTS (2023)',
                    features: [
                        { name: 'Virtual Threads', desc: 'Concurrencia ligera (Project Loom)', code: 'Thread.ofVirtual().start(() -> {\n  System.out.println("Virtual thread");\n});\n\n// Executor con virtual threads\nvar executor = Executors.newVirtualThreadPerTaskExecutor();' },
                        { name: 'Sequenced Collections', desc: 'Nuevas interfaces ordenadas', code: 'SequencedCollection<String> seq = new ArrayList<>();\nseq.addFirst("first");\nseq.addLast("last");\nString first = seq.getFirst();\nvar reversed = seq.reversed();' },
                        { name: 'String Templates (Preview)', desc: 'Interpolación de strings', code: 'String name = "World";\nString msg = STR."Hello \\{name}!";\nString json = JSON."""\n  {"name": "\\{name}"}\n  """;' },
                        { name: 'Record Patterns', desc: 'Deconstrucción de records', code: 'record Point(int x, int y) {}\n\nif (obj instanceof Point(int x, int y)) {\n  System.out.println("x=" + x + ", y=" + y);\n}' },
                        { name: 'Pattern Matching for switch enhanced', desc: 'Patterns en switch', code: 'switch (obj) {\n  case String s when s.length() > 5 -> "Long";\n  case String s -> "Short";\n  case Integer i -> "Number: " + i;\n  default -> "Other";\n}' },
                        { name: 'Scoped Values (Preview)', desc: 'Alternativa a ThreadLocal', code: 'final static ScopedValue<String> USER =\n  ScopedValue.newInstance();\n\nScopedValue.where(USER, "John")\n  .run(() -> process());' },
                        { name: 'Structured Concurrency (Preview)', desc: 'Gestión estructurada de threads', code: 'try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {\n  Future<String> user = scope.fork(() -> fetchUser());\n  Future<Integer> order = scope.fork(() -> fetchOrder());\n  scope.join();\n}' },
                        { name: 'Generational ZGC', desc: 'ZGC generacional mejorado', code: '-XX:+UseZGC -XX:+ZGenerational' }
                    ]
                },
                {
                    version: 'Java 25 LTS (2025)',
                    features: [
                        { name: 'Compact Source Files (JEP 512)', desc: 'Programas simples sin boilerplate - elimina class, public static void main', code: '// Java 25 - No necesitas class ni public static void main\nvoid main() {\n  System.out.println("Hello, Java 25!");\n}\n\n// Equivalente al clásico:\npublic class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}' },
                        { name: 'Module Import Declarations (JEP 511)', desc: 'Importar todos los paquetes de un módulo con una sola sentencia', code: '// Importar todo java.base en un solo import\nimport module java.base;\n\n// En lugar de múltiples imports:\n// import java.util.List;\n// import java.util.Map;\n// import java.io.IOException;\n\nvoid main() {\n  var list = List.of("Java", "25");\n  var map = Map.of("version", 25);\n  list.forEach(System.out::println);\n}' },
                        { name: 'Flexible Constructor Bodies (JEP 513)', desc: 'El constructor es más flexible - super()/this() ya no debe ser la primera línea obligatoria', code: 'class Vehicle {\n  final int speed;\n  Vehicle(int speed) { this.speed = speed; }\n}\n\nclass Car extends Vehicle {\n  Car(int speed) {\n    // Java 25: código ANTES de super()\n    if (speed < 0) throw new IllegalArgumentException("Speed can\'t be negative");\n    int clamped = Math.min(speed, 300);\n    super(clamped); // ya no debe ser la primera línea\n  }\n}' },
                        { name: 'Primitive Types in Patterns (JEP 507)', desc: 'Pattern matching extendido a tipos primitivos - unifica primitivos y objetos', code: 'Object value = 42;\n\n// Pattern matching con primitivos\nswitch (value) {\n  case int i when i > 0 -> System.out.println("Positive: " + i);\n  case int i            -> System.out.println("Non-positive: " + i);\n  case long l           -> System.out.println("Long: " + l);\n  case String s         -> System.out.println("String: " + s);\n  default               -> System.out.println("Other");\n}\n\n// instanceof con primitivos\nif (value instanceof int i) {\n  System.out.println("It\'s an int: " + i);\n}' },
                        { name: 'Compact Object Headers (JEP 519)', desc: 'Encabezados de objeto reducidos de 128 a 64 bits - menor huella de memoria, mejor cache', code: '// Comportamiento automático - no requiere cambios en código\n// Antes (Java < 25): objeto ocupa ~16 bytes de overhead (128 bits header)\n// Java 25: objeto ocupa ~8 bytes de overhead (64 bits header)\n\n// Resultado: mejora de densidad en el heap (~10-15%)\n// Más objetos caben en el mismo espacio de memoria\n// Mejor rendimiento de caché L1/L2\n\n// Benchmark aproximado:\n// record Point(int x, int y) {}\n// Antes: ~24 bytes por objeto\n// Java 25: ~16 bytes por objeto - 33% más eficiente' },
                        { name: 'Scoped Values - Final (JEP 506)', desc: 'Alternativa inmutable a ThreadLocal - ahora feature estable (era Preview en Java 21)', code: '// Scoped Values - ahora ESTABLE en Java 25\nfinal static ScopedValue<String> CURRENT_USER = ScopedValue.newInstance();\nfinal static ScopedValue<String> REQUEST_ID   = ScopedValue.newInstance();\n\n// Compartir datos de forma segura entre threads\nScopedValue\n  .where(CURRENT_USER, "john@example.com")\n  .where(REQUEST_ID, "req-abc-123")\n  .run(() -> {\n    processOrder();       // puede leer CURRENT_USER\n    sendNotification();   // puede leer REQUEST_ID\n  });\n\nvoid processOrder() {\n  String user = CURRENT_USER.get(); // "john@example.com"\n  // thread-safe, inmutable, más eficiente que ThreadLocal\n}' },
                        { name: 'Structured Concurrency (JEP 505)', desc: '5ta Preview - nuevo API Joiner y factory methods para StructuredTaskScope', code: '// Structured Concurrency - 5ta Preview en Java 25\n// Nuevo: Joiner API y factory methods\ntry (var scope = StructuredTaskScope.open()) {\n  var userFuture  = scope.fork(() -> fetchUser(userId));\n  var orderFuture = scope.fork(() -> fetchOrders(userId));\n  var stockFuture = scope.fork(() -> checkStock(itemId));\n\n  scope.join(); // espera todos los subtasks\n\n  // Si alguno falla, cancela los demás automáticamente\n  User user     = userFuture.get();\n  List orders   = orderFuture.get();\n  int stock     = stockFuture.get();\n}' },
                        { name: 'Generational Shenandoah GC (JEP 521)', desc: 'Shenandoah GC con modelo generacional - pausas más cortas para objetos de vida corta', code: '// Activar Generational Shenandoah en Java 25\njava -XX:+UseShenandoahGC \\\n     -XX:ShenandoahGCMode=generational \\\n     -Xmx8g MyApp\n\n// Características:\n// - Pausas sub-milisegundo para Young Generation\n// - Compatible con objetos de vida corta (web requests, etc.)\n// - Compactación concurrente sin stop-the-world\n// - Alternativa a ZGC para equipos que prefieren Shenandoah\n\n// Comparativa de pausas (aprox.):\n// G1 GC:              ~100-200ms\n// ZGC Generational:   <10ms\n// Shenandoah Gen:     <5ms' }
                    ]
                }
            ]
        },
        fundamentals: {
            id: 'fundamentals',
            title: 'Fundamentos / Fundamentals',
            subtitle: 'JVM, Memory, OOP, Collections & Core Concepts',
            icon: Cpu,
            content: [
                {
                    topic: 'JVM Architecture / Arquitectura JVM',
                    description: 'La máquina virtual de Java ejecuta bytecode de forma independiente de la plataforma | The Java Virtual Machine executes bytecode platform-independently',
                    points: [
                        '🔷 Class Loader Subsystem: Carga clases (.class) en memoria usando Bootstrap, Extension, y Application loaders | Loads classes (.class) into memory using Bootstrap, Extension, and Application loaders',
                        '🔷 Runtime Data Areas: Heap (objetos compartidos), Stack (variables locales por thread), Method Area (metadata de clases), PC Register, Native Method Stack | Heap (shared objects), Stack (local variables per thread), Method Area (class metadata), PC Register, Native Method Stack',
                        '🔷 Execution Engine: Interpreter (ejecuta bytecode línea por línea), JIT Compiler (compila código hot a nativo), Garbage Collector (limpia memoria) | Interpreter (executes bytecode line-by-line), JIT Compiler (compiles hot code to native), Garbage Collector (cleans memory)',
                        '🔷 JNI (Java Native Interface): Permite llamadas a código nativo (C/C++) | Allows calls to native code (C/C++)'
                    ],
                    code: `// Ver configuración JVM
Runtime runtime = Runtime.getRuntime();
long maxMemory = runtime.maxMemory() / (1024 * 1024);
long totalMemory = runtime.totalMemory() / (1024 * 1024);
long freeMemory = runtime.freeMemory() / (1024 * 1024);

System.out.println("Max Memory: " + maxMemory + " MB");
System.out.println("Total Memory: " + totalMemory + " MB");
System.out.println("Free Memory: " + freeMemory + " MB");

// Forzar GC (no recomendado en prod)
System.gc();`
                },
                {
                    topic: 'Memory Management / Gestión de Memoria',
                    description: 'Java gestiona memoria automáticamente mediante referencias y garbage collection | Java manages memory automatically through references and garbage collection',
                    points: [
                        '🧠 Heap Memory: Almacena TODOS los objetos. Compartido entre threads. Dividido en Young Gen (objetos nuevos) y Old Gen (objetos longevos) | Stores ALL objects. Shared between threads. Divided into Young Gen (new objects) and Old Gen (long-lived objects)',
                        '🧠 Stack Memory: Almacena variables primitivas y referencias a objetos. Cada thread tiene su propio stack. LIFO (Last In First Out) | Stores primitive variables and object references. Each thread has its own stack. LIFO (Last In First Out)',
                        '🧠 Young Generation: Eden (objetos nuevos), S0 y S1 (Survivor spaces). Minor GC ocurre aquí frecuentemente | Eden (new objects), S0 and S1 (Survivor spaces). Minor GC occurs here frequently',
                        '🧠 Old Generation (Tenured): Objetos que sobrevivieron múltiples Minor GC. Major GC ocurre aquí (más lento) | Objects that survived multiple Minor GCs. Major GC occurs here (slower)',
                        '🧠 Metaspace (Java 8+): Metadata de clases (reemplaza PermGen). Crece dinámicamente | Class metadata (replaces PermGen). Grows dynamically'
                    ],
                    code: `// Ejemplo de allocación en Heap vs Stack
public class MemoryExample {
    // Stack: primitivo
    int stackVar = 10;
    
    // Heap: objeto
    String heapObj = new String("Hello");
    
    public void method() {
        // Stack: variable local
        int localVar = 20;
        
        // Stack: referencia, Heap: objeto
        StringBuilder sb = new StringBuilder();
        sb.append("World");
        
        // localVar y sb referencia se eliminan al salir
    } // Stack frame se libera aquí
}

// Memory leak example (evitar)
class LeakExample {
    private static List<byte[]> leak = new ArrayList<>();
    
    public void causeLeak() {
        // Nunca se limpia - memory leak!
        leak.add(new byte[1024 * 1024]); // 1MB
    }
}`
                },
                {
                    topic: 'Garbage Collection / Recolección de Basura',
                    description: 'Limpia memoria de objetos no referenciados automáticamente | Automatically cleans memory from unreferenced objects',
                    points: [
                        '♻️ Serial GC (-XX:+UseSerialGC): Un solo thread. Para apps pequeñas (\u003c100MB heap) o dispositivos con 1 CPU | Single thread. For small apps (\u003c100MB heap) or 1-CPU devices',
                        '♻️ Parallel GC (-XX:+UseParallelGC): Múltiples threads en Young Gen. Maximiza throughput. Pausas más largas | Multiple threads in Young Gen. Maximizes throughput. Longer pauses',
                        '♻️ G1 GC (-XX:+UseG1GC): Default desde Java 9. Divide heap en regiones. Balance entre latencia y throughput. Target: -XX:MaxGCPauseMillis=200 | Default since Java 9. Divides heap into regions. Balance between latency and throughput',
                        '♻️ ZGC (-XX:+UseZGC): Pausas \u003c10ms incluso con heaps de TB. Para aplicaciones de ultra-baja latencia | Pauses \u003c10ms even with TB heaps. For ultra-low latency apps',
                        '♻️ Shenandoah (-XX:+UseShenandoahGC): Similar a ZGC, low-pause. Concurrent compaction | Similar to ZGC, low-pause. Concurrent compaction'
                    ],
                    code: `// Configuración GC común
// G1 GC (recomendado para la mayoría)
java -XX:+UseG1GC 
     -XX:MaxGCPauseMillis=200 
     -XX:InitiatingHeapOccupancyPercent=45
     -Xmx4g -Xms4g MyApp

// ZGC (ultra-low latency)
java -XX:+UseZGC 
     -XX:+ZGenerational
     -Xmx16g -Xms16g MyApp

// Monitoring GC
java -Xlog:gc*:file=gc.log 
     -XX:+PrintGCDetails 
     -XX:+PrintGCDateStamps MyApp

// Programáticamente
MemoryMXBean memoryBean = ManagementFactory.getMemoryMXBean();
MemoryUsage heapUsage = memoryBean.getHeapMemoryUsage();
long used = heapUsage.getUsed();
long max = heapUsage.getMax();
System.out.println("Heap used: " + (used * 100 / max) + "%");`
                },
                {
                    topic: 'OOP Principles / Principios POO',
                    description: 'Los 4 pilares de la programación orientada a objetos | The 4 pillars of object-oriented programming',
                    points: [
                        '🎯 Encapsulation (Encapsulación): Ocultar detalles internos. Usar private fields + public getters/setters. Protege integridad de datos | Hide internal details. Use private fields + public getters/setters. Protects data integrity',
                        '🎯 Inheritance (Herencia): Reutilizar código mediante extends. Relación IS-A. Single inheritance en Java (clase), múltiple en interfaces | Reuse code via extends. IS-A relationship. Single inheritance in Java (class), multiple in interfaces',
                        '🎯 Polymorphism (Polimorfismo): Misma interfaz, múltiples implementaciones. Compile-time (overloading), Runtime (overriding + dynamic dispatch) | Same interface, multiple implementations. Compile-time (overloading), Runtime (overriding + dynamic dispatch)',
                        '🎯 Abstraction (Abstracción): Ocultar complejidad, mostrar solo lo esencial. Abstract classes + Interfaces. Define "qué" sin "cómo" | Hide complexity, show only essentials. Abstract classes + Interfaces. Defines "what" without "how"'
                    ],
                    code: `// Encapsulation
class BankAccount {
    private double balance; // Oculto
    
    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
    public double getBalance() { return balance; }
}

// Inheritance & Polymorphism
abstract class Animal {
    abstract void makeSound(); // Abstraction
}

class Dog extends Animal {
    @Override
    void makeSound() { System.out.println("Woof!"); }
}

class Cat extends Animal {
    @Override
    void makeSound() { System.out.println("Meow!"); }
}

// Polymorphism en acción
Animal myPet = new Dog(); // Referencia Animal, objeto Dog
myPet.makeSound(); // "Woof!" - Runtime polymorphism`
                },
                {
                    topic: 'Collections Framework / Framework de Colecciones',
                    description: 'Estructuras de datos reutilizables para almacenar y manipular grupos de objetos | Reusable data structures to store and manipulate groups of objects',
                    points: [
                        '📦 List (ArrayList, LinkedList): Orden de inserción, permite duplicados. ArrayList para acceso rápido O(1), LinkedList para inserción/eliminación O(1) | Insertion order, allows duplicates. ArrayList for fast access O(1), LinkedList for insert/delete O(1)',
                        '📦 Set (HashSet, TreeSet, LinkedHashSet): No duplicados. HashSet O(1) sin orden, TreeSet O(log n) ordenado, LinkedHashSet mantiene orden de inserción | No duplicates. HashSet O(1) unordered, TreeSet O(log n) sorted, LinkedHashSet maintains insertion order',
                        '📦 Map (HashMap, TreeMap, LinkedHashMap): Key-Value pairs. HashMap O(1) sin orden, TreeMap O(log n) keys ordenadas, ConcurrentHashMap thread-safe | Key-Value pairs. HashMap O(1) unordered, TreeMap O(log n) sorted keys, ConcurrentHashMap thread-safe',
                        '📦 Queue (LinkedList, PriorityQueue): FIFO. PriorityQueue ordena por prioridad (heap) | FIFO. PriorityQueue sorts by priority (heap)',
                        '📦 Deque (ArrayDeque): Double-ended queue. Más eficiente que Stack para operaciones stack/queue | Double-ended queue. More efficient than Stack for stack/queue operations'
                    ],
                    code: `// List
List<String> list = new ArrayList<>();
list.add("Java");
list.add("Python");
list.get(0); // "Java"

// Set - elimina duplicados
Set<Integer> set = new HashSet<>();
set.add(1); set.add(2); set.add(1); // {1, 2}

// Map
Map<String, Integer> map = new HashMap<>();
map.put("age", 25);
map.getOrDefault("name", 0); // 0

// PriorityQueue - min heap por defecto
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(5); pq.offer(1); pq.offer(3);
pq.poll(); // 1 (menor elemento)

// Deque - mejor que Stack
Deque<String> stack = new ArrayDeque<>();
stack.push("A"); stack.push("B");
stack.pop(); // "B"`
                },
                {
                    topic: 'Concurrency & Multithreading / Concurrencia y Multithreading',
                    description: 'Ejecutar múltiples tareas simultáneamente para mejor rendimiento | Execute multiple tasks simultaneously for better performance',
                    points: [
                        '⚡ Thread Creation: extends Thread o implements Runnable. Preferir Runnable (composición \u003e herencia) | extends Thread or implements Runnable. Prefer Runnable (composition \u003e inheritance)',
                        '⚡ Thread States: NEW → RUNNABLE (start()) → RUNNING → BLOCKED/WAITING (wait/sleep) → TERMINATED | NEW → RUNNABLE (start()) → RUNNING → BLOCKED/WAITING (wait/sleep) → TERMINATED',
                        '⚡ Synchronization: synchronized keyword (lock de objeto/clase), volatile (visibilidad), Locks (ReentrantLock - más control) | synchronized keyword (object/class lock), volatile (visibility), Locks (ReentrantLock - more control)',
                        '⚡ Executor Framework: Thread pools para gestión eficiente. newFixedThreadPool, newCachedThreadPool, newScheduledThreadPool | Thread pools for efficient management. newFixedThreadPool, newCachedThreadPool, newScheduledThreadPool',
                        '⚡ Concurrent Collections: ConcurrentHashMap, CopyOnWriteArrayList, BlockingQueue. Thread-safe sin synchronized externo | ConcurrentHashMap, CopyOnWriteArrayList, BlockingQueue. Thread-safe without external synchronized'
                    ],
                    code: `// Thread creation
Thread t1 = new Thread(() -> {
    System.out.println("Running in: " + Thread.currentThread().getName());
});
t1.start();

// Synchronization
class Counter {
    private int count = 0;
    
    public synchronized void increment() {
        count++; // Thread-safe
    }
}

// ExecutorService (mejor manera)
ExecutorService executor = Executors.newFixedThreadPool(4);
executor.submit(() -> System.out.println("Task 1"));
executor.submit(() -> System.out.println("Task 2"));
executor.shutdown();

// CompletableFuture (async programming)
CompletableFuture.supplyAsync(() -> fetchData())
    .thenApply(data -> process(data))
    .thenAccept(result -> System.out.println(result));

// ConcurrentHashMap
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
map.put("key", 1); // Thread-safe sin synchronized`
                },
                {
                    topic: 'Exception Handling / Manejo de Excepciones',
                    description: 'Manejo robusto de errores en tiempo de ejecución | Robust handling of runtime errors',
                    points: [
                        '❌ Checked Exceptions: Verificadas en compile-time (IOException, SQLException). Deben manejarse con try-catch o declararse con throws | Checked at compile-time (IOException, SQLException). Must handle with try-catch or declare with throws',
                        '❌ Unchecked Exceptions: RuntimeException y subclases (NullPointerException, IllegalArgumentException). No obligatorio manejarlas | RuntimeException and subclasses (NullPointerException, IllegalArgumentException). Not mandatory to handle',
                        '❌ Try-with-resources (Java 7+): Auto-cierra recursos que implementan AutoCloseable. Evita resource leaks | Auto-closes resources implementing AutoCloseable. Prevents resource leaks',
                        '❌ Custom Exceptions: Crear excepciones de dominio específico. Heredar de Exception (checked) o RuntimeException (unchecked) | Create domain-specific exceptions. Inherit from Exception (checked) or RuntimeException (unchecked)',
                        '❌ Best Practices: Catch específico antes que genérico, nunca catch vacío, log apropiado, fail-fast, no usar exceptions para control de flujo | Catch specific before generic, never empty catch, proper logging, fail-fast, don\'t use exceptions for flow control'
                    ],
                    code: `// Try-catch básico
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.err.println("Error: " + e.getMessage());
} finally {
    System.out.println("Siempre ejecuta");
}

// Try-with-resources (auto-close)
try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
    String line = br.readLine();
} catch (IOException e) {
    e.printStackTrace();
} // br.close() se llama automáticamente

// Custom Exception
class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String msg) {
        super(msg);
    }
}

void withdraw(double amount) throws InsufficientFundsException {
    if (amount > balance) {
        throw new InsufficientFundsException("Balance: " + balance);
    }
    balance -= amount;
}

// Multi-catch (Java 7+)
try {
    // code
} catch (IOException | SQLException e) {
    logger.error("Error: ", e);
}`
                },
                {
                    topic: 'Performance Best Practices / Mejores Prácticas de Rendimiento',
                    description: 'Optimizaciones para código Java de alto rendimiento | Optimizations for high-performance Java code',
                    points: [
                        '🚀 String Operations: Usar StringBuilder/StringBuffer para concatenación en loops. String.intern() para strings repetidos | Use StringBuilder/StringBuffer for concatenation in loops. String.intern() for repeated strings',
                        '🚀 Collections: Especificar initial capacity si conoces tamaño (evita resize). ArrayList \u003e LinkedList para la mayoría de casos | Specify initial capacity if you know size (avoids resize). ArrayList \u003e LinkedList for most cases',
                        '🚀 Primitives vs Wrappers: Preferir int sobre Integer (evita boxing/unboxing). Usar arrays de primitivos para grandes volúmenes | Prefer int over Integer (avoids boxing/unboxing). Use primitive arrays for large volumes',
                        '🚀 Lazy Initialization: Inicializar objetos solo cuando se necesitan. Usar lazy loading patterns | Initialize objects only when needed. Use lazy loading patterns',
                        '🚀 Avoid Premature Optimization: Profile primero (JProfiler, VisualVM), optimiza cuellos de botella reales. Mide siempre | Profile first (JProfiler, VisualVM), optimize real bottlenecks. Always measure'
                    ],
                    code: `// ❌ Mal: concatenación en loop
String result = "";
for (int i = 0; i < 1000; i++) {
    result += i; // Crea 1000 objetos String!
}

// ✅ Bien: StringBuilder
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append(i); // Un solo objeto
}

// ❌ Mal: autoboxing en loop
List<Integer> list = new ArrayList<>();
for (int i = 0; i < 1000; i++) {
    list.add(i); // Boxing: int → Integer
}

// ✅ Bien: array de primitivos
int[] array = new int[1000];
for (int i = 0; i < 1000; i++) {
    array[i] = i; // No boxing
}

// Initial capacity
List<String> optimized = new ArrayList<>(1000); // Evita resize

// Lazy initialization
class Heavy {
    private ExpensiveObject obj;
    
    public ExpensiveObject getObj() {
        if (obj == null) {
            obj = new ExpensiveObject(); // Solo cuando se necesita
        }
        return obj;
    }
}`
                }
            ]
        },
        interview: {
            id: 'interview',
            title: 'Interview Questions',
            subtitle: 'Preguntas frecuentes por nivel / Common questions by level',
            icon: MessageCircleQuestion,
            content: {
                junior: [
                    { q: '¿Qué es OOP? / What is OOP?', a: 'Paradigma basado en objetos con 4 pilares: Encapsulación (ocultar detalles), Herencia (reutilizar código), Polimorfismo (múltiples formas), Abstracción (simplificar complejidad) | Object-oriented paradigm with 4 pillars: Encapsulation (hide details), Inheritance (code reuse), Polymorphism (multiple forms), Abstraction (simplify complexity)' },
                    { q: 'Diferencia entre == y equals() / Difference between == and equals()', a: '== compara referencias en memoria (mismo objeto), equals() compara contenido/valor (lógica definida por la clase) | == compares memory references (same object), equals() compares content/value (logic defined by class)' },
                    { q: '¿Qué es una excepción checked? / What is a checked exception?', a: 'Excepción que debe ser manejada o declarada en compile-time (e.g., IOException, SQLException). Checked = compilador verifica | Exception that must be handled or declared at compile-time (e.g., IOException, SQLException). Checked = compiler verifies' },
                    { q: 'String vs StringBuilder vs StringBuffer', a: 'String es inmutable (thread-safe, lento para concatenación), StringBuilder es mutable y rápido (no thread-safe), StringBuffer es mutable y thread-safe (synchronized) | String is immutable (thread-safe, slow for concatenation), StringBuilder is mutable and fast (not thread-safe), StringBuffer is mutable and thread-safe (synchronized)' },
                    { q: '¿Qué es el polimorfismo? / What is polymorphism?', a: 'Capacidad de un objeto de tomar múltiples formas. Compile-time (sobrecarga) y Runtime (override + herencia) | Ability of an object to take multiple forms. Compile-time (overloading) and Runtime (override + inheritance)' },
                    { q: 'final, finally, finalize', a: 'final = constante/clase no heredable, finally = bloque que siempre ejecuta (try-catch), finalize = método llamado antes de GC (deprecated) | final = constant/non-inheritable class, finally = block that always executes (try-catch), finalize = method called before GC (deprecated)' },
                    { q: '¿Qué es un constructor? / What is a constructor?', a: 'Método especial que inicializa objetos. Mismo nombre que clase, no retorna valor, se ejecuta al crear instancia con new | Special method that initializes objects. Same name as class, returns no value, executes when creating instance with new' },
                    { q: 'Diferencia entre abstract class e interface / Difference between abstract class and interface', a: 'Abstract class: puede tener métodos concretos, constructor, variables de instancia, herencia única. Interface: solo métodos abstractos/default, sin constructor, implementación múltiple | Abstract class: can have concrete methods, constructor, instance variables, single inheritance. Interface: only abstract/default methods, no constructor, multiple implementation' },
                    { q: '¿Qué es el Garbage Collector? / What is Garbage Collector?', a: 'Sistema automático que libera memoria de objetos no referenciados. Ejecuta en background, evita memory leaks | Automatic system that frees memory from unreferenced objects. Runs in background, prevents memory leaks' },
                    { q: 'ArrayList vs LinkedList', a: 'ArrayList: array dinámico, acceso O(1), inserción/eliminación O(n). LinkedList: lista doblemente enlazada, acceso O(n), inserción/eliminación O(1) | ArrayList: dynamic array, access O(1), insert/delete O(n). LinkedList: doubly-linked list, access O(n), insert/delete O(1)' },
                    { q: '¿Qué es static? / What is static?', a: 'Pertenece a la clase, no a instancias. Compartido entre objetos. static variables, methods, blocks, inner classes | Belongs to class, not to instances. Shared among objects. static variables, methods, blocks, inner classes' },
                    { q: 'this vs super', a: 'this = referencia al objeto actual. super = referencia a la clase padre (acceder a métodos/constructores padre) | this = reference to current object. super = reference to parent class (access parent methods/constructors)' }
                ],
                mid: [
                    { q: '¿Cuáles son las ventajas de Streams? ¿Cuándo NO usarlos? / What are Streams advantages? When NOT to use them?', a: 'VENTAJAS: código declarativo y legible, lazy evaluation (eficiencia), fácil paralelización (.parallel()), operaciones funcionales (map, filter, reduce). NO USAR: operaciones simples (sobrecarga innecesaria), modificar colecciones durante iteración, necesitas índices explícitos, debugging complejo | ADVANTAGES: declarative and readable code, lazy evaluation (efficiency), easy parallelization (.parallel()), functional operations (map, filter, reduce). DON\'T USE: simple operations (unnecessary overhead), modifying collections during iteration, need explicit indexes, complex debugging' },
                    { q: 'HashMap: ¿cómo funciona internamente? / How does HashMap work internally?', a: 'Usa hash code para distribuir en buckets (array). Colisiones manejadas con LinkedList/TreeNode (Java 8+). get/put O(1) promedio. Resize cuando load factor > 0.75 | Uses hash code to distribute into buckets (array). Collisions handled with LinkedList/TreeNode (Java 8+). get/put O(1) average. Resizes when load factor > 0.75' },
                    { q: 'synchronized vs volatile vs Atomic', a: 'synchronized: bloquea sección crítica (mutual exclusion), volatile: asegura visibilidad entre threads (no atomicity), Atomic: operaciones atómicas sin locks (CAS) | synchronized: locks critical section (mutual exclusion), volatile: ensures visibility between threads (no atomicity), Atomic: atomic operations without locks (CAS)' },
                    { q: 'Explica el patrón Singleton y sus problemas / Explain Singleton pattern and its problems', a: 'Una única instancia global. Implementación: private constructor, static instance, getInstance(). PROBLEMAS: testing difícil, acoplamiento, multithreading (double-check locking), viola Single Responsibility | Single global instance. Implementation: private constructor, static instance, getInstance(). PROBLEMS: difficult testing, coupling, multithreading (double-check locking), violates Single Responsibility' },
                    { q: 'Diferencia entre Comparable y Comparator / Difference between Comparable and Comparator', a: 'Comparable: interfaz para orden natural (implementa compareTo), modifica clase original, un solo criterio. Comparator: clase externa, múltiples criterios, no modifica clase original | Comparable: interface for natural ordering (implements compareTo), modifies original class, single criterion. Comparator: external class, multiple criteria, doesn\'t modify original class' },
                    { q: '¿Qué es immutability y sus ventajas? / What is immutability and its advantages?', a: 'Objeto que no cambia después de creación. VENTAJAS: thread-safe sin sincronización, cacheable, simplifica debugging, seguro como Map key. Ejemplo: String, Integer | Object that doesn\'t change after creation. ADVANTAGES: thread-safe without synchronization, cacheable, simplifies debugging, safe as Map key. Example: String, Integer' },
                    { q: 'Exception handling: mejores prácticas / Exception handling: best practices', a: 'Catch específico antes que genérico, nunca catch Exception vacío, usar try-with-resources, crear custom exceptions, log adecuado, no usar exceptions para control de flujo | Catch specific before generic, never empty catch Exception, use try-with-resources, create custom exceptions, proper logging, don\'t use exceptions for flow control' },
                    { q: 'Optional: cuándo y cómo usarlo / Optional: when and how to use it', a: 'Para evitar NullPointerException. NO para fields/parámetros, SÍ para retornos. Usar .orElse(), .orElseThrow(), .ifPresent(), no .get() sin verificar | To avoid NullPointerException. NOT for fields/parameters, YES for returns. Use .orElse(), .orElseThrow(), .ifPresent(), not .get() without checking' },
                    { q: 'Generics: ¿qué son y ventajas? / Generics: what are they and advantages?', a: 'Tipos parametrizados (List<T>). VENTAJAS: type safety en compile-time, elimina casting, código reutilizable. Type erasure en runtime | Parameterized types (List<T>). ADVANTAGES: compile-time type safety, eliminates casting, reusable code. Type erasure at runtime' },
                    { q: 'Thread lifecycle en Java / Thread lifecycle in Java', a: '5 estados: New (creado), Runnable (listo), Running (ejecutando), Blocked/Waiting (esperando), Terminated (finalizado). Métodos: start(), run(), sleep(), wait(), notify() | 5 states: New (created), Runnable (ready), Running (executing), Blocked/Waiting (waiting), Terminated (finished). Methods: start(), run(), sleep(), wait(), notify()' },
                    { q: 'Diferencia entre fail-fast y fail-safe iterators / Difference between fail-fast and fail-safe iterators', a: 'fail-fast: lanza ConcurrentModificationException si se modifica (ArrayList). fail-safe: copia colección, no lanza excepción (CopyOnWriteArrayList) | fail-fast: throws ConcurrentModificationException if modified (ArrayList). fail-safe: copies collection, doesn\'t throw exception (CopyOnWriteArrayList)' },
                    { q: 'ConcurrentHashMap vs Hashtable vs synchronized Map', a: 'ConcurrentHashMap: lock por segmento (alta concurrencia), null no permitido. Hashtable: lock global (lento), legacy. synchronized Map: wrapper con lock global | ConcurrentHashMap: segment-level locking (high concurrency), null not allowed. Hashtable: global lock (slow), legacy. synchronized Map: wrapper with global lock' },
                    { q: '¿Qué es reflection y cuándo usarlo? / What is reflection and when to use it?', a: 'Inspeccionar/modificar clases en runtime. Usar en: frameworks, testing, serialization. DESVENTAJAS: performance, seguridad, rompe encapsulación | Inspect/modify classes at runtime. Use in: frameworks, testing, serialization. DISADVANTAGES: performance, security, breaks encapsulation' },
                    { q: 'Method overloading vs overriding', a: 'Overloading: mismo nombre, diferentes parámetros, compile-time. Overriding: misma firma, diferente implementación en subclase, runtime polymorphism | Overloading: same name, different parameters, compile-time. Overriding: same signature, different implementation in subclass, runtime polymorphism' },
                    { q: 'Functional interfaces y Lambda expressions / Functional interfaces and Lambda expressions', a: 'Interface con un solo método abstracto. Lambda: implementación concisa. Ejemplos: Predicate, Function, Consumer, Supplier. Habilita programación funcional | Interface with single abstract method. Lambda: concise implementation. Examples: Predicate, Function, Consumer, Supplier. Enables functional programming' }
                ],
                senior: [
                    { q: 'Diseña un sistema de caché distribuida / Design a distributed cache system', a: 'COMPONENTES: Cache nodes (Redis/Memcached), Consistent Hashing (distribución), TTL policies, LRU eviction. CONSIDERACIONES: replicación (redundancia), partitioning (sharding), invalidación, cache-aside vs write-through patterns | COMPONENTS: Cache nodes (Redis/Memcached), Consistent Hashing (distribution), TTL policies, LRU eviction. CONSIDERATIONS: replication (redundancy), partitioning (sharding), invalidation, cache-aside vs write-through patterns' },
                    { q: 'Optimización de GC en producción para alta carga / GC optimization in production for high load', a: '1) Analizar GC logs (-Xlog:gc*), 2) Seleccionar GC: G1 (balanced), ZGC (ultra-low latency), 3) Ajustar heap (-Xmx, -Xms), 4) Tuning: -XX:MaxGCPauseMillis, -XX:G1HeapRegionSize, 5) Monitor métricas (pause time, throughput) | 1) Analyze GC logs (-Xlog:gc*), 2) Select GC: G1 (balanced), ZGC (ultra-low latency), 3) Adjust heap (-Xmx, -Xms), 4) Tuning: -XX:MaxGCPauseMillis, -XX:G1HeapRegionSize, 5) Monitor metrics (pause time, throughput)' },
                    { q: 'Microservices: manejo de transacciones distribuidas / Microservices: distributed transaction handling', a: 'PATRÓN SAGA: Choreography (eventos) vs Orchestration (coordinador). Implementar: compensating transactions, idempotencia, eventual consistency. Herramientas: Kafka, Event Sourcing, CQRS | SAGA PATTERN: Choreography (events) vs Orchestration (coordinator). Implement: compensating transactions, idempotency, eventual consistency. Tools: Kafka, Event Sourcing, CQRS' },
                    { q: 'JVM tuning para aplicaciones de baja latencia / JVM tuning for low-latency applications', a: 'GC: ZGC/Shenandoah (sub-ms pauses), Pre-allocate memory (evitar allocations), JIT: -XX:+TieredCompilation, Disable biased locking, NUMA awareness, profiling con JFR/async-profiler | GC: ZGC/Shenandoah (sub-ms pauses), Pre-allocate memory (avoid allocations), JIT: -XX:+TieredCompilation, Disable biased locking, NUMA awareness, profiling with JFR/async-profiler' },
                    { q: 'Implementar circuit breaker pattern / Implement circuit breaker pattern', a: 'Estados: Closed (normal), Open (falla, rechaza requests), Half-Open (prueba recovery). Métricas: failure rate, timeout. Librerías: Resilience4j, Hystrix. Previene cascading failures | States: Closed (normal), Open (failure, rejects requests), Half-Open (tests recovery). Metrics: failure rate, timeout. Libraries: Resilience4j, Hystrix. Prevents cascading failures' },
                    { q: 'ClassLoader hierarchy y custom classloaders / ClassLoader hierarchy and custom classloaders', a: 'Jerarquía: Bootstrap (core Java) → Extension → Application. Delegation model (parent-first). Custom: para plugin systems, hot reloading, isolation. Considerar: memory leaks, class version conflicts | Hierarchy: Bootstrap (core Java) → Extension → Application. Delegation model (parent-first). Custom: for plugin systems, hot reloading, isolation. Consider: memory leaks, class version conflicts' },
                    { q: 'Manejo de millones de conexiones concurrentes / Handling millions of concurrent connections', a: 'NIO/NIO.2 (non-blocking I/O), Selector pattern, thread pools optimizados (cached/fixed), async I/O, websockets, backpressure, vertical scaling (CPU/RAM), horizontal scaling (load balancer) | NIO/NIO.2 (non-blocking I/O), Selector pattern, optimized thread pools (cached/fixed), async I/O, websockets, backpressure, vertical scaling (CPU/RAM), horizontal scaling (load balancer)' },
                    { q: 'Memory leaks en Java: causas y detección / Memory leaks in Java: causes and detection', a: 'CAUSAS: static collections, listeners no removidos, ThreadLocal, unclosed resources. DETECCIÓN: heap dumps (jmap), VisualVM, Eclipse MAT, profilers. Analizar: retained heap, dominators | CAUSES: static collections, unremoved listeners, ThreadLocal, unclosed resources. DETECTION: heap dumps (jmap), VisualVM, Eclipse MAT, profilers. Analyze: retained heap, dominators' },
                    { q: 'Event Sourcing vs Traditional CRUD', a: 'Event Sourcing: almacena eventos (immutable), reconstruir estado, audit trail completo, temporal queries. CRUD: estado actual, simple, menos storage. ES para: compliance, debugging, analytics | Event Sourcing: stores events (immutable), rebuild state, complete audit trail, temporal queries. CRUD: current state, simple, less storage. ES for: compliance, debugging, analytics' },
                    { q: 'Secure coding: prevenir vulnerabilidades / Secure coding: prevent vulnerabilities', a: 'SQL Injection: PreparedStatement, Input Validation: whitelist, XSS: escape output, Secrets: no hardcode (vault), Deserialization: validate, Dependencies: OWASP checks, Least privilege | SQL Injection: PreparedStatement, Input Validation: whitelist, XSS: escape output, Secrets: don\'t hardcode (vault), Deserialization: validate, Dependencies: OWASP checks, Least privilege' },
                    { q: 'Diseñar sistema de rate limiting distribuido / Design distributed rate limiting system', a: 'ALGORITMOS: Token Bucket, Leaky Bucket, Fixed/Sliding Window. IMPLEMENTACIÓN: Redis (INCR + EXPIRE), distributed counters. CONSIDERACIONES: fairness, bursts, por usuario/IP/API key | ALGORITHMS: Token Bucket, Leaky Bucket, Fixed/Sliding Window. IMPLEMENTATION: Redis (INCR + EXPIRE), distributed counters. CONSIDERATIONS: fairness, bursts, per user/IP/API key' },
                    { q: 'CompletableFuture vs Future: cuándo usar cada uno / CompletableFuture vs Future: when to use each', a: 'Future: blocking get(), no composición. CompletableFuture: non-blocking, chainable (.thenApply, .thenCompose), exception handling (.exceptionally), combinación (.allOf, .anyOf). Usar CF para async pipelines complejos | Future: blocking get(), no composition. CompletableFuture: non-blocking, chainable (.thenApply, .thenCompose), exception handling (.exceptionally), combination (.allOf, .anyOf). Use CF for complex async pipelines' },
                    { q: 'Diferencia entre JPA, Hibernate, y Spring Data JPA / Difference between JPA, Hibernate, and Spring Data JPA', a: 'JPA: especificación (interface). Hibernate: implementación de JPA (ORM). Spring Data JPA: abstracción sobre JPA (repositories, query methods). Spring Data JPA usa Hibernate como provider por defecto | JPA: specification (interface). Hibernate: JPA implementation (ORM). Spring Data JPA: abstraction over JPA (repositories, query methods). Spring Data JPA uses Hibernate as default provider' },
                    { q: 'SOLID principles aplicados a Java / SOLID principles applied to Java', a: 'S: Single Responsibility (una razón para cambiar), O: Open/Closed (extensión, no modificación), L: Liskov Substitution (subclases intercambiables), I: Interface Segregation (interfaces específicas), D: Dependency Inversion (abstracciones, no concretas) | S: Single Responsibility (one reason to change), O: Open/Closed (extension, not modification), L: Liskov Substitution (interchangeable subclasses), I: Interface Segregation (specific interfaces), D: Dependency Inversion (abstractions, not concrete)' },
                    { q: 'Profiling y diagnóstico de performance en producción / Profiling and performance diagnosis in production', a: 'Herramientas: JFR (Java Flight Recorder), async-profiler (flame graphs), APM (New Relic, Datadog). Métricas: CPU, memory, GC, thread contention. Sampling vs Instrumentation. Continuous profiling | Tools: JFR (Java Flight Recorder), async-profiler (flame graphs), APM (New Relic, Datadog). Metrics: CPU, memory, GC, thread contention. Sampling vs Instrumentation. Continuous profiling' }
                ]
            }
        }
    };

    const sectionList = Object.values(sections);
    const currentSection = sections[activeSection];
    const SectionIcon = currentSection.icon;

    const renderFeatures = () => (
        <div className="space-y-6">
            {currentSection.content.map((version, versionIdx) => {
                const isVersionExpanded = expandedVersions[versionIdx];

                return (
                    <div key={versionIdx} className="bg-slate-900/50 border border-orange-500/30 rounded-xl overflow-hidden">
                        <button
                            onClick={() => toggleVersion(versionIdx)}
                            className="w-full flex items-center justify-between p-6 hover:bg-slate-900/70 transition-colors text-left"
                        >
                            <h3 className="text-2xl font-bold text-orange-400">{version.version}</h3>
                            <motion.div
                                animate={{ rotate: isVersionExpanded ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {isVersionExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-6">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {version.features.map((feature, featureIdx) => {
                                                const key = `${versionIdx}-${featureIdx}`;
                                                const isExpanded = expandedFeatures[key];

                                                return (
                                                    <div key={featureIdx} className="bg-slate-800/30 border border-slate-700 rounded-lg overflow-hidden">
                                                        <button
                                                            onClick={() => toggleFeature(versionIdx, featureIdx)}
                                                            className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors text-left"
                                                        >
                                                            <div className="flex-1">
                                                                <h4 className="font-bold text-orange-300 mb-1">{feature.name}</h4>
                                                                <p className="text-sm text-slate-400">{feature.desc}</p>
                                                            </div>
                                                            <motion.div
                                                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                                                transition={{ duration: 0.3 }}
                                                            >
                                                                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </motion.div>
                                                        </button>

                                                        <AnimatePresence>
                                                            {isExpanded && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.3 }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <div className="p-4 pt-0">
                                                                        <CodeBlock code={feature.code} language="java" />
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );

    const renderFundamentals = () => (
        <div className="space-y-6">
            {currentSection.content.map((item, idx) => {
                const isExpanded = expandedFundamentals[idx];

                return (
                    <div key={idx} className="bg-slate-900/50 border border-orange-500/30 rounded-xl overflow-hidden">
                        <button
                            onClick={() => toggleFundamental(idx)}
                            className="w-full flex items-center justify-between p-6 hover:bg-slate-900/70 transition-colors text-left"
                        >
                            <div className="flex items-center gap-3">
                                <Cpu className="w-6 h-6 text-orange-400" />
                                <h3 className="text-xl font-bold text-orange-400">{item.topic}</h3>
                            </div>
                            <motion.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-6">
                                        <p className="text-slate-400 text-sm mb-4">
                                            {item.description.split(' | ').map((text, i) => (
                                                <span key={i}>
                                                    {i === 0 && <span className="text-slate-300">{text}</span>}
                                                    {i === 1 && <span className="text-slate-500 block mt-1 text-xs italic">{text}</span>}
                                                </span>
                                            ))}
                                        </p>
                                        <ul className="space-y-2 mb-4">
                                            {item.points.map((point, pIdx) => (
                                                <li key={pIdx} className="flex items-start gap-2 text-sm">
                                                    <span className="text-orange-400 mt-0.5">•</span>
                                                    <span className="text-slate-300">
                                                        {point.split(' | ').map((text, i) => (
                                                            <span key={i}>
                                                                {i === 0 && <span>{text}</span>}
                                                                {i === 1 && <span className="text-slate-500 block mt-1 text-xs italic">{text}</span>}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                        {item.code && (
                                            <div>
                                                <CodeBlock code={item.code} language="java" />
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );

    const renderInterview = () => (
        <div className="space-y-6">
            {Object.entries(currentSection.content).map(([level, questions]) => {
                const isLevelExpanded = expandedLevels[level];

                return (
                    <div key={level} className="bg-slate-900/50 border border-orange-500/30 rounded-xl overflow-hidden">
                        {/* Level Header */}
                        <button
                            onClick={() => toggleLevel(level)}
                            className="w-full flex items-center justify-between p-6 hover:bg-slate-900/70 transition-colors text-left"
                        >
                            <div className="flex items-center gap-3">
                                <MessageCircleQuestion className="w-6 h-6 text-orange-400" />
                                <h3 className="text-2xl font-bold text-orange-400 capitalize">{level} Level</h3>
                                <span className="text-slate-500 text-sm">({questions.length} questions)</span>
                            </div>
                            <motion.div
                                animate={{ rotate: isLevelExpanded ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </motion.div>
                        </button>

                        {/* Level Content */}
                        <AnimatePresence>
                            {isLevelExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-6 space-y-3">
                                        {questions.map((item, idx) => {
                                            const questionKey = `${level}-${idx}`;
                                            const isQuestionExpanded = expandedQuestions[questionKey];

                                            return (
                                                <div key={idx} className="bg-slate-800/50 border border-slate-700/50 rounded-lg overflow-hidden">
                                                    {/* Question Header */}
                                                    <button
                                                        onClick={() => toggleQuestion(level, idx)}
                                                        className="w-full flex items-start justify-between p-4 hover:bg-slate-800/70 transition-colors text-left gap-3"
                                                    >
                                                        <div className="flex items-start gap-2 flex-1 min-w-0">
                                                            <span className="text-orange-400 font-bold flex-shrink-0">Q{idx + 1}:</span>
                                                            <p className="font-semibold text-orange-300 text-sm">
                                                                {item.q.split(' / ')[0]}
                                                            </p>
                                                        </div>
                                                        <motion.div
                                                            animate={{ rotate: isQuestionExpanded ? 180 : 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="flex-shrink-0"
                                                        >
                                                            <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </motion.div>
                                                    </button>

                                                    {/* Question Answer */}
                                                    <AnimatePresence>
                                                        {isQuestionExpanded && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.2 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <div className="px-4 pb-4 pt-2">
                                                                    {/* English Question */}
                                                                    {item.q.split(' / ')[1] && (
                                                                        <p className="text-slate-500 text-xs italic mb-3 ml-6">
                                                                            {item.q.split(' / ')[1]}
                                                                        </p>
                                                                    )}

                                                                    {/* Answer */}
                                                                    <div className="flex items-start gap-2 ml-2 bg-slate-900/50 p-3 rounded border-l-2 border-green-400/50">
                                                                        <span className="text-green-400 font-bold flex-shrink-0">A:</span>
                                                                        <div className="text-sm">
                                                                            {item.a.split(' | ').map((text, i) => (
                                                                                <div key={i}>
                                                                                    {i === 0 && <p className="text-slate-200 leading-relaxed">{text}</p>}
                                                                                    {i === 1 && <p className="text-slate-500 mt-2 text-xs italic leading-relaxed">{text}</p>}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );

    const renderContent = () => {
        switch (activeSection) {
            case 'features': return renderFeatures();
            case 'fundamentals': return renderFundamentals();
            case 'interview': return renderInterview();
            default: return renderFeatures();
        }
    };

    return (
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-2 overflow-y-auto pr-2">
                <h3 className="text-lg font-bold text-orange-400 mb-4 flex items-center gap-2">
                    <Coffee className="w-6 h-6" />
                    {t('java', language).title}
                </h3>
                {sectionList.map((section) => {
                    const Icon = section.icon;
                    return (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${activeSection === section.id
                                ? 'bg-orange-500/20 border border-orange-500/50 text-orange-300'
                                : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <div className="flex-1">
                                <div className="font-semibold">{section.title}</div>
                                <div className="text-xs opacity-70 line-clamp-1">{section.subtitle}</div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Content Panel */}
            <div className="lg:col-span-3 overflow-y-auto pr-2">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <SectionIcon className="w-8 h-8 text-orange-400" />
                        <h2 className="text-3xl font-bold text-orange-400">{currentSection.title}</h2>
                    </div>
                    <p className="text-slate-400">{currentSection.subtitle}</p>
                </div>
                <div className="animate-fade-in">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default JavaPro;
