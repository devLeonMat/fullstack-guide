import { useState } from 'react';
import { Box, Lock, FileText, ArrowLeftRight, RotateCcw } from 'lucide-react';
import CodeBlock from './CodeBlock';

function Solid() {
  const [selectedPrinciple, setSelectedPrinciple] = useState('S');

  const principles = {
    S: {
      letter: 'S',
      title: 'Single Responsibility',
      subtitle: 'Una sola razón para cambiar / One reason to change',
      icon: Box,
      color: 'blue',
      analogy: '🧑‍🍳 Un chef de restaurante: El chef cocina, el mesero sirve, el cajero cobra. Cada uno tiene UNA responsabilidad.',
      explanation: 'Una clase debe tener una única responsabilidad. Si una clase hace demasiado, es difícil de mantener y probar.',
      violation: `// ❌ Violación: Clase con múltiples responsabilidades
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  save() {
    // Guardar en DB
    db.save(this);
  }
  
  sendEmail(message) {
    // Enviar email
    emailService.send(this.email, message);
  }
  
  generateReport() {
    // Generar reporte
    return \`Report for \${this.name}\`;
  }
}`,
      solution: `// ✅ Solución: Responsabilidades separadas
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

class UserRepository {
  save(user) {
    db.save(user);
  }
}

class EmailService {
  send(user, message) {
    emailService.send(user.email, message);
  }
}

class ReportGenerator {
  generate(user) {
    return \`Report for \${user.name}\`;
  }
}`
    },
    O: {
      letter: 'O',
      title: 'Open/Closed',
      subtitle: 'Abierto para extensión, cerrado para modificación',
      icon: Lock,
      color: 'green',
      analogy: '🔌 Un enchufe eléctrico: Puedes conectar diferentes dispositivos (extensión) sin modificar el enchufe (cerrado).',
      explanation: 'Las clases deben estar abiertas para extensión pero cerradas para modificación. Usa abstracción y polimorfismo.',
      violation: `// ❌ Violación: Modificar código existente
class PaymentProcessor {
  process(type, amount) {
    if (type === 'cash') {
      return this.processCash(amount);
    } else if (type === 'card') {
      return this.processCard(amount);
    }
    // Cada nuevo tipo requiere modificar esta clase
  }
}`,
      solution: `// ✅ Solución: Extensible sin modificar
class Payment {
  process() {
    throw new Error('Must implement');
  }
}

class CashPayment extends Payment {
  process(amount) {
    return \`Processing \${amount} cash\`;
  }
}

class CardPayment extends Payment {
  process(amount) {
    return \`Processing \${amount} card\`;
  }
}

// Agregar nuevos tipos sin modificar código existente
class CryptoPayment extends Payment {
  process(amount) {
    return \`Processing \${amount} crypto\`;
  }
}`
    },
    L: {
      letter: 'L',
      title: 'Liskov Substitution',
      subtitle: 'Los subtipos deben ser sustituibles / Subtypes must be substitutable',
      icon: ArrowLeftRight,
      color: 'purple',
      analogy: '🦆 Si parece un pato y grazna como un pato: Cualquier clase derivada debe poder usarse donde se espera la clase base.',
      explanation: 'Los objetos de una clase derivada deben poder reemplazar objetos de la clase base sin alterar el comportamiento.',
      violation: `// ❌ Violación: Rompe el contrato
class Bird {
  fly() {
    return 'Flying...';
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error('Penguins cannot fly!'); // Rompe la expectativa
  }
}

function makeBirdFly(bird) {
  return bird.fly(); // Falla con Penguin
}`,
      solution: `// ✅ Solución: Jerarquía correcta
class Bird {
  move() {
    throw new Error('Must implement');
  }
}

class FlyingBird extends Bird {
  move() {
    return 'Flying...';
  }
}

class SwimmingBird extends Bird {
  move() {
    return 'Swimming...';
  }
}

class Eagle extends FlyingBird {}
class Penguin extends SwimmingBird {}

function makeBirdMove(bird) {
  return bird.move(); // Funciona con cualquier ave
}`
    },
    I: {
      letter: 'I',
      title: 'Interface Segregation',
      subtitle: 'Interfaces específicas / Specific interfaces',
      icon: FileText,
      color: 'yellow',
      analogy: '🍽️ Menú de restaurante: Un menú vegetariano no debe mostrar opciones con carne. Interfaces específicas para cada cliente.',
      explanation: 'No se debe forzar a los clientes a depender de interfaces que no usan. Crea interfaces pequeñas y específicas.',
      violation: `// ❌ Violación: Interface muy grande
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
  charge(): void; // Solo para robots
}

class Human implements Worker {
  work() { /* ... */ }
  eat() { /* ... */ }
  sleep() { /* ... */ }
  charge() {
    throw new Error('Humans cannot charge!');
  }
}`,
      solution: `// ✅ Solución: Interfaces segregadas
interface Workable {
  work(): void;
}

interface Eatable {
  eat(): void;
}

interface Sleepable {
  sleep(): void;
}

interface Chargeable {
  charge(): void;
}

class Human implements Workable, Eatable, Sleepable {
  work() { /* ... */ }
  eat() { /* ... */ }
  sleep() { /* ... */ }
}

class Robot implements Workable, Chargeable {
  work() { /* ... */ }
  charge() { /* ... */ }
}`
    },
    D: {
      letter: 'D',
      title: 'Dependency Inversion',
      subtitle: 'Depende de abstracciones / Depend on abstractions',
      icon: RotateCcw,
      color: 'red',
      analogy: '🔌 Cargador USB: Tu teléfono no depende de un cargador específico, sino del estándar USB (abstracción).',
      explanation: 'Las clases de alto nivel no deben depender de clases de bajo nivel. Ambas deben depender de abstracciones.',
      violation: `// ❌ Violación: Dependencia directa
class MySQLDatabase {
  query(sql) {
    return 'MySQL result';
  }
}

class UserService {
  constructor() {
    this.db = new MySQLDatabase(); // Acoplamiento fuerte
  }
  
  getUser(id) {
    return this.db.query(\`SELECT * FROM users WHERE id=\${id}\`);
  }
}`,
      solution: `// ✅ Solución: Depende de abstracción
interface Database {
  query(sql: string): any;
}

class MySQLDatabase implements Database {
  query(sql) {
    return 'MySQL result';
  }
}

class MongoDatabase implements Database {
  query(sql) {
    return 'Mongo result';
  }
}

class UserService {
  constructor(database: Database) { // Inyección de dependencia
    this.db = database;
  }
  
  getUser(id) {
    return this.db.query(\`SELECT * FROM users WHERE id=\${id}\`);
  }
}

// Uso
const service = new UserService(new MySQLDatabase());`
    }
  };

  const principleList = Object.values(principles);
  const current = principles[selectedPrinciple];
  const Icon = current.icon;

  const colorClasses = {
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', letter: 'text-blue-500/20' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', letter: 'text-green-500/20' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', letter: 'text-purple-500/20' },
    yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', letter: 'text-yellow-500/20' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', letter: 'text-red-500/20' },
  };

  const colors = colorClasses[current.color];

  return (
    <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-2 overflow-y-auto pr-2">
        <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-4">
          SOLID Principles
        </h3>
        {principleList.map((principle) => {
          const PrincipleIcon = principle.icon;
          const btnColors = colorClasses[principle.color];
          return (
            <button
              key={principle.letter}
              onClick={() => setSelectedPrinciple(principle.letter)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${selectedPrinciple === principle.letter
                ? `${btnColors.bg} border ${btnColors.border} ${btnColors.text}`
                : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
            >
              <PrincipleIcon className="w-5 h-5" />
              <div className="flex-1">
                <div className="font-bold text-lg">{principle.letter}</div>
                <div className="text-xs opacity-70 line-clamp-1">{principle.title}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail Panel */}
      <div className="lg:col-span-3 overflow-y-auto pr-2">
        <div className={`relative bg-slate-900/50 border-2 ${colors.border} rounded-2xl p-8 space-y-6 overflow-hidden`}>
          {/* Giant Letter Background */}
          <div className={`absolute top-4 right-8 text-[180px] font-black ${colors.letter} select-none pointer-events-none`}>
            {current.letter}
          </div>

          {/* Header */}
          <div className="relative z-10 flex items-start gap-4">
            <div className={`p-4 ${colors.bg} rounded-xl`}>
              <Icon className={`w-8 h-8 ${colors.text}`} />
            </div>
            <div>
              <h3 className={`text-3xl font-bold ${colors.text}`}>
                {current.letter} - {current.title}
              </h3>
              <p className="text-slate-400 mt-1">{current.subtitle}</p>
            </div>
          </div>

          {/* Analogy */}
          <div className={`relative z-10 ${colors.bg} border ${colors.border} rounded-lg p-4`}>
            <p className="text-lg font-medium text-slate-200">{current.analogy}</p>
          </div>

          {/* Explanation */}
          <div className="relative z-10">
            <p className="text-slate-300 leading-relaxed">
              {current.explanation}
            </p>
          </div>

          {/* Code Examples - Side by Side */}
          <div className="relative z-10 grid md:grid-cols-2 gap-4">
            {/* Violation */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                <span>❌</span>
                <span>VIOLACIÓN / VIOLATION</span>
              </h4>
              <CodeBlock code={current.violation} language="javascript" />
            </div>

            {/* Solution */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                <span>✅</span>
                <span>SOLUCIÓN / SOLUTION</span>
              </h4>
              <CodeBlock code={current.solution} language="javascript" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Solid;
