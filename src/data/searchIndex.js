import { t } from '../translations';

export function buildSearchIndex(language) {
  const tabJsTs = t('common', language).tabJsTs;
  const tabCloud = t('common', language).tabCloud;
  const tabContainers = t('common', language).tabContainers;
  const isEs = language === 'es';

  return [
    // Clean Code
    { tab: 'cleancode', tabName: 'Clean Code', tabColor: 'bg-green-500/20 text-green-400', section: 'Principios', title: 'DRY - Don\'t Repeat Yourself', preview: isEs ? 'No repitas código. Cada pieza de conocimiento debe tener una única representación en el sistema.' : "Don't repeat code. Every piece of knowledge must have a single representation in the system." },
    { tab: 'cleancode', tabName: 'Clean Code', tabColor: 'bg-green-500/20 text-green-400', section: 'Principios', title: 'KISS - Keep It Simple', preview: isEs ? 'Mantén las cosas simples. La simplicidad debe ser un objetivo clave del diseño.' : 'Keep things simple. Simplicity should be a key design goal.' },
    { tab: 'cleancode', tabName: 'Clean Code', tabColor: 'bg-green-500/20 text-green-400', section: 'Principios', title: 'YAGNI - You Aren\'t Gonna Need It', preview: isEs ? 'No agregues funcionalidad hasta que realmente la necesites.' : "Don't add functionality until you actually need it." },
    { tab: 'cleancode', tabName: 'Clean Code', tabColor: 'bg-green-500/20 text-green-400', section: 'Principios', title: 'Boy Scout Rule', preview: isEs ? 'Siempre deja el código un poco mejor que como lo encontraste.' : 'Always leave the code a little better than you found it.' },
    { tab: 'cleancode', tabName: 'Clean Code', tabColor: 'bg-green-500/20 text-green-400', section: 'Principios', title: 'Self-Documenting Code', preview: isEs ? 'El código debe explicarse a sí mismo. Usa nombres descriptivos.' : 'Code should explain itself. Use descriptive names.' },

    // SOLID
    { tab: 'solid', tabName: 'SOLID', tabColor: 'bg-blue-500/20 text-blue-400', section: 'Principios OOP', title: 'Single Responsibility Principle', preview: isEs ? 'Una clase debe tener una única responsabilidad y una sola razón para cambiar.' : 'A class should have only one responsibility and one reason to change.' },
    { tab: 'solid', tabName: 'SOLID', tabColor: 'bg-blue-500/20 text-blue-400', section: 'Principios OOP', title: 'Open/Closed Principle', preview: isEs ? 'Abierto para extensión, cerrado para modificación.' : 'Open for extension, closed for modification.' },
    { tab: 'solid', tabName: 'SOLID', tabColor: 'bg-blue-500/20 text-blue-400', section: 'Principios OOP', title: 'Liskov Substitution Principle', preview: isEs ? 'Los objetos de una clase derivada deben poder reemplazar objetos de la clase base.' : 'Objects of a derived class must be substitutable for objects of the base class.' },
    { tab: 'solid', tabName: 'SOLID', tabColor: 'bg-blue-500/20 text-blue-400', section: 'Principios OOP', title: 'Interface Segregation Principle', preview: isEs ? 'No se debe forzar a los clientes a depender de interfaces que no usan.' : 'Clients should not be forced to depend on interfaces they do not use.' },
    { tab: 'solid', tabName: 'SOLID', tabColor: 'bg-blue-500/20 text-blue-400', section: 'Principios OOP', title: 'Dependency Inversion Principle', preview: isEs ? 'Depende de abstracciones, no de implementaciones concretas.' : 'Depend on abstractions, not concrete implementations.' },

    // Patterns
    { tab: 'patterns', tabName: 'Patterns', tabColor: 'bg-purple-500/20 text-purple-400', section: 'Design Patterns', title: 'Singleton Pattern', preview: isEs ? 'Asegura que una clase tenga una única instancia y proporciona un punto de acceso global.' : 'Ensures a class has only one instance and provides a global access point.' },
    { tab: 'patterns', tabName: 'Patterns', tabColor: 'bg-purple-500/20 text-purple-400', section: 'Design Patterns', title: 'Factory Pattern', preview: isEs ? 'Define una interfaz para crear objetos, pero deja que las subclases decidan qué clase instanciar.' : 'Defines an interface for creating objects, letting subclasses decide which class to instantiate.' },
    { tab: 'patterns', tabName: 'Patterns', tabColor: 'bg-purple-500/20 text-purple-400', section: 'Design Patterns', title: 'Observer Pattern', preview: isEs ? 'Define una dependencia uno-a-muchos. Cuando un objeto cambia, todos sus dependientes son notificados.' : 'Defines a one-to-many dependency. When one object changes, all dependents are notified.' },
    { tab: 'patterns', tabName: 'Patterns', tabColor: 'bg-purple-500/20 text-purple-400', section: 'Design Patterns', title: 'Strategy Pattern', preview: isEs ? 'Define una familia de algoritmos, encapsula cada uno y los hace intercambiables.' : 'Defines a family of algorithms, encapsulates each one, and makes them interchangeable.' },
    { tab: 'patterns', tabName: 'Patterns', tabColor: 'bg-purple-500/20 text-purple-400', section: 'Design Patterns', title: 'Adapter Pattern', preview: isEs ? 'Permite que interfaces incompatibles trabajen juntas.' : 'Allows incompatible interfaces to work together.' },
    { tab: 'patterns', tabName: 'Patterns', tabColor: 'bg-purple-500/20 text-purple-400', section: 'Design Patterns', title: 'Command Pattern', preview: isEs ? 'Encapsula una solicitud como un objeto.' : 'Encapsulates a request as an object.' },

    // Architecture
    { tab: 'architecture', tabName: 'Architecture', tabColor: 'bg-cyan-500/20 text-cyan-400', section: isEs ? 'Arquitecturas' : 'Architectures', title: 'MVC - Model View Controller', preview: isEs ? 'Separa la lógica de negocio, la presentación y el control de flujo.' : 'Separates business logic, presentation, and flow control.' },
    { tab: 'architecture', tabName: 'Architecture', tabColor: 'bg-cyan-500/20 text-cyan-400', section: isEs ? 'Arquitecturas' : 'Architectures', title: 'Microservices', preview: isEs ? 'Arquitectura distribuida donde cada servicio es independiente y auto-contenido.' : 'Distributed architecture where each service is independent and self-contained.' },
    { tab: 'architecture', tabName: 'Architecture', tabColor: 'bg-cyan-500/20 text-cyan-400', section: isEs ? 'Arquitecturas' : 'Architectures', title: 'Event-Driven Architecture', preview: isEs ? 'Los componentes se comunican a través de eventos asíncronos.' : 'Components communicate via asynchronous events.' },
    { tab: 'architecture', tabName: 'Architecture', tabColor: 'bg-cyan-500/20 text-cyan-400', section: isEs ? 'Arquitecturas' : 'Architectures', title: 'Hexagonal Architecture', preview: isEs ? 'Aísla la lógica de negocio de dependencias externas mediante puertos y adaptadores.' : 'Isolates business logic from external dependencies via ports and adapters.' },

    // JavaScript/TypeScript
    { tab: 'jsts', tabName: tabJsTs, tabColor: 'bg-yellow-500/20 text-yellow-300', section: 'JavaScript', title: isEs ? 'Scope, Hoisting y Closure' : 'Scope, Hoisting and Closure', preview: isEs ? 'Fundamentos críticos para entrevistas técnicas.' : 'Critical fundamentals for technical interviews.' },
    { tab: 'jsts', tabName: tabJsTs, tabColor: 'bg-yellow-500/20 text-yellow-300', section: 'Async', title: 'Event Loop', preview: isEs ? 'Orden de ejecución entre sync, microtasks y macrotasks.' : 'Execution order across sync, microtasks, and macrotasks.' },
    { tab: 'jsts', tabName: tabJsTs, tabColor: 'bg-yellow-500/20 text-yellow-300', section: 'TypeScript', title: 'Type vs Interface', preview: isEs ? 'Cuándo usar cada uno y cómo responder en entrevista.' : 'When to use each and how to answer in interviews.' },
    { tab: 'jsts', tabName: tabJsTs, tabColor: 'bg-yellow-500/20 text-yellow-300', section: 'Pitfalls', title: isEs ? 'Coerción y comparación' : 'Coercion and comparison', preview: isEs ? 'Trampas clásicas: ==, ===, null, undefined.' : 'Classic traps: ==, ===, null, undefined.' },

    // Cloud
    { tab: 'cloud', tabName: tabCloud, tabColor: 'bg-sky-500/20 text-sky-400', section: isEs ? 'Conceptos' : 'Concepts', title: 'IaaS vs PaaS vs SaaS', preview: isEs ? 'Modelos de servicio cloud y cuándo usar cada uno.' : 'Cloud service models and when to use each one.' },
    { tab: 'cloud', tabName: tabCloud, tabColor: 'bg-sky-500/20 text-sky-400', section: isEs ? 'Comparativa' : 'Comparison', title: 'AWS vs Azure vs GCP', preview: isEs ? 'Mapa de servicios equivalentes para compute, storage, DB, IAM y observabilidad.' : 'Equivalent service map for compute, storage, DB, IAM, and observability.' },
    { tab: 'cloud', tabName: tabCloud, tabColor: 'bg-sky-500/20 text-sky-400', section: isEs ? 'Seguridad' : 'Security', title: 'Shared Responsibility Model', preview: isEs ? 'Qué asegura el proveedor cloud y qué te corresponde asegurar a ti.' : 'What the cloud provider secures and what you must secure.' },
    { tab: 'cloud', tabName: tabCloud, tabColor: 'bg-sky-500/20 text-sky-400', section: 'FinOps', title: 'Cost Optimization', preview: isEs ? 'Buenas prácticas para controlar y optimizar costos en la nube.' : 'Best practices to control and optimize cloud costs.' },

    // Containers
    { tab: 'containers', tabName: tabContainers, tabColor: 'bg-teal-500/20 text-teal-400', section: 'Docker', title: 'docker build', preview: isEs ? 'Construye una imagen desde Dockerfile.' : 'Build an image from a Dockerfile.' },
    { tab: 'containers', tabName: tabContainers, tabColor: 'bg-teal-500/20 text-teal-400', section: 'Docker', title: 'docker run', preview: isEs ? 'Ejecuta contenedores con puertos y nombre.' : 'Run containers with ports and names.' },
    { tab: 'containers', tabName: tabContainers, tabColor: 'bg-teal-500/20 text-teal-400', section: 'Kubernetes', title: 'kubectl apply', preview: isEs ? 'Aplica manifiestos declarativos para crear o actualizar recursos.' : 'Apply declarative manifests to create or update resources.' },
    { tab: 'containers', tabName: tabContainers, tabColor: 'bg-teal-500/20 text-teal-400', section: 'Kubernetes', title: 'kubectl get pods', preview: isEs ? 'Lista pods por namespace o en todo el cluster.' : 'List pods by namespace or across the cluster.' },

    // Java
    { tab: 'java', tabName: 'Java Pro', tabColor: 'bg-orange-500/20 text-orange-400', section: 'Features', title: 'Lambda Expressions', preview: isEs ? 'Programación funcional en Java 8+' : 'Functional programming in Java 8+' },
    { tab: 'java', tabName: 'Java Pro', tabColor: 'bg-orange-500/20 text-orange-400', section: 'Features', title: 'Stream API', preview: isEs ? 'Procesamiento de colecciones funcional' : 'Functional collection processing' },
    { tab: 'java', tabName: 'Java Pro', tabColor: 'bg-orange-500/20 text-orange-400', section: 'Features', title: 'Records', preview: isEs ? 'Clases de datos inmutables en Java 17+' : 'Immutable data classes in Java 17+' },
    { tab: 'java', tabName: 'Java Pro', tabColor: 'bg-orange-500/20 text-orange-400', section: 'Features', title: 'Virtual Threads', preview: isEs ? 'Concurrencia ligera en Java 21' : 'Lightweight concurrency in Java 21' },
    { tab: 'java', tabName: 'Java Pro', tabColor: 'bg-orange-500/20 text-orange-400', section: 'Java 25', title: 'Compact Source Files', preview: isEs ? 'Java 25 LTS - programas sin boilerplate, sin public static void main' : 'Java 25 LTS - programs without boilerplate, no public static void main' },

    // Spring
    { tab: 'spring', tabName: 'Spring Pro', tabColor: 'bg-green-500/20 text-green-400', section: 'Core', title: 'Dependency Injection', preview: isEs ? 'Inyección de dependencias en Spring' : 'Dependency injection in Spring' },
    { tab: 'spring', tabName: 'Spring Pro', tabColor: 'bg-green-500/20 text-green-400', section: 'Core', title: 'Bean Scopes', preview: isEs ? 'Singleton, Prototype, Request, Session' : 'Singleton, Prototype, Request, Session' },
    { tab: 'spring', tabName: 'Spring Pro', tabColor: 'bg-green-500/20 text-green-400', section: 'Data', title: 'JPA Repositories', preview: isEs ? 'CRUD sin escribir SQL' : 'CRUD without writing SQL' },
    { tab: 'spring', tabName: 'Spring Pro', tabColor: 'bg-green-500/20 text-green-400', section: 'Spring Boot 4', title: 'Virtual Threads Out-of-the-Box', preview: isEs ? 'Spring Boot 4 - soporte nativo de Project Loom' : 'Spring Boot 4 - native Project Loom support' },

    // React
    { tab: 'react', tabName: 'React Pro', tabColor: 'bg-blue-500/20 text-blue-400', section: 'Core', title: 'Virtual DOM', preview: isEs ? 'Representación en memoria del DOM real' : 'In-memory representation of the real DOM' },
    { tab: 'react', tabName: 'React Pro', tabColor: 'bg-blue-500/20 text-blue-400', section: 'Hooks', title: 'useState', preview: isEs ? 'Estado local en componentes funcionales' : 'Local state in functional components' },
    { tab: 'react', tabName: 'React Pro', tabColor: 'bg-blue-500/20 text-blue-400', section: 'Hooks', title: 'useEffect', preview: isEs ? 'Efectos secundarios y sincronización' : 'Side effects and synchronization' },
    { tab: 'react', tabName: 'React Pro', tabColor: 'bg-blue-500/20 text-blue-400', section: 'Hooks', title: 'useMemo', preview: isEs ? 'Memoización de valores calculados' : 'Memoization of computed values' },

    // Angular
    { tab: 'angular', tabName: 'Angular Pro', tabColor: 'bg-red-500/20 text-red-400', section: 'Building Blocks', title: 'Components', preview: isEs ? 'Bloques fundamentales de Angular' : 'Fundamental building blocks of Angular' },
    { tab: 'angular', tabName: 'Angular Pro', tabColor: 'bg-red-500/20 text-red-400', section: 'Reactivity', title: 'Signals', preview: isEs ? 'Sistema reactivo moderno de Angular 16+' : 'Modern reactive system in Angular 16+' },
    { tab: 'angular', tabName: 'Angular Pro', tabColor: 'bg-red-500/20 text-red-400', section: 'RxJS', title: 'Observables', preview: isEs ? 'Streams de datos asíncronos' : 'Asynchronous data streams' },

    // Node.js
    { tab: 'node', tabName: 'Node.js Pro', tabColor: 'bg-emerald-500/20 text-emerald-400', section: 'Fundamentals', title: 'Event Loop', preview: isEs ? 'Ciclo de eventos asíncrono, non-blocking I/O' : 'Asynchronous event cycle, non-blocking I/O' },
    { tab: 'node', tabName: 'Node.js Pro', tabColor: 'bg-emerald-500/20 text-emerald-400', section: 'APIs', title: 'Express.js', preview: isEs ? 'Framework web más popular para Node.js' : 'Most popular web framework for Node.js' },
    { tab: 'node', tabName: 'Node.js Pro', tabColor: 'bg-emerald-500/20 text-emerald-400', section: 'APIs', title: 'GraphQL', preview: isEs ? 'API flexible con Apollo Server' : 'Flexible API with Apollo Server' },

    // GraphQL
    { tab: 'graphql', tabName: 'GraphQL Pro', tabColor: 'bg-pink-500/20 text-pink-400', section: 'Core', title: 'Query', preview: isEs ? 'Pide exactamente los datos que necesitas, sin over-fetching.' : 'Ask for exactly the data you need — no over-fetching.' },
    { tab: 'graphql', tabName: 'GraphQL Pro', tabColor: 'bg-pink-500/20 text-pink-400', section: 'Core', title: 'Mutation', preview: isEs ? 'Modifica datos en el servidor: CREATE, UPDATE y DELETE.' : 'Modify server data: CREATE, UPDATE and DELETE.' },
    { tab: 'graphql', tabName: 'GraphQL Pro', tabColor: 'bg-pink-500/20 text-pink-400', section: 'Core', title: 'Subscription', preview: isEs ? 'Datos en tiempo real mediante WebSockets.' : 'Real-time data via WebSockets.' },
    { tab: 'graphql', tabName: 'GraphQL Pro', tabColor: 'bg-pink-500/20 text-pink-400', section: 'Schema', title: 'SDL - Schema Definition Language', preview: isEs ? 'Define tipos, queries y mutaciones en un contrato tipado.' : 'Define types, queries and mutations in a typed contract.' },
    { tab: 'graphql', tabName: 'GraphQL Pro', tabColor: 'bg-pink-500/20 text-pink-400', section: isEs ? 'Comparativa' : 'Comparison', title: 'GraphQL vs REST', preview: isEs ? 'Un solo endpoint, tipado fuerte e introspección.' : 'Single endpoint, strong typing and introspection.' },

    // Testing
    { tab: 'testing', tabName: 'Testing Pro', tabColor: 'bg-amber-500/20 text-amber-400', section: 'Core', title: isEs ? 'Pirámide de Testing' : 'Testing Pyramid', preview: isEs ? 'Unit → Integration → E2E. La base más amplia son los unit tests más rápidos y baratos.' : 'Unit → Integration → E2E. The widest base are the fastest and cheapest unit tests.' },
    { tab: 'testing', tabName: 'Testing Pro', tabColor: 'bg-amber-500/20 text-amber-400', section: 'Unit', title: 'Jest / Vitest', preview: isEs ? 'Tests unitarios rápidos con mocks y assertions claros.' : 'Fast unit tests with clear mocks and assertions.' },
    { tab: 'testing', tabName: 'Testing Pro', tabColor: 'bg-amber-500/20 text-amber-400', section: 'E2E', title: 'Cypress / Playwright', preview: isEs ? 'Tests end-to-end que simulan comportamiento real del usuario.' : 'End-to-end tests that simulate real user behavior.' },
    { tab: 'testing', tabName: 'Testing Pro', tabColor: 'bg-amber-500/20 text-amber-400', section: 'TDD', title: 'Red → Green → Refactor', preview: isEs ? 'Escribe el test primero, haz que pase, luego mejora el código.' : 'Write the test first, make it pass, then improve the code.' },

    // Databases
    { tab: 'databases', tabName: 'Databases Pro', tabColor: 'bg-violet-500/20 text-violet-400', section: 'Core', title: 'SQL vs NoSQL', preview: isEs ? 'Esquema rígido vs flexible, ACID vs eventual consistency.' : 'Rigid vs flexible schema, ACID vs eventual consistency.' },
    { tab: 'databases', tabName: 'Databases Pro', tabColor: 'bg-violet-500/20 text-violet-400', section: 'PostgreSQL', title: 'MVCC & WAL', preview: isEs ? 'Multi-version concurrency control y write-ahead logging.' : 'Multi-version concurrency control and write-ahead logging.' },
    { tab: 'databases', tabName: 'Databases Pro', tabColor: 'bg-violet-500/20 text-violet-400', section: 'Redis', title: isEs ? 'Caché y estructuras de datos' : 'Cache and data structures', preview: isEs ? 'SET/GET, TTL, HSET, pub/sub y patrones de caché.' : 'SET/GET, TTL, HSET, pub/sub and cache patterns.' },
    { tab: 'databases', tabName: 'Databases Pro', tabColor: 'bg-violet-500/20 text-violet-400', section: 'ACID', title: isEs ? 'Transacciones ACID' : 'ACID Transactions', preview: isEs ? 'Atomicity, Consistency, Isolation, Durability.' : 'Atomicity, Consistency, Isolation, Durability.' },
    { tab: 'databases', tabName: 'Databases Pro', tabColor: 'bg-violet-500/20 text-violet-400', section: isEs ? 'Índices' : 'Indexes', title: isEs ? 'Índices y optimización' : 'Indexes and optimization', preview: isEs ? 'B-tree vs Hash, índices compuestos, EXPLAIN ANALYZE.' : 'B-tree vs Hash, composite indexes, EXPLAIN ANALYZE.' },

    // Security
    { tab: 'security', tabName: 'Security Pro', tabColor: 'bg-red-500/20 text-red-400', section: 'OWASP', title: 'OWASP Top 10', preview: isEs ? 'Las 10 vulnerabilidades más críticas de aplicaciones web.' : 'The 10 most critical web application security risks.' },
    { tab: 'security', tabName: 'Security Pro', tabColor: 'bg-red-500/20 text-red-400', section: 'Auth', title: 'JWT / OAuth2', preview: isEs ? 'Tokens firmados y flujo de autorización delegada.' : 'Signed tokens and delegated authorization flow.' },
    { tab: 'security', tabName: 'Security Pro', tabColor: 'bg-red-500/20 text-red-400', section: 'Auth', title: 'RBAC / ABAC', preview: isEs ? 'Control de acceso basado en roles y atributos.' : 'Role-based and attribute-based access control.' },
    { tab: 'security', tabName: 'Security Pro', tabColor: 'bg-red-500/20 text-red-400', section: 'Attacks', title: 'XSS & CSRF', preview: isEs ? 'Cross-Site Scripting y Cross-Site Request Forgery — cómo prevenirlos.' : 'Cross-Site Scripting and Cross-Site Request Forgery — how to prevent them.' },
  ];
}
