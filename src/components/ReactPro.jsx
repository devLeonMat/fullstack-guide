import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Puzzle, MessageCircleQuestion } from 'lucide-react';
import { SiReact } from 'react-icons/si';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';

function ReactPro() {
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
      title: tx('Conceptos Core', 'Core Concepts'),
      subtitle: tx('Fundamentos de React', 'React fundamentals'),
      content: [
        {
          topic: 'Virtual DOM',
          desc: 'Representación en memoria del DOM real',
          explanation: 'React crea una copia virtual del DOM. Cuando el estado cambia, compara el Virtual DOM con el anterior (diffing) y actualiza solo lo necesario en el DOM real (reconciliation).',
          code: `// React actualiza eficientemente
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
  // Solo se actualiza el texto del h1, no todo el componente
}`,
          points: [
            'Diffing Algorithm: Compara árboles en O(n)',
            'Reconciliation: Actualiza solo cambios',
            'Batch Updates: Agrupa múltiples cambios',
            'Keys: Ayudan a identificar elementos en listas'
          ]
        },
        {
          topic: 'JSX',
          desc: 'Sintaxis de extensión de JavaScript',
          explanation: 'JSX es azúcar sintáctico para React.createElement(). Permite escribir HTML en JavaScript con toda la potencia de JS.',
          code: `// JSX
const element = <h1 className="title">Hello, {name}</h1>;

// Se compila a:
const element = React.createElement(
  'h1',
  { className: 'title' },
  'Hello, ',
  name
);

// Expresiones JavaScript
const user = {
  name: 'Juan',
  age: 30
};

return (
  <div>
    {user.age >= 18 ? <p>Adult</p> : <p>Minor</p>}
    {items.map(item => <Item key={item.id} {...item} />)}
  </div>
);`,
          points: [
            'className en lugar de class',
            'Expresiones JS entre llaves {}',
            'Componentes en PascalCase',
            'Fragmentos: <></> para evitar divs innecesarios'
          ]
        },
        {
          topic: 'Props vs State',
          desc: 'Datos inmutables vs mutables',
          explanation: 'Props son argumentos pasados de padre a hijo (inmutables). State es data interna del componente (mutable con setState).',
          code: `// Props (inmutables, pasadas por el padre)
function Greeting({ name, age }) {
  return <h1>Hello {name}, you are {age}</h1>;
}

<Greeting name="Juan" age={30} />

// State (mutable, interno del componente)
function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setCount(count + 1); // Actualiza state
  };
  
  return <button onClick={increment}>{count}</button>;
}`,
          points: [
            'Props: Read-only, vienen del padre',
            'State: Local, cambia con setState',
            'Props + State: UI = f(props, state)',
            'Lifting state: Mover state al ancestro común'
          ]
        },
        {
          topic: 'Unidirectional Data Flow',
          desc: 'Flujo de datos de arriba hacia abajo',
          explanation: 'Los datos fluyen del componente padre al hijo mediante props. Los hijos notifican cambios mediante callbacks.',
          code: `// Padre
function Parent() {
  const [data, setData] = useState('');
  
  const handleChange = (newData) => {
    setData(newData); // Actualiza en padre
  };
  
  return <Child data={data} onChange={handleChange} />;
}

// Hijo
function Child({ data, onChange }) {
  return (
    <input 
      value={data} 
      onChange={(e) => onChange(e.target.value)}
    />
  );
}`,
          points: [
            'Props fluyen hacia abajo (top-down)',
            'Eventos fluyen hacia arriba (callbacks)',
            'Single source of truth',
            'Predecible y fácil de debuggear'
          ]
        }
      ]
    },
    hooks: {
      title: tx('Dominio de Hooks', 'Hooks Mastery'),
      subtitle: tx('Domina los hooks de React', 'Master React hooks'),
      content: [
        {
          topic: 'useState',
          desc: 'Estado local en componentes funcionales',
          code: `function Form() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  
  // Actualización funcional (cuando depende del valor anterior)
  const [count, setCount] = useState(0);
  const increment = () => setCount(prev => prev + 1);
  
  // Lazy initialization (costoso solo primera vez)
  const [data] = useState(() => expensiveComputation());
  
  return (
    <input value={name} onChange={e => setName(e.target.value)} />
  );
}`,
          points: [
            'Retorna [valor, setter]',
            'Setter puede recibir función updater',
            'Lazy initialization con función',
            'Múltiples useState en un componente'
          ]
        },
        {
          topic: 'useEffect',
          desc: 'Efectos secundarios y sincronización',
          code: `function Profile({ userId }) {
  const [user, setUser] = useState(null);
  
  // Se ejecuta después de cada render
  useEffect(() => {
    console.log('Component rendered');
  });
  
  // Solo en mount ([] vacío)
  useEffect(() => {
    console.log('Component mounted');
  }, []);
  
  // Cuando userId cambia
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  // Cleanup function
  useEffect(() => {
    const timer = setInterval(() => console.log('tick'), 1000);
    return () => clearInterval(timer); // Cleanup
  }, []);
}`,
          points: [
            'Ejecuta después del render',
            'Dependencies array controla cuándo se ejecuta',
            'Cleanup function para limpiar',
            'No usar para lógica sincrónica'
          ]
        },
        {
          topic: 'useMemo',
          desc: 'Memoización de valores calculados',
          code: `function ExpensiveComponent({ items, filter }) {
  // Sin useMemo: se recalcula en cada render
  const filtered = items.filter(item => 
    item.name.includes(filter)
  );
  
  // Con useMemo: solo recalcula si items o filter cambian
  const filteredMemo = useMemo(() => {
    return items.filter(item => item.name.includes(filter));
  }, [items, filter]);
  
  // Cálculos costosos
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);
  
  return <List items={filteredMemo} />;
}`,
          points: [
            'Cachea valores calculados',
            'Solo recalcula si dependencies cambian',
            'Optimización de performance',
            'No abuses: tiene su costo'
          ]
        },
        {
          topic: 'useCallback',
          desc: 'Memoización de funciones',
          code: `function Parent() {
  const [count, setCount] = useState(0);
  
  // Sin useCallback: nueva función en cada render
  const increment = () => setCount(c => c + 1);
  
  // Con useCallback: misma referencia
  const incrementMemo = useCallback(() => {
    setCount(c => c + 1);
  }, []); // [] = nunca cambia
  
  // Con dependencias
  const addAmount = useCallback((amount) => {
    setCount(c => c + amount);
  }, []); // amount es parámetro, no dependency
  
  // Pasa a hijo que usa React.memo
  return <Child onClick={incrementMemo} />;
}

const Child = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Click</button>;
});`,
          points: [
            'Cachea funciones entre renders',
            'Útil para React.memo y useEffect deps',
            'Evita re-renders innecesarios',
            'useCallback(fn, deps) = useMemo(() => fn, deps)'
          ]
        },
        {
          topic: 'useContext',
          desc: 'Acceso a Context sin prop drilling',
          code: `// Crear contexto
const ThemeContext = createContext('light');

// Provider
function App() {
  const [theme, setTheme] = useState('dark');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// Consumir con useContext
function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button 
      style={{ background: theme === 'dark' ? '#000' : '#fff' }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      Toggle Theme
    </button>
  );
}`,
          points: [
            'Evita prop drilling',
            'Acceso directo a valores del contexto',
            'Re-render cuando contexto cambia',
            'Combina múltiples contexts'
          ]
        }
      ]
    },
    patterns: {
      title: 'Patterns',
      subtitle: tx('Patrones avanzados de React', 'Advanced React patterns'),
      content: [
        {
          topic: 'Higher-Order Components (HOC)',
          desc: 'Componentes que reciben componentes',
          code: `// HOC que agrega autenticación
function withAuth(Component) {
  return function AuthComponent(props) {
    const { user } = useAuth();
    
    if (!user) {
      return <Redirect to="/login" />;
    }
    
    return <Component {...props} user={user} />;
  };
}

// Uso
const ProtectedProfile = withAuth(ProfilePage);

// HOC con configuración
function withLogging(Component, options = {}) {
  return function LoggedComponent(props) {
    useEffect(() => {
      console.log(\`\${Component.name} mounted\`, options);
    }, []);
    
    return <Component {...props} />;
  };
}`,
          points: [
            'Reutilización de lógica entre componentes',
            'No modifica el componente original',
            'Composición sobre herencia',
            'Hooks son mejor alternativa moderna'
          ]
        },
        {
          topic: 'Render Props',
          desc: 'Compartir código usando props función',
          code: `// Componente con render prop
function Mouse({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  
  return render(position);
}

// Uso
<Mouse render={({ x, y }) => (
  <h1>Position: {x}, {y}</h1>
)} />

// O como children
<Mouse>
  {({ x, y }) => <h1>Position: {x}, {y}</h1>}
</Mouse>`,
          points: [
            'Flexibilidad máxima en renderizado',
            'Lógica reutilizable',
            'Puede causar "callback hell"',
            'Custom Hooks son mejor ahora'
          ]
        },
        {
          topic: 'Custom Hooks',
          desc: 'Extrae lógica reutilizable',
          code: `// Custom hook para fetch
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);
  
  return { data, loading, error };
}

// Uso
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(\`/api/users/\${userId}\`);
  
  if (loading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  return <Profile user={user} />;
}

// Custom hook para localStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];
}`,
          points: [
            'Prefijo "use" obligatorio',
            'Compone hooks existentes',
            'Reutilización de lógica stateful',
            'Mejor que HOCs y Render Props'
          ]
        },
        {
          topic: 'Composition',
          desc: 'Composición de componentes',
          code: `// Componente contenedor genérico
function Card({ children, title, footer }) {
  return (
    <div className="card">
      <header>{title}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </div>
  );
}

// Composition vs Inheritance
function Dialog({ children }) {
  return (
    <div className="dialog">
      {children}
    </div>
  );
}

// Usa composition
function WelcomeDialog() {
  return (
    <Dialog>
      <h1>Welcome</h1>
      <p>Thanks for visiting!</p>
    </Dialog>
  );
}

// Slots pattern
function Layout({ header, sidebar, content, footer }) {
  return (
    <div>
      <header>{header}</header>
      <div className="main">
        <aside>{sidebar}</aside>
        <main>{content}</main>
      </div>
      <footer>{footer}</footer>
    </div>
  );
}`,
          points: [
            'Favorece composition sobre herencia',
            'children prop para contenido genérico',
            'Multiple slots con props nombrados',
            'Flexibilidad y reutilización'
          ]
        }
      ]
    }
  };

  const renderSectionContent = (content) => {
    return (
      <div className="space-y-6">
        {content.map((item, idx) => (
          <div key={idx} className="bg-slate-900/50 border border-blue-500/30 rounded-xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <SiReact className="w-6 h-6 text-blue-400 mt-1" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-blue-400">{item.topic}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            </div>

            {item.explanation && (
              <p className="text-slate-300 mb-4 leading-relaxed">{item.explanation}</p>
            )}

            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 mb-4 overflow-x-auto">
              <CodeBlock code={item.code} language="javascript" />
            </div>

            <ul className="space-y-2">
              {item.points.map((point, pIdx) => (
                <li key={pIdx} className="flex items-start gap-2 text-slate-300 text-sm">
                  <span className="text-blue-400">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  const sectionList = Object.values(sections).map((section, idx) => ({
    ...section,
    id: Object.keys(sections)[idx]
  }));
  const currentSection = sections[activeSection];

  return (
    <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-2 overflow-y-auto pr-2">
        <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
          <SiReact className="w-6 h-6" />
          {t('react', language).title}
        </h3>
        {sectionList.map((section) => {
          const Icon = section.id === 'core' ? Layers : section.id === 'hooks' ? SiReact : section.id === 'versions' ? SiReact : Puzzle;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${activeSection === section.id
                ? 'bg-blue-500/20 border border-blue-500/50 text-blue-300'
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
          <h2 className="text-3xl font-bold text-blue-400 mb-2">{currentSection.title}</h2>
          <p className="text-slate-400">{currentSection.subtitle}</p>
        </div>
        <div className="animate-fade-in">
          {currentSection.isVersionSection
            ? renderVersionContent(currentSection.content)
            : renderSectionContent(currentSection.content)
          }
        </div>
      </div>
    </div>
  );
}

export default ReactPro;
