// Design patterns content as plain data (no JSX) so it can be tested with Node.
// Each pattern is told through a client project from the CV: context, problem, what was
// done, payoff, plus a short interview pitch. Java identifiers stay in Spanish in
// both languages, same convention as the SOLID lessons.

export const CATEGORIES = ['creational', 'structural', 'behavioral'];

export function buildPatterns(tx) {
  return [
    {
      id: 'singleton',
      name: 'Singleton',
      category: 'creational',
      summary: tx(
        'Una sola instancia compartida por toda la app. En Java casi nunca lo escribo a mano: Spring ya crea cada @Service y @Component como singleton y me lo inyecta donde lo necesito.',
        'One instance shared across the whole app. In Java I almost never write it by hand: Spring already creates every @Service and @Component as a singleton and injects it wherever I need it.'
      ),
      useWhen: tx(
        'Recursos caros de crear y sin estado por usuario: clientes HTTP, pools de conexiones, configuración, mappers.',
        'Resources that are expensive to create and hold no per-user state: HTTP clients, connection pools, configuration, mappers.'
      ),
      avoidWhen: tx(
        'Si guarda estado que cambia por request o por usuario. Ahí tienes un problema de concurrencia esperando a pasar.',
        'If it holds state that changes per request or per user. That is a concurrency bug waiting to happen.'
      ),
      story: {
        project: 'Lynk',
        client: 'National Commercial Bank',
        years: '2021–2022',
        context: tx(
          'En Lynk, la billetera digital del NCB de Jamaica, teníamos unos 50 microservicios hablando con el core bancario y con Twilio para SMS y verificación.',
          'At Lynk, the digital wallet of Jamaica’s NCB, we had around 50 microservices talking to the core banking system and to Twilio for SMS and verification.'
        ),
        problem: tx(
          'Crear un cliente de Twilio o un cliente HTTP en cada request sale caro: cada uno arma su pool de conexiones y carga credenciales. Con tráfico real se nota en latencia y en memoria.',
          'Creating a Twilio or HTTP client on every request is expensive: each one builds its own connection pool and loads credentials. Under real traffic you feel it in latency and memory.'
        ),
        solution: tx(
          'Expuse esos clientes como @Bean de Spring. Spring los crea una vez al arrancar y los reparte a todos los servicios que los piden. Nada de getInstance() ni campos static.',
          'I exposed those clients as Spring @Beans. Spring creates them once at startup and hands them to every service that asks. No getInstance(), no static fields.'
        ),
        payoff: tx(
          'Una sola configuración y un solo pool. Y en los tests reemplazaba el bean por un mock sin tocar el código de negocio.',
          'One configuration, one pool. And in tests I swapped the bean for a mock without touching business code.'
        ),
      },
      pitch: tx(
        'Uso singletons todo el tiempo, pero a través de Spring: los beans son singleton por defecto. Lo que evito es el singleton clásico con getInstance() y estado mutable, porque esconde dependencias y complica los tests. Si me piden uno sin framework, uso un enum.',
        'I use singletons all the time, but through Spring: beans are singletons by default. What I avoid is the classic getInstance() singleton with mutable state, because it hides dependencies and makes testing painful. If I need one without a framework, I use an enum.'
      ),
      gotcha: tx(
        'Un bean singleton con un campo mutable (un contador, una List) se comparte entre todos los hilos. Es la fuente clásica de bugs raros que solo aparecen en producción.',
        'A singleton bean with a mutable field (a counter, a List) is shared across every thread. It is the classic source of weird bugs that only show up in production.'
      ),
      code: `// Spring maneja el ciclo de vida: un solo bean por contexto
@Configuration
public class TwilioConfig {

    @Bean
    public TwilioRestClient twilioClient(TwilioProperties props) {
        return new TwilioRestClient.Builder(props.accountSid(), props.authToken())
                .build();
    }
}

@Service
public class VerificacionService {

    private final TwilioRestClient twilio; // la misma instancia en toda la app

    public VerificacionService(TwilioRestClient twilio) {
        this.twilio = twilio;
    }
}

// Sin Spring: singleton a mano, thread-safe y sin locks
public enum ConfiguracionGlobal {
    INSTANCIA;

    private final Properties props = cargar();

    public String get(String clave) {
        return props.getProperty(clave);
    }

    private static Properties cargar() {
        return new Properties(); // leer archivo, variables de entorno...
    }
}`,
    },
    {
      id: 'factory',
      name: 'Factory',
      category: 'creational',
      summary: tx(
        'Un solo lugar que decide qué implementación crear según un dato que llega en runtime, para que el resto del código no tenga que saberlo.',
        'A single place that decides which implementation to create based on data that arrives at runtime, so the rest of the code doesn’t have to know.'
      ),
      useWhen: tx(
        'Hay varias implementaciones de lo mismo y la elección depende de un dato: país, estado, tipo de cliente, canal.',
        'There are several implementations of the same thing and the choice depends on data: country, state, customer type, channel.'
      ),
      avoidWhen: tx(
        'Si solo hay una implementación y no se ve una segunda en el horizonte. Un new directo es más honesto.',
        'If there is only one implementation and no second one in sight. A plain new is more honest.'
      ),
      story: {
        project: 'Qorta',
        client: 'SambaSafety',
        years: '2023–2024',
        context: tx(
          'En Qorta integrábamos los registros de manejo (MVR) de distintos estados de EE. UU. Cada estado tiene su propio proveedor, su formato y su forma de autenticarse.',
          'At Qorta we integrated motor vehicle records (MVR) from different US states. Each state has its own provider, format and authentication.'
        ),
        problem: tx(
          'Con tantas jurisdicciones, la tentación es un if/else por estado en cada servicio que consulta. Agregar un estado nuevo se vuelve buscar todos esos if y esperar no olvidar ninguno.',
          'With so many jurisdictions, the temptation is an if/else per state in every service that queries them. Adding a new state turns into hunting down every one of those ifs and hoping you didn’t miss one.'
        ),
        solution: tx(
          'Cada proveedor implementa una interfaz común (ProveedorMvr) y una factory devuelve el correcto según la jurisdicción. Con Spring ni siquiera hace falta el switch: inyectas todas las implementaciones y armas un Map una sola vez.',
          'Each provider implements a common interface (ProveedorMvr) and a factory returns the right one for the jurisdiction. With Spring you don’t even need the switch: inject every implementation and build a Map once.'
        ),
        payoff: tx(
          'Sumar un estado es crear una clase nueva. El resto del sistema ni se entera.',
          'Adding a state means writing one new class. The rest of the system never notices.'
        ),
      },
      pitch: tx(
        'Uso Factory cuando el “qué objeto creo” depende de un dato que llega en runtime. En Qorta la jurisdicción decidía qué proveedor MVR usar; la factory escondía esa decisión y agregar un estado era sumar una clase.',
        'I use Factory when “which object do I create” depends on data that arrives at runtime. At Qorta the jurisdiction decided which MVR provider to use; the factory hid that decision, and adding a state was just one more class.'
      ),
      gotcha: tx(
        'Factory y Strategy se confunden mucho: la factory decide QUÉ objeto usar; la strategy es ese objeto haciendo su trabajo. En la práctica suelen ir juntas.',
        'Factory and Strategy get mixed up a lot: the factory decides WHICH object to use; the strategy is that object doing its job. In practice they usually go together.'
      ),
      code: `public interface ProveedorMvr {
    String jurisdiccion();                     // "TX", "CA", "FL"...
    RegistroConductor consultar(String licencia);
}

@Component
class ProveedorTexas implements ProveedorMvr {
    public String jurisdiccion() { return "TX"; }

    public RegistroConductor consultar(String licencia) {
        return null; // llamada a la API de Texas
    }
}

@Component
public class ProveedorMvrFactory {

    private final Map<String, ProveedorMvr> porEstado;

    // Spring inyecta todas las implementaciones; el índice se arma una vez
    public ProveedorMvrFactory(List<ProveedorMvr> proveedores) {
        this.porEstado = proveedores.stream()
                .collect(Collectors.toMap(ProveedorMvr::jurisdiccion, p -> p));
    }

    public ProveedorMvr para(String estado) {
        ProveedorMvr proveedor = porEstado.get(estado);
        if (proveedor == null) {
            throw new IllegalArgumentException("Sin proveedor MVR para " + estado);
        }
        return proveedor;
    }
}`,
    },
    {
      id: 'builder',
      name: 'Builder',
      category: 'creational',
      summary: tx(
        'Armar un objeto con muchos campos paso a paso y con nombres claros, en vez de un constructor de diez parámetros donde nadie sabe cuál es cuál.',
        'Build an object with many fields step by step, with clear names, instead of a ten-parameter constructor where nobody knows which is which.'
      ),
      useWhen: tx(
        'Más de 4 o 5 campos, varios opcionales o del mismo tipo. También para armar datos de prueba en los tests.',
        'More than 4 or 5 fields, several optional or of the same type. Also for building test data.'
      ),
      avoidWhen: tx(
        'Objetos de 2 o 3 campos: un record o un constructor es más directo.',
        'Objects with 2 or 3 fields: a record or a constructor is more direct.'
      ),
      story: {
        project: 'Lynk',
        client: 'National Commercial Bank',
        years: '2021–2022',
        context: tx(
          'En Lynk varios servicios armaban requests para el core bancario: transferencias, pagos de servicios, recargas. Cada uno con campos obligatorios y un montón de opcionales.',
          'At Lynk several services built requests for the core banking system: transfers, bill payments, top-ups. Each one with required fields and a pile of optional ones.'
        ),
        problem: tx(
          'Un constructor con diez parámetros, varios del mismo tipo (String, String, BigDecimal...), es la receta perfecta para cruzar la cuenta origen con la destino sin que el compilador diga nada.',
          'A ten-parameter constructor, with several of the same type (String, String, BigDecimal...), is the perfect recipe for swapping source and destination accounts without the compiler noticing.'
        ),
        solution: tx(
          'Usamos builders, casi siempre con @Builder de Lombok, y objetos inmutables (@Value). Cada valor va con su nombre al lado.',
          'We used builders, mostly with Lombok’s @Builder, and immutable objects (@Value). Every value sits next to its name.'
        ),
        payoff: tx(
          'El código se lee como una frase y ese tipo de error deja de ser posible. Además, en los tests armar un request de prueba es una línea.',
          'The code reads like a sentence and that kind of mistake simply can’t happen. Plus, building a test request is a one-liner.'
        ),
      },
      pitch: tx(
        'Uso Builder para objetos con muchos campos, sobre todo opcionales. En banca un request al core tiene fácil diez campos; con builder el código dice qué es cada valor y el objeto queda inmutable.',
        'I use Builder for objects with many fields, especially optional ones. In banking a request to the core easily has ten fields; with a builder the code says what each value is and the object stays immutable.'
      ),
      gotcha: tx(
        'Un builder no valida nada por sí solo. Si un campo es obligatorio, valídalo en build() o con Bean Validation; si no, puedes construir objetos a medias.',
        'A builder validates nothing on its own. If a field is required, check it in build() or with Bean Validation; otherwise you can build half-empty objects.'
      ),
      code: `// Con Lombok, @Builder genera el builder por ti
@Value
@Builder
public class SolicitudTransferencia {
    String cuentaOrigen;
    String cuentaDestino;
    BigDecimal monto;
    String moneda;
    String referencia;   // opcional
    String canal;        // opcional: APP, WEB, ATM
}

SolicitudTransferencia solicitud = SolicitudTransferencia.builder()
        .cuentaOrigen("001-123456")
        .cuentaDestino("001-987654")
        .monto(new BigDecimal("150.00"))
        .moneda("JMD")
        .canal("APP")
        .build();

// También lo usas sin darte cuenta en las APIs de Spring
WebClient coreBancario = WebClient.builder()
        .baseUrl("https://core.banco.local")
        .defaultHeader("X-Canal", "APP")
        .build();`,
    },
    {
      id: 'adapter',
      name: 'Adapter',
      category: 'structural',
      summary: tx(
        'Un traductor entre lo que tu código espera y lo que el otro sistema realmente ofrece. Tu dominio habla su idioma; el adapter se encarga de la parte fea.',
        'A translator between what your code expects and what the other system actually offers. Your domain speaks its own language; the adapter handles the ugly part.'
      ),
      useWhen: tx(
        'Integrar sistemas legacy, proveedores externos o librerías cuya API no quieres que contamine tu dominio.',
        'Integrating legacy systems, external providers or libraries whose API you don’t want leaking into your domain.'
      ),
      avoidWhen: tx(
        'Si la API externa ya calza con lo que necesitas, un adapter que solo reenvía es ruido.',
        'If the external API already fits what you need, an adapter that just forwards calls is noise.'
      ),
      story: {
        project: tx('Pagos QR', 'QR Payments'),
        client: tx('Scotiabank Perú', 'Scotiabank Peru'),
        years: '2026',
        context: tx(
          'En la plataforma de pagos QR de Scotiabank, parte de la información vive en un mainframe IBM AS/400 al que se llega por DataQueues: mensajes de texto de ancho fijo, con cada campo en una posición.',
          'On Scotiabank’s QR payments platform, part of the data lives on an IBM AS/400 mainframe reached through DataQueues: fixed-width text messages where each field sits at a position.'
        ),
        problem: tx(
          'Si ese formato se filtra al servicio de pagos, cada desarrollador termina haciendo substring(20, 60) en lugares distintos, y el día que cambia el layout se rompe medio sistema.',
          'If that format leaks into the payments service, every developer ends up doing substring(20, 60) in different places, and the day the layout changes half the system breaks.'
        ),
        solution: tx(
          'Un puerto en el dominio (una interfaz con métodos de negocio, como consultar una cuenta) y un adapter que arma la trama, la manda por la DataQueue y parsea la respuesta. Es la misma idea de arquitectura hexagonal que ya había aplicado en Lynk y en Qorta.',
          'A port in the domain (an interface with business methods, like looking up an account) and an adapter that builds the message, sends it through the DataQueue and parses the reply. It’s the same hexagonal-architecture idea I had already applied at Lynk and Qorta.'
        ),
        payoff: tx(
          'El dominio no sabe que existe un AS/400. En los tests uso un adapter falso, y si mañana el banco expone ese dato por REST, cambio el adapter y nada más.',
          'The domain doesn’t know an AS/400 exists. In tests I use a fake adapter, and if tomorrow the bank exposes that data over REST, I swap the adapter and nothing else.'
        ),
      },
      pitch: tx(
        'Adapter es el patrón que más uso sin nombrarlo, porque es la base de la arquitectura hexagonal. En Scotiabank el adapter convertía llamadas de negocio en tramas para el AS/400; el dominio nunca vio una DataQueue.',
        'Adapter is the pattern I use most without naming it, because it’s the foundation of hexagonal architecture. At Scotiabank the adapter turned business calls into AS/400 messages; the domain never saw a DataQueue.'
      ),
      gotcha: tx(
        'No confundir con Facade: el adapter cambia la forma de UNA interfaz para que calce; la facade simplifica VARIAS detrás de una sola.',
        'Don’t confuse it with Facade: the adapter reshapes ONE interface so it fits; the facade simplifies SEVERAL behind a single one.'
      ),
      code: `// Puerto: lo que el dominio necesita, en su idioma
public interface CuentaPort {
    Cuenta consultar(String numeroCuenta);
}

// Adapter: traduce al formato del AS/400 (trama de ancho fijo por DataQueue)
@Component
public class CuentaAs400Adapter implements CuentaPort {

    private final DataQueueClient dataQueue;

    public CuentaAs400Adapter(DataQueueClient dataQueue) {
        this.dataQueue = dataQueue;
    }

    @Override
    public Cuenta consultar(String numeroCuenta) {
        String trama = "CONSCTA" + String.format("%-20s", numeroCuenta);
        String respuesta = dataQueue.enviarYEsperar(trama);

        return new Cuenta(
                respuesta.substring(0, 20).trim(),                // número
                respuesta.substring(20, 60).trim(),               // titular
                new BigDecimal(respuesta.substring(60, 75).trim()) // saldo
        );
    }
}`,
    },
    {
      id: 'facade',
      name: 'Facade',
      category: 'structural',
      summary: tx(
        'Una puerta de entrada simple a un proceso que por dentro toca varios sistemas. Quien la usa llama un método y no se entera del resto.',
        'A simple front door to a process that touches several systems underneath. Whoever uses it calls one method and never sees the rest.'
      ),
      useWhen: tx(
        'Un flujo de negocio que coordina varios servicios o integraciones y se llama desde más de un lugar.',
        'A business flow that coordinates several services or integrations and is called from more than one place.'
      ),
      avoidWhen: tx(
        'Cuando la fachada empieza a acumular la lógica de todo el módulo: ahí se vuelve un God Object. Que coordine, no que decida todo.',
        'When the facade starts piling up the whole module’s logic: that’s how it becomes a God Object. It should coordinate, not decide everything.'
      ),
      story: {
        project: tx('Tracking de incidentes', 'Incident tracking'),
        client: 'Intercorp Retail',
        years: '2019–2020',
        context: tx(
          'En Intercorp diseñé la plataforma que registra las quejas de clientes de todas las empresas del grupo, cada una con su propio stack.',
          'At Intercorp I designed the platform that records customer complaints for every company in the group, each with its own tech stack.'
        ),
        problem: tx(
          'Registrar una queja no es un INSERT: hay que subir la evidencia a Google Cloud Storage, guardar el caso en PostgreSQL y avisar por correo (AWS SES) al cliente y al gestor. Si cada controlador orquesta eso a su manera, el flujo termina distinto en cada lugar.',
          'Recording a complaint isn’t an INSERT: you upload the evidence to Google Cloud Storage, save the case in PostgreSQL and email (AWS SES) both the customer and the manager. If every controller orchestrates that its own way, the flow ends up different everywhere.'
        ),
        solution: tx(
          'Un servicio fachada con un método registrarQueja() que coordina los tres pasos en orden. Los controladores y los demás servicios solo conocen ese método.',
          'A facade service with a registrarQueja() method that runs the three steps in order. Controllers and other services only know that method.'
        ),
        payoff: tx(
          'Un solo lugar para cambiar el flujo y para manejar errores. Si mañana se suma un paso, como una notificación push, se toca la fachada y nada más.',
          'One place to change the flow and to handle errors. If a step is added tomorrow, like a push notification, you touch the facade and nothing else.'
        ),
      },
      pitch: tx(
        'Uso Facade para procesos que tocan varios sistemas. En Intercorp, registrar una queja implicaba storage, base de datos y correo; la fachada dejaba todo eso detrás de un solo método.',
        'I use Facade for processes that touch several systems. At Intercorp, recording a complaint meant storage, database and email; the facade put all of that behind a single method.'
      ),
      gotcha: tx(
        'Ojo con la consistencia: si el correo falla después del save, ¿la queja queda guardada o se revierte? Decídelo explícitamente (reintento, patrón outbox o aceptar el fallo y avisar).',
        'Watch consistency: if the email fails after the save, does the complaint stay or roll back? Decide it explicitly (retry, outbox pattern, or accept the failure and flag it).'
      ),
      code: `@Service
public class QuejaFacade {

    private final EvidenciaStorage storage;   // Google Cloud Storage
    private final QuejaRepository quejas;     // PostgreSQL
    private final NotificadorCorreo correo;   // AWS SES

    public QuejaFacade(EvidenciaStorage storage, QuejaRepository quejas, NotificadorCorreo correo) {
        this.storage = storage;
        this.quejas = quejas;
        this.correo = correo;
    }

    // Un método para quien llama; tres sistemas por dentro
    public Queja registrarQueja(NuevaQueja datos, List<MultipartFile> evidencias) {
        List<String> urls = evidencias.stream().map(storage::subir).toList();

        Queja queja = quejas.save(Queja.nueva(datos, urls));

        correo.avisarCliente(queja);
        correo.avisarGestor(queja);
        return queja;
    }
}`,
    },
    {
      id: 'proxy',
      name: 'Proxy',
      category: 'structural',
      summary: tx(
        'Un intermediario con la misma interfaz que el objeto real, que hace algo antes o después de delegar: revisar permisos, cachear, abrir una transacción. Spring lo usa por todos lados.',
        'A middleman with the same interface as the real object that does something before or after delegating: check permissions, cache, open a transaction. Spring uses it everywhere.'
      ),
      useWhen: tx(
        'Controlar el acceso a un objeto: caché, permisos, carga diferida, logging, transacciones.',
        'Controlling access to an object: caching, permissions, lazy loading, logging, transactions.'
      ),
      avoidWhen: tx(
        'Si quieres apilar varias capas combinables a gusto, eso se parece más a Decorator.',
        'If you want to stack several mix-and-match layers, that’s closer to Decorator.'
      ),
      story: {
        project: 'Tío Grou',
        client: 'Banco de Crédito del Perú (BCP)',
        years: '2020',
        context: tx(
          'Tío Grou era una PWA para pequeños negocios con punto de venta, reportes y métricas de ventas, sobre una base SQL Server que yo había normalizado.',
          'Tío Grou was a PWA for small businesses with point of sale, reports and sales metrics, on a SQL Server database I had normalized.'
        ),
        problem: tx(
          'Las consultas de reportes son pesadas y se repiten: el mismo dueño abre el mismo resumen del día varias veces.',
          'Report queries are heavy and repetitive: the same owner opens the same daily summary several times.'
        ),
        solution: tx(
          'Con @Cacheable sobre el servicio, Spring envuelve el bean en un proxy: si el resultado ya está en Redis, responde sin ejecutar el método real. Es el mismo mecanismo que hace funcionar @Transactional y @PreAuthorize.',
          'With @Cacheable on the service, Spring wraps the bean in a proxy: if the result is already in Redis, it answers without running the real method. It’s the same mechanism that makes @Transactional and @PreAuthorize work.'
        ),
        payoff: tx(
          'Menos carga sobre la base y cero cambios en la lógica del reporte. La misma idea existe a nivel de red: en Scotiabank, Apigee se pone delante de los servicios como proxy de API.',
          'Less load on the database and zero changes to the report logic. The same idea exists at the network level: at Scotiabank, Apigee sits in front of the services as an API proxy.'
        ),
      },
      pitch: tx(
        'Proxy es cómo funciona medio Spring: @Transactional, @Cacheable y @PreAuthorize son proxies alrededor de tus beans. En Tío Grou lo usamos para cachear reportes en Redis sin tocar la lógica.',
        'Proxy is how half of Spring works: @Transactional, @Cacheable and @PreAuthorize are proxies around your beans. At Tío Grou we used it to cache reports in Redis without touching the logic.'
      ),
      gotcha: tx(
        'La pregunta trampa típica: si llamas a un método @Transactional o @Cacheable desde la misma clase (this.metodo()), no pasas por el proxy y la anotación no hace nada.',
        'The classic trick question: if you call a @Transactional or @Cacheable method from inside the same class (this.method()), you skip the proxy and the annotation does nothing.'
      ),
      code: `@Service
public class ReporteVentasService {

    private final VentasRepository ventasRepository;

    public ReporteVentasService(VentasRepository ventasRepository) {
        this.ventasRepository = ventasRepository;
    }

    // Spring envuelve este bean en un proxy:
    // si la clave ya está en Redis, el método ni se ejecuta
    @Cacheable(value = "resumenDiario", key = "#negocioId + ':' + #fecha")
    public ResumenVentas resumenDelDia(Long negocioId, LocalDate fecha) {
        return ventasRepository.resumir(negocioId, fecha); // consulta pesada
    }
}

// Lo que el proxy hace por ti, escrito a mano
public class ReporteVentasCacheProxy {

    private final ReporteVentasService real;
    private final Cache cache;

    public ReporteVentasCacheProxy(ReporteVentasService real, Cache cache) {
        this.real = real;
        this.cache = cache;
    }

    public ResumenVentas resumenDelDia(Long negocioId, LocalDate fecha) {
        String clave = negocioId + ":" + fecha;
        ResumenVentas enCache = cache.get(clave, ResumenVentas.class);
        if (enCache != null) return enCache;

        ResumenVentas resultado = real.resumenDelDia(negocioId, fecha);
        cache.put(clave, resultado);
        return resultado;
    }
}`,
    },
    {
      id: 'decorator',
      name: 'Decorator',
      category: 'structural',
      summary: tx(
        'Envolver un objeto con otro que tiene la misma interfaz para sumarle comportamiento (reintentos, métricas, logs) sin tocar la clase original. Puedes apilar varios.',
        'Wrap an object in another one with the same interface to add behavior (retries, metrics, logs) without touching the original class. You can stack several.'
      ),
      useWhen: tx(
        'Comportamientos transversales y combinables: reintentos, caché, métricas, logging, compresión.',
        'Cross-cutting, combinable behavior: retries, caching, metrics, logging, compression.'
      ),
      avoidWhen: tx(
        'Si la capa extra aplica igual a todos los beans, un aspecto de Spring (AOP) o un filtro suele ser más simple.',
        'If the extra layer applies the same way to every bean, a Spring aspect (AOP) or a filter is usually simpler.'
      ),
      story: {
        project: 'AgentCloud',
        client: 'HealthCare',
        years: '2025–2026',
        context: tx(
          'En AgentCloud, la plataforma de una aseguradora de salud de EE. UU., las autorizaciones de atención disparaban notificaciones a asegurados y clínicas.',
          'At AgentCloud, the platform for a US health insurer, care authorizations triggered notifications to members and clinics.'
        ),
        problem: tx(
          'Enviar en sí es simple. Lo que ensucia es todo lo que se acumula alrededor: reintentar si el proveedor falla, medir tiempos, dejar rastro para auditoría. Meterlo todo en el mismo método lo vuelve difícil de leer y de testear.',
          'Sending itself is simple. What gets messy is everything that piles up around it: retrying when the provider fails, measuring latency, leaving an audit trail. Cramming it all into one method makes it hard to read and test.'
        ),
        solution: tx(
          'Una interfaz Notificador, una implementación que solo envía y decoradores que la envuelven: uno para reintentos, otro para métricas. Se arman en la configuración en el orden que haga falta.',
          'A Notificador interface, one implementation that only sends, and decorators that wrap it: one for retries, one for metrics. They’re wired in configuration in whatever order you need.'
        ),
        payoff: tx(
          'Cada pieza hace una sola cosa y se testea sola. ¿Un canal no necesita reintentos? Simplemente no lo envuelves.',
          'Each piece does one thing and is tested on its own. A channel doesn’t need retries? Just don’t wrap it.'
        ),
      },
      pitch: tx(
        'Decorator es sumar comportamiento envolviendo, no heredando. En AgentCloud el envío de notificaciones quedaba limpio, y los reintentos y las métricas eran capas aparte que se apilaban en la configuración.',
        'Decorator means adding behavior by wrapping, not inheriting. At AgentCloud the notification sender stayed clean, and retries and metrics were separate layers stacked in configuration.'
      ),
      gotcha: tx(
        'El orden importa: métricas por fuera de reintentos mide el tiempo total incluyendo reintentos; por dentro mide cada intento. Y la diferencia con Proxy: el proxy controla el acceso a un objeto; el decorator le suma funciones y lo eliges tú al armarlo.',
        'Order matters: metrics outside retries measures total time including retries; inside, it measures each attempt. And the difference with Proxy: a proxy controls access to an object; a decorator adds features, and you choose them when wiring it up.'
      ),
      code: `public interface Notificador {
    void enviar(Notificacion n);
}

// La implementación base solo envía
class NotificadorEmail implements Notificador {
    public void enviar(Notificacion n) {
        // llamada al proveedor de correo
    }
}

// Decorador: misma interfaz, agrega reintentos y delega
class ConReintentos implements Notificador {
    private final Notificador interno;
    private final int maxIntentos;

    ConReintentos(Notificador interno, int maxIntentos) {
        this.interno = interno;
        this.maxIntentos = maxIntentos;
    }

    public void enviar(Notificacion n) {
        for (int intento = 1; ; intento++) {
            try {
                interno.enviar(n);
                return;
            } catch (RuntimeException e) {
                if (intento == maxIntentos) throw e;
            }
        }
    }
}

// Decorador: mide cuánto tarda cada envío
class ConMetricas implements Notificador {
    private final Notificador interno;
    private final Timer timer;

    ConMetricas(Notificador interno, Timer timer) {
        this.interno = interno;
        this.timer = timer;
    }

    public void enviar(Notificacion n) {
        timer.record(() -> interno.enviar(n));
    }
}

// Armado: métricas → reintentos → envío real
@Bean
Notificador notificador(MeterRegistry registry) {
    return new ConMetricas(
            new ConReintentos(new NotificadorEmail(), 3),
            registry.timer("notificaciones.envio"));
}`,
    },
    {
      id: 'strategy',
      name: 'Strategy',
      category: 'behavioral',
      summary: tx(
        'Varias formas de hacer lo mismo, cada una en su propia clase, y eliges cuál usar en runtime. Cambia el cómo, no el qué.',
        'Several ways of doing the same thing, each in its own class, and you pick one at runtime. The how changes, not the what.'
      ),
      useWhen: tx(
        'Un mismo paso con variantes por tipo, canal o cliente: cálculo de comisiones, generación de documentos, validaciones.',
        'The same step with variants per type, channel or customer: fee calculation, document generation, validations.'
      ),
      avoidWhen: tx(
        'Dos ramas que no van a crecer. Un if bien nombrado se lee mejor que tres clases.',
        'Two branches that won’t grow. A well-named if reads better than three classes.'
      ),
      story: {
        project: tx('Pagos QR', 'QR Payments'),
        client: tx('Scotiabank Perú', 'Scotiabank Peru'),
        years: '2026',
        context: tx(
          'En la plataforma de pagos de Scotiabank generamos dos tipos de QR: el estático, que el comercio imprime una vez y el cliente digita el monto, y el dinámico, que se genera por operación con monto y vencimiento.',
          'On Scotiabank’s payments platform we generate two kinds of QR: the static one, which the merchant prints once and the customer types the amount, and the dynamic one, generated per transaction with an amount and an expiry.'
        ),
        problem: tx(
          'Las reglas son distintas: el dinámico lleva monto, vencimiento e identificador único; el estático no. Un solo método lleno de if (tipo == DINAMICO) crece mal, y cualquier cambio en uno arriesga romper el otro.',
          'The rules differ: the dynamic one carries an amount, expiry and unique id; the static one doesn’t. A single method full of if (type == DYNAMIC) grows badly, and any change to one risks breaking the other.'
        ),
        solution: tx(
          'Una interfaz GeneradorQr con una implementación por tipo. El servicio lee el tipo del request, toma la estrategia que corresponde y la ejecuta. Como el servicio es WebFlux, cada estrategia devuelve un Mono.',
          'A GeneradorQr interface with one implementation per type. The service reads the type from the request, picks the matching strategy and runs it. Since the service is WebFlux, each strategy returns a Mono.'
        ),
        payoff: tx(
          'Cada tipo de QR se prueba por separado, y un tercer tipo sería una clase nueva, no otro if.',
          'Each QR type is tested separately, and a third type would be a new class, not another if.'
        ),
      },
      pitch: tx(
        'Strategy es mi reemplazo para los if/else por tipo. En Scotiabank, el QR estático y el dinámico tienen reglas distintas; cada uno es una estrategia y el servicio solo elige cuál ejecutar según el request.',
        'Strategy is my replacement for if/else by type. At Scotiabank, static and dynamic QR codes have different rules; each one is a strategy and the service just picks which to run based on the request.'
      ),
      gotcha: tx(
        'Es Open/Closed en la práctica: agregas comportamiento con clases nuevas sin editar las existentes. Si la conversación va hacia SOLID, este es el ejemplo para conectarlo.',
        'It’s Open/Closed in practice: you add behavior with new classes without editing existing ones. If the conversation drifts to SOLID, this is the example that ties it together.'
      ),
      code: `public interface GeneradorQr {
    TipoQr tipo();
    Mono<CodigoQr> generar(SolicitudQr solicitud);
}

@Component
class GeneradorQrEstatico implements GeneradorQr {
    public TipoQr tipo() { return TipoQr.ESTATICO; }

    public Mono<CodigoQr> generar(SolicitudQr s) {
        // Solo identifica al comercio; el cliente ingresa el monto al pagar
        return Mono.just(CodigoQr.estatico(s.comercioId()));
    }
}

@Component
class GeneradorQrDinamico implements GeneradorQr {
    public TipoQr tipo() { return TipoQr.DINAMICO; }

    public Mono<CodigoQr> generar(SolicitudQr s) {
        // Monto, vencimiento e id único por operación
        Instant vence = Instant.now().plus(s.vigencia());
        return Mono.just(CodigoQr.dinamico(s.comercioId(), s.monto(), vence, UUID.randomUUID()));
    }
}

@Service
public class QrService {

    private final Map<TipoQr, GeneradorQr> generadores;

    public QrService(List<GeneradorQr> lista) {
        this.generadores = lista.stream()
                .collect(Collectors.toMap(GeneradorQr::tipo, g -> g));
    }

    public Mono<CodigoQr> generar(SolicitudQr solicitud) {
        return generadores.get(solicitud.tipo()).generar(solicitud);
    }
}`,
    },
    {
      id: 'observer',
      name: 'Observer',
      category: 'behavioral',
      summary: tx(
        'Cuando algo pasa, avisas a quien le interese sin saber quiénes son. El que emite no depende de los que escuchan.',
        'When something happens, you tell whoever cares without knowing who they are. The emitter doesn’t depend on the listeners.'
      ),
      useWhen: tx(
        'Un hecho de negocio que varios módulos necesitan conocer y que no debe bloquear al que lo emite.',
        'A business fact that several modules need to know about and that shouldn’t block whoever emits it.'
      ),
      avoidWhen: tx(
        'Si necesitas la respuesta para seguir (por ejemplo, validar saldo antes de pagar), eso es una llamada directa, no un evento.',
        'If you need the answer to continue (say, checking the balance before paying), that’s a direct call, not an event.'
      ),
      story: {
        project: 'AgentCloud',
        client: 'HealthCare',
        years: '2025–2026',
        context: tx(
          'En AgentCloud, cuando se aprobaba una autorización de atención pasaban varias cosas: notificar al asegurado, avisar a la clínica y disparar la facturación del proveedor.',
          'At AgentCloud, when a care authorization was approved several things had to happen: notify the member, tell the clinic and trigger provider billing.'
        ),
        problem: tx(
          'Si el servicio de autorizaciones llama a cada uno directamente, queda acoplado a todos. Y si facturación está caída, ¿falla la aprobación? No debería.',
          'If the authorization service calls each one directly, it’s coupled to all of them. And if billing is down, should the approval fail? It shouldn’t.'
        ),
        solution: tx(
          'El servicio publica un evento AutorizacionAprobada en Kafka y sigue con lo suyo. Notificaciones y facturación son consumidores independientes, cada uno con su consumer group, que reaccionan a su ritmo.',
          'The service publishes an AutorizacionAprobada event to Kafka and moves on. Notifications and billing are independent consumers, each with its own consumer group, reacting at their own pace.'
        ),
        payoff: tx(
          'Sumar un interesado nuevo, como reportería, es crear otro consumidor sin tocar autorizaciones. Y si un consumidor se cae, procesa lo pendiente cuando vuelve.',
          'Adding a new listener, like reporting, means creating another consumer without touching authorizations. And if a consumer goes down, it catches up when it’s back.'
        ),
      },
      pitch: tx(
        'El Observer clásico vive en memoria; en microservicios lo llevo a eventos con Kafka. En AgentCloud una autorización aprobada era un evento, y notificaciones y facturación lo escuchaban por separado.',
        'The classic Observer lives in memory; in microservices I take it to events with Kafka. At AgentCloud an approved authorization was an event, and notifications and billing listened to it separately.'
      ),
      gotcha: tx(
        'Dentro de un solo servicio, Spring trae ApplicationEventPublisher y @EventListener: el mismo patrón sin Kafka. Si el evento solo debe salir cuando la transacción hace commit, usa @TransactionalEventListener.',
        'Inside a single service, Spring ships ApplicationEventPublisher and @EventListener: the same pattern without Kafka. If the event must only fire once the transaction commits, use @TransactionalEventListener.'
      ),
      code: `// Quien emite: no sabe quién escucha
@Service
public class AutorizacionService {

    private final KafkaTemplate<String, AutorizacionAprobada> kafka;

    public AutorizacionService(KafkaTemplate<String, AutorizacionAprobada> kafka) {
        this.kafka = kafka;
    }

    public void aprobar(Autorizacion autorizacion) {
        autorizacion.aprobar();
        kafka.send("autorizaciones.aprobadas", autorizacion.id(),
                AutorizacionAprobada.de(autorizacion));
    }
}

// Observadores: cada uno con su propio consumer group
@Component
class NotificacionesListener {

    @KafkaListener(topics = "autorizaciones.aprobadas", groupId = "notificaciones")
    void alAprobar(AutorizacionAprobada evento) {
        // push al asegurado y aviso a la clínica
    }
}

@Component
class FacturacionListener {

    @KafkaListener(topics = "autorizaciones.aprobadas", groupId = "facturacion")
    void alAprobar(AutorizacionAprobada evento) {
        // dispara la facturación del proveedor
    }
}`,
    },
    {
      id: 'command',
      name: 'Command',
      category: 'behavioral',
      summary: tx(
        'Convertir una acción en un objeto: qué hay que hacer y con qué datos. Como es un objeto, puedes encolarlo, reintentarlo, guardarlo para auditoría o deshacerlo.',
        'Turn an action into an object: what needs to be done and with which data. Since it’s an object, you can queue it, retry it, store it for auditing or undo it.'
      ),
      useWhen: tx(
        'Trabajo asíncrono o diferido, colas de tareas, auditoría de acciones, deshacer/rehacer en una UI.',
        'Async or deferred work, task queues, action auditing, undo/redo in a UI.'
      ),
      avoidWhen: tx(
        'Operaciones simples y síncronas donde nadie necesita encolar, reintentar ni auditar.',
        'Simple synchronous operations where nobody needs to queue, retry or audit.'
      ),
      story: {
        project: 'AgentCloud',
        client: 'HealthCare',
        years: '2025–2026',
        context: tx(
          'En AgentCloud había trabajo que no cabía dentro de un request: procesar los documentos que subían las clínicas y tareas programadas. Eso corría en AWS Lambda leyendo de colas SQS.',
          'At AgentCloud some work didn’t fit inside a request: processing documents uploaded by clinics and scheduled jobs. That ran on AWS Lambda reading from SQS queues.'
        ),
        problem: tx(
          'Si el request espera a que termine el procesamiento, el usuario se queda mirando un spinner, y cualquier timeout pierde el trabajo.',
          'If the request waits for processing to finish, the user stares at a spinner, and any timeout loses the work.'
        ),
        solution: tx(
          'El backend arma un comando (ProcesarDocumento, con el id y la ubicación en S3) y lo deja en SQS. El worker lo toma y lo ejecuta; si falla, SQS lo reintenta, y tras varios intentos va a una dead-letter queue para revisarlo.',
          'The backend builds a command (ProcesarDocumento, with the id and the S3 location) and drops it on SQS. The worker picks it up and runs it; if it fails, SQS retries it, and after several attempts it lands in a dead-letter queue for review.'
        ),
        payoff: tx(
          'El request responde al instante, nada se pierde y cada comando queda registrado: sabes exactamente qué se pidió, quién y cuándo. Como el comando es solo JSON, el worker puede estar en otro lenguaje; los nuestros eran Lambdas en Python.',
          'The request answers right away, nothing gets lost, and every command is on record: you know exactly what was asked, by whom and when. Since the command is just JSON, the worker can be in another language; ours were Python Lambdas.'
        ),
      },
      pitch: tx(
        'Command es tratar una acción como dato. En AgentCloud el procesamiento de documentos se pedía como un comando en SQS: el request respondía al toque y el worker lo ejecutaba con reintentos y DLQ.',
        'Command means treating an action as data. At AgentCloud document processing was requested as a command on SQS: the request answered immediately and the worker ran it with retries and a DLQ.'
      ),
      gotcha: tx(
        'SQS estándar puede entregar el mismo mensaje dos veces, así que el handler tiene que ser idempotente: procesar el mismo comando dos veces no puede duplicar el resultado.',
        'Standard SQS can deliver the same message twice, so the handler must be idempotent: processing the same command twice can’t duplicate the result.'
      ),
      code: `// El comando: qué hacer + los datos para hacerlo. Viaja como JSON.
public record ProcesarDocumento(String documentoId, String bucket, String clave, String solicitadoPor) {}

// Quien invoca: no ejecuta, solo encola
@Service
public class DocumentoService {

    private final SqsTemplate sqs;

    public DocumentoService(SqsTemplate sqs) {
        this.sqs = sqs;
    }

    public void solicitarProcesamiento(Documento doc, String usuario) {
        sqs.send("procesar-documentos",
                new ProcesarDocumento(doc.id(), doc.bucket(), doc.clave(), usuario));
    }
}

// Quien ejecuta: puede ser otro servicio, otra máquina u otro lenguaje
@Component
class ProcesarDocumentoHandler {

    @SqsListener("procesar-documentos")
    void ejecutar(ProcesarDocumento comando) {
        // descargar de S3, extraer datos, guardar resultado
        // si lanza excepción, SQS reintenta y luego lo manda a la DLQ
    }
}`,
    },
  ];
}
