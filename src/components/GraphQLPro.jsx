import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database, Globe, Server, Zap, Radio, Layers,
  RefreshCw, ArrowRight, ArrowDown, GitCompare,
  Braces, Plus, Pencil, Trash2, CheckCircle
} from 'lucide-react';
import { SiGraphql } from 'react-icons/si';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';

// ─── Shared helpers ────────────────────────────────────────────────────────────

const FlowArrow = () => (
  <div className="flex-shrink-0 flex flex-col md:flex-row items-center">
    <ArrowDown className="w-4 h-4 text-slate-600 md:hidden" />
    <ArrowRight className="w-4 h-4 text-slate-600 hidden md:block" />
  </div>
);

const Packet = ({ from, to, delay = 0, color = 'bg-pink-400' }) => (
  <motion.div
    className={`absolute w-2.5 h-2.5 ${color} rounded-full shadow-lg z-10`}
    style={{ left: from.x, top: from.y }}
    animate={{ left: [from.x, to.x], top: [from.y, to.y], opacity: [0, 1, 1, 0] }}
    transition={{ duration: 1.8, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

// ─── Diagram 1: Overview ───────────────────────────────────────────────────────

const OverviewDiagram = ({ tx }) => {
  const [phase, setPhase] = useState(0);
  const phases = [
    tx('① Cliente envía la query', '① Client sends the query'),
    tx('② Schema valida los campos', '② Schema validates fields'),
    tx('③ Resolvers obtienen los datos', '③ Resolvers fetch the data'),
    tx('④ Solo los campos pedidos regresan', '④ Only requested fields return'),
  ];

  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % 4), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-pink-500/20 rounded-xl p-4 space-y-4">
      <AnimatePresence mode="wait">
        <motion.p
          key={phase}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.25 }}
          className="text-center text-sm font-semibold text-pink-300 h-5"
        >
          {phases[phase]}
        </motion.p>
      </AnimatePresence>

      <div className="flex flex-col md:flex-row items-center gap-3">
        {/* Client */}
        <motion.div
          animate={{ boxShadow: phase === 0 || phase === 3 ? '0 0 18px rgba(96,165,250,0.5)' : '0 0 0px transparent' }}
          className="w-full md:flex-1 flex flex-col items-center gap-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl"
        >
          <Globe className="w-7 h-7 text-blue-400" />
          <span className="text-blue-300 font-bold text-xs">Client</span>
          <motion.div
            animate={{ opacity: phase === 0 ? [0.5, 1, 0.5] : 0.6 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="font-mono text-[10px] bg-slate-800 rounded px-2 py-1 text-slate-300 text-center w-full"
          >
            {'query { user { name } }'}
          </motion.div>
        </motion.div>

        <FlowArrow />

        {/* GraphQL Server */}
        <motion.div
          animate={{ boxShadow: phase === 1 || phase === 2 ? '0 0 22px rgba(236,72,153,0.5)' : '0 0 0px transparent' }}
          className="w-full md:flex-1 flex flex-col items-center gap-2 p-3 bg-pink-500/10 border border-pink-500/30 rounded-xl"
        >
          <SiGraphql className="w-7 h-7 text-pink-400" />
          <span className="text-pink-300 font-bold text-xs">GraphQL API</span>
          <div className="flex gap-1.5 flex-wrap justify-center">
            {[['Schema', 1], ['Resolvers', 2], ['Types', -1]].map(([tag, activePhase]) => (
              <motion.span
                key={tag}
                animate={{ backgroundColor: phase === activePhase ? 'rgba(236,72,153,0.35)' : 'rgba(30,41,59,0.9)' }}
                className="text-[10px] text-slate-300 rounded px-1.5 py-0.5 font-mono"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <FlowArrow />

        {/* Data Sources */}
        <div className="w-full md:flex-1 flex flex-col gap-1.5">
          {[
            { icon: Database, label: 'PostgreSQL', c: 'text-emerald-400', bg: 'bg-emerald-500/10', b: 'border-emerald-500/30' },
            { icon: Server, label: 'REST API', c: 'text-orange-400', bg: 'bg-orange-500/10', b: 'border-orange-500/30' },
            { icon: RefreshCw, label: 'Redis Cache', c: 'text-purple-400', bg: 'bg-purple-500/10', b: 'border-purple-500/30' },
          ].map(({ icon: Icon, label, c, bg, b }, i) => (
            <motion.div
              key={label}
              animate={{ scale: phase === 2 ? [1, 1.04, 1] : 1 }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              className={`flex items-center gap-2 px-2.5 py-1.5 ${bg} border ${b} rounded-lg`}
            >
              <Icon className={`w-3.5 h-3.5 ${c} flex-shrink-0`} />
              <span className={`text-xs font-semibold ${c}`}>{label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Return arrow */}
      <div className="flex items-center justify-center gap-2 pt-1">
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            animate={{ x: [0, -6, 0], opacity: phase === 3 ? 1 : 0.3 }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            className="text-pink-400 text-base"
          >←</motion.span>
        ))}
        <span className="text-xs text-slate-400 font-mono">
          {tx('solo los campos pedidos', 'only the fields requested')}
        </span>
      </div>
    </div>
  );
};

// ─── Diagram 2: Query ──────────────────────────────────────────────────────────

const QueryDiagram = ({ tx }) => {
  const requested = ['name', 'email'];
  const allFields = ['id', 'name', 'email', 'phone', 'address', 'role', 'createdAt'];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Query */}
        <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
            GraphQL Query
          </span>
          <div className="font-mono text-sm leading-relaxed">
            <span className="text-pink-400">query </span>
            <span className="text-yellow-300">GetUser </span>
            <span className="text-slate-300">{'{'}</span>
            <br />
            <span className="ml-4 text-blue-300">{'user(id: "1") {'}</span>
            <br />
            {requested.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.3 + 0.2 }}
                className="ml-8"
              >
                <span className="text-green-400">{f}</span>
              </motion.div>
            ))}
            <span className="ml-4 text-slate-300">{'}'}</span>
            <br />
            <span className="text-slate-300">{'}'}</span>
          </div>
        </div>

        {/* Response */}
        <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs font-bold text-green-400 uppercase tracking-wider">
              {tx('Respuesta exacta', 'Exact response')}
            </span>
          </div>
          <div className="font-mono text-sm leading-relaxed">
            <span className="text-slate-400">{'{ "data": { "user": {'}</span>
            <br />
            {requested.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.3 + 0.6 }}
                className="ml-4"
              >
                <span className="text-yellow-300">"{f}"</span>
                <span className="text-slate-400">: </span>
                <span className="text-green-300">"..."</span>
              </motion.div>
            ))}
            <span className="text-slate-400">{'}}}'}</span>
          </div>
        </div>
      </div>

      {/* Over-fetching note */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
        <p className="text-amber-300 text-sm">
          ⚡ <strong>{tx('Sin over-fetching:', 'No over-fetching:')}</strong>{' '}
          {tx(
            `Los campos ${allFields.filter(f => !requested.includes(f)).join(', ')} NO se envían.`,
            `Fields ${allFields.filter(f => !requested.includes(f)).join(', ')} are NOT sent.`
          )}
        </p>
      </div>

      {/* Field grid visual */}
      <div className="bg-slate-900/40 border border-slate-700 rounded-xl p-4">
        <p className="text-xs text-slate-500 mb-3 font-mono uppercase tracking-wider">
          {tx('Todos los campos disponibles en el servidor', 'All fields available on the server')}
        </p>
        <div className="flex flex-wrap gap-2">
          {allFields.map(f => (
            <motion.span
              key={f}
              animate={requested.includes(f)
                ? { backgroundColor: ['rgba(34,197,94,0.1)', 'rgba(34,197,94,0.25)', 'rgba(34,197,94,0.1)'] }
                : {}}
              transition={{ duration: 2, repeat: Infinity }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono border ${requested.includes(f)
                ? 'border-green-500/60 text-green-300 bg-green-500/10'
                : 'border-slate-700 text-slate-500 bg-slate-800/50'
                }`}
            >
              {requested.includes(f) ? '✓ ' : ''}{f}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Diagram 3: Mutation ───────────────────────────────────────────────────────

const MutationDiagram = ({ tx }) => {
  const [op, setOp] = useState('create');

  const ops = [
    { id: 'create', label: 'CREATE', icon: Plus, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/40' },
    { id: 'update', label: 'UPDATE', icon: Pencil, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/40' },
    { id: 'delete', label: 'DELETE', icon: Trash2, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/40' },
  ];

  const content = {
    create: {
      mutation: `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    email
    createdAt
  }
}

# Variables
{
  "input": {
    "name": "Ana García",
    "email": "ana@example.com"
  }
}`,
      response: `{
  "data": {
    "createUser": {
      "id": "101",
      "name": "Ana García",
      "email": "ana@example.com",
      "createdAt": "2025-05-13T..."
    }
  }
}`,
    },
    update: {
      mutation: `mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    id
    name
    updatedAt
  }
}

# Variables
{
  "id": "101",
  "input": { "name": "Ana López" }
}`,
      response: `{
  "data": {
    "updateUser": {
      "id": "101",
      "name": "Ana López",
      "updatedAt": "2025-05-13T..."
    }
  }
}`,
    },
    delete: {
      mutation: `mutation DeleteUser($id: ID!) {
  deleteUser(id: $id) {
    success
    message
  }
}

# Variables
{
  "id": "101"
}`,
      response: `{
  "data": {
    "deleteUser": {
      "success": true,
      "message": "User deleted successfully"
    }
  }
}`,
    },
  };

  const current = ops.find(o => o.id === op);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {ops.map(o => {
          const Icon = o.icon;
          return (
            <button
              key={o.id}
              onClick={() => setOp(o.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold border transition-all ${op === o.id
                ? `${o.bg} ${o.border} ${o.color}`
                : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
            >
              <Icon className="w-4 h-4" />
              {o.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={op}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          <div className={`rounded-xl p-4 ${current.bg} border ${current.border}`}>
            <span className={`text-xs font-bold uppercase ${current.color} block mb-2`}>
              {tx('Mutation enviada', 'Mutation sent')}
            </span>
            <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap overflow-x-auto leading-relaxed">
              {content[op].mutation}
            </pre>
          </div>
          <div className="rounded-xl p-4 bg-green-500/10 border border-green-500/30">
            <div className="flex items-center gap-2 mb-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <CheckCircle className="w-4 h-4 text-green-400" />
              </motion.div>
              <span className="text-xs font-bold uppercase text-green-400">
                {tx('Respuesta', 'Response')}
              </span>
            </div>
            <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap overflow-x-auto leading-relaxed">
              {content[op].response}
            </pre>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ─── Diagram 4: Subscription ───────────────────────────────────────────────────

const SubscriptionDiagram = ({ tx, language }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents([]);
    const names = ['Ana', 'Carlos', 'María', 'Luis', 'Pedro'];
    const actions = language === 'en'
      ? ['sent a message', 'liked a post', 'joined the room', 'uploaded a file']
      : ['envió un mensaje', 'le dio like a un post', 'entró al chat', 'subió un archivo'];

    const id = setInterval(() => {
      const name = names[Math.floor(Math.random() * names.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];
      setEvents(prev => [{
        id: Date.now(),
        text: `${name} ${action}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      }, ...prev].slice(0, 5));
    }, 1800);
    return () => clearInterval(id);
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-3">
      {/* Connection status */}
      <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="w-3 h-3 bg-green-400 rounded-full flex-shrink-0"
        />
        <span className="text-green-400 text-sm font-semibold">
          WebSocket {tx('conectado', 'connected')}
        </span>
        <code className="text-slate-400 text-xs ml-auto font-mono">wss://api/graphql</code>
      </div>

      {/* Flow nodes */}
      <div className="grid grid-cols-3 gap-2 items-center">
        <div className="flex flex-col items-center gap-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <Globe className="w-6 h-6 text-blue-400" />
          <span className="text-blue-300 text-xs font-bold">Client</span>
          <span className="text-[10px] text-slate-400 text-center leading-tight">
            {tx('Escucha eventos', 'Listens to events')}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <motion.div
            animate={{ scaleX: [1, 1.1, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-pink-400 font-bold text-xl tracking-widest"
          >⇄</motion.div>
          <span className="text-[10px] text-slate-500 text-center">
            WebSocket
          </span>
          {/* Animated pulses */}
          <div className="flex gap-1 mt-1">
            {[0, 0.3, 0.6].map((d, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: d }}
                className="w-1.5 h-1.5 bg-pink-400 rounded-full"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 p-3 bg-pink-500/10 border border-pink-500/30 rounded-xl">
          <SiGraphql className="w-6 h-6 text-pink-400" />
          <span className="text-pink-300 text-xs font-bold">Server</span>
          <span className="text-[10px] text-slate-400 text-center leading-tight">
            {tx('Emite eventos', 'Emits events')}
          </span>
        </div>
      </div>

      {/* Live event stream */}
      <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-3 min-h-[140px]">
        <p className="text-[11px] text-slate-500 mb-2 font-mono">
          {tx('// Stream de eventos en tiempo real', '// Real-time event stream')}
        </p>
        <div className="space-y-1.5">
          <AnimatePresence>
            {events.map(ev => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, x: -12, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 text-xs overflow-hidden"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [1.5, 1] }}
                  transition={{ duration: 0.2 }}
                  className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"
                />
                <span className="text-slate-500 font-mono flex-shrink-0">[{ev.time}]</span>
                <span className="text-slate-200">{ev.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {events.length === 0 && (
            <p className="text-slate-600 text-xs font-mono animate-pulse">
              {tx('Esperando eventos...', 'Waiting for events...')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

function GraphQLPro() {
  const { language } = useLanguage();
  const tx = (es, en) => language === 'en' ? en : es;
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: tx('¿Cómo funciona?', 'How it works'), subtitle: tx('Ciclo de una petición', 'Request lifecycle'), icon: SiGraphql },
    { id: 'query', title: 'Query', subtitle: tx('Lectura exacta de datos', 'Exact data reading'), icon: Braces },
    { id: 'mutation', title: 'Mutation', subtitle: tx('Escritura de datos', 'Writing data'), icon: Zap },
    { id: 'subscription', title: 'Subscription', subtitle: tx('Tiempo real / WebSocket', 'Real-time / WebSocket'), icon: Radio },
    { id: 'schema', title: 'Schema & Types', subtitle: tx('Sistema de tipos', 'Type system'), icon: Layers },
    { id: 'vsrest', title: 'vs REST', subtitle: tx('Comparativa clave', 'Key comparison'), icon: GitCompare },
  ];

  const current = sections.find(s => s.id === activeSection);
  const SectionIcon = current.icon;

  const sectionContent = {
    overview: {
      color: 'text-pink-400',
      intro: tx(
        'GraphQL es un lenguaje de consulta para APIs desarrollado por Meta. A diferencia de REST, expone un único endpoint y permite al cliente pedir exactamente los datos que necesita, ni más ni menos.',
        'GraphQL is a query language for APIs developed by Meta. Unlike REST, it exposes a single endpoint and lets the client ask for exactly the data it needs — no more, no less.'
      ),
      points: tx(
        ['Un solo endpoint /graphql', 'El cliente define la forma de la respuesta', 'Tipado fuerte con Schema Definition Language (SDL)', 'Introspección: la API se auto-documenta', 'Soporta Query, Mutation y Subscription'],
        ['Single /graphql endpoint', 'Client defines the shape of the response', 'Strongly typed with Schema Definition Language (SDL)', 'Introspection: the API self-documents', 'Supports Query, Mutation and Subscription']
      ),
      diagram: <OverviewDiagram tx={tx} />,
      code: `// Apollo Server (Node.js)
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = \`
  type User {
    id: ID!
    name: String!
    email: String!
  }
  type Query {
    user(id: ID!): User
    users: [User!]!
  }
\`;

const resolvers = {
  Query: {
    user: (_, { id }) => users.find(u => u.id === id),
    users: () => users,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(\`🚀 Server ready at: \${url}\`);`,
    },

    query: {
      color: 'text-blue-400',
      intro: tx(
        'Una Query en GraphQL sirve para leer datos. El cliente especifica exactamente qué campos necesita, y el servidor devuelve solo esos campos. Esto elimina el over-fetching (recibir más de lo necesario) y el under-fetching (necesitar varias llamadas para obtener lo suficiente).',
        'A Query in GraphQL is used to read data. The client specifies exactly which fields it needs, and the server returns only those fields. This eliminates over-fetching (receiving more than needed) and under-fetching (needing multiple calls to get enough data).'
      ),
      points: tx(
        ['Operación de solo lectura', 'Puede pedir campos anidados en una sola petición', 'Soporta argumentos y variables', 'Aliases para renombrar campos en la respuesta', 'Fragments para reutilizar conjuntos de campos'],
        ['Read-only operation', 'Can request nested fields in a single call', 'Supports arguments and variables', 'Aliases to rename fields in response', 'Fragments to reuse field sets']
      ),
      diagram: <QueryDiagram tx={tx} />,
      code: `# Query básica con variables
query GetUser($id: ID!) {
  user(id: $id) {
    name
    email
    posts {       # Campos anidados en una sola petición
      title
      publishedAt
    }
  }
}

# Múltiples recursos en una petición (vs REST que necesitaría 2+)
query Dashboard {
  me {
    name
    notifications { id, message }
  }
  trending: posts(limit: 5, orderBy: VIEWS) {
    title
    views
  }
}

# Alias + Fragment
fragment UserFields on User {
  id
  name
  avatar
}

query CompareUsers {
  userA: user(id: "1") { ...UserFields }
  userB: user(id: "2") { ...UserFields }
}`,
    },

    mutation: {
      color: 'text-yellow-400',
      intro: tx(
        'Las Mutations son operaciones que modifican datos en el servidor: crear, actualizar o eliminar. A diferencia de las Queries, las Mutations se ejecutan en serie (no en paralelo) para garantizar consistencia. También devuelven exactamente los campos que el cliente solicita.',
        'Mutations are operations that modify data on the server: create, update, or delete. Unlike Queries, Mutations execute serially (not in parallel) to ensure consistency. They also return exactly the fields the client requests.'
      ),
      points: tx(
        ['Operaciones de escritura (CREATE / UPDATE / DELETE)', 'Se ejecutan en serie para consistencia', 'Devuelven datos actualizados en la misma petición', 'Soportan input types para validación', 'Pueden actualizar la caché del cliente automáticamente'],
        ['Write operations (CREATE / UPDATE / DELETE)', 'Execute serially for consistency', 'Return updated data in the same request', 'Support input types for validation', 'Can update client cache automatically']
      ),
      diagram: <MutationDiagram tx={tx} />,
      code: `# Input type en el schema
input CreateUserInput {
  name: String!
  email: String!
  role: Role = USER
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
  deleteUser(id: ID!): DeleteResult!
}

# Resolver
const resolvers = {
  Mutation: {
    createUser: async (_, { input }, { db }) => {
      const user = await db.users.create(input);
      return user;
    },
    updateUser: async (_, { id, input }, { db }) => {
      return db.users.update(id, input);
    },
    deleteUser: async (_, { id }, { db }) => {
      await db.users.delete(id);
      return { success: true, message: 'Deleted' };
    },
  },
};`,
    },

    subscription: {
      color: 'text-green-400',
      intro: tx(
        'Las Subscriptions permiten recibir actualizaciones en tiempo real desde el servidor mediante WebSockets. El cliente se suscribe a un evento y el servidor envía datos cada vez que ese evento ocurre. Son ideales para chats, notificaciones, feeds en vivo o dashboards.',
        'Subscriptions allow receiving real-time updates from the server via WebSockets. The client subscribes to an event and the server pushes data every time that event occurs. Ideal for chats, notifications, live feeds, or dashboards.'
      ),
      points: tx(
        ['Conexión persistente WebSocket', 'El servidor empuja datos (push) al cliente', 'Se mantienen activas hasta que el cliente las cancela', 'Usan PubSub internamente (Redis, Kafka, etc.)', 'Apollo Client las gestiona automáticamente'],
        ['Persistent WebSocket connection', 'Server pushes data to client', 'Stay active until client unsubscribes', 'Use PubSub internally (Redis, Kafka, etc.)', 'Apollo Client manages them automatically']
      ),
      diagram: <SubscriptionDiagram tx={tx} language={language} />,
      code: `# Schema
type Subscription {
  messageAdded(channelId: ID!): Message!
  userOnline: User!
}

# Resolver con PubSub
import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();

const resolvers = {
  Mutation: {
    sendMessage: async (_, { input }, { db }) => {
      const msg = await db.messages.create(input);
      // Publicar evento a los suscriptores
      pubsub.publish('MESSAGE_ADDED', { messageAdded: msg });
      return msg;
    },
  },
  Subscription: {
    messageAdded: {
      subscribe: (_, { channelId }) =>
        pubsub.asyncIterator(\`MESSAGE_ADDED_\${channelId}\`),
    },
  },
};

// Cliente (React + Apollo)
const { data } = useSubscription(MESSAGE_ADDED, {
  variables: { channelId: 'general' },
  onData: ({ data }) => console.log('New message:', data),
});`,
    },

    schema: {
      color: 'text-purple-400',
      intro: tx(
        'El Schema es el contrato entre el cliente y el servidor. Define todos los tipos de datos disponibles, sus campos, y las operaciones posibles (Query, Mutation, Subscription). Está escrito en SDL (Schema Definition Language) y es la fuente de verdad de toda la API.',
        'The Schema is the contract between client and server. It defines all available data types, their fields, and possible operations (Query, Mutation, Subscription). Written in SDL (Schema Definition Language), it is the single source of truth for the entire API.'
      ),
      points: tx(
        ['Tipos escalares: String, Int, Float, Boolean, ID', 'Tipos objeto: definen la forma de los datos', '! = campo requerido (non-nullable)', '[Type] = lista / array', 'Enum, Interface, Union para casos avanzados'],
        ['Scalar types: String, Int, Float, Boolean, ID', 'Object types: define the shape of data', '! = required field (non-nullable)', '[Type] = list / array', 'Enum, Interface, Union for advanced cases']
      ),
      diagram: null,
      code: `# Tipos escalares y objetos
type User {
  id: ID!            # Non-nullable ID
  name: String!      # Requerido
  email: String!
  age: Int           # Opcional (nullable)
  role: Role!        # Enum
  posts: [Post!]!    # Lista non-nullable de Posts
  profile: Profile   # Relación opcional
}

type Post {
  id: ID!
  title: String!
  body: String!
  published: Boolean!
  author: User!
  tags: [String!]
}

# Enum
enum Role {
  ADMIN
  USER
  MODERATOR
}

# Input type (para Mutations)
input CreatePostInput {
  title: String!
  body: String!
  tags: [String!]
}

# Interface
interface Node {
  id: ID!
}

type Comment implements Node {
  id: ID!
  text: String!
  author: User!
}

# Union
union SearchResult = User | Post | Comment

# Tipos de operación raíz
type Query {
  user(id: ID!): User
  users(role: Role): [User!]!
  search(term: String!): [SearchResult!]!
}

type Mutation {
  createPost(input: CreatePostInput!): Post!
}

type Subscription {
  postPublished: Post!
}`,
    },

    vsrest: {
      color: 'text-cyan-400',
      intro: tx(
        'GraphQL y REST son dos enfoques diferentes para diseñar APIs. Cada uno tiene sus ventajas según el caso de uso. GraphQL brilla en aplicaciones con datos complejos y múltiples clientes; REST sigue siendo ideal para APIs simples, públicas o con mucho cacheo.',
        'GraphQL and REST are two different approaches to API design. Each has its strengths depending on the use case. GraphQL shines in apps with complex data and multiple clients; REST remains ideal for simple, public, or heavily cached APIs.'
      ),
      points: null,
      diagram: null,
      code: `# REST vs GraphQL — mismo resultado, diferente camino

## REST: necesitas 3 peticiones
GET /users/1
GET /users/1/posts
GET /posts/42/comments

## GraphQL: todo en una sola petición
query {
  user(id: "1") {
    name
    posts {
      title
      comments {
        text
        author { name }
      }
    }
  }
}

# ─── Versionado ───────────────────────────────────────
## REST
GET /api/v1/users   # versión antigua
GET /api/v2/users   # versión nueva — breaking change

## GraphQL — sin versiones, evolución continua
# Solo añades campos nuevos, los viejos siguen funcionando
type User {
  name: String!     # campo original
  fullName: String  # campo nuevo — no rompe clientes existentes
  # @deprecated(reason: "Use fullName instead")
  # nickname: String
}`,
    },
  };

  const sec = sectionContent[activeSection];

  const comparisonRows = [
    { aspect: tx('Endpoints', 'Endpoints'), rest: tx('Múltiples (/users, /posts...)', 'Multiple (/users, /posts...)'), graphql: tx('Uno solo (/graphql)', 'Single (/graphql)'), winner: 'graphql' },
    { aspect: tx('Over-fetching', 'Over-fetching'), rest: tx('Común — recibes todo el objeto', 'Common — you get the full object'), graphql: tx('Eliminado — solo lo que pides', 'Eliminated — only what you ask'), winner: 'graphql' },
    { aspect: tx('Under-fetching', 'Under-fetching'), rest: tx('Requiere múltiples llamadas', 'Requires multiple calls'), graphql: tx('Una petición, datos anidados', 'One request, nested data'), winner: 'graphql' },
    { aspect: tx('Caché HTTP', 'HTTP Caching'), rest: tx('Nativo (GET se cachea fácil)', 'Native (GET caches easily)'), graphql: tx('Requiere configuración extra', 'Requires extra configuration'), winner: 'rest' },
    { aspect: tx('Curva de aprendizaje', 'Learning curve'), rest: tx('Baja — solo HTTP + JSON', 'Low — just HTTP + JSON'), graphql: tx('Mayor — schema, resolvers...', 'Higher — schema, resolvers...'), winner: 'rest' },
    { aspect: tx('Tipado', 'Type safety'), rest: tx('Opcional (OpenAPI/Swagger)', 'Optional (OpenAPI/Swagger)'), graphql: tx('Nativo y fuerte', 'Native and strong'), winner: 'graphql' },
    { aspect: tx('Tiempo real', 'Real-time'), rest: tx('WebSockets externos', 'External WebSockets'), graphql: tx('Subscriptions nativas', 'Native Subscriptions'), winner: 'graphql' },
    { aspect: tx('Ecosistema', 'Ecosystem'), rest: tx('Muy maduro y universal', 'Very mature and universal'), graphql: tx('Creciente, Apollo líder', 'Growing, Apollo leading'), winner: 'rest' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 lg:h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <div className="lg:col-span-1 lg:overflow-y-auto lg:pr-2">
        <h3 className="text-base lg:text-lg font-bold text-pink-400 mb-2 lg:mb-4 flex items-center gap-2">
          <SiGraphql className="w-5 h-5 lg:w-6 lg:h-6" />
          GraphQL Pro
        </h3>
        <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-hidden lg:pb-0 lg:space-y-2">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex-shrink-0 lg:w-full text-left px-3 py-2 lg:px-4 lg:py-3 rounded-lg transition-all flex items-center gap-2 lg:gap-3 ${activeSection === s.id
                  ? 'bg-pink-500/20 border border-pink-500/50 text-pink-300'
                  : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
              >
                <Icon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm lg:text-base whitespace-nowrap lg:whitespace-normal">{s.title}</div>
                  <div className="hidden lg:block text-xs opacity-70 line-clamp-1">{s.subtitle}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="lg:col-span-3 lg:overflow-y-auto lg:pr-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-1">
                <SectionIcon className={`w-6 h-6 lg:w-8 lg:h-8 ${sec.color}`} />
                <h2 className={`text-xl lg:text-3xl font-bold ${sec.color}`}>{current.title}</h2>
              </div>
              <p className="text-slate-400 text-sm">{current.subtitle}</p>
            </div>

            {/* Intro */}
            <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
              <p className="text-slate-200 leading-relaxed text-sm">{sec.intro}</p>
            </div>

            {/* Points */}
            {sec.points && (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {sec.points.map((p, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-2 text-slate-300 text-sm"
                  >
                    <span className="text-pink-400 mt-0.5 flex-shrink-0">▸</span>
                    <span>{p}</span>
                  </motion.li>
                ))}
              </ul>
            )}

            {/* Animated diagram */}
            {sec.diagram && sec.diagram}

            {/* vs REST comparison table */}
            {activeSection === 'vsrest' && (
              <div className="overflow-x-auto rounded-xl border border-slate-700">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-950/70">
                    <tr>
                      <th className="px-4 py-3 text-left text-slate-400 font-semibold">{tx('Aspecto', 'Aspect')}</th>
                      <th className="px-4 py-3 text-left text-orange-300 font-semibold">REST</th>
                      <th className="px-4 py-3 text-left text-pink-300 font-semibold">GraphQL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, i) => (
                      <tr key={i} className="border-t border-slate-800 hover:bg-slate-800/30">
                        <td className="px-4 py-3 text-slate-300 font-medium">{row.aspect}</td>
                        <td className={`px-4 py-3 ${row.winner === 'rest' ? 'text-green-300 font-semibold' : 'text-slate-400'}`}>
                          {row.winner === 'rest' && <span className="mr-1">★</span>}{row.rest}
                        </td>
                        <td className={`px-4 py-3 ${row.winner === 'graphql' ? 'text-green-300 font-semibold' : 'text-slate-400'}`}>
                          {row.winner === 'graphql' && <span className="mr-1">★</span>}{row.graphql}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Code example */}
            {sec.code && (
              <div className="space-y-2">
                <h4 className="text-slate-300 font-semibold text-sm flex items-center gap-2">
                  <Braces className="w-4 h-4 text-pink-400" />
                  {tx('Ejemplo de código', 'Code example')}
                </h4>
                <CodeBlock code={sec.code} language="graphql" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default GraphQLPro;
