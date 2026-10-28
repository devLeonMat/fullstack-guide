// Architecture styles as plain data (no JSX) so they can be tested with Node.
// Same shape as the design patterns: each style is told through a client project
// from the CV, with an interview pitch and a "watch out" note. Java identifiers
// stay in Spanish in both languages.

export function buildArchitectures(tx) {
  return [
    {
      id: 'mvc',
      name: 'MVC',
      fullName: 'Model-View-Controller',
      color: 'blue',
      lang: 'java',
      summary: tx(
        'Separar lo que se muestra (vista), lo que decide (modelo) y lo que conecta ambos (controlador). El controlador recibe la petición, le pide al modelo que haga el trabajo y elige qué vista devolver.',
        'Split what gets shown (view), what decides (model) and what connects them (controller). The controller takes the request, asks the model to do the work and picks which view to return.'
      ),
      useWhen: tx(
        'Aplicaciones web con pantallas renderizadas en servidor, o cualquier API donde quieras que el controlador sea delgado y la lógica viva en otro lado.',
        'Server-rendered web apps, or any API where you want thin controllers and the logic living somewhere else.'
      ),
      avoidWhen: tx(
        'Como única arquitectura de un sistema grande: MVC organiza la capa web, no dice nada de cómo separar dominios ni integraciones.',
        'As the only architecture for a big system: MVC organizes the web layer, it says nothing about splitting domains or integrations.'
      ),
      story: {
        project: 'ERP Olva Corp',
        client: 'Olva Courier',
        years: '2015–2018',
        context: tx(
          'En Olva Courier trabajé tres años en el ERP corporativo, hecho en Java con PrimeFaces (JSF). Las pantallas xhtml eran la vista, los managed beans hacían de controlador y los servicios con sus entidades eran el modelo.',
          'At Olva Courier I spent three years on the corporate ERP, built in Java with PrimeFaces (JSF). The xhtml pages were the view, managed beans acted as controllers, and services with their entities were the model.'
        ),
        problem: tx(
          'Con JSF es muy fácil meter reglas de negocio en el managed bean, porque está ahí, pegado a la pantalla. El problema llega cuando esa misma regla la necesita otra pantalla o un sistema externo.',
          'With JSF it’s very easy to put business rules in the managed bean, because it’s right there next to the page. The trouble comes when another page or an external system needs that same rule.'
        ),
        solution: tx(
          'Mantuve los beans delgados: reciben datos, llaman al servicio y deciden a qué pantalla ir. Las reglas quedaban en los servicios.',
          'I kept the beans thin: they take the data, call the service and decide which page comes next. The rules stayed in the services.'
        ),
        payoff: tx(
          'Cuando tocó exponer el ERP por SOAP y REST a socios logísticos, y migrar funciones de sistemas antiguos, reutilizamos los mismos servicios. Solo cambiaba el “controlador”.',
          'When we had to expose the ERP over SOAP and REST to logistics partners, and migrate features from old systems, we reused the same services. Only the “controller” changed.'
        ),
      },
      pitch: tx(
        'MVC es separar pantalla, control y lógica. Lo aprendí de verdad en el ERP de Olva con JSF: si la regla vive en el modelo y no en el controlador, la reutilizas en una pantalla, en un servicio SOAP o en una API REST sin copiarla.',
        'MVC is separating the screen, the control and the logic. I really learned it on Olva’s ERP with JSF: if the rule lives in the model and not in the controller, you reuse it from a page, a SOAP service or a REST API without copying it.'
      ),
      gotcha: tx(
        'En una API REST con Spring sigue siendo MVC (Spring MVC), solo que la “vista” es el JSON que devuelves. Y el error típico es el controlador gordo: si tiene ifs de negocio, está haciendo trabajo del modelo.',
        'A Spring REST API is still MVC (Spring MVC), the “view” is just the JSON you return. And the classic mistake is the fat controller: if it has business ifs, it’s doing the model’s job.'
      ),
      code: `// Model: la regla vive en el servicio, no en la pantalla
@Service
public class GuiaService {

    private final GuiaRepository guias;

    public GuiaService(GuiaRepository guias) {
        this.guias = guias;
    }

    public Guia registrar(NuevaGuia datos) {
        if (datos.peso().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("El peso debe ser mayor a cero");
        }
        return guias.save(Guia.desde(datos));
    }
}

// Controller: recibe la petición, llama al modelo y elige la vista
@Controller
@RequestMapping("/guias")
public class GuiaController {

    private final GuiaService service;

    public GuiaController(GuiaService service) {
        this.service = service;
    }

    @PostMapping
    public String registrar(@Valid NuevaGuia datos, Model model) {
        model.addAttribute("guia", service.registrar(datos));
        return "guias/detalle"; // View: plantilla que solo muestra
    }
}

// Otro "controlador" para integraciones: misma regla, la vista es JSON
@RestController
@RequestMapping("/api/guias")
public class GuiaApi {

    private final GuiaService service;

    public GuiaApi(GuiaService service) {
        this.service = service;
    }

    @PostMapping
    public Guia registrar(@RequestBody @Valid NuevaGuia datos) {
        return service.registrar(datos);
    }
}`,
    },
    {
      id: 'layered',
      name: 'Layered / N-Tier',
      fullName: 'Layered Architecture (N-Tier)',
      color: 'blue',
      lang: 'java',
      summary: tx(
        'La app se apila en capas: presentación arriba, negocio en el medio, datos abajo. Cada capa solo habla con la de abajo. Es lo que sale por defecto en casi cualquier proyecto Spring Boot: Controller → Service → Repository.',
        'The app is stacked in layers: presentation on top, business in the middle, data at the bottom. Each layer only talks to the one below. It’s what you get by default in almost any Spring Boot project: Controller → Service → Repository.'
      ),
      useWhen: tx(
        'Servicios CRUD o de negocio moderado, equipos grandes que necesitan una estructura que todos entiendan desde el día uno.',
        'CRUD services or moderate business logic, big teams that need a structure everyone understands from day one.'
      ),
      avoidWhen: tx(
        'Cuando el servicio integra muchas fuentes externas o el dominio es complejo: la capa de negocio termina dependiendo de JPA y de clientes HTTP. Ahí conviene hexagonal.',
        'When the service integrates many external sources or the domain is complex: the business layer ends up depending on JPA and HTTP clients. That’s when hexagonal pays off.'
      ),
      story: {
        project: tx('Banca personal y corporativa', 'Personal and corporate banking'),
        client: 'Banco GNB Paraguay',
        years: '2022–2023',
        context: tx(
          'En Banco GNB Paraguay trabajé en los microservicios de banca por internet: gestión de cuentas, pago de servicios y la operación personal y empresarial, con Spring Boot, JPA/Hibernate y SQL Server.',
          'At Banco GNB Paraguay I worked on the online banking microservices: account management, bill payments and personal and business operations, with Spring Boot, JPA/Hibernate and SQL Server.'
        ),
        problem: tx(
          'En servicios heredados es común ver controladores que llaman directo al repositorio, o entidades JPA que salen tal cual en la respuesta. Así cualquier cambio en la tabla rompe el contrato de la API.',
          'In legacy services it’s common to see controllers calling the repository directly, or JPA entities going straight out in the response. That way any table change breaks the API contract.'
        ),
        solution: tx(
          'Respetamos las capas: el controller valida y convierte DTOs, el service tiene las reglas y el @Transactional, y el repository solo persiste. Las entidades nunca salen del servicio.',
          'We respected the layers: the controller validates and maps DTOs, the service holds the rules and the @Transactional, and the repository only persists. Entities never leave the service.'
        ),
        payoff: tx(
          'Con esa separación, testear el servicio es mockear el repositorio con Mockito. Así sostuvimos más de 85% de cobertura, que era la condición para pasar el gate de CI/CD.',
          'With that split, testing the service means mocking the repository with Mockito. That’s how we kept coverage above 85%, which was the bar to pass the CI/CD gate.'
        ),
      },
      pitch: tx(
        'Capas es el punto de partida en Spring: controller, service, repository. En GNB la regla era clara: nada de entidades en la respuesta y el @Transactional en el servicio. Eso nos dio tests simples y cobertura alta.',
        'Layers are the starting point in Spring: controller, service, repository. At GNB the rule was clear: no entities in responses and @Transactional in the service. That gave us simple tests and high coverage.'
      ),
      gotcha: tx(
        'La diferencia clave con hexagonal: en capas, el negocio depende de la capa de datos (llama al repositorio JPA). En hexagonal, la dependencia se invierte y el negocio solo conoce interfaces propias.',
        'The key difference with hexagonal: in layers, business depends on the data layer (it calls the JPA repository). In hexagonal, the dependency is inverted and business only knows its own interfaces.'
      ),
      code: `// Presentación: valida la entrada y traduce DTOs
@RestController
@RequestMapping("/api/servicios")
public class PagoServicioController {

    private final PagoServicioService service;

    public PagoServicioController(PagoServicioService service) {
        this.service = service;
    }

    @PostMapping("/pagos")
    public PagoResponse pagar(@RequestBody @Valid PagoRequest request) {
        Pago pago = service.pagar(request.cuenta(), request.servicio(), request.monto());
        return PagoResponse.de(pago); // la entidad no sale tal cual
    }
}

// Negocio: reglas y transacción
@Service
public class PagoServicioService {

    private final CuentaRepository cuentas;
    private final PagoRepository pagos;

    public PagoServicioService(CuentaRepository cuentas, PagoRepository pagos) {
        this.cuentas = cuentas;
        this.pagos = pagos;
    }

    @Transactional
    public Pago pagar(String numeroCuenta, String servicio, BigDecimal monto) {
        Cuenta cuenta = cuentas.findByNumero(numeroCuenta)
                .orElseThrow(() -> new CuentaNoEncontradaException(numeroCuenta));
        cuenta.debitar(monto); // lanza excepción si el saldo no alcanza
        return pagos.save(new Pago(cuenta, servicio, monto));
    }
}

// Datos: JPA, sin reglas de negocio
public interface CuentaRepository extends JpaRepository<Cuenta, Long> {
    Optional<Cuenta> findByNumero(String numero);
}`,
    },
    {
      id: 'microservices',
      name: tx('Microservicios', 'Microservices'),
      fullName: 'Microservices Architecture',
      color: 'green',
      lang: 'java',
      summary: tx(
        'El sistema se parte en servicios pequeños, cada uno dueño de un pedazo del negocio y de sus propios datos. Se despliegan y escalan por separado, y se hablan por red: HTTP o mensajes.',
        'The system is split into small services, each owning a piece of the business and its own data. They deploy and scale separately, and talk over the network: HTTP or messages.'
      ),
      useWhen: tx(
        'Varios equipos trabajando en paralelo, dominios que cambian a ritmos distintos o partes del sistema con cargas muy diferentes.',
        'Several teams working in parallel, domains that change at different speeds, or parts of the system with very different loads.'
      ),
      avoidWhen: tx(
        'Un equipo chico o un producto que todavía no sabe bien cuáles son sus límites. Un monolito modular bien hecho es más barato y se puede partir después.',
        'A small team or a product that doesn’t yet know its boundaries. A well-built modular monolith is cheaper and can be split later.'
      ),
      story: {
        project: 'Lynk',
        client: 'National Commercial Bank',
        years: '2021–2022',
        context: tx(
          'Lynk es la billetera digital del National Commercial Bank de Jamaica. Desarrollé alrededor de 50 microservicios en Java 11 y Spring Boot, desplegados en Azure Kubernetes Service.',
          'Lynk is the digital wallet of Jamaica’s National Commercial Bank. I built around 50 microservices in Java 11 and Spring Boot, deployed on Azure Kubernetes Service.'
        ),
        problem: tx(
          'Una billetera nacional junta muchas cosas: cuentas, transferencias, verificación por SMS, integraciones con el core y con terceros. En un solo despliegue, un cambio chico en verificación obliga a redesplegar pagos.',
          'A national wallet brings together a lot: accounts, transfers, SMS verification, integrations with the core and third parties. In a single deployable, a small change to verification forces you to redeploy payments.'
        ),
        solution: tx(
          'Cada servicio con su dominio y su base. Se comunicaban con Feign y RestTemplate cuando necesitaban una respuesta inmediata, y con Kafka cuando bastaba con avisar. Cada llamada remota con timeout y fallback.',
          'Each service with its own domain and database. They talked through Feign and RestTemplate when they needed an immediate answer, and through Kafka when a notification was enough. Every remote call with a timeout and a fallback.'
        ),
        payoff: tx(
          'Cada equipo desplegaba lo suyo sin coordinar con todos, y un problema en un servicio no tumbaba la billetera completa.',
          'Each team deployed its own piece without coordinating with everyone, and a problem in one service didn’t take down the whole wallet.'
        ),
      },
      pitch: tx(
        'Trabajé con microservicios a escala en Lynk, unos 50 servicios en AKS. Lo que aprendí: cada servicio dueño de sus datos, llamadas síncronas solo cuando necesitas la respuesta, eventos para lo demás, y siempre timeouts y fallbacks.',
        'I worked with microservices at scale on Lynk, around 50 services on AKS. What I learned: each service owns its data, synchronous calls only when you need the answer, events for the rest, and always timeouts and fallbacks.'
      ),
      gotcha: tx(
        'Pregunta típica: ¿cómo haces una transacción entre servicios? No hay @Transactional distribuido; se usa una saga (pasos con compensación) y el patrón outbox para no perder eventos.',
        'Classic question: how do you run a transaction across services? There’s no distributed @Transactional; you use a saga (steps with compensation) and the outbox pattern so events don’t get lost.'
      ),
      code: `// Cada servicio es dueño de sus datos; los demás solo ven su API
@FeignClient(name = "cuentas-service", fallback = CuentasFallback.class)
public interface CuentasClient {

    @GetMapping("/cuentas/{id}/saldo")
    Saldo saldo(@PathVariable String id);
}

@Component
class CuentasFallback implements CuentasClient {
    public Saldo saldo(String id) {
        throw new ServicioNoDisponibleException("cuentas-service");
    }
}

@Service
public class TransferenciaService {

    private final CuentasClient cuentas;
    private final TransferenciaRepository transferencias; // base propia

    public TransferenciaService(CuentasClient cuentas, TransferenciaRepository transferencias) {
        this.cuentas = cuentas;
        this.transferencias = transferencias;
    }

    public Transferencia iniciar(SolicitudTransferencia s) {
        Saldo saldo = cuentas.saldo(s.cuentaOrigen()); // llamada por red: puede fallar
        if (saldo.disponible().compareTo(s.monto()) < 0) {
            throw new SaldoInsuficienteException();
        }
        return transferencias.save(Transferencia.pendiente(s));
    }
}

/* application.yml: nunca una llamada remota sin timeout
spring.cloud.openfeign.client.config.cuentas-service:
  connect-timeout: 2000
  read-timeout: 3000
*/`,
    },
    {
      id: 'eventdriven',
      name: 'Event-Driven',
      fullName: 'Event-Driven Architecture',
      color: 'yellow',
      lang: 'java',
      summary: tx(
        'Los servicios se avisan cosas que ya pasaron (“se detectó una infracción”) a través de un broker, en vez de llamarse entre sí. Quien publica no espera respuesta ni sabe quién escucha.',
        'Services announce things that already happened (“a violation was detected”) through a broker, instead of calling each other. The publisher doesn’t wait for an answer or know who’s listening.'
      ),
      useWhen: tx(
        'Hechos de negocio que disparan varias reacciones, procesos que pueden ir a su ritmo, picos de carga que conviene amortiguar con una cola.',
        'Business facts that trigger several reactions, processes that can run at their own pace, load spikes you want to absorb with a queue.'
      ),
      avoidWhen: tx(
        'Flujos donde el usuario necesita la respuesta en el momento, o cuando el equipo aún no tiene cómo observar y depurar mensajes. Sin trazabilidad, los eventos se vuelven una caja negra.',
        'Flows where the user needs the answer right away, or when the team has no way yet to observe and debug messages. Without tracing, events become a black box.'
      ),
      story: {
        project: 'Qorta',
        client: 'SambaSafety',
        years: '2023–2024',
        context: tx(
          'Qorta es la plataforma de SambaSafety para monitorear el riesgo de conductores y vehículos de flotas en Norteamérica. Varios microservicios reaccionaban a eventos de otros a través de RabbitMQ.',
          'Qorta is SambaSafety’s platform for monitoring driver and vehicle risk for fleets across North America. Several microservices reacted to each other’s events through RabbitMQ.'
        ),
        problem: tx(
          'Los listeners heredados estaban escritos directo contra la API de RabbitMQ, cada uno con su propia forma de manejar acks, reintentos y errores. El código de negocio quedaba mezclado con el del broker y era difícil de testear.',
          'The legacy listeners were written directly against the RabbitMQ API, each with its own way of handling acks, retries and errors. Business code was tangled with broker code and hard to test.'
        ),
        solution: tx(
          'Los reemplacé por Spring Cloud Stream: cada consumidor es un bean funcional (un Consumer o Function de Java) y el destino, el grupo y los reintentos se configuran en el YAML.',
          'I replaced them with Spring Cloud Stream: each consumer is a functional bean (a Java Consumer or Function) and the destination, group and retries live in YAML.'
        ),
        payoff: tx(
          'El código de negocio ya no importa nada de RabbitMQ, se testea con el test binder, y la configuración de errores es la misma en todos los servicios. Cambiar de broker sería cambiar el binder, no el código.',
          'Business code no longer imports anything from RabbitMQ, it’s tested with the test binder, and error handling is configured the same way in every service. Switching brokers would mean switching the binder, not the code.'
        ),
      },
      pitch: tx(
        'Trabajé con eventos sobre Kafka (Lynk, AgentCloud) y RabbitMQ (Qorta, Equifax). En Qorta migré los listeners de RabbitMQ a Spring Cloud Stream, así el negocio quedó separado del broker y cada consumidor es una función que se testea sola.',
        'I’ve worked with events on Kafka (Lynk, AgentCloud) and RabbitMQ (Qorta, Equifax). At Qorta I migrated the RabbitMQ listeners to Spring Cloud Stream, so business logic got separated from the broker and each consumer is a function you can test on its own.'
      ),
      gotcha: tx(
        'Tres cosas que siempre preguntan: el consumidor debe ser idempotente (el mensaje puede llegar dos veces), el orden solo se garantiza por partición o clave, y necesitas una dead-letter queue para los mensajes que fallan siempre.',
        'Three things they always ask: the consumer must be idempotent (a message can arrive twice), ordering is only guaranteed per partition or key, and you need a dead-letter queue for messages that always fail.'
      ),
      code: `// Productor: publica sin saber qué broker hay detrás
@Service
public class MonitoreoService {

    private final StreamBridge stream;

    public MonitoreoService(StreamBridge stream) {
        this.stream = stream;
    }

    public void registrarInfraccion(Infraccion infraccion) {
        stream.send("infracciones-out-0", InfraccionDetectada.de(infraccion));
    }
}

// Consumidor: un bean funcional; el binding decide de dónde lee
@Configuration
public class AlertasConfig {

    @Bean
    public Consumer<InfraccionDetectada> alertarFlota(AlertaService alertas) {
        return evento -> alertas.notificarOperador(evento.conductorId(), evento.tipo());
    }
}

/* application.yml
spring.cloud.function.definition: alertarFlota
spring.cloud.stream.bindings:
  alertarFlota-in-0:
    destination: infracciones
    group: alertas            # cada grupo recibe su copia del evento
    consumer.max-attempts: 3  # luego va a la DLQ
*/`,
    },
    {
      id: 'hexagonal',
      name: 'Hexagonal',
      fullName: 'Hexagonal Architecture (Ports & Adapters)',
      color: 'purple',
      lang: 'java',
      summary: tx(
        'El negocio va al centro y no conoce a nadie de afuera. Define puertos (interfaces) para lo que necesita, y los adaptadores conectan esos puertos con el mundo real: REST, base de datos, colas, APIs de terceros.',
        'Business sits in the center and knows nobody outside. It defines ports (interfaces) for what it needs, and adapters connect those ports to the real world: REST, database, queues, third-party APIs.'
      ),
      useWhen: tx(
        'Servicios que integran muchas fuentes externas, o donde la lógica de negocio es lo valioso y la tecnología alrededor va a cambiar.',
        'Services that integrate many external sources, or where business logic is the valuable part and the surrounding tech will change.'
      ),
      avoidWhen: tx(
        'Un CRUD sin reglas: terminas con interfaces que solo reenvían y tres clases donde bastaba una.',
        'A CRUD with no rules: you end up with interfaces that only forward and three classes where one would do.'
      ),
      story: {
        project: 'Lynk',
        client: 'National Commercial Bank',
        years: '2021–2022',
        context: tx(
          'En Lynk cada microservicio de la billetera dependía de varias fuentes: el core bancario, otros servicios internos, Twilio y proveedores externos.',
          'At Lynk every wallet microservice depended on several sources: the core banking system, other internal services, Twilio and external providers.'
        ),
        problem: tx(
          'Con tantas fuentes, si el caso de uso llama directo a cada cliente HTTP y a JPA, cualquier cambio de un proveedor se mete en la lógica de negocio, y testearla exige levantar medio mundo.',
          'With that many sources, if the use case calls each HTTP client and JPA directly, any provider change leaks into business logic, and testing it means spinning up half the world.'
        ),
        solution: tx(
          'Usamos arquitectura hexagonal justamente por la cantidad de fuentes. El dominio y los casos de uso solo hablan con puertos; los adaptadores de entrada (REST, Kafka) y de salida (JPA, core, Twilio) viven en su propio paquete.',
          'We used hexagonal architecture precisely because of the number of sources. Domain and use cases only talk to ports; inbound adapters (REST, Kafka) and outbound ones (JPA, core, Twilio) live in their own package.'
        ),
        payoff: tx(
          'Los casos de uso se testean con implementaciones falsas de los puertos, sin Spring. Y cambiar un proveedor es escribir un adaptador nuevo. Después apliqué lo mismo en Qorta y en la integración con el AS/400 de Scotiabank.',
          'Use cases are tested with fake port implementations, no Spring needed. And switching a provider means writing a new adapter. I later applied the same approach at Qorta and in the AS/400 integration at Scotiabank.'
        ),
      },
      pitch: tx(
        'Hexagonal es mi opción cuando un servicio integra muchas fuentes. En Lynk la elegimos por eso: el dominio solo conoce puertos, y el core bancario, la base y Twilio son adaptadores intercambiables.',
        'Hexagonal is my choice when a service integrates many sources. At Lynk we chose it for exactly that reason: the domain only knows ports, and the core banking system, the database and Twilio are swappable adapters.'
      ),
      gotcha: tx(
        'Diferencia con Clean Architecture: comparten la regla de que las dependencias apuntan hacia el negocio. Hexagonal habla de adentro/afuera (puertos y adaptadores); Clean nombra más capas (entidades, casos de uso, adaptadores, frameworks).',
        'Difference with Clean Architecture: they share the rule that dependencies point toward business. Hexagonal talks about inside/outside (ports and adapters); Clean names more layers (entities, use cases, adapters, frameworks).'
      ),
      code: `// billetera/
//   domain/         Billetera, Movimiento (sin Spring, sin JPA)
//   application/    casos de uso + puertos
//   adapters/in/    REST, listeners de Kafka
//   adapters/out/   JPA, cliente del core bancario, Twilio

// Puerto de entrada: lo que el mundo puede pedirle al negocio
public interface RecargarBilletera {
    Movimiento recargar(String billeteraId, BigDecimal monto);
}

// Puertos de salida: lo que el negocio necesita del mundo
public interface CoreBancarioPort {
    void debitar(String cuenta, BigDecimal monto);
}

public interface BilleteraRepositoryPort {
    Billetera buscar(String id);
    void guardar(Billetera billetera);
}

// Caso de uso: solo conoce puertos
public class RecargarBilleteraService implements RecargarBilletera {

    private final CoreBancarioPort core;
    private final BilleteraRepositoryPort billeteras;

    public RecargarBilleteraService(CoreBancarioPort core, BilleteraRepositoryPort billeteras) {
        this.core = core;
        this.billeteras = billeteras;
    }

    public Movimiento recargar(String billeteraId, BigDecimal monto) {
        Billetera billetera = billeteras.buscar(billeteraId);
        core.debitar(billetera.cuentaAsociada(), monto);
        Movimiento movimiento = billetera.acreditar(monto);
        billeteras.guardar(billetera);
        return movimiento;
    }
}

// Adaptador de entrada: traduce HTTP al puerto
@RestController
class BilleteraController {

    private final RecargarBilletera recargar;

    BilleteraController(RecargarBilletera recargar) {
        this.recargar = recargar;
    }

    @PostMapping("/billeteras/{id}/recargas")
    Movimiento recargar(@PathVariable String id, @RequestBody RecargaRequest req) {
        return recargar.recargar(id, req.monto());
    }
}`,
    },
    {
      id: 'clean',
      name: 'Clean Architecture',
      fullName: 'Clean Architecture (Uncle Bob)',
      color: 'purple',
      lang: 'java',
      summary: tx(
        'Círculos concéntricos: entidades al centro, casos de uso alrededor, luego adaptadores y por fuera los frameworks. La única regla que importa: el código de adentro nunca conoce al de afuera.',
        'Concentric circles: entities in the center, use cases around them, then adapters, and frameworks on the outside. The only rule that matters: inner code never knows about outer code.'
      ),
      useWhen: tx(
        'Dominios con reglas de negocio complejas y de larga vida, donde quieres que cada acción del negocio sea un caso de uso con nombre propio.',
        'Domains with complex, long-lived business rules, where you want every business action to be a use case with its own name.'
      ),
      avoidWhen: tx(
        'Servicios chicos o con poca lógica: las capas extra cuestan más de lo que protegen.',
        'Small services or ones with little logic: the extra layers cost more than they protect.'
      ),
      story: {
        project: 'AgentCloud',
        client: 'HealthCare',
        years: '2025–2026',
        context: tx(
          'En AgentCloud, una plataforma SaaS para una aseguradora de salud de EE. UU., lideré la arquitectura de los servicios de afiliación, pólizas, cobertura y autorizaciones de atención.',
          'At AgentCloud, a SaaS platform for a US health insurer, I led the architecture of the enrollment, policy, coverage and care authorization services.'
        ),
        problem: tx(
          'Las reglas de seguros son densas: vigencia, coberturas, redes de clínicas. Si esas reglas viven repartidas entre controllers, listeners y queries, nadie puede responder rápido “¿por qué se rechazó esta autorización?”.',
          'Insurance rules are dense: effective dates, coverages, clinic networks. If those rules are scattered across controllers, listeners and queries, nobody can quickly answer “why was this authorization rejected?”.'
        ),
        solution: tx(
          'Cada acción del negocio es un caso de uso (SolicitarAutorizacion, AfiliarAsegurado) que trabaja con entidades puras y gateways. Spring, Oracle y Kafka quedan en la capa más externa y solo se conectan en la configuración.',
          'Every business action is a use case (SolicitarAutorizacion, AfiliarAsegurado) working with plain entities and gateways. Spring, Oracle and Kafka stay in the outermost layer and are only wired together in configuration.'
        ),
        payoff: tx(
          'Las reglas se leen en un solo lugar y se testean sin base de datos. Y el mismo caso de uso servía igual al portal en React, a la app en React Native y a los procesos asíncronos.',
          'Rules read in one place and are tested without a database. And the same use case served the React portal, the React Native app and the async processes alike.'
        ),
      },
      pitch: tx(
        'En AgentCloud organicé los servicios por casos de uso: cada acción del negocio es una clase, con entidades puras al centro y Spring afuera. Las reglas de seguros quedaron en un solo lugar y el portal, la app móvil y los procesos asíncronos usaban los mismos casos de uso.',
        'At AgentCloud I organized the services around use cases: each business action is a class, with plain entities in the center and Spring outside. Insurance rules ended up in one place, and the portal, the mobile app and async processes all used the same use cases.'
      ),
      gotcha: tx(
        'Si te preguntan Clean vs Hexagonal, la respuesta honesta es que en la práctica se parecen mucho. Lo que Clean agrega es nombrar los casos de uso como capa propia y separar las entidades del resto.',
        'If they ask Clean vs Hexagonal, the honest answer is that in practice they look a lot alike. What Clean adds is naming use cases as their own layer and separating entities from everything else.'
      ),
      code: `// Entidad: reglas que serían ciertas aunque no existiera el sistema
public class Poliza {

    private final LocalDate vigenteHasta;
    private final Set<String> coberturas;

    public Poliza(LocalDate vigenteHasta, Set<String> coberturas) {
        this.vigenteHasta = vigenteHasta;
        this.coberturas = coberturas;
    }

    public boolean cubre(String procedimiento, LocalDate fecha) {
        return !fecha.isAfter(vigenteHasta) && coberturas.contains(procedimiento);
    }
}

// Caso de uso: una acción de negocio, sin Spring
public class SolicitarAutorizacion {

    private final PolizaGateway polizas;
    private final AutorizacionGateway autorizaciones;

    public SolicitarAutorizacion(PolizaGateway polizas, AutorizacionGateway autorizaciones) {
        this.polizas = polizas;
        this.autorizaciones = autorizaciones;
    }

    public Resultado ejecutar(Solicitud s) {
        Poliza poliza = polizas.deAsegurado(s.aseguradoId());
        if (!poliza.cubre(s.procedimiento(), s.fecha())) {
            return Resultado.rechazada("Procedimiento sin cobertura");
        }
        Autorizacion autorizacion = autorizaciones.crear(s);
        return Resultado.pendiente(autorizacion.id());
    }
}

// Adaptador de interfaz: traduce HTTP al caso de uso
@RestController
class AutorizacionController {

    private final SolicitarAutorizacion solicitar;

    AutorizacionController(SolicitarAutorizacion solicitar) {
        this.solicitar = solicitar;
    }

    @PostMapping("/autorizaciones")
    ResultadoDto solicitar(@RequestBody SolicitudDto dto) {
        return ResultadoDto.de(solicitar.ejecutar(dto.aDominio()));
    }
}

// Frameworks: Spring arma todo desde la capa más externa
@Configuration
class CasosDeUsoConfig {

    @Bean
    SolicitarAutorizacion solicitarAutorizacion(PolizaGateway p, AutorizacionGateway a) {
        return new SolicitarAutorizacion(p, a);
    }
}`,
    },
    {
      id: 'serverless',
      name: 'Serverless',
      fullName: 'Serverless Architecture (FaaS)',
      color: 'yellow',
      lang: 'python',
      summary: tx(
        'Escribes funciones que se ejecutan cuando pasa algo (un request, un archivo nuevo, un mensaje, un cron) y el proveedor se encarga de servidores y escalado. Pagas por ejecución, no por máquina encendida.',
        'You write functions that run when something happens (a request, a new file, a message, a cron) and the provider handles servers and scaling. You pay per execution, not for a machine sitting idle.'
      ),
      useWhen: tx(
        'Tareas disparadas por eventos o con tráfico irregular: procesar archivos, tareas programadas, webhooks, integraciones livianas.',
        'Event-triggered tasks or bursty traffic: file processing, scheduled jobs, webhooks, lightweight integrations.'
      ),
      avoidWhen: tx(
        'Procesos largos (Lambda corta a los 15 minutos), latencia muy estricta donde el cold start duele, o tráfico alto y constante, donde un contenedor sale más barato.',
        'Long-running processes (Lambda stops at 15 minutes), very strict latency where cold starts hurt, or high steady traffic, where a container is cheaper.'
      ),
      story: {
        project: 'AgentCloud',
        client: 'HealthCare',
        years: '2025–2026',
        context: tx(
          'En AgentCloud el núcleo corría en EKS, pero el procesamiento documental y las tareas programadas los resolví con microservicios serverless en Python sobre AWS Lambda.',
          'At AgentCloud the core ran on EKS, but I handled document processing and scheduled jobs with serverless Python microservices on AWS Lambda.'
        ),
        problem: tx(
          'Los documentos que suben las clínicas llegan a ráfagas: casi nada durante horas y luego decenas juntos. Tener pods encendidos esperando era pagar por nada, y escalar a mano en los picos no tenía sentido.',
          'Documents uploaded by clinics arrive in bursts: almost nothing for hours, then dozens at once. Keeping pods running and waiting meant paying for nothing, and scaling by hand at peaks made no sense.'
        ),
        solution: tx(
          'Una Lambda disparada por S3: cuando entra un archivo, lo procesa y deja el resultado en SQS para que el servicio principal lo consuma. Las tareas programadas, con disparadores por horario.',
          'A Lambda triggered by S3: when a file lands, it processes it and drops the result on SQS for the main service to consume. Scheduled jobs ran on time-based triggers.'
        ),
        payoff: tx(
          'Escala sola en los picos y no cuesta nada cuando no hay documentos. Y el servicio principal quedó libre de trabajo pesado.',
          'It scales by itself at peaks and costs nothing when there are no documents. And the main service was freed from heavy work.'
        ),
      },
      pitch: tx(
        'Usé serverless en tres nubes: Azure Functions con NestJS en Lynk, Lambdas en Node para SURA y Lambdas en Python en AgentCloud. Lo uso para trabajo por eventos o por ráfagas; el núcleo transaccional lo dejo en contenedores.',
        'I’ve used serverless on three clouds: Azure Functions with NestJS at Lynk, Node Lambdas for SURA and Python Lambdas at AgentCloud. I use it for event-driven or bursty work; I keep the transactional core in containers.'
      ),
      gotcha: tx(
        'Los clientes (boto3, conexiones) se crean fuera del handler para reutilizarlos entre invocaciones. Y como un evento puede llegar dos veces, el procesamiento tiene que ser idempotente.',
        'Clients (boto3, connections) are created outside the handler so they’re reused between invocations. And since an event can arrive twice, processing has to be idempotent.'
      ),
      code: `# Lambda disparada cuando una clínica sube un documento a S3
import json
import boto3

# Fuera del handler: se reutilizan entre invocaciones
s3 = boto3.client("s3")
sqs = boto3.client("sqs")
COLA_RESULTADOS = "https://sqs.us-east-1.amazonaws.com/123456789012/documentos-procesados"


def handler(event, context):
    for registro in event["Records"]:
        bucket = registro["s3"]["bucket"]["name"]
        clave = registro["s3"]["object"]["key"]

        contenido = s3.get_object(Bucket=bucket, Key=clave)["Body"].read()
        datos = extraer_datos(contenido)

        sqs.send_message(
            QueueUrl=COLA_RESULTADOS,
            MessageBody=json.dumps({"documento": clave, "datos": datos}),
        )

    return {"procesados": len(event["Records"])}


def extraer_datos(contenido):
    # parseo del PDF o formulario, validaciones...
    return {"paginas": 1}`,
    },
  ];
}
