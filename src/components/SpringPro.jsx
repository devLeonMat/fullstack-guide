import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Zap, MessageCircleQuestion } from 'lucide-react';
import { SiSpring } from 'react-icons/si';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';

function SpringPro() {
    const { language } = useLanguage();
    const tx = (es, en) => (language === 'en' ? en : es);
    const [activeSection, setActiveSection] = useState('core');
    const [expandedFundamentals, setExpandedFundamentals] = useState({
        0: true, // First fundamental open by default
    });
    const [expandedQuestions, setExpandedQuestions] = useState({});
    const [expandedLevels, setExpandedLevels] = useState({
        junior: true, // Junior level open by default
    });

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
        core: {
            id: 'core',
            title: 'Core (DI & IoC)',
            subtitle: tx('Inyección de dependencias e inversión de control', 'Dependency Injection & Inversion of Control'),
            icon: SiSpring,
            content: [
                {
                    topic: 'Dependency Injection',
                    description: 'Inyección de dependencias en Spring',
                    code: `// Constructor Injection (Recomendado)
@Service
public class UserService {
    private final UserRepository userRepository;
    private final EmailService emailService;
    
    @Autowired
    public UserService(UserRepository userRepository, 
                      EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }
    
    public void registerUser(User user) {
        userRepository.save(user);
        emailService.sendWelcomeEmail(user);
    }
}`,
                    points: [
                        'Constructor Injection: Inyección obligatoria, inmutable',
                        'Setter Injection: Inyección opcional',
                        'Field Injection: No recomendado (dificulta testing)',
                        '@Autowired: Marca dependencias para inyectar'
                    ]
                },
                {
                    topic: 'Bean Scopes',
                    description: 'Alcance de los beans en Spring',
                    code: `// Singleton (Default)
@Service
@Scope("singleton")
public class ConfigService {
    // Una sola instancia compartida
}

// Prototype
@Component
@Scope("prototype")
public class TaskProcessor {
    // Nueva instancia cada vez
}

// Request (Web)
@Component
@Scope(value = WebApplicationContext.SCOPE_REQUEST, 
       proxyMode = ScopedProxyMode.TARGET_CLASS)
public class RequestContext {
    // Nueva instancia por request HTTP
}`,
                    points: [
                        'Singleton: Una instancia para toda la app (default)',
                        'Prototype: Nueva instancia cada vez que se solicita',
                        'Request: Una por request HTTP',
                        'Session: Una por sesión HTTP',
                        'Application: Una por ServletContext'
                    ]
                },
                {
                    topic: 'Bean Lifecycle',
                    description: 'Ciclo de vida de los beans',
                    code: `@Component
public class DatabaseConnection {
    
    @PostConstruct
    public void init() {
        // Se ejecuta después de la inyección
        System.out.println("Initializing DB connection");
        // Abrir conexión, validar configuración
    }
    
    @PreDestroy
    public void cleanup() {
        // Se ejecuta antes de destruir el bean
        System.out.println("Closing DB connection");
        // Cerrar conexión, liberar recursos
    }
}`,
                    points: [
                        '@PostConstruct: Después de inyección de dependencias',
                        '@PreDestroy: Antes de destruir el bean',
                        'InitializingBean: Alternativa a @PostConstruct',
                        'DisposableBean: Alternativa a @PreDestroy'
                    ]
                }
            ]
        },
        data: {
            id: 'data',
            title: 'Data (JPA & Transactions)',
            subtitle: tx('Spring Data JPA y manejo de transacciones', 'Spring Data JPA & Transaction Management'),
            icon: Database,
            content: [
                {
                    topic: 'Spring Data JPA',
                    description: 'Repositories con CRUD sin escribir SQL',
                    code: `// Entity
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String email;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Order> orders;
}

// Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Métodos automáticos: save, findById, findAll, delete
    
    // Query Methods
    List<User> findByEmail(String email);
    List<User> findByNameContaining(String name);
    
    // Custom Query
    @Query("SELECT u FROM User u WHERE u.email LIKE %:domain")
    List<User> findByEmailDomain(@Param("domain") String domain);
}`,
                    points: [
                        'JpaRepository: CRUD + paginación + sorting',
                        'Query Methods: Generar queries desde nombre del método',
                        '@Query: Queries JPQL personalizadas',
                        'Specifications: Queries dinámicas type-safe'
                    ]
                },
                {
                    topic: 'Transactions',
                    description: 'Manejo de transacciones con @Transactional',
                    code: `@Service
public class OrderService {
    
    @Transactional
    public void processOrder(Order order) {
        // Todo en una transacción
        orderRepository.save(order);
        inventoryService.reduceStock(order.getItems());
        paymentService.charge(order.getTotal());
        emailService.sendConfirmation(order);
        // Si algo falla, todo hace rollback
    }
    
    @Transactional(readOnly = true)
    public List<Order> getOrders() {
        // Optimizado para lectura
        return orderRepository.findAll();
    }
    
    @Transactional(
        isolation = Isolation.SERIALIZABLE,
        propagation = Propagation.REQUIRES_NEW,
        timeout = 5
    )
    public void criticalOperation() {
        // Configuración avanzada
    }
}`,
                    points: [
                        '@Transactional: Demarca límites de transacción',
                        'readOnly: Optimiza transacciones de solo lectura',
                        'Propagation: REQUIRED, REQUIRES_NEW, NESTED, etc.',
                        'Isolation: READ_UNCOMMITTED, SERIALIZABLE, etc.',
                        'Rollback automático en RuntimeException'
                    ]
                },
                {
                    topic: 'Entity Relationships',
                    description: 'Relaciones entre entidades',
                    code: `// One to Many
@Entity
public class Author {
    @OneToMany(mappedBy = "author", 
               cascade = CascadeType.ALL,
               fetch = FetchType.LAZY)
    private List<Book> books;
}

@Entity
public class Book {
    @ManyToOne
    @JoinColumn(name = "author_id")
    private Author author;
}

// Many to Many
@Entity
public class Student {
    @ManyToMany
    @JoinTable(
        name = "student_course",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private Set<Course> courses;
}`,
                    points: [
                        '@OneToOne: Relación 1:1',
                        '@OneToMany / @ManyToOne: Relación 1:N',
                        '@ManyToMany: Relación N:M con tabla intermedia',
                        'FetchType.LAZY: Carga bajo demanda',
                        'FetchType.EAGER: Carga inmediata (usar con cuidado)'
                    ]
                }
            ]
        },
        boot: {
            id: 'boot',
            title: 'Boot (Starters & AutoConfig)',
            subtitle: tx('Starters y autoconfiguración de Spring Boot', 'Spring Boot Starters & Auto-Configuration'),
            icon: Zap,
            content: [
                {
                    topic: 'Spring Boot Starters',
                    description: 'Dependencias pre-configuradas',
                    code: `<!-- pom.xml -->
<!-- Web Starter: Spring MVC + Tomcat + JSON -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Data JPA Starter: Hibernate + JPA + JDBC -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- Security Starter: Spring Security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<!-- Test Starter: JUnit + Mockito + AssertJ -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>`,
                    points: [
                        'spring-boot-starter-web: REST APIs y MVC',
                        'spring-boot-starter-data-jpa: Persistencia con JPA',
                        'spring-boot-starter-security: Autenticación y autorización',
                        'spring-boot-starter-actuator: Monitoreo y métricas',
                        'spring-boot-starter-test: Testing completo'
                    ]
                },
                {
                    topic: 'Auto-Configuration',
                    description: 'Configuración automática basada en classpath',
                    code: `// application.properties / application.yml
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/mydb
spring.datasource.username=user
spring.datasource.password=pass
spring.jpa.hibernate.ddl-auto=update

# Server
server.port=8080
server.servlet.context-path=/api

# Logging
logging.level.root=INFO
logging.level.com.myapp=DEBUG

# Actuator
management.endpoints.web.exposure.include=health,metrics,info`,
                    points: [
                        'Auto-configura beans basado en dependencias',
                        '@ConditionalOnClass: Configura si clase existe',
                        '@ConditionalOnMissingBean: Solo si no hay bean',
                        'application.properties: Configuración externa',
                        '@ConfigurationProperties: Type-safe config'
                    ]
                },
                {
                    topic: 'Main Application',
                    description: 'Punto de entrada Spring Boot',
                    code: `@SpringBootApplication
// Equivalente a:
// @Configuration
// @EnableAutoConfiguration
// @ComponentScan
public class Application {
    
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
    
    // Customización opcional
    @Bean
    public CommandLineRunner demo(UserRepository repository) {
        return args -> {
            // Ejecuta al iniciar la app
            repository.save(new User("Admin"));
        };
    }
}

// REST Controller
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }
    
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.save(user);
    }
}`,
                    points: [
                        '@SpringBootApplication: Anotación todo-en-uno',
                        'Embedded Tomcat: No necesitas servidor externo',
                        'Fat JAR: java -jar app.jar y funciona',
                        'Profiles: dev, prod, test con diferentes configs',
                        'DevTools: Hot reload automático en desarrollo'
                    ]
                }
            ]
        },
        webflux: {
            id: 'webflux',
            title: 'WebFlux (Reactive)',
            subtitle: tx('Programación reactiva con Spring WebFlux', 'Reactive Programming with Spring WebFlux'),
            icon: Zap,
            content: [
                {
                    topic: 'Reactive Programming Basics',
                    description: 'Programación reactiva con Project Reactor',
                    code: `import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

// Mono: 0 o 1 elemento
Mono<String> mono = Mono.just("Hello")
    .map(String::toUpperCase)
    .doOnNext(System.out::println);

// Flux: 0 a N elementos
Flux<Integer> flux = Flux.range(1, 5)
    .filter(n -> n % 2 == 0)
    .map(n -> n * 2)
    .doOnNext(System.out::println);

// Subscribe para ejecutar
mono.subscribe(
    data -> System.out.println("onNext: " + data),
    error -> System.err.println("onError: " + error),
    () -> System.out.println("onComplete")
);

// Operadores comunes
Flux.just("A", "B", "C")
    .flatMap(s -> Flux.just(s.toLowerCase()))
    .collectList()
    .subscribe(list -> System.out.println(list));`,
                    points: [
                        'Mono<T>: Publisher asíncrono de 0 o 1 elemento',
                        'Flux<T>: Publisher asíncrono de 0 a N elementos',
                        'Non-blocking I/O: Mejor uso de threads',
                        'Backpressure: Control de flujo automático',
                        'Operators: map, filter, flatMap, zip, etc.'
                    ]
                },
                {
                    topic: 'WebFlux Controllers',
                    description: 'Controllers reactivos con WebFlux',
                    code: `@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    // Mono para un solo usuario
    @GetMapping("/{id}")
    public Mono<User> getUser(@PathVariable String id) {
        return userService.findById(id);
    }
    
    // Flux para múltiples usuarios
    @GetMapping
    public Flux<User> getAllUsers() {
        return userService.findAll();
    }
    
    // POST reactivo
    @PostMapping
    public Mono<User> createUser(@RequestBody Mono<User> userMono) {
        return userMono.flatMap(userService::save);
    }
    
    // Server-Sent Events (SSE)
    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<User> streamUsers() {
        return userService.findAll()
            .delayElements(Duration.ofSeconds(1));
    }
}`,
                    points: [
                        'Return Mono o Flux en lugar de entidades directas',
                        '@RequestBody Mono<T>: Request body reactivo',
                        'Server-Sent Events: Streaming en tiempo real',
                        'Non-blocking: No bloquea threads esperando respuesta',
                        'Functional Endpoints: Alternativa a controllers'
                    ]
                },
                {
                    topic: 'WebFlux vs Spring MVC',
                    description: 'Diferencias y cuándo usar cada uno',
                    code: `// Spring MVC (Blocking)
@RestController
public class UserControllerMVC {
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        return userRepository.findById(id).orElseThrow();
        // Thread bloqueado esperando DB
    }
}

// Spring WebFlux (Non-blocking)
@RestController
public class UserControllerFlux {
    @GetMapping("/users/{id}")
    public Mono<User> getUser(@PathVariable Long id) {
        return userRepository.findById(id);
        // Thread libre inmediatamente
    }
}

// Configuración en application.properties
# WebFlux con Netty (default)
server.port=8080

# Reactive Database
spring.data.mongodb.uri=mongodb://localhost:27017/reactive
# O R2DBC para SQL reactivo
spring.r2dbc.url=r2dbc:postgresql://localhost/testdb`,
                    points: [
                        'MVC: Blocking, un thread por request, bueno para apps CRUD',
                        'WebFlux: Non-blocking, event loop, bueno para alta concurrencia',
                        'WebFlux requiere dependencias reactivas (R2DBC, Reactive Mongo)',
                        'WebFlux usa Netty por defecto (no Tomcat)',
                        'No mezclar: bloquear en WebFlux pierde ventajas'
                    ]
                },
                {
                    topic: 'Reactive Repositories',
                    description: 'Spring Data Reactive con R2DBC o Mongo',
                    code: `// R2DBC Repository (SQL reactivo)
public interface UserRepository extends ReactiveCrudRepository<User, Long> {
    Flux<User> findByLastName(String lastName);
    
    @Query("SELECT * FROM users WHERE age > :age")
    Flux<User> findAdults(@Param("age") int age);
}

// Service con reactive repository
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    public Flux<User> searchUsers(String query) {
        return userRepository.findAll()
            .filter(user -> user.getName().contains(query))
            .take(10);
    }
    
    public Mono<User> updateUser(Long id, User updates) {
        return userRepository.findById(id)
            .flatMap(existing -> {
                existing.setName(updates.getName());
                return userRepository.save(existing);
            });
    }
}`,
                    points: [
                        'ReactiveCrudRepository: Versión reactiva de CrudRepository',
                        'R2DBC: Driver reactivo para PostgreSQL, MySQL, etc.',
                        'Reactive MongoDB: MongoDB ya es no-bloqueante',
                        'Query methods retornan Mono/Flux',
                        'Transactions reactivas con @Transactional'
                    ]
                }
            ]
        },
        boot4: {
            id: 'boot4',
            title: 'Spring Boot 4 (2025)',
            subtitle: tx('Novedades de Spring Boot 4 y Spring Framework 7', 'Spring Boot 4 & Spring Framework 7 - Nov 2025'),
            icon: Zap,
            content: [
                {
                    topic: 'Jakarta EE 11 & Nueva Baseline',
                    description: tx('Spring Boot 4 requiere mínimo JDK 17, idealmente JDK 25 LTS. Alinea con Jakarta EE 11 (Servlet 6.1, JPA 3.2, Bean Validation 3.1)', 'Spring Boot 4 requires JDK 17 minimum, ideally JDK 25 LTS. Aligns with Jakarta EE 11 (Servlet 6.1, JPA 3.2, Bean Validation 3.1)'),
                    code: `<!-- pom.xml - Spring Boot 4 -->
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>4.0.0</version>
</parent>

<properties>
    <!-- JDK 25 LTS recomendado para aprovechar Virtual Threads -->
    <java.version>25</java.version>
</properties>

<!-- Ahora usa Jakarta EE 11 (no javax.*) -->
<!-- Servlet 6.1, JPA 3.2, Bean Validation 3.1 -->
<!-- Tomcat 11+ o Jetty 12.1+ requeridos -->

<!-- Kotlin 2.2 soportado nativamente -->
<dependency>
    <groupId>org.jetbrains.kotlin</groupId>
    <artifactId>kotlin-stdlib</artifactId>
</dependency>`,
                    points: [
                        tx('JDK 17 mínimo, JDK 25 LTS recomendado para Virtual Threads', 'JDK 17 minimum, JDK 25 LTS recommended for Virtual Threads'),
                        tx('Jakarta EE 11: usa jakarta.* en lugar de javax.*', 'Jakarta EE 11: use jakarta.* instead of javax.*'),
                        tx('Tomcat 11+ o Jetty 12.1+ como servidores embebidos', 'Tomcat 11+ or Jetty 12.1+ as embedded servers'),
                        tx('Kotlin 2.2: integración mejorada con coroutines', 'Kotlin 2.2: improved coroutine integration'),
                        tx('Spring Framework 7.0 como base (released Nov 2025)', 'Spring Framework 7.0 as foundation (released Nov 2025)')
                    ]
                },
                {
                    topic: 'Virtual Threads Out-of-the-Box',
                    description: tx('Spring Boot 4 soporta Virtual Threads (Project Loom) sin configuración adicional. Maneja millones de requests con menos memoria', 'Spring Boot 4 supports Virtual Threads (Project Loom) out-of-the-box. Handles millions of requests with less memory'),
                    code: `# application.properties - Spring Boot 4
# Habilitar Virtual Threads (default en SB4 con JDK 21+)
spring.threads.virtual.enabled=true

# Tomcat usa Virtual Threads automáticamente
# No necesitas configurar thread pools manualmente

# Resultado: cada request HTTP corre en un Virtual Thread
# - Antes (SB3): 200-400 platform threads por instancia
# - SB4 + Virtual Threads: millones de threads ligeros

// También disponible en código
@Bean
public TomcatProtocolHandlerCustomizer<?> protocolHandler() {
    return handler -> handler
        .setExecutor(Executors.newVirtualThreadPerTaskExecutor());
}`,
                    points: [
                        tx('spring.threads.virtual.enabled=true - configuración simple', 'spring.threads.virtual.enabled=true - simple config'),
                        tx('Tomcat y Jetty usan Virtual Threads automáticamente', 'Tomcat and Jetty use Virtual Threads automatically'),
                        tx('Escala a millones de conexiones concurrentes', 'Scales to millions of concurrent connections'),
                        tx('Sin cambios en tu código de negocio existente', 'No changes to your existing business code'),
                        tx('Requiere JDK 21+ (JDK 25 LTS recomendado)', 'Requires JDK 21+ (JDK 25 LTS recommended)')
                    ]
                },
                {
                    topic: 'Modular Auto-Configuration',
                    description: tx('Spring Boot 4 carga solo los módulos necesarios - reduce startup time, menor consumo de memoria y gestión de deps más limpia', 'Spring Boot 4 loads only necessary modules — reduces startup time, lower memory and cleaner dependency management'),
                    code: `// Spring Boot 4 - Auto-Configuration modular
// Solo carga lo que necesitas (lazy por defecto)

// application.properties
spring.autoconfigure.lazy=true  // nueva opción

// O excluir módulos específicos:
@SpringBootApplication(exclude = {
    DataSourceAutoConfiguration.class,
    JpaRepositoriesAutoConfiguration.class
})
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// Nuevo: Auto-Configuration condicional más granular
@AutoConfiguration
@ConditionalOnProperty("feature.payments.enabled")
public class PaymentAutoConfiguration {
    @Bean
    public PaymentService paymentService() {
        return new StripePaymentService();
    }
}`,
                    points: [
                        tx('Carga lazy de módulos - solo lo que se usa', 'Lazy loading of modules - only what is used'),
                        tx('spring.autoconfigure.lazy=true para startup más rápido', 'spring.autoconfigure.lazy=true for faster startup'),
                        tx('@AutoConfiguration reemplaza @Configuration legacy', '@AutoConfiguration replaces legacy @Configuration'),
                        tx('Reducción de startup time hasta 40% en apps grandes', 'Up to 40% startup time reduction in large apps'),
                        tx('Mejor compatibilidad con GraalVM Native Image', 'Better GraalVM Native Image compatibility')
                    ]
                },
                {
                    topic: 'Null Safety con JSpecify',
                    description: tx('Spring Framework 7 adopta JSpecify annotations para null-safety completa en compile-time. Menos NullPointerExceptions en producción', 'Spring Framework 7 adopts JSpecify annotations for complete compile-time null-safety. Fewer NullPointerExceptions in production'),
                    code: `import org.jspecify.annotations.NonNull;
import org.jspecify.annotations.Nullable;
import org.jspecify.annotations.NullMarked;

// @NullMarked hace toda la clase null-safe por defecto
@NullMarked
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    // @Nullable marca explícitamente parámetros opcionales
    @GetMapping
    public List<User> getUsers(@Nullable String filter) {
        if (filter == null) return userService.findAll();
        return userService.findByFilter(filter);
    }
    
    // @NonNull garantiza que no puede ser null
    @PostMapping
    public User create(@NonNull @RequestBody User user) {
        return userService.save(user);
    }
}

// El compilador detecta posibles null en compile-time
// Compatible con Kotlin null-safety (!)`,
                    points: [
                        tx('JSpecify: estándar de null-safety para Java', 'JSpecify: null-safety standard for Java'),
                        tx('@NullMarked, @Nullable, @NonNull annotations', '@NullMarked, @Nullable, @NonNull annotations'),
                        tx('Detección de nulls en compile-time con tu IDE', 'Compile-time null detection with your IDE'),
                        tx('Integración perfecta con null-safety de Kotlin', 'Perfect integration with Kotlin null-safety'),
                        tx('Spring API completa anotada con JSpecify en SF7', 'Spring full API annotated with JSpecify in SF7')
                    ]
                },
                {
                    topic: 'Versionado de API REST Nativo',
                    description: tx('Spring Framework 7 incluye soporte nativo para versionar APIs REST con múltiples estrategias built-in', 'Spring Framework 7 includes native REST API versioning with multiple built-in strategies'),
                    code: `// Spring Framework 7 - API Versioning nativo
// Estrategia 1: Path-based
@RestController
@RequestMapping("/api")
public class UserController {
    
    @GetMapping("/v1/users")
    @ApiVersion("1.0")
    public List<UserV1> getUsersV1() { /* ... */ }
    
    @GetMapping("/v2/users")
    @ApiVersion("2.0")
    public List<UserV2> getUsersV2() { /* ... */ }
}

// Estrategia 2: Header-based
// GET /api/users + Header: API-Version: 2.0

// Estrategia 3: Query Parameter
// GET /api/users?version=2.0

// application.properties
spring.mvc.versioning.strategy=path  # path | header | query
spring.mvc.versioning.header=API-Version
spring.mvc.versioning.default-version=1.0

// Deprecation automática
@ApiVersion(value = "1.0", deprecated = true, sunset = "2026-01-01")`,
                    points: [
                        tx('Soporte nativo sin librerías externas', 'Native support without external libraries'),
                        tx('Estrategias: path, header, query param, media type', 'Strategies: path, header, query param, media type'),
                        tx('@ApiVersion: anotación declarativa por endpoint', '@ApiVersion: declarative annotation per endpoint'),
                        tx('Deprecation handling con fechas sunset automáticas', 'Deprecation handling with automatic sunset dates'),
                        tx('spring.mvc.versioning.* en application.properties', 'spring.mvc.versioning.* in application.properties')
                    ]
                },
                {
                    topic: 'Resilience Built-in (SF7)',
                    description: tx('Spring Framework 7 integra patrones de resiliencia directamente: retry, circuit breaker, rate limiting, sin Resilience4j externo', 'Spring Framework 7 integrates resilience patterns natively: retry, circuit breaker, rate limiting, without external Resilience4j'),
                    code: `import org.springframework.resilience.annotation.*;

// Spring Framework 7 - Resilience nativo
@Service
@EnableResilientMethods
public class PaymentService {
    
    // Retry automático con backoff exponencial
    @Retryable(
        retries = 3,
        delay = 1000L,
        backoff = @Backoff(multiplier = 2.0)
    )
    public Payment processPayment(Order order) {
        return externalPaymentGateway.charge(order);
    }
    
    // Límite de concurrencia
    @ConcurrencyLimit(maxConcurrentCalls = 10)
    public List<Product> fetchFromSlowAPI() {
        return externalApi.getProducts();
    }
    
    // Fallback automático si falla
    public Payment fallback(Order order, Exception ex) {
        return Payment.queued(order); // procesar después
    }
}`,
                    points: [
                        tx('@Retryable: retry con backoff exponencial nativo', '@Retryable: retry with native exponential backoff'),
                        tx('@ConcurrencyLimit: rate limiting por método', '@ConcurrencyLimit: method-level rate limiting'),
                        tx('@EnableResilientMethods: habilita en la clase', '@EnableResilientMethods: enables on class level'),
                        tx('Fallback methods declarativos por anotación', 'Declarative fallback methods via annotation'),
                        tx('Sin dependencias externas (Resilience4j opcional)', 'No external dependencies (Resilience4j optional)')
                    ]
                },
                {
                    topic: 'Observabilidad: Micrometer 2.x + OpenTelemetry',
                    description: tx('Spring Boot 4 ofrece observabilidad profunda con Micrometer 2.x y OpenTelemetry nativo. Trazas, métricas y logs unificados', 'Spring Boot 4 offers deep observability with Micrometer 2.x and native OpenTelemetry. Traces, metrics and logs unified'),
                    code: `# application.properties - Observabilidad SB4

# OpenTelemetry nativo (OTLP)
management.otlp.tracing.endpoint=http://otel-collector:4318/v1/traces
management.tracing.sampling.probability=1.0

# Micrometer 2.x - exportar métricas
management.prometheus.metrics.export.enabled=true
management.endpoints.web.exposure.include=health,metrics,info,prometheus

// En código - Observación automática
@Service
public class OrderService {
    
    private final ObservationRegistry registry;
    
    // @Observed - traza automática sin código extra
    @Observed(name = "order.process", contextualName = "ProcessOrder")
    public Order processOrder(OrderRequest req) {
        // Spring crea spans automáticamente
        // Logs correlacionados con traceId
        return createOrder(req);
    }
}

// Métricas personalizadas
Counter.builder("orders.created")
    .tag("status", "success")
    .register(registry)
    .increment();`,
                    points: [
                        tx('Micrometer 2.x: API de observabilidad unificada', 'Micrometer 2.x: unified observability API'),
                        tx('@Observed: tracing automático sin boilerplate', '@Observed: automatic tracing without boilerplate'),
                        tx('OpenTelemetry OTLP nativo - compatible con Jaeger, Zipkin', 'Native OpenTelemetry OTLP - compatible with Jaeger, Zipkin'),
                        tx('Logs correlacionados con traceId y spanId', 'Logs correlated with traceId and spanId'),
                        tx('Exportar a Prometheus, Datadog, New Relic, etc.', 'Export to Prometheus, Datadog, New Relic, etc.')
                    ]
                }
            ]
        }
    };

    const sectionList = Object.values(sections);
    const currentSection = sections[activeSection];
    const SectionIcon = currentSection.icon;

    return (
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-2 overflow-y-auto pr-2">
                <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                    <SiSpring className="w-6 h-6" />
                    {t('spring', language).title}
                </h3>
                {sectionList.map((section) => {
                    const Icon = section.icon;
                    return (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${activeSection === section.id
                                ? 'bg-green-500/20 border border-green-500/50 text-green-300'
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
                        <SectionIcon className="w-8 h-8 text-green-400" />
                        <h2 className="text-3xl font-bold text-green-400">{currentSection.title}</h2>
                    </div>
                    <p className="text-slate-400">{currentSection.subtitle}</p>
                </div>

                <div className="space-y-6 animate-fade-in">
                    {currentSection.content.map((item, idx) => (
                        <div key={idx} className="bg-slate-900/50 border border-green-500/30 rounded-xl p-6">
                            <div className="flex items-start gap-3 mb-4">
                                <Database className="w-6 h-6 text-green-400 mt-1" />
                                <div>
                                    <h3 className="text-xl font-bold text-green-400">{item.topic}</h3>
                                    <p className="text-slate-400 text-sm">{item.description}</p>
                                </div>
                            </div>

                            {/* Code */}
                            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 mb-4 overflow-x-auto">
                                <CodeBlock code={item.code} language="java" />
                            </div>

                            {/* Points */}
                            <ul className="space-y-2 ml-9">
                                {item.points.map((point, pIdx) => (
                                    <li key={pIdx} className="flex items-start gap-2 text-slate-300 text-sm">
                                        <span className="text-green-400">•</span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SpringPro;
