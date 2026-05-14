import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Zap, GitBranch, Layers, Server, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { SiKotlin } from 'react-icons/si';
import CodeBlock from './CodeBlock';
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
          'val/var, null safety en tiempo de compilación, data classes y sealed classes.',
          'val/var, compile-time null safety, data classes and sealed classes.'
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
            tx('val — inmutable (como final en Java)', 'val — immutable (like final in Java)'),
            tx('var — mutable, reasignable', 'var — mutable, reassignable'),
            tx('Inferencia de tipos: val x = 42 → Int', 'Type inference: val x = 42 → Int'),
            tx('Prefiere siempre val sobre var', 'Always prefer val over var'),
          ],
        },
        {
          title: tx('String templates', 'String templates'),
          color: 'border-purple-500/30',
          titleColor: 'text-purple-300',
          points: [
            tx('"Hola, $nombre!" — referencia simple', '"Hello, $name!" — simple reference'),
            tx('"${user.age + 1}" — expresión compleja', '"${user.age + 1}" — complex expression'),
            tx('Multiline strings con triple comilla', 'Multiline strings with triple quote'),
            tx('trimIndent() para limpiar indentación', 'trimIndent() to clean up indentation'),
          ],
        },
        {
          title: tx('when expression', 'when expression'),
          color: 'border-fuchsia-500/30',
          titleColor: 'text-fuchsia-300',
          points: [
            tx('Reemplaza switch, pero es una expresión', 'Replaces switch, but is an expression'),
            tx('Puede matchear rangos: in 1..10', 'Can match ranges: in 1..10'),
            tx('Puede matchear tipos: is String', 'Can match types: is String'),
            tx('Smart cast automático dentro del branch', 'Automatic smart cast inside branch'),
          ],
        },
        {
          title: 'companion object',
          color: 'border-violet-400/30',
          titleColor: 'text-violet-200',
          points: [
            tx('Singleton ligado a la clase, como static de Java', 'Singleton tied to the class, like Java static'),
            tx('Puede implementar interfaces', 'Can implement interfaces'),
            tx('Factory pattern idiomático con invoke()', 'Idiomatic factory pattern with invoke()'),
            tx('object declaration para singletons globales', 'object declaration for global singletons'),
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
          'Extension functions, lambdas con receiver, scope functions y pipelines de colecciones.',
          'Extension functions, lambdas with receivers, scope functions and collection pipelines.'
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
            tx('let — transforma el objeto, retorna lambda result', 'let — transforms the object, returns lambda result'),
            tx('run — ejecuta bloque, retorna lambda result', 'run — executes block, returns lambda result'),
            tx('apply — configura objeto, retorna el objeto', 'apply — configures object, returns the object'),
            tx('also — efecto secundario, retorna el objeto', 'also — side effect, returns the object'),
            tx('with — no es extension, retorna lambda result', 'with — not an extension, returns lambda result'),
          ],
        },
        {
          title: tx('Colecciones lazy', 'Lazy collections'),
          color: 'border-purple-500/30',
          titleColor: 'text-purple-300',
          points: [
            tx('List/Set/Map son inmutables por defecto', 'List/Set/Map are immutable by default'),
            tx('MutableList/MutableMap para mutabilidad', 'MutableList/MutableMap for mutability'),
            tx('asSequence() — lazy evaluation (evita allocs)', 'asSequence() — lazy evaluation (avoids allocs)'),
            tx('groupBy/partition/associate/zip/flatten', 'groupBy/partition/associate/zip/flatten'),
          ],
        },
        {
          title: tx('Extension functions', 'Extension functions'),
          color: 'border-fuchsia-500/30',
          titleColor: 'text-fuchsia-300',
          points: [
            tx('Añaden métodos a clases existentes sin heredar', 'Add methods to existing classes without inheriting'),
            tx('this dentro = receiver (la instancia)', 'this inside = receiver (the instance)'),
            tx('Resueltas estáticamente (no polimorfismo)', 'Resolved statically (no polymorphism)'),
            tx('Idiomáticas: String.toSlug(), List.second()', 'Idiomatic: String.toSlug(), List.second()'),
          ],
        },
        {
          title: tx('Destructuring', 'Destructuring'),
          color: 'border-violet-400/30',
          titleColor: 'text-violet-200',
          points: [
            tx('val (a, b) = Pair(1, 2)', 'val (a, b) = Pair(1, 2)'),
            tx('for ((key, value) in map)', 'for ((key, value) in map)'),
            tx('Data classes implementan componentN()', 'Data classes implement componentN()'),
            tx('_ ignora componentes no necesarios', '_ ignores unneeded components'),
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
          'Concurrencia estructurada, suspend functions, Flow y manejo de errores.',
          'Structured concurrency, suspend functions, Flow and error handling.'
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
            tx('Dispatchers.Main — UI thread (Android)', 'Dispatchers.Main — UI thread (Android)'),
            tx('Dispatchers.IO — I/O blocking ops (network, disk)', 'Dispatchers.IO — I/O blocking ops (network, disk)'),
            tx('Dispatchers.Default — CPU-intensive work', 'Dispatchers.Default — CPU-intensive work'),
            tx('Dispatchers.Unconfined — no confinement', 'Dispatchers.Unconfined — no confinement'),
          ],
        },
        {
          title: 'launch vs async',
          color: 'border-purple-500/30',
          titleColor: 'text-purple-300',
          points: [
            tx('launch — fire-and-forget, retorna Job', 'launch — fire-and-forget, returns Job'),
            tx('async — retorna Deferred<T>, usa await()', 'async — returns Deferred<T>, use await()'),
            tx('join() espera Job sin obtener resultado', 'join() waits for Job without result'),
            tx('coroutineScope lanza hijos en paralelo', 'coroutineScope launches children in parallel'),
          ],
        },
        {
          title: 'Flow',
          color: 'border-fuchsia-500/30',
          titleColor: 'text-fuchsia-300',
          points: [
            tx('Cold stream — empieza al collect()', 'Cold stream — starts on collect()'),
            tx('StateFlow — hot, siempre tiene valor actual', 'StateFlow — hot, always has current value'),
            tx('SharedFlow — hot, multicast a varios colectores', 'SharedFlow — hot, multicast to multiple collectors'),
            tx('flowOn() cambia el dispatcher de upstream', 'flowOn() changes upstream dispatcher'),
          ],
        },
        {
          title: tx('Manejo de errores', 'Error handling'),
          color: 'border-violet-400/30',
          titleColor: 'text-violet-200',
          points: [
            tx('try/catch dentro de suspend function', 'try/catch inside suspend function'),
            tx('CoroutineExceptionHandler para launch', 'CoroutineExceptionHandler for launch'),
            tx('SupervisorJob — fallo de hijo no cancela padre', "SupervisorJob — child failure doesn't cancel parent"),
            tx('runCatching { } retorna Result<T>', 'runCatching { } returns Result<T>'),
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
          'UI declarativa con @Composable, ViewModel, estado reactivo y Navigation Compose.',
          'Declarative UI with @Composable, ViewModel, reactive state and Navigation Compose.'
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
            tx('remember — sobrevive recomposiciones', 'remember — survives recompositions'),
            tx('rememberSaveable — sobrevive rotación de pantalla', 'rememberSaveable — survives screen rotation'),
            tx('mutableStateOf — State<T> observable', 'mutableStateOf — observable State<T>'),
            tx('collectAsState() — convierte Flow a State', 'collectAsState() — converts Flow to State'),
          ],
        },
        {
          title: 'LaunchedEffect / SideEffects',
          color: 'border-purple-500/30',
          titleColor: 'text-purple-300',
          points: [
            tx('LaunchedEffect(key) — lanza coroutine ligada al ciclo', 'LaunchedEffect(key) — launches coroutine tied to lifecycle'),
            tx('SideEffect — se ejecuta en cada recomposición', 'SideEffect — runs on every recomposition'),
            tx('DisposableEffect — limpieza al salir', 'DisposableEffect — cleanup on exit'),
            tx('key1 cambia → LaunchedEffect se relanza', 'key1 changes → LaunchedEffect relaunches'),
          ],
        },
        {
          title: 'ViewModel',
          color: 'border-fuchsia-500/30',
          titleColor: 'text-fuchsia-300',
          points: [
            tx('Sobrevive cambios de configuración', 'Survives configuration changes'),
            tx('viewModelScope se cancela con onCleared()', 'viewModelScope cancelled with onCleared()'),
            tx('Expone StateFlow, nunca MutableStateFlow', 'Exposes StateFlow, never MutableStateFlow'),
            tx('SavedStateHandle para argumentos de navegación', 'SavedStateHandle for navigation arguments'),
          ],
        },
        {
          title: 'Material 3 & LazyColumn',
          color: 'border-violet-400/30',
          titleColor: 'text-violet-200',
          points: [
            tx('MaterialTheme.colorScheme — colores dinámicos', 'MaterialTheme.colorScheme — dynamic colors'),
            tx('LazyColumn — RecyclerView declarativo, eficiente', 'LazyColumn — declarative RecyclerView, efficient'),
            tx('items(key = { }) — diff con keys estables', 'items(key = { }) — diff with stable keys'),
            tx('Modifier.fillMaxWidth().padding() — layout chain', 'Modifier.fillMaxWidth().padding() — layout chain'),
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
          'Ktor para microservicios, Spring Boot con Kotlin idiomático y Kotlin Multiplatform.',
          'Ktor for microservices, idiomatic Spring Boot with Kotlin and Kotlin Multiplatform.'
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
            tx('DSL de routing — install/route/get/post', 'Routing DSL — install/route/get/post'),
            tx('Plugins: Authentication, ContentNegotiation, CORS', 'Plugins: Authentication, ContentNegotiation, CORS'),
            tx('kotlinx.serialization para JSON', 'kotlinx.serialization for JSON'),
            tx('Embeddable — sin servidor externo necesario', 'Embeddable — no external server needed'),
          ],
        },
        {
          title: 'Spring Boot + Kotlin',
          color: 'border-purple-500/30',
          titleColor: 'text-purple-300',
          points: [
            tx('data class reemplaza @Data de Lombok', 'data class replaces Lombok @Data'),
            tx('Coroutines con spring-boot-starter-webflux', 'Coroutines with spring-boot-starter-webflux'),
            tx('@Transactional + suspend en Spring 5.2+', '@Transactional + suspend in Spring 5.2+'),
            tx('Kotlin DSL para Gradle: build.gradle.kts', 'Kotlin DSL for Gradle: build.gradle.kts'),
          ],
        },
        {
          title: 'kotlinx.serialization',
          color: 'border-fuchsia-500/30',
          titleColor: 'text-fuchsia-300',
          points: [
            tx('@Serializable genera código en compilación', '@Serializable generates code at compile time'),
            tx('Sin reflection — más rápido, funciona en KMP', 'No reflection — faster, works in KMP'),
            tx('@SerialName para renombrar campos JSON', '@SerialName to rename JSON fields'),
            tx('Polymorphic y sealed class soportados', 'Polymorphic and sealed class supported'),
          ],
        },
        {
          title: 'Kotlin Multiplatform (KMP)',
          color: 'border-violet-400/30',
          titleColor: 'text-violet-200',
          points: [
            tx('commonMain — lógica compartida (domain, repo)', 'commonMain — shared logic (domain, repo)'),
            tx('androidMain / iosMain — implementaciones nativas', 'androidMain / iosMain — native implementations'),
            tx('expect/actual — API común, impl específica', 'expect/actual — common API, specific impl'),
            tx('Compose Multiplatform para UI compartida', 'Compose Multiplatform for shared UI'),
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
  </div>
);

// ─── Interview Accordion ──────────────────────────────────────────────────────

const InterviewSection = ({ groups, tx }) => {
  const [openItems, setOpenItems] = useState({});

  const toggle = (key) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('Preguntas de Entrevista', 'Interview Q&A')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx(
            'Preguntas comunes de Junior a Senior para entrevistas de Kotlin.',
            'Common Junior to Senior interview questions for Kotlin positions.'
          )}
        </p>
      </div>

      {groups.map((group) => (
        <div key={group.level} className={`border ${group.color} rounded-xl p-4 space-y-3`}>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${group.badgeColor}`}>
              {group.level}
            </span>
          </div>
          {group.qa.map((item, qi) => {
            const key = `${group.level}-${qi}`;
            const isOpen = !!openItems[key];
            return (
              <div key={qi} className="border border-slate-700/50 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggle(key)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-800/40 transition-colors"
                >
                  <span className="font-semibold text-sm text-slate-200 pr-2">{item.q}</span>
                  {isOpen
                    ? <ChevronUp className="w-4 h-4 text-violet-400 flex-shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-700/50 bg-slate-900/30">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const renderInterview = (tx) => {
  const groups = [
    {
      level: 'Junior',
      color: 'border-green-500/30 bg-green-500/5',
      badgeColor: 'bg-green-500/20 text-green-300',
      qa: [
        {
          q: tx('¿Diferencia entre val y var?', 'val vs var — what\'s the difference?'),
          a: tx(
            'val es inmutable (como final en Java) — no puede reasignarse. var es mutable. El compilador de Kotlin fuerza el uso de val siempre que sea posible, haciendo el código más seguro y predecible.',
            "val is immutable (like Java final) — cannot be reassigned. var is mutable. Kotlin's compiler encourages val whenever possible, making code safer and more predictable."
          ),
        },
        {
          q: tx('¿Qué es null safety en Kotlin?', 'What is null safety in Kotlin?'),
          a: tx(
            'El sistema de tipos distingue entre tipos nullable (String?) y non-nullable (String). El compilador rechaza en tiempo de compilación cualquier acceso que pueda causar NPE. Los operadores ?. (safe call), ?: (Elvis) y !! (not-null assertion) gestionan los nulls explícitamente.',
            "The type system distinguishes nullable (String?) from non-nullable (String) types. The compiler rejects at compile time any access that could cause NPE. The ?. (safe call), ?: (Elvis) and !! (not-null assertion) operators handle nulls explicitly."
          ),
        },
        {
          q: tx('¿Data class vs clase regular?', 'Data class vs regular class?'),
          a: tx(
            'data class auto-genera equals/hashCode/toString/copy y componentN() para destructuring. Ideal para DTOs y Value Objects. No está diseñada para herencia (es final por defecto). Una clase regular necesita escribir todo eso a mano.',
            'data class auto-generates equals/hashCode/toString/copy and componentN() for destructuring. Ideal for DTOs and Value Objects. Not designed for inheritance (final by default). A regular class needs to write all of that manually.'
          ),
        },
        {
          q: tx('¿Qué es un companion object?', 'What is a companion object?'),
          a: tx(
            'Es un singleton asociado a la clase, que actúa como reemplazo de los miembros static de Java. Puede implementar interfaces y se accede con NombreClase.metodo(). Útil para factory functions y constantes relacionadas con la clase.',
            "A singleton associated with the class, acting as a replacement for Java's static members. Can implement interfaces, accessed as ClassName.method(). Useful for factory functions and class-related constants."
          ),
        },
      ],
    },
    {
      level: 'Mid',
      color: 'border-yellow-500/30 bg-yellow-500/5',
      badgeColor: 'bg-yellow-500/20 text-yellow-300',
      qa: [
        {
          q: tx('Coroutines vs threads — ¿cuándo usar cada uno?', 'Coroutines vs threads — when to use each?'),
          a: tx(
            'Los threads son pesados (~1MB stack, scheduling del OS). Las coroutines son ligeras — puedes lanzar miles en el mismo thread usando suspension points. Coroutines no bloquean el thread; cuando hacen suspend, el thread se libera para otro trabajo. Para I/O y trabajo asíncrono en Kotlin, siempre coroutines.',
            "Threads are heavyweight (~1MB stack, OS scheduling). Coroutines are lightweight — you can launch thousands on the same thread using suspension points. Coroutines don't block the thread; on suspend, the thread is freed for other work. For I/O and async work in Kotlin, always use coroutines."
          ),
        },
        {
          q: tx('¿Scope functions: let/run/apply/also/with?', 'Scope functions: let/run/apply/also/with?'),
          a: tx(
            'let: receptor como it, retorna lambda result. Útil para transformar non-null. run: receptor como this, retorna lambda result. Útil para inicializar. apply: receptor como this, retorna el receptor. Patrón builder. also: receptor como it, retorna el receptor. Para efectos secundarios/logging. with: no es extension, receptor como this, retorna lambda result.',
            'let: receiver as it, returns lambda result. Useful for transforming non-null. run: receiver as this, returns lambda result. Useful for initialization. apply: receiver as this, returns receiver. Builder pattern. also: receiver as it, returns receiver. For side-effects/logging. with: not an extension, receiver as this, returns lambda result.'
          ),
        },
        {
          q: tx('¿Sealed classes — cuándo y por qué?', 'Sealed classes — when and why?'),
          a: tx(
            'Sealed classes modelan un conjunto cerrado de subtipos conocidos en tiempo de compilación. El compilador verifica que el when sea exhaustivo, sin necesidad de else. Perfectas para estados de UI (Loading/Success/Error), resultados de operaciones y eventos unidireccionales.',
            'Sealed classes model a closed set of subtypes known at compile time. The compiler verifies that when is exhaustive — no need for else. Perfect for UI states (Loading/Success/Error), operation results and unidirectional events.'
          ),
        },
        {
          q: tx('Flow vs LiveData — ¿cuándo usar cada uno?', 'Flow vs LiveData — when to use each?'),
          a: tx(
            'LiveData está acoplado a Android y solo activo con lifecycle. Flow es puro Kotlin, testeable sin Android, composable con operadores (debounce, flatMapLatest, combine). StateFlow es equivalente a LiveData pero agnóstico de plataforma. Prefiere Flow en ViewModel; solo transforma a LiveData si necesitas compatibilidad con código legacy.',
            'LiveData is Android-coupled and only active with lifecycle. Flow is pure Kotlin, testable without Android, composable with operators (debounce, flatMapLatest, combine). StateFlow is the LiveData equivalent but platform-agnostic. Prefer Flow in ViewModel; only convert to LiveData for legacy code compatibility.'
          ),
        },
      ],
    },
    {
      level: 'Senior',
      color: 'border-red-500/30 bg-red-500/5',
      badgeColor: 'bg-red-500/20 text-red-300',
      qa: [
        {
          q: tx('¿Cómo evita structured concurrency los memory leaks?', 'How does structured concurrency prevent memory leaks?'),
          a: tx(
            "Toda coroutine tiene un padre explícito (CoroutineScope). Cuando el scope se cancela (p.ej. onCleared() del ViewModel), cancela automáticamente todas las coroutines hijas. Esto evita el patrón de GlobalScope.launch que crea coroutines huérfanas sin ciclo de vida. Si una hija falla, propaga el error al padre que cancela las otras hijas (a menos que uses SupervisorJob).",
            "Every coroutine has an explicit parent (CoroutineScope). When the scope is cancelled (e.g. ViewModel's onCleared()), it automatically cancels all child coroutines. This prevents the GlobalScope.launch pattern that creates orphaned coroutines with no lifecycle. If a child fails, the error propagates to the parent which cancels other children (unless you use SupervisorJob)."
          ),
        },
        {
          q: tx('StateFlow vs SharedFlow — diferencias de diseño', 'StateFlow vs SharedFlow — design differences'),
          a: tx(
            'StateFlow: siempre tiene un valor inicial, replay=1 (último valor), solo retiene el más reciente. Ideal para estado de UI que siempre necesita un valor actual. SharedFlow: configurable (replay, buffer, onBufferOverflow). Sin valor inicial necesario. Ideal para eventos one-shot (navegación, mensajes) donde no quieres que nuevos suscriptores vean eventos pasados.',
            "StateFlow: always has an initial value, replay=1 (latest value), only retains the most recent. Ideal for UI state that always needs a current value. SharedFlow: configurable (replay, buffer, onBufferOverflow). No required initial value. Ideal for one-shot events (navigation, messages) where new subscribers shouldn't see past events."
          ),
        },
        {
          q: tx('¿Cuándo usarías Kotlin Multiplatform?', 'When would you use Kotlin Multiplatform?'),
          a: tx(
            'KMP es ideal cuando la lógica de negocio es idéntica entre Android/iOS/web/JVM pero las UIs son nativas. El patrón es: domain models, repository interfaces, use cases en commonMain; implementaciones de red/DB en androidMain/iosMain con expect/actual. Evita duplicar reglas de validación, parsers y transformaciones. No lo usaría si el equipo de iOS no sabe Kotlin o si el 90% del código es UI.',
            "KMP is ideal when business logic is identical across Android/iOS/web/JVM but UIs are native. The pattern is: domain models, repository interfaces, use cases in commonMain; network/DB implementations in androidMain/iosMain with expect/actual. Avoids duplicating validation rules, parsers and transformations. I wouldn't use it if the iOS team doesn't know Kotlin or if 90% of the code is UI."
          ),
        },
        {
          q: tx('inline functions + reified generics — ¿cómo funcionan?', 'inline functions + reified generics — how do they work?'),
          a: tx(
            'Las inline functions copian el cuerpo de la función en el call site durante la compilación (elimina la overhead de lambda). Esto permite reified T: el tipo genérico es accesible en tiempo de ejecución (T::class.java) porque el compilador lo sustituye en el call site. Sin inline, los genéricos se borran por type erasure. Uso idiomático: inline fun <reified T> fromJson(json: String): T. Atención: el cuerpo inline aumenta el bytecode.',
            'inline functions copy the function body to the call site at compile time (eliminates lambda overhead). This enables reified T: the generic type is accessible at runtime (T::class.java) because the compiler substitutes it at each call site. Without inline, generics are erased by type erasure. Idiomatic use: inline fun <reified T> fromJson(json: String): T. Note: inlining increases bytecode size.'
          ),
        },
      ],
    },
  ];

  return <InterviewSection groups={groups} tx={tx} />;
};

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
