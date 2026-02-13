import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Factory, Bell, Shuffle, Plug, Command, Shield, Layers, Box, Boxes } from 'lucide-react';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';

// Simple visual diagram components for patterns
const SingletonDiagram = () => (
  <div className="relative w-full h-[200px] flex items-center justify-center bg-slate-950/30 rounded-xl p-6 border border-slate-800">
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="relative"
    >
      <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center shadow-2xl border-4 border-purple-400">
        <Eye className="w-16 h-16 text-white" />
      </div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center border-4 border-slate-900"
      >
        <span className="text-2xl">🔒</span>
      </motion.div>
    </motion.div>
    <p className="absolute bottom-4 text-slate-400 text-sm">Una Única Instancia Global</p>
  </div>
);

const FactoryDiagram = () => (
  <div className="relative w-full h-[200px] grid grid-cols-3 gap-4 items-center bg-slate-950/30 rounded-xl p-6 border border-slate-800">
    <div className="flex justify-center">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-6xl"
      >
        ⚙️
      </motion.div>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Factory className="w-16 h-16 text-emerald-400" />
      <span className="text-emerald-400 font-bold text-sm">FACTORY</span>
    </div>
    <div className="flex flex-col gap-2">
      {['🚗', '🚙', '🚕'].map((icon, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.3, repeat: Infinity, repeatDelay: 2 }}
          className="text-2xl"
        >
          {icon}
        </motion.div>
      ))}
    </div>
  </div>
);

const ObserverDiagram = () => (
  <div className="relative w-full h-[200px] flex items-center justify-center bg-slate-950/30 rounded-xl p-6 border border-slate-800">
    <div className="flex items-center gap-8">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="relative"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
          <Bell className="w-10 h-10 text-white" />
        </div>
        <p className="text-xs text-center text-slate-400 mt-2">Subject</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
            className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center"
          >
            <span className="text-white text-xs">O{i}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const StrategyDiagram = () => (
  <div className="relative w-full h-[200px] flex flex-col items-center justify-center bg-slate-950/30 rounded-xl p-6 border border-slate-800 gap-4">
    <div className="text-cyan-400 font-bold">CONTEXT</div>
    <div className="flex gap-4">
      {['A', 'B', 'C'].map((strategy, idx) => (
        <motion.div
          key={strategy}
          animate={{
            y: [0, -10, 0],
            backgroundColor: idx === 1 ? ['rgb(6, 182, 212)', 'rgb(34, 211, 238)', 'rgb(6, 182, 212)'] : 'rgb(6, 182, 212)'
          }}
          transition={{ duration: 2, delay: idx * 0.3, repeat: Infinity }}
          className="w-16 h-16 bg-cyan-600 rounded-lg flex items-center justify-center text-white font-bold"
        >
          {strategy}
        </motion.div>
      ))}
    </div>
    <p className="text-slate-400 text-xs">Algoritmos Intercambiables</p>
  </div>
);

const DecoratorDiagram = () => (
  <div className="relative w-full h-[200px] flex items-center justify-center bg-slate-950/30 rounded-xl p-6 border border-slate-800">
    <div className="relative">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="w-32 h-32 border-4 border-dashed border-purple-400 rounded-lg absolute"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="w-24 h-24 border-4 border-dashed border-pink-400 rounded-lg absolute top-4 left-4"
      />
      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg absolute top-8 left-8 flex items-center justify-center">
        <Layers className="w-8 h-8 text-white" />
      </div>
    </div>
    <p className="absolute bottom-4 text-slate-400 text-sm">Wrapping Functionality</p>
  </div>
);

function Patterns() {
  const { language } = useLanguage();
  const [selectedPattern, setSelectedPattern] = useState('singleton');
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);

  const patterns = {
    singleton: {
      id: 'singleton',
      name: 'Singleton',
      icon: Eye,
      category: 'Creational',
      diagram: <SingletonDiagram />,
      description: 'Asegura que una clase tenga una única instancia y proporciona un punto de acceso global a ella.',
      code: `// Singleton Pattern
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connection = this.connect();
    Database.instance = this;
  }

  connect() {
    return { connected: true, timestamp: Date.now() };
  }

  query(sql) {
    return \`Executing: \${sql}\`;
  }
}

// Uso
const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true - misma instancia`,
      advantages: [
        'Control total sobre la instancia',
        'Acceso global al objeto',
        'Lazy initialization posible',
        'Reduce uso de memoria'
      ],
      disadvantages: [
        'Dificulta el testing (estado global)',
        'Viola Single Responsibility Principle',
        'Puede crear acoplamiento fuerte',
        'Problemas en ambientes multi-thread'
      ],
      whenToUse: 'Cuando necesitas garantizar una sola instancia de una clase en toda la aplicación, como conexiones a base de datos, loggers, o gestores de configuración.'
    },
    factory: {
      id: 'factory',
      name: 'Factory',
      icon: Factory,
      category: 'Creational',
      diagram: <FactoryDiagram />,
      description: 'Define una interfaz para crear objetos, pero deja que las subclases decidan qué clase instanciar.',
      code: `// Factory Pattern
class VehicleFactory {
  createVehicle(type) {
    switch(type) {
      case 'car':
        return new Car();
      case 'truck':
        return new Truck();
      case 'motorcycle':
        return new Motorcycle();
      default:
        throw new Error('Unknown vehicle type');
    }
  }
}

class Car {
  constructor() {
    this.type = 'Car';
    this.wheels = 4;
  }
  drive() {
    return 'Driving a car';
  }
}

class Truck {
  constructor() {
    this.type = 'Truck';
    this.wheels = 6;
  }
  drive() {
    return 'Driving a truck';
  }
}

// Uso
const factory = new VehicleFactory();
const myCar = factory.createVehicle('car');
const myTruck = factory.createVehicle('truck');`,
      advantages: [
        'Desacopla creación de objetos',
        'Facilita agregar nuevos tipos',
        'Centraliza lógica de creación',
        'Código más mantenible'
      ],
      disadvantages: [
        'Puede volverse complejo',
        'Más código por escribir',
        'Puede sobre-complicar cosas simples'
      ],
      whenToUse: 'Cuando no sabes de antemano qué tipo exacto de objetos necesitarás, o cuando quieres centralizar la lógica de creación de objetos complejos.'
    },
    observer: {
      id: 'observer',
      name: 'Observer',
      icon: Bell,
      category: 'Behavioral',
      diagram: <ObserverDiagram />,
      description: 'Define una dependencia uno-a-muchos de modo que cuando un objeto cambia de estado, todos sus dependientes son notificados.',
      code: `// Observer Pattern
class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update(data) {
    console.log(\`\${this.name} received: \${data}\`);
  }
}

// Uso
const subject = new Subject();
const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');

subject.subscribe(observer1);
subject.subscribe(observer2);
subject.notify('Hello Observers!');`,
      advantages: [
        'Desacoplamiento total',
        'Fácil agregar/remover observers',
        'Notificaciones automáticas',
        'Patrón Pub/Sub efectivo'
      ],
      disadvantages: [
        'Memory leaks si no se desuscriben',
        'Orden de notificación impredecible',
        'Debugging más complejo',
        'Overhead de notificaciones'
      ],
      whenToUse: 'Para sistemas de eventos, notificaciones en tiempo real, o cuando múltiples objetos necesitan reaccionar a cambios de estado de otro objeto.'
    },
    strategy: {
      id: 'strategy',
      name: 'Strategy',
      icon: Shuffle,
      category: 'Behavioral',
      diagram: <StrategyDiagram />,
      description: 'Define una familia de algoritmos, encapsula cada uno y los hace intercambiables en tiempo de ejecución.',
      code: `// Strategy Pattern
class PaymentContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  executePayment(amount) {
    return this.strategy.pay(amount);
  }
}

class CreditCardStrategy {
  pay(amount) {
    return \`Paid \${amount} with Credit Card\`;
  }
}

class PayPalStrategy {
  pay(amount) {
    return \`Paid \${amount} with PayPal\`;
  }
}

class BitcoinStrategy {
  pay(amount) {
    return \`Paid \${amount} with Bitcoin\`;
  }
}

// Uso
const payment = new PaymentContext(new CreditCardStrategy());
console.log(payment.executePayment(100));

payment.setStrategy(new PayPalStrategy());
console.log(payment.executePayment(200));`,
      advantages: [
        'Intercambio de algoritmos en runtime',
        'Elimina condicionales complejos',
        'Open/Closed Principle',
        'Fácil testear estrategias'
      ],
      disadvantages: [
        'Más clases que crear',
        'Cliente debe conocer estrategias',
        'Overhead para casos simples'
      ],
      whenToUse: 'Cuando tienes múltiples formas de hacer algo y quieres cambiar el comportamiento dinámicamente, como métodos de pago, algoritmos de ordenamiento, o compresión.'
    },
    adapter: {
      id: 'adapter',
      name: 'Adapter',
      icon: Plug,
      category: 'Structural',
      diagram: <div className="relative w-full h-[200px] flex items-center justify-around bg-slate-950/30 rounded-xl p-6 border border-slate-800">
        <div className="text-5xl">🔌</div>
        <motion.div animate={{ x: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-4xl">⚡</motion.div>
        <div className="text-5xl">🔋</div>
      </div>,
      description: 'Convierte la interfaz de una clase en otra interfaz que el cliente espera, permitiendo trabajar juntas a clases incompatibles.',
      code: `// Adapter Pattern
class OldAPI {
  request() {
    return 'Data from old API';
  }
}

class NewAPIAdapter {
  constructor(oldAPI) {
    this.oldAPI = oldAPI;
  }

  fetch() {
    const data = this.oldAPI.request();
    return { result: data, status: 'success' };
  }
}

// Uso
const oldAPI = new OldAPI();
const adapter = new NewAPIAdapter(oldAPI);
console.log(adapter.fetch());`,
      advantages: [
        'Reutiliza código existente',
        'Integra APIs incompatibles',
        'Single Responsibility',
        'Transparente para el cliente'
      ],
      disadvantages: [
        'Aumenta complejidad',
        'Overhead de adaptación',
        'Debugging más difícil'
      ],
      whenToUse: 'Para integrar librerías de terceros, APIs legacy, o cuando necesitas hacer compatible código existente con nuevas interfaces.'
    },
    command: {
      id: 'command',
      name: 'Command',
      icon: Command,
      category: 'Behavioral',
      diagram: <div className="relative w-full h-[200px] grid grid-cols-3 gap-4 items-center bg-slate-950/30 rounded-xl p-6 border border-slate-800">
        <div className="flex flex-col items-center gap-2">
          {['▶️', '⏸️', '⏹️'].map((btn, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.2 }} className="text-3xl cursor-pointer">{btn}</motion.div>
          ))}
        </div>
        <Command className="w-20 h-20 text-amber-400 mx-auto" />
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-6xl text-center">📻</motion.div>
      </div>,
      description: 'Encapsula una solicitud como un objeto, permitiendo parametrizar clientes con diferentes solicitudes, encolar y deshacer operaciones.',
      code: `// Command Pattern
class Light {
  on() { console.log('Light is ON'); }
  off() { console.log('Light is OFF'); }
}

class LightOnCommand {
  constructor(light) {
    this.light = light;
  }
  execute() {
    this.light.on();
  }
  undo() {
    this.light.off();
  }
}

class LightOffCommand {
  constructor(light) {
    this.light = light;
  }
  execute() {
    this.light.off();
  }
  undo() {
    this.light.on();
  }
}

class RemoteControl {
  execute(command) {
    command.execute();
    this.lastCommand = command;
  }
  undo() {
    this.lastCommand?.undo();
  }
}

// Uso
const light = new Light();
const lightOn = new LightOnCommand(light);
const remote = new RemoteControl();
remote.execute(lightOn);
remote.undo();`,
      advantages: [
        'Desacopla invocador de ejecutor',
        'Fácil implementar undo/redo',
        'Queue de comandos',
        'Logging y auditoría'
      ],
      disadvantages: [
        'Muchas clases pequeñas',
        'Complejidad incrementada',
        'Overhead para operaciones simples'
      ],
      whenToUse: 'Para implementar undo/redo, macro comandos, transacciones, o cuando necesitas parametrizar objetos con operaciones.'
    },
    proxy: {
      id: 'proxy',
      name: 'Proxy',
      icon: Shield,
      category: 'Structural',
      diagram: <div className="relative w-full h-[200px] flex items-center justify-around bg-slate-950/30 rounded-xl p-6 border border-slate-800">
        <div className="text-5xl">👤</div>
        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center">
          <Shield className="text-green-400" size={32} />
        </motion.div>
        <div className="text-5xl">🎯</div>
      </div>,
      description: 'Proporciona un sustituto o marcador de posición para otro objeto, controlando el acceso a él.',
      code: `// Proxy Pattern
class RealImage {
  constructor(filename) {
    this.filename = filename;
    this.loadFromDisk();
  }

  loadFromDisk() {
    console.log(\`Loading: \${this.filename}\`);
  }

  display() {
    console.log(\`Displaying: \${this.filename}\`);
  }
}

class ProxyImage {
  constructor(filename) {
    this.filename = filename;
    this.realImage = null;
  }

  display() {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}

// Uso
const image = new ProxyImage('photo.jpg');
image.display(); // Carga y muestra
image.display(); // Solo muestra (ya cargada)`,
      advantages: [
        'Control de acceso',
        'Lazy initialization',
        'Logging y caching',
        'Protección del objeto real'
      ],
      disadvantages: [
        'Mayor latencia inicial',
        'Complejidad adicional',
        'Posibles memory leaks'
      ],
      whenToUse: 'Para lazy loading, control de acceso, caching, logging, o cuando necesitas un intermediario que controle el acceso a un objeto costoso.'
    },
    decorator: {
      id: 'decorator',
      name: 'Decorator',
      icon: Layers,
      category: 'Structural',
      diagram: <DecoratorDiagram />,
      description: 'Añade responsabilidades adicionales a un objeto dinámicamente, proporcionando una alternativa flexible a la herencia.',
      code: `// Decorator Pattern
class Coffee {
  cost() { return 5; }
  description() { return 'Coffee'; }
}

class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  cost() {
    return this.coffee.cost() + 2;
  }
  description() {
    return this.coffee.description() + ', Milk';
  }
}

class SugarDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  cost() {
    return this.coffee.cost() + 1;
  }
  description() {
    return this.coffee.description() + ', Sugar';
  }
}

// Uso
let myCoffee = new Coffee();
myCoffee = new MilkDecorator(myCoffee);
myCoffee = new SugarDecorator(myCoffee);
console.log(myCoffee.description()); // Coffee, Milk, Sugar
console.log(myCoffee.cost()); // 8`,
      advantages: [
        'Añade funcionalidad dinámicamente',
        'Composición sobre herencia',
        'Flexible y reutilizable',
        'Single Responsibility Principle'
      ],
      disadvantages: [
        'Muchos objetos pequeños',
        'Dificulta debugging',
        'Orden de decoradores importa'
      ],
      whenToUse: 'Cuando necesitas añadir funcionalidad a objetos de forma dinámica sin afectar otros objetos, como middleware, plugins, o características opcionales.'
    },
    facade: {
      id: 'facade',
      name: 'Facade',
      icon: Box,
      category: 'Structural',
      diagram: <div className="relative w-full h-[200px] grid grid-cols-2 gap-4 items-center bg-slate-950/30 rounded-xl p-6 border border-slate-800">
        <div className="flex flex-col gap-2">
          {['🔧', '⚙️', '🔩', '⚡'].map((icon, idx) => (
            <div key={idx} className="text-2xl">{icon}</div>
          ))}
        </div>
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
          <Box className="w-16 h-16 text-white" />
        </motion.div>
      </div>,
      description: 'Proporciona una interfaz unificada y simplificada a un conjunto de interfaces en un subsistema, facilitando su uso.',
      code: `// Facade Pattern
class CPU {
  freeze() { console.log('CPU frozen'); }
  jump(position) { console.log(\`Jump to \${position}\`); }
  execute() { console.log('CPU executing'); }
}

class Memory {
  load(position, data) {
    console.log(\`Loading \${data} at \${position}\`);
  }
}

class HardDrive {
  read(lba, size) {
    return 'Boot data';
  }
}

class ComputerFacade {
  constructor() {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();
  }

  start() {
    this.cpu.freeze();
    this.memory.load(0, this.hardDrive.read(0, 1024));
    this.cpu.jump(0);
    this.cpu.execute();
  }
}

// Uso simple
const computer = new ComputerFacade();
computer.start(); // Un solo método en vez de muchos`,
      advantages: [
        'Simplifica interfaces complejas',
        'Reduce dependencias',
        'API más limpia',
        'Facilita testing'
      ],
      disadvantages: [
        'Puede convertirse en God Object',
        'Oculta funcionalidad',
        'Menos flexibilidad'
      ],
      whenToUse: 'Para simplificar APIs complejas, proporcionar punto de entrada único a librerías, o cuando tienes un sistema con muchas clases interdependientes.'
    },
    builder: {
      id: 'builder',
      name: 'Builder',
      icon: Boxes,
      category: 'Creational',
      diagram: <div className="relative w-full h-[200px] flex items-center justify-center bg-slate-950/30 rounded-xl p-6 border border-slate-800">
        <div className="flex flex-col items-center">
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.3, repeat: Infinity, repeatDelay: 2 }}
                className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center text-white font-bold"
              >
                {i}
              </motion.div>
            ))}
          </div>
          <motion.div animate={{ scale: [0.9, 1, 0.9] }} transition={{ duration: 2, repeat: Infinity }} className="w-32 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
            <Boxes className="w-12 h-12 text-white" />
          </motion.div>
        </div>
      </div>,
      description: 'Separa la construcción de un objeto complejo de su representación, permitiendo crear diferentes representaciones.',
      code: `// Builder Pattern
class UserBuilder {
  constructor() {
    this.user = {};
  }

  setName(name) {
    this.user.name = name;
    return this;
  }

  setAge(age) {
    this.user.age = age;
    return this;
  }

  setEmail(email) {
    this.user.email = email;
    return this;
  }

  setAddress(address) {
    this.user.address = address;
    return this;
  }

  build() {
    return this.user;
  }
}

// Uso fluido
const user = new UserBuilder()
  .setName('Juan')
  .setAge(30)
  .setEmail('juan@example.com')
  .setAddress('123 Main St')
  .build();`,
      advantages: [
        'Construcción paso a paso',
        'Código más legible',
        'Parámetros opcionales fáciles',
        'Inmutabilidad posible'
      ],
      disadvantages: [
        'Más código por escribir',
        'Complejidad para objetos simples',
        'Puede ser verbose'
      ],
      whenToUse: 'Para construir objetos complejos con muchos parámetros opcionales, o cuando quieres un API fluido para construcción de objetos.'
    }
  };

  const patternList = Object.values(patterns);
  const currentPattern = patterns[selectedPattern];
  const Icon = currentPattern.icon;

  return (
    <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-2 overflow-y-auto pr-2">
        <h3 className="text-lg font-bold text-purple-400 mb-4">
          {t('patterns', language).title}
        </h3>
        {patternList.map((pattern) => {
          const PatternIcon = pattern.icon;
          return (
            <button
              key={pattern.id}
              onClick={() => {
                setSelectedPattern(pattern.id);
                setIsCodeExpanded(false); // Reset code expansion when changing pattern
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${selectedPattern === pattern.id
                ? 'bg-purple-500/20 border border-purple-500/50 text-purple-300'
                : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
            >
              <PatternIcon className="w-5 h-5" />
              <div className="flex-1">
                <div className="font-semibold">{pattern.name}</div>
                <div className="text-xs opacity-70 line-clamp-1">{pattern.category}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail Panel */}
      <div className="lg:col-span-3 overflow-y-auto pr-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPattern}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                <Icon className="w-10 h-10 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-purple-400">{currentPattern.name}</h3>
                <p className="text-slate-400 text-sm">{currentPattern.category} Pattern</p>
                <p className="text-slate-300 mt-2">{currentPattern.description}</p>
              </div>
            </div>

            {/* Visual Diagram */}
            <div>
              <h4 className="text-center text-slate-400 mb-4 font-semibold">
                DIAGRAMA VISUAL / VISUAL DIAGRAM
              </h4>
              {currentPattern.diagram}
            </div>

            {/* Advantages, Disadvantages, When to Use */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Advantages */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                <h4 className="text-green-400 font-bold mb-4 flex items-center gap-2">
                  <span>✅</span>
                  <span>VENTAJAS</span>
                </h4>
                <ul className="space-y-2">
                  {currentPattern.advantages.map((adv, idx) => (
                    <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disadvantages */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
                <h4 className="text-red-400 font-bold mb-4 flex items-center gap-2">
                  <span>⚠️</span>
                  <span>DESVENTAJAS</span>
                </h4>
                <ul className="space-y-2">
                  {currentPattern.disadvantages.map((dis, idx) => (
                    <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>{dis}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* When to Use */}
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
                <h4 className="text-purple-400 font-bold mb-4 flex items-center gap-2">
                  <span>🎯</span>
                  <span>CUÁNDO USARLO</span>
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {currentPattern.whenToUse}
                </p>
              </div>
            </div>

            {/* Collapsible Code Example */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl overflow-hidden">
              <button
                onClick={() => setIsCodeExpanded(!isCodeExpanded)}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💻</span>
                  <h4 className="text-lg font-semibold text-slate-300">
                    CÓDIGO DE EJEMPLO / IMPLEMENTATION
                  </h4>
                </div>
                <motion.div
                  animate={{ rotate: isCodeExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {isCodeExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0">
                      <CodeBlock code={currentPattern.code} language="javascript" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Patterns;
