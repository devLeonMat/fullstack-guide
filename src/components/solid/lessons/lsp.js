import { java } from './mark.js';

export default function lsp(tx) {
  return {
    id: 'lsp',
    letter: 'L',
    color: 'indigo',
    nameEn: 'Liskov Substitution Principle',
    nameEs: 'Principio de Sustitución de Liskov',
    tagline: tx('Una implementación debe cumplir lo que promete su contrato.', 'An implementation must keep the promises of its contract.'),
    definition: tx(
      'Si tu código funciona con una interfaz, debe seguir funcionando con cualquiera de sus implementaciones.',
      'If your code works with an interface, it must keep working with any of its implementations.'
    ),
    solves: tx(
      'Errores sorpresa al cambiar una implementación por otra.',
      'Surprise failures when swapping one implementation for another.'
    ),
    focus: tx('si una implementación incumple el contrato de su interfaz', 'whether an implementation breaks its interface contract'),
    summary: {
      question: tx('¿Esta implementación cumple lo que la interfaz promete?', 'Does this implementation keep the interface\'s promises?'),
      signal: tx('`null` donde se prometió `Optional`, excepciones sorpresa, `instanceof` en el consumidor.', '`null` where `Optional` was promised, surprise exceptions, `instanceof` in the consumer.'),
      solution: tx('Documentar el contrato y corregir la implementación; tests de contrato.', 'Document the contract and fix the implementation; contract tests.'),
      example: 'CuentaRepository: SqlServer ✅ vs Oracle ❌',
    },
    visual: {
      takeaway: tx('Toda pieza que encaja en la interfaz debe cumplir el mismo contrato.', 'Every piece that fits the interface must honor the same contract.'),
      before: {
        caption: tx('una implementación rompe la promesa', 'one implementation breaks the promise'),
        description: tx('ConsultaSaldoService usa CuentaRepository. SQL Server devuelve Optional.empty(), Oracle devuelve null y el consumidor falla.', 'ConsultaSaldoService uses CuentaRepository. SQL Server returns Optional.empty(), Oracle returns null and the consumer fails.'),
        rows: [[
          { title: 'ConsultaSaldoService', note: tx('💥 falla con Oracle', '💥 fails with Oracle') },
          { arrow: 'forward', label: tx('usa', 'uses') },
          { title: 'CuentaRepository', kind: 'interface', note: tx('promete: nunca null', 'promises: never null') },
          { arrow: 'backward', label: tx('implementan', 'implement') },
          {
            group: tx('implementaciones', 'implementations'),
            items: [
              { title: 'SqlServerCuentaRepository', status: 'ok', note: 'Optional.empty()' },
              { title: 'OracleCuentaRepository', status: 'bad', note: 'null' },
            ],
          },
        ]],
      },
      after: {
        caption: tx('todas cumplen: se pueden intercambiar', 'all comply: they are interchangeable'),
        description: tx('Ambas implementaciones devuelven Optional.empty() y el consumidor funciona con cualquiera.', 'Both implementations return Optional.empty() and the consumer works with either.'),
        rows: [[
          { title: 'ConsultaSaldoService', note: tx('funciona con cualquiera', 'works with either') },
          { arrow: 'forward', label: tx('usa', 'uses') },
          { title: 'CuentaRepository', kind: 'interface', note: tx('promete: nunca null', 'promises: never null') },
          { arrow: 'backward', label: tx('implementan', 'implement') },
          {
            group: tx('implementaciones', 'implementations'),
            items: [
              { title: 'SqlServerCuentaRepository', status: 'ok', note: 'Optional.empty()' },
              { title: 'OracleCuentaRepository', status: 'ok', note: 'Optional.empty()' },
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
            'Imagina que el banco contrata a un cajero de reemplazo. Tiene el mismo uniforme y el mismo cargo, pero cuando un cliente pide un retiro que no procede, en vez de decir «no es posible» se levanta y se va. Formalmente es un cajero… pero no se comporta como uno, y el cliente queda desconcertado.',
            'Imagine the bank hires a replacement teller. Same uniform, same title, but when a customer asks for a withdrawal that cannot proceed, instead of saying "that is not possible" they just get up and leave. On paper they are a teller… but they do not behave like one, and the customer is left confused.'
          ),
        },
        {
          type: 'p',
          text: tx(
            'En código: si tu servicio funciona con una interfaz, **debe seguir funcionando igual con cualquier implementación de esa interfaz**, sin sorpresas. No basta con que compile: la implementación tiene que cumplir lo que la interfaz promete.',
            'In code: if your service works with an interface, **it must keep working the same with any implementation of it**, with no surprises. Compiling is not enough: the implementation must keep the interface\'s promises.'
          ),
        },
        {
          type: 'callout',
          tone: 'warning',
          title: tx('Implementar una interfaz en Java no garantiza cumplir Liskov', 'Implementing a Java interface does not guarantee Liskov'),
          text: tx(
            'El compilador revisa nombres y tipos de los métodos. No revisa si devuelves `null` donde prometiste `Optional.empty()`, ni si lanzas una excepción que nadie esperaba.',
            'The compiler checks method names and types. It does not check whether you return `null` where you promised `Optional.empty()`, or throw an exception nobody expected.'
          ),
        },
        {
          type: 'p',
          text: tx(
            'Antes de seguir, cinco ideas en palabras simples. A la izquierda la idea; a la derecha, el nombre técnico que verás en libros y entrevistas:',
            'Before going on, five ideas in plain words. On the left the idea; on the right, the technical name you will see in books and interviews:'
          ),
        },
        {
          type: 'concepts',
          items: [
            {
              plain: tx('«Lo que la interfaz promete»', '"What the interface promises"'),
              term: tx('Contrato', 'Contract'),
              text: tx('La firma del método **más** sus reglas escritas (Javadoc): qué recibe, qué devuelve y qué errores puede lanzar.', 'The method signature **plus** its written rules (Javadoc): what it takes, what it returns and which errors it may throw.'),
            },
            {
              plain: tx('«Lo que quien llama debe cumplir antes»', '"What the caller must satisfy first"'),
              term: tx('Precondición', 'Precondition'),
              text: tx('Ej.: «el monto debe ser positivo». Una implementación **no puede exigir más** que la interfaz.', 'E.g. "the amount must be positive". An implementation **cannot demand more** than the interface.'),
            },
            {
              plain: tx('«Lo que se garantiza al terminar»', '"What is guaranteed at the end"'),
              term: tx('Postcondición', 'Postcondition'),
              text: tx('Ej.: «nunca devuelve `null`». Una implementación **no puede garantizar menos** que la interfaz.', 'E.g. "never returns `null`". An implementation **cannot guarantee less** than the interface.'),
            },
            {
              plain: tx('«Lo que recibo en cada caso»', '"What I get in each case"'),
              term: tx('Resultados esperados', 'Expected results'),
              text: tx('Éxito, rechazo, vacío… cada caso tiene una forma acordada (`true`/`false`, `Optional.empty()`).', 'Success, rejection, empty… each case has an agreed shape (`true`/`false`, `Optional.empty()`).'),
            },
            {
              plain: tx('«Los errores anunciados»', '"The announced errors"'),
              term: tx('Excepciones permitidas', 'Allowed exceptions'),
              text: tx('Solo las que el contrato menciona. Una excepción nueva y sorpresiva rompe a quien llama.', 'Only those the contract mentions. A new, surprising exception breaks the caller.'),
            },
            {
              plain: tx('«Cambiar una pieza por otra»', '"Swapping one piece for another"'),
              term: tx('Sustitución', 'Substitution'),
              text: tx('Reemplazar una implementación por otra **sin cambiar** el código que la usa.', 'Replacing one implementation with another **without changing** the code that uses it.'),
            },
          ],
        },
      ],
      scenario: [
        {
          type: 'p',
          text: tx(
            'El banco migra parte de sus bases de datos de **SQL Server a Oracle**. El servicio que consulta saldos usa la interfaz `CuentaRepository`. El equipo de infraestructura crea `OracleCuentaRepository`, compila, sus pruebas pasan… y el día del cambio la API de saldos empieza a responder **errores 500**.',
            'The bank is migrating some databases from **SQL Server to Oracle**. The balance service uses the `CuentaRepository` interface. The infrastructure team writes `OracleCuentaRepository`, it compiles, their tests pass… and on switch day the balance API starts returning **500 errors**.'
          ),
        },
        java(`
import java.util.Optional;

public interface CuentaRepository {

    /**
     * Busca una cuenta por su id.
     *
     * @return la cuenta, u {@code Optional.empty()} si no existe.
     *         Nunca devuelve {@code null}.
     */
    Optional<Cuenta> buscarPorId(Long id);
}`, { title: tx('CuentaRepository.java — el contrato', 'CuentaRepository.java — the contract'), unit: 'lsp-good' }),
        java(`
import java.math.BigDecimal;

public record Cuenta(Long id, String numero, BigDecimal saldo) {
}`, { title: 'Cuenta.java', unit: 'lsp-good' }),
        {
          type: 'p',
          text: tx(
            'El consumidor está escrito confiando en el contrato. Si la cuenta no existe, lanza `CuentaNoEncontradaException`, que la API traduce a un **404**.',
            'The consumer is written trusting the contract. If the account does not exist it throws `CuentaNoEncontradaException`, which the API turns into a **404**.'
          ),
        },
        java(`
import java.math.BigDecimal;
import org.springframework.stereotype.Service;

@Service
public class ConsultaSaldoService {

    private final CuentaRepository cuentaRepository;

    public ConsultaSaldoService(CuentaRepository cuentaRepository) {
        this.cuentaRepository = cuentaRepository;
    }

    public BigDecimal consultarSaldo(Long cuentaId) {
        return cuentaRepository.buscarPorId(cuentaId)
                .map(Cuenta::saldo)
                .orElseThrow(() -> new CuentaNoEncontradaException(cuentaId));
    }
}`, { title: 'ConsultaSaldoService.java', unit: 'lsp-good' }),
        java(`
public class CuentaNoEncontradaException extends RuntimeException {

    public CuentaNoEncontradaException(Long id) {
        super("Cuenta " + id + " no encontrada");
    }
}`, { title: 'CuentaNoEncontradaException.java', unit: 'lsp-good' }),
        {
          type: 'p',
          text: tx('La implementación original, para SQL Server, cumple el contrato:', 'The original SQL Server implementation keeps the contract:'),
        },
        java(`
import java.util.Optional;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class SqlServerCuentaRepository implements CuentaRepository {

    private final JdbcTemplate jdbc;

    public SqlServerCuentaRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public Optional<Cuenta> buscarPorId(Long id) {
        return jdbc.query(
                        "SELECT id, numero, saldo FROM cuentas WHERE id = ?",
                        (rs, fila) -> new Cuenta(rs.getLong("id"), rs.getString("numero"),
                                rs.getBigDecimal("saldo")),
                        id)
                .stream()
!                .findFirst(); // lista vacía → Optional.empty() ✅
    }
}`, { title: 'SqlServerCuentaRepository.java', tone: 'good', unit: 'lsp-good' }),
      ],
      bad: [
        {
          type: 'p',
          text: tx('**Ejemplo 1.** La nueva implementación para Oracle:', '**Example 1.** The new Oracle implementation:'),
        },
        java(`
import java.util.Optional;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class OracleCuentaRepository implements CuentaRepository {

    private final JdbcTemplate jdbc;

    public OracleCuentaRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public Optional<Cuenta> buscarPorId(Long id) {
        try {
            // queryForObject lanza EmptyResultDataAccessException si no hay filas
            Cuenta cuenta = jdbc.queryForObject(
                    "SELECT id, numero, saldo FROM cuentas WHERE id = ?",
                    (rs, fila) -> new Cuenta(rs.getLong("id"), rs.getString("numero"),
                            rs.getBigDecimal("saldo")),
                    id);
            return Optional.of(cuenta);
!        } catch (EmptyResultDataAccessException e) {
!            return null; // «no hay cuenta» expresado como null 😬
!        }
    }
}`, {
          title: 'OracleCuentaRepository.java',
          tone: 'bad',
          lineNumbers: true,
          unit: 'lsp-bad',
          notes: [
            tx('Compila sin errores: el tipo de retorno es `Optional<Cuenta>` y `null` es un valor válido para el compilador.', 'It compiles cleanly: the return type is `Optional<Cuenta>` and `null` is a valid value for the compiler.'),
            tx('Pero el contrato decía «nunca devuelve `null`». Esta implementación **garantiza menos** de lo prometido.', 'But the contract said "never returns `null`". This implementation **guarantees less** than promised.'),
          ],
        }),
        {
          type: 'details',
          title: tx('Variante igual de peligrosa: dejar escapar la excepción', 'Equally dangerous variant: letting the exception escape'),
          blocks: [
            java(`
    @Override
    public Optional<Cuenta> buscarPorId(Long id) {
!        Cuenta cuenta = jdbc.queryForObject(SQL, MAPPER, id); // sin filas → excepción
        return Optional.of(cuenta);
    }`, { tone: 'bad' }),
            {
              type: 'p',
              text: tx(
                'Si no hay filas, `EmptyResultDataAccessException` sale del repositorio. El contrato no la anuncia: el consumidor esperaba un `Optional` vacío y recibe una excepción técnica de Spring.',
                'With no rows, `EmptyResultDataAccessException` escapes the repository. The contract does not announce it: the consumer expected an empty `Optional` and gets a technical Spring exception.'
              ),
            },
          ],
        },
        {
          type: 'p',
          text: tx(
            '**Ejemplo 2.** Un contrato de retiros. Lee con atención el Javadoc: define precondición y resultados esperados.',
            '**Example 2.** A withdrawal contract. Read the Javadoc carefully: it defines the precondition and the expected results.'
          ),
        },
        java(`
import java.math.BigDecimal;

public interface ServicioRetiro {

    /**
     * Retira dinero de una cuenta.
     *
     * Precondición: monto mayor que cero; si no, lanza IllegalArgumentException.
     *
     * @return true si el retiro se realizó;
     *         false si fue rechazado por reglas de negocio
     *         (saldo insuficiente, monto no permitido, límites...).
     */
    boolean retirar(String numeroCuenta, BigDecimal monto);
}`, { title: 'ServicioRetiro.java', unit: 'lsp-retiro-bad' }),
        java(`
import java.math.BigDecimal;

public interface SaldoRepository {

    BigDecimal saldoDe(String numeroCuenta);

    void actualizar(String numeroCuenta, BigDecimal nuevoSaldo);
}`, { title: 'SaldoRepository.java', unit: 'lsp-retiro-bad' }),
        {
          type: 'p',
          text: tx('El consumidor confía en el `boolean`:', 'The consumer trusts the `boolean`:'),
        },
        java(`
import java.math.BigDecimal;

public class OperacionRetiroService {

    private final ServicioRetiro servicioRetiro;

    public OperacionRetiroService(ServicioRetiro servicioRetiro) {
        this.servicioRetiro = servicioRetiro;
    }

    public String ejecutar(String numeroCuenta, BigDecimal monto) {
        if (servicioRetiro.retirar(numeroCuenta, monto)) {
            return "Retiro exitoso";
        }
        return "Retiro rechazado: revisa tu saldo o el monto";
    }
}`, { title: 'OperacionRetiroService.java', unit: 'lsp-retiro-bad' }),
        {
          type: 'p',
          text: tx('Y esta implementación para cajeros automáticos rompe el contrato de dos maneras:', 'And this ATM implementation breaks the contract in two ways:'),
        },
        java(`
import java.math.BigDecimal;

public class RetiroCajeroAutomatico implements ServicioRetiro {

    private static final BigDecimal BILLETE_MINIMO = new BigDecimal("20");

    private final SaldoRepository saldos;

    public RetiroCajeroAutomatico(SaldoRepository saldos) {
        this.saldos = saldos;
    }

    @Override
    public boolean retirar(String numeroCuenta, BigDecimal monto) {
        if (monto == null || monto.signum() <= 0) {
            throw new IllegalArgumentException("El monto debe ser positivo");
        }
!        if (monto.remainder(BILLETE_MINIMO).signum() != 0) {
!            throw new IllegalArgumentException("Solo múltiplos de 20"); // exige MÁS que el contrato
!        }
        BigDecimal saldo = saldos.saldoDe(numeroCuenta);
!        if (saldo.compareTo(monto) < 0) {
!            throw new SaldoInsuficienteException(numeroCuenta); // el contrato decía: return false
!        }
        saldos.actualizar(numeroCuenta, saldo.subtract(monto));
        return true;
    }
}`, {
          title: 'RetiroCajeroAutomatico.java',
          tone: 'bad',
          lineNumbers: true,
          unit: 'lsp-retiro-bad',
        }),
        java(`
public class SaldoInsuficienteException extends RuntimeException {

    public SaldoInsuficienteException(String numeroCuenta) {
        super("Saldo insuficiente en la cuenta " + numeroCuenta);
    }
}`, { title: 'SaldoInsuficienteException.java', unit: 'lsp-retiro-bad' }),
      ],
      why: [
        {
          type: 'switcher',
          title: tx('¿Qué ocurre si cambiamos la implementación?', 'What happens if we swap the implementation?'),
          prompt: tx('Elige qué implementación inyecta Spring y mira qué pasa con la misma llamada:', 'Pick which implementation Spring injects and watch what happens to the same call:'),
          call: 'consultaSaldoService.consultarSaldo(999L) // la cuenta 999 no existe',
          options: [
            {
              id: 'sqlserver',
              label: 'SqlServerCuentaRepository',
              result: [
                { label: 'buscarPorId(999L)', value: 'Optional.empty()', tone: 'ok' },
                { label: '.map(Cuenta::saldo)', value: tx('Optional.empty() (no hace nada)', 'Optional.empty() (no-op)'), tone: 'ok' },
                { label: '.orElseThrow(...)', value: 'CuentaNoEncontradaException', tone: 'ok' },
                { label: tx('Respuesta HTTP', 'HTTP response'), value: tx('404 — «Cuenta 999 no encontrada»', '404 — "Cuenta 999 no encontrada"'), tone: 'ok' },
              ],
              verdict: tx('El consumidor funciona como fue diseñado.', 'The consumer works as designed.'),
            },
            {
              id: 'oracle-null',
              label: tx('OracleCuentaRepository (devuelve null)', 'OracleCuentaRepository (returns null)'),
              result: [
                { label: 'buscarPorId(999L)', value: 'null', tone: 'bad' },
                { label: '.map(Cuenta::saldo)', value: '💥 NullPointerException', tone: 'bad' },
                { label: '.orElseThrow(...)', value: tx('nunca se ejecuta', 'never runs'), tone: 'bad' },
                { label: tx('Respuesta HTTP', 'HTTP response'), value: '500 — Internal Server Error', tone: 'bad' },
              ],
              verdict: tx('El código del consumidor no cambió, pero ahora falla. El culpable es la implementación.', 'The consumer code did not change, yet it fails. The culprit is the implementation.'),
            },
            {
              id: 'oracle-throw',
              label: tx('OracleCuentaRepository (deja escapar la excepción)', 'OracleCuentaRepository (lets the exception escape)'),
              result: [
                { label: 'buscarPorId(999L)', value: '💥 EmptyResultDataAccessException', tone: 'bad' },
                { label: '.map(Cuenta::saldo)', value: tx('nunca se ejecuta', 'never runs'), tone: 'bad' },
                { label: '.orElseThrow(...)', value: tx('nunca se ejecuta', 'never runs'), tone: 'bad' },
                { label: tx('Respuesta HTTP', 'HTTP response'), value: '500 — Internal Server Error', tone: 'bad' },
              ],
              verdict: tx('Una excepción no anunciada en el contrato atraviesa al consumidor.', 'An exception the contract never announced crashes through the consumer.'),
            },
          ],
        },
        {
          type: 'cards',
          items: [
            {
              title: tx('Qué está ocurriendo', 'What is happening'),
              text: tx(
                'Oracle expresa «no existe» con `null` (o con una excepción). El consumidor, escrito según el contrato, llama a `.map()` sobre `null` y explota.',
                'Oracle expresses "not found" with `null` (or an exception). The consumer, written to the contract, calls `.map()` on `null` and blows up.'
              ),
            },
            {
              title: tx('Por qué es un problema', 'Why it is a problem'),
              text: tx(
                'El error está en la implementación, pero el stack trace apunta al consumidor. Alguien perderá horas «arreglando» `ConsultaSaldoService`, que estaba bien.',
                'The bug is in the implementation, but the stack trace points to the consumer. Someone will waste hours "fixing" `ConsultaSaldoService`, which was fine.'
              ),
            },
            {
              title: tx('Consecuencias en producción', 'Consequences in production'),
              text: tx(
                'Un 404 legítimo se convierte en 500: la app móvil muestra «error inesperado» en vez de «la cuenta no existe», saltan alertas y alguien de guardia se despierta de madrugada.',
                'A legitimate 404 turns into a 500: the mobile app shows "unexpected error" instead of "account not found", alerts fire and someone on call wakes up at dawn.'
              ),
            },
            {
              title: tx('Dificultades de mantenimiento', 'Maintenance pain'),
              text: tx(
                'Los consumidores empiezan a defenderse con `if (resultado == null)` y `try/catch` por todos lados. La interfaz pierde su valor: hay que saber qué implementación hay detrás.',
                'Consumers start defending themselves with `if (resultado == null)` and `try/catch` everywhere. The interface loses its value: you must know which implementation is behind it.'
              ),
            },
          ],
        },
        {
          type: 'p',
          text: tx('En el **ejemplo 2** (retiros) hay dos violaciones distintas:', 'In **example 2** (withdrawals) there are two different violations:'),
        },
        {
          type: 'list',
          tone: 'bad',
          items: [
            tx(
              '**Precondición más fuerte.** El contrato acepta cualquier monto positivo; el cajero rechaza S/ 35 con `IllegalArgumentException`. Un consumidor correcto que envía 35 recibe un error que el contrato decía que no ocurriría. Que el cajero solo entregue billetes de 20 es una **regla de negocio**: debe devolver `false`.',
              '**Stronger precondition.** The contract accepts any positive amount; the ATM rejects S/ 35 with `IllegalArgumentException`. A correct consumer sending 35 gets an error the contract said would not happen. The ATM only dispensing 20s is a **business rule**: it must return `false`.'
            ),
            tx(
              '**Excepción no anunciada.** Con saldo insuficiente el contrato dice `false`, pero se lanza `SaldoInsuficienteException`. El `if` del consumidor nunca llega a «Retiro rechazado» y el usuario ve un error 500.',
              '**Unannounced exception.** With insufficient balance the contract says `false`, but `SaldoInsuficienteException` is thrown. The consumer\'s `if` never reaches "Retiro rechazado" and the user sees a 500.'
            ),
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: tx('El problema no son las excepciones', 'Exceptions are not the problem'),
          text: tx(
            'Si el contrato dijera «lanza `SaldoInsuficienteException` cuando no hay saldo», lanzarla sería correcto… y **todas** las implementaciones deberían hacerlo. LSP no prefiere `boolean` ni excepciones: exige que todas las implementaciones respeten el **mismo** acuerdo.',
            'If the contract said "throws `SaldoInsuficienteException` when there is no balance", throwing it would be correct… and **every** implementation would have to do it. LSP does not prefer `boolean` over exceptions: it requires every implementation to honor the **same** agreement.'
          ),
        },
        {
          type: 'details',
          title: tx('¿Cómo identifico una violación de LSP?', 'How do I spot an LSP violation?'),
          blocks: [
            {
              type: 'list',
              items: [
                tx('El consumidor usa `instanceof` para tratar una implementación «especial».', 'The consumer uses `instanceof` to handle a "special" implementation.'),
                tx('Comprobaciones de `null` «por si acaso» tras llamar a un método que promete no devolverlo.', '"Just in case" `null` checks after calling a method that promises never to return it.'),
                tx('`UnsupportedOperationException` en métodos que forman parte del contrato.', '`UnsupportedOperationException` in methods that are part of the contract.'),
                tx('Tests que pasan con una implementación y fallan con otra.', 'Tests that pass with one implementation and fail with another.'),
                tx('Validaciones más estrictas en una implementación que en la interfaz.', 'Stricter validations in an implementation than in the interface.'),
              ],
            },
          ],
        },
      ],
      fix: [
        {
          type: 'p',
          text: tx(
            'La corrección no toca a los consumidores: se arreglan las implementaciones para que cumplan el contrato, y se blinda el contrato con tests.',
            'The fix does not touch consumers: the implementations are fixed to honor the contract, and the contract is locked in with tests.'
          ),
        },
        {
          type: 'steps',
          items: [
            {
              title: tx('Haz explícito el contrato', 'Make the contract explicit'),
              blocks: [
                {
                  type: 'p',
                  text: tx(
                    'Si el contrato no está escrito, cada implementador lo inventa. El Javadoc de `CuentaRepository` y `ServicioRetiro` responde: ¿qué pasa si no existe?, ¿puede devolver `null`?, ¿qué excepciones lanza?, ¿qué significa `false`?',
                    'If the contract is not written down, every implementer makes it up. The Javadoc of `CuentaRepository` and `ServicioRetiro` answers: what if it does not exist? can it return `null`? which exceptions? what does `false` mean?'
                  ),
                },
              ],
            },
            {
              title: tx('Corrige la implementación de Oracle', 'Fix the Oracle implementation'),
              blocks: [
                java(`
import java.util.Optional;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class OracleCuentaRepository implements CuentaRepository {

    private static final String SQL = "SELECT id, numero, saldo FROM cuentas WHERE id = ?";
    private static final RowMapper<Cuenta> MAPPER = (rs, fila) ->
            new Cuenta(rs.getLong("id"), rs.getString("numero"), rs.getBigDecimal("saldo"));

    private final JdbcTemplate jdbc;

    public OracleCuentaRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public Optional<Cuenta> buscarPorId(Long id) {
        try {
            return Optional.ofNullable(jdbc.queryForObject(SQL, MAPPER, id));
!        } catch (EmptyResultDataAccessException e) {
!            return Optional.empty(); // ✅ «no existe» como pide el contrato
!        }
    }
}`, { title: 'OracleCuentaRepository.java', tone: 'good', unit: 'lsp-good' }),
                {
                  type: 'p',
                  text: tx(
                    'La excepción técnica de Spring se queda **dentro** del repositorio y se traduce al lenguaje del contrato.',
                    'The technical Spring exception stays **inside** the repository and is translated into the contract\'s language.'
                  ),
                },
              ],
            },
            {
              title: tx('Corrige el cajero automático', 'Fix the ATM'),
              blocks: [
                java(`
import java.math.BigDecimal;

public class RetiroCajeroAutomatico implements ServicioRetiro {

    private static final BigDecimal BILLETE_MINIMO = new BigDecimal("20");

    private final SaldoRepository saldos;

    public RetiroCajeroAutomatico(SaldoRepository saldos) {
        this.saldos = saldos;
    }

    @Override
    public boolean retirar(String numeroCuenta, BigDecimal monto) {
        if (monto == null || monto.signum() <= 0) {
            throw new IllegalArgumentException("El monto debe ser positivo"); // ✅ anunciada
        }
        if (monto.remainder(BILLETE_MINIMO).signum() != 0) {
!            return false; // ✅ regla del cajero = rechazo de negocio
        }
        BigDecimal saldo = saldos.saldoDe(numeroCuenta);
        if (saldo.compareTo(monto) < 0) {
!            return false; // ✅ saldo insuficiente = rechazo de negocio
        }
        saldos.actualizar(numeroCuenta, saldo.subtract(monto));
        return true;
    }
}`, { title: 'RetiroCajeroAutomatico.java', tone: 'good', unit: 'lsp-retiro-good' }),
                {
                  type: 'p',
                  text: tx(
                    'Fíjate: la `IllegalArgumentException` por monto negativo **sí** está permitida, porque el contrato la anuncia como precondición. Lo que no se permite es inventar excepciones nuevas ni exigir más que la interfaz.',
                    'Notice: the `IllegalArgumentException` for a negative amount **is** allowed, because the contract announces it as a precondition. What is not allowed is inventing new exceptions or demanding more than the interface.'
                  ),
                },
              ],
            },
            {
              title: tx('Protege el contrato con tests', 'Protect the contract with tests'),
              blocks: [
                {
                  type: 'p',
                  text: tx(
                    'Un **test de contrato** es una clase de test abstracta que **todas** las implementaciones heredan. Si una no cumple, su build falla antes de llegar a producción.',
                    'A **contract test** is an abstract test class that **every** implementation inherits. If one does not comply, its build fails before reaching production.'
                  ),
                },
                java(`
import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

abstract class CuentaRepositoryContractTest {

    // Cada implementación (SQL Server, Oracle...) entrega su instancia aquí
    protected abstract CuentaRepository repositorio();

    @Test
    void devuelveOptionalVacioCuandoLaCuentaNoExiste() {
        assertThat(repositorio().buscarPorId(-1L))
                .isNotNull()
                .isEmpty();
    }
}`, { title: 'CuentaRepositoryContractTest.java', unit: 'lsp-good' }),
                {
                  type: 'p',
                  text: tx(
                    '`SqlServerCuentaRepositoryTest` y `OracleCuentaRepositoryTest` extienden esta clase (por ejemplo, con Testcontainers para levantar cada base de datos).',
                    '`SqlServerCuentaRepositoryTest` and `OracleCuentaRepositoryTest` extend this class (for example, using Testcontainers to start each database).'
                  ),
                },
              ],
            },
          ],
        },
      ],
      compare: [
        {
          type: 'compare',
          before: java(`
@Override
public Optional<Cuenta> buscarPorId(Long id) {
    try {
        return Optional.of(jdbc.queryForObject(SQL, MAPPER, id));
    } catch (EmptyResultDataAccessException e) {
!        return null;
    }
}`),
          after: java(`
@Override
public Optional<Cuenta> buscarPorId(Long id) {
    try {
        return Optional.ofNullable(jdbc.queryForObject(SQL, MAPPER, id));
    } catch (EmptyResultDataAccessException e) {
!        return Optional.empty();
    }
}`),
          rows: [
            [tx('Cuenta inexistente', 'Missing account'), tx('Oracle devuelve `null`', 'Oracle returns `null`'), tx('`Optional.empty()`, igual que SQL Server', '`Optional.empty()`, same as SQL Server')],
            [tx('Respuesta de la API', 'API response'), tx('`NullPointerException` → 500', '`NullPointerException` → 500'), tx('`CuentaNoEncontradaException` → 404', '`CuentaNoEncontradaException` → 404')],
            [tx('Retiro sin saldo', 'Withdrawal without balance'), tx('Lanza `SaldoInsuficienteException`', 'Throws `SaldoInsuficienteException`'), tx('Devuelve `false`', 'Returns `false`')],
            [tx('S/ 35 en el cajero', 'S/ 35 at the ATM'), tx('`IllegalArgumentException` (exige de más)', '`IllegalArgumentException` (demands more)'), tx('Devuelve `false` (regla de negocio)', 'Returns `false` (business rule)')],
            [tx('Cambiar de implementación', 'Swapping implementations'), tx('Hay que revisar a todos los consumidores', 'Every consumer must be reviewed'), tx('Transparente: el consumidor no cambia', 'Transparent: the consumer does not change')],
          ],
        },
      ],
      professional: [
        {
          type: 'p',
          text: tx('LSP aparece cada vez que una interfaz tiene más de una implementación real:', 'LSP shows up whenever an interface has more than one real implementation:'),
        },
        {
          type: 'list',
          items: [
            tx('Repositorios con varias bases de datos (SQL Server, Oracle, en memoria para tests).', 'Repositories over several databases (SQL Server, Oracle, in-memory for tests).'),
            tx('Spring Data ya sigue la convención: `findById` devuelve `Optional`. Tus repositorios propios deben respetar la misma.', 'Spring Data already follows the convention: `findById` returns `Optional`. Your own repositories should do the same.'),
            tx('Integraciones REST intercambiables (dos bancos corresponsales detrás de una misma interfaz): si uno lanza excepción y otro devuelve un código de error, el consumidor se rompe al cambiar de proveedor.', 'Interchangeable REST integrations (two correspondent banks behind one interface): if one throws and the other returns an error code, the consumer breaks when switching providers.'),
            tx('Fakes y mocks en tests: un fake que se comporta distinto al real da tests verdes y producción roja.', 'Fakes and mocks in tests: a fake that behaves differently from the real thing gives green tests and red production.'),
            tx('Decoradores (caché, métricas, reintentos): deben respetar el mismo contrato que envuelven.', 'Decorators (cache, metrics, retries): they must honor the same contract they wrap.'),
          ],
        },
        {
          type: 'details',
          title: tx('¿Cómo se aplica en Spring Boot?', 'How does it look in Spring Boot?'),
          blocks: [
            {
              type: 'p',
              text: tx(
                'Este manejador global traduce la excepción del consumidor a un 404. Funciona **solo si** el repositorio cumple su contrato: si una implementación devuelve `null`, el error nunca llega aquí como 404, escapa como `NullPointerException` y termina en 500.',
                'This global handler turns the consumer\'s exception into a 404. It works **only if** the repository keeps its contract: if an implementation returns `null`, the error never arrives here as a 404; it escapes as a `NullPointerException` and ends up as a 500.'
              ),
            },
            java(`
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ManejadorErrores {

    @ExceptionHandler(CuentaNoEncontradaException.class)
    public ProblemDetail cuentaNoEncontrada(CuentaNoEncontradaException e) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
    }
}`, { title: 'ManejadorErrores.java', unit: 'lsp-good' }),
          ],
        },
        {
          type: 'details',
          title: tx('¿Y el famoso ejemplo de aves y pingüinos?', 'What about the famous birds and penguins example?'),
          blocks: [
            {
              type: 'p',
              text: tx(
                'Es el ejemplo clásico de los libros: `Pinguino` hereda de `Ave`, pero no puede cumplir `volar()`. Ilustra lo mismo que viste aquí: un subtipo que no puede cumplir lo que promete el tipo base. Ahora ya sabes reconocerlo en código real, no solo en animales.',
                'It is the classic textbook example: `Pinguino` extends `Ave` but cannot fulfil `volar()`. It shows the same thing you saw here: a subtype that cannot keep the base type\'s promises. Now you can spot it in real code, not just with animals.'
              ),
            },
          ],
        },
        {
          type: 'callout',
          tone: 'danger',
          title: tx('Errores comunes', 'Common mistakes'),
          items: [
            tx('Pensar que «compila» significa «cumple».', 'Thinking "it compiles" means "it complies".'),
            tx('No documentar el contrato: ¿puede devolver `null`?, ¿qué excepciones lanza?', 'Not documenting the contract: can it return `null`? which exceptions does it throw?'),
            tx('Lanzar `UnsupportedOperationException` en métodos del contrato.', 'Throwing `UnsupportedOperationException` from contract methods.'),
            tx('Usar `instanceof` en el consumidor para tratar casos especiales.', 'Using `instanceof` in the consumer to handle special cases.'),
            tx('Endurecer validaciones en una implementación (exigir más de lo que pide la interfaz).', 'Tightening validations in one implementation (demanding more than the interface).'),
          ],
        },
      ],
      rule: [
        { type: 'rule', text: tx('Una implementación debe cumplir lo que promete su contrato.', 'An implementation must keep the promises of its contract.') },
        { type: 'p', text: tx('Truco para recordarlo: **si cambias la implementación y el consumidor se entera, rompiste Liskov.**', 'Memory trick: **if you swap the implementation and the consumer notices, you broke Liskov.**') },
        {
          type: 'five',
          problem: tx('Errores sorpresa al sustituir una implementación por otra.', 'Surprise failures when substituting one implementation for another.'),
          identify: tx('`null` inesperados, excepciones no anunciadas, `instanceof`, validaciones extra.', 'Unexpected `null`s, unannounced exceptions, `instanceof`, extra validations.'),
          fix: tx('Escribir el contrato, corregir la implementación y agregar tests de contrato.', 'Write the contract, fix the implementation and add contract tests.'),
          when: tx('Siempre que una interfaz tenga varias implementaciones (BD, proveedores, fakes).', 'Whenever an interface has several implementations (DBs, providers, fakes).'),
          mistakes: tx('Creer que el compilador lo garantiza o pensar que LSP prohíbe las excepciones.', 'Believing the compiler guarantees it, or thinking LSP forbids exceptions.'),
        },
      ],
    },
    exercises: [
      {
        id: 'lsp-1',
        prompt: tx(
          '`OracleCuentaRepository` (versión original) compila sin errores. ¿Por qué viola LSP?',
          '`OracleCuentaRepository` (original version) compiles cleanly. Why does it violate LSP?'
        ),
        options: [
          {
            id: 'a',
            text: tx('Porque usa Oracle en lugar de SQL Server.', 'Because it uses Oracle instead of SQL Server.'),
            explanation: tx(
              'La tecnología no importa. Una implementación con Oracle puede cumplir el contrato perfectamente (la versión corregida lo hace).',
              'The technology does not matter. An Oracle implementation can keep the contract perfectly (the fixed version does).'
            ),
          },
          {
            id: 'b',
            text: tx(
              'Porque devuelve `null` cuando el contrato promete `Optional.empty()`, y el consumidor que funcionaba con SQL Server falla con Oracle.',
              'Because it returns `null` when the contract promises `Optional.empty()`, and the consumer that worked with SQL Server fails with Oracle.'
            ),
            correct: true,
            explanation: tx(
              'Correcto. Garantiza menos de lo prometido (postcondición rota), así que no es sustituible por SQL Server sin romper al consumidor.',
              'Correct. It guarantees less than promised (broken postcondition), so it cannot replace SQL Server without breaking the consumer.'
            ),
          },
          {
            id: 'c',
            text: tx('Porque usa `try/catch`.', 'Because it uses `try/catch`.'),
            explanation: tx(
              'El `try/catch` no es el problema: la versión corregida también lo usa. El problema es lo que devuelve dentro del `catch`.',
              'The `try/catch` is not the problem: the fixed version uses it too. The problem is what it returns inside the `catch`.'
            ),
          },
          {
            id: 'd',
            text: tx('Porque implementa una interfaz en lugar de extender una clase abstracta.', 'Because it implements an interface instead of extending an abstract class.'),
            explanation: tx(
              'LSP aplica igual a interfaces y a herencia de clases. Lo que importa es cumplir el contrato.',
              'LSP applies equally to interfaces and class inheritance. What matters is honoring the contract.'
            ),
          },
        ],
      },
      {
        id: 'lsp-2',
        prompt: tx(
          'Crearás `RetiroBancaMovil implements ServicioRetiro`. Por seguridad, la banca móvil no permite retiros mayores a S/ 500. ¿Cómo debe rechazar un retiro de S/ 800 para respetar el contrato?',
          'You will create `RetiroBancaMovil implements ServicioRetiro`. For security, mobile banking does not allow withdrawals above S/ 500. How should it reject an S/ 800 withdrawal to honor the contract?'
        ),
        options: [
          {
            id: 'a',
            text: tx('Lanzar una nueva `LimiteExcedidoException`.', 'Throw a new `LimiteExcedidoException`.'),
            explanation: tx(
              'El contrato no anuncia esa excepción. Los consumidores existentes (como `OperacionRetiroService`) no la esperan y fallarían.',
              'The contract does not announce that exception. Existing consumers (like `OperacionRetiroService`) do not expect it and would fail.'
            ),
          },
          {
            id: 'b',
            text: tx('Devolver `false`.', 'Return `false`.'),
            correct: true,
            explanation: tx(
              'Correcto. Un límite es una regla de negocio, y el contrato dice que los rechazos de negocio se expresan con `false`.',
              'Correct. A limit is a business rule, and the contract says business rejections are expressed with `false`.'
            ),
          },
          {
            id: 'c',
            text: tx('Devolver `true` sin hacer el retiro.', 'Return `true` without withdrawing.'),
            explanation: tx(
              '`true` significa «el retiro se realizó». Mentir en el resultado es la peor violación: el cliente cree que tiene su dinero.',
              '`true` means "the withdrawal happened". Lying in the result is the worst violation: the customer believes they got their money.'
            ),
          },
          {
            id: 'd',
            text: tx('Lanzar `IllegalArgumentException`, como con los montos negativos.', 'Throw `IllegalArgumentException`, as with negative amounts.'),
            explanation: tx(
              'S/ 800 cumple la precondición (es positivo). Rechazarlo con `IllegalArgumentException` sería exigir más que el contrato: una precondición más fuerte.',
              'S/ 800 satisfies the precondition (it is positive). Rejecting it with `IllegalArgumentException` would demand more than the contract: a stronger precondition.'
            ),
          },
        ],
      },
    ],
  };
}
