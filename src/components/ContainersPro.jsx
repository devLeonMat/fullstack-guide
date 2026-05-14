import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Package, Server, Network, ArrowRight, Box, Cpu, HardDrive, GitBranch, Zap, Shield, RefreshCw } from 'lucide-react';
import { SiDocker, SiKubernetes, SiHelm } from 'react-icons/si';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';

// ─── VM vs Container Diagram ────────────────────────────────────────────────────

const ConceptsDiagram = ({ tx }) => {
  const [highlight, setHighlight] = useState('container');

  useEffect(() => {
    const id = setInterval(() => setHighlight(h => h === 'vm' ? 'container' : 'vm'), 2000);
    return () => clearInterval(id);
  }, []);

  const vmStack = [
    { label: tx('App A', 'App A'), color: 'bg-blue-500/20 border-blue-500/40 text-blue-300' },
    { label: tx('Guest OS', 'Guest OS'), color: 'bg-blue-400/15 border-blue-400/30 text-blue-200' },
    { label: tx('Hypervisor', 'Hypervisor'), color: 'bg-purple-500/20 border-purple-500/40 text-purple-300' },
    { label: tx('Hardware', 'Hardware'), color: 'bg-slate-600/40 border-slate-500/40 text-slate-300' },
  ];

  const containerStack = [
    { label: tx('Container A', 'Container A'), color: 'bg-teal-500/20 border-teal-500/40 text-teal-300' },
    { label: tx('Container Runtime', 'Container Runtime'), color: 'bg-teal-400/15 border-teal-400/30 text-teal-200' },
    { label: tx('Host OS', 'Host OS'), color: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300' },
    { label: tx('Hardware', 'Hardware'), color: 'bg-slate-600/40 border-slate-500/40 text-slate-300' },
  ];

  const isVm = highlight === 'vm';

  return (
    <div className="bg-slate-950/40 border border-teal-500/20 rounded-xl p-4 space-y-4">
      <p className="text-center text-xs font-semibold text-teal-300 uppercase tracking-wider">
        {isVm
          ? tx('Máquinas Virtuales — ~GBs por instancia', 'Virtual Machines — ~GBs per instance')
          : tx('Contenedores — ~MBs por instancia', 'Containers — ~MBs per instance')}
      </p>

      <div className="grid grid-cols-2 gap-3">
        {/* VM column */}
        <motion.div
          animate={{ boxShadow: isVm ? '0 0 20px rgba(20,184,166,0.3)' : '0 0 0px transparent' }}
          className={`flex flex-col gap-1.5 p-3 rounded-xl border ${isVm ? 'border-teal-500/40 bg-teal-500/5' : 'border-slate-700/40 bg-slate-800/20'}`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Server className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 font-bold text-xs">VM</span>
            <span className="ml-auto text-xs text-slate-500">~GBs</span>
          </div>
          {vmStack.map((layer, i) => (
            <motion.div
              key={layer.label}
              animate={{ opacity: isVm ? 1 : 0.4, x: isVm ? 0 : -2 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={`border rounded-lg px-2 py-1 text-center text-xs font-semibold ${layer.color}`}
            >
              {layer.label}
            </motion.div>
          ))}
        </motion.div>

        {/* Container column */}
        <motion.div
          animate={{ boxShadow: !isVm ? '0 0 20px rgba(20,184,166,0.3)' : '0 0 0px transparent' }}
          className={`flex flex-col gap-1.5 p-3 rounded-xl border ${!isVm ? 'border-teal-500/40 bg-teal-500/5' : 'border-slate-700/40 bg-slate-800/20'}`}
        >
          <div className="flex items-center gap-2 mb-1">
            <SiDocker className="w-4 h-4 text-teal-400" />
            <span className="text-teal-300 font-bold text-xs">{tx('Contenedor', 'Container')}</span>
            <span className="ml-auto text-xs text-slate-500">~MBs</span>
          </div>
          {containerStack.map((layer, i) => (
            <motion.div
              key={layer.label}
              animate={{ opacity: !isVm ? 1 : 0.4, x: !isVm ? 0 : 2 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={`border rounded-lg px-2 py-1 text-center text-xs font-semibold ${layer.color}`}
            >
              {layer.label}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Image layers */}
      <div className="border-t border-slate-800 pt-3">
        <p className="text-xs text-slate-400 font-semibold mb-2 uppercase tracking-wide">
          {tx('Capas de imagen Docker (Union File System)', 'Docker Image Layers (Union File System)')}
        </p>
        <ImageLayersDiagram tx={tx} />
      </div>
    </div>
  );
};

const ImageLayersDiagram = ({ tx }) => {
  const [visibleCount, setVisibleCount] = useState(0);

  const layers = [
    { label: tx('Read/Write (Contenedor)', 'Read/Write (Container)'), color: 'bg-teal-500/20 border-teal-500/40 text-teal-300', note: tx('copy-on-write', 'copy-on-write') },
    { label: tx('App Code', 'App Code'), color: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300', note: 'COPY . .' },
    { label: tx('Dependencias', 'Dependencies'), color: 'bg-blue-500/15 border-blue-500/30 text-blue-300', note: 'npm ci' },
    { label: tx('Runtime (Node)', 'Runtime (Node)'), color: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300', note: 'RUN apt ...' },
    { label: 'Base OS (Alpine)', color: 'bg-slate-600/30 border-slate-500/40 text-slate-300', note: 'FROM alpine' },
  ];

  useEffect(() => {
    setVisibleCount(0);
    const timers = layers.map((_, i) =>
      setTimeout(() => setVisibleCount(v => Math.max(v, i + 1)), i * 250)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col gap-1">
      {[...layers].reverse().map((layer, i) => {
        const originalIdx = layers.length - 1 - i;
        return (
          <motion.div
            key={layer.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: visibleCount > originalIdx ? 1 : 0, x: visibleCount > originalIdx ? 0 : -10 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center justify-between border rounded-lg px-3 py-1.5 text-xs font-semibold ${layer.color}`}
          >
            <span>{layer.label}</span>
            <code className="text-slate-500 font-mono text-xs">{layer.note}</code>
          </motion.div>
        );
      })}
    </div>
  );
};

// ─── Docker Lifecycle Diagram ────────────────────────────────────────────────────

const DockerLifecycleDiagram = ({ tx }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: 'Dockerfile', icon: <Package className="w-4 h-4" />, color: 'border-teal-500/50 text-teal-300 bg-teal-500/10' },
    { label: 'docker build', icon: <Zap className="w-4 h-4" />, color: 'border-cyan-500/50 text-cyan-300 bg-cyan-500/10', cmd: true },
    { label: 'Image', icon: <Layers className="w-4 h-4" />, color: 'border-blue-500/50 text-blue-300 bg-blue-500/10' },
    { label: 'docker run', icon: <RefreshCw className="w-4 h-4" />, color: 'border-indigo-500/50 text-indigo-300 bg-indigo-500/10', cmd: true },
    { label: tx('Container', 'Container'), icon: <Box className="w-4 h-4" />, color: 'border-violet-500/50 text-violet-300 bg-violet-500/10' },
    { label: 'docker push', icon: <ArrowRight className="w-4 h-4" />, color: 'border-purple-500/50 text-purple-300 bg-purple-500/10', cmd: true },
    { label: 'Registry', icon: <HardDrive className="w-4 h-4" />, color: 'border-pink-500/50 text-pink-300 bg-pink-500/10' },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveStep(s => (s + 1) % steps.length), 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-teal-500/20 rounded-xl p-4">
      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-3">
        {tx('Ciclo de vida Docker', 'Docker Lifecycle')}
      </p>
      <div className="flex flex-wrap items-center gap-1.5 justify-center">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <motion.div
              animate={{
                boxShadow: activeStep === i ? '0 0 18px rgba(20,184,166,0.5)' : '0 0 0px transparent',
                scale: activeStep === i ? 1.08 : 1,
              }}
              transition={{ duration: 0.35 }}
              className={`flex items-center gap-1.5 border rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${step.color} ${activeStep === i ? 'opacity-100' : 'opacity-50'}`}
            >
              {step.icon}
              <span>{step.label}</span>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.span
                animate={{ opacity: activeStep === i ? 1 : 0.3 }}
                transition={{ duration: 0.35 }}
                className="text-teal-500/70 text-sm"
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Docker Compose Stack Diagram ────────────────────────────────────────────────

const ComposeDiagram = ({ tx }) => {
  const [visibleCount, setVisibleCount] = useState(0);

  const services = [
    { label: 'App (Node)', icon: <Server className="w-4 h-4" />, color: 'border-teal-500/50 text-teal-300 bg-teal-500/10', connects: [1, 2, 3] },
    { label: 'PostgreSQL', icon: <HardDrive className="w-4 h-4" />, color: 'border-blue-500/50 text-blue-300 bg-blue-500/10', connects: [] },
    { label: 'Redis', icon: <Zap className="w-4 h-4" />, color: 'border-red-500/50 text-red-300 bg-red-500/10', connects: [] },
    { label: 'nginx', icon: <Network className="w-4 h-4" />, color: 'border-green-500/50 text-green-300 bg-green-500/10', connects: [] },
  ];

  useEffect(() => {
    setVisibleCount(0);
    const timers = services.map((_, i) =>
      setTimeout(() => setVisibleCount(v => Math.max(v, i + 1)), i * 400)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-teal-500/20 rounded-xl p-4 space-y-3">
      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-2">
        {tx('Stack de Compose', 'Compose Stack')}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {services.map((svc, i) => (
          <div key={i} className="flex sm:flex-col items-center gap-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: visibleCount > i ? 1 : 0, y: visibleCount > i ? 0 : 10 }}
              transition={{ duration: 0.35 }}
              className={`flex items-center gap-2 border rounded-xl px-3 py-2.5 text-xs font-semibold ${svc.color}`}
            >
              {svc.icon}
              <span>{svc.label}</span>
            </motion.div>
            {i < services.length - 1 && (
              <motion.span
                animate={{ opacity: visibleCount > i ? 1 : 0.15 }}
                transition={{ duration: 0.35 }}
                className="text-teal-500/60 text-sm font-bold sm:hidden"
              >
                ↔
              </motion.span>
            )}
          </div>
        ))}
      </div>
      <div className="hidden sm:flex items-center justify-center gap-2 pt-1">
        {services.map((_, i) => i < services.length - 1 && (
          <div key={i} className="flex items-center gap-2">
            <motion.span
              animate={{ opacity: visibleCount > i ? 0.7 : 0.1 }}
              className="text-teal-500/70 text-xs"
            >
              ←→
            </motion.span>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 text-center">
        {tx('Todos los servicios en la misma red Docker interna', 'All services on the same internal Docker network')}
      </p>
    </div>
  );
};

// ─── Kubernetes Architecture Diagram ────────────────────────────────────────────

const KubernetesDiagram = ({ tx }) => {
  const [activeStep, setActiveStep] = useState(0);

  const schedulingSteps = [
    { label: 'kubectl apply', color: 'border-teal-500/50 text-teal-300 bg-teal-500/10' },
    { label: 'API Server', color: 'border-cyan-500/50 text-cyan-300 bg-cyan-500/10' },
    { label: 'Scheduler', color: 'border-blue-500/50 text-blue-300 bg-blue-500/10' },
    { label: tx('Node', 'Node'), color: 'border-indigo-500/50 text-indigo-300 bg-indigo-500/10' },
    { label: tx('Pod Running', 'Pod Running'), color: 'border-green-500/50 text-green-300 bg-green-500/10' },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveStep(s => (s + 1) % schedulingSteps.length), 1400);
    return () => clearInterval(id);
  }, []);

  const cpComponents = [
    { label: 'API Server', color: 'border-teal-500/30 text-teal-300' },
    { label: 'etcd', color: 'border-cyan-500/30 text-cyan-300' },
    { label: 'Scheduler', color: 'border-blue-500/30 text-blue-300' },
    { label: 'Controller Mgr', color: 'border-indigo-500/30 text-indigo-300' },
  ];

  const nodeComponents = [
    { label: 'kubelet', color: 'border-teal-400/30 text-teal-200' },
    { label: 'kube-proxy', color: 'border-cyan-400/30 text-cyan-200' },
    { label: 'Runtime', color: 'border-blue-400/30 text-blue-200' },
    { label: 'Pods', color: 'border-green-400/30 text-green-200' },
  ];

  return (
    <div className="bg-slate-950/40 border border-teal-500/20 rounded-xl p-4 space-y-4">
      {/* Pod scheduling flow */}
      <div>
        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-2">
          {tx('Flujo de scheduling de pod', 'Pod scheduling flow')}
        </p>
        <div className="flex flex-wrap items-center gap-1.5">
          {schedulingSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <motion.div
                animate={{
                  boxShadow: activeStep === i ? '0 0 16px rgba(20,184,166,0.5)' : '0 0 0px transparent',
                  scale: activeStep === i ? 1.07 : 1,
                }}
                transition={{ duration: 0.3 }}
                className={`border rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${step.color} ${activeStep === i ? 'opacity-100' : 'opacity-40'}`}
              >
                {step.label}
              </motion.div>
              {i < schedulingSteps.length - 1 && (
                <span className="text-teal-500/50 text-xs">→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Cluster architecture */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="border border-purple-500/30 bg-purple-500/5 rounded-xl p-3">
          <p className="text-xs font-bold text-purple-300 mb-2 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            {tx('Control Plane', 'Control Plane')}
          </p>
          <div className="space-y-1.5">
            {cpComponents.map((c, i) => (
              <div key={i} className={`border rounded-lg px-2 py-1 text-xs font-semibold ${c.color} bg-slate-900/40`}>
                {c.label}
              </div>
            ))}
          </div>
        </div>
        <div className="border border-teal-500/30 bg-teal-500/5 rounded-xl p-3">
          <p className="text-xs font-bold text-teal-300 mb-2 flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5" />
            {tx('Worker Node', 'Worker Node')}
          </p>
          <div className="space-y-1.5">
            {nodeComponents.map((c, i) => (
              <div key={i} className={`border rounded-lg px-2 py-1 text-xs font-semibold ${c.color} bg-slate-900/40`}>
                {c.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resources hierarchy */}
      <div className="border-t border-slate-800 pt-3">
        <p className="text-xs text-slate-400 font-semibold mb-2">{tx('Jerarquía de recursos', 'Resource hierarchy')}</p>
        <div className="flex items-center gap-2 flex-wrap text-xs">
          {['Deployment', 'ReplicaSet', 'Pod', 'Container'].map((r, i, arr) => (
            <div key={r} className="flex items-center gap-2">
              <span className="border border-teal-500/30 text-teal-300 bg-teal-500/10 rounded-lg px-2 py-1 font-semibold">{r}</span>
              {i < arr.length - 1 && <span className="text-teal-500/50">→</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Helm Chart Diagram ──────────────────────────────────────────────────────────

const HelmDiagram = ({ tx }) => {
  const [treeExpanded, setTreeExpanded] = useState(false);
  const [gitopsStep, setGitopsStep] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setTreeExpanded(true), 400);
    return () => clearTimeout(t);
  }, []);

  const gitopsSteps = [
    { label: 'Git Repo', icon: <GitBranch className="w-3.5 h-3.5" />, color: 'border-teal-500/50 text-teal-300 bg-teal-500/10' },
    { label: 'ArgoCD/Flux', icon: <RefreshCw className="w-3.5 h-3.5" />, color: 'border-cyan-500/50 text-cyan-300 bg-cyan-500/10' },
    { label: tx('Detecta drift', 'Detects drift'), icon: <Shield className="w-3.5 h-3.5" />, color: 'border-yellow-500/50 text-yellow-300 bg-yellow-500/10' },
    { label: tx('Sincroniza cluster', 'Syncs cluster'), icon: <SiKubernetes className="w-3.5 h-3.5" />, color: 'border-green-500/50 text-green-300 bg-green-500/10' },
  ];

  useEffect(() => {
    const id = setInterval(() => setGitopsStep(s => (s + 1) % gitopsSteps.length), 1500);
    return () => clearInterval(id);
  }, []);

  const treeItems = [
    { indent: 0, label: 'mychart/', icon: '📁' },
    { indent: 1, label: 'Chart.yaml', icon: '📄' },
    { indent: 1, label: 'values.yaml', icon: '⚙️' },
    { indent: 1, label: 'templates/', icon: '📁' },
    { indent: 2, label: 'deployment.yaml', icon: '📄' },
    { indent: 2, label: 'service.yaml', icon: '📄' },
    { indent: 2, label: 'ingress.yaml', icon: '📄' },
    { indent: 2, label: '_helpers.tpl', icon: '🔧' },
  ];

  return (
    <div className="bg-slate-950/40 border border-teal-500/20 rounded-xl p-4 space-y-4">
      {/* Chart file tree */}
      <div>
        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-2">
          {tx('Estructura de chart Helm', 'Helm chart structure')}
        </p>
        <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3 font-mono text-xs space-y-0.5">
          {treeItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: treeExpanded ? 1 : 0, x: treeExpanded ? 0 : -8 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="flex items-center gap-1.5"
              style={{ paddingLeft: `${item.indent * 16}px` }}
            >
              <span>{item.icon}</span>
              <span className={item.indent === 0 ? 'text-teal-300 font-bold' : item.indent === 1 ? 'text-cyan-300' : 'text-slate-300'}>
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Helm workflow */}
      <div>
        <p className="text-xs text-slate-400 font-semibold mb-2">{tx('Flujo Helm', 'Helm workflow')}</p>
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { label: tx('Chart (templates/)', 'Chart (templates/)'), color: 'border-teal-500/50 text-teal-300 bg-teal-500/10' },
            { label: 'helm install', color: 'border-cyan-500/50 text-cyan-300 bg-cyan-500/10', cmd: true },
            { label: tx('Recursos K8s', 'K8s Resources'), color: 'border-blue-500/50 text-blue-300 bg-blue-500/10' },
          ].map((step, i, arr) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className={`border rounded-lg px-2.5 py-1.5 text-xs font-semibold ${step.color}`}>
                {step.label}
              </div>
              {i < arr.length - 1 && <span className="text-teal-500/60 text-sm">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* GitOps animation */}
      <div className="border-t border-slate-800 pt-3">
        <p className="text-xs text-slate-400 font-semibold mb-2">{tx('Flujo GitOps', 'GitOps Flow')}</p>
        <div className="flex flex-wrap items-center gap-1.5">
          {gitopsSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <motion.div
                animate={{
                  boxShadow: gitopsStep === i ? '0 0 14px rgba(20,184,166,0.45)' : '0 0 0px transparent',
                  scale: gitopsStep === i ? 1.07 : 1,
                }}
                transition={{ duration: 0.3 }}
                className={`flex items-center gap-1.5 border rounded-lg px-2 py-1.5 text-xs font-semibold transition-all ${step.color} ${gitopsStep === i ? 'opacity-100' : 'opacity-40'}`}
              >
                {step.icon}
                <span>{step.label}</span>
              </motion.div>
              {i < gitopsSteps.length - 1 && (
                <motion.span
                  animate={{ opacity: gitopsStep === i ? 1 : 0.25 }}
                  className="text-teal-500/60 text-sm"
                >
                  →
                </motion.span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Section renderers ───────────────────────────────────────────────────────────

const renderConcepts = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Conceptos de Contenedores', 'Container Concepts')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Entiende la diferencia entre VMs y contenedores, y cómo funciona el sistema de capas de Docker.',
          'Understand the difference between VMs and containers, and how Docker\'s layer system works.'
        )}
      </p>
    </div>

    <ConceptsDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          icon: <Shield className="w-5 h-5 text-teal-400" />,
          title: tx('Inmutabilidad', 'Immutability'),
          color: 'border-teal-500/30',
          points: [
            tx('Las imágenes no cambian una vez construidas', 'Images don\'t change once built'),
            tx('Los cambios ocurren en la capa R/W del contenedor', 'Changes occur in container\'s R/W layer'),
            tx('Reproducibilidad garantizada entre entornos', 'Guaranteed reproducibility across environments'),
            tx('Rollback trivial: volver a la imagen anterior', 'Trivial rollback: revert to previous image'),
          ],
        },
        {
          icon: <Layers className="w-5 h-5 text-teal-400" />,
          title: tx('Union File System', 'Union File System'),
          color: 'border-cyan-500/30',
          points: [
            tx('Combina múltiples capas en una sola vista', 'Combines multiple layers into a single view'),
            tx('Capas inferiores son de solo lectura', 'Lower layers are read-only'),
            tx('Copy-on-write para eficiencia de almacenamiento', 'Copy-on-write for storage efficiency'),
            tx('Capas compartidas entre imágenes (caché)', 'Layers shared between images (cache)'),
          ],
        },
        {
          icon: <Cpu className="w-5 h-5 text-teal-400" />,
          title: tx('Namespaces', 'Namespaces'),
          color: 'border-blue-500/30',
          points: [
            tx('Aíslan procesos, red, usuario, PID, etc.', 'Isolate processes, network, user, PID, etc.'),
            tx('Cada contenedor ve su propio sistema de archivos', 'Each container sees its own filesystem'),
            tx('Red virtual separada por contenedor', 'Separate virtual network per container'),
            tx('Ilusión de ser un sistema operativo completo', 'Illusion of being a complete OS'),
          ],
        },
        {
          icon: <HardDrive className="w-5 h-5 text-teal-400" />,
          title: 'cgroups',
          color: 'border-indigo-500/30',
          points: [
            tx('Limitan recursos: CPU, memoria, I/O', 'Limit resources: CPU, memory, I/O'),
            tx('Previenen que un contenedor consuma todo', 'Prevent one container consuming all resources'),
            tx('Métricas de uso por contenedor', 'Per-container usage metrics'),
            tx('Base del aislamiento de rendimiento', 'Foundation of performance isolation'),
          ],
        },
      ].map(({ icon, title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
          <div className="flex items-center gap-2 mb-3">
            {icon}
            <h3 className="font-bold text-white text-sm">{title}</h3>
          </div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-teal-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

const renderDocker = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Docker Esencial', 'Docker Essentials')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Dockerfile multi-etapa, comandos clave y estrategias de caché de capas.',
          'Multi-stage Dockerfile, key commands and layer cache strategies.'
        )}
      </p>
    </div>

    <DockerLifecycleDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {[
        { title: tx('Multi-stage builds', 'Multi-stage builds'), desc: tx('Imagen final sin artefactos de build', 'Final image without build artifacts'), color: 'border-teal-500/30 text-teal-300' },
        { title: '.dockerignore', desc: tx('Excluye node_modules, .env, .git', 'Exclude node_modules, .env, .git'), color: 'border-cyan-500/30 text-cyan-300' },
        { title: tx('Layer caching', 'Layer caching'), desc: tx('Copia package.json antes que el código', 'Copy package.json before source code'), color: 'border-blue-500/30 text-blue-300' },
        { title: tx('Tagging', 'Tagging'), desc: tx('sha + semver + latest en registry', 'sha + semver + latest in registry'), color: 'border-indigo-500/30 text-indigo-300' },
      ].map(({ title, desc, color }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-3`}>
          <div className={`font-bold text-sm mb-1 ${color.split(' ')[1]}`}>{title}</div>
          <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>

    <CodeBlock language="dockerfile" code={`# ── Stage 1: Build ──────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Copy manifests first → cache this layer
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ── Stage 2: Production ──────────────────────────
FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

# Only copy what's needed
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy built output from stage 1
COPY --from=builder /app/dist ./dist

# Run as non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000
CMD ["node", "dist/server.js"]`} />

    <CodeBlock language="bash" code={`# Build with tag
docker build -t myapp:1.0.0 -t myapp:latest .

# Run with ports, env vars and name
docker run -d \\
  --name myapp \\
  -p 3000:3000 \\
  -e NODE_ENV=production \\
  -e DATABASE_URL=postgres://... \\
  --restart unless-stopped \\
  myapp:latest

# Execute command inside running container
docker exec -it myapp sh

# Stream logs (follow)
docker logs -f myapp

# Inspect container details (network, mounts, env)
docker inspect myapp

# Remove stopped containers, dangling images, unused networks
docker system prune -f

# Remove only dangling images
docker image prune -f

# Tag and push to registry
docker tag myapp:latest ghcr.io/org/myapp:latest
docker push ghcr.io/org/myapp:latest`} />
  </div>
);

const renderCompose = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        Docker Compose
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Orquesta múltiples servicios localmente con un solo archivo declarativo.',
          'Orchestrate multiple services locally with a single declarative file.'
        )}
      </p>
    </div>

    <ComposeDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {[
        {
          title: tx('Volúmenes nombrados vs bind mounts', 'Named volumes vs bind mounts'),
          color: 'border-teal-500/30 text-teal-300',
          points: [
            tx('Named: gestionados por Docker, para datos persistentes', 'Named: managed by Docker, for persistent data'),
            tx('Bind: mapea directorio host, para desarrollo', 'Bind: maps host directory, for development'),
            tx('tmpfs: en memoria, para datos temporales', 'tmpfs: in memory, for temporary data'),
          ],
        },
        {
          title: tx('Health checks y dependencias', 'Health checks & dependencies'),
          color: 'border-cyan-500/30 text-cyan-300',
          points: [
            tx('healthcheck define cuándo el servicio está "healthy"', 'healthcheck defines when service is "healthy"'),
            tx('depends_on condition: service_healthy espera health', 'depends_on condition: service_healthy waits for health'),
            tx('wait-for-it.sh como alternativa más robusta', 'wait-for-it.sh as a more robust alternative'),
          ],
        },
      ].map(({ title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
          <div className={`font-bold text-sm mb-2 ${color.split(' ')[1]}`}>{title}</div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-teal-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="yaml" code={`# docker-compose.yml
version: '3.9'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      target: production
    ports:
      - "3000:3000"
    env_file:
      - .env
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://user:pass@postgres:5432/mydb
      - REDIS_URL=redis://:redispass@redis:6379
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
    volumes:
      - ./logs:/app/logs
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s
    networks:
      - backend

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./db/init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d mydb"]
      interval: 10s
      timeout: 3s
      retries: 5
    networks:
      - backend

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass redispass
    networks:
      - backend

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
    depends_on:
      - app
    networks:
      - backend

networks:
  backend:
    driver: bridge

volumes:
  postgres_data:`} />

    <CodeBlock language="bash" code={`# Start all services in detached mode
docker compose up -d

# Start and rebuild images
docker compose up -d --build

# Stop and remove containers + named volumes
docker compose down -v

# Follow logs for all services
docker compose logs -f

# Follow logs for specific service
docker compose logs -f app

# List running services and their status
docker compose ps

# Execute command in running service
docker compose exec app sh
docker compose exec postgres psql -U user -d mydb

# Rebuild a single service without cache
docker compose build --no-cache app

# Run a one-off command without starting deps
docker compose run --rm app node scripts/seed.js`} />
  </div>
);

const renderKubernetes = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Arquitectura Kubernetes', 'Kubernetes Architecture')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Orquestación de contenedores a escala: auto-recuperación, escalado automático y despliegues sin downtime.',
          'Container orchestration at scale: self-healing, autoscaling and zero-downtime deployments.'
        )}
      </p>
    </div>

    <KubernetesDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {[
        { title: tx('Declarativo vs imperativo', 'Declarative vs imperative'), color: 'border-teal-500/30 text-teal-300', desc: tx('Describes el estado deseado en YAML; K8s reconcilia continuamente', 'Describe desired state in YAML; K8s continuously reconciles') },
        { title: tx('Self-healing', 'Self-healing'), color: 'border-cyan-500/30 text-cyan-300', desc: tx('ReplicaSet reinicia pods que fallan, los reemplaza si el nodo cae', 'ReplicaSet restarts failing pods, replaces them if node goes down') },
        { title: tx('Rolling updates', 'Rolling updates'), color: 'border-blue-500/30 text-blue-300', desc: tx('maxSurge/maxUnavailable controlan la velocidad del despliegue', 'maxSurge/maxUnavailable control rollout speed') },
        { title: 'HPA', color: 'border-indigo-500/30 text-indigo-300', desc: tx('Horizontal Pod Autoscaler escala réplicas por CPU/memoria/métricas custom', 'Horizontal Pod Autoscaler scales replicas by CPU/memory/custom metrics') },
      ].map(({ title, color, desc }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-3`}>
          <div className={`font-bold text-sm mb-1 ${color.split(' ')[1]}`}>{title}</div>
          <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>

    <CodeBlock language="yaml" code={`# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  labels:
    app: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: myapp
          image: ghcr.io/org/myapp:1.2.0
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: production
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: myapp-secrets
                  key: database-url
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 15
            periodSeconds: 20
          readinessProbe:
            httpGet:
              path: /ready
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 10
---
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-svc
spec:
  selector:
    app: myapp
  type: ClusterIP
  ports:
    - port: 80
      targetPort: 3000`} />

    <CodeBlock language="bash" code={`# List resources
kubectl get pods -n production
kubectl get deployments,services -o wide

# Describe a resource (events + state)
kubectl describe pod myapp-7d4f8b-xyz -n production

# Stream logs
kubectl logs -f deployment/myapp -n production
kubectl logs -f myapp-7d4f8b-xyz --previous  # crashed pod

# Execute into a pod
kubectl exec -it myapp-7d4f8b-xyz -- sh

# Apply / delete manifests
kubectl apply -f k8s/
kubectl delete -f k8s/deployment.yaml

# Rollout management
kubectl rollout status deployment/myapp
kubectl rollout history deployment/myapp
kubectl rollout undo deployment/myapp
kubectl rollout undo deployment/myapp --to-revision=2

# Scale manually
kubectl scale deployment/myapp --replicas=5

# Forward local port to pod/service
kubectl port-forward svc/myapp-svc 8080:80

# Resource usage
kubectl top nodes
kubectl top pods -n production`} />
  </div>
);

const renderHelm = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Helm & GitOps', 'Helm & GitOps')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Gestiona releases de Kubernetes con charts reutilizables y automatiza con GitOps.',
          'Manage Kubernetes releases with reusable charts and automate with GitOps.'
        )}
      </p>
    </div>

    <HelmDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {[
        {
          title: tx('Jerarquía de values', 'Values override hierarchy'),
          color: 'border-teal-500/30 text-teal-300',
          points: [
            tx('values.yaml (chart defaults)', 'values.yaml (chart defaults)'),
            tx('values-prod.yaml (env override)', 'values-prod.yaml (env override)'),
            tx('--set flag (más alta prioridad)', '--set flag (highest priority)'),
          ],
        },
        {
          title: tx('Principios GitOps', 'GitOps Principles'),
          color: 'border-cyan-500/30 text-cyan-300',
          points: [
            tx('Declarativo: estado en Git como fuente de verdad', 'Declarative: Git as source of truth'),
            tx('Versionado: historial completo con git log', 'Versioned: full history with git log'),
            tx('Automatizado: push a Git despliega a cluster', 'Automated: push to Git deploys to cluster'),
            tx('Reconciliación continua: ArgoCD detecta drift', 'Continuously reconciled: ArgoCD detects drift'),
          ],
        },
      ].map(({ title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
          <div className={`font-bold text-sm mb-2 ${color.split(' ')[1]}`}>{title}</div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-teal-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="bash" code={`# Add and search repositories
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm search repo bitnami/postgresql

# Install a chart
helm install myapp ./mychart -f values-prod.yaml -n production

# Install from remote registry
helm install postgres bitnami/postgresql \\
  --set auth.postgresPassword=secret \\
  --namespace production \\
  --create-namespace

# Upgrade (deploy new version)
helm upgrade myapp ./mychart \\
  -f values-prod.yaml \\
  --set image.tag=1.3.0 \\
  -n production

# Rollback to previous revision
helm rollback myapp 2 -n production

# List releases
helm list -n production
helm list --all-namespaces

# Uninstall (removes all K8s resources)
helm uninstall myapp -n production

# Render templates locally (debug)
helm template myapp ./mychart -f values-prod.yaml --debug

# Show computed values
helm get values myapp -n production`} />

    <CodeBlock language="yaml" code={`# values-prod.yaml  (overrides chart defaults)
image:
  repository: ghcr.io/org/myapp
  tag: "1.3.0"
  pullPolicy: IfNotPresent

replicaCount: 3

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: true
  className: nginx
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
  hosts:
    - host: api.myapp.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: myapp-tls
      hosts:
        - api.myapp.com

resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 500m
    memory: 512Mi

autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70`} />
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────────

function ContainersPro() {
  const { language } = useLanguage();
  const tx = (es, en) => language === 'en' ? en : es;
  const [active, setActive] = useState('concepts');

  const sections = [
    {
      id: 'concepts',
      title: tx('Conceptos', 'Concepts'),
      subtitle: tx('VM vs Container, capas', 'VM vs Container, layers'),
      icon: Layers,
    },
    {
      id: 'docker',
      title: 'Docker',
      subtitle: tx('Dockerfile, comandos', 'Dockerfile, commands'),
      icon: SiDocker,
    },
    {
      id: 'compose',
      title: 'Compose',
      subtitle: tx('Múltiples servicios', 'Multiple services'),
      icon: Package,
    },
    {
      id: 'kubernetes',
      title: 'Kubernetes',
      subtitle: tx('Orquestación', 'Orchestration'),
      icon: SiKubernetes,
    },
    {
      id: 'helm',
      title: 'Helm & GitOps',
      subtitle: tx('Charts, releases', 'Charts, releases'),
      icon: SiHelm,
    },
  ];

  const renderContent = () => {
    switch (active) {
      case 'concepts':    return renderConcepts(tx);
      case 'docker':      return renderDocker(tx);
      case 'compose':     return renderCompose(tx);
      case 'kubernetes':  return renderKubernetes(tx);
      case 'helm':        return renderHelm(tx);
      default:            return renderConcepts(tx);
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
                    ? 'bg-teal-500/20 border border-teal-500/40 text-teal-300'
                    : 'bg-slate-800/30 border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-2 lg:gap-3">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${active === s.id ? 'text-teal-400' : 'text-slate-500'}`} />
                  <div className="min-w-0">
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
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ContainersPro;
