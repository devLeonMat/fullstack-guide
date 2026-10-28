import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Boxes, Zap, Hexagon, Globe, Smartphone, Server, Cpu, Database, Mail, Settings, Users, Share2, Layers, CloudCog } from 'lucide-react';
import CodeBlock from './CodeBlock';
import Tabs from './solid/Tabs';
import { buildArchitectures } from './architecture/architectures';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';

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
    <div className="relative w-full h-[260px] md:h-[350px] lg:h-[450px] flex items-center justify-around bg-slate-950/30 rounded-xl p-6 border border-slate-800">
        <Node icon={Layout} label="Vista (View)" color="bg-blue-500" description="La interfaz de usuario. Muestra los datos y captura interacciones." />
        <Node icon={Settings} label="Controlador" color="bg-purple-500" description="Procesa las entradas del usuario y coordina la Vista y el Modelo." />
        <Node icon={Database} label="Modelo (Model)" color="bg-emerald-500" description="Gestiona los datos y la lógica de negocio." />

        <DataPacket from={{ x: '20%', y: '50%' }} to={{ x: '45%', y: '50%' }} delay={0} />
        <DataPacket from={{ x: '55%', y: '50%' }} to={{ x: '75%', y: '50%' }} delay={0.5} />
        <DataPacket from={{ x: '75%', y: '55%' }} to={{ x: '20%', y: '55%' }} delay={1.5} duration={3} />
    </div>
);

const MicroservicesDiagram = () => (
    <div className="relative w-full h-[260px] md:h-[350px] lg:h-[450px] grid grid-cols-3 gap-6 items-center bg-slate-950/30 rounded-xl p-6 border border-slate-800">
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
    <div className="relative w-full h-[260px] md:h-[350px] lg:h-[450px] flex items-center justify-between bg-slate-950/30 rounded-xl p-6 border border-slate-800">
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
    <div className="relative w-full h-[260px] md:h-[350px] lg:h-[450px] flex items-center justify-center bg-slate-950/30 rounded-xl p-6 border border-slate-800">
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
    <div className="relative w-full h-[260px] md:h-[350px] lg:h-[450px] flex flex-col justify-center gap-3 bg-slate-950/30 rounded-xl p-6 border border-slate-800">
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
    <div className="relative w-full h-[260px] md:h-[350px] lg:h-[450px] flex items-center justify-center bg-slate-950/30 rounded-xl p-6 border border-slate-800">
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
    <div className="relative w-full h-[260px] md:h-[350px] lg:h-[450px] bg-slate-950/30 rounded-xl p-6 border border-slate-800 overflow-hidden">
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


const VISUALS = {
    mvc: { icon: Layout, diagram: MVCDiagram },
    layered: { icon: Layers, diagram: LayeredDiagram },
    microservices: { icon: Boxes, diagram: MicroservicesDiagram },
    eventdriven: { icon: Zap, diagram: EventDrivenDiagram },
    hexagonal: { icon: Hexagon, diagram: HexagonalDiagram },
    clean: { icon: Database, diagram: CleanArchDiagram },
    serverless: { icon: CloudCog, diagram: ServerlessDiagram },
};

// Full class names (not interpolated) so Tailwind can detect them.
const COLORS = {
    blue: { box: 'text-blue-400 bg-blue-500/10 border-blue-500/30', title: 'text-blue-400' },
    green: { box: 'text-green-400 bg-green-500/10 border-green-500/30', title: 'text-green-400' },
    yellow: { box: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30', title: 'text-yellow-400' },
    purple: { box: 'text-purple-400 bg-purple-500/10 border-purple-500/30', title: 'text-purple-400' },
};

const Section = ({ title, children }) => (
    <div>
        <h5 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1">{title}</h5>
        <p className="text-slate-300 text-sm leading-relaxed">{children}</p>
    </div>
);

function Architecture() {
    const { language } = useLanguage();
    const tx = (es, en) => language === 'en' ? en : es;
    const [selectedArch, setSelectedArch] = useState('mvc');

    const archList = buildArchitectures(tx);
    const current = archList.find(a => a.id === selectedArch);
    const Icon = VISUALS[current.id].icon;
    const Diagram = VISUALS[current.id].diagram;
    const colors = COLORS[current.color];
    const { story } = current;

    const tabs = [
        {
            id: 'idea',
            label: tx('La idea', 'The idea'),
            content: (
                <div className="space-y-4">
                    <p className="text-slate-300 leading-relaxed">{current.summary}</p>
                    <Diagram />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                            <h4 className="text-green-400 font-bold text-sm mb-1">{tx('Úsala cuando', 'Use it when')}</h4>
                            <p className="text-slate-300 text-sm leading-relaxed">{current.useWhen}</p>
                        </div>
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                            <h4 className="text-red-400 font-bold text-sm mb-1">{tx('Mejor no, si...', 'Skip it if...')}</h4>
                            <p className="text-slate-300 text-sm leading-relaxed">{current.avoidWhen}</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 'story',
            label: tx('En mi trabajo', 'On the job'),
            content: (
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 lg:p-6 space-y-4">
                    <div>
                        <p className="text-cyan-300 font-bold">{story.client}</p>
                        <p className="text-slate-400 text-xs">{story.project} · {story.years}</p>
                    </div>
                    <Section title={tx('Contexto', 'Context')}>{story.context}</Section>
                    <Section title={tx('El problema', 'The problem')}>{story.problem}</Section>
                    <Section title={tx('Lo que hice', 'What I did')}>{story.solution}</Section>
                    <Section title={tx('Lo que ganamos', 'What we got')}>{story.payoff}</Section>
                </div>
            ),
        },
        {
            id: 'code',
            label: tx('Código', 'Code'),
            content: <CodeBlock code={current.code} language={current.lang} />,
        },
        {
            id: 'interview',
            label: tx('En entrevista', 'In the interview'),
            content: (
                <div className="space-y-3">
                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                        <h4 className="text-cyan-400 font-bold text-sm mb-1">{tx('Cómo lo contaría', 'How I’d say it')}</h4>
                        <p className="text-slate-300 text-sm leading-relaxed">“{current.pitch}”</p>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                        <h4 className="text-amber-300 font-bold text-sm mb-1">{tx('Ojo con esto', 'Watch out')}</h4>
                        <p className="text-slate-300 text-sm leading-relaxed">{current.gotcha}</p>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 lg:h-[calc(100vh-200px)]">
            {/* Sidebar */}
            <div className="lg:col-span-1 lg:overflow-y-auto lg:pr-2">
                <h3 className="text-base lg:text-lg font-bold text-cyan-400 mb-2 lg:mb-4">
                    {t('architecture', language).title}
                </h3>
                <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-hidden lg:pb-0 lg:space-y-2">
                {archList.map((arch) => {
                    const ArchIcon = VISUALS[arch.id].icon;
                    return (
                        <button
                            key={arch.id}
                            onClick={() => setSelectedArch(arch.id)}
                            className={`flex-shrink-0 lg:w-full text-left px-3 py-2 lg:px-4 lg:py-3 rounded-lg transition-all flex items-center gap-2 lg:gap-3 ${selectedArch === arch.id
                                ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300'
                                : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                }`}
                        >
                            <ArchIcon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-sm lg:text-base whitespace-nowrap lg:whitespace-normal">{arch.name}</div>
                                <div className="hidden lg:block text-xs opacity-70 line-clamp-1">{arch.fullName}</div>
                            </div>
                        </button>
                    );
                })}
                </div>
            </div>

            {/* Detail Panel */}
            <div className="lg:col-span-3 lg:overflow-y-auto lg:pr-2">
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
                        <div className="flex items-center gap-4">
                            <div className={`p-4 border ${colors.box} rounded-xl`}>
                                <Icon className="w-10 h-10" />
                            </div>
                            <div className="flex-1">
                                <h3 className={`text-xl lg:text-3xl font-bold ${colors.title}`}>{current.name}</h3>
                                <p className="text-slate-400 text-sm">{current.fullName} · {story.client}</p>
                            </div>
                        </div>

                        <Tabs items={tabs} label={current.name} tx={tx} />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Architecture;
