import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Cpu, Palette, List, Compass, Plug, Rocket, MessageCircleQuestion, ChevronDown } from 'lucide-react';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';

// ─── Shared UI ───────────────────────────────────────────────────────────────────

const SectionHeader = ({ title, subtitle }) => (
  <div>
    <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">{title}</h2>
    <p className="text-slate-400 text-sm">{subtitle}</p>
  </div>
);

const Cards = ({ cards }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {cards.map((card, i) => (
      <div key={i} className="border border-cyan-500/20 bg-slate-900/40 rounded-xl p-4">
        <h3 className="font-bold text-cyan-300 text-sm mb-2">{card.title}</h3>
        <ul className="space-y-1.5">
          {card.points.map((p, pi) => (
            <li key={pi} className="text-xs text-slate-400 flex gap-2">
              <span className="text-cyan-500 flex-shrink-0">▸</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const Callout = ({ title, children }) => (
  <div className="border border-slate-700/50 bg-slate-900/30 rounded-xl p-4">
    <p className="text-xs text-slate-400">
      <span className="font-bold text-cyan-300">{title} </span>
      {children}
    </p>
  </div>
);

const CompareTable = ({ headers, rows }) => (
  <div className="overflow-x-auto border border-cyan-500/20 rounded-xl">
    <table className="w-full text-xs">
      <thead className="bg-cyan-500/10">
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="text-left px-3 py-2 text-cyan-300 font-semibold whitespace-nowrap">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} className="border-t border-slate-800">
            {row.map((cell, ci) => (
              <td key={ci} className={`px-3 py-2 align-top ${ci === 0 ? 'text-slate-200 font-semibold whitespace-nowrap' : 'text-slate-400'}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Architecture Diagram ────────────────────────────────────────────────────────

const ArchitectureDiagram = ({ tx }) => {
  const [mode, setMode] = useState('new');
  const [step, setStep] = useState(0);

  const flows = {
    old: [
      { label: 'JS Thread', sub: tx('Tu código React', 'Your React code') },
      { label: 'JSON', sub: tx('Serializa mensaje', 'Serializes message') },
      { label: 'Bridge', sub: tx('Async, en batch', 'Async, batched') },
      { label: 'Native', sub: tx('Deserializa y ejecuta', 'Deserializes and runs') },
    ],
    new: [
      { label: 'JS Thread', sub: 'Hermes' },
      { label: 'JSI', sub: tx('Refs C++ directas', 'Direct C++ refs') },
      { label: 'TurboModules', sub: tx('Lazy, sync o async', 'Lazy, sync or async') },
      { label: 'Fabric', sub: tx('Renderer concurrente', 'Concurrent renderer') },
    ],
  };

  const nodes = flows[mode];

  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % nodes.length), 1200);
    return () => clearInterval(id);
  }, [nodes.length]);

  return (
    <div className="bg-slate-950/40 border border-cyan-500/20 rounded-xl p-4 space-y-4">
      <div className="flex justify-center gap-2">
        {[
          { id: 'old', label: tx('Arquitectura antigua (Bridge)', 'Legacy architecture (Bridge)') },
          { id: 'new', label: tx('Nueva Arquitectura (JSI)', 'New Architecture (JSI)') },
        ].map(b => (
          <button
            key={b.id}
            onClick={() => { setMode(b.id); setStep(0); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              mode === b.id
                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch gap-2">
        {nodes.map((node, i) => (
          <div key={`${mode}-${i}`} className="flex flex-col sm:flex-row items-center gap-2 sm:flex-1">
            <motion.div
              animate={{
                boxShadow: step === i ? '0 0 18px rgba(34,211,238,0.45)' : '0 0 0px transparent',
                opacity: step === i ? 1 : 0.55,
              }}
              transition={{ duration: 0.3 }}
              className={`w-full flex-1 border rounded-xl px-3 py-2 text-center ${
                mode === 'old' && i === 2 ? 'border-red-500/40 bg-red-500/10' : 'border-cyan-500/40 bg-cyan-500/10'
              }`}
            >
              <div className={`font-bold text-sm ${mode === 'old' && i === 2 ? 'text-red-300' : 'text-cyan-300'}`}>{node.label}</div>
              <div className="text-xs text-slate-500">{node.sub}</div>
            </motion.div>
            {i < nodes.length - 1 && <span className="text-slate-600 rotate-90 sm:rotate-0">→</span>}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center text-xs text-slate-500"
        >
          {mode === 'old'
            ? tx('Cuello de botella: todo cruza un bridge asíncrono serializando JSON', 'Bottleneck: everything crosses an async bridge serializing JSON')
            : tx('JS invoca objetos C++ directamente: sin serialización, llamadas síncronas posibles', 'JS calls C++ objects directly: no serialization, synchronous calls possible')}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

// ─── Virtualization Diagram ──────────────────────────────────────────────────────

const VirtualizationDiagram = ({ tx }) => {
  const total = 14;
  const viewportSize = 4;
  const buffer = 2;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setOffset(o => (o + 1) % (total - viewportSize + 1)), 900);
    return () => clearInterval(id);
  }, []);

  const stateOf = i => {
    if (i >= offset && i < offset + viewportSize) return 'visible';
    if (i >= offset - buffer && i < offset + viewportSize + buffer) return 'buffer';
    return 'unmounted';
  };

  const styles = {
    visible: 'bg-cyan-500/30 border-cyan-400/60 text-cyan-200',
    buffer: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400/70',
    unmounted: 'bg-transparent border-slate-800 border-dashed text-slate-700',
  };

  return (
    <div className="bg-slate-950/40 border border-cyan-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-cyan-400 uppercase tracking-wider">
        {tx('FlatList — virtualización', 'FlatList — virtualization')}
      </p>
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}>
        {Array.from({ length: total }).map((_, i) => {
          const s = stateOf(i);
          return (
            <motion.div
              key={i}
              animate={{ scale: s === 'visible' ? 1.05 : 1 }}
              className={`h-10 border rounded flex items-center justify-center text-[10px] font-mono ${styles[s]}`}
            >
              {s === 'unmounted' ? '' : i}
            </motion.div>
          );
        })}
      </div>
      <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-cyan-500/30 border border-cyan-400/60" />{tx('En pantalla', 'On screen')}</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-cyan-500/10 border border-cyan-500/30" />{tx('Buffer (windowSize)', 'Buffer (windowSize)')}</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded border border-dashed border-slate-700" />{tx('Desmontado', 'Unmounted')}</span>
      </div>
      <p className="text-center text-xs text-slate-500">
        {tx('ScrollView renderiza los 14 items; FlatList solo los cercanos al viewport', 'ScrollView renders all 14 items; FlatList only those near the viewport')}
      </p>
    </div>
  );
};

// ─── Interview Q&A ──────────────────────────────────────────────────────────────

const QAItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-cyan-500/20 bg-slate-900/40 rounded-xl">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-3 text-left px-4 py-3"
      >
        <span className="text-sm font-semibold text-slate-200">{q}</span>
        <ChevronDown className={`w-4 h-4 text-cyan-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 text-xs text-slate-400 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

function ReactNativePro() {
  const { language } = useLanguage();
  const tx = (es, en) => language === 'en' ? en : es;
  const [active, setActive] = useState('fundamentals');

  const sections = [
    { id: 'fundamentals', title: tx('Fundamentos', 'Fundamentals'), subtitle: tx('Core components, Expo', 'Core components, Expo'), icon: Smartphone },
    { id: 'architecture', title: tx('Arquitectura', 'Architecture'), subtitle: 'JSI, Fabric, TurboModules', icon: Cpu },
    { id: 'styling', title: tx('Estilos & Layout', 'Styling & Layout'), subtitle: 'StyleSheet, Flexbox, Platform', icon: Palette },
    { id: 'performance', title: tx('Listas & Performance', 'Lists & Performance'), subtitle: 'FlatList, Reanimated', icon: List },
    { id: 'navigation', title: tx('Navegación & Estado', 'Navigation & State'), subtitle: 'React Navigation, Expo Router', icon: Compass },
    { id: 'native', title: tx('Nativo & APIs', 'Native & APIs'), subtitle: tx('Módulos, permisos, storage', 'Modules, permissions, storage'), icon: Plug },
    { id: 'deploy', title: tx('Testing & Deploy', 'Testing & Deploy'), subtitle: 'RNTL, Detox, EAS', icon: Rocket },
    { id: 'interview', title: tx('Preguntas de entrevista', 'Interview Questions'), subtitle: tx('Respuestas listas', 'Ready-made answers'), icon: MessageCircleQuestion },
  ];

  // ─── Section: Fundamentals ──────────────────────────────────────────────────

  const renderFundamentals = () => (
    <div className="space-y-6">
      <SectionHeader
        title={tx('Fundamentos de React Native', 'React Native Fundamentals')}
        subtitle={tx(
          'React para construir apps nativas reales en iOS y Android: no es un WebView, renderiza vistas nativas.',
          'React for building truly native iOS and Android apps: not a WebView, it renders native views.'
        )}
      />

      <Cards cards={[
        {
          title: tx('¿Qué es React Native?', 'What is React Native?'),
          points: [
            tx('Mismo modelo de React (componentes, hooks, props, estado)', 'Same React model (components, hooks, props, state)'),
            tx('<View> se convierte en UIView (iOS) / android.view.View (Android)', '<View> becomes UIView (iOS) / android.view.View (Android)'),
            tx('JS corre en un motor (Hermes) y comunica con el lado nativo', 'JS runs in an engine (Hermes) and talks to the native side'),
            tx('"Learn once, write anywhere" — no "write once, run anywhere"', '"Learn once, write anywhere" — not "write once, run anywhere"'),
          ],
        },
        {
          title: tx('Core Components', 'Core Components'),
          points: [
            tx('<View> ≈ div · <Text> ≈ span/p (TODO texto va dentro de <Text>)', '<View> ≈ div · <Text> ≈ span/p (ALL text must be inside <Text>)'),
            tx('<Image>, <ScrollView>, <TextInput>, <FlatList>, <SectionList>', '<Image>, <ScrollView>, <TextInput>, <FlatList>, <SectionList>'),
            tx('<Pressable> reemplaza a TouchableOpacity/Highlight (API moderna)', '<Pressable> replaces TouchableOpacity/Highlight (modern API)'),
            tx('<Modal>, <ActivityIndicator>, <Switch>, <KeyboardAvoidingView>', '<Modal>, <ActivityIndicator>, <Switch>, <KeyboardAvoidingView>'),
          ],
        },
        {
          title: tx('React web vs React Native', 'React web vs React Native'),
          points: [
            tx('No hay DOM, ni HTML, ni CSS: no existen <div>, className ni selectores', 'No DOM, HTML or CSS: no <div>, className or selectors'),
            tx('onClick → onPress; onChange → onChangeText', 'onClick → onPress; onChange → onChangeText'),
            tx('Estilos con objetos JS, sin cascada ni herencia (salvo dentro de <Text>)', 'Styles are JS objects, no cascade or inheritance (except inside <Text>)'),
            tx('Navegación por stacks nativos, no por URLs del navegador', 'Navigation via native stacks, not browser URLs'),
          ],
        },
        {
          title: 'Expo vs React Native CLI',
          points: [
            tx('Expo es el framework recomendado oficialmente por el equipo de RN', 'Expo is the framework officially recommended by the RN team'),
            tx('Expo: Expo Router, EAS Build/Update, SDK de módulos, config plugins', 'Expo: Expo Router, EAS Build/Update, module SDK, config plugins'),
            tx('Con Development Builds puedes usar cualquier librería nativa (ya no hay "eject")', 'With Development Builds you can use any native library (no more "eject")'),
            tx('CLI "bare": control total de ios/ y android/, más mantenimiento manual', 'Bare CLI: full control of ios/ and android/, more manual maintenance'),
          ],
        },
      ]} />

      <CodeBlock language="jsx" code={`import { useState } from 'react';
import { View, Text, TextInput, Pressable, Image, StyleSheet } from 'react-native';

export default function ProfileCard({ user, onSave }) {
  const [name, setName] = useState(user.name);

  return (
    <View style={styles.card}>
      <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />

      {/* Todo texto DEBE ir dentro de <Text> */}
      <Text style={styles.title}>Hola, {name}</Text>

      <TextInput
        value={name}
        onChangeText={setName}            // no onChange
        placeholder="Tu nombre"
        autoCapitalize="words"
        style={styles.input}
      />

      <Pressable
        onPress={() => onSave(name)}       // no onClick
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Guardar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 12, backgroundColor: '#fff', gap: 12 },
  avatar: { width: 64, height: 64, borderRadius: 32 }, // remote images NECESITAN tamaño
  title: { fontSize: 18, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 },
  button: { backgroundColor: '#0ea5e9', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
});`} />

      <CodeBlock language="bash" code={`# Crear proyecto (forma recomendada)
npx create-expo-app@latest my-app
cd my-app && npx expo start      # Expo Go / emulador / dispositivo

# Development build (cuando usas librerías nativas propias)
npx expo run:ios
npx expo run:android

# Alternativa sin framework (bare)
npx @react-native-community/cli@latest init MyApp`} />
    </div>
  );

  // ─── Section: Architecture ──────────────────────────────────────────────────

  const renderArchitecture = () => (
    <div className="space-y-6">
      <SectionHeader
        title={tx('Arquitectura de React Native', 'React Native Architecture')}
        subtitle={tx(
          'La pregunta senior por excelencia: cómo se comunica JS con lo nativo y qué cambió con la New Architecture.',
          'The quintessential senior question: how JS talks to native and what changed with the New Architecture.'
        )}
      />

      <ArchitectureDiagram tx={tx} />

      <Cards cards={[
        {
          title: tx('Threads', 'Threads'),
          points: [
            tx('Main/UI thread: renderiza vistas nativas y recibe gestos', 'Main/UI thread: renders native views and handles gestures'),
            tx('JS thread: ejecuta tu código React, lógica y reconciliación', 'JS thread: runs your React code, logic and reconciliation'),
            tx('Background (layout): Yoga calcula el layout Flexbox en C++', 'Background (layout): Yoga computes Flexbox layout in C++'),
            tx('Si bloqueas el JS thread, la app deja de responder a toques', 'If you block the JS thread, the app stops responding to touches'),
          ],
        },
        {
          title: 'JSI (JavaScript Interface)',
          points: [
            tx('API en C++ que permite a JS tener referencias a objetos nativos', 'C++ API that lets JS hold references to native objects'),
            tx('Elimina la serialización JSON del bridge', 'Removes the bridge\'s JSON serialization'),
            tx('Permite llamadas síncronas (ej. MMKV, Reanimated, VisionCamera)', 'Enables synchronous calls (e.g. MMKV, Reanimated, VisionCamera)'),
            tx('Independiente del motor JS (Hermes, JSC)', 'Engine-agnostic (Hermes, JSC)'),
          ],
        },
        {
          title: 'Fabric & TurboModules',
          points: [
            tx('Fabric: nuevo renderer en C++, soporta features concurrentes de React 18+', 'Fabric: new C++ renderer, supports React 18+ concurrent features'),
            tx('Layout síncrono: medir y posicionar sin "saltos" visuales', 'Synchronous layout: measure and position without visual jumps'),
            tx('TurboModules: módulos nativos cargados de forma lazy vía JSI', 'TurboModules: native modules loaded lazily via JSI'),
            tx('Codegen: genera bindings tipados a partir de specs TS/Flow', 'Codegen: generates typed bindings from TS/Flow specs'),
          ],
        },
        {
          title: tx('Hermes & estado actual', 'Hermes & current state'),
          points: [
            tx('Hermes: motor JS de Meta optimizado para móvil (default desde 0.70)', 'Hermes: Meta\'s mobile-optimized JS engine (default since 0.70)'),
            tx('Precompila a bytecode en build → arranque más rápido y menos memoria', 'Precompiles to bytecode at build time → faster startup, less memory'),
            tx('New Architecture activada por defecto desde RN 0.76', 'New Architecture enabled by default since RN 0.76'),
            tx('Bridgeless mode: el bridge legacy ya no se inicializa', 'Bridgeless mode: the legacy bridge is no longer initialized'),
          ],
        },
      ]} />

      <CompareTable
        headers={[tx('Aspecto', 'Aspect'), tx('Antigua (Bridge)', 'Legacy (Bridge)'), tx('Nueva (JSI)', 'New (JSI)')]}
        rows={[
          [tx('Comunicación', 'Communication'), tx('Mensajes JSON asíncronos en batch', 'Async batched JSON messages'), tx('Referencias C++ directas', 'Direct C++ references')],
          [tx('Llamadas síncronas', 'Sync calls'), tx('No', 'No'), tx('Sí', 'Yes')],
          [tx('Carga de módulos', 'Module loading'), tx('Todos al inicio', 'All at startup'), tx('Lazy (bajo demanda)', 'Lazy (on demand)')],
          ['Renderer', 'Paper', 'Fabric (C++)'],
          [tx('Type safety', 'Type safety'), tx('Manual', 'Manual'), tx('Codegen desde specs', 'Codegen from specs')],
          ['React concurrente', tx('No soportado', 'Not supported'), tx('Suspense, transitions, automatic batching', 'Suspense, transitions, automatic batching')],
        ]}
      />
    </div>
  );

  // ─── Section: Styling ───────────────────────────────────────────────────────

  const renderStyling = () => (
    <div className="space-y-6">
      <SectionHeader
        title={tx('Estilos & Layout', 'Styling & Layout')}
        subtitle={tx(
          'Flexbox en todos lados, pero con defaults distintos a la web. Y siempre pensando en dos plataformas.',
          'Flexbox everywhere, but with different defaults than the web. Always thinking about two platforms.'
        )}
      />

      <Cards cards={[
        {
          title: tx('StyleSheet', 'StyleSheet'),
          points: [
            tx('StyleSheet.create valida y organiza estilos fuera del render', 'StyleSheet.create validates and organizes styles outside render'),
            tx('Propiedades en camelCase: backgroundColor, marginTop', 'camelCase properties: backgroundColor, marginTop'),
            tx('Arrays para combinar: style={[styles.a, isActive && styles.b]}', 'Arrays to combine: style={[styles.a, isActive && styles.b]}'),
            tx('Unidades sin "px": son density-independent pixels (dp/pt)', 'No "px" units: they are density-independent pixels (dp/pt)'),
          ],
        },
        {
          title: tx('Flexbox: diferencias con la web', 'Flexbox: differences from the web'),
          points: [
            tx('flexDirection default: column (web: row)', 'flexDirection default: column (web: row)'),
            tx('alignContent default: flex-start (web: stretch)', 'alignContent default: flex-start (web: stretch)'),
            tx('flexShrink default: 0 (web: 1)', 'flexShrink default: 0 (web: 1)'),
            tx('flex: 1 = ocupa el espacio disponible (un solo número)', 'flex: 1 = take available space (single number)'),
          ],
        },
        {
          title: tx('Plataformas & pantallas', 'Platforms & screens'),
          points: [
            'Platform.OS === "ios" | "android" · Platform.select({ ios, android })',
            tx('Archivos por plataforma: Button.ios.tsx / Button.android.tsx', 'Per-platform files: Button.ios.tsx / Button.android.tsx'),
            tx('useWindowDimensions() se actualiza al rotar (Dimensions.get no)', 'useWindowDimensions() updates on rotation (Dimensions.get does not)'),
            tx('Sombras: shadow* en iOS vs elevation en Android (o boxShadow en New Arch)', 'Shadows: shadow* on iOS vs elevation on Android (or boxShadow on New Arch)'),
          ],
        },
        {
          title: tx('Safe areas, teclado & theming', 'Safe areas, keyboard & theming'),
          points: [
            tx('react-native-safe-area-context: notch, home indicator, status bar', 'react-native-safe-area-context: notch, home indicator, status bar'),
            tx('KeyboardAvoidingView (behavior distinto por plataforma)', 'KeyboardAvoidingView (behavior differs per platform)'),
            tx('useColorScheme() para dark mode del sistema', 'useColorScheme() for system dark mode'),
            tx('Librerías: NativeWind (Tailwind), Tamagui, Unistyles, Restyle', 'Libraries: NativeWind (Tailwind), Tamagui, Unistyles, Restyle'),
          ],
        },
      ]} />

      <CodeBlock language="jsx" code={`import { View, Text, StyleSheet, Platform, useWindowDimensions, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Screen({ children }) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const scheme = useColorScheme();
  const isTablet = width >= 768;

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
        scheme === 'dark' && styles.dark,
        isTablet && { paddingHorizontal: 48 },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                     // ocupa toda la pantalla
    // flexDirection: 'column'   ← ya es el default en RN
    backgroundColor: '#fff',
  },
  dark: { backgroundColor: '#0f172a' },
  card: {
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 4 },
    }),
  },
});`} />
    </div>
  );

  // ─── Section: Performance ───────────────────────────────────────────────────

  const renderPerformance = () => (
    <div className="space-y-6">
      <SectionHeader
        title={tx('Listas & Performance', 'Lists & Performance')}
        subtitle={tx(
          'Objetivo: 60 fps (o 120 en pantallas ProMotion). Casi todos los problemas vienen de listas mal hechas o de un JS thread bloqueado.',
          'Goal: 60 fps (or 120 on ProMotion screens). Most issues come from badly built lists or a blocked JS thread.'
        )}
      />

      <VirtualizationDiagram tx={tx} />

      <Cards cards={[
        {
          title: 'FlatList vs ScrollView',
          points: [
            tx('ScrollView renderiza TODOS los hijos: solo para contenido corto', 'ScrollView renders ALL children: only for short content'),
            tx('FlatList virtualiza: monta solo lo cercano al viewport', 'FlatList virtualizes: mounts only what is near the viewport'),
            tx('SectionList para listas agrupadas con headers', 'SectionList for grouped lists with headers'),
            tx('FlashList (Shopify) recicla celdas: más rápida en listas grandes', 'FlashList (Shopify) recycles cells: faster for large lists'),
          ],
        },
        {
          title: tx('Optimizar FlatList', 'Optimizing FlatList'),
          points: [
            tx('keyExtractor estable (id, nunca el índice)', 'Stable keyExtractor (id, never the index)'),
            tx('renderItem memoizado + item con React.memo', 'Memoized renderItem + item wrapped in React.memo'),
            tx('getItemLayout si la altura es fija → evita medir', 'getItemLayout when height is fixed → skips measuring'),
            'initialNumToRender, windowSize, maxToRenderPerBatch, removeClippedSubviews',
          ],
        },
        {
          title: tx('Animaciones', 'Animations'),
          points: [
            tx('Animated API: usa useNativeDriver: true (solo transform/opacity)', 'Animated API: use useNativeDriver: true (transform/opacity only)'),
            tx('Reanimated: worklets que corren en el UI thread, no en JS', 'Reanimated: worklets that run on the UI thread, not JS'),
            tx('react-native-gesture-handler: gestos nativos sin pasar por JS', 'react-native-gesture-handler: native gestures without going through JS'),
            tx('LayoutAnimation para transiciones simples de layout', 'LayoutAnimation for simple layout transitions'),
          ],
        },
        {
          title: tx('Re-renders, imágenes & profiling', 'Re-renders, images & profiling'),
          points: [
            tx('React.memo, useMemo, useCallback (o React Compiler)', 'React.memo, useMemo, useCallback (or React Compiler)'),
            tx('expo-image / FastImage: caché de disco y memoria', 'expo-image / FastImage: disk and memory caching'),
            tx('Quita console.log en producción (cruzan al nativo)', 'Strip console.log in production (they cross to native)'),
            tx('React Native DevTools, Perf Monitor, Flashlight para medir', 'React Native DevTools, Perf Monitor, Flashlight to measure'),
          ],
        },
      ]} />

      <CodeBlock language="jsx" code={`import { memo, useCallback } from 'react';
import { FlatList, Text, Pressable } from 'react-native';

const ITEM_HEIGHT = 72;

const Row = memo(function Row({ item, onPress }) {
  return (
    <Pressable onPress={() => onPress(item.id)} style={{ height: ITEM_HEIGHT }}>
      <Text>{item.title}</Text>
    </Pressable>
  );
});

export function ProductList({ products, onSelect, loadMore }) {
  const renderItem = useCallback(
    ({ item }) => <Row item={item} onPress={onSelect} />,
    [onSelect]
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={item => item.id}              // estable, NO el index
      getItemLayout={(_, index) => ({            // altura fija → sin medir
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
      initialNumToRender={10}
      windowSize={5}                             // pantallas montadas alrededor
      onEndReached={loadMore}                    // paginación infinita
      onEndReachedThreshold={0.5}
      ListEmptyComponent={<Text>Sin productos</Text>}
    />
  );
}`} />

      <CodeBlock language="jsx" code={`// Reanimated: la animación corre en el UI thread (60/120 fps aunque JS esté ocupado)
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export function DraggableCard() {
  const x = useSharedValue(0);

  const pan = Gesture.Pan()
    .onUpdate(e => { x.value = e.translationX; })   // worklet → UI thread
    .onEnd(() => { x.value = withSpring(0); });

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[{ width: 120, height: 120, backgroundColor: '#06b6d4' }, style]} />
    </GestureDetector>
  );
}`} />
    </div>
  );

  // ─── Section: Navigation & State ────────────────────────────────────────────

  const renderNavigation = () => (
    <div className="space-y-6">
      <SectionHeader
        title={tx('Navegación & Estado', 'Navigation & State')}
        subtitle={tx(
          'No hay URLs de navegador: la navegación es una pila de pantallas nativas. El estado sigue las mismas reglas que en React web.',
          'There are no browser URLs: navigation is a stack of native screens. State follows the same rules as React web.'
        )}
      />

      <Cards cards={[
        {
          title: 'React Navigation',
          points: [
            tx('Native Stack: push/pop con transiciones nativas de cada plataforma', 'Native Stack: push/pop with each platform\'s native transitions'),
            tx('Bottom Tabs, Drawer, Material Top Tabs — se anidan entre sí', 'Bottom Tabs, Drawer, Material Top Tabs — they nest together'),
            'navigation.navigate("Details", { id }) · route.params',
            tx('Las pantallas NO se desmontan al navegar hacia adelante (useFocusEffect)', 'Screens are NOT unmounted when navigating forward (useFocusEffect)'),
          ],
        },
        {
          title: 'Expo Router',
          points: [
            tx('Routing basado en archivos (como Next.js) sobre React Navigation', 'File-based routing (like Next.js) built on React Navigation'),
            tx('app/(tabs)/index.tsx, app/product/[id].tsx, _layout.tsx', 'app/(tabs)/index.tsx, app/product/[id].tsx, _layout.tsx'),
            tx('Deep links automáticos para cada ruta', 'Automatic deep links for every route'),
            tx('Rutas tipadas, API routes y soporte web', 'Typed routes, API routes and web support'),
          ],
        },
        {
          title: tx('Estado', 'State'),
          points: [
            tx('Local: useState/useReducer — igual que en web', 'Local: useState/useReducer — same as web'),
            tx('Global de cliente: Zustand, Redux Toolkit, Jotai, Context', 'Global client state: Zustand, Redux Toolkit, Jotai, Context'),
            tx('Estado de servidor: TanStack Query (caché, retry, refetch on focus)', 'Server state: TanStack Query (cache, retry, refetch on focus)'),
            tx('Separa estado de servidor y de cliente — pregunta típica', 'Separate server and client state — a typical question'),
          ],
        },
        {
          title: tx('Persistencia', 'Persistence'),
          points: [
            tx('AsyncStorage: key-value asíncrono, simple, no cifrado', 'AsyncStorage: async key-value, simple, unencrypted'),
            tx('MMKV: síncrono vía JSI, ~30x más rápido que AsyncStorage', 'MMKV: synchronous via JSI, ~30x faster than AsyncStorage'),
            tx('expo-secure-store / Keychain: tokens y secretos (cifrado)', 'expo-secure-store / Keychain: tokens and secrets (encrypted)'),
            tx('SQLite (expo-sqlite), WatermelonDB, Realm: datos relacionales/offline', 'SQLite (expo-sqlite), WatermelonDB, Realm: relational/offline data'),
          ],
        },
      ]} />

      <CodeBlock language="bash" code={`# Expo Router — la estructura de carpetas ES la navegación
app/
├── _layout.tsx            # Stack raíz
├── (tabs)/
│   ├── _layout.tsx        # Tab navigator
│   ├── index.tsx          # → /
│   └── profile.tsx        # → /profile
├── product/[id].tsx       # → /product/42  (ruta dinámica)
└── +not-found.tsx`} />

      <CodeBlock language="jsx" code={`// app/product/[id].tsx
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { create } from 'zustand';

// Estado de cliente (global)
export const useCart = create(set => ({
  items: [],
  add: product => set(state => ({ items: [...state.items, product] })),
}));

export default function ProductScreen() {
  const { id } = useLocalSearchParams();
  const add = useCart(s => s.add);

  // Estado de servidor (caché, loading, error, refetch)
  const { data, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetch(\`https://api.example.com/products/\${id}\`).then(r => r.json()),
  });

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Error</Text>;

  return (
    <View>
      <Text>{data.name}</Text>
      <Button title="Añadir" onPress={() => { add(data); router.push('/cart'); }} />
    </View>
  );
}`} />
    </div>
  );

  // ─── Section: Native & APIs ─────────────────────────────────────────────────

  const renderNative = () => (
    <div className="space-y-6">
      <SectionHeader
        title={tx('Nativo & APIs del dispositivo', 'Native & Device APIs')}
        subtitle={tx(
          'Cuando JS no alcanza: cámara, permisos, notificaciones, sensores o tu propio código Swift/Kotlin.',
          'When JS is not enough: camera, permissions, notifications, sensors or your own Swift/Kotlin code.'
        )}
      />

      <Cards cards={[
        {
          title: tx('Módulos nativos', 'Native modules'),
          points: [
            tx('Turbo Native Modules: spec en TS → Codegen → implementación en Obj-C++/Kotlin', 'Turbo Native Modules: TS spec → Codegen → Obj-C++/Kotlin implementation'),
            tx('Expo Modules API: escribir módulos en Swift y Kotlin con un DSL simple', 'Expo Modules API: write modules in Swift and Kotlin with a simple DSL'),
            tx('Fabric Native Components para vistas nativas propias', 'Fabric Native Components for custom native views'),
            tx('Config plugins: modifican ios/ y android/ en el prebuild', 'Config plugins: modify ios/ and android/ during prebuild'),
          ],
        },
        {
          title: tx('Permisos', 'Permissions'),
          points: [
            tx('iOS: Info.plist con NSCameraUsageDescription, etc.', 'iOS: Info.plist with NSCameraUsageDescription, etc.'),
            tx('Android: AndroidManifest.xml + petición en runtime', 'Android: AndroidManifest.xml + runtime request'),
            tx('Pide el permiso en contexto, no al abrir la app', 'Ask for permission in context, not on app launch'),
            tx('Maneja "denegado permanentemente" → Linking.openSettings()', 'Handle "permanently denied" → Linking.openSettings()'),
          ],
        },
        {
          title: tx('Notificaciones & Deep linking', 'Notifications & Deep linking'),
          points: [
            tx('Push: APNs (iOS) y FCM (Android); expo-notifications unifica ambos', 'Push: APNs (iOS) and FCM (Android); expo-notifications unifies both'),
            tx('Deep links: esquema custom myapp://product/42', 'Deep links: custom scheme myapp://product/42'),
            tx('Universal Links (iOS) / App Links (Android): https verificados', 'Universal Links (iOS) / App Links (Android): verified https'),
            tx('Linking API para abrir URLs, teléfono, email, ajustes', 'Linking API to open URLs, phone, email, settings'),
          ],
        },
        {
          title: tx('Ciclo de vida & red', 'Lifecycle & network'),
          points: [
            tx('AppState: active / background / inactive', 'AppState: active / background / inactive'),
            tx('BackHandler para el botón atrás de Android', 'BackHandler for the Android back button'),
            tx('@react-native-community/netinfo para estado de conexión', '@react-native-community/netinfo for connectivity state'),
            tx('fetch funciona igual; iOS bloquea http plano por ATS', 'fetch works the same; iOS blocks plain http via ATS'),
          ],
        },
      ]} />

      <CodeBlock language="typescript" code={`// 1) Spec de un Turbo Native Module — Codegen genera los bindings
// specs/NativeDeviceInfo.ts
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getBatteryLevel(): number;               // síncrono gracias a JSI
  getDeviceName(): Promise<string>;        // asíncrono
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeDeviceInfo');`} />

      <CodeBlock language="swift" code={`// 2) Alternativa más simple: Expo Modules API (Swift)
import ExpoModulesCore

public class DeviceInfoModule: Module {
  public func definition() -> ModuleDefinition {
    Name("DeviceInfo")

    Function("getBatteryLevel") { () -> Float in
      UIDevice.current.isBatteryMonitoringEnabled = true
      return UIDevice.current.batteryLevel
    }

    AsyncFunction("getDeviceName") { () -> String in
      return UIDevice.current.name
    }
  }
}`} />

      <CodeBlock language="jsx" code={`// Permisos en contexto + AppState
import { useEffect, useRef } from 'react';
import { AppState, Linking, Alert, Button } from 'react-native';
import { useCameraPermissions } from 'expo-camera';

export function ScanButton({ onScan }) {
  const [permission, requestPermission] = useCameraPermissions();

  const handlePress = async () => {
    if (permission?.granted) return onScan();

    const result = await requestPermission();
    if (result.granted) return onScan();

    if (!result.canAskAgain) {
      Alert.alert('Permiso requerido', 'Actívalo en Ajustes', [
        { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
      ]);
    }
  };

  return <Button title="Escanear" onPress={handlePress} />;
}

export function useRefreshOnForeground(refetch) {
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    const sub = AppState.addEventListener('change', next => {
      if (appState.current.match(/inactive|background/) && next === 'active') refetch();
      appState.current = next;
    });
    return () => sub.remove();
  }, [refetch]);
}`} />
    </div>
  );

  // ─── Section: Testing & Deploy ──────────────────────────────────────────────

  const renderDeploy = () => (
    <div className="space-y-6">
      <SectionHeader
        title={tx('Testing, Build & Deploy', 'Testing, Build & Deploy')}
        subtitle={tx(
          'Publicar una app no es un deploy web: hay firmas, stores, revisiones y versiones viejas que siguen vivas en los teléfonos.',
          'Shipping an app is not a web deploy: there are signatures, stores, reviews and old versions still alive on phones.'
        )}
      />

      <Cards cards={[
        {
          title: 'Testing',
          points: [
            tx('Jest + React Native Testing Library (getByRole, getByText)', 'Jest + React Native Testing Library (getByRole, getByText)'),
            tx('Mockea módulos nativos (jest.mock) — no existen en Node', 'Mock native modules (jest.mock) — they do not exist in Node'),
            tx('E2E: Maestro (YAML, simple) o Detox (gray-box, sincronizado con la app)', 'E2E: Maestro (YAML, simple) or Detox (gray-box, synced with the app)'),
            tx('Prueba en dispositivos reales y en Android de gama baja', 'Test on real devices and low-end Android'),
          ],
        },
        {
          title: 'Build & EAS',
          points: [
            tx('EAS Build: compila iOS/Android en la nube (no necesitas Mac para iOS)', 'EAS Build: builds iOS/Android in the cloud (no Mac needed for iOS)'),
            tx('Perfiles en eas.json: development, preview, production', 'Profiles in eas.json: development, preview, production'),
            tx('EAS Submit: sube a App Store Connect y Google Play', 'EAS Submit: uploads to App Store Connect and Google Play'),
            tx('Firmado: certificados/provisioning (iOS), keystore (Android)', 'Signing: certificates/provisioning (iOS), keystore (Android)'),
          ],
        },
        {
          title: tx('OTA Updates', 'OTA Updates'),
          points: [
            tx('Actualizar el bundle JS sin pasar por la store (EAS Update)', 'Update the JS bundle without going through the store (EAS Update)'),
            tx('Solo JS/assets: un cambio nativo requiere nuevo build', 'JS/assets only: a native change requires a new build'),
            tx('runtimeVersion garantiza compatibilidad JS ↔ binario nativo', 'runtimeVersion guarantees JS ↔ native binary compatibility'),
            tx('CodePush (App Center) fue retirado en 2025', 'CodePush (App Center) was retired in 2025'),
          ],
        },
        {
          title: tx('Producción', 'Production'),
          points: [
            tx('Crash reporting: Sentry, Crashlytics (con source maps)', 'Crash reporting: Sentry, Crashlytics (with source maps)'),
            tx('Feature flags y forced update para versiones viejas', 'Feature flags and forced updates for old versions'),
            tx('Versionado: version (visible) vs buildNumber/versionCode', 'Versioning: version (user-facing) vs buildNumber/versionCode'),
            tx('Staged rollout en Play Store / phased release en App Store', 'Staged rollout on Play Store / phased release on App Store'),
          ],
        },
      ]} />

      <CodeBlock language="jsx" code={`// React Native Testing Library
import { render, screen, fireEvent } from '@testing-library/react-native';
import ProfileCard from './ProfileCard';

jest.mock('expo-haptics', () => ({ impactAsync: jest.fn() }));

test('guarda el nombre editado', () => {
  const onSave = jest.fn();
  render(<ProfileCard user={{ name: 'Ana', avatarUrl: 'x' }} onSave={onSave} />);

  fireEvent.changeText(screen.getByPlaceholderText('Tu nombre'), 'Leo');
  fireEvent.press(screen.getByRole('button', { name: 'Guardar' }));

  expect(onSave).toHaveBeenCalledWith('Leo');
});`} />

      <CodeBlock language="yaml" code={`# Maestro E2E — flows/login.yaml
appId: com.example.myapp
---
- launchApp
- tapOn: "Email"
- inputText: "ana@example.com"
- tapOn: "Contraseña"
- inputText: "secret123"
- tapOn: "Entrar"
- assertVisible: "Bienvenida, Ana"`} />

      <CodeBlock language="json" code={`// eas.json
{
  "build": {
    "development": { "developmentClient": true, "distribution": "internal" },
    "preview":     { "distribution": "internal", "channel": "preview" },
    "production":  { "autoIncrement": true, "channel": "production" }
  },
  "submit": { "production": {} }
}

// Comandos:
// eas build --platform all --profile production
// eas submit --platform ios
// eas update --channel production --message "fix: crash en checkout"`} />
    </div>
  );

  // ─── Section: Interview Q&A ─────────────────────────────────────────────────

  const qa = [
    {
      q: tx('¿React Native es un WebView?', 'Is React Native a WebView?'),
      a: tx(
        'No. A diferencia de Cordova/Ionic, React Native renderiza componentes nativos reales (UIView, android.view.View). JS solo describe la UI; el renderer (Fabric) crea y actualiza las vistas nativas.',
        'No. Unlike Cordova/Ionic, React Native renders real native components (UIView, android.view.View). JS only describes the UI; the renderer (Fabric) creates and updates native views.'
      ),
    },
    {
      q: tx('¿Qué problema resuelve la New Architecture?', 'What problem does the New Architecture solve?'),
      a: tx(
        'El bridge asíncrono serializaba todo a JSON, lo que añadía latencia, impedía llamadas síncronas y cargaba todos los módulos al inicio. JSI permite que JS tenga referencias directas a objetos C++; TurboModules carga módulos bajo demanda; Fabric habilita el render concurrente de React y layout síncrono; Codegen aporta type safety entre JS y nativo.',
        'The async bridge serialized everything to JSON, adding latency, preventing synchronous calls and loading every module at startup. JSI lets JS hold direct references to C++ objects; TurboModules load on demand; Fabric enables React concurrent rendering and synchronous layout; Codegen adds type safety between JS and native.'
      ),
    },
    {
      q: tx('¿Por qué mi animación se traba cuando la app está ocupada?', 'Why does my animation stutter when the app is busy?'),
      a: tx(
        'Porque corre en el JS thread y éste está bloqueado. Solución: Animated con useNativeDriver: true (para transform/opacity) o Reanimated, cuyos worklets se ejecutan en el UI thread. Para gestos, react-native-gesture-handler.',
        'Because it runs on the JS thread and that thread is blocked. Fix: Animated with useNativeDriver: true (for transform/opacity) or Reanimated, whose worklets run on the UI thread. For gestures, react-native-gesture-handler.'
      ),
    },
    {
      q: tx('FlatList vs ScrollView vs FlashList', 'FlatList vs ScrollView vs FlashList'),
      a: tx(
        'ScrollView monta todos los hijos (bien para contenido corto). FlatList virtualiza: solo monta los items cerca del viewport y desmonta los lejanos. FlashList recicla las celdas en lugar de desmontarlas, reduciendo blank cells y uso de memoria en listas largas.',
        'ScrollView mounts every child (fine for short content). FlatList virtualizes: mounts only items near the viewport and unmounts distant ones. FlashList recycles cells instead of unmounting them, reducing blank cells and memory in long lists.'
      ),
    },
    {
      q: tx('¿Expo o React Native CLI?', 'Expo or React Native CLI?'),
      a: tx(
        'Hoy Expo es el framework recomendado oficialmente. Con development builds y config plugins puedes usar cualquier librería nativa, así que la razón histórica para evitar Expo ya no aplica. El CLI "bare" tiene sentido si necesitas control total de los proyectos nativos o integras RN en una app nativa existente (brownfield).',
        'Expo is now the officially recommended framework. With development builds and config plugins you can use any native library, so the historical reason to avoid Expo no longer applies. Bare CLI makes sense when you need full control over native projects or embed RN into an existing native app (brownfield).'
      ),
    },
    {
      q: tx('¿Dónde guardas un token de autenticación?', 'Where do you store an auth token?'),
      a: tx(
        'En almacenamiento seguro: Keychain (iOS) / Keystore (Android), vía expo-secure-store o react-native-keychain. Nunca en AsyncStorage, que no está cifrado. MMKV sirve para preferencias y caché, aunque soporta cifrado opcional.',
        'In secure storage: Keychain (iOS) / Keystore (Android), via expo-secure-store or react-native-keychain. Never in AsyncStorage, which is unencrypted. MMKV is good for preferences and cache, though it supports optional encryption.'
      ),
    },
    {
      q: tx('¿Qué se puede actualizar por OTA y qué no?', 'What can be updated OTA and what cannot?'),
      a: tx(
        'Por OTA (EAS Update) solo el bundle JS y los assets. Cualquier cambio nativo (nueva librería con código nativo, permisos, versión de RN, config de Info.plist/Manifest) requiere un build nuevo y pasar por la store. runtimeVersion evita enviar JS incompatible a un binario viejo. Además, las stores prohíben cambiar el propósito de la app vía OTA.',
        'Over the air (EAS Update) only the JS bundle and assets. Any native change (new library with native code, permissions, RN version, Info.plist/Manifest config) requires a new build and store review. runtimeVersion prevents shipping incompatible JS to an old binary. Stores also forbid changing the app\'s purpose via OTA.'
      ),
    },
    {
      q: tx('¿Cómo depuras un problema de performance?', 'How do you debug a performance problem?'),
      a: tx(
        'Mido primero: Perf Monitor (FPS de JS y UI thread por separado), React Native DevTools (profiler de React y de JS), y herramientas nativas (Xcode Instruments, Android Studio Profiler). Si cae el FPS de JS: re-renders o trabajo pesado en JS. Si cae el de UI: vistas demasiado complejas, overdraw o imágenes grandes. Siempre probar en build de release y en un Android de gama baja.',
        'Measure first: Perf Monitor (JS and UI thread FPS separately), React Native DevTools (React and JS profiler), and native tools (Xcode Instruments, Android Studio Profiler). JS FPS drops: re-renders or heavy JS work. UI FPS drops: overly complex views, overdraw or large images. Always test a release build on a low-end Android device.'
      ),
    },
    {
      q: tx('¿Qué es Hermes y por qué importa?', 'What is Hermes and why does it matter?'),
      a: tx(
        'Es el motor JS de Meta optimizado para móvil y el default desde RN 0.70. Compila el JS a bytecode en tiempo de build, así que la app no parsea ni compila JS al arrancar: mejor tiempo de inicio (TTI), menos memoria y APK más pequeño.',
        'It is Meta\'s mobile-optimized JS engine and the default since RN 0.70. It compiles JS to bytecode at build time, so the app does not parse or compile JS at startup: better time to interactive, lower memory and smaller APK.'
      ),
    },
    {
      q: tx('¿Cómo manejas diferencias entre iOS y Android?', 'How do you handle iOS vs Android differences?'),
      a: tx(
        'Platform.OS / Platform.select para diferencias pequeñas; archivos .ios.tsx / .android.tsx para componentes muy distintos. Cosas típicas: sombras (shadow* vs elevation), KeyboardAvoidingView behavior, botón atrás de Android (BackHandler), safe areas, permisos y fuentes.',
        'Platform.OS / Platform.select for small differences; .ios.tsx / .android.tsx files for very different components. Typical spots: shadows (shadow* vs elevation), KeyboardAvoidingView behavior, Android back button (BackHandler), safe areas, permissions and fonts.'
      ),
    },
  ];

  const renderInterview = () => (
    <div className="space-y-6">
      <SectionHeader
        title={tx('Preguntas de entrevista', 'Interview Questions')}
        subtitle={tx(
          'Las preguntas que más se repiten en entrevistas de React Native, con respuestas listas para usar.',
          'The most frequent React Native interview questions, with ready-to-use answers.'
        )}
      />
      <div className="space-y-2">
        {qa.map((item, i) => <QAItem key={i} q={item.q} a={item.a} />)}
      </div>
      <Callout title={tx('Tip:', 'Tip:')}>
        {tx(
          'en entrevistas senior casi siempre aparecen tres temas: arquitectura (Bridge vs JSI), performance de listas/animaciones, y el ciclo de release (builds, OTA, versiones viejas en producción).',
          'senior interviews almost always cover three topics: architecture (Bridge vs JSI), list/animation performance, and the release cycle (builds, OTA, old versions in production).'
        )}
      </Callout>
    </div>
  );

  const renderContent = () => {
    switch (active) {
      case 'fundamentals': return renderFundamentals();
      case 'architecture': return renderArchitecture();
      case 'styling': return renderStyling();
      case 'performance': return renderPerformance();
      case 'navigation': return renderNavigation();
      case 'native': return renderNative();
      case 'deploy': return renderDeploy();
      case 'interview': return renderInterview();
      default: return renderFundamentals();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 lg:h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <div className="lg:col-span-1 lg:overflow-y-auto lg:pr-2">
        <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-hidden lg:pb-0 lg:space-y-2">
          {sections.map(section => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActive(section.id)}
                className={`flex-shrink-0 lg:w-full text-left px-3 py-2 lg:px-4 lg:py-3 rounded-xl transition-all ${
                  active === section.id
                    ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300'
                    : 'bg-slate-800/30 border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-2 lg:gap-3">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${active === section.id ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <div className="min-w-0">
                    <div className="font-semibold text-sm whitespace-nowrap lg:whitespace-normal">{section.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5 hidden lg:block">{section.subtitle}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content panel */}
      <div className="lg:col-span-3 lg:overflow-y-auto lg:pr-2 space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ReactNativePro;
