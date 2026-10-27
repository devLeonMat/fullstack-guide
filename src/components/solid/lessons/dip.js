import { java, mark } from './mark.js';

export default function dip(tx) {
  return {
    id: 'dip',
    letter: 'D',
    color: 'emerald',
    nameEn: 'Dependency Inversion Principle',
    nameEs: 'Principio de Inversión de Dependencias',
    tagline: tx(
      'La lógica de negocio debe depender de abstracciones, no directamente de detalles técnicos.',
      'Business logic must depend on abstractions, not directly on technical details.'
    ),
    definition: tx(
      'El negocio define una interfaz y la tecnología se adapta a ella.',
      'The business defines an interface and the technology adapts to it.'
    ),
    solves: tx(
      'Reglas de negocio atadas a una base de datos o proveedor concreto.',
      'Business rules welded to a specific database or provider.'
    ),
    focus: tx('si el negocio depende de detalles técnicos concretos', 'whether the business depends on concrete technical details'),
    summary: {
      question: tx('¿Hacia dónde apuntan las dependencias?', 'Which way do the dependencies point?'),
      signal: tx('`new` de clases de infraestructura dentro del negocio; imports de drivers o SDKs.', '`new` of infrastructure classes inside business code; driver or SDK imports.'),
      solution: tx('Interfaz en el dominio + implementación en infraestructura + inyección por constructor.', 'Interface in the domain + implementation in infrastructure + constructor injection.'),
      example: 'TransferenciaService → TransferenciaRepository ← SqlServer/Oracle',
    },
    steps: {
      simple: [
        {
          type: 'p',
          text: tx(
            'Piensa en una lámpara: no está soldada a los cables de la pared, se conecta a un **enchufe estándar**. Puedes cambiar de compañía eléctrica o mudarte, y la lámpara sigue funcionando. La lámpara depende del estándar (el enchufe), no del detalle (la central eléctrica).',
            'Think of a lamp: it is not soldered to the wires in the wall; it plugs into a **standard socket**. You can change electricity provider or move house and the lamp keeps working. The lamp depends on the standard (the socket), not the detail (the power plant).'
          ),
        },
        {
          type: 'p',
          text: tx(
            'En código, la lógica de negocio (las reglas de una transferencia) es lo más valioso y estable. La base de datos, el proveedor de correo o una API externa son **detalles técnicos** que cambian. DIP dice: haz que el negocio dependa de una interfaz que **él mismo define**, y que los detalles técnicos se adapten a esa interfaz.',
            'In code, business logic (a transfer\'s rules) is the most valuable and stable part. The database, the mail provider or an external API are **technical details** that change. DIP says: make the business depend on an interface **it defines itself**, and make technical details adapt to that interface.'
          ),
        },
        {
          type: 'p',
          text: tx('Cuatro palabras que usaremos todo el tiempo:', 'Four words we will use all the time:'),
        },
        {
          type: 'concepts',
          items: [
            {
              plain: tx('«Necesito a otro para trabajar»', '"I need someone else to work"'),
              term: tx('Dependencia', 'Dependency'),
              text: tx('A depende de B si A usa, crea o importa a B. Si B cambia, A puede verse afectada.', 'A depends on B if A uses, creates or imports B. If B changes, A may be affected.'),
            },
            {
              plain: tx('«La pieza que hace el trabajo de una forma concreta»', '"The piece that does the work one specific way"'),
              term: tx('Implementación concreta', 'Concrete implementation'),
              text: tx('`SqlServerTransferenciaRepository` guarda en SQL Server usando JDBC.', '`SqlServerTransferenciaRepository` saves to SQL Server using JDBC.'),
            },
            {
              plain: tx('«Qué se necesita, sin decir cómo»', '"What is needed, without saying how"'),
              term: tx('Abstracción', 'Abstraction'),
              text: tx('`TransferenciaRepository` solo dice «guardar una transferencia».', '`TransferenciaRepository` only says "save a transfer".'),
            },
            {
              plain: tx('«Cuánto me afectan tus cambios»', '"How much your changes affect me"'),
              term: tx('Acoplamiento', 'Coupling'),
              text: tx('Alto acoplamiento: si cambias una clase, tienes que cambiar la otra.', 'High coupling: if you change one class, you have to change the other.'),
            },
          ],
        },
        {
          type: 'details',
          title: tx('La definición formal (para entrevistas)', 'The formal definition (for interviews)'),
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                tx('Los módulos de alto nivel (negocio) no deben depender de módulos de bajo nivel (detalles técnicos). Ambos deben depender de abstracciones.', 'High-level modules (business) should not depend on low-level modules (technical details). Both should depend on abstractions.'),
                tx('Las abstracciones no deben depender de los detalles. Los detalles deben depender de las abstracciones.', 'Abstractions should not depend on details. Details should depend on abstractions.'),
              ],
            },
          ],
        },
      ],
      scenario: [
        {
          type: 'p',
          text: tx(
            'El microservicio de transferencias guarda en **SQL Server**. El banco firmó un acuerdo para migrar a **Oracle** en seis meses. Además, QA se queja: para probar una simple regla de negocio hay que levantar una base de datos.',
            'The transfers microservice saves to **SQL Server**. The bank signed an agreement to migrate to **Oracle** within six months. On top of that, QA complains: testing a simple business rule requires spinning up a database.'
          ),
        },
        {
          type: 'p',
          text: tx(
            'Usaremos el mismo `record Transferencia` de la lección de SRP.',
            'We will use the same `record Transferencia` from the SRP lesson.'
          ),
        },
      ],
      bad: [
        java(`
public class SqlServerRepository {

    private final String url;

    public SqlServerRepository(String url) {
        this.url = url;
    }

    public void guardar(Transferencia transferencia) {
        // Aquí iría el código JDBC específico de SQL Server
        System.out.println("INSERT en SQL Server (" + url + "): " + transferencia.id());
    }
}`, { title: 'SqlServerRepository.java', unit: 'dip-bad' }),
        java(`
import java.math.BigDecimal;

public class TransferenciaService {

!    private final SqlServerRepository repository =
!            new SqlServerRepository("jdbc:sqlserver://db-prod:1433;databaseName=banco");

    public void transferir(Transferencia transferencia) {
        if (transferencia.monto().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("El monto debe ser positivo");
        }
!        repository.guardar(transferencia);
    }
}`, {
          title: 'TransferenciaService.java',
          tone: 'bad',
          lineNumbers: true,
          unit: 'dip-bad',
          notes: [
            tx('El tipo del campo es la clase concreta `SqlServerRepository`.', 'The field type is the concrete class `SqlServerRepository`.'),
            tx('El servicio crea su dependencia con `new` y hasta conoce la URL de producción.', 'The service creates its dependency with `new` and even knows the production URL.'),
            tx('La regla de negocio (monto positivo) queda soldada a SQL Server.', 'The business rule (positive amount) is welded to SQL Server.'),
          ],
        }),
        {
          type: 'flow',
          title: tx('ANTES: el negocio depende del detalle técnico', 'BEFORE: business depends on the technical detail'),
          description: tx(
            'TransferenciaService, del dominio, depende directamente de SqlServerRepository, de infraestructura.',
            'TransferenciaService, in the domain, depends directly on SqlServerRepository, in infrastructure.'
          ),
          nodes: [
            { title: 'TransferenciaService', layer: tx('Negocio', 'Business') },
            { arrow: 'forward', label: tx('crea con new y usa', 'creates with new and uses'), tone: 'bad' },
            { title: 'SqlServerRepository', layer: tx('Infraestructura', 'Infrastructure'), status: 'bad' },
          ],
        },
      ],
      why: [
        {
          type: 'cards',
          items: [
            {
              title: tx('Qué está ocurriendo', 'What is happening'),
              text: tx(
                '`TransferenciaService` crea su propio repositorio con `new` y conoce la URL de la base de producción. El negocio sabe exactamente qué tecnología hay debajo.',
                '`TransferenciaService` creates its own repository with `new` and knows the production database URL. The business knows exactly which technology lies beneath.'
              ),
            },
            {
              title: tx('Por qué es un problema', 'Why it is a problem'),
              text: tx(
                'La regla «el monto debe ser positivo» no se puede usar sin SQL Server. Lo más estable del sistema (el negocio) depende de lo más cambiante (la infraestructura).',
                'The rule "amount must be positive" cannot be used without SQL Server. The most stable part of the system (business) depends on the most volatile (infrastructure).'
              ),
            },
            {
              title: tx('Consecuencias en producción', 'Consequences in production'),
              text: tx(
                'Migrar a Oracle obliga a editar y redesplegar la clase de negocio. La URL en el código facilita que un test local escriba en la base de producción.',
                'Migrating to Oracle forces you to edit and redeploy the business class. The URL in code makes it easy for a local test to write into the production database.'
              ),
            },
            {
              title: tx('Dificultades de mantenimiento', 'Maintenance pain'),
              text: tx(
                'No hay forma de escribir un test unitario: cada prueba necesita SQL Server. Cada cambio de infraestructura toca el código de negocio.',
                'There is no way to write a unit test: every test needs SQL Server. Every infrastructure change touches business code.'
              ),
            },
          ],
        },
        {
          type: 'details',
          title: tx('¿Qué ocurre si cambiamos la implementación?', 'What happens if we swap the implementation?'),
          blocks: [
            {
              type: 'list',
              items: [
                tx('**Antes:** hay que abrir `TransferenciaService`, cambiar el tipo del campo, el `new` y la URL… y volver a probar reglas de negocio que no cambiaron.', '**Before:** you open `TransferenciaService`, change the field type, the `new` and the URL… and retest business rules that did not change.'),
                tx('**Después (con DIP):** se crea `OracleTransferenciaRepository` y se cambia una línea de configuración. `TransferenciaService` ni se recompila.', '**After (with DIP):** you create `OracleTransferenciaRepository` and change one configuration line. `TransferenciaService` is not even recompiled.'),
              ],
            },
          ],
        },
        {
          type: 'details',
          title: tx('¿Cómo identifico una violación de DIP?', 'How do I spot a DIP violation?'),
          blocks: [
            {
              type: 'list',
              items: [
                tx('`new` de clases de infraestructura dentro de servicios de negocio.', '`new` of infrastructure classes inside business services.'),
                tx('Imports de `java.sql`, drivers o SDKs de proveedores en clases de dominio.', 'Imports of `java.sql`, drivers or provider SDKs in domain classes.'),
                tx('Tipos concretos (`SqlServer…`, `Aws…`) en campos o constructores de servicios.', 'Concrete types (`SqlServer…`, `Aws…`) in service fields or constructors.'),
                tx('No puedes escribir un test unitario sin levantar infraestructura.', 'You cannot write a unit test without starting infrastructure.'),
              ],
            },
          ],
        },
      ],
      fix: [
        {
          type: 'steps',
          items: [
            {
              title: tx('Crea la abstracción en el lado del negocio', 'Create the abstraction on the business side'),
              blocks: [
                java(`
public interface TransferenciaRepository {

    void guardar(Transferencia transferencia);
}`, { title: 'TransferenciaRepository.java', unit: 'dip-good' }),
                {
                  type: 'p',
                  text: tx(
                    'La interfaz habla el idioma del negocio («guardar una transferencia»), no el de la base de datos (`INSERT`, conexión, URL). Y vive en el **paquete del negocio**, junto al servicio que la usa.',
                    'The interface speaks the business language ("save a transfer"), not the database\'s (`INSERT`, connection, URL). And it lives in the **business package**, next to the service that uses it.'
                  ),
                },
              ],
            },
            {
              title: tx('Los detalles técnicos implementan la abstracción', 'Technical details implement the abstraction'),
              blocks: [
                java(`
public class SqlServerTransferenciaRepository implements TransferenciaRepository {

    private final String url;

    public SqlServerTransferenciaRepository(String url) {
        this.url = url;
    }

    @Override
    public void guardar(Transferencia transferencia) {
        System.out.println("INSERT en SQL Server (" + url + "): " + transferencia.id());
    }
}`, { title: 'SqlServerTransferenciaRepository.java', unit: 'dip-good' }),
                java(`
public class OracleTransferenciaRepository implements TransferenciaRepository {

    private final String url;

    public OracleTransferenciaRepository(String url) {
        this.url = url;
    }

    @Override
    public void guardar(Transferencia transferencia) {
        System.out.println("INSERT en Oracle (" + url + "): " + transferencia.id());
    }
}`, { title: 'OracleTransferenciaRepository.java', unit: 'dip-good' }),
              ],
            },
            {
              title: tx('El servicio recibe la abstracción por constructor', 'The service receives the abstraction through its constructor'),
              blocks: [
                java(`
import java.math.BigDecimal;

public class TransferenciaService {

!    private final TransferenciaRepository repository;

!    public TransferenciaService(TransferenciaRepository repository) {
!        this.repository = repository;
!    }

    public void transferir(Transferencia transferencia) {
        if (transferencia.monto().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("El monto debe ser positivo");
        }
        repository.guardar(transferencia);
    }
}`, { title: 'TransferenciaService.java', tone: 'good', unit: 'dip-good' }),
                {
                  type: 'p',
                  text: tx('¿Por qué el servicio ya no depende de SQL Server? Paso a paso:', 'Why does the service no longer depend on SQL Server? Step by step:'),
                },
                {
                  type: 'list',
                  ordered: true,
                  tone: 'good',
                  items: [
                    tx('El campo es de tipo `TransferenciaRepository` (una interfaz): no hay ninguna mención a SQL Server.', 'The field is of type `TransferenciaRepository` (an interface): there is no mention of SQL Server.'),
                    tx('No hay `new`: el servicio no decide qué implementación usar; **la recibe**.', 'There is no `new`: the service does not choose an implementation; **it receives one**.'),
                    tx('Sus imports solo incluyen tipos del negocio. Si borras `SqlServerTransferenciaRepository`, `TransferenciaService` sigue compilando.', 'Its imports only include business types. Delete `SqlServerTransferenciaRepository` and `TransferenciaService` still compiles.'),
                    tx('La flecha de dependencia de la infraestructura ahora apunta **hacia** el negocio: eso es la «inversión».', 'The infrastructure\'s dependency arrow now points **toward** the business: that is the "inversion".'),
                  ],
                },
              ],
            },
            {
              title: tx('Alguien de afuera arma las piezas', 'Someone outside wires the pieces'),
              blocks: [
                {
                  type: 'p',
                  text: tx(
                    'Sin ningún framework: el punto de arranque decide la implementación. Para producción, Oracle; para un test, un repositorio en memoria.',
                    'No framework at all: the entry point decides the implementation. Oracle for production; an in-memory repository for a test.'
                  ),
                },
                java(`
public class Aplicacion {

    public static void main(String[] args) {
        TransferenciaRepository repository =
                new OracleTransferenciaRepository("jdbc:oracle:thin:@db-prod:1521/BANCO");
        TransferenciaService service = new TransferenciaService(repository);
        // ... la aplicación usa service
    }
}`, { title: 'Aplicacion.java', unit: 'dip-good' }),
                java(`
import java.util.ArrayList;
import java.util.List;

class TransferenciaRepositoryEnMemoria implements TransferenciaRepository {

    final List<Transferencia> guardadas = new ArrayList<>();

    @Override
    public void guardar(Transferencia transferencia) {
        guardadas.add(transferencia);
    }
}`, { title: 'TransferenciaRepositoryEnMemoria.java (test)', unit: 'dip-good' }),
                java(`
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;
import org.junit.jupiter.api.Test;

class TransferenciaServiceTest {

    @Test
    void rechazaMontosNegativosSinTocarLaBaseDeDatos() {
        var repositorio = new TransferenciaRepositoryEnMemoria();
        var service = new TransferenciaService(repositorio);
        var transferencia = new Transferencia(UUID.randomUUID(), "001", "002",
                new BigDecimal("-50"), LocalDateTime.now());

        assertThatThrownBy(() -> service.transferir(transferencia))
                .isInstanceOf(IllegalArgumentException.class);
        assertThat(repositorio.guardadas).isEmpty();
    }
}`, { title: 'TransferenciaServiceTest.java', unit: 'dip-good' }),
                {
                  type: 'p',
                  text: tx('El test corre en milisegundos y no necesita ninguna base de datos.', 'The test runs in milliseconds and needs no database at all.'),
                },
              ],
            },
          ],
        },
        {
          type: 'flow',
          title: tx('DESPUÉS: los detalles dependen de la abstracción del negocio', 'AFTER: details depend on the business abstraction'),
          description: tx(
            'TransferenciaService usa la interfaz TransferenciaRepository, que pertenece al negocio. SqlServerTransferenciaRepository y OracleTransferenciaRepository, de infraestructura, la implementan: su dependencia apunta hacia el negocio.',
            'TransferenciaService uses the TransferenciaRepository interface, which belongs to the business. SqlServerTransferenciaRepository and OracleTransferenciaRepository, in infrastructure, implement it: their dependency points toward the business.'
          ),
          nodes: [
            { title: 'TransferenciaService', layer: tx('Negocio', 'Business') },
            { arrow: 'forward', label: tx('usa', 'uses') },
            { title: 'TransferenciaRepository', kind: 'interface', layer: tx('Negocio', 'Business') },
            { arrow: 'backward', label: tx('implementan', 'implement') },
            {
              group: tx('Infraestructura', 'Infrastructure'),
              items: [
                { title: 'SqlServerTransferenciaRepository' },
                { title: 'OracleTransferenciaRepository' },
              ],
            },
          ],
        },
        {
          type: 'p',
          text: tx('Así se ve en paquetes. La abstracción vive con el negocio, no con la tecnología:', 'This is how it looks in packages. The abstraction lives with the business, not the technology:'),
        },
        {
          type: 'code',
          lang: 'text',
          ...mark(`
com.banco.transferencias
├── dominio
│   ├── Transferencia.java
│   ├── TransferenciaRepository.java   ← la abstracción vive aquí
│   └── TransferenciaService.java
└── infraestructura
    ├── SqlServerTransferenciaRepository.java
    └── OracleTransferenciaRepository.java`),
        },
      ],
      compare: [
        {
          type: 'compare',
          before: java(`
public class TransferenciaService {

!    private final SqlServerRepository repository =
!            new SqlServerRepository("jdbc:sqlserver://db-prod:1433;databaseName=banco");

    public void transferir(Transferencia transferencia) {
        // reglas de negocio...
        repository.guardar(transferencia);
    }
}`),
          after: java(`
public class TransferenciaService {

!    private final TransferenciaRepository repository;

!    public TransferenciaService(TransferenciaRepository repository) {
!        this.repository = repository;
!    }

    public void transferir(Transferencia transferencia) {
        // reglas de negocio...
        repository.guardar(transferencia);
    }
}`),
          rows: [
            [tx('El servicio conoce', 'The service knows'), tx('`SqlServerRepository` y la URL de producción', '`SqlServerRepository` and the production URL'), tx('Solo la interfaz `TransferenciaRepository`', 'Only the `TransferenciaRepository` interface')],
            [tx('Migrar a Oracle', 'Migrating to Oracle'), tx('Editar y volver a probar el negocio', 'Edit and retest the business code'), tx('Nueva clase + cambio de configuración', 'New class + configuration change')],
            [tx('Test de «monto positivo»', '"Positive amount" test'), tx('Necesita SQL Server', 'Needs SQL Server'), tx('Fake en memoria, milisegundos', 'In-memory fake, milliseconds')],
            [tx('Dirección de dependencias', 'Dependency direction'), tx('Negocio → Infraestructura', 'Business → Infrastructure'), tx('Infraestructura → Abstracción ← Negocio', 'Infrastructure → Abstraction ← Business')],
            [tx('Quién crea las dependencias', 'Who creates dependencies'), tx('El propio servicio (`new`)', 'The service itself (`new`)'), tx('El arranque de la app (`main` o Spring)', 'The app\'s entry point (`main` or Spring)')],
          ],
        },
      ],
      professional: [
        {
          type: 'p',
          text: tx(
            'Spring Boot hace por ti el paso 4 («alguien de afuera arma las piezas»). Tú marcas las clases como componentes y Spring inyecta la implementación por el **constructor**:',
            'Spring Boot does step 4 ("someone outside wires the pieces") for you. You mark classes as components and Spring injects the implementation through the **constructor**:'
          ),
        },
        java(`
import java.math.BigDecimal;
import org.springframework.stereotype.Service;

@Service
public class TransferenciaService {

    private final TransferenciaRepository repository;

    // Con un solo constructor, Spring lo usa automáticamente: no hace falta @Autowired
    public TransferenciaService(TransferenciaRepository repository) {
        this.repository = repository;
    }

    public void transferir(Transferencia transferencia) {
        if (transferencia.monto().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("El monto debe ser positivo");
        }
        repository.guardar(transferencia);
    }
}`, { title: tx('TransferenciaService.java (dominio)', 'TransferenciaService.java (domain)'), unit: 'dip-spring' }),
        java(`
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@Profile("oracle")
public class OracleTransferenciaRepository implements TransferenciaRepository {

    private final JdbcTemplate jdbc;

    public OracleTransferenciaRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public void guardar(Transferencia t) {
        jdbc.update("INSERT INTO transferencias (id, origen, destino, monto, fecha) VALUES (?, ?, ?, ?, ?)",
                t.id().toString(), t.cuentaOrigen(), t.cuentaDestino(), t.monto(), t.fecha());
    }
}`, { title: tx('OracleTransferenciaRepository.java (infraestructura)', 'OracleTransferenciaRepository.java (infrastructure)'), unit: 'dip-spring' }),
        {
          type: 'code',
          lang: 'yaml',
          title: 'application.yml',
          ...mark(`
spring:
  profiles:
    active: oracle   # cambia a "sqlserver" y TransferenciaService no se toca`),
        },
        {
          type: 'p',
          text: tx(
            '`SqlServerTransferenciaRepository` sería igual, con `@Profile("sqlserver")`. Fíjate en la separación: `@Service` marca un componente del **dominio**; `@Repository` marca un componente de **infraestructura** (además, Spring traduce sus excepciones de base de datos a `DataAccessException`).',
            '`SqlServerTransferenciaRepository` would be the same, with `@Profile("sqlserver")`. Notice the split: `@Service` marks a **domain** component; `@Repository` marks an **infrastructure** component (Spring also translates its database exceptions into `DataAccessException`).'
          ),
        },
        {
          type: 'table',
          caption: tx('DIP, DI e IoC no son sinónimos', 'DIP, DI and IoC are not synonyms'),
          headers: [tx('Concepto', 'Concept'), tx('Qué es', 'What it is'), tx('Pregunta que responde', 'Question it answers'), tx('En este ejemplo', 'In this example')],
          rows: [
            [
              '**DIP** — Dependency Inversion Principle',
              tx('Un principio de diseño', 'A design principle'),
              tx('¿De qué debe depender mi código de negocio?', 'What should my business code depend on?'),
              tx('`TransferenciaService` depende de la interfaz `TransferenciaRepository`.', '`TransferenciaService` depends on the `TransferenciaRepository` interface.'),
            ],
            [
              '**DI** — Dependency Injection',
              tx('Una técnica', 'A technique'),
              tx('¿Cómo le llegan sus dependencias a un objeto?', 'How does an object get its dependencies?'),
              tx('El repositorio llega por el constructor en lugar de crearse con `new`.', 'The repository arrives through the constructor instead of `new`.'),
            ],
            [
              '**IoC** — Inversion of Control',
              tx('Un principio general / estilo de framework', 'A general principle / framework style'),
              tx('¿Quién controla la creación de objetos y el flujo?', 'Who controls object creation and the flow?'),
              tx('El contenedor de Spring crea los beans y llama a tu código; tú no haces `new TransferenciaService(...)`.', 'Spring\'s container creates the beans and calls your code; you never write `new TransferenciaService(...)`.'),
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: tx('DI sin DIP es posible (y frecuente)', 'DI without DIP is possible (and common)'),
          text: tx(
            '`public TransferenciaService(SqlServerTransferenciaRepository repo)` con `@Service`: Spring lo inyecta (hay DI e IoC), pero el negocio sigue atado a SQL Server (no hay DIP). Y al revés: el `main` del paso 4 cumple DIP sin ningún framework.',
            '`public TransferenciaService(SqlServerTransferenciaRepository repo)` with `@Service`: Spring injects it (there is DI and IoC), but the business is still welded to SQL Server (no DIP). And the other way round: the `main` in step 4 follows DIP with no framework at all.'
          ),
        },
        {
          type: 'details',
          title: tx('Relación con la arquitectura hexagonal (puertos y adaptadores)', 'Link with hexagonal architecture (ports and adapters)'),
          blocks: [
            {
              type: 'p',
              text: tx('La arquitectura hexagonal aplica DIP de forma sistemática en toda la aplicación:', 'Hexagonal architecture applies DIP systematically across the whole application:'),
            },
            {
              type: 'list',
              items: [
                tx('`TransferenciaRepository` es un **puerto de salida**: lo que el dominio necesita del exterior.', '`TransferenciaRepository` is an **output port**: what the domain needs from the outside.'),
                tx('`OracleTransferenciaRepository` es un **adaptador de salida**: implementa el puerto con una tecnología.', '`OracleTransferenciaRepository` is an **output adapter**: it implements the port with a technology.'),
                tx('Un `TransferenciaController` es un **adaptador de entrada**: traduce HTTP a llamadas al dominio.', 'A `TransferenciaController` is an **input adapter**: it translates HTTP into domain calls.'),
              ],
            },
            {
              type: 'p',
              text: tx(
                'En una hexagonal estricta, el dominio ni siquiera usa anotaciones de Spring. El cableado se hace en infraestructura con `@Configuration`:',
                'In strict hexagonal architecture the domain does not even use Spring annotations. Wiring happens in infrastructure with `@Configuration`:'
              ),
            },
            java(`
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TransferenciaConfig {

    @Bean
    TransferenciaService transferenciaService(TransferenciaRepository repository) {
        return new TransferenciaService(repository);
    }
}`, { title: 'TransferenciaConfig.java', unit: 'dip-good' }),
            {
              type: 'callout',
              tone: 'info',
              title: tx('No los confundas', 'Do not confuse them'),
              text: tx(
                'DIP es un **principio**; la arquitectura hexagonal es una **arquitectura** completa que lo usa. Puedes aplicar DIP en una aplicación por capas tradicional sin adoptar hexagonal.',
                'DIP is a **principle**; hexagonal is a complete **architecture** that uses it. You can apply DIP in a traditional layered app without adopting hexagonal.'
              ),
            },
          ],
        },
        {
          type: 'callout',
          tone: 'danger',
          title: tx('Errores comunes', 'Common mistakes'),
          items: [
            tx('Poner la interfaz en el paquete de infraestructura: la dependencia no se invierte del todo.', 'Putting the interface in the infrastructure package: the dependency is not fully inverted.'),
            tx('Interfaces que reflejan la tecnología (`ejecutarInsertSql`, `guardarConJdbc`).', 'Interfaces that mirror the technology (`ejecutarInsertSql`, `guardarConJdbc`).'),
            tx('Creer que usar Spring (DI) ya significa cumplir DIP.', 'Believing that using Spring (DI) already means following DIP.'),
            tx('`@Autowired` en campos: oculta dependencias y complica los tests. Prefiere el constructor.', '`@Autowired` on fields: it hides dependencies and complicates tests. Prefer the constructor.'),
            tx('Crear una interfaz para cada clase, incluso sin frontera técnica (un validador puro no la necesita).', 'Creating an interface for every class, even without a technical boundary (a pure validator does not need one).'),
          ],
        },
      ],
      rule: [
        { type: 'rule', text: tx('La lógica de negocio debe depender de abstracciones, no directamente de detalles técnicos.', 'Business logic must depend on abstractions, not directly on technical details.') },
        { type: 'p', text: tx('Truco para recordarlo: **el negocio define el enchufe; la tecnología se adapta a él.**', 'Memory trick: **the business defines the socket; the technology adapts to it.**') },
        {
          type: 'five',
          problem: tx('Reglas de negocio atadas a una base de datos o proveedor concreto.', 'Business rules welded to a specific database or provider.'),
          identify: tx('`new` de infraestructura en el negocio; imports de drivers; tests imposibles sin BD.', 'Infrastructure `new` in business code; driver imports; tests impossible without a DB.'),
          fix: tx('Interfaz en el dominio, implementación en infraestructura, inyección por constructor.', 'Interface in the domain, implementation in infrastructure, constructor injection.'),
          when: tx('En cada frontera técnica: BD, colas, correo, APIs REST externas.', 'At every technical boundary: DB, queues, email, external REST APIs.'),
          mistakes: tx('Confundir DIP con DI, o dejar la interfaz del lado de la infraestructura.', 'Confusing DIP with DI, or leaving the interface on the infrastructure side.'),
        },
      ],
    },
    exercises: [
      {
        id: 'dip-1',
        prompt: tx('Observa este constructor de un `@Service`. Spring lo inyecta sin problemas. ¿Qué afirmación es correcta?', 'Look at this `@Service` constructor. Spring injects it without problems. Which statement is correct?'),
        code: `@Service
public class TransferenciaService {

    private final SqlServerTransferenciaRepository repository;

    public TransferenciaService(SqlServerTransferenciaRepository repository) {
        this.repository = repository;
    }
}`,
        options: [
          {
            id: 'a',
            text: tx('Cumple DIP porque usa inyección de dependencias.', 'It follows DIP because it uses dependency injection.'),
            explanation: tx(
              'Usar DI no garantiza DIP. La dependencia llega desde afuera, pero sigue siendo la clase concreta de SQL Server.',
              'Using DI does not guarantee DIP. The dependency comes from outside, but it is still the concrete SQL Server class.'
            ),
          },
          {
            id: 'b',
            text: tx('Usa DI, pero no cumple DIP: depende de la clase concreta.', 'It uses DI, but does not follow DIP: it depends on the concrete class.'),
            correct: true,
            explanation: tx(
              'Correcto. Cambia `SqlServerTransferenciaRepository` por la interfaz `TransferenciaRepository` en el campo y en el constructor, y cumplirás ambos.',
              'Correct. Replace `SqlServerTransferenciaRepository` with the `TransferenciaRepository` interface in the field and constructor, and you get both.'
            ),
          },
          {
            id: 'c',
            text: tx('Como Spring controla los objetos (IoC), cumple DIP automáticamente.', 'Since Spring controls the objects (IoC), it follows DIP automatically.'),
            explanation: tx(
              'IoC dice quién crea los objetos, no de qué tipo depende tu negocio. Son conceptos distintos.',
              'IoC says who creates objects, not what type your business depends on. They are different concepts.'
            ),
          },
          {
            id: 'd',
            text: tx('Viola ISP porque la clase tiene un solo campo.', 'It violates ISP because the class has a single field.'),
            explanation: tx(
              'ISP trata del tamaño de las interfaces, no de cuántos campos tiene una clase. El problema aquí es la dirección de la dependencia.',
              'ISP is about interface size, not how many fields a class has. The problem here is the direction of the dependency.'
            ),
          },
        ],
      },
      {
        id: 'dip-2',
        prompt: tx('¿En qué paquete debe vivir la interfaz `TransferenciaRepository`?', 'Which package should the `TransferenciaRepository` interface live in?'),
        options: [
          {
            id: 'a',
            text: tx('En `infraestructura`, junto a `SqlServerTransferenciaRepository`.', 'In `infraestructura`, next to `SqlServerTransferenciaRepository`.'),
            explanation: tx(
              'Así el negocio tendría que importar algo del paquete de infraestructura: la dependencia seguiría apuntando hacia los detalles.',
              'Then the business would have to import from the infrastructure package: the dependency would still point toward the details.'
            ),
          },
          {
            id: 'b',
            text: tx('En `dominio`, junto al servicio que la usa.', 'In `dominio`, next to the service that uses it.'),
            correct: true,
            explanation: tx(
              'Correcto. El negocio define lo que necesita y la infraestructura depende del dominio para implementarlo: eso es la inversión.',
              'Correct. The business defines what it needs and infrastructure depends on the domain to implement it: that is the inversion.'
            ),
          },
          {
            id: 'c',
            text: tx('En el paquete del driver JDBC.', 'In the JDBC driver package.'),
            explanation: tx(
              'Eso ataría la abstracción a una tecnología concreta, justo lo contrario de lo que busca DIP.',
              'That would tie the abstraction to a specific technology, the exact opposite of what DIP aims for.'
            ),
          },
          {
            id: 'd',
            text: tx('Da igual: lo importante es que exista la interfaz.', 'It does not matter: what matters is that the interface exists.'),
            explanation: tx(
              'Sí importa. Una interfaz del lado de la infraestructura mantiene al negocio dependiendo de ese módulo.',
              'It does matter. An interface on the infrastructure side keeps the business depending on that module.'
            ),
          },
        ],
      },
    ],
  };
}
