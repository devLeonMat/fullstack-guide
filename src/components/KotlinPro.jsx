import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Zap, GitBranch, Layers, Server, ArrowRight } from 'lucide-react';
import { SiKotlin } from 'react-icons/si';
import CodeBlock from './CodeBlock';
import InterviewQA from './languages/InterviewQA';
import WorkNote from './languages/WorkNote';
import { buildKotlinInterview } from './languages/kotlin';
import { useLanguage } from '../contexts/LanguageContext';

// ─── Null Safety Diagram ─────────────────────────────────────────────────────

const NullSafetyDiagram = ({ tx }) => {
  const [side, setSide] = useState('java');

  useEffect(() => {
    const id = setInterval(() => setSide(s => s === 'java' ? 'kotlin' : 'java'), 2000);
    return () => clearInterval(id);
  }, []);

  const isJava = side === 'java';

  return (
    <div className="bg-slate-950/40 border border-violet-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-violet-300 uppercase tracking-wider">
        {isJava
          ? tx('Java — NullPointerException en runtime', 'Java — NullPointerException at runtime')
          : tx('Kotlin — Null Safety en tiempo de compilación', 'Kotlin — Null Safety at compile time')}
      </p>

      <div className="grid grid-cols-2 gap-3">
        {/* Java column */}
        <motion.div
          animate={{ boxShadow: isJava ? '0 0 20px rgba(239,68,68,0.35)' : '0 0 0px transparent' }}
          className={`flex flex-col gap-2 p-3 rounded-xl border transition-all ${isJava ? 'border-red-500/40 bg-red-500/5' : 'border-slate-700/40 bg-slate-800/20'}`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-red-400 font-bold text-xs">Java</span>
            <span className="ml-auto text-xs text-red-400/70">{tx('Runtime crash', 'Runtime crash')}</span>
          </div>
          {[
            { label: 'String s = null;', color: 'border-slate-600/40 text-slate-400 bg-slate-700/20' },
            { label: 's.length()', color: 'border-slate-600/40 text-slate-400 bg-slate-700/20' },
            { label: '💥 NullPointerException', color: 'border-red-500/50 text-red-300 bg-red-500/10' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              animate={{ opacity: isJava ? 1 : 0.35, x: isJava ? 0 : -3 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={`border rounded-lg px-2 py-1 text-center text-xs font-mono font-semibold ${item.color}`}
            >
              {item.label}
            </motion.div>
          ))}
        </motion.div>

        {/* Kotlin column */}
        <motion.div
          animate={{ boxShadow: !isJava ? '0 0 20px rgba(139,92,246,0.35)' : '0 0 0px transparent' }}
          className={`flex flex-col gap-2 p-3 rounded-xl border transition-all ${!isJava ? 'border-violet-500/40 bg-violet-500/5' : 'border-slate-700/40 bg-slate-800/20'}`}
        >
          <div className="flex items-center gap-2 mb-1">
            <SiKotlin className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-violet-300 font-bold text-xs">Kotlin</span>
            <span className="ml-auto text-xs text-green-400/70">{tx('Compile check', 'Compile check')}</span>
          </div>
          {[
            { label: 'val s: String? = null', color: 'border-violet-500/30 text-violet-300 bg-violet-500/10' },
            { label: 's?.length ?: 0', color: 'border-violet-500/30 text-violet-300 bg-violet-500/10' },
            { label: '✓ Safe — returns 0', color: 'border-green-500/40 text-green-300 bg-green-500/10' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              animate={{ opacity: !isJava ? 1 : 0.35, x: !isJava ? 0 : 3 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={`border rounded-lg px-2 py-1 text-center text-xs font-mono font-semibold ${item.color}`}
            >
              {item.label}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <p className="text-xs text-slate-500 text-center">
        {tx('El compilador de Kotlin obliga a manejar nulls explícitamente', 'The Kotlin compiler forces you to handle nulls explicitly')}
      </p>
    </div>
  );
};

// ─── Functional Chain Diagram ────────────────────────────────────────────────

const FunctionalChainDiagram = ({ tx }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      label: 'filter { it % 2 == 0 }',
      output: '[2, 4]',
      color: 'border-violet-500/50 text-violet-300 bg-violet-500/10',
    },
    {
      label: 'map { it * it }',
      output: '[4, 16]',
      color: 'border-purple-500/50 text-purple-300 bg-purple-500/10',
    },
    {
      label: 'reduce { a, b -> a + b }',
      output: '20',
      color: 'border-fuchsia-500/50 text-fuchsia-300 bg-fuchsia-500/10',
    },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveStep(s => (s + 1) % steps.length), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-violet-500/20 rounded-xl p-4 space-y-3">
      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">
        {tx('Pipeline funcional — [1,2,3,4,5]', 'Functional pipeline — [1,2,3,4,5]')}
      </p>

      <div className="flex flex-wrap items-center gap-2 justify-center">
        <div className="border border-slate-600/40 text-slate-300 bg-slate-700/20 rounded-lg px-3 py-1.5 text-xs font-mono font-semibold">
          [1, 2, 3, 4, 5]
        </div>
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            <motion.span
              animate={{ opacity: activeStep >= i ? 1 : 0.25 }}
              transition={{ duration: 0.3 }}
              className="text-violet-500/70 text-sm"
            >
              →
            </motion.span>
            <motion.div
              animate={{
                boxShadow: activeStep === i ? '0 0 16px rgba(139,92,246,0.5)' : '0 0 0px transparent',
                scale: activeStep === i ? 1.07 : 1,
              }}
              transition={{ duration: 0.3 }}
              className={`border rounded-lg px-2.5 py-1.5 text-xs font-mono font-semibold transition-all ${step.color} ${activeStep === i ? 'opacity-100' : 'opacity-40'}`}
            >
              <div>{step.label}</div>
              {activeStep === i && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-400 text-xs mt-0.5"
                >
                  → {step.output}
                </motion.div>
              )}
            </motion.div>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-500 text-center">
        {tx('Resultado final: 20 (lazy con Sequence evita iteraciones intermedias)', 'Final result: 20 (lazy with Sequence avoids intermediate iterations)')}
      </p>
    </div>
  );
};

// ─── Coroutines Diagram ───────────────────────────────────────────────────────

const CoroutinesDiagram = ({ tx }) => {
  const [scenario, setScenario] = useState('success');
  const [activeChild, setActiveChild] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setScenario(s => (s === 'success' ? 'failure' : 'success'));
      setActiveChild(0);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (scenario === 'success') {
      const timers = [0, 1, 2].map(i =>
        setTimeout(() => setActiveChild(i + 1), i * 400)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [scenario]);

  const isFailure = scenario === 'failure';

  const children = [
    { label: tx('Coroutine 1', 'Coroutine 1'), id: 1 },
    { label: tx('Coroutine 2', 'Coroutine 2'), id: 2 },
    { label: tx('Coroutine 3 💥', 'Coroutine 3 💥'), id: 3 },
  ];

  return (
    <div className="bg-slate-950/40 border border-violet-500/20 rounded-xl p-4 space-y-3">
      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">
        {tx('Concurrencia estructurada', 'Structured Concurrency')}
      </p>

      <motion.div
        animate={{
          borderColor: isFailure ? 'rgba(239,68,68,0.5)' : 'rgba(139,92,246,0.4)',
          backgroundColor: isFailure ? 'rgba(239,68,68,0.05)' : 'rgba(139,92,246,0.05)',
        }}
        transition={{ duration: 0.4 }}
        className="border rounded-xl p-3"
      >
        <div className="text-xs font-bold text-center mb-3 text-slate-300">
          CoroutineScope (viewModelScope)
        </div>

        <div className="flex flex-wrap items-center gap-2 justify-center">
          {children.map((child) => {
            const isFailing = isFailure && child.id === 3;
            const isCancelled = isFailure && child.id !== 3;
            return (
              <motion.div
                key={child.id}
                animate={{
                  boxShadow: isFailing
                    ? '0 0 16px rgba(239,68,68,0.5)'
                    : isCancelled
                    ? '0 0 0px transparent'
                    : activeChild >= child.id
                    ? '0 0 14px rgba(139,92,246,0.45)'
                    : '0 0 0px transparent',
                  scale: isFailing ? 1.05 : 1,
                  opacity: isCancelled ? 0.3 : 1,
                }}
                transition={{ duration: 0.35 }}
                className={`border rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  isFailing
                    ? 'border-red-500/50 text-red-300 bg-red-500/10'
                    : isCancelled
                    ? 'border-slate-700/40 text-slate-500 bg-slate-800/20'
                    : 'border-violet-500/40 text-violet-300 bg-violet-500/10'
                }`}
              >
                {child.label}
              </motion.div>
            );
          })}
        </div>

        <motion.p
          animate={{ opacity: 1 }}
          className="text-xs text-center mt-2"
          style={{ color: isFailure ? '#f87171' : '#a78bfa' }}
        >
          {isFailure
            ? tx('⚠ Fallo → cancela todas las coroutines hijas', '⚠ Failure → cancels all child coroutines')
            : tx('✓ Éxito — todas las coroutines completan', '✓ Success — all coroutines complete')}
        </motion.p>
      </motion.div>

      <p className="text-xs text-slate-500 text-center">
        {tx('Si el padre se cancela, todos los hijos se cancelan automáticamente', 'If parent cancels, all children are automatically cancelled')}
      </p>
    </div>
  );
};

// ─── Compose UDF Diagram ──────────────────────────────────────────────────────

const ComposeDiagram = ({ tx }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      label: 'ViewModel',
      sublabel: tx('StateFlow / state', 'StateFlow / state'),
      color: 'border-violet-500/50 text-violet-300 bg-violet-500/10',
    },
    {
      label: tx('Composable UI', 'Composable UI'),
      sublabel: tx('collectAsState()', 'collectAsState()'),
      color: 'border-purple-500/50 text-purple-300 bg-purple-500/10',
    },
    {
      label: tx('User Event', 'User Event'),
      sublabel: tx('onClick, onInput...', 'onClick, onInput...'),
      color: 'border-fuchsia-500/50 text-fuchsia-300 bg-fuchsia-500/10',
    },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveStep(s => (s + 1) % steps.length), 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-violet-500/20 rounded-xl p-4 space-y-3">
      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">
        {tx('Flujo de datos unidireccional (UDF)', 'Unidirectional Data Flow (UDF)')}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            <motion.div
              animate={{
                boxShadow: activeStep === i ? '0 0 18px rgba(139,92,246,0.5)' : '0 0 0px transparent',
                scale: activeStep === i ? 1.07 : 1,
              }}
              transition={{ duration: 0.35 }}
              className={`border rounded-xl px-3 py-2 text-xs font-semibold text-center transition-all ${step.color} ${activeStep === i ? 'opacity-100' : 'opacity-45'}`}
            >
              <div className="font-bold">{step.label}</div>
              <div className="text-xs font-normal mt-0.5 opacity-80 font-mono">{step.sublabel}</div>
            </motion.div>
            <motion.span
              animate={{ opacity: activeStep === i ? 1 : 0.25 }}
              transition={{ duration: 0.35 }}
              className="text-violet-500/70 text-sm"
            >
              {i < steps.length - 1 ? '→' : '↺'}
            </motion.span>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-500 text-center">
        {tx('Estado fluye hacia abajo, eventos fluyen hacia arriba', 'State flows down, events flow up')}
      </p>
    </div>
  );
};

// ─── Ktor Routing Diagram ─────────────────────────────────────────────────────

const KtorRoutingDiagram = ({ tx }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: tx('Request', 'Request'), color: 'border-slate-500/50 text-slate-300 bg-slate-700/20' },
    { label: 'Routing', color: 'border-violet-500/50 text-violet-300 bg-violet-500/10' },
    { label: 'Auth Plugin', color: 'border-purple-500/50 text-purple-300 bg-purple-500/10' },
    { label: 'ContentNeg.', color: 'border-fuchsia-500/50 text-fuchsia-300 bg-fuchsia-500/10' },
    { label: 'Handler', color: 'border-violet-400/50 text-violet-200 bg-violet-400/10' },
    { label: 'Response', color: 'border-green-500/50 text-green-300 bg-green-500/10' },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveStep(s => (s + 1) % steps.length), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-violet-500/20 rounded-xl p-4 space-y-3">
      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">
        {tx('Pipeline de request Ktor', 'Ktor Request Pipeline')}
      </p>

      <div className="flex flex-wrap items-center gap-1.5 justify-center">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <motion.div
              animate={{
                boxShadow: activeStep === i ? '0 0 16px rgba(139,92,246,0.55)' : '0 0 0px transparent',
                scale: activeStep === i ? 1.08 : 1,
              }}
              transition={{ duration: 0.3 }}
              className={`border rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${step.color} ${activeStep === i ? 'opacity-100' : 'opacity-40'}`}
            >
              {step.label}
            </motion.div>
            {i < steps.length - 1 && (
              <motion.span
                animate={{ opacity: activeStep === i ? 1 : 0.25 }}
                transition={{ duration: 0.3 }}
                className="text-violet-500/60 text-sm"
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-500 text-center">
        {tx('Los plugins interceptan el pipeline; se instalan en orden', 'Plugins intercept the pipeline; installed in order')}
      </p>
    </div>
  );
};

// ─── Section renderers ────────────────────────────────────────────────────────

const renderFundamentals = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Fundamentos de Kotlin', 'Kotlin Fundamentals')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Kotlin es Java sin la ceremonia: menos código, nulls controlados por el compilador y clases de datos en una línea. Si vienes de Java, en una semana te sientes en casa.',
          'Kotlin is Java without the ceremony: less code, nulls checked by the compiler and data classes in one line. Coming from Java, you feel at home within a week.'
        )}
      </p>
    </div>

    <NullSafetyDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: 'val vs var',
          color: 'border-violet-500/30',
          titleColor: 'text-violet-300',
          points: [
            tx('val no se reasigna, como final en Java', 'val can’t be reassigned, like final in Java'),
            tx('var sí se puede reasignar', 'var can be reassigned'),
            tx('El tipo se infiere: val x = 42 ya es Int', 'The type is inferred: val x = 42 is already an Int'),
            tx('Mi regla: val siempre, var solo si de verdad cambia', 'My rule: val always, var only if it really changes'),
          ],
        },
        {
          title: tx('String templates', 'String templates'),
          color: 'border-purple-500/30',
          titleColor: 'text-purple-300',
          points: [
            tx('"Hola, $nombre!" para una variable', '"Hello, $name!" for a variable'),
            tx('"${user.age + 1}" para una expresión', '"${user.age + 1}" for an expression'),
            tx('Triple comilla para texto de varias líneas', 'Triple quotes for multi-line text'),
            tx('trimIndent() le quita la sangría sobrante', 'trimIndent() strips the extra indentation'),
          ],
        },
        {
          title: tx('when expression', 'when expression'),
          color: 'border-fuchsia-500/30',
          titleColor: 'text-fuchsia-300',
          points: [
            tx('Reemplaza a switch y además devuelve un valor', 'Replaces switch and also returns a value'),
            tx('Acepta rangos: in 1..10', 'Accepts ranges: in 1..10'),
            tx('Y tipos: is String', 'And types: is String'),
            tx('Dentro de la rama, la variable ya está casteada', 'Inside the branch, the variable is already cast'),
          ],
        },
        {
          title: 'companion object',
          color: 'border-violet-400/30',
          titleColor: 'text-violet-200',
          points: [
            tx('Un objeto único dentro de la clase: hace el papel de static', 'A single object inside the class: it plays the role of static'),
            tx('A diferencia de static, puede implementar interfaces', 'Unlike static, it can implement interfaces'),
            tx('Buen lugar para factories', 'A good place for factories'),
            tx('Para un singleton suelto: object', 'For a standalone singleton: object'),
          ],
        },
      ].map(({ title, color, titleColor, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
          <div className={`font-bold text-sm mb-3 ${titleColor}`}>{title}</div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-violet-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="kotlin" code={`// ── Null safety operators ──────────────────────────
val name: String? = null

// Safe call — returns null if name is null
val length = name?.length          // null

// Elvis operator — fallback value
val len = name?.length ?: 0        // 0

// let — runs block only if non-null
name?.let { println("Name: \$it") }

// !! — throws NPE (avoid unless certain)
// val upper = name!!.uppercase()  // KotlinNullPointerException

// Safe cast
val obj: Any = "hello"
val str: String? = obj as? String  // "hello"
val num: Int?    = obj as? Int     // null

// when as expression
val result = when {
    name == null     -> "no name"
    name.length < 3  -> "too short"
    else             -> "valid: \$name"
}

// Type checks with smart cast
fun printLength(x: Any) {
    if (x is String) {
        // x auto-cast to String here
        println(x.length)
    }
}`} />

    <CodeBlock language="kotlin" code={`// ── Data class ────────────────────────────────────
data class User(
    val id: Long,
    val name: String,
    val email: String,
    val age: Int = 0
)

val alice = User(1, "Alice", "alice@example.com", 30)
val bob   = alice.copy(name = "Bob", id = 2)       // structural copy

// componentN() for destructuring
val (id, name) = alice   // id=1, name="Alice"

// equals/hashCode/toString auto-generated
println(alice == bob)    // false

// ── Sealed class ──────────────────────────────────
sealed class Result<out T> {
    data class Success<T>(val data: T)      : Result<T>()
    data class Error(val message: String)   : Result<Nothing>()
    object Loading                          : Result<Nothing>()
}

fun handle(result: Result<User>) = when (result) {
    is Result.Success -> println("Got: \${result.data.name}")
    is Result.Error   -> println("Error: \${result.message}")
    Result.Loading    -> println("Loading...")
}

// ── Object declaration (singleton) ───────────────
object AppConfig {
    const val BASE_URL = "https://api.example.com"
    val timeout = 30_000L
}

// ── Companion object ──────────────────────────────
class UserRepository private constructor(val db: Database) {
    companion object {
        fun create(db: Database) = UserRepository(db)
    }
}`} />

    <WorkNote tx={tx} accent="violet">
      {tx(
        'Mi primer Kotlin fue la app Android de reparto y operaciones de campo de Olva Courier. Viniendo de Java, lo que más se notó desde el primer día fueron el null safety y las data classes.',
        'My first Kotlin was Olva Courier’s Android app for delivery and field operations. Coming from Java, what stood out from day one were null safety and data classes.'
      )}
    </WorkNote>
  </div>
);

const renderFunctional = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Programación Funcional', 'Functional Programming')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Kotlin anima a escribir código que se lee como una frase: extensiones para agregar métodos donde los necesitas, scope functions para no repetir el nombre de una variable y colecciones con map, filter y groupBy sin ceremonia.',
          'Kotlin pushes you to write code that reads like a sentence: extensions to add methods where you need them, scope functions so you don’t repeat a variable name, and collections with map, filter and groupBy without ceremony.'
        )}
      </p>
    </div>

    <FunctionalChainDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: tx('Scope functions', 'Scope functions'),
          color: 'border-violet-500/30',
          titleColor: 'text-violet-300',
          points: [
            tx('let: trabaja con el valor (ideal con ?.) y devuelve lo que calcules', 'let: work with the value (great with ?.) and return what you compute'),
            tx('run: un bloque con this que devuelve un resultado', 'run: a block with this that returns a result'),
            tx('apply: configura el objeto y lo devuelve', 'apply: configure the object and return it'),
            tx('also: un efecto secundario (un log) sin cambiar nada', 'also: a side effect (a log) without changing anything'),
            tx('with: como run, pero recibe el objeto como argumento', 'with: like run, but takes the object as an argument'),
          ],
        },
        {
          title: tx('Colecciones lazy', 'Lazy collections'),
          color: 'border-purple-500/30',
          titleColor: 'text-purple-300',
          points: [
            tx('List, Set y Map son de solo lectura por defecto', 'List, Set and Map are read-only by default'),
            tx('Si necesitas modificar, lo pides explícito: MutableList', 'If you need to modify, you ask for it: MutableList'),
            tx('Las operaciones no son lazy; para cadenas largas, asSequence()', 'Operations aren’t lazy; for long chains, asSequence()'),
            tx('groupBy/partition/associate/zip/flatten', 'groupBy/partition/associate/zip/flatten'),
          ],
        },
        {
          title: tx('Extension functions', 'Extension functions'),
          color: 'border-fuchsia-500/30',
          titleColor: 'text-fuchsia-300',
          points: [
            tx('Le agregas métodos a una clase que no es tuya, sin heredar', 'Add methods to a class you don’t own, without inheriting'),
            tx('Adentro, this es el objeto sobre el que la llamas', 'Inside, this is the object you call it on'),
            tx('Se resuelven al compilar: no hay polimorfismo', 'They’re resolved at compile time: no polymorphism'),
            tx('Ejemplos: String.toSlug(), List.second()', 'Examples: String.toSlug(), List.second()'),
          ],
        },
        {
          title: tx('Destructuring', 'Destructuring'),
          color: 'border-violet-400/30',
          titleColor: 'text-violet-200',
          points: [
            tx('val (a, b) = Pair(1, 2)', 'val (a, b) = Pair(1, 2)'),
            tx('for ((key, value) in map)', 'for ((key, value) in map)'),
            tx('Funciona con cualquier data class', 'Works with any data class'),
            tx('Usa _ para lo que no te interesa', 'Use _ for whatever you don’t need'),
          ],
        },
      ].map(({ title, color, titleColor, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
          <div className={`font-bold text-sm mb-3 ${titleColor}`}>{title}</div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-violet-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="kotlin" code={`// ── Extension function ───────────────────────────
fun String.toSlug(): String =
    lowercase().replace(Regex("[^a-z0-9]+"), "-").trim('-')

fun <T> List<T>.second(): T = this[1]

// ── Higher-order function ─────────────────────────
fun <T> List<T>.applyIf(condition: Boolean, block: List<T>.() -> List<T>): List<T> =
    if (condition) block() else this

// ── Scope functions ───────────────────────────────
data class HttpRequest(var url: String = "", var timeout: Int = 5000)

// apply — builder pattern (returns receiver)
val request = HttpRequest().apply {
    url     = "https://api.example.com/users"
    timeout = 10_000
}

// let — transform non-null value
val upper = request.url.takeIf { it.isNotBlank() }?.let {
    it.uppercase()
} ?: "NO URL"

// also — logging side-effect (returns receiver)
val users = fetchUsers()
    .also { println("Fetched \${it.size} users") }

// run — setup + compute
val summary = run {
    val active  = users.count { it.isActive }
    val blocked = users.count { !it.isActive }
    "Active: \$active, Blocked: \$blocked"
}

// with — operate on existing object
val message = with(request) {
    "POST \$url timeout=\${timeout}ms"
}`} />

    <CodeBlock language="kotlin" code={`// ── Collections pipeline ─────────────────────────
data class Product(val name: String, val price: Double, val category: String)

val products = listOf(
    Product("Laptop",  999.0, "Electronics"),
    Product("Phone",   499.0, "Electronics"),
    Product("Shirt",    29.0, "Clothing"),
    Product("Jeans",    59.0, "Clothing"),
    Product("Monitor", 349.0, "Electronics"),
)

// filter + map + sortedBy
val cheapElectronics = products
    .filter   { it.category == "Electronics" && it.price < 600 }
    .map      { it.name to it.price }
    .sortedBy { it.second }

// groupBy
val byCategory: Map<String, List<Product>> = products.groupBy { it.category }

// partition — two lists at once
val (expensive, affordable) = products.partition { it.price > 100 }

// flatMap
val words = listOf("hello world", "foo bar")
    .flatMap { it.split(" ") }   // ["hello","world","foo","bar"]

// associate
val priceMap: Map<String, Double> = products.associate { it.name to it.price }

// Sequence — lazy (no intermediate lists allocated)
val result = products
    .asSequence()
    .filter  { it.price > 50 }
    .map     { it.name.uppercase() }
    .take(3)
    .toList()

// Destructuring in for loop
for ((name, price) in priceMap) {
    println("\$name costs \$\$price")
}`} />

    <WorkNote tx={tx} accent="violet">
      {tx(
        'Si vienes de los Streams de Java, las colecciones de Kotlin se sienten iguales pero sin .stream() ni collect(). La diferencia a recordar: en Kotlin no son lazy por defecto.',
        'If you come from Java Streams, Kotlin collections feel the same but without .stream() or collect(). The difference to remember: in Kotlin they aren’t lazy by default.'
      )}
    </WorkNote>
  </div>
);

const renderCoroutines = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Coroutines de Kotlin', 'Kotlin Coroutines')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Las coroutines permiten escribir código asíncrono como si fuera secuencial. Lo que las hace seguras es la concurrencia estructurada: cada tarea vive dentro de un scope y nada queda corriendo huérfano.',
          'Coroutines let you write async code as if it were sequential. What makes them safe is structured concurrency: every task lives inside a scope and nothing is left running orphaned.'
        )}
      </p>
    </div>

    <CoroutinesDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: tx('Dispatchers', 'Dispatchers'),
          color: 'border-violet-500/30',
          titleColor: 'text-violet-300',
          points: [
            tx('Main: el hilo de la UI en Android', 'Main: the UI thread on Android'),
            tx('IO: para llamadas bloqueantes de red o disco', 'IO: for blocking network or disk calls'),
            tx('Default: para cálculo pesado', 'Default: for heavy computation'),
            tx('Unconfined: casi nunca lo necesitas', 'Unconfined: you almost never need it'),
          ],
        },
        {
          title: 'launch vs async',
          color: 'border-purple-500/30',
          titleColor: 'text-purple-300',
          points: [
            tx('launch: lánzala y sigue; devuelve un Job', 'launch: fire it and move on; returns a Job'),
            tx('async: cuando necesitas el resultado; lo obtienes con await()', 'async: when you need the result; you get it with await()'),
            tx('join() espera un Job sin resultado', 'join() waits for a Job with no result'),
            tx('coroutineScope espera a que terminen todas sus hijas', 'coroutineScope waits for all its children to finish'),
          ],
        },
        {
          title: 'Flow',
          color: 'border-fuchsia-500/30',
          titleColor: 'text-fuchsia-300',
          points: [
            tx('Flow es frío: no hace nada hasta que alguien llama collect()', 'Flow is cold: it does nothing until someone calls collect()'),
            tx('StateFlow siempre tiene un valor actual: para estado', 'StateFlow always has a current value: for state'),
            tx('SharedFlow reparte eventos a varios suscriptores', 'SharedFlow broadcasts events to several subscribers'),
            tx('flowOn() cambia dónde corre lo que está arriba en la cadena', 'flowOn() changes where everything upstream runs'),
          ],
        },
        {
          title: tx('Manejo de errores', 'Error handling'),
          color: 'border-violet-400/30',
          titleColor: 'text-violet-200',
          points: [
            tx('Dentro de una suspend, try/catch normal', 'Inside a suspend function, a regular try/catch'),
            tx('CoroutineExceptionHandler atrapa lo que se escapa de un launch', 'CoroutineExceptionHandler catches what escapes a launch'),
            tx('Con SupervisorJob, una hija que falla no tumba a las demás', 'With SupervisorJob, a failing child doesn’t take down the others'),
            tx('runCatching { } envuelve el resultado o el error en un Result', 'runCatching { } wraps the result or the error in a Result'),
          ],
        },
      ].map(({ title, color, titleColor, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
          <div className={`font-bold text-sm mb-3 ${titleColor}`}>{title}</div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-violet-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="kotlin" code={`// ── suspend function ─────────────────────────────
suspend fun fetchUser(id: Long): User = withContext(Dispatchers.IO) {
    api.getUser(id)  // blocking IO is fine here
}

// ── launch (fire-and-forget) ──────────────────────
class MyViewModel : ViewModel() {
    fun loadData() {
        viewModelScope.launch {
            try {
                val user = fetchUser(42)
                _uiState.value = UiState.Success(user)
            } catch (e: Exception) {
                _uiState.value = UiState.Error(e.message ?: "Unknown error")
            }
        }
    }

    // ── async/await (parallel requests) ──────────
    fun loadDashboard() {
        viewModelScope.launch {
            coroutineScope {            // structured scope
                val usersDeferred = async { fetchUsers() }
                val statsDeferred = async { fetchStats() }
                val users = usersDeferred.await()
                val stats = statsDeferred.await()
                _dashboard.value = Dashboard(users, stats)
            }
        }
    }
}

// ── CoroutineExceptionHandler ─────────────────────
val handler = CoroutineExceptionHandler { _, throwable ->
    println("Caught: \$throwable")
}
val job = scope.launch(handler) {
    throw RuntimeException("Oops")
}

// ── SupervisorJob — independent children ─────────
val supervisor = SupervisorJob()
val scope = CoroutineScope(Dispatchers.Default + supervisor)
scope.launch { error("Child 1 fails") }   // does NOT cancel scope
scope.launch { doWork() }                  // still runs`} />

    <CodeBlock language="kotlin" code={`// ── Cold Flow ────────────────────────────────────
fun numbersFlow(): Flow<Int> = flow {
    for (i in 1..5) {
        delay(300)
        emit(i)
    }
}

// Collect in coroutine
viewModelScope.launch {
    numbersFlow()
        .filter  { it % 2 == 0 }
        .map     { it * it }
        .flowOn(Dispatchers.Default)   // upstream on Default
        .collect { println(it) }       // 4, 16
}

// ── StateFlow — hot, single subscriber safe ───────
class CounterViewModel : ViewModel() {
    private val _count = MutableStateFlow(0)
    val count: StateFlow<Int> = _count.asStateFlow()

    fun increment() { _count.update { it + 1 } }
}

// In Composable
val count by viewModel.count.collectAsState()

// ── SharedFlow — hot, multiple subscribers ────────
class EventBus {
    private val _events = MutableSharedFlow<AppEvent>(
        replay              = 0,
        extraBufferCapacity = 16
    )
    val events: SharedFlow<AppEvent> = _events.asSharedFlow()

    suspend fun emit(event: AppEvent) = _events.emit(event)
}

// ── Flow operators ────────────────────────────────
searchQuery
    .debounce(300)
    .distinctUntilChanged()
    .flatMapLatest { query -> searchApi(query) }
    .catch { emit(emptyList()) }
    .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())`} />

    <WorkNote tx={tx} accent="violet">
      {tx(
        'Cuando hice la app de Olva, las coroutines todavía no eran estables (llegaron a fines de 2018). Hoy son el estándar, y la idea es la misma que aplico en Java con WebFlux: no bloquear el hilo mientras esperas.',
        'When I built the Olva app, coroutines weren’t stable yet (they landed in late 2018). Today they’re the standard, and the idea is the same one I apply in Java with WebFlux: don’t block the thread while you wait.'
      )}
    </WorkNote>
  </div>
);

const renderAndroid = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Android & Jetpack Compose', 'Android & Jetpack Compose')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Con Compose, la pantalla es una función del estado: cambias el estado y la UI se redibuja sola. Si vienes de React, la idea es la misma con otra sintaxis.',
          'With Compose, the screen is a function of state: change the state and the UI redraws itself. If you come from React, it’s the same idea with different syntax.'
        )}
      </p>
    </div>

    <ComposeDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: tx('Estado en Compose', 'State in Compose'),
          color: 'border-violet-500/30',
          titleColor: 'text-violet-300',
          points: [
            tx('remember guarda un valor entre recomposiciones', 'remember keeps a value across recompositions'),
            tx('rememberSaveable además sobrevive a rotar la pantalla', 'rememberSaveable also survives a screen rotation'),
            tx('mutableStateOf crea estado que redibuja la UI al cambiar', 'mutableStateOf creates state that redraws the UI when it changes'),
            tx('collectAsState() conecta un Flow con la UI', 'collectAsState() connects a Flow to the UI'),
          ],
        },
        {
          title: 'LaunchedEffect / SideEffects',
          color: 'border-purple-500/30',
          titleColor: 'text-purple-300',
          points: [
            tx('LaunchedEffect corre una coroutine mientras el composable esté en pantalla', 'LaunchedEffect runs a coroutine while the composable is on screen'),
            tx('SideEffect corre en cada recomposición', 'SideEffect runs on every recomposition'),
            tx('DisposableEffect te da un lugar para limpiar al salir', 'DisposableEffect gives you a place to clean up on exit'),
            tx('Si cambia la key, el efecto se reinicia (como las dependencias de useEffect)', 'If the key changes, the effect restarts (like useEffect dependencies)'),
          ],
        },
        {
          title: 'ViewModel',
          color: 'border-fuchsia-500/30',
          titleColor: 'text-fuchsia-300',
          points: [
            tx('Sobrevive a rotaciones y cambios de configuración', 'Survives rotations and configuration changes'),
            tx('Sus coroutines (viewModelScope) se cancelan solas al destruirse', 'Its coroutines (viewModelScope) cancel themselves when it’s destroyed'),
            tx('Expone StateFlow de solo lectura; el Mutable queda privado', 'Exposes a read-only StateFlow; the Mutable one stays private'),
            tx('SavedStateHandle recibe los argumentos de navegación', 'SavedStateHandle receives navigation arguments'),
          ],
        },
        {
          title: 'Material 3 & LazyColumn',
          color: 'border-violet-400/30',
          titleColor: 'text-violet-200',
          points: [
            tx('Los colores salen de MaterialTheme.colorScheme', 'Colors come from MaterialTheme.colorScheme'),
            tx('LazyColumn es el RecyclerView de Compose, en pocas líneas', 'LazyColumn is Compose’s RecyclerView, in a few lines'),
            tx('Dale una key estable a cada item, como en las listas de React', 'Give each item a stable key, like React lists'),
            tx('El layout se arma encadenando Modifiers; el orden importa', 'Layout is built by chaining Modifiers; order matters'),
          ],
        },
      ].map(({ title, color, titleColor, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
          <div className={`font-bold text-sm mb-3 ${titleColor}`}>{title}</div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-violet-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="kotlin" code={`// ── ViewModel with StateFlow ──────────────────────
data class UiState(
    val users: List<User> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null
)

class UserViewModel(
    private val repo: UserRepository,
    savedState: SavedStateHandle
) : ViewModel() {

    private val _state = MutableStateFlow(UiState())
    val state: StateFlow<UiState> = _state.asStateFlow()

    init { loadUsers() }

    fun loadUsers() {
        viewModelScope.launch {
            _state.update { it.copy(isLoading = true) }
            runCatching { repo.getUsers() }
                .onSuccess { users -> _state.update { it.copy(users = users, isLoading = false) } }
                .onFailure { e    -> _state.update { it.copy(error = e.message, isLoading = false) } }
        }
    }
}

// ── Composable screen ─────────────────────────────
@Composable
fun UserScreen(viewModel: UserViewModel = viewModel()) {
    val state by viewModel.state.collectAsState()

    LaunchedEffect(Unit) { viewModel.loadUsers() }

    when {
        state.isLoading     -> CircularProgressIndicator()
        state.error != null -> Text("Error: \${state.error}",
                                    color = MaterialTheme.colorScheme.error)
        else                -> UserList(users = state.users)
    }
}

@Composable
fun UserList(users: List<User>) {
    var searchQuery by remember { mutableStateOf("") }
    Column {
        OutlinedTextField(
            value = searchQuery,
            onValueChange = { searchQuery = it },
            label = { Text("Search") },
            modifier = Modifier.fillMaxWidth().padding(16.dp)
        )
        LazyColumn {
            items(
                items = users.filter { it.name.contains(searchQuery, ignoreCase = true) },
                key   = { it.id }
            ) { user -> UserCard(user = user) }
        }
    }
}`} />

    <CodeBlock language="kotlin" code={`// ── Navigation Compose ───────────────────────────
sealed class Screen(val route: String) {
    object UserList   : Screen("users")
    object UserDetail : Screen("users/{userId}") {
        fun createRoute(userId: Long) = "users/\$userId"
    }
}

@Composable
fun AppNavigation() {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = Screen.UserList.route) {
        composable(Screen.UserList.route) {
            UserScreen(onUserClick = { user ->
                navController.navigate(Screen.UserDetail.createRoute(user.id))
            })
        }
        composable(
            route     = Screen.UserDetail.route,
            arguments = listOf(navArgument("userId") { type = NavType.LongType })
        ) { backStackEntry ->
            val userId = backStackEntry.arguments?.getLong("userId") ?: return@composable
            UserDetailScreen(userId = userId, onBack = { navController.popBackStack() })
        }
    }
}

// ── LazyColumn with sticky headers ───────────────
@Composable
fun GroupedUserList(usersByDept: Map<String, List<User>>) {
    LazyColumn(
        contentPadding      = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        usersByDept.forEach { (dept, users) ->
            stickyHeader(key = "header_\$dept") {
                Text(dept,
                    style    = MaterialTheme.typography.titleMedium,
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(MaterialTheme.colorScheme.background)
                        .padding(vertical = 4.dp)
                )
            }
            items(items = users, key = { it.id }) { user ->
                UserCard(user = user)
            }
        }
    }
}`} />

    <WorkNote tx={tx} accent="violet">
      {tx(
        'La app de Olva se hizo con vistas XML, antes de que existiera Compose. Mi trabajo móvil más reciente es con React Native (Lynk, Banco GNB, AgentCloud), y Compose se siente muy parecido: componentes, estado y efectos.',
        'The Olva app used XML views, before Compose existed. My more recent mobile work is in React Native (Lynk, Banco GNB, AgentCloud), and Compose feels very similar: components, state and effects.'
      )}
    </WorkNote>
  </div>
);

const renderBackend = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Backend & Multiplatform', 'Backend & Multiplatform')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Kotlin no es solo Android. En backend puedes usar Ktor, liviano y muy Kotlin, o el mismo Spring Boot de siempre con menos código. Y con Multiplatform compartes lógica entre Android e iOS.',
          'Kotlin isn’t just Android. On the backend you can use Ktor, lightweight and very Kotlin, or the same old Spring Boot with less code. And with Multiplatform you share logic between Android and iOS.'
        )}
      </p>
    </div>

    <KtorRoutingDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: 'Ktor',
          color: 'border-violet-500/30',
          titleColor: 'text-violet-300',
          points: [
            tx('Las rutas se escriben como un DSL, parecido a Express', 'Routes are written as a DSL, similar to Express'),
            tx('Todo es un plugin que instalas: auth, JSON, CORS', 'Everything is a plugin you install: auth, JSON, CORS'),
            tx('JSON con kotlinx.serialization', 'JSON via kotlinx.serialization'),
            tx('Liviano y sin servidor externo: arranca rápido', 'Lightweight with no external server: starts fast'),
          ],
        },
        {
          title: 'Spring Boot + Kotlin',
          color: 'border-purple-500/30',
          titleColor: 'text-purple-300',
          points: [
            tx('Las data classes reemplazan a Lombok', 'Data classes replace Lombok'),
            tx('Con WebFlux, los controllers pueden ser funciones suspend', 'With WebFlux, controllers can be suspend functions'),
            tx('@Transactional también funciona con funciones suspend', '@Transactional works with suspend functions too'),
            tx('Y el build en Kotlin también: build.gradle.kts', 'And the build in Kotlin too: build.gradle.kts'),
          ],
        },
        {
          title: 'kotlinx.serialization',
          color: 'border-fuchsia-500/30',
          titleColor: 'text-fuchsia-300',
          points: [
            tx('@Serializable genera el código al compilar', '@Serializable generates the code at compile time'),
            tx('Sin reflection: más rápido y funciona en Multiplatform', 'No reflection: faster and works in Multiplatform'),
            tx('@SerialName cuando el JSON usa otro nombre', '@SerialName when the JSON uses another name'),
            tx('Soporta sealed classes para JSON polimórfico', 'Supports sealed classes for polymorphic JSON'),
          ],
        },
        {
          title: 'Kotlin Multiplatform (KMP)',
          color: 'border-violet-400/30',
          titleColor: 'text-violet-200',
          points: [
            tx('commonMain: la lógica compartida (dominio, repositorios)', 'commonMain: shared logic (domain, repositories)'),
            tx('androidMain e iosMain: lo específico de cada plataforma', 'androidMain and iosMain: what’s specific to each platform'),
            tx('expect/actual: una API común con implementación por plataforma', 'expect/actual: one common API, implemented per platform'),
            tx('Compose Multiplatform si también quieres compartir la UI', 'Compose Multiplatform if you want to share the UI too'),
          ],
        },
      ].map(({ title, color, titleColor, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
          <div className={`font-bold text-sm mb-3 ${titleColor}`}>{title}</div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-violet-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="kotlin" code={`// ── Ktor application ──────────────────────────────
fun Application.module() {
    install(ContentNegotiation) {
        json(Json { prettyPrint = true; ignoreUnknownKeys = true })
    }
    install(Authentication) {
        jwt("auth-jwt") {
            verifier(JWTConfig.verifier)
            validate { credential ->
                if (credential.payload.subject != null) JWTPrincipal(credential.payload) else null
            }
        }
    }
    install(CORS) {
        anyHost()
        allowHeader(HttpHeaders.Authorization)
        allowHeader(HttpHeaders.ContentType)
    }

    routing {
        route("/api/v1") {
            post("/auth/login") {
                val body  = call.receive<LoginRequest>()
                val token = authService.login(body)
                call.respond(HttpStatusCode.OK, TokenResponse(token))
            }

            authenticate("auth-jwt") {
                get("/users") {
                    val page  = call.request.queryParameters["page"]?.toInt() ?: 1
                    val users = userService.getUsers(page)
                    call.respond(users)
                }
                get("/users/{id}") {
                    val id   = call.parameters["id"]?.toLong()
                        ?: return@get call.respond(HttpStatusCode.BadRequest)
                    val user = userService.getById(id)
                        ?: return@get call.respond(HttpStatusCode.NotFound)
                    call.respond(user)
                }
                post("/users") {
                    val body = call.receive<CreateUserRequest>()
                    val user = userService.create(body)
                    call.respond(HttpStatusCode.Created, user)
                }
            }
        }
    }
}`} />

    <CodeBlock language="kotlin" code={`// ── Spring Boot Kotlin — Controller + Service ─────
@RestController
@RequestMapping("/api/users")
class UserController(private val userService: UserService) {

    @GetMapping
    suspend fun getUsers(
        @RequestParam(defaultValue = "1")  page: Int,
        @RequestParam(defaultValue = "20") size: Int
    ): ResponseEntity<Page<UserDto>> =
        ResponseEntity.ok(userService.getUsers(page, size))

    @GetMapping("/{id}")
    suspend fun getUser(@PathVariable id: Long): ResponseEntity<UserDto> =
        userService.findById(id)
            ?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity.notFound().build()

    @PostMapping
    suspend fun createUser(@Valid @RequestBody req: CreateUserRequest): ResponseEntity<UserDto> {
        val user = userService.create(req)
        return ResponseEntity.created(URI.create("/api/users/\${user.id}")).body(user)
    }
}

@Service
@Transactional
class UserServiceImpl(
    private val userRepo: UserRepository,
    private val encoder: PasswordEncoder
) : UserService {

    override suspend fun findById(id: Long): UserDto? =
        withContext(Dispatchers.IO) { userRepo.findByIdOrNull(id)?.toDto() }

    override suspend fun create(req: CreateUserRequest): UserDto =
        withContext(Dispatchers.IO) {
            userRepo.save(User(name = req.name, email = req.email,
                               password = encoder.encode(req.password))).toDto()
        }
}

// ── kotlinx.serialization ─────────────────────────
@Serializable
data class UserDto(
    val id: Long,
    val name: String,
    @SerialName("email_address") val email: String,
    val roles: List<String> = emptyList()
)

// ── KMP expect/actual ─────────────────────────────
// commonMain
expect fun currentTimeMillis(): Long
expect fun platformName(): String

// androidMain
actual fun currentTimeMillis(): Long = System.currentTimeMillis()
actual fun platformName(): String = "Android"

// iosMain
actual fun currentTimeMillis(): Long = (NSDate().timeIntervalSince1970 * 1000).toLong()
actual fun platformName(): String = "iOS"`} />

    <WorkNote tx={tx} accent="violet">
      {tx(
        'Mi backend es Java con Spring Boot. Pasar un servicio Spring a Kotlin es una migración natural: mismo framework, mismas anotaciones, menos código y data classes en vez de Lombok.',
        'My backend is Java with Spring Boot. Moving a Spring service to Kotlin is a natural migration: same framework, same annotations, less code, and data classes instead of Lombok.'
      )}
    </WorkNote>
  </div>
);

// ─── Interview Accordion ──────────────────────────────────────────────────────

const renderInterview = (tx) => (
  <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('Preguntas de Entrevista', 'Interview Q&A')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx('Respuestas cortas, como las diría en una entrevista, agrupadas por nivel.', 'Short answers, the way I would say them in an interview, grouped by level.')}
        </p>
      </div>
    <InterviewQA groups={buildKotlinInterview(tx)} tx={tx} accent="violet" />
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

function KotlinPro() {
  const { language } = useLanguage();
  const tx = (es, en) => language === 'en' ? en : es;
  const [active, setActive] = useState('fundamentals');

  const sections = [
    {
      id: 'fundamentals',
      title: tx('Fundamentos', 'Fundamentals'),
      subtitle: 'val/var, null safety, data classes, sealed classes',
    },
    {
      id: 'functional',
      title: tx('Programación Funcional', 'Functional Programming'),
      subtitle: tx('Extension functions, lambdas, colecciones', 'Extension functions, lambdas, collections'),
    },
    {
      id: 'coroutines',
      title: 'Coroutines',
      subtitle: 'suspend, Flow, structured concurrency',
    },
    {
      id: 'android',
      title: 'Android & Compose',
      subtitle: tx('Jetpack Compose, ViewModel, estado', 'Jetpack Compose, ViewModel, state'),
    },
    {
      id: 'backend',
      title: tx('Backend & Multiplatform', 'Backend & Multiplatform'),
      subtitle: tx('Ktor, Spring Boot con Kotlin, KMP', 'Ktor, Spring Boot with Kotlin, KMP'),
    },
    {
      id: 'interview',
      title: tx('Entrevista', 'Interview Q&A'),
      subtitle: tx('Junior → Senior preguntas', 'Junior → Senior questions'),
    },
  ];

  const renderContent = () => {
    switch (active) {
      case 'fundamentals': return renderFundamentals(tx);
      case 'functional':   return renderFunctional(tx);
      case 'coroutines':   return renderCoroutines(tx);
      case 'android':      return renderAndroid(tx);
      case 'backend':      return renderBackend(tx);
      case 'interview':    return renderInterview(tx);
      default:             return renderFundamentals(tx);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 lg:h-[calc(100vh-200px)]">
      <div className="lg:col-span-1 lg:overflow-y-auto lg:pr-2">
        <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-hidden lg:pb-0 lg:space-y-2">
          {sections.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)}
              className={`flex-shrink-0 lg:w-full text-left px-3 py-2 lg:px-4 lg:py-3 rounded-xl transition-all ${
                active === s.id
                  ? 'bg-violet-500/20 border border-violet-500/40 text-violet-300'
                  : 'bg-slate-800/30 border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}>
              <div className="font-semibold text-sm whitespace-nowrap lg:whitespace-normal">{s.title}</div>
              <div className="text-xs text-slate-500 mt-0.5 hidden lg:block">{s.subtitle}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="lg:col-span-3 lg:overflow-y-auto lg:pr-2 space-y-6">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.2}}>
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default KotlinPro;
