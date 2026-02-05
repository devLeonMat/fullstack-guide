import { useState } from 'react';
import { Lightbulb, Recycle, Scissors, Sparkles, FileText, Wrench, Target, Shield, BookOpen, Zap, CheckCircle, XCircle } from 'lucide-react';
import CodeBlock from './CodeBlock';

function CleanCode() {
    const [selectedPrinciple, setSelectedPrinciple] = useState('dry');

    const principles = {
        dry: {
            id: 'dry',
            icon: Recycle,
            title: 'DRY',
            subtitle: "Don't Repeat Yourself",
            summary: 'No repitas código / Don\'t repeat code',
            explanation: 'Cada pieza de conocimiento debe tener una única representación en el sistema. La duplicación aumenta el mantenimiento y los bugs.',
            bad: `// ❌ Código duplicado
function calculateAreaSquare(side) {
  return side * side;
}
function calculateAreaRectangle(w, h) {
  return w * h;
}`,
            good: `// ✅ Código reutilizable
function calculateArea(shape, ...dims) {
  if (shape === 'square') return dims[0] ** 2;
  if (shape === 'rectangle') return dims[0] * dims[1];
}`
        },
        kiss: {
            id: 'kiss',
            icon: Scissors,
            title: 'KISS',
            subtitle: 'Keep It Simple, Stupid',
            summary: 'Mantén las cosas simples / Keep things simple',
            explanation: 'La simplicidad debe ser un objetivo clave del diseño. Evita la complejidad innecesaria.',
            bad: `// ❌ Excesivamente complejo
const isEven = n => (n & 1) === 0 ? true : false;`,
            good: `// ✅ Simple y claro
const isEven = n => n % 2 === 0;`
        },
        yagni: {
            id: 'yagni',
            icon: Target,
            title: 'YAGNI',
            subtitle: "You Aren't Gonna Need It",
            summary: 'No lo necesitarás / You won\'t need it',
            explanation: 'No agregues funcionalidad hasta que realmente la necesites.',
            bad: `// ❌ Código especulativo
class User {
  constructor(name) {
    this.name = name;
    this.preferences = {}; // "Por si acaso"
    this.history = []; // "Tal vez lo usemos"
  }
}`,
            good: `// ✅ Solo lo necesario
class User {
  constructor(name) {
    this.name = name;
  }
}`
        },
        boyscout: {
            id: 'boyscout',
            icon: Sparkles,
            title: 'Boy Scout Rule',
            subtitle: 'Leave it Better',
            summary: 'Deja el código mejor de como lo encontraste',
            explanation: 'Siempre deja el código un poco mejor que como lo encontraste.',
            bad: `// ❌ Ignorar código problemático
function process(data) {
  // TODO: Refactor esto
  var x = data.split(',');
  return x;
}`,
            good: `// ✅ Mejorar al pasar
function parseCSV(csvString) {
  return csvString
    .split(',')
    .map(item => item.trim());
}`
        },
        selfdoc: {
            id: 'selfdoc',
            icon: FileText,
            title: 'Self-Documenting Code',
            subtitle: 'Code as Documentation',
            summary: 'El código debe explicarse a sí mismo',
            explanation: 'Usa nombres descriptivos que hagan obvio el propósito del código.',
            bad: `// ❌ Necesita comentarios
let d; // days
let u; // user`,
            good: `// ✅ Auto-explicativo
let daysUntilExpiration;
let currentUser;`
        },
        srp: {
            id: 'srp',
            icon: Wrench,
            title: 'Single Responsibility',
            subtitle: 'One Job Per Function',
            summary: 'Una función, una responsabilidad',
            explanation: 'Cada función debe hacer una sola cosa y hacerla bien.',
            bad: `// ❌ Hace demasiado
function processUser(user) {
  validateUser(user);
  saveToDatabase(user);
  sendEmail(user);
  logAction(user);
}`,
            good: `// ✅ Responsabilidades separadas
function processUser(user) {
  const valid = validateUser(user);
  if (valid) {
    return saveUser(user);
  }
}

function notifyUser(user) {
  sendEmail(user);
  logAction(user);
}`
        },
        defensive: {
            id: 'defensive',
            icon: Shield,
            title: 'Defensive Programming',
            subtitle: 'Expect the Unexpected',
            summary: 'Anticipa errores / Anticipate errors',
            explanation: 'Valida entradas y maneja casos extremos proactivamente.',
            bad: `// ❌ Asume datos correctos
function divide(a, b) {
  return a / b;
}`,
            good: `// ✅ Valida y protege
function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Invalid arguments');
  }
  return a / b;
}`
        },
        naming: {
            id: 'naming',
            icon: BookOpen,
            title: 'Meaningful Names',
            subtitle: 'Intention-Revealing Names',
            summary: 'Nombres que revelen intención',
            explanation: 'Los nombres deben revelar la intención sin necesidad de comentarios.',
            bad: `// ❌ Nombres crípticos
let d = new Date();
let arr = [];`,
            good: `// ✅ Nombres significativos
let createdAt = new Date();
let activeUsers = [];`
        },
        failfast: {
            id: 'failfast',
            icon: Zap,
            title: 'Fail Fast',
            subtitle: 'Detect Errors Early',
            summary: 'Falla rápido y visiblemente',
            explanation: 'Detecta y reporta errores lo antes posible, no los escondas.',
            bad: `// ❌ Falla silenciosamente
function getUser(id) {
  try {
    return db.query(id);
  } catch {
    return null; // Oculta el error
  }
}`,
            good: `// ✅ Falla explícitamente
function getUser(id) {
  if (!id) {
    throw new Error('User ID is required');
  }
  return db.query(id);
}`
        },
        composition: {
            id: 'composition',
            icon: Lightbulb,
            title: 'Composition Over Inheritance',
            subtitle: 'Has-A vs Is-A',
            summary: 'Favorece composición sobre herencia',
            explanation: 'Usa composición para agregar funcionalidad de forma flexible.',
            bad: `// ❌ Herencia profunda
class Animal {}
class Mammal extends Animal {}
class Dog extends Mammal {}
class Labrador extends Dog {}`,
            good: `// ✅ Composición
class Dog {
  constructor() {
    this.locomotion = new WalkBehavior();
    this.vocalization = new BarkBehavior();
  }
}`
        }
    };

    const principleList = Object.values(principles);
    const currentPrinciple = principles[selectedPrinciple];
    const Icon = currentPrinciple.icon;

    return (
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-2 overflow-y-auto pr-2">
                <h3 className="text-lg font-bold text-green-400 mb-4">
                    Clean Code Principles
                </h3>
                {principleList.map((principle) => (
                    <button
                        key={principle.id}
                        onClick={() => setSelectedPrinciple(principle.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${selectedPrinciple === principle.id
                            ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                            : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                            }`}
                    >
                        <principle.icon className="w-5 h-5" />
                        <div className="flex-1">
                            <div className="font-semibold">{principle.title}</div>
                            <div className="text-xs opacity-70">{principle.subtitle}</div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Detail Panel */}
            <div className="lg:col-span-3 overflow-y-auto pr-2">
                <div className="bg-slate-900/50 border border-green-500/30 rounded-2xl p-8 space-y-6">
                    {/* Header */}
                    <div className="flex items-start gap-4">
                        <div className="p-4 bg-green-500/20 rounded-xl">
                            <Icon className="w-10 h-10 text-green-400" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-green-400">{currentPrinciple.title}</h2>
                            <p className="text-slate-400 mt-1">{currentPrinciple.subtitle}</p>
                            <p className="text-slate-300 text-sm mt-2">{currentPrinciple.summary}</p>
                        </div>
                    </div>

                    {/* Explanation */}
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                        <p className="text-slate-200 leading-relaxed">
                            {currentPrinciple.explanation}
                        </p>
                    </div>

                    {/* Code Examples */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Bad Example */}
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <XCircle className="w-4 h-4 text-red-400" />
                                <span className="text-xs font-semibold text-red-400">MALO / BAD</span>
                            </div>
                            <CodeBlock code={currentPrinciple.bad} language="javascript" />
                        </div>

                        {/* Good Example */}
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-xs font-semibold text-green-400">BUENO / GOOD</span>
                            </div>
                            <CodeBlock code={currentPrinciple.good} language="javascript" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CleanCode;
