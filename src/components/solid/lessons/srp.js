import { java } from './mark.js';

export default function srp(tx) {
  return {
    id: 'srp',
    letter: 'S',
    color: 'violet',
    nameEn: 'Single Responsibility Principle',
    nameEs: 'Principio de Responsabilidad Única',
    tagline: tx('Una clase debería tener una sola razón para cambiar.', 'A class should have only one reason to change.'),
    definition: tx(
      'Cada clase se encarga de un solo tipo de trabajo.',
      'Each class takes care of a single kind of work.'
    ),
    solves: tx(
      'Clases gigantes donde un cambio en un área rompe otra.',
      'Giant classes where a change in one area breaks another.'
    ),
    focus: tx('si una clase tiene varias razones para cambiar', 'whether a class has several reasons to change'),
    summary: {
      question: tx('¿Cuántas razones tiene esta clase para cambiar?', 'How many reasons does this class have to change?'),
      signal: tx('Su descripción usa muchas «y»; importa SQL, correo y PDF a la vez.', 'Its description needs many "and"s; it imports SQL, mail and PDF at once.'),
      solution: tx('Extraer cada responsabilidad y dejar una clase que coordine.', 'Extract each responsibility and keep one class that coordinates.'),
      example: 'TransferenciaService → Validator, Repository, Notificacion, Reporte',
    },
    visual: {
      takeaway: tx('Una clase gorda se parte en piezas pequeñas y una de ellas coordina.', 'One fat class splits into small pieces, and one of them coordinates.'),
      before: {
        caption: tx('una clase hace 4 trabajos', 'one class does 4 jobs'),
        description: tx('TransferenciaService contiene reglas, SQL, correo y PDF.', 'TransferenciaService contains rules, SQL, email and PDF.'),
        rows: [[
          {
            title: 'TransferenciaService',
            status: 'bad',
            chips: [tx('reglas', 'rules'), 'SQL', tx('correo', 'email'), 'PDF'],
          },
        ]],
      },
      after: {
        caption: tx('una clase por trabajo + un coordinador', 'one class per job + a coordinator'),
        description: tx('TransferenciaService usa a TransferenciaValidator, TransferenciaRepository, NotificacionService y ReporteService.', 'TransferenciaService uses TransferenciaValidator, TransferenciaRepository, NotificacionService and ReporteService.'),
        rows: [[
          { title: 'TransferenciaService', note: tx('coordina', 'coordinates') },
          { arrow: 'forward', label: tx('usa', 'uses') },
          {
            group: tx('1 responsabilidad cada una', '1 responsibility each'),
            items: [
              { title: 'TransferenciaValidator', note: tx('reglas', 'rules') },
              { title: 'TransferenciaRepository', note: 'SQL' },
              { title: 'NotificacionService', note: tx('correo', 'email') },
              { title: 'ReporteService', note: 'PDF' },
            ],
          },
        ]],
      },
    },
    steps: {
      simple: [
        {
          type: 'p',
          text: tx(
            'Piensa en una agencia bancaria: el cajero atiende depósitos, el analista de riesgos aprueba créditos y el contador cuadra los balances. Si una sola persona hiciera todo, cada cambio de normas en cualquier área la obligaría a reaprenderlo todo, y un error suyo afectaría a todas las áreas a la vez.',
            'Think of a bank branch: the teller handles deposits, the risk analyst approves loans and the accountant balances the books. If one person did everything, every rule change in any area would force them to relearn everything, and a single mistake would affect every area at once.'
          ),
        },
        {
          type: 'p',
          text: tx(
            'En código pasa lo mismo: una clase debería encargarse de **un solo tipo de trabajo**. Una pista sencilla: si para describir lo que hace tu clase necesitas muchas «y» —«valida **y** guarda **y** envía correos **y** genera PDF»—, probablemente hace demasiado.',
            'Code works the same way: a class should take care of **one kind of work**. A simple hint: if describing your class needs many "and"s — "validates **and** saves **and** sends emails **and** builds PDFs" — it probably does too much.'
          ),
        },
        {
          type: 'callout',
          tone: 'info',
          title: tx('¿Qué es una «razón para cambiar»?', 'What is a "reason to change"?'),
          text: tx(
            'Es una persona o área del negocio que podría pedirte modificar esa clase. Si Cumplimiento, el DBA, Marketing y Legal pueden pedirte cambios en la misma clase, esa clase tiene cuatro razones para cambiar.',
            'It is a person or business area that could ask you to modify that class. If Compliance, the DBA, Marketing and Legal can all request changes to the same class, that class has four reasons to change.'
          ),
        },
      ],
      scenario: [
        {
          type: 'p',
          text: tx(
            'Trabajas en el microservicio de transferencias de un banco. Cuando un cliente transfiere dinero, el sistema debe:',
            'You work on a bank\'s transfers microservice. When a customer transfers money, the system must:'
          ),
        },
        {
          type: 'list',
          ordered: true,
          items: [
            tx('**Validar** las reglas: monto positivo, cuentas distintas y límite diario de S/ 10 000.', '**Validate** the rules: positive amount, different accounts and a daily limit of S/ 10,000.'),
            tx('**Guardar** la transferencia en la base de datos.', '**Save** the transfer in the database.'),
            tx('**Enviar un correo** de confirmación al cliente.', '**Send a confirmation email** to the customer.'),
            tx('**Generar el comprobante** en PDF.', '**Generate the receipt** as a PDF.'),
          ],
        },
        {
          type: 'p',
          text: tx(
            'La primera versión se escribió con prisa y todo quedó en una sola clase: `TransferenciaService`. Funciona… hasta que empiezan a llegar pedidos de cambio de áreas distintas:',
            'The first version was written in a hurry and everything ended up in a single class: `TransferenciaService`. It works… until change requests start arriving from different areas:'
          ),
        },
        {
          type: 'table',
          headers: [tx('Área', 'Area'), tx('Pedido de cambio', 'Change request'), tx('Clase que hay que tocar', 'Class to touch')],
          rows: [
            [tx('Cumplimiento', 'Compliance'), tx('Subir el límite diario a S/ 15 000', 'Raise the daily limit to S/ 15,000'), '`TransferenciaService`'],
            ['DBA', tx('Renombrar la tabla `transferencias`', 'Rename the `transferencias` table'), '`TransferenciaService`'],
            ['Marketing', tx('Cambiar el texto del correo', 'Change the email wording'), '`TransferenciaService`'],
            ['Legal', tx('Agregar el RUC del banco al PDF', 'Add the bank\'s tax ID to the PDF'), '`TransferenciaService`'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: tx('Nota', 'Note'),
          text: tx(
            'Para enfocarnos en SRP omitimos el débito y crédito de saldos: aquí solo importa cómo se reparten las responsabilidades.',
            'To focus on SRP we skip debiting and crediting balances: here we only care about how responsibilities are split.'
          ),
        },
      ],
      bad: [
        {
          type: 'p',
          text: tx(
            'Los datos de entrada llegan en un `record` sencillo:',
            'The input arrives in a simple `record`:'
          ),
        },
        java(`
import java.math.BigDecimal;

public record SolicitudTransferencia(
        String cuentaOrigen,
        String cuentaDestino,
        BigDecimal monto,
        String emailCliente) {
}`, { title: 'SolicitudTransferencia.java', unit: 'srp-bad' }),
        {
          type: 'p',
          text: tx(
            'Y esta es la clase que lo hace todo. Las líneas en rojo son trabajo que **no** es la lógica del caso de uso: SQL, correo y PDF mezclados con las reglas.',
            'And this is the class that does everything. The red lines are work that is **not** the use-case logic: SQL, email and PDF mixed with the rules.'
          ),
        },
        java(`
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class TransferenciaService {

    private static final BigDecimal LIMITE_DIARIO = new BigDecimal("10000");

!    private final JdbcTemplate jdbc;
!    private final JavaMailSender mailSender;

    public TransferenciaService(JdbcTemplate jdbc, JavaMailSender mailSender) {
        this.jdbc = jdbc;
        this.mailSender = mailSender;
    }

    public byte[] transferir(SolicitudTransferencia solicitud) {
        // 1) Reglas de negocio
        if (solicitud.monto() == null || solicitud.monto().signum() <= 0) {
            throw new IllegalArgumentException("El monto debe ser positivo");
        }
        if (solicitud.cuentaOrigen().equals(solicitud.cuentaDestino())) {
            throw new IllegalArgumentException("Las cuentas deben ser distintas");
        }
        if (solicitud.monto().compareTo(LIMITE_DIARIO) > 0) {
            throw new IllegalArgumentException("Supera el límite diario");
        }

        // 2) SQL escrito dentro del servicio
!        jdbc.update(
!                "INSERT INTO transferencias (origen, destino, monto, fecha) VALUES (?, ?, ?, ?)",
!                solicitud.cuentaOrigen(), solicitud.cuentaDestino(),
!                solicitud.monto(), LocalDateTime.now());

        // 3) Armado y envío del correo
!        SimpleMailMessage correo = new SimpleMailMessage();
!        correo.setTo(solicitud.emailCliente());
!        correo.setSubject("Transferencia realizada");
!        correo.setText("Transferiste S/ " + solicitud.monto()
!                + " a la cuenta " + solicitud.cuentaDestino());
!        mailSender.send(correo);

        // 4) Generación del PDF
        return generarPdf(solicitud);
    }

!    private byte[] generarPdf(SolicitudTransferencia solicitud) {
!        // Imagina aquí 80 líneas de fuentes, márgenes y tablas del PDF
!        String contenido = "COMPROBANTE\\nOrigen: " + solicitud.cuentaOrigen()
!                + "\\nDestino: " + solicitud.cuentaDestino()
!                + "\\nMonto: S/ " + solicitud.monto();
!        return contenido.getBytes(StandardCharsets.UTF_8);
!    }
}`, {
          title: 'TransferenciaService.java',
          tone: 'bad',
          lineNumbers: true,
          unit: 'srp-bad',
          notes: [
            tx('Los campos `JdbcTemplate` y `JavaMailSender` delatan que la clase conoce la base de datos **y** el servidor de correo.', 'The `JdbcTemplate` and `JavaMailSender` fields reveal that the class knows the database **and** the mail server.'),
            tx('El `INSERT` está escrito dentro del caso de uso: si el DBA cambia la tabla, cambias esta clase.', 'The `INSERT` lives inside the use case: if the DBA changes the table, you change this class.'),
            tx('El texto del correo está aquí: si Marketing cambia una palabra, cambias esta clase.', 'The email text lives here: if Marketing changes a word, you change this class.'),
            tx('El formato del PDF está aquí: si Legal pide un dato nuevo, cambias esta clase.', 'The PDF layout lives here: if Legal asks for a new field, you change this class.'),
          ],
        }),
      ],
      why: [
        {
          type: 'cards',
          items: [
            {
              title: tx('Qué está ocurriendo', 'What is happening'),
              text: tx(
                'Una clase mezcla cuatro trabajos (reglas, persistencia, correo y PDF) que cambian por motivos distintos y a ritmos distintos.',
                'One class mixes four jobs (rules, persistence, email and PDF) that change for different reasons and at different speeds.'
              ),
            },
            {
              title: tx('Por qué es un problema', 'Why it is a problem'),
              text: tx(
                'Cada cambio, aunque sea de una palabra en el correo, obliga a abrir y volver a probar la clase que mueve dinero. Cuanto más crece, más miedo da tocarla.',
                'Every change, even one word in the email, forces you to open and retest the class that moves money. The bigger it grows, the scarier it is to touch.'
              ),
            },
            {
              title: tx('Consecuencias en producción', 'Consequences in production'),
              text: tx(
                'Si el servidor de correo está caído, `mailSender.send()` lanza una excepción y la transferencia entera falla: un problema de notificaciones tumba una operación de dinero.',
                'If the mail server is down, `mailSender.send()` throws and the whole transfer fails: a notification problem takes down a money operation.'
              ),
            },
            {
              title: tx('Dificultades de mantenimiento', 'Maintenance pain'),
              text: tx(
                'Para probar el límite diario necesitas simular una base de datos y un servidor de correo. Dos desarrolladores que trabajan en áreas distintas editan el mismo archivo y chocan en cada merge.',
                'To test the daily limit you must fake a database and a mail server. Two developers working on different areas edit the same file and collide on every merge.'
              ),
            },
          ],
        },
        {
          type: 'details',
          title: tx('¿Cómo identifico una violación de SRP?', 'How do I spot an SRP violation?'),
          blocks: [
            {
              type: 'list',
              items: [
                tx('Su descripción necesita varias «y».', 'Its description needs several "and"s.'),
                tx('Importa cosas de mundos distintos: `java.sql`, correo, PDF, HTTP… en la misma clase.', 'It imports things from different worlds: `java.sql`, mail, PDF, HTTP… in the same class.'),
                tx('Para probar una regla pequeña tienes que simular media aplicación.', 'Testing a small rule means faking half of the application.'),
                tx('Recibe pedidos de cambio de áreas distintas del negocio.', 'It receives change requests from different business areas.'),
                tx('Aparece en casi todos los merge conflicts del equipo.', 'It shows up in almost every merge conflict of the team.'),
              ],
            },
          ],
        },
      ],
      fix: [
        {
          type: 'p',
          text: tx(
            'Vamos a extraer cada responsabilidad a su propia clase, una por una. El objetivo final: `TransferenciaService` **coordina** el caso de uso, pero no hace el trabajo detallado.',
            'We will extract each responsibility into its own class, one at a time. The end goal: `TransferenciaService` **coordinates** the use case but does not do the detailed work.'
          ),
        },
        {
          type: 'steps',
          items: [
            {
              title: tx('Dale nombre al resultado', 'Give the result a name'),
              blocks: [
                {
                  type: 'p',
                  text: tx(
                    'Creamos un `record` que representa una transferencia ya aceptada. Así todas las clases hablan del mismo objeto.',
                    'We create a `record` representing an accepted transfer, so every class talks about the same object.'
                  ),
                },
                java(`
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record Transferencia(
        UUID id,
        String cuentaOrigen,
        String cuentaDestino,
        BigDecimal monto,
        LocalDateTime fecha) {

    public static Transferencia desde(SolicitudTransferencia solicitud) {
        return new Transferencia(UUID.randomUUID(), solicitud.cuentaOrigen(),
                solicitud.cuentaDestino(), solicitud.monto(), LocalDateTime.now());
    }
}`, { title: 'Transferencia.java', unit: 'srp-good' }),
              ],
            },
            {
              title: tx('Extrae las reglas de negocio', 'Extract the business rules'),
              blocks: [
                java(`
import java.math.BigDecimal;
import org.springframework.stereotype.Component;

@Component
public class TransferenciaValidator {

    private static final BigDecimal LIMITE_DIARIO = new BigDecimal("10000");

    public void validar(SolicitudTransferencia solicitud) {
        if (solicitud.monto() == null || solicitud.monto().signum() <= 0) {
            throw new IllegalArgumentException("El monto debe ser positivo");
        }
        if (solicitud.cuentaOrigen().equals(solicitud.cuentaDestino())) {
            throw new IllegalArgumentException("Las cuentas deben ser distintas");
        }
        if (solicitud.monto().compareTo(LIMITE_DIARIO) > 0) {
            throw new IllegalArgumentException("Supera el límite diario");
        }
    }
}`, { title: 'TransferenciaValidator.java', unit: 'srp-good' }),
                {
                  type: 'p',
                  text: tx(
                    '**Razón para cambiar:** las reglas de Cumplimiento. Ahora se prueba con un test unitario simple, sin base de datos ni correo.',
                    '**Reason to change:** Compliance rules. It can now be tested with a plain unit test, no database or mail server.'
                  ),
                },
              ],
            },
            {
              title: tx('Extrae la persistencia', 'Extract persistence'),
              blocks: [
                java(`
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class TransferenciaRepository {

    private final JdbcTemplate jdbc;

    public TransferenciaRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public void guardar(Transferencia t) {
        jdbc.update("""
                INSERT INTO transferencias (id, origen, destino, monto, fecha)
                VALUES (?, ?, ?, ?, ?)
                """,
                t.id().toString(), t.cuentaOrigen(), t.cuentaDestino(), t.monto(), t.fecha());
    }
}`, { title: 'TransferenciaRepository.java', unit: 'srp-good' }),
                {
                  type: 'p',
                  text: tx(
                    '**Razón para cambiar:** la estructura de la base de datos. Es una clase concreta a propósito: en la lección de DIP verás por qué conviene convertirla en interfaz.',
                    '**Reason to change:** the database structure. It is a concrete class on purpose: in the DIP lesson you will see why turning it into an interface pays off.'
                  ),
                },
              ],
            },
            {
              title: tx('Extrae la notificación', 'Extract the notification'),
              blocks: [
                java(`
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class NotificacionService {

    private final JavaMailSender mailSender;

    public NotificacionService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void notificarTransferencia(Transferencia t, String emailCliente) {
        SimpleMailMessage correo = new SimpleMailMessage();
        correo.setTo(emailCliente);
        correo.setSubject("Transferencia realizada");
        correo.setText("Transferiste S/ " + t.monto() + " a la cuenta " + t.cuentaDestino());
        mailSender.send(correo);
    }
}`, { title: 'NotificacionService.java', unit: 'srp-good' }),
              ],
            },
            {
              title: tx('Extrae el reporte PDF', 'Extract the PDF report'),
              blocks: [
                java(`
import java.nio.charset.StandardCharsets;
import org.springframework.stereotype.Service;

@Service
public class ReporteService {

    public byte[] generarComprobante(Transferencia t) {
        // Aquí vive todo el detalle del PDF: fuentes, tablas, logo...
        String contenido = "COMPROBANTE " + t.id()
                + "\\nOrigen: " + t.cuentaOrigen()
                + "\\nDestino: " + t.cuentaDestino()
                + "\\nMonto: S/ " + t.monto();
        return contenido.getBytes(StandardCharsets.UTF_8);
    }
}`, { title: 'ReporteService.java', unit: 'srp-good' }),
              ],
            },
            {
              title: tx('Deja un servicio que coordine', 'Keep one service that coordinates'),
              blocks: [
                java(`
import org.springframework.stereotype.Service;

@Service
public class TransferenciaService {

    private final TransferenciaValidator validator;
    private final TransferenciaRepository repository;
    private final NotificacionService notificacionService;
    private final ReporteService reporteService;

    public TransferenciaService(TransferenciaValidator validator,
                                TransferenciaRepository repository,
                                NotificacionService notificacionService,
                                ReporteService reporteService) {
        this.validator = validator;
        this.repository = repository;
        this.notificacionService = notificacionService;
        this.reporteService = reporteService;
    }

!    public byte[] transferir(SolicitudTransferencia solicitud) {
!        validator.validar(solicitud);
!        Transferencia transferencia = Transferencia.desde(solicitud);
!        repository.guardar(transferencia);
!        notificacionService.notificarTransferencia(transferencia, solicitud.emailCliente());
!        return reporteService.generarComprobante(transferencia);
!    }
}`, { title: 'TransferenciaService.java', tone: 'good', unit: 'srp-good' }),
                {
                  type: 'p',
                  text: tx(
                    'Lee el método `transferir`: parece la descripción del caso de uso en español. Coordina los pasos, pero no sabe cómo se escribe SQL, cómo se arma un correo ni cómo se dibuja un PDF.',
                    'Read the `transferir` method: it reads like a description of the use case. It coordinates the steps but does not know how SQL is written, how an email is built or how a PDF is drawn.'
                  ),
                },
              ],
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: tx('SRP no significa «un solo método»', 'SRP does not mean "a single method"'),
          text: tx(
            'Una clase puede tener muchos métodos si todos sirven al mismo propósito. Un `TransferenciaRepository` con `guardar()`, `buscarPorId()` y `listarPorCuenta()` cumple SRP: todo es persistencia de transferencias y cambia por la misma razón.',
            'A class can have many methods as long as they serve the same purpose. A `TransferenciaRepository` with `guardar()`, `buscarPorId()` and `listarPorCuenta()` follows SRP: it is all transfer persistence and changes for the same reason.'
          ),
        },
        {
          type: 'callout',
          tone: 'info',
          title: tx('¿Coordinar no es otra responsabilidad?', 'Isn\'t coordinating another responsibility?'),
          text: tx(
            'Sí, y es la única que le queda: orquestar el caso de uso. `TransferenciaService` solo cambia si cambia el flujo (por ejemplo, «ya no enviamos correo, ahora es una notificación push»).',
            'Yes, and it is the only one left: orchestrating the use case. `TransferenciaService` only changes when the flow changes (for example, "we no longer send email, it is a push notification now").'
          ),
        },
      ],
      compare: [
        {
          type: 'compare',
          before: java(`
@Service
public class TransferenciaService {

    private final JdbcTemplate jdbc;          // base de datos
    private final JavaMailSender mailSender;  // correo

    public byte[] transferir(SolicitudTransferencia s) {
        // 3 if con reglas de negocio
        // INSERT INTO transferencias ...
        // armar y enviar el correo
        // dibujar el PDF
        return generarPdf(s);
    }
}`),
          after: java(`
@Service
public class TransferenciaService {

    private final TransferenciaValidator validator;
    private final TransferenciaRepository repository;
    private final NotificacionService notificacionService;
    private final ReporteService reporteService;

    // constructor con las 4 dependencias

    public byte[] transferir(SolicitudTransferencia solicitud) {
        validator.validar(solicitud);
        Transferencia transferencia = Transferencia.desde(solicitud);
        repository.guardar(transferencia);
        notificacionService.notificarTransferencia(transferencia, solicitud.emailCliente());
        return reporteService.generarComprobante(transferencia);
    }
}`),
          rows: [
            [tx('Clases', 'Classes'), tx('1 clase que lo hace todo', '1 class that does everything'), tx('5 clases pequeñas y enfocadas', '5 small, focused classes')],
            [tx('Razones para cambiar', 'Reasons to change'), tx('4 (Cumplimiento, DBA, Marketing, Legal)', '4 (Compliance, DBA, Marketing, Legal)'), tx('1 por clase', '1 per class')],
            [tx('Probar el límite diario', 'Testing the daily limit'), tx('Requiere simular BD y correo', 'Needs a fake DB and mail server'), tx('Test unitario de `TransferenciaValidator`', 'Unit test of `TransferenciaValidator`')],
            [tx('Si falla el correo', 'If email fails'), tx('Mezclado con la lógica de dinero', 'Tangled with money logic'), tx('Aislado en `NotificacionService`', 'Isolated in `NotificacionService`')],
            [tx('Trabajo en equipo', 'Teamwork'), tx('Todos editan el mismo archivo', 'Everyone edits the same file'), tx('Cada cambio toca su propia clase', 'Each change touches its own class')],
          ],
        },
      ],
      professional: [
        {
          type: 'p',
          text: tx(
            'En Spring Boot, SRP está detrás de la separación clásica por capas y de cada clase que creas:',
            'In Spring Boot, SRP is behind the classic layer split and every class you create:'
          ),
        },
        {
          type: 'list',
          items: [
            tx('`@RestController`: solo traduce HTTP ↔ objetos. Nada de reglas de negocio ni SQL.', '`@RestController`: only translates HTTP ↔ objects. No business rules, no SQL.'),
            tx('`@Service`: orquesta un caso de uso (como `TransferenciaService`).', '`@Service`: orchestrates a use case (like `TransferenciaService`).'),
            tx('`@Repository` o Spring Data: solo persistencia.', '`@Repository` or Spring Data: persistence only.'),
            tx('Validadores (`@Component` o Bean Validation con `@Valid`): reglas de entrada.', 'Validators (`@Component` or Bean Validation with `@Valid`): input rules.'),
            tx('Clientes HTTP (`RestClient`, OpenFeign): cada integración REST encapsulada en su clase.', 'HTTP clients (`RestClient`, OpenFeign): each REST integration wrapped in its own class.'),
            tx('`@RestControllerAdvice`: el manejo de errores HTTP en un solo lugar.', '`@RestControllerAdvice`: HTTP error handling in one place.'),
          ],
        },
        {
          type: 'details',
          title: tx('¿Cómo se aplica en Spring Boot?', 'How does it look in Spring Boot?'),
          blocks: [
            {
              type: 'p',
              text: tx(
                'El controlador no valida límites ni escribe SQL: recibe la petición, delega en el servicio y devuelve el PDF.',
                'The controller neither checks limits nor writes SQL: it receives the request, delegates to the service and returns the PDF.'
              ),
            },
            java(`
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/transferencias")
public class TransferenciaController {

    private final TransferenciaService transferenciaService;

    public TransferenciaController(TransferenciaService transferenciaService) {
        this.transferenciaService = transferenciaService;
    }

    @PostMapping
    public ResponseEntity<byte[]> transferir(@RequestBody SolicitudTransferencia solicitud) {
        byte[] comprobante = transferenciaService.transferir(solicitud);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .body(comprobante);
    }
}`, { title: 'TransferenciaController.java', unit: 'srp-good' }),
          ],
        },
        {
          type: 'details',
          title: tx('Siguiente nivel: el correo fuera de la transacción', 'Next level: email outside the transaction'),
          blocks: [
            {
              type: 'p',
              text: tx(
                'En producción el correo suele enviarse **después** de confirmar la transacción (con `@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)`) o publicando un evento en Kafka o RabbitMQ. Gracias a SRP, ese cambio solo toca `NotificacionService` y el punto donde se dispara el evento: las reglas y la persistencia ni se enteran.',
                'In production the email is usually sent **after** the transaction commits (with `@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)`) or by publishing an event to Kafka or RabbitMQ. Thanks to SRP, that change only touches `NotificacionService` and the place that fires the event: rules and persistence are not affected.'
              ),
            },
          ],
        },
        {
          type: 'callout',
          tone: 'danger',
          title: tx('Errores comunes', 'Common mistakes'),
          items: [
            tx('Crear una clase por método: SRP habla de razones para cambiar, no de cantidad de métodos.', 'Creating one class per method: SRP is about reasons to change, not method count.'),
            tx('Separar por capas pero dejar un `ClienteService` gigante con 40 casos de uso distintos.', 'Splitting by layers but keeping a giant `ClienteService` with 40 unrelated use cases.'),
            tx('Mover código a `Utils` o `Helper` genéricos: no reduce responsabilidades, solo las esconde.', 'Moving code into generic `Utils` or `Helper` classes: it hides responsibilities instead of separating them.'),
            tx('Dividir antes de tiempo: si una clase pequeña aún no tiene razones distintas para cambiar, no la partas.', 'Splitting too early: if a small class has no distinct reasons to change yet, leave it alone.'),
          ],
        },
      ],
      rule: [
        { type: 'rule', text: tx('Una clase debería tener una sola razón para cambiar.', 'A class should have only one reason to change.') },
        { type: 'p', text: tx('Truco para recordarlo: **si para describir tu clase necesitas la palabra «y», probablemente hace demasiado.**', 'Memory trick: **if describing your class needs the word "and", it probably does too much.**') },
        {
          type: 'five',
          problem: tx('Clases gigantes donde cambiar un área rompe otra.', 'Giant classes where changing one area breaks another.'),
          identify: tx('Importa cosas de mundos distintos o recibe pedidos de áreas distintas.', 'It imports from different worlds or gets requests from different areas.'),
          fix: tx('Extrae cada responsabilidad a su clase y deja una que coordine.', 'Extract each responsibility into its own class and keep one that coordinates.'),
          when: tx('Servicios que crecen sprint a sprint; dos áreas pidiendo cambios en el mismo archivo.', 'Services that grow every sprint; two areas requesting changes in the same file.'),
          mistakes: tx('Confundirlo con «un método por clase» o esconder código en `Helper`.', 'Confusing it with "one method per class" or hiding code in a `Helper`.'),
        },
      ],
    },
    exercises: [
      {
        id: 'srp-1',
        prompt: tx(
          'Cumplimiento pide subir el límite diario de S/ 10 000 a S/ 15 000. En el **diseño corregido**, ¿qué clase modificas?',
          'Compliance asks to raise the daily limit from S/ 10,000 to S/ 15,000. In the **fixed design**, which class do you modify?'
        ),
        options: [
          {
            id: 'a',
            text: '`TransferenciaValidator`',
            correct: true,
            explanation: tx(
              'Correcto. Las reglas de negocio viven ahí, así que es la única clase que cambia. Ni el repositorio ni el correo se enteran.',
              'Correct. The business rules live there, so it is the only class that changes. Neither the repository nor the email notice.'
            ),
          },
          {
            id: 'b',
            text: '`TransferenciaService`',
            explanation: tx(
              '`TransferenciaService` solo coordina el flujo; no conoce el valor del límite. Si tuvieras que cambiarlo ahí, la regla seguiría mezclada con la orquestación.',
              '`TransferenciaService` only coordinates the flow; it does not know the limit value. If you had to change it there, the rule would still be mixed with orchestration.'
            ),
          },
          {
            id: 'c',
            text: tx('`TransferenciaService` y `TransferenciaValidator`', '`TransferenciaService` and `TransferenciaValidator`'),
            explanation: tx(
              'Si cambiar una regla obligara a tocar dos clases, la responsabilidad estaría repartida, no separada. Basta con el validador.',
              'If changing a rule forced you to touch two classes, the responsibility would be scattered, not separated. The validator is enough.'
            ),
          },
          {
            id: 'd',
            text: tx('Todas, porque todas usan `Transferencia`', 'All of them, because they all use `Transferencia`'),
            explanation: tx(
              'Compartir un objeto no significa compartir la razón para cambiar. Las demás clases no dependen del valor del límite.',
              'Sharing an object does not mean sharing a reason to change. The other classes do not depend on the limit value.'
            ),
          },
        ],
      },
      {
        id: 'srp-2',
        prompt: tx('Revisas este servicio en un code review. ¿Qué refactorización aplica mejor SRP?', 'You review this service in a code review. Which refactoring applies SRP best?'),
        code: `@Service
public class ClienteService {

    public Cliente registrar(Cliente cliente)                     { /* reglas de alta */ }
    public Cliente actualizarDireccion(Long id, String direccion) { /* reglas de datos */ }
    public String exportarClientesCsv()                           { /* formato CSV */ }
    public void enviarBoletinMensual()                            { /* campaña de marketing */ }
}`,
        options: [
          {
            id: 'a',
            text: tx('Crear cuatro clases, una por método.', 'Create four classes, one per method.'),
            explanation: tx(
              'SRP no es «un método por clase». `registrar` y `actualizarDireccion` cambian por la misma razón (los datos del cliente) y pueden convivir.',
              'SRP is not "one method per class". `registrar` and `actualizarDireccion` change for the same reason (customer data) and can live together.'
            ),
          },
          {
            id: 'b',
            text: tx(
              'Dejar `registrar` y `actualizarDireccion`; mover el CSV a un `ClienteCsvExporter` y el boletín a un servicio de marketing.',
              'Keep `registrar` and `actualizarDireccion`; move the CSV to a `ClienteCsvExporter` and the newsletter to a marketing service.'
            ),
            correct: true,
            explanation: tx(
              'Exacto. El CSV cambia cuando cambia un formato de reporte y el boletín cuando cambia una campaña: son razones distintas a la gestión del cliente.',
              'Exactly. The CSV changes when a report format changes and the newsletter when a campaign changes: different reasons from customer management.'
            ),
          },
          {
            id: 'c',
            text: tx('Dejarla igual: todos los métodos trabajan con `Cliente`.', 'Leave it: every method works with `Cliente`.'),
            explanation: tx(
              'Usar la misma entidad no significa tener la misma razón para cambiar. Marketing y reportes modificarán esta clase por motivos ajenos al registro.',
              'Using the same entity is not the same as sharing a reason to change. Marketing and reporting will modify this class for reasons unrelated to registration.'
            ),
          },
          {
            id: 'd',
            text: tx('Convertir `ClienteService` en una interfaz con cuatro implementaciones.', 'Turn `ClienteService` into an interface with four implementations.'),
            explanation: tx(
              'Una interfaz no reduce responsabilidades: cada implementación seguiría mezclando trabajos. Es agregar abstracción sin resolver el problema.',
              'An interface does not reduce responsibilities: each implementation would still mix jobs. It adds abstraction without solving the problem.'
            ),
          },
        ],
      },
    ],
  };
}
