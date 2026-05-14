import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Zap, MessageCircleQuestion, Shield, Cloud, ChevronDown } from 'lucide-react';
import { SiSpring } from 'react-icons/si';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';

// --- SecurityFlowDiagram ---
const SecurityFlowDiagram = () => {
    const steps = [
        { label: 'HTTP Request', icon: '🌐' },
        { label: 'Filter Chain', icon: '🔗' },
        { label: 'Auth Manager', icon: '🔐' },
        { label: 'UserDetails', icon: '👤' },
        { label: 'JWT Validate', icon: '🎫' },
        { label: 'Controller', icon: '🎯' },
    ];
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep(prev => (prev + 1) % steps.length);
        }, 900);
        return () => clearInterval(interval);
    }, [steps.length]);

    return (
        <div className="w-full bg-slate-950/40 border border-green-500/20 rounded-xl p-5">
            <p className="text-center text-green-400 font-semibold text-sm mb-4">Security Request Flow</p>
            <div className="flex flex-wrap items-center justify-center gap-1">
                {steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                        <motion.div
                            animate={{
                                backgroundColor: idx <= activeStep ? 'rgba(34,197,94,0.25)' : 'rgba(30,41,59,0.5)',
                                borderColor: idx <= activeStep ? 'rgb(34,197,94)' : 'rgb(71,85,105)',
                                scale: idx === activeStep ? 1.1 : 1,
                            }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg border text-center min-w-[70px]"
                        >
                            <span className="text-xl">{step.icon}</span>
                            <span
                                className="text-xs font-medium"
                                style={{ color: idx <= activeStep ? 'rgb(134,239,172)' : 'rgb(148,163,184)' }}
                            >
                                {step.label}
                            </span>
                        </motion.div>
                        {idx < steps.length - 1 && (
                            <motion.span
                                animate={{ color: idx < activeStep ? 'rgb(34,197,94)' : 'rgb(71,85,105)' }}
                                transition={{ duration: 0.4 }}
                                className="text-lg font-bold"
                            >
                                →
                            </motion.span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- MicroservicesDiagram ---
const MicroservicesDiagram = () => {
    const [failedService, setFailedService] = useState(null);
    const services = ['Order Service', 'User Service', 'Payment Service'];

    useEffect(() => {
        let idx = 0;
        const interval = setInterval(() => {
            setFailedService(idx % 3);
            idx++;
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full bg-slate-950/40 border border-green-500/20 rounded-xl p-5">
            <p className="text-center text-green-400 font-semibold text-sm mb-4">Microservices Architecture</p>
            <div className="flex flex-col items-center gap-4">
                {/* API Gateway */}
                <div className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 font-semibold text-sm">
                    API Gateway
                </div>
                {/* Arrow down */}
                <div className="text-green-500 text-lg">↓</div>
                {/* Eureka + Services row */}
                <div className="flex items-center gap-6 flex-wrap justify-center">
                    {/* Eureka */}
                    <div className="flex flex-col items-center gap-1">
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="px-3 py-2 bg-blue-500/20 border border-blue-500/50 rounded-lg text-blue-300 font-semibold text-xs text-center"
                        >
                            Eureka<br/>Registry
                        </motion.div>
                    </div>
                    {/* Services */}
                    <div className="flex gap-3 flex-wrap justify-center">
                        {services.map((svc, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-1">
                                <motion.div
                                    animate={{
                                        backgroundColor: failedService === idx ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.1)',
                                        borderColor: failedService === idx ? 'rgb(239,68,68)' : 'rgba(34,197,94,0.4)',
                                    }}
                                    transition={{ duration: 0.5 }}
                                    className="px-3 py-2 border rounded-lg text-xs font-medium text-center"
                                    style={{ color: failedService === idx ? 'rgb(252,165,165)' : 'rgb(134,239,172)' }}
                                >
                                    {svc}
                                    {failedService === idx && (
                                        <div className="text-red-400 font-bold mt-1">⚡ CB Open</div>
                                    )}
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
                <p className="text-slate-500 text-xs mt-1">Circuit Breaker opens when a service fails</p>
            </div>
        </div>
    );
};

function SpringPro() {
    const { language } = useLanguage();
    const tx = (es, en) => (language === 'en' ? en : es);
    const [activeSection, setActiveSection] = useState('core');
    const [expandedFundamentals, setExpandedFundamentals] = useState({
        0: true,
    });
    const [expandedQuestions, setExpandedQuestions] = useState({});
    const [expandedLevels, setExpandedLevels] = useState({
        junior: true,
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
            diagram: null,
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
            diagram: null,
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
            diagram: null,
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
            diagram: null,
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
            diagram: null,
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
        },
        security: {
            id: 'security',
            title: tx('Spring Security', 'Spring Security'),
            subtitle: tx('Auth, JWT, OAuth2', 'Auth, JWT, OAuth2'),
            icon: Shield,
            diagram: <SecurityFlowDiagram />,
            content: [
                {
                    topic: tx('SecurityFilterChain Config', 'SecurityFilterChain Config'),
                    description: tx('Configuración de seguridad con SecurityFilterChain y JWT', 'Security configuration with SecurityFilterChain and JWT'),
                    code: `@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http,
                                           JwtAuthFilter jwtFilter) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(sm -> sm
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated())
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authManager(AuthenticationConfiguration cfg)
            throws Exception {
        return cfg.getAuthenticationManager();
    }
}`,
                    points: [
                        tx('SecurityFilterChain: Cadena de filtros de seguridad', 'SecurityFilterChain: Security filter chain configuration'),
                        tx('@EnableMethodSecurity: Habilita @PreAuthorize y @Secured', '@EnableMethodSecurity: Enables @PreAuthorize and @Secured'),
                        tx('SessionCreationPolicy.STATELESS: Sin sesiones (JWT)', 'SessionCreationPolicy.STATELESS: No sessions (JWT)'),
                        tx('BCryptPasswordEncoder: Hash seguro de contraseñas', 'BCryptPasswordEncoder: Secure password hashing'),
                        tx('addFilterBefore: JWT filter antes del auth filter', 'addFilterBefore: JWT filter runs before auth filter')
                    ]
                },
                {
                    topic: tx('JWT Filter Implementation', 'JWT Filter Implementation'),
                    description: tx('Filtro JWT para validar tokens en cada request', 'JWT filter to validate tokens on every request'),
                    code: `@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(7);
        final String userEmail = jwtService.extractUsername(jwt);

        if (userEmail != null && SecurityContextHolder
                .getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService
                .loadUserByUsername(userEmail);
            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(
                    new WebAuthenticationDetailsSource()
                        .buildDetails(request));
                SecurityContextHolder.getContext()
                    .setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}`,
                    points: [
                        tx('OncePerRequestFilter: Se ejecuta una vez por request', 'OncePerRequestFilter: Runs exactly once per request'),
                        tx('Extrae Bearer token del header Authorization', 'Extracts Bearer token from Authorization header'),
                        tx('JwtService: Valida firma, expiración y claims del JWT', 'JwtService: Validates JWT signature, expiry, and claims'),
                        tx('@PreAuthorize("hasRole(\'ADMIN\')"): Seguridad a nivel método', "@PreAuthorize(\"hasRole('ADMIN')\"): Method-level security"),
                        tx('OAuth2: spring-boot-starter-oauth2-client para Google/GitHub', 'OAuth2: spring-boot-starter-oauth2-client for Google/GitHub')
                    ]
                }
            ]
        },
        cloud: {
            id: 'cloud',
            title: tx('Spring Cloud', 'Spring Cloud'),
            subtitle: tx('Microservicios, Config, Eureka, Circuit Breaker', 'Microservices, Config, Eureka, Circuit Breaker'),
            icon: Cloud,
            diagram: <MicroservicesDiagram />,
            content: [
                {
                    topic: tx('Spring Cloud Config & Eureka', 'Spring Cloud Config & Eureka'),
                    description: tx('Config Server centralizado y service discovery con Eureka', 'Centralized Config Server and service discovery with Eureka'),
                    code: `// Config Server
@SpringBootApplication
@EnableConfigServer
public class ConfigServerApp {
    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApp.class, args);
    }
}

// application.yml - Config Server
spring:
  cloud:
    config:
      server:
        git:
          uri: https://github.com/myorg/config-repo
          default-label: main

// Eureka Server
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApp {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApp.class, args);
    }
}

// Eureka Client (en cada microservicio)
@SpringBootApplication
@EnableDiscoveryClient
public class OrderServiceApp {
    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApp.class, args);
    }
}

// application.yml - Eureka Client
spring:
  application:
    name: order-service
eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/`,
                    points: [
                        tx('@EnableConfigServer: Servidor centralizado de configuración', '@EnableConfigServer: Centralized configuration server'),
                        tx('@EnableEurekaServer: Registro de servicios', '@EnableEurekaServer: Service registry'),
                        tx('@EnableDiscoveryClient: Cliente que se registra en Eureka', '@EnableDiscoveryClient: Client that registers with Eureka'),
                        tx('spring.application.name: Identifica el microservicio', 'spring.application.name: Identifies the microservice'),
                        tx('Config externo desde Git: sin redeploy para cambios de config', 'External config from Git: no redeploy for config changes')
                    ]
                },
                {
                    topic: tx('Resilience4j Circuit Breaker & Feign Client', 'Resilience4j Circuit Breaker & Feign Client'),
                    description: tx('Circuit Breaker con Resilience4j y clientes HTTP declarativos con Feign', 'Circuit Breaker with Resilience4j and declarative HTTP clients with Feign'),
                    code: `// Feign Client - cliente HTTP declarativo
@FeignClient(name = "inventory-service", fallback = InventoryFallback.class)
public interface InventoryClient {
    @GetMapping("/api/inventory/{productId}")
    InventoryResponse checkStock(@PathVariable String productId);
}

@Component
class InventoryFallback implements InventoryClient {
    public InventoryResponse checkStock(String productId) {
        return InventoryResponse.unavailable(); // fallback
    }
}

// Circuit Breaker con Resilience4j
@Service
public class OrderService {

    @CircuitBreaker(name = "inventory", fallbackMethod = "fallback")
    @Retry(name = "inventory", fallbackMethod = "fallback")
    @TimeLimiter(name = "inventory")
    public CompletableFuture<String> placeOrder(String productId) {
        return CompletableFuture.supplyAsync(() ->
            inventoryClient.checkStock(productId).toString());
    }

    public CompletableFuture<String> fallback(String id, Throwable t) {
        return CompletableFuture.supplyAsync(() -> "Order queued: " + id);
    }
}

# application.yml - Resilience4j config
resilience4j:
  circuitbreaker:
    instances:
      inventory:
        slidingWindowSize: 10
        failureRateThreshold: 50
        waitDurationInOpenState: 10s`,
                    points: [
                        tx('@FeignClient: Cliente HTTP declarativo, sin boilerplate', '@FeignClient: Declarative HTTP client, no boilerplate'),
                        tx('@CircuitBreaker: Abre el circuito si falla mucho', '@CircuitBreaker: Opens circuit on excessive failures'),
                        tx('@Retry: Reintenta automáticamente con backoff', '@Retry: Automatically retries with backoff'),
                        tx('Spring Cloud Gateway: API Gateway reactivo', 'Spring Cloud Gateway: Reactive API Gateway'),
                        tx('Spring Cloud Sleuth/Zipkin: Trazabilidad distribuida', 'Spring Cloud Sleuth/Zipkin: Distributed tracing')
                    ]
                }
            ]
        }
    };

    const sectionList = Object.values(sections);
    const currentSection = sections[activeSection];
    const SectionIcon = currentSection.icon;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 lg:h-[calc(100vh-200px)]">
            {/* Sidebar */}
            <div className="lg:col-span-1 lg:overflow-y-auto lg:pr-2">
                <h3 className="text-base lg:text-lg font-bold text-green-400 mb-2 lg:mb-4 flex items-center gap-2">
                    <SiSpring className="w-5 h-5 lg:w-6 lg:h-6" />
                    {t('spring', language).title}
                </h3>
                <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-hidden lg:pb-0 lg:space-y-2">
                {sectionList.map((section) => {
                    const Icon = section.icon;
                    return (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`flex-shrink-0 lg:w-full text-left px-3 py-2 lg:px-4 lg:py-3 rounded-lg transition-all flex items-center gap-2 lg:gap-3 ${activeSection === section.id
                                ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                                : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                }`}
                        >
                            <Icon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-sm lg:text-base whitespace-nowrap lg:whitespace-normal">{section.title}</div>
                                <div className="hidden lg:block text-xs opacity-70 line-clamp-1">{section.subtitle}</div>
                            </div>
                        </button>
                    );
                })}
                </div>
            </div>

            {/* Content Panel */}
            <div className="lg:col-span-3 lg:overflow-y-auto lg:pr-2">
                <div className="mb-4 lg:mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <SectionIcon className="w-6 h-6 lg:w-8 lg:h-8 text-green-400" />
                        <h2 className="text-xl lg:text-3xl font-bold text-green-400">{currentSection.title}</h2>
                    </div>
                    <p className="text-slate-400">{currentSection.subtitle}</p>
                </div>

                {/* Section diagram */}
                {currentSection.diagram && (
                    <div className="mb-6">
                        {currentSection.diagram}
                    </div>
                )}

                <div className="space-y-4">
                    {currentSection.content.map((item, idx) => (
                        <div key={idx} className="bg-slate-900/50 border border-green-500/20 rounded-xl overflow-hidden">
                            <button
                                onClick={() => toggleFundamental(`${activeSection}-${idx}`)}
                                className="w-full flex items-center justify-between px-5 py-4 hover:bg-green-500/5 transition-colors text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <Database className="w-5 h-5 text-green-400 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-base font-bold text-green-400">{item.topic}</h3>
                                        <p className="text-slate-400 text-xs">{item.description}</p>
                                    </div>
                                </div>
                                <motion.div
                                    animate={{ rotate: expandedFundamentals[`${activeSection}-${idx}`] ? 180 : 0 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <ChevronDown className="w-5 h-5 text-slate-400" />
                                </motion.div>
                            </button>

                            <AnimatePresence initial={false}>
                                {expandedFundamentals[`${activeSection}-${idx}`] && (
                                    <motion.div
                                        key="content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 pb-5">
                                            {/* Code */}
                                            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 mb-4 overflow-x-auto">
                                                <CodeBlock code={item.code} language="java" />
                                            </div>

                                            {/* Points */}
                                            <ul className="space-y-2">
                                                {item.points.map((point, pIdx) => (
                                                    <li key={pIdx} className="flex items-start gap-2 text-slate-300 text-sm">
                                                        <span className="text-green-400">•</span>
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SpringPro;
