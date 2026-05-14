import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cloud, GitBranch, Code2, Eye, Shield, Wallet,
  Layers, Server, CheckCircle, XCircle, ArrowRight,
  Zap, Package, Activity
} from 'lucide-react';
import { SiTerraform, SiGithubactions } from 'react-icons/si';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';

// ─── Shared helpers ───────────────────────────────────────────────────────────

const FlowArrow = () => (
  <ArrowRight className="w-4 h-4 text-sky-400/60 flex-shrink-0" />
);

// ─── Section 1: Overview Diagram — IaaS / PaaS / SaaS ────────────────────────

const OverviewDiagram = ({ tx }) => {
  const [activeCol, setActiveCol] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveCol(c => (c + 1) % 3), 1600);
    return () => clearInterval(id);
  }, []);

  const stackLayers = [
    tx('Hardware', 'Hardware'),
    tx('Red / Virtualización', 'Network / Virtualization'),
    tx('Sistema Operativo', 'Operating System'),
    tx('Runtime / Middleware', 'Runtime / Middleware'),
    tx('Aplicación', 'Application'),
    tx('Datos', 'Data'),
  ];

  const columns = [
    {
      title: 'IaaS',
      subtitle: tx('Infraestructura como Servicio', 'Infrastructure as a Service'),
      example: 'AWS EC2, Azure VMs, GCP Compute',
      providerLayers: [0, 1],
    },
    {
      title: 'PaaS',
      subtitle: tx('Plataforma como Servicio', 'Platform as a Service'),
      example: 'Heroku, App Engine, Azure App Service',
      providerLayers: [0, 1, 2, 3],
    },
    {
      title: 'SaaS',
      subtitle: tx('Software como Servicio', 'Software as a Service'),
      example: 'Gmail, Salesforce, Notion',
      providerLayers: [0, 1, 2, 3, 4, 5],
    },
  ];

  return (
    <div className="bg-slate-950/40 border border-sky-500/20 rounded-xl p-4 space-y-4">
      <p className="text-center text-xs font-semibold text-sky-300 uppercase tracking-wider">
        {tx('Modelos de servicio en la nube', 'Cloud Service Models')}
      </p>
      <div className="grid grid-cols-3 gap-3">
        {columns.map((col, ci) => (
          <motion.div
            key={col.title}
            animate={{
              boxShadow: activeCol === ci ? '0 0 20px rgba(56,189,248,0.35)' : '0 0 0px transparent',
              borderColor: activeCol === ci ? 'rgba(56,189,248,0.5)' : 'rgba(100,116,139,0.25)',
            }}
            transition={{ duration: 0.35 }}
            className="flex flex-col gap-1 p-2 bg-slate-800/40 border rounded-xl"
          >
            <p className={`text-xs font-bold text-center mb-1 ${activeCol === ci ? 'text-sky-300' : 'text-slate-400'}`}>
              {col.title}
            </p>
            {stackLayers.map((layer, li) => {
              const isProvider = col.providerLayers.includes(li);
              return (
                <motion.div
                  key={layer}
                  animate={{
                    backgroundColor: isProvider
                      ? activeCol === ci
                        ? 'rgba(56,189,248,0.25)'
                        : 'rgba(56,189,248,0.10)'
                      : activeCol === ci
                      ? 'rgba(51,65,85,0.6)'
                      : 'rgba(30,41,59,0.5)',
                    borderColor: isProvider
                      ? activeCol === ci
                        ? 'rgba(56,189,248,0.5)'
                        : 'rgba(56,189,248,0.2)'
                      : 'rgba(71,85,105,0.3)',
                  }}
                  transition={{ duration: 0.3, delay: li * 0.04 }}
                  className="px-1.5 py-1 border rounded text-[9px] text-center leading-tight font-medium"
                  style={{ color: isProvider ? (activeCol === ci ? '#7dd3fc' : '#94a3b8') : '#64748b' }}
                >
                  {layer}
                </motion.div>
              );
            })}
            <p className="text-[9px] text-slate-500 text-center mt-1 leading-tight">{col.example}</p>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center gap-4 text-[10px]">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-sky-500/30 border border-sky-500/50 inline-block" />
          <span className="text-sky-300">{tx('Gestiona el proveedor', 'Provider manages')}</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-slate-700/50 border border-slate-600/30 inline-block" />
          <span className="text-slate-400">{tx('Gestionas tú', 'You manage')}</span>
        </span>
      </div>
    </div>
  );
};

// ─── Section 2: CI/CD Pipeline Diagram ───────────────────────────────────────

const CiCdDiagram = ({ tx }) => {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    { label: tx('Code Push', 'Code Push'), icon: GitBranch },
    { label: tx('Lint / Test', 'Lint / Test'), icon: CheckCircle },
    { label: tx('Build', 'Build'), icon: Package },
    { label: tx('Docker Image', 'Docker Image'), icon: Layers },
    { label: tx('Deploy Staging', 'Deploy Staging'), icon: Server },
    { label: tx('Int. Tests', 'Int. Tests'), icon: Activity },
    { label: tx('Deploy Prod', 'Deploy Prod'), icon: Zap },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveStage(s => (s + 1) % stages.length), 1200);
    return () => clearInterval(id);
  }, [stages.length]);

  return (
    <div className="bg-slate-950/40 border border-sky-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-sky-300 uppercase tracking-wider">
        {tx('Pipeline de CI/CD', 'CI/CD Pipeline')}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {stages.map((stage, i) => {
          const Icon = stage.icon;
          const isActive = activeStage === i;
          const isPast = i < activeStage;
          return (
            <div key={stage.label} className="flex items-center gap-1.5">
              <motion.div
                animate={{
                  backgroundColor: isActive
                    ? 'rgba(56,189,248,0.25)'
                    : isPast
                    ? 'rgba(34,197,94,0.15)'
                    : 'rgba(15,23,42,0.6)',
                  borderColor: isActive
                    ? 'rgba(56,189,248,0.6)'
                    : isPast
                    ? 'rgba(34,197,94,0.4)'
                    : 'rgba(100,116,139,0.3)',
                }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-1 px-2 py-1.5 border rounded-lg min-w-[56px]"
              >
                <div className="flex items-center gap-1">
                  <Icon
                    className={`w-3 h-3 ${isActive ? 'text-sky-300' : isPast ? 'text-green-400' : 'text-slate-500'}`}
                  />
                  {isActive && (
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="w-1.5 h-1.5 bg-green-400 rounded-full"
                    />
                  )}
                </div>
                <span
                  className={`text-[9px] font-semibold text-center leading-tight ${
                    isActive ? 'text-sky-300' : isPast ? 'text-green-400' : 'text-slate-500'
                  }`}
                >
                  {stage.label}
                </span>
              </motion.div>
              {i < stages.length - 1 && <FlowArrow />}
            </div>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={activeStage}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.25 }}
          className="text-center text-xs text-sky-400 h-4"
        >
          {[
            tx('Desarrollador hace push al repositorio', 'Developer pushes to repository'),
            tx('ESLint + tests unitarios se ejecutan', 'ESLint + unit tests execute'),
            tx('npm run build compila la aplicación', 'npm run build compiles the app'),
            tx('Imagen Docker creada y enviada al registry', 'Docker image built and pushed to registry'),
            tx('Despliegue en entorno de staging', 'Deployed to staging environment'),
            tx('Tests de integración y E2E validan el build', 'Integration & E2E tests validate the build'),
            tx('Despliegue automático en producción', 'Automatic deployment to production'),
          ][activeStage]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

// ─── Section 3: IaC Workflow Diagram ─────────────────────────────────────────

const IacDiagram = ({ tx }) => {
  const [step, setStep] = useState(0);

  const steps = [
    { label: tx('Escribir .tf', 'Write .tf'), desc: tx('Define recursos en HCL', 'Define resources in HCL') },
    { label: 'terraform plan', desc: tx('Preview del diff de cambios', 'Preview diff of changes') },
    { label: 'terraform apply', desc: tx('Aplica los cambios reales', 'Applies real changes') },
    { label: tx('Cloud Resources', 'Cloud Resources'), desc: tx('Infraestructura creada/actualizada', 'Infrastructure created/updated') },
  ];

  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % steps.length), 1600);
    return () => clearInterval(id);
  }, [steps.length]);

  return (
    <div className="bg-slate-950/40 border border-sky-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-sky-300 uppercase tracking-wider">
        {tx('Flujo de Infraestructura como Código', 'Infrastructure as Code Workflow')}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2">
            <motion.div
              animate={{
                backgroundColor: step === i ? 'rgba(56,189,248,0.2)' : 'rgba(15,23,42,0.5)',
                borderColor: step === i ? 'rgba(56,189,248,0.6)' : 'rgba(100,116,139,0.25)',
              }}
              transition={{ duration: 0.3 }}
              className="px-3 py-2 border rounded-lg text-center min-w-[90px]"
            >
              <p className={`text-xs font-bold font-mono ${step === i ? 'text-sky-300' : 'text-slate-400'}`}>
                {s.label}
              </p>
            </motion.div>
            {i < steps.length - 1 && <FlowArrow />}
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.25 }}
          className="text-center text-xs text-sky-400 h-4"
        >
          {steps[step].desc}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

// ─── Section 4: Observability Pillars Diagram ─────────────────────────────────

const ObservabilityDiagram = ({ tx }) => {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      title: 'Logs',
      stack: tx('JSON estructurado → ELK / Loki', 'Structured JSON → ELK / Loki'),
      color: 'text-blue-300',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      glow: 'rgba(96,165,250,0.35)',
    },
    {
      title: 'Metrics',
      stack: tx('Series de tiempo → Prometheus / Grafana', 'Time series → Prometheus / Grafana'),
      color: 'text-orange-300',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
      glow: 'rgba(251,146,60,0.35)',
    },
    {
      title: 'Traces',
      stack: tx('Spans distribuidos → Jaeger / Zipkin', 'Distributed spans → Jaeger / Zipkin'),
      color: 'text-purple-300',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      glow: 'rgba(192,132,252,0.35)',
    },
  ];

  useEffect(() => {
    const id = setInterval(() => setActivePillar(p => (p + 1) % 3), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-sky-500/20 rounded-xl p-4 space-y-4">
      <p className="text-center text-xs font-semibold text-sky-300 uppercase tracking-wider">
        {tx('Los 3 Pilares de la Observabilidad', 'The 3 Pillars of Observability')}
      </p>
      <div className="grid grid-cols-3 gap-3">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            animate={{
              boxShadow: activePillar === i ? `0 0 22px ${pillar.glow}` : '0 0 0px transparent',
            }}
            transition={{ duration: 0.4 }}
            className={`flex flex-col items-center gap-2 p-3 ${pillar.bg} border ${pillar.border} rounded-xl`}
          >
            <span className={`text-sm font-bold ${pillar.color}`}>{pillar.title}</span>
            <span className="text-[10px] text-slate-400 text-center leading-tight">{pillar.stack}</span>
          </motion.div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 pt-1 p-2 bg-sky-500/5 border border-sky-500/20 rounded-lg">
        <Eye className="w-4 h-4 text-sky-400" />
        <span className="text-xs text-sky-300 font-semibold">OpenTelemetry</span>
        <span className="text-xs text-slate-400">— {tx('estándar unificado de instrumentación', 'unified instrumentation standard')}</span>
      </div>
    </div>
  );
};

// ─── Section 6: Security Defense Rings Diagram ───────────────────────────────

const SecurityDiagram = ({ tx }) => {
  const [activeRing, setActiveRing] = useState(0);

  const rings = [
    { label: tx('Red / WAF', 'Network / WAF'), desc: tx('Capa exterior — DDoS, WAF, firewall', 'Outer layer — DDoS, WAF, firewall'), size: 'w-full h-full', color: 'border-red-500/40', glow: 'rgba(239,68,68,0.3)', text: 'text-red-300' },
    { label: tx('Identidad / IAM', 'Identity / IAM'), desc: tx('Capa media — autenticación, MFA, RBAC', 'Middle layer — auth, MFA, RBAC'), size: 'w-4/5 h-4/5', color: 'border-orange-500/40', glow: 'rgba(249,115,22,0.3)', text: 'text-orange-300' },
    { label: tx('Datos / Cifrado', 'Data / Encryption'), desc: tx('Capa interna — at-rest, in-transit, secrets', 'Inner layer — at-rest, in-transit, secrets'), size: 'w-3/5 h-3/5', color: 'border-sky-500/40', glow: 'rgba(56,189,248,0.3)', text: 'text-sky-300' },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveRing(r => (r + 1) % 3), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-sky-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-sky-300 uppercase tracking-wider">
        {tx('Capas de Defensa en Profundidad', 'Defense in Depth Layers')}
      </p>
      <div className="relative flex items-center justify-center" style={{ height: '160px' }}>
        {rings.map((ring, i) => (
          <motion.div
            key={ring.label}
            animate={{
              boxShadow: activeRing === i ? `0 0 24px ${ring.glow}` : '0 0 0px transparent',
              borderColor: activeRing === i ? ring.glow.replace('0.3', '0.7') : ring.color.replace('/40', '/20'),
            }}
            transition={{ duration: 0.4 }}
            className={`absolute border-2 rounded-full flex items-center justify-center ${ring.size}`}
          >
            {i === activeRing && (
              <span className={`text-[9px] font-bold text-center px-2 leading-tight ${ring.text}`}>
                {ring.label}
              </span>
            )}
          </motion.div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={activeRing}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.25 }}
          className={`text-center text-xs h-4 ${rings[activeRing].text}`}
        >
          {rings[activeRing].desc}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

// ─── Section 7: FinOps Cost Diagram ──────────────────────────────────────────

const FinOpsDiagram = ({ tx }) => {
  const [activeCat, setActiveCat] = useState(0);

  const categories = [
    { label: tx('Cómputo', 'Compute'), wasteful: 78, optimized: 42, color: 'bg-sky-400' },
    { label: tx('Almacenamiento', 'Storage'), wasteful: 45, optimized: 28, color: 'bg-blue-400' },
    { label: tx('Red', 'Network'), wasteful: 32, optimized: 18, color: 'bg-indigo-400' },
    { label: tx('Servicios', 'Services'), wasteful: 55, optimized: 30, color: 'bg-violet-400' },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveCat(c => (c + 1) % categories.length), 1600);
    return () => clearInterval(id);
  }, [categories.length]);

  const cat = categories[activeCat];

  return (
    <div className="bg-slate-950/40 border border-sky-500/20 rounded-xl p-4 space-y-4">
      <p className="text-center text-xs font-semibold text-sky-300 uppercase tracking-wider">
        {tx('Análisis de costes por categoría', 'Cost Analysis by Category')}
      </p>
      <div className="flex gap-2 justify-center flex-wrap">
        {categories.map((c, i) => (
          <button
            key={c.label}
            onClick={() => setActiveCat(i)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
              activeCat === i
                ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
                : 'bg-slate-800/50 border-slate-700/50 text-slate-400'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-400">
            <span>{tx('Sin optimizar', 'Unoptimized')}</span>
            <span className="text-red-400">${cat.wasteful}k/mo</span>
          </div>
          <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${cat.wasteful}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full"
            />
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-400">
            <span>{tx('Optimizado', 'Optimized')}</span>
            <span className="text-green-400">${cat.optimized}k/mo</span>
          </div>
          <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${cat.optimized}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className={`h-full ${cat.color} rounded-full`}
            />
          </div>
        </div>
        <p className="text-center text-xs text-green-400 font-semibold">
          {tx('Ahorro potencial:', 'Potential savings:')} {Math.round((1 - cat.optimized / cat.wasteful) * 100)}%
        </p>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

function CloudBasics() {
  const { language } = useLanguage();
  const tx = (es, en) => language === 'en' ? en : es;
  const [active, setActive] = useState('overview');

  const sections = [
    {
      id: 'overview',
      title: 'IaaS / PaaS / SaaS',
      subtitle: tx('Modelos de servicio cloud', 'Cloud service models'),
      icon: Cloud,
    },
    {
      id: 'cicd',
      title: 'CI/CD Pipeline',
      subtitle: tx('Integración y entrega continua', 'Continuous integration & delivery'),
      icon: GitBranch,
    },
    {
      id: 'iac',
      title: tx('IaC — Terraform', 'IaC — Terraform'),
      subtitle: tx('Infraestructura como Código', 'Infrastructure as Code'),
      icon: Code2,
    },
    {
      id: 'observability',
      title: tx('Observabilidad', 'Observability'),
      subtitle: tx('Logs, métricas y trazas', 'Logs, metrics and traces'),
      icon: Eye,
    },
    {
      id: 'comparison',
      title: 'AWS vs Azure vs GCP',
      subtitle: tx('Servicios equivalentes', 'Equivalent services'),
      icon: Layers,
    },
    {
      id: 'security',
      title: tx('Seguridad Cloud', 'Cloud Security'),
      subtitle: tx('Baseline de seguridad', 'Security baseline'),
      icon: Shield,
    },
    {
      id: 'finops',
      title: 'FinOps',
      subtitle: tx('Optimización de costes', 'Cost optimization'),
      icon: Wallet,
    },
  ];

  // ─── Section renderers ──────────────────────────────────────────────────────

  const renderOverview = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">IaaS / PaaS / SaaS</h2>
        <p className="text-slate-400 text-sm">
          {tx('Los tres modelos de servicio definen cuánto gestiona el proveedor cloud vs. tú', 'The three service models define how much the cloud provider manages vs. you')}
        </p>
      </div>

      <OverviewDiagram tx={tx} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            icon: Activity,
            title: tx('Escalabilidad', 'Scalability'),
            color: 'text-sky-300',
            border: 'border-sky-500/20',
            desc: tx(
              'Escala horizontal (más instancias) o vertical (más CPU/RAM). Auto-scaling basado en métricas como CPU > 70% o requests/s.',
              'Scale horizontally (more instances) or vertically (more CPU/RAM). Auto-scaling based on metrics like CPU > 70% or requests/s.'
            ),
          },
          {
            icon: CheckCircle,
            title: tx('Alta Disponibilidad', 'High Availability'),
            color: 'text-green-300',
            border: 'border-green-500/20',
            desc: tx(
              'Multi-AZ deployments, load balancers, health checks y failover automático. SLA típico 99.9% – 99.99% uptime.',
              'Multi-AZ deployments, load balancers, health checks and automatic failover. Typical SLA 99.9% – 99.99% uptime.'
            ),
          },
          {
            icon: Shield,
            title: tx('Responsabilidad Compartida', 'Shared Responsibility'),
            color: 'text-orange-300',
            border: 'border-orange-500/20',
            desc: tx(
              'El proveedor asegura la infraestructura física; tú eres responsable de configuraciones, datos y accesos. Varía por modelo (IaaS vs SaaS).',
              'Provider secures physical infrastructure; you\'re responsible for configuration, data and access. Varies by model (IaaS vs SaaS).'
            ),
          },
          {
            icon: Wallet,
            title: 'FinOps',
            color: 'text-violet-300',
            border: 'border-violet-500/20',
            desc: tx(
              'Pay-as-you-go: pagas por uso real. Reserved Instances dan descuentos de hasta 70%. Spot/Preemptible para cargas tolerantes a interrupciones.',
              'Pay-as-you-go: pay for real usage. Reserved Instances give up to 70% discounts. Spot/Preemptible for interruption-tolerant workloads.'
            ),
          },
        ].map(({ icon: Icon, title, color, border, desc }) => (
          <div key={title} className={`bg-slate-800/30 border ${border} rounded-xl p-4`}>
            <div className="flex items-center gap-2 mb-2">
              <Icon className={`w-4 h-4 ${color}`} />
              <span className={`text-sm font-bold ${color}`}>{title}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCicd = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">CI/CD Pipeline</h2>
        <p className="text-slate-400 text-sm">
          {tx('Integración y despliegue continuos para entregar software con calidad y rapidez', 'Continuous integration and deployment to ship quality software fast')}
        </p>
      </div>

      <CiCdDiagram tx={tx} />

      <CodeBlock
        language="yaml"
        code={`# .github/workflows/deploy.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint & Test
        run: |
          npm run lint
          npm test -- --coverage

      - name: Build Docker image
        run: |
          docker build -t myapp:\${{ github.sha }} .
          docker push registry.example.com/myapp:\${{ github.sha }}

      - name: Deploy to staging
        run: |
          kubectl set image deployment/myapp \\
            myapp=registry.example.com/myapp:\${{ github.sha }} \\
            --namespace=staging

      - name: Deploy to production
        if: success()
        run: |
          kubectl set image deployment/myapp \\
            myapp=registry.example.com/myapp:\${{ github.sha }} \\
            --namespace=production`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          {
            title: tx('Trunk-based Development', 'Trunk-based Development'),
            desc: tx('Los desarrolladores integran a main frecuentemente (mínimo diario). Feature flags para código incompleto. Reduce merge conflicts y acelera el feedback.', 'Developers integrate to main frequently (minimum daily). Feature flags for incomplete code. Reduces merge conflicts and accelerates feedback.'),
          },
          {
            title: tx('Promoción de entornos', 'Environment Promotion'),
            desc: tx('dev → staging → production. Cada entorno valida el artefacto anterior. El mismo artefacto (imagen Docker) fluye por todos los entornos.', 'dev → staging → production. Each env validates the previous artifact. The same artifact (Docker image) flows through all environments.'),
          },
          {
            title: tx('Estrategia de rollback', 'Rollback Strategy'),
            desc: tx('Mantén la imagen anterior. En fallo, kubectl rollout undo o redeploy del tag anterior. Aim for < 5 min MTTR (Mean Time To Recovery).', 'Keep the previous image. On failure, kubectl rollout undo or redeploy the previous tag. Aim for < 5 min MTTR (Mean Time To Recovery).'),
          },
          {
            title: tx('Blue/Green Deploy', 'Blue/Green Deploy'),
            desc: tx('Dos entornos idénticos (blue=activo, green=nuevo). Swap instantáneo del load balancer al terminar. Zero-downtime, rollback en segundos.', 'Two identical environments (blue=active, green=new). Instant load balancer swap when done. Zero-downtime, rollback in seconds.'),
          },
        ].map(({ title, desc }) => (
          <div key={title} className="bg-slate-800/30 border border-sky-500/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <SiGithubactions className="w-4 h-4 text-sky-400" />
              <span className="text-sm font-bold text-sky-300">{title}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderIac = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('Infraestructura como Código', 'Infrastructure as Code')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx('Define y versiona tu infraestructura igual que el código de la aplicación', 'Define and version your infrastructure just like application code')}
        </p>
      </div>

      <IacDiagram tx={tx} />

      {/* Comparison table */}
      <div className="bg-slate-950/40 border border-sky-500/20 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800">
          <p className="text-xs font-semibold text-sky-300 uppercase tracking-wider">
            {tx('Terraform vs Pulumi vs CDK', 'Terraform vs Pulumi vs CDK')}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-950/70">
              <tr>
                <th className="px-4 py-2.5 text-left text-slate-400 font-semibold">{tx('Criterio', 'Criterion')}</th>
                <th className="px-4 py-2.5 text-left text-sky-300 font-semibold">Terraform</th>
                <th className="px-4 py-2.5 text-left text-violet-300 font-semibold">Pulumi</th>
                <th className="px-4 py-2.5 text-left text-orange-300 font-semibold">AWS CDK</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {[
                {
                  label: tx('Lenguaje', 'Language'),
                  tf: 'HCL',
                  pulumi: 'TS / Python / Go',
                  cdk: 'TS / Python / Java',
                },
                {
                  label: tx('Estado', 'State'),
                  tf: tx('tfstate (local/S3/TFC)', 'tfstate (local/S3/TFC)'),
                  pulumi: tx('Pulumi Cloud / S3', 'Pulumi Cloud / S3'),
                  cdk: 'CloudFormation',
                },
                {
                  label: tx('Proveedores', 'Providers'),
                  tf: tx('1000+ proveedores', '1000+ providers'),
                  pulumi: tx('Mismos que Terraform', 'Same as Terraform'),
                  cdk: tx('Solo AWS', 'AWS only'),
                },
                {
                  label: tx('Curva aprendizaje', 'Learning curve'),
                  tf: tx('Media (HCL simple)', 'Medium (simple HCL)'),
                  pulumi: tx('Baja si ya sabes TS', 'Low if you know TS'),
                  cdk: tx('Baja para devs AWS', 'Low for AWS devs'),
                },
                {
                  label: tx('Mejor para', 'Best for'),
                  tf: tx('Multi-cloud, equipos grandes', 'Multi-cloud, large teams'),
                  pulumi: tx('Equipos full-stack', 'Full-stack teams'),
                  cdk: tx('Shops 100% AWS', '100% AWS shops'),
                },
              ].map(row => (
                <tr key={row.label} className="hover:bg-slate-800/20">
                  <td className="px-4 py-2.5 text-slate-300 font-medium">{row.label}</td>
                  <td className="px-4 py-2.5 text-slate-400 font-mono">{row.tf}</td>
                  <td className="px-4 py-2.5 text-slate-400 font-mono">{row.pulumi}</td>
                  <td className="px-4 py-2.5 text-slate-400 font-mono">{row.cdk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CodeBlock
        language="hcl"
        code={`# main.tf — S3 bucket + IAM policy con Terraform

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_s3_bucket" "app_assets" {
  bucket = "\${var.project_name}-assets-\${var.environment}"

  tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

resource "aws_s3_bucket_versioning" "app_assets" {
  bucket = aws_s3_bucket.app_assets.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_iam_policy" "app_s3_read" {
  name        = "\${var.project_name}-s3-read"
  description = "Least-privilege read access to app assets bucket"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["s3:GetObject", "s3:ListBucket"]
      Resource = [
        aws_s3_bucket.app_assets.arn,
        "\${aws_s3_bucket.app_assets.arn}/*"
      ]
    }]
  })
}`}
      />

      <CodeBlock
        language="bash"
        code={`# Comandos esenciales de Terraform CLI

terraform init          # Descarga providers y módulos
terraform validate      # Valida sintaxis HCL
terraform plan          # Preview de cambios (dry-run)
terraform apply         # Aplica cambios (pide confirmación)
terraform apply -auto-approve  # Sin confirmación (CI/CD)
terraform destroy       # Destruye toda la infraestructura

# Gestión de estado
terraform state list    # Lista recursos en el state
terraform state show aws_s3_bucket.app_assets
terraform state rm aws_s3_bucket.app_assets  # Eliminar del state

# Workspaces (entornos)
terraform workspace new  staging
terraform workspace select production
terraform workspace list`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          {
            title: tx('State File', 'State File'),
            desc: tx('terraform.tfstate mapea tu HCL a recursos reales. Almacenar en S3 + DynamoDB para bloqueo distribuido. Nunca editar manualmente.', 'terraform.tfstate maps your HCL to real resources. Store in S3 + DynamoDB for distributed locking. Never edit manually.'),
          },
          {
            title: tx('Drift Detection', 'Drift Detection'),
            desc: tx('terraform plan detecta cambios manuales en la nube no reflejados en el state. Automatiza plan en CI para alertar de drift.', 'terraform plan detects manual cloud changes not reflected in state. Automate plan in CI to alert on drift.'),
          },
          {
            title: tx('Módulos', 'Modules'),
            desc: tx('Agrupa recursos reutilizables (module "vpc"). Terraform Registry tiene módulos oficiales de AWS, Google, Azure listos para usar.', 'Group reusable resources (module "vpc"). Terraform Registry has official AWS, Google, Azure modules ready to use.'),
          },
          {
            title: 'Workspaces',
            desc: tx('Espacios de trabajo para distintos entornos (dev/staging/prod) con el mismo código. Alternativa: usar directorios separados por entorno.', 'Workspaces for different environments (dev/staging/prod) with the same code. Alternative: use separate directories per environment.'),
          },
        ].map(({ title, desc }) => (
          <div key={title} className="bg-slate-800/30 border border-sky-500/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <SiTerraform className="w-4 h-4 text-sky-400" />
              <span className="text-sm font-bold text-sky-300">{title}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderObservability = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('Observabilidad', 'Observability')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx('Logs, métricas y trazas: los tres pilares para entender sistemas distribuidos', 'Logs, metrics and traces: the three pillars for understanding distributed systems')}
        </p>
      </div>

      <ObservabilityDiagram tx={tx} />

      <CodeBlock
        language="javascript"
        code={`// Structured logging en Node.js (pino)
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: { level: (label) => ({ level: label }) },
});

// Log estructurado con contexto de traza
logger.info({
  msg:       'User login successful',
  level:     'info',
  traceId:   req.headers['x-trace-id'] || crypto.randomUUID(),
  userId:    user.id,
  duration:  Date.now() - startTime,
  timestamp: new Date().toISOString(),
  service:   'auth-service',
  env:       process.env.NODE_ENV,
});

// Log de error con stack trace
logger.error({
  msg:     'Database query failed',
  err:     { message: err.message, stack: err.stack },
  query:   sanitizedQuery,
  traceId: req.traceId,
});`}
      />

      <CodeBlock
        language="javascript"
        code={`// Prometheus metrics en Node.js (prom-client)
import { Counter, Histogram, register } from 'prom-client';

// Contador de requests HTTP
const httpRequestsTotal = new Counter({
  name:    'http_requests_total',
  help:    'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

// Histograma de latencia
const httpRequestDuration = new Histogram({
  name:    'http_request_duration_seconds',
  help:    'HTTP request latency in seconds',
  labelNames: ['method', 'route'],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5],
});

// Middleware Express
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer({ method: req.method, route: req.path });
  res.on('finish', () => {
    httpRequestsTotal.inc({ method: req.method, route: req.path, status_code: res.statusCode });
    end();
  });
  next();
});

// Endpoint /metrics para Prometheus scraping
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          {
            title: 'SLI / SLO / SLA',
            desc: tx('SLI = métrica real (latencia p99). SLO = objetivo interno (99.9% < 200ms). SLA = acuerdo contractual con el cliente. Error budget = 100% - SLO.', 'SLI = real metric (p99 latency). SLO = internal objective (99.9% < 200ms). SLA = contractual agreement with client. Error budget = 100% - SLO.'),
          },
          {
            title: tx('Alert Fatigue', 'Alert Fatigue'),
            desc: tx('Alerta solo sobre síntomas, no causas. Usa multi-window alerting. Cada alerta debe tener un runbook. Revisa y elimina alertas que se ignoran frecuentemente.', 'Alert on symptoms, not causes. Use multi-window alerting. Every alert must have a runbook. Review and remove alerts frequently ignored.'),
          },
          {
            title: tx('Golden Signals', 'Golden Signals'),
            desc: tx('Latencia (tiempo de respuesta), Tráfico (req/s), Errores (tasa de error) y Saturación (uso de recursos). Estas 4 métricas describen la salud de cualquier servicio.', 'Latency (response time), Traffic (req/s), Errors (error rate) and Saturation (resource usage). These 4 metrics describe the health of any service.'),
          },
          {
            title: 'OpenTelemetry',
            desc: tx('Estándar CNCF para instrumentación. Un SDK unificado para logs, métricas y trazas. Exporta a Jaeger, Zipkin, Prometheus, DataDog, etc. sin cambiar el código.', 'CNCF standard for instrumentation. A unified SDK for logs, metrics and traces. Exports to Jaeger, Zipkin, Prometheus, DataDog, etc. without code changes.'),
          },
        ].map(({ title, desc }) => (
          <div key={title} className="bg-slate-800/30 border border-sky-500/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <Eye className="w-4 h-4 text-sky-400" />
              <span className="text-sm font-bold text-sky-300">{title}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderComparison = () => {
    const rows = [
      { cat: tx('Cómputo (VM)', 'Compute (VM)'), aws: 'EC2', azure: 'Virtual Machines', gcp: 'Compute Engine' },
      { cat: tx('Contenedores (K8s)', 'Containers (K8s)'), aws: 'EKS', azure: 'AKS', gcp: 'GKE' },
      { cat: 'Serverless', aws: 'Lambda', azure: 'Azure Functions', gcp: 'Cloud Functions' },
      { cat: tx('Object Storage', 'Object Storage'), aws: 'S3', azure: 'Blob Storage', gcp: 'Cloud Storage' },
      { cat: tx('BD Relacional', 'Relational DB'), aws: 'RDS / Aurora', azure: 'Azure SQL / PostgreSQL', gcp: 'Cloud SQL / AlloyDB' },
      { cat: 'NoSQL', aws: 'DynamoDB', azure: 'Cosmos DB', gcp: 'Firestore / Bigtable' },
      { cat: tx('Load Balancer', 'Load Balancer'), aws: 'ALB / NLB', azure: 'Application Gateway', gcp: 'Cloud Load Balancing' },
      { cat: 'IAM', aws: 'IAM', azure: 'Azure AD / Entra', gcp: 'Cloud IAM' },
      { cat: tx('Monitoreo', 'Monitoring'), aws: 'CloudWatch', azure: 'Azure Monitor', gcp: 'Cloud Monitoring' },
      { cat: 'CI/CD', aws: 'CodePipeline', azure: 'Azure DevOps', gcp: 'Cloud Build' },
      { cat: 'CDN', aws: 'CloudFront', azure: 'Azure CDN / Front Door', gcp: 'Cloud CDN' },
      { cat: 'DNS', aws: 'Route 53', azure: 'Azure DNS', gcp: 'Cloud DNS' },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">AWS vs Azure vs GCP</h2>
          <p className="text-slate-400 text-sm">
            {tx('Servicios equivalentes en los tres grandes proveedores cloud', 'Equivalent services across the three major cloud providers')}
          </p>
        </div>

        <div className="bg-slate-950/40 border border-sky-500/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-950/70">
                <tr>
                  <th className="px-4 py-3 text-left text-slate-400 font-semibold">{tx('Categoría', 'Category')}</th>
                  <th className="px-4 py-3 text-left text-orange-300 font-semibold">AWS</th>
                  <th className="px-4 py-3 text-left text-sky-300 font-semibold">Azure</th>
                  <th className="px-4 py-3 text-left text-green-300 font-semibold">GCP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {rows.map(row => (
                  <tr key={row.cat} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-4 py-2.5 text-slate-300 font-medium whitespace-nowrap">{row.cat}</td>
                    <td className="px-4 py-2.5 text-orange-300/80 font-mono">{row.aws}</td>
                    <td className="px-4 py-2.5 text-sky-300/80 font-mono">{row.azure}</td>
                    <td className="px-4 py-2.5 text-green-300/80 font-mono">{row.gcp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'AWS',
              color: 'text-orange-300',
              border: 'border-orange-500/20',
              bg: 'bg-orange-500/5',
              reason: tx(
                'Ecosistema más amplio (200+ servicios). Comunidad enorme. Mejor opción si necesitas máxima variedad de servicios gestionados o ya tienes equipo con experiencia AWS.',
                'Widest ecosystem (200+ services). Huge community. Best choice if you need maximum variety of managed services or already have an AWS-experienced team.'
              ),
            },
            {
              title: 'Azure',
              color: 'text-sky-300',
              border: 'border-sky-500/20',
              bg: 'bg-sky-500/5',
              reason: tx(
                'Integración nativa con Microsoft (Office 365, AD, .NET). Ideal para empresas con stack Microsoft. Azure DevOps y GitHub Actions son de primera clase.',
                'Native Microsoft integration (Office 365, AD, .NET). Ideal for enterprises with Microsoft stack. Azure DevOps and GitHub Actions are first class.'
              ),
            },
            {
              title: 'GCP',
              color: 'text-green-300',
              border: 'border-green-500/20',
              bg: 'bg-green-500/5',
              reason: tx(
                'Mejor Kubernetes (GKE), BigQuery para analytics, Vertex AI para ML. Red global de Google. Preferido en data/ML-heavy workloads.',
                'Best Kubernetes (GKE), BigQuery for analytics, Vertex AI for ML. Google\'s global network. Preferred for data/ML-heavy workloads.'
              ),
            },
          ].map(({ title, color, border, bg, reason }) => (
            <div key={title} className={`${bg} border ${border} rounded-xl p-4`}>
              <p className={`text-sm font-bold ${color} mb-2`}>
                {tx('Elige', 'Choose')} {title} {tx('cuando…', 'when…')}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">{reason}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSecurity = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('Seguridad Cloud — Baseline', 'Cloud Security — Baseline')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx('Los controles mínimos de seguridad que todo sistema cloud debe implementar', 'The minimum security controls every cloud system must implement')}
        </p>
      </div>

      <SecurityDiagram tx={tx} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            icon: Shield,
            title: tx('Identidad & Acceso (IAM)', 'Identity & Access (IAM)'),
            color: 'text-sky-300',
            border: 'border-sky-500/20',
            points: [
              tx('MFA obligatorio para todos los usuarios humanos', 'Mandatory MFA for all human users'),
              tx('Principio de mínimo privilegio — no usar *', 'Least privilege principle — never use *'),
              tx('Managed Identities en lugar de credenciales estáticas', 'Managed Identities instead of static credentials'),
              tx('Rotar access keys cada 90 días como máximo', 'Rotate access keys every 90 days maximum'),
            ],
          },
          {
            icon: Eye,
            title: tx('Protección de Datos', 'Data Protection'),
            color: 'text-violet-300',
            border: 'border-violet-500/20',
            points: [
              tx('Cifrado at-rest: AES-256 en discos y buckets', 'Encryption at-rest: AES-256 on disks and buckets'),
              tx('Cifrado in-transit: TLS 1.2+ siempre', 'Encryption in-transit: TLS 1.2+ always'),
              tx('Secrets en Vault / AWS Secrets Manager — nunca en .env en git', 'Secrets in Vault / AWS Secrets Manager — never in git .env'),
              tx('Backups cifrados y probados regularmente', 'Encrypted backups tested regularly'),
            ],
          },
          {
            icon: Server,
            title: tx('Seguridad de Red', 'Network Security'),
            color: 'text-orange-300',
            border: 'border-orange-500/20',
            points: [
              tx('VPC con subredes públicas/privadas separadas', 'VPC with separate public/private subnets'),
              tx('Security Groups: allowlist estricta, deny por defecto', 'Security Groups: strict allowlist, deny by default'),
              tx('WAF frente a endpoints públicos (OWASP Top 10)', 'WAF in front of public endpoints (OWASP Top 10)'),
              tx('Private endpoints para servicios cloud (sin internet público)', 'Private endpoints for cloud services (no public internet)'),
            ],
          },
          {
            icon: CheckCircle,
            title: tx('Compliance & Governance', 'Compliance & Governance'),
            color: 'text-green-300',
            border: 'border-green-500/20',
            points: [
              tx('Tagging obligatorio: project, env, owner, cost-center', 'Mandatory tagging: project, env, owner, cost-center'),
              tx('Policy as Code: AWS SCPs / Azure Policy / OPA', 'Policy as Code: AWS SCPs / Azure Policy / OPA'),
              tx('CloudTrail / Activity Logs habilitados en todas las regiones', 'CloudTrail / Activity Logs enabled in all regions'),
              tx('Revisiones de acceso trimestrales (access reviews)', 'Quarterly access reviews'),
            ],
          },
        ].map(({ icon: Icon, title, color, border, points }) => (
          <div key={title} className={`bg-slate-800/30 border ${border} rounded-xl p-4`}>
            <div className="flex items-center gap-2 mb-3">
              <Icon className={`w-4 h-4 ${color}`} />
              <span className={`text-sm font-bold ${color}`}>{title}</span>
            </div>
            <ul className="space-y-1.5">
              {points.map((p, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                  <span className="text-sky-400 mt-0.5 flex-shrink-0">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <CodeBlock
        language="hcl"
        code={`# IAM policy con mínimo privilegio — Terraform

resource "aws_iam_policy" "lambda_least_privilege" {
  name        = "lambda-s3-dynamo-read"
  description = "Least-privilege policy for Lambda: S3 read + DynamoDB specific table"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid      = "S3ReadAssets"
        Effect   = "Allow"
        Action   = ["s3:GetObject", "s3:ListBucket"]
        Resource = [
          "arn:aws:s3:::my-app-assets",
          "arn:aws:s3:::my-app-assets/*"
        ]
      },
      {
        Sid    = "DynamoDBReadOrders"
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ]
        Resource = "arn:aws:dynamodb:eu-west-1:123456789:table/orders"
        # Conditions para contexto extra de seguridad
        Condition = {
          StringEquals = {
            "aws:RequestedRegion" = "eu-west-1"
          }
        }
      }
      # Ninguna acción * — siempre acciones explícitas
    ]
  })
}`}
      />
    </div>
  );

  const renderFinops = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('FinOps & Optimización de Costes', 'FinOps & Cost Optimization')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx('Framework para maximizar el valor de negocio del gasto cloud', 'Framework to maximize business value from cloud spend')}
        </p>
      </div>

      <FinOpsDiagram tx={tx} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          {
            phase: tx('1. Inform', '1. Inform'),
            color: 'text-sky-300',
            border: 'border-sky-500/20',
            items: [
              tx('Tagging 100% de recursos', '100% resource tagging'),
              tx('Cost dashboards por equipo/producto', 'Cost dashboards per team/product'),
              tx('Alertas de presupuesto proactivas', 'Proactive budget alerts'),
              tx('Show-back / charge-back por BU', 'Show-back / charge-back per BU'),
            ],
          },
          {
            phase: tx('2. Optimize', '2. Optimize'),
            color: 'text-violet-300',
            border: 'border-violet-500/20',
            items: [
              tx('Rightsizing: bajar tipo de instancia', 'Rightsizing: downgrade instance type'),
              tx('Reserved Instances (1-3 años, -40-70%)', 'Reserved Instances (1-3yr, -40-70%)'),
              tx('Spot/Preemptible para batch (-80-90%)', 'Spot/Preemptible for batch (-80-90%)'),
              tx('Apagar entornos no productivos fuera de horario', 'Shut down non-prod outside business hours'),
            ],
          },
          {
            phase: tx('3. Operate', '3. Operate'),
            color: 'text-green-300',
            border: 'border-green-500/20',
            items: [
              tx('Revisiones de coste mensuales', 'Monthly cost reviews'),
              tx('KPIs: coste por usuario activo, coste por request', 'KPIs: cost per active user, cost per request'),
              tx('Automatizar apagado de recursos zombie', 'Automate zombie resource shutdown'),
              tx('Cultura FinOps en el equipo de ingeniería', 'FinOps culture in engineering team'),
            ],
          },
        ].map(({ phase, color, border, items }) => (
          <div key={phase} className={`bg-slate-800/30 border ${border} rounded-xl p-4`}>
            <p className={`text-sm font-bold ${color} mb-3`}>{phase}</p>
            <ul className="space-y-1.5">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                  <span className="text-sky-400 mt-0.5 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-slate-950/40 border border-sky-500/20 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800">
          <p className="text-xs font-semibold text-sky-300 uppercase tracking-wider">
            {tx('Estrategias de precios', 'Pricing Strategies')}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-950/70">
              <tr>
                <th className="px-4 py-2.5 text-left text-slate-400 font-semibold">{tx('Criterio', 'Criterion')}</th>
                <th className="px-4 py-2.5 text-left text-orange-300 font-semibold">On-Demand</th>
                <th className="px-4 py-2.5 text-left text-sky-300 font-semibold">Reserved</th>
                <th className="px-4 py-2.5 text-left text-green-300 font-semibold">Spot / Preemptible</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {[
                {
                  label: tx('Precio relativo', 'Relative price'),
                  od: '100% (base)',
                  res: tx('30-60% descuento', '30-60% discount'),
                  spot: tx('10-20% del On-Demand', '10-20% of On-Demand'),
                },
                {
                  label: tx('Compromiso', 'Commitment'),
                  od: tx('Ninguno', 'None'),
                  res: tx('1 o 3 años', '1 or 3 years'),
                  spot: tx('Sin compromiso', 'No commitment'),
                },
                {
                  label: tx('Interrupción', 'Interruption'),
                  od: tx('Sin interrupción', 'No interruption'),
                  res: tx('Sin interrupción', 'No interruption'),
                  spot: tx('2 min de aviso (AWS/GCP)', '2 min notice (AWS/GCP)'),
                },
                {
                  label: tx('Mejor para', 'Best for'),
                  od: tx('Cargas variables, desarrollo', 'Variable workloads, development'),
                  res: tx('Producción estable y predecible', 'Stable, predictable production'),
                  spot: tx('Batch, ML training, CI/CD agents', 'Batch, ML training, CI/CD agents'),
                },
              ].map(row => (
                <tr key={row.label} className="hover:bg-slate-800/20">
                  <td className="px-4 py-2.5 text-slate-300 font-medium">{row.label}</td>
                  <td className="px-4 py-2.5 text-slate-400">{row.od}</td>
                  <td className="px-4 py-2.5 text-slate-400">{row.res}</td>
                  <td className="px-4 py-2.5 text-slate-400">{row.spot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CodeBlock
        language="bash"
        code={`# AWS Cost Explorer CLI — análisis de costes

# Coste total del último mes por servicio
aws ce get-cost-and-usage \\
  --time-period Start=2026-04-01,End=2026-05-01 \\
  --granularity MONTHLY \\
  --metrics "UnblendedCost" \\
  --group-by Type=DIMENSION,Key=SERVICE

# Coste por tag de proyecto
aws ce get-cost-and-usage \\
  --time-period Start=2026-04-01,End=2026-05-01 \\
  --granularity MONTHLY \\
  --metrics "UnblendedCost" \\
  --group-by Type=TAG,Key=project \\
  --filter '{"Tags":{"Key":"env","Values":["production"]}}'

# Alerta de presupuesto — CloudFormation snippet
Resources:
  MonthlyCostAlert:
    Type: AWS::Budgets::Budget
    Properties:
      Budget:
        BudgetName: monthly-production-budget
        BudgetType: COST
        TimeUnit: MONTHLY
        BudgetLimit:
          Amount: 5000
          Unit: USD
      NotificationsWithSubscribers:
        - Notification:
            NotificationType: ACTUAL
            ComparisonOperator: GREATER_THAN
            Threshold: 80
          Subscribers:
            - SubscriptionType: EMAIL
              Address: finops@company.com`}
      />
    </div>
  );

  const renderContent = () => {
    switch (active) {
      case 'overview':     return renderOverview();
      case 'cicd':         return renderCicd();
      case 'iac':          return renderIac();
      case 'observability': return renderObservability();
      case 'comparison':   return renderComparison();
      case 'security':     return renderSecurity();
      case 'finops':       return renderFinops();
      default:             return renderOverview();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 lg:h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <div className="lg:col-span-1 lg:overflow-y-auto lg:pr-2">
        <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-hidden lg:pb-0 lg:space-y-2">
          {sections.map(s => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`flex-shrink-0 lg:w-full text-left px-3 py-2 lg:px-4 lg:py-3 rounded-xl transition-all ${
                  active === s.id
                    ? 'bg-sky-500/20 border border-sky-500/40 text-sky-300'
                    : 'bg-slate-800/30 border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm whitespace-nowrap lg:whitespace-normal">{s.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5 hidden lg:block">{s.subtitle}</div>
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
            transition={{ duration: 0.25 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CloudBasics;
