import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Boxes, Zap, Hexagon, Globe, Smartphone, Server, Cpu, Database, Mail, Settings, Users, Share2, Info, Layers, CloudCog } from 'lucide-react';
import CodeBlock from './CodeBlock';

// Componente de Nodo Visual
const Node = ({ icon: Icon, label, color, description }) => (
    <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center justify-center p-3 bg-slate-800/50 rounded-xl shadow-lg border-2 border-transparent hover:border-cyan-500 transition-all cursor-help relative group"
    >
        <div className={`p-2 rounded-full ${color} mb-1 text-white`}>
            <Icon size={20} />
        </div>
        <span className="font-bold text-slate-200 text-sm text-center">{label}</span>

        {/* Tooltip */}
        <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-slate-900 text-white text-xs rounded shadow-xl z-50 border border-cyan-500/30">
            {description}
        </div>
    </motion.div>
);

// Paquete de datos animado
const DataPacket = ({ from, to, delay = 0, duration = 2 }) => {
    return (
        <motion.div
            initial={{ left: from.x, top: from.y, opacity: 0 }}
            animate={{
                left: [from.x, to.x],
                top: [from.y, to.y],
                opacity: [0, 1, 1, 0]
            }}
            transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeInOut"
            }}
            className="absolute w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] z-10"
        />
    );
};

// Diagramas Animados
const MVCDiagram = () => (
    <div className="relative w-full h-[450px] flex items-center justify-around bg-slate-950/30 rounded-xl p-6 border border-slate-800">
        <Node icon={Layout} label="Vista (View)" color="bg-blue-500" description="La interfaz de usuario. Muestra los datos y captura interacciones." />
        <Node icon={Settings} label="Controlador" color="bg-purple-500" description="Procesa las entradas del usuario y coordina la Vista y el Modelo." />
        <Node icon={Database} label="Modelo (Model)" color="bg-emerald-500" description="Gestiona los datos y la lógica de negocio." />

        <DataPacket from={{ x: '20%', y: '50%' }} to={{ x: '45%', y: '50%' }} delay={0} />
        <DataPacket from={{ x: '55%', y: '50%' }} to={{ x: '75%', y: '50%' }} delay={0.5} />
        <DataPacket from={{ x: '75%', y: '55%' }} to={{ x: '20%', y: '55%' }} delay={1.5} duration={3} />
    </div>
);

const MicroservicesDiagram = () => (
    <div className="relative w-full h-[450px] grid grid-cols-3 gap-6 items-center bg-slate-950/30 rounded-xl p-6 border border-slate-800">
        <div className="flex flex-col gap-4">
            <Node icon={Globe} label="Web App" color="bg-sky-400" description="Cliente web principal." />
            <Node icon={Smartphone} label="Mobile App" color="bg-indigo-400" description="Cliente móvil nativo." />
        </div>

        <div className="flex justify-center">
            <Node icon={Server} label="API Gateway" color="bg-slate-700" description="Punto de entrada único. Enruta peticiones y maneja seguridad." />
        </div>

        <div className="flex flex-col gap-4">
            <Node icon={Cpu} label="Auth Service" color="bg-orange-500" description="Microservicio de Identidad." />
            <Node icon={Database} label="Order Service" color="bg-rose-500" description="Gestión de pedidos con su propia DB." />
            <Node icon={Mail} label="Notif Service" color="bg-amber-500" description="Servicio de mensajería." />
        </div>

        <DataPacket from={{ x: '18%', y: '30%' }} to={{ x: '45%', y: '50%' }} delay={0} />
        <DataPacket from={{ x: '18%', y: '70%' }} to={{ x: '45%', y: '50%' }} delay={0.3} />
        <DataPacket from={{ x: '55%', y: '50%' }} to={{ x: '80%', y: '25%' }} delay={1} />
        <DataPacket from={{ x: '55%', y: '50%' }} to={{ x: '80%', y: '50%' }} delay={1.2} />
        <DataPacket from={{ x: '55%', y: '50%' }} to={{ x: '80%', y: '75%' }} delay={1.4} />
    </div>
);

const EventDrivenDiagram = () => (
    <div className="relative w-full h-[450px] flex items-center justify-between bg-slate-950/30 rounded-xl p-6 border border-slate-800">
        <Node icon={Zap} label="Productor" color="bg-yellow-500" description="Genera eventos cuando ocurre algo (ej. Nueva Compra)." />

        <div className="flex flex-col items-center justify-center gap-2 p-6 bg-slate-800 rounded-3xl border-4 border-yellow-500/30">
            <Share2 className="text-yellow-400 mb-2" size={36} />
            <span className="text-white font-bold text-xs uppercase tracking-wider">Event Bus</span>
            <div className="flex gap-1">
                {[1, 2, 3, 4].map(i => (
                    <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        className="w-2 h-2 rounded-full bg-yellow-400"
                    />
                ))}
            </div>
        </div>

        <div className="flex flex-col gap-4">
            <Node icon={Users} label="Consumer A" color="bg-pink-500" description="Reacciona al evento (ej. Actualiza Stock)." />
            <Node icon={Database} label="Consumer B" color="bg-teal-500" description="Persiste el evento para analítica." />
        </div>

        <DataPacket from={{ x: '12%', y: '50%' }} to={{ x: '40%', y: '50%' }} delay={0} />
        <DataPacket from={{ x: '60%', y: '50%' }} to={{ x: '85%', y: '35%' }} delay={1} />
        <DataPacket from={{ x: '60%', y: '50%' }} to={{ x: '85%', y: '65%' }} delay={1.2} />
    </div>
);

const HexagonalDiagram = () => (
    <div className="relative w-full h-[450px] flex items-center justify-center bg-slate-950/30 rounded-xl p-6 border border-slate-800">
        {/* Adapters Izquierda */}
        <div className="absolute left-6 flex flex-col gap-8">
            <Node icon={Globe} label="REST Adapter" color="bg-blue-400" description="Adaptador de entrada para peticiones HTTP." />
            <Node icon={Settings} label="CLI Adapter" color="bg-slate-600" description="Interfaz de línea de comandos." />
        </div>

        {/* Núcleo Hexagonal */}
        <div className="relative flex items-center justify-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute text-purple-500/10"
            >
                <Hexagon size={280} strokeWidth={1} fill="currentColor" />
            </motion.div>

            <div className="z-10 bg-slate-800 p-8 rounded-full border-4 border-purple-500 shadow-2xl text-center">
                <Hexagon className="mx-auto text-purple-400 mb-2" size={40} />
                <h3 className="font-bold text-white uppercase tracking-tight text-sm">Core Domain</h3>
                <p className="text-[10px] text-slate-400">Lógica de Negocio</p>
            </div>
        </div>

        {/* Adapters Derecha */}
        <div className="absolute right-6 flex flex-col gap-8">
            <Node icon={Database} label="DB Adapter" color="bg-emerald-500" description="Persistencia de datos desacoplada." />
            <Node icon={Mail} label="Email Adapter" color="bg-amber-500" description="Servicio externo de notificaciones." />
        </div>

        <DataPacket from={{ x: '18%', y: '35%' }} to={{ x: '42%', y: '50%' }} delay={0} />
        <DataPacket from={{ x: '42%', y: '50%' }} to={{ x: '58%', y: '50%' }} delay={0.8} />
        <DataPacket from={{ x: '58%', y: '50%' }} to={{ x: '82%', y: '35%' }} delay={1.2} />
    </div>
);

const LayeredDiagram = () => (
    <div className="relative w-full h-[450px] flex flex-col justify-center gap-3 bg-slate-950/30 rounded-xl p-6 border border-slate-800">
        <div className="w-full bg-gradient-to-r from-blue-600 to-blue-500 p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-3">
                <Layout size={32} className="text-white" />
                <div>
                    <h4 className="text-white font-bold text-lg">Presentation Layer</h4>
                    <p className="text-blue-100 text-xs">UI, Controllers, Views</p>
                </div>
            </div>
        </div>

        <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
        >
            <div className="w-full bg-gradient-to-r from-purple-600 to-purple-500 p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                    <Settings size={32} className="text-white" />
                    <div>
                        <h4 className="text-white font-bold text-lg">Business Logic Layer</h4>
                        <p className="text-purple-100 text-xs">Services, Domain Logic, Validation</p>
                    </div>
                </div>
            </div>
        </motion.div>

        <div className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-3">
                <Database size={32} className="text-white" />
                <div>
                    <h4 className="text-white font-bold text-lg">Data Access Layer</h4>
                    <p className="text-emerald-100 text-xs">Repositories, ORM, Database</p>
                </div>
            </div>
        </div>

        <DataPacket from={{ x: '50%', y: '20%' }} to={{ x: '50%', y: '45%' }} delay={0} duration={1.5} />
        <DataPacket from={{ x: '50%', y: '55%' }} to={{ x: '50%', y: '80%' }} delay={0.7} duration={1.5} />
        <DataPacket from={{ x: '50%', y: '80%' }} to={{ x: '50%', y: '20%' }} delay={2} duration={2} />
    </div>
);

const CleanArchDiagram = () => (
    <div className="relative w-full h-[450px] flex items-center justify-center bg-slate-950/30 rounded-xl p-6 border border-slate-800">
        {/* Círculos Concéntricos */}
        <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute w-[280px] h-[280px] rounded-full border-4 border-slate-700/30"
            />
            <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute w-[210px] h-[210px] rounded-full border-4 border-slate-600/40"
            />
            <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute w-[140px] h-[140px] rounded-full border-4 border-slate-500/50"
            />
        </div>

        {/* Capa Externa */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <Node icon={Globe} label="Frameworks & Drivers" color="bg-slate-600" description="UI, DB, External APIs" />
        </div>

        {/* Capa Media-Externa */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2">
            <Node icon={Settings} label="Interface Adapters" color="bg-blue-500" description="Controllers, Presenters, Gateways" />
        </div>

        {/* Capa Media-Interna */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2">
            <Node icon={Cpu} label="Use Cases" color="bg-purple-500" description="Application Business Rules" />
        </div>

        {/* Núcleo */}
        <div className="z-10 bg-gradient-to-br from-amber-500 to-orange-500 p-6 rounded-full shadow-2xl text-center">
            <Database className="mx-auto text-white mb-1" size={32} />
            <h3 className="font-bold text-white text-sm">Entities</h3>
            <p className="text-[9px] text-orange-100">Core Business</p>
        </div>

        {/* Flechas de dependencia */}
        <DataPacket from={{ x: '50%', y: '15%' }} to={{ x: '50%', y: '40%' }} delay={0} duration={2} />
        <DataPacket from={{ x: '25%', y: '50%' }} to={{ x: '45%', y: '50%' }} delay={0.5} duration={2} />
    </div>
);

const ServerlessDiagram = () => (
    <div className="relative w-full h-[450px] bg-slate-950/30 rounded-xl p-6 border border-slate-800 overflow-hidden">
        <div className="grid grid-cols-3 gap-6 h-full items-center">
            {/* Triggers */}
            <div className="flex flex-col gap-4">
                <Node icon={Globe} label="API Gateway" color="bg-sky-400" description="HTTP endpoints trigger functions" />
                <Node icon={Database} label="DB Events" color="bg-emerald-500" description="Database triggers (insert/update)" />
                <Node icon={Zap} label="Event Queue" color="bg-yellow-500" description="Message queue triggers" />
            </div>

            {/* Functions */}
            <div className="flex flex-col items-center gap-3">
                <Zap className="text-indigo-400 mb-2" size={40} />
                <h4 className="text-white font-bold text-center uppercase text-sm">Serverless Functions</h4>
                <div className="grid grid-cols-2 gap-2 w-full">
                    {[1, 2, 3, 4].map(i => (
                        <motion.div
                            key={i}
                            animate={{
                                scale: [1, 1.1, 1],
                                backgroundColor: ['rgb(99, 102, 241)', 'rgb(129, 140, 248)', 'rgb(99, 102, 241)']
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                            className="bg-indigo-600 p-3 rounded-lg text-center"
                        >
                            <span className="text-white text-xs font-mono">λ {i}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Services */}
            <div className="flex flex-col gap-4">
                <Node icon={Database} label="DynamoDB" color="bg-blue-600" description="Serverless database" />
                <Node icon={Server} label="S3 Storage" color="bg-orange-500" description="Object storage" />
                <Node icon={Mail} label="SNS/SQS" color="bg-red-500" description="Messaging services" />
            </div>
        </div>

        {/* Flujos */}
        <DataPacket from={{ x: '20%', y: '25%' }} to={{ x: '45%', y: '45%' }} delay={0} />
        <DataPacket from={{ x: '20%', y: '75%' }} to={{ x: '45%', y: '55%' }} delay={0.5} />
        <DataPacket from={{ x: '55%', y: '50%' }} to={{ x: '80%', y: '30%' }} delay={1.2} />
        <DataPacket from={{ x: '55%', y: '50%' }} to={{ x: '80%', y: '70%' }} delay={1.5} />
    </div>
);


function Architecture() {
    const [selectedArch, setSelectedArch] = useState('mvc');
    const [isCodeExpanded, setIsCodeExpanded] = useState(false);

    const architectures = {
        mvc: {
            id: 'mvc',
            name: 'MVC',
            fullName: 'Model-View-Controller',
            icon: Layout,
            color: 'blue',
            description: 'Separa la lógica de negocio, la presentación y el control de flujo.',
            diagram: <MVCDiagram />,
            keyPoints: [
                'Ideal para aplicaciones monolíticas simples',
                'Fácil de testear de forma aislada',
                'Control total sobre el flujo de datos UI',
                'Separación clara de responsabilidades'
            ],
            whenToUse: 'Cuando construyes aplicaciones web estándar donde la interacción usuario-dato es directa y el flujo es predecible.',
            code: `// Express.js MVC Example

// Model (User.js)
class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
  
  static async findById(id) {
    return await db.query('SELECT * FROM users WHERE id = ?', [id]);
  }
  
  static async create(userData) {
    return await db.query('INSERT INTO users SET ?', userData);
  }
}

// Controller (userController.js)
class UserController {
  async show(req, res) {
    const user = await User.findById(req.params.id);
    res.render('user', { user }); // Renderiza la Vista
  }
  
  async create(req, res) {
    const user = await User.create(req.body);
    res.redirect(\`/users/\${user.id}\`);
  }
}`,
            advantages: [
                'Separación clara de responsabilidades',
                'Fácil de entender y mantener',
                'Perfecto para aplicaciones web tradicionales'
            ],
            disadvantages: [
                'Puede volverse complejo en apps grandes',
                'Acoplamiento entre componentes',
                'No es ideal para SPAs modernas'
            ]
        },
        microservices: {
            id: 'microservices',
            name: 'Microservicios',
            fullName: 'Microservices Architecture',
            icon: Boxes,
            color: 'green',
            description: 'Arquitectura distribuida donde cada servicio es independiente y auto-contenido.',
            diagram: <MicroservicesDiagram />,
            keyPoints: [
                'Escalabilidad independiente por servicio',
                'Tolerancia a fallos parciales',
                'Permite usar diferentes stacks tecnológicos',
                'Equipos autónomos por servicio'
            ],
            whenToUse: 'Para sistemas grandes y complejos que necesitan ser gestionados por múltiples equipos con despliegues independientes.',
            code: `// Microservices with API Gateway

// User Service (Node.js + Express)
const express = require('express');
const app = express();

app.get('/users/:id', async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  res.json(user);
});

app.listen(3001);

// API Gateway (Node.js)
const axios = require('axios');
const gateway = express();

gateway.get('/api/user-profile/:id', async (req, res) => {
  const [user, orders] = await Promise.all([
    axios.get(\`http://user-service:3001/users/\${req.params.id}\`),
    axios.get(\`http://order-service:3003/orders/user/\${req.params.id}\`)
  ]);
  
  res.json({ user: user.data, orders: orders.data });
});`,
            advantages: [
                'Escalabilidad independiente por servicio',
                'Tecnologías heterogéneas',
                'Despliegue independiente',
                'Resiliencia mejorada'
            ],
            disadvantages: [
                'Complejidad operacional',
                'Latencia de red',
                'Debugging más difícil',
                'Transacciones distribuidas complejas'
            ]
        },
        eventdriven: {
            id: 'eventdriven',
            name: 'Event-Driven',
            fullName: 'Event-Driven Architecture',
            icon: Zap,
            color: 'yellow',
            description: 'Los componentes se comunican a través de eventos asíncronos.',
            diagram: <EventDrivenDiagram />,
            keyPoints: [
                'Máximo desacoplamiento entre componentes',
                'Alta capacidad de procesamiento asíncrono',
                'Excelente para sistemas reactivos y en tiempo real',
                'Fácil agregar nuevos consumidores'
            ],
            whenToUse: 'Cuando el sistema debe reaccionar a cambios externos rápidamente sin bloquear procesos, ideal para sistemas reactivos.',
            code: `// Event-Driven Architecture

// Event Producer (Order Service)
const eventBus = new EventEmitter();

class OrderService {
  async createOrder(orderData) {
    const order = await Order.create(orderData);
    
    // Emit event
    eventBus.emit('order.created', {
      orderId: order.id,
      userId: order.userId,
      total: order.total,
      timestamp: new Date()
    });
    
    return order;
  }
}

// Event Consumer 1 (Email Service)
eventBus.on('order.created', async (event) => {
  const user = await User.findById(event.userId);
  await sendEmail(user.email, {
    subject: 'Order Confirmation',
    body: \`Your order #\${event.orderId} has been placed.\`
  });
});

// Event Consumer 2 (Inventory Service)
eventBus.on('order.created', async (event) => {
  const order = await Order.findById(event.orderId);
  for (const item of order.items) {
    await Inventory.reduce(item.productId, item.quantity);
  }
});`,
            advantages: [
                'Desacoplamiento total',
                'Alta escalabilidad',
                'Procesamiento asíncrono',
                'Fácil agregar nuevos consumidores'
            ],
            disadvantages: [
                'Debugging complejo',
                'Eventual consistency',
                'Gestión de eventos puede ser difícil',
                'Requiere infraestructura adicional'
            ]
        },
        hexagonal: {
            id: 'hexagonal',
            name: 'Hexagonal',
            fullName: 'Hexagonal Architecture (Ports & Adapters)',
            icon: Hexagon,
            color: 'purple',
            description: 'Aísla la lógica de negocio de dependencias externas mediante puertos y adaptadores.',
            diagram: <HexagonalDiagram />,
            keyPoints: [
                'Protege la lógica de negocio de cambios externos',
                'Facilita la migración de bases de datos o APIs',
                'Enfoque en DDD (Domain Driven Design)',
                'Testeable al 100%'
            ],
            whenToUse: 'En proyectos de larga duración donde la lógica de negocio es el activo más valioso y debe estar protegida de cambios tecnológicos.',
            code: `// Hexagonal Architecture

// Domain (Core Business Logic)
class Order {
  constructor(id, items, status) {
    this.id = id;
    this.items = items;
    this.status = status;
  }
  
  validate() {
    if (this.items.length === 0) {
      throw new Error('Order must have items');
    }
    return true;
  }
  
  calculateTotal() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}

// Port (Interface)
interface OrderRepository {
  save(order: Order): Promise<Order>;
  findById(id: string): Promise<Order>;
}

// Adapter (Infrastructure)
class MongoOrderRepository implements OrderRepository {
  async save(order: Order) {
    return await mongoose.model('Order').create(order);
  }
  
  async findById(id: string) {
    return await mongoose.model('Order').findById(id);
  }
}`,
            advantages: [
                'Lógica de negocio totalmente aislada',
                'Fácil testing',
                'Flexibilidad para cambiar tecnologías',
                'Domain-driven design friendly'
            ],
            disadvantages: [
                'Curva de aprendizaje alta',
                'Más código inicial (boilerplate)',
                'Puede ser over-engineering para apps simples'
            ]
        },
        layered: {
            id: 'layered',
            name: 'Layered / N-Tier',
            fullName: 'Layered Architecture (N-Tier)',
            icon: Layers,
            color: 'blue',
            description: 'Organiza la aplicación en capas horizontales con responsabilidades específicas.',
            diagram: <LayeredDiagram />,
            keyPoints: [
                'Separación clara por responsabilidades',
                'Cada capa solo se comunica con la adyacente',
                'Fácil de entender para equipos nuevos',
                'Ideal para aplicaciones tradicionales'
            ],
            whenToUse: 'Para aplicaciones empresariales tradicionales donde la separación de responsabilidades es clara y el equipo es grande.',
            code: `// Layered Architecture Example

// Presentation Layer
class UserController {
  constructor(userService) {
    this.userService = userService;
  }
  
  async getUser(req, res) {
    const user = await this.userService.getUserById(req.params.id);
    res.json(user);
  }
}

// Business Logic Layer
class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  
  async getUserById(id) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error('User not found');
    
    // Business logic
    user.fullName = \`\${user.firstName} \${user.lastName}\`;
    return user;
  }
}

// Data Access Layer
class UserRepository {
  async findById(id) {
    return await db.query('SELECT * FROM users WHERE id = ?', [id]);
  }
  
  async save(user) {
    return await db.query('INSERT INTO users SET ?', user);
  }
}`,
            advantages: [
                'Estructura clara y predecible',
                'Fácil de testear por capas',
                'Escalabilidad horizontal',
                'Buena para equipos grandes'
            ],
            disadvantages: [
                'Puede ser rígida',
                'Performance overhead por capas',
                'Acoplamiento entre capas adyacentes'
            ]
        },
        clean: {
            id: 'clean',
            name: 'Clean Architecture',
            fullName: 'Clean Architecture (Uncle Bob)',
            icon: Database,
            color: 'purple',
            description: 'Arquitectura en capas concéntricas donde las dependencias apuntan hacia adentro.',
            diagram: <CleanArchDiagram />,
            keyPoints: [
                'Independencia de frameworks',
                'Testeable sin UI, DB o servicios externos',
                'Independencia de la UI',
                'Regla de dependencia: solo hacia adentro'
            ],
            whenToUse: 'Proyectos de larga vida donde la lógica de negocio es compleja y debe estar protegida de cambios externos.',
            code: `// Clean Architecture Layers

// Entities (innermost)
class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
  
  isValid() {
    return this.email.includes('@');
  }
}

// Use Cases
class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  
  async execute(userData) {
    const user = new User(null, userData.name, userData.email);
    
    if (!user.isValid()) {
      throw new Error('Invalid user');
    }
    
    return await this.userRepository.save(user);
  }
}

// Interface Adapters
class UserController {
  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }
  
  async createUser(req, res) {
    const user = await this.createUserUseCase.execute(req.body);
    res.json(user);
  }
}

// Frameworks & Drivers (outermost)
const repository = new MongoUserRepository();
const useCase = new CreateUserUseCase(repository);
const controller = new UserController(useCase);`,
            advantages: [
                'Máxima testabilidad',
                'Independencia total de frameworks',
                'Lógica de negocio protegida',
                'Fácil cambiar tecnologías'
            ],
            disadvantages: [
                'Curva de aprendizaje muy alta',
                'Mucho boilerplate inicial',
                'Puede ser overkill para apps simples'
            ]
        },
        serverless: {
            id: 'serverless',
            name: 'Serverless',
            fullName: 'Serverless Architecture (FaaS)',
            icon: CloudCog,
            color: 'yellow',
            description: 'Arquitectura basada en funciones que se ejecutan bajo demanda sin gestionar servidores.',
            diagram: <ServerlessDiagram />,
            keyPoints: [
                'Pago solo por uso (pay-per-execution)',
                'Auto-escalado automático',
                'Sin gestión de infraestructura',
                'Event-driven por naturaleza'
            ],
            whenToUse: 'Para aplicaciones con tráfico variable, microservicios ligeros, o cuando quieres reducir costos operacionales.',
            code: `// AWS Lambda Function Example

// handler.js
exports.handler = async (event) => {
  // Trigger: API Gateway
  const userId = event.pathParameters.id;
  
  try {
    // Acceso a DynamoDB (serverless DB)
    const user = await dynamoDB.get({
      TableName: 'Users',
      Key: { id: userId }
    }).promise();
    
    // SNS para notificaciones
    await sns.publish({
      TopicArn: 'arn:aws:sns:...',
      Message: \`User \${userId} accessed\`
    }).promise();
    
    return {
      statusCode: 200,
      body: JSON.stringify(user.Item)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

// serverless.yml (Serverless Framework)
service: user-service

functions:
  getUser:
    handler: handler.handler
    events:
      - http:
          path: users/{id}
          method: get`,
            advantages: [
                'Costo reducido (pay-per-use)',
                'Escalado automático infinito',
                'Zero server management',
                'Deploy rápido'
            ],
            disadvantages: [
                'Cold start latency',
                'Vendor lock-in',
                'Debugging complicado',
                'Límites de ejecución (tiempo/memoria)'
            ]
        }
    };

    const archList = Object.values(architectures);
    const current = architectures[selectedArch];
    const Icon = current.icon;

    const colorClasses = {
        blue: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
        green: 'text-green-400 bg-green-500/10 border-green-500/30',
        yellow: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
        purple: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
    };

    return (
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-2 overflow-y-auto pr-2">
                <h3 className="text-lg font-bold text-cyan-400 mb-4">
                    Software Architecture
                </h3>
                {archList.map((arch) => {
                    const ArchIcon = arch.icon;
                    return (
                        <button
                            key={arch.id}
                            onClick={() => setSelectedArch(arch.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${selectedArch === arch.id
                                ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300'
                                : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                }`}
                        >
                            <ArchIcon className="w-5 h-5" />
                            <div className="flex-1">
                                <div className="font-semibold">{arch.name}</div>
                                <div className="text-xs opacity-70 line-clamp-1">{arch.fullName}</div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Detail Panel */}
            <div className="lg:col-span-3 overflow-y-auto pr-2">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedArch}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        {/* Header */}
                        <div className="flex items-start gap-4">
                            <div className={`p-4 ${colorClasses[current.color]} rounded-xl`}>
                                <Icon className="w-10 h-10" />
                            </div>
                            <div className="flex-1">
                                <h3 className={`text-3xl font-bold ${current.color === 'blue' ? 'text-blue-400' : current.color === 'green' ? 'text-green-400' : current.color === 'yellow' ? 'text-yellow-400' : 'text-purple-400'}`}>
                                    {current.name}
                                </h3>
                                <p className="text-slate-400">{current.fullName}</p>
                                <p className="text-slate-300 mt-2">{current.description}</p>
                            </div>
                        </div>

                        {/* Animated Diagram */}
                        <div className="bg-slate-950/30 rounded-xl p-6 border border-slate-800">
                            <h4 className="text-center text-slate-400 mb-6 font-semibold">
                                FLUJO DE DATOS / DATA FLOW
                            </h4>
                            {current.diagram}
                        </div>

                        {/* Reorganized: Advantages, Disadvantages, When to Use */}
                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Advantages (merged with key points) */}
                            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                                <h4 className="text-green-400 font-bold mb-4 flex items-center gap-2">
                                    <span>✅</span>
                                    <span>VENTAJAS</span>
                                </h4>
                                <ul className="space-y-2">
                                    {current.advantages.map((adv, idx) => (
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
                                    {current.disadvantages.map((dis, idx) => (
                                        <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                                            <span className="text-red-400 mt-1">•</span>
                                            <span>{dis}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* When to Use */}
                            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-6">
                                <h4 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                                    <span>🎯</span>
                                    <span>CUÁNDO USARLA</span>
                                </h4>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    {current.whenToUse}
                                </p>
                            </div>
                        </div>

                        {/* Collapsible Code Example at the end */}
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
                                            <CodeBlock code={current.code} language="javascript" />
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

export default Architecture;
