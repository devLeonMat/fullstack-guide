import { useState } from 'react';
import { Lightbulb, Recycle, Scissors, Sparkles, FileText, Wrench, Target, Shield, BookOpen, Zap, CheckCircle, XCircle } from 'lucide-react';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';

function CleanCode() {
  const { language } = useLanguage();
  const [selectedPrinciple, setSelectedPrinciple] = useState('dry');

  const principles = {
    dry: {
      id: 'dry',
      icon: Recycle,
      title: t('cleancode', language).dry.title,
      subtitle: t('cleancode', language).dry.subtitle,
      summary: t('cleancode', language).dry.summary,
      explanation: t('cleancode', language).dry.explanation,
      bad: `// ❌ ${language === 'es' ? 'Código duplicado' : 'Duplicated code'}
function calculateAreaSquare(side) {
  return side * side;
}
function calculateAreaRectangle(w, h) {
  return w * h;
}`,
      good: `// ✅ ${language === 'es' ? 'Código reutilizable' : 'Reusable code'}
function calculateArea(shape, ...dims) {
  if (shape === 'square') return dims[0] ** 2;
  if (shape === 'rectangle') return dims[0] * dims[1];
}`
    },
    kiss: {
      id: 'kiss',
      icon: Scissors,
      title: t('cleancode', language).kiss.title,
      subtitle: t('cleancode', language).kiss.subtitle,
      summary: t('cleancode', language).kiss.summary,
      explanation: t('cleancode', language).kiss.explanation,
      bad: `// ❌ ${language === 'es' ? 'Excesivamente complejo' : 'Overly complex'}
const isEven = n => (n & 1) === 0 ? true : false;`,
      good: `// ✅ ${language === 'es' ? 'Simple y claro' : 'Simple and clear'}
const isEven = n => n % 2 === 0;`
    },
    yagni: {
      id: 'yagni',
      icon: Target,
      title: t('cleancode', language).yagni.title,
      subtitle: t('cleancode', language).yagni.subtitle,
      summary: t('cleancode', language).yagni.summary,
      explanation: t('cleancode', language).yagni.explanation,
      bad: `// ❌ ${language === 'es' ? 'Código especulativo' : 'Speculative code'}
class User {
  constructor(name) {
    this.name = name;
    this.preferences = {}; // ${language === 'es' ? '"Por si acaso"' : '"Just in case"'}
    this.history = []; // ${language === 'es' ? '"Tal vez lo usemos"' : '"Maybe we\'ll use it"'}
  }
}`,
      good: `// ✅ ${language === 'es' ? 'Solo lo necesario' : 'Only what\'s needed'}
class User {
  constructor(name) {
    this.name = name;
  }
}`
    },
    boyscout: {
      id: 'boyscout',
      icon: Sparkles,
      title: t('cleancode', language).boyscout.title,
      subtitle: t('cleancode', language).boyscout.subtitle,
      summary: t('cleancode', language).boyscout.summary,
      explanation: t('cleancode', language).boyscout.explanation,
      bad: `// ❌ ${language === 'es' ? 'Ignorar código problemático' : 'Ignore problematic code'}
function process(data) {
  // TODO: Refactor ${language === 'es' ? 'esto' : 'this'}
  var x = data.split(',');
  return x;
}`,
      good: `// ✅ ${language === 'es' ? 'Mejorar al pasar' : 'Improve while passing through'}
function parseCSV(csvString) {
  return csvString
    .split(',')
    .map(item => item.trim());
}`
    },
    selfdoc: {
      id: 'selfdoc',
      icon: FileText,
      title: t('cleancode', language).selfdoc.title,
      subtitle: t('cleancode', language).selfdoc.subtitle,
      summary: t('cleancode', language).selfdoc.summary,
      explanation: t('cleancode', language).selfdoc.explanation,
      bad: `// ❌ ${language === 'es' ? 'Necesita comentarios' : 'Needs comments'}
let d; // days
let u; // user`,
      good: `// ✅ ${language === 'es' ? 'Auto-explicativo' : 'Self-explanatory'}
let daysUntilExpiration;
let currentUser;`
    },
    srp: {
      id: 'srp',
      icon: Wrench,
      title: t('cleancode', language).srp.title,
      subtitle: t('cleancode', language).srp.subtitle,
      summary: t('cleancode', language).srp.summary,
      explanation: t('cleancode', language).srp.explanation,
      bad: `// ❌ ${language === 'es' ? 'Hace demasiado' : 'Does too much'}
function processUser(user) {
  validateUser(user);
  saveToDatabase(user);
  sendEmail(user);
  logAction(user);
}`,
      good: `// ✅ ${language === 'es' ? 'Responsabilidades separadas' : 'Separated responsibilities'}
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
      title: t('cleancode', language).defensive.title,
      subtitle: t('cleancode', language).defensive.subtitle,
      summary: t('cleancode', language).defensive.summary,
      explanation: t('cleancode', language).defensive.explanation,
      bad: `// ❌ ${language === 'es' ? 'Asume datos correctos' : 'Assumes correct data'}
function divide(a, b) {
  return a / b;
}`,
      good: `// ✅ ${language === 'es' ? 'Valida y protege' : 'Validates and protects'}
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
      title: t('cleancode', language).naming.title,
      subtitle: t('cleancode', language).naming.subtitle,
      summary: t('cleancode', language).naming.summary,
      explanation: t('cleancode', language).naming.explanation,
      bad: `// ❌ ${language === 'es' ? 'Nombres crípticos' : 'Cryptic names'}
let d = new Date();
let arr = [];`,
      good: `// ✅ ${language === 'es' ? 'Nombres significativos' : 'Meaningful names'}
let createdAt = new Date();
let activeUsers = [];`
    },
    failfast: {
      id: 'failfast',
      icon: Zap,
      title: t('cleancode', language).failfast.title,
      subtitle: t('cleancode', language).failfast.subtitle,
      summary: t('cleancode', language).failfast.summary,
      explanation: t('cleancode', language).failfast.explanation,
      bad: `// ❌ ${language === 'es' ? 'Falla silenciosamente' : 'Fails silently'}
function getUser(id) {
  try {
    return db.query(id);
  } catch {
    return null; // ${language === 'es' ? 'Oculta el error' : 'Hides the error'}
  }
}`,
      good: `// ✅ ${language === 'es' ? 'Falla explícitamente' : 'Fails explicitly'}
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
      title: t('cleancode', language).composition.title,
      subtitle: t('cleancode', language).composition.subtitle,
      summary: t('cleancode', language).composition.summary,
      explanation: t('cleancode', language).composition.explanation,
      bad: `// ❌ ${language === 'es' ? 'Herencia profunda' : 'Deep inheritance'}
class Animal {}
class Mammal extends Animal {}
class Dog extends Mammal {}
class Labrador extends Dog {}`,
      good: `// ✅ ${language === 'es' ? 'Composición' : 'Composition'}
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
          {t('cleancode', language).title}
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
                <span className="text-xs font-semibold text-red-400">{t('common', language).bad}</span>
              </div>
              <CodeBlock code={currentPrinciple.bad} language="javascript" />
            </div>

            {/* Good Example */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-xs font-semibold text-green-400">{t('common', language).good}</span>
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
