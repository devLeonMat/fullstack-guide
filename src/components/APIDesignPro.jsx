import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Lock, ChevronDown, ChevronUp, ArrowRight, Zap, Shield, RefreshCw } from 'lucide-react';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';

// ─── REST Diagram ────────────────────────────────────────────────────────────

const RESTDiagram = ({ tx }) => {
  const [step, setStep] = useState(0);

  const cycles = [
    { method: 'GET',    path: '/users/42',    status: '200 OK',      color: 'text-emerald-300', border: 'border-emerald-500/50', bg: 'bg-emerald-500/10' },
    { method: 'POST',   path: '/users',        status: '201 Created', color: 'text-blue-300',    border: 'border-blue-500/50',    bg: 'bg-blue-500/10' },
    { method: 'PUT',    path: '/users/42',    status: '200 OK',      color: 'text-amber-300',   border: 'border-amber-500/50',   bg: 'bg-amber-500/10' },
    { method: 'DELETE', path: '/users/42',    status: '204 No Content', color: 'text-red-300',  border: 'border-red-500/50',     bg: 'bg-red-500/10' },
  ];

  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % (cycles.length * 2)), 1200);
    return () => clearInterval(id);
  }, [cycles.length]);

  const cycleIdx = Math.floor(step / 2) % cycles.length;
  const phase = step % 2; // 0 = request, 1 = response
  const current = cycles[cycleIdx];

  return (
    <div className="bg-slate-950/40 border border-orange-500/20 rounded-xl p-4 space-y-4">
      <p className="text-center text-xs font-semibold text-orange-300 uppercase tracking-wider">
        {tx('Ciclo request / response REST', 'REST request / response cycle')}
      </p>
      <div className="flex items-center justify-between gap-2">
        {/* Client */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-600 flex items-center justify-center">
            <Globe className="w-6 h-6 text-slate-300" />
          </div>
          <span className="text-xs text-slate-400">Client</span>
        </div>

        {/* Arrow + method */}
        <div className="flex-1 flex flex-col items-center gap-1">
          <AnimatePresence mode="wait">
            {phase === 0 ? (
              <motion.div key="req" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                className={`text-center px-2 py-1 rounded-lg border text-xs font-bold ${current.bg} ${current.border} ${current.color}`}>
                {current.method}
              </motion.div>
            ) : (
              <motion.div key="res" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                className="text-center px-2 py-1 rounded-lg border border-emerald-500/40 bg-emerald-500/5 text-xs font-bold text-emerald-300">
                {current.status}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div className="w-full flex items-center justify-center"
            animate={{ scaleX: phase === 0 ? [1, 1.05, 1] : [1, 1.05, 1] }}
            transition={{ duration: 0.5 }}>
            <ArrowRight className={`w-6 h-6 ${phase === 0 ? 'text-orange-400' : 'text-emerald-400 rotate-180'}`} />
          </motion.div>
          <span className="text-[10px] text-slate-500 font-mono">{current.path}</span>
        </div>

        {/* Server */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-orange-500/40 flex items-center justify-center">
            <Shield className="w-6 h-6 text-orange-300" />
          </div>
          <span className="text-xs text-slate-400">Server</span>
        </div>
      </div>

      {/* Method legend */}
      <div className="flex flex-wrap gap-2 justify-center pt-1">
        {cycles.map((c, i) => (
          <span key={c.method}
            className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-all duration-300 ${i === cycleIdx ? `${c.bg} ${c.border} ${c.color}` : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
            {c.method}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Status Code Diagram ──────────────────────────────────────────────────────

const StatusCodeDiagram = ({ tx }) => {
  const [active, setActive] = useState(0);

  const categories = [
    { range: '1xx', label: tx('Informacional', 'Informational'), color: 'bg-slate-500', text: 'text-slate-200', border: 'border-slate-500/40', examples: ['100 Continue', '101 Switching'] },
    { range: '2xx', label: tx('Éxito', 'Success'),              color: 'bg-emerald-500', text: 'text-emerald-200', border: 'border-emerald-500/40', examples: ['200 OK', '201 Created', '204 No Content'] },
    { range: '3xx', label: tx('Redirección', 'Redirect'),       color: 'bg-blue-500',    text: 'text-blue-200',    border: 'border-blue-500/40',    examples: ['301 Moved', '302 Found', '304 Not Modified'] },
    { range: '4xx', label: tx('Error cliente', 'Client Error'),  color: 'bg-amber-500',   text: 'text-amber-200',   border: 'border-amber-500/40',   examples: ['400 Bad Request', '401 Unauthorized', '403 Forbidden', '404 Not Found', '409 Conflict', '422 Unprocessable'] },
    { range: '5xx', label: tx('Error servidor', 'Server Error'), color: 'bg-red-500',     text: 'text-red-200',     border: 'border-red-500/40',     examples: ['500 Internal Server Error', '502 Bad Gateway', '503 Service Unavailable'] },
  ];

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % categories.length), 1500);
    return () => clearInterval(id);
  }, [categories.length]);

  const cur = categories[active];

  return (
    <div className="bg-slate-950/40 border border-orange-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-orange-300 uppercase tracking-wider">
        {tx('Categorías de códigos HTTP', 'HTTP status code categories')}
      </p>
      <div className="flex gap-1.5 justify-center">
        {categories.map((cat, i) => (
          <motion.div key={cat.range}
            animate={{ scale: i === active ? 1.08 : 1, opacity: i === active ? 1 : 0.45 }}
            transition={{ duration: 0.3 }}
            className={`flex-1 h-10 rounded-lg ${cat.color} flex items-center justify-center cursor-pointer`}
            onClick={() => setActive(i)}>
            <span className="text-xs font-bold text-white">{cat.range}</span>
          </motion.div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className={`border rounded-xl p-3 space-y-2 ${cur.border} bg-slate-900/50`}>
          <p className={`text-sm font-bold ${cur.text}`}>{cur.range} — {cur.label}</p>
          <div className="flex flex-wrap gap-1.5">
            {cur.examples.map(ex => (
              <span key={ex} className={`text-[10px] font-mono px-2 py-0.5 rounded border ${cur.border} ${cur.text} bg-slate-800/50`}>{ex}</span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ─── Versioning Diagram ───────────────────────────────────────────────────────

const VersioningDiagram = ({ tx }) => {
  const [active, setActive] = useState(0);

  const strategies = [
    {
      name: tx('URL Path', 'URL Path'),
      example: '/api/v1/users',
      pros: [tx('Fácil de ver en logs', 'Easy to see in logs'), tx('Compatible con cachés', 'Cache-friendly'), tx('Más usada en la industria', 'Most used in industry')],
      cons: [tx('Rompe la pureza REST', 'Breaks REST purity'), tx('URLs más largas', 'Longer URLs')],
      color: 'text-emerald-300', border: 'border-emerald-500/30', bg: 'bg-emerald-500/5',
    },
    {
      name: tx('Header', 'Header'),
      example: 'Accept-Version: v2',
      pros: [tx('URLs limpias', 'Clean URLs'), tx('Flexible y estándar', 'Flexible and standard')],
      cons: [tx('Invisible en el navegador', 'Invisible in browser'), tx('Difícil de probar manualmente', 'Hard to test manually')],
      color: 'text-blue-300', border: 'border-blue-500/30', bg: 'bg-blue-500/5',
    },
    {
      name: tx('Query Param', 'Query Param'),
      example: '/users?version=2',
      pros: [tx('Fácil de probar', 'Easy to test'), tx('Sin cambios en la ruta', 'No route changes')],
      cons: [tx('Se puede olvidar incluir', 'Can be forgotten'), tx('Mala semántica', 'Poor semantics')],
      color: 'text-amber-300', border: 'border-amber-500/30', bg: 'bg-amber-500/5',
    },
  ];

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % strategies.length), 2000);
    return () => clearInterval(id);
  }, [strategies.length]);

  const cur = strategies[active];

  return (
    <div className="bg-slate-950/40 border border-orange-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-orange-300 uppercase tracking-wider">
        {tx('Estrategias de versionado', 'Versioning strategies')}
      </p>
      <div className="flex gap-2 justify-center">
        {strategies.map((s, i) => (
          <button key={s.name} onClick={() => setActive(i)}
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-300 border ${i === active ? `${s.bg} ${s.border} ${s.color}` : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
            {s.name}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className={`border rounded-xl p-3 space-y-2 ${cur.border} ${cur.bg}`}>
          <code className={`text-sm font-mono font-bold ${cur.color}`}>{cur.example}</code>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <p className="text-[10px] font-bold text-emerald-400 mb-1">{tx('Ventajas', 'Pros')}</p>
              {cur.pros.map(p => <p key={p} className="text-[10px] text-slate-300 flex gap-1"><span className="text-emerald-400">✓</span>{p}</p>)}
            </div>
            <div>
              <p className="text-[10px] font-bold text-red-400 mb-1">{tx('Desventajas', 'Cons')}</p>
              {cur.cons.map(c => <p key={c} className="text-[10px] text-slate-300 flex gap-1"><span className="text-red-400">✗</span>{c}</p>)}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ─── Auth Flow Diagram ────────────────────────────────────────────────────────

const AuthFlowDiagram = ({ tx }) => {
  const [step, setStep] = useState(0);

  const steps = [
    { label: tx('Login request', 'Login request'),      detail: 'POST /auth/login',          color: 'border-orange-500/50 bg-orange-500/10 text-orange-300' },
    { label: tx('Servidor valida', 'Server validates'), detail: tx('bcrypt.compare()', 'bcrypt.compare()'), color: 'border-amber-500/50 bg-amber-500/10 text-amber-300' },
    { label: tx('Emite JWT', 'Issues JWT'),             detail: 'jwt.sign({ userId })',       color: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-300' },
    { label: tx('Cliente almacena', 'Client stores'),   detail: 'httpOnly cookie / memory',   color: 'border-blue-500/50 bg-blue-500/10 text-blue-300' },
    { label: tx('Request autenticado', 'Auth request'), detail: 'Authorization: Bearer <jwt>', color: 'border-violet-500/50 bg-violet-500/10 text-violet-300' },
    { label: tx('Recurso protegido', 'Protected resource'), detail: '200 OK { data }',        color: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300' },
  ];

  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % steps.length), 1000);
    return () => clearInterval(id);
  }, [steps.length]);

  return (
    <div className="bg-slate-950/40 border border-orange-500/20 rounded-xl p-4 space-y-2">
      <p className="text-center text-xs font-semibold text-orange-300 uppercase tracking-wider">
        {tx('Flujo de autenticación JWT', 'JWT authentication flow')}
      </p>
      <div className="space-y-1.5">
        {steps.map((s, i) => (
          <motion.div key={s.label}
            animate={{ opacity: i <= step ? 1 : 0.25, scale: i === step ? 1.02 : 1 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs ${i <= step ? s.color : 'border-slate-700 bg-slate-800/30 text-slate-500'}`}>
            <span className="w-4 h-4 rounded-full bg-current opacity-30 flex-shrink-0 text-center text-[10px] leading-4 font-bold">{i + 1}</span>
            <span className="font-semibold">{s.label}</span>
            <span className="ml-auto font-mono text-[10px] opacity-70">{s.detail}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ─── Pagination Diagram ───────────────────────────────────────────────────────

const PaginationDiagram = ({ tx }) => {
  const [mode, setMode] = useState(0); // 0=offset, 1=cursor
  const [page, setPage] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPage(p => {
        if (p >= 3) { setMode(m => (m + 1) % 2); return 0; }
        return p + 1;
      });
    }, 900);
    return () => clearInterval(id);
  }, []);

  const offsetItems = ['row 1', 'row 2', 'row 3', 'row 4', 'row 5', 'row 6'];
  const cursorItems = [{ id: 'cur_a1b', data: 'Alice' }, { id: 'cur_b2c', data: 'Bob' }, { id: 'cur_c3d', data: 'Carol' }, { id: 'cur_d4e', data: 'Dave' }];

  return (
    <div className="bg-slate-950/40 border border-orange-500/20 rounded-xl p-4 space-y-3">
      <div className="flex justify-center gap-2">
        {[tx('Offset', 'Offset'), tx('Cursor', 'Cursor')].map((label, i) => (
          <button key={label} onClick={() => { setMode(i); setPage(0); }}
            className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${i === mode ? 'border-orange-500/50 bg-orange-500/10 text-orange-300' : 'border-slate-700 bg-slate-800 text-slate-500'}`}>
            {label}
          </button>
        ))}
      </div>

      {mode === 0 ? (
        <div className="space-y-1.5">
          <p className="text-center text-[10px] text-slate-400 font-mono">LIMIT 2 OFFSET {page * 2}</p>
          {offsetItems.map((item, i) => {
            const inPage = i >= page * 2 && i < page * 2 + 2;
            return (
              <motion.div key={item} animate={{ opacity: inPage ? 1 : 0.3, backgroundColor: inPage ? 'rgba(249,115,22,0.12)' : 'rgba(30,41,59,0.5)' }}
                className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-mono text-slate-300 flex justify-between">
                <span>{item}</span>
                {inPage && <span className="text-orange-400 text-[10px]">← {tx('página', 'page')} {page + 1}</span>}
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-1.5">
          <p className="text-center text-[10px] text-slate-400 font-mono">after_cursor: {page > 0 ? cursorItems[page - 1].id : tx('inicio', 'start')}</p>
          {cursorItems.map((item, i) => {
            const active = i === page % cursorItems.length;
            return (
              <motion.div key={item.id} animate={{ opacity: active ? 1 : 0.3, backgroundColor: active ? 'rgba(249,115,22,0.12)' : 'rgba(30,41,59,0.5)' }}
                className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-mono text-slate-300 flex justify-between">
                <span>{item.data}</span>
                <span className="text-orange-400 text-[10px]">{item.id}</span>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ─── Rate Limit Diagram ───────────────────────────────────────────────────────

const RateLimitDiagram = ({ tx }) => {
  const [tokens, setTokens] = useState(10);
  const [requests, setRequests] = useState([]);
  const MAX = 10;

  useEffect(() => {
    const id = setInterval(() => {
      setTokens(t => {
        const newT = Math.min(t + 1, MAX);
        return newT;
      });
    }, 600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setTokens(t => {
        if (t >= 2) {
          setRequests(r => [...r.slice(-4), { id: Date.now(), ok: true }]);
          return t - 2;
        } else {
          setRequests(r => [...r.slice(-4), { id: Date.now(), ok: false }]);
          return t;
        }
      });
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-orange-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-orange-300 uppercase tracking-wider">
        {tx('Token Bucket — Rate Limiting', 'Token Bucket — Rate Limiting')}
      </p>
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] text-slate-400 px-1">
          <span>Token Bucket</span><span>{tokens}/{MAX}</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
          <motion.div animate={{ width: `${(tokens / MAX) * 100}%` }} transition={{ duration: 0.3 }}
            className={`h-full rounded-full ${tokens > 5 ? 'bg-emerald-500' : tokens > 2 ? 'bg-amber-500' : 'bg-red-500'}`} />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-[10px] text-slate-400">{tx('Últimas peticiones:', 'Last requests:')}</p>
        <div className="flex gap-1.5 flex-wrap">
          {requests.map(r => (
            <motion.span key={r.id} initial={{ scale: 0 }} animate={{ scale: 1 }}
              className={`text-[10px] px-2 py-0.5 rounded font-bold ${r.ok ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
              {r.ok ? '200 OK' : '429 Too Many'}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Shared helpers ───────────────────────────────────────────────────────────

// ─── HTTP Verbs Diagram ───────────────────────────────────────────────────────

const HTTPVerbsDiagram = ({ tx }) => {
  const [active, setActive] = useState(0);

  const verbs = [
    { method: 'GET',     safe: true,  idempotent: true,  body: false, color: 'text-emerald-300', border: 'border-emerald-500/50', bg: 'bg-emerald-500/10', desc: tx('Lee un recurso sin modificar nada', 'Reads a resource without modifying anything'), example: 'GET /users/42' },
    { method: 'POST',    safe: false, idempotent: false, body: true,  color: 'text-blue-300',    border: 'border-blue-500/50',    bg: 'bg-blue-500/10',    desc: tx('Crea un nuevo recurso o dispara una acción', 'Creates a new resource or triggers an action'), example: 'POST /users' },
    { method: 'PUT',     safe: false, idempotent: true,  body: true,  color: 'text-amber-300',   border: 'border-amber-500/50',   bg: 'bg-amber-500/10',   desc: tx('Reemplaza el recurso completo', 'Replaces the full resource'), example: 'PUT /users/42' },
    { method: 'PATCH',   safe: false, idempotent: false, body: true,  color: 'text-violet-300',  border: 'border-violet-500/50',  bg: 'bg-violet-500/10',  desc: tx('Actualización parcial del recurso', 'Partial update of the resource'), example: 'PATCH /users/42' },
    { method: 'DELETE',  safe: false, idempotent: true,  body: false, color: 'text-red-300',     border: 'border-red-500/50',     bg: 'bg-red-500/10',     desc: tx('Elimina el recurso', 'Deletes the resource'), example: 'DELETE /users/42' },
    { method: 'HEAD',    safe: true,  idempotent: true,  body: false, color: 'text-cyan-300',    border: 'border-cyan-500/50',    bg: 'bg-cyan-500/10',    desc: tx('Como GET pero sin body de respuesta', 'Like GET but without response body'), example: 'HEAD /files/report.pdf' },
    { method: 'OPTIONS', safe: true,  idempotent: true,  body: false, color: 'text-pink-300',    border: 'border-pink-500/50',    bg: 'bg-pink-500/10',    desc: tx('Preflight CORS y métodos permitidos', 'CORS preflight and allowed methods'), example: 'OPTIONS /users' },
  ];

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % verbs.length), 1800);
    return () => clearInterval(id);
  }, [verbs.length]);

  const cur = verbs[active];

  const Badge = ({ label, ok }) => (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${ok ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' : 'border-red-500/40 bg-red-500/10 text-red-400'}`}>
      {ok ? '✓' : '✗'} {label}
    </span>
  );

  return (
    <div className="bg-slate-950/40 border border-orange-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-orange-300 uppercase tracking-wider">
        {tx('Métodos HTTP — propiedades y uso', 'HTTP Methods — properties and usage')}
      </p>

      {/* Verb pills */}
      <div className="flex flex-wrap gap-1.5 justify-center">
        {verbs.map((v, i) => (
          <button key={v.method} onClick={() => setActive(i)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all duration-200 ${i === active ? `${v.bg} ${v.border} ${v.color}` : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-300'}`}>
            {v.method}
          </button>
        ))}
      </div>

      {/* Active verb detail */}
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className={`border rounded-xl p-3 space-y-2.5 ${cur.border} ${cur.bg}`}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className={`text-lg font-black font-mono ${cur.color}`}>{cur.method}</span>
            <div className="flex gap-1.5 flex-wrap">
              <Badge label={tx('Seguro', 'Safe')} ok={cur.safe} />
              <Badge label={tx('Idempotente', 'Idempotent')} ok={cur.idempotent} />
              <Badge label={tx('Body', 'Body')} ok={cur.body} />
            </div>
          </div>
          <p className="text-xs text-slate-300">{cur.desc}</p>
          <code className="block text-xs font-mono text-slate-400 bg-slate-900/60 rounded px-2 py-1">{cur.example}</code>
        </motion.div>
      </AnimatePresence>

      {/* Properties legend */}
      <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-400">
        <div><span className="text-emerald-400 font-bold">{tx('Seguro:', 'Safe:')}</span>{tx(' no modifica estado', ' does not modify state')}</div>
        <div><span className="text-emerald-400 font-bold">{tx('Idempotente:', 'Idempotent:')}</span>{tx(' repetir = mismo resultado', ' repeat = same result')}</div>
        <div><span className="text-emerald-400 font-bold">{tx('Body:', 'Body:')}</span>{tx(' acepta cuerpo en el request', ' accepts body in request')}</div>
      </div>
    </div>
  );
};

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-1">
    <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">{title}</h2>
    <p className="text-slate-400 text-sm">{subtitle}</p>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function APIDesignPro() {
  const { language } = useLanguage();
  const tx = (es, en) => language === 'en' ? en : es;

  const [active, setActive] = useState('rest');
  const [openQ, setOpenQ] = useState(null);

  const sections = [
    { id: 'rest',      title: 'REST',               subtitle: tx('Principios, recursos e idempotencia', 'Principles, resources & idempotency') },
    { id: 'verbs',     title: tx('Verbos HTTP', 'HTTP Verbs'), subtitle: tx('GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS') },
    { id: 'http',      title: 'HTTP',                subtitle: tx('Códigos de estado y cabeceras', 'Status codes & headers') },
    { id: 'versioning',title: tx('Versionado', 'Versioning'), subtitle: tx('URL, header y query param', 'URL, header & query param') },
    { id: 'auth',      title: tx('Autenticación', 'Authentication'), subtitle: tx('JWT, OAuth2 y refresh tokens', 'JWT, OAuth2 & refresh tokens') },
    { id: 'pagination',title: tx('Paginación', 'Pagination'),  subtitle: tx('Offset vs cursor, filtros y orden', 'Offset vs cursor, filters & sorting') },
    { id: 'ratelimit', title: tx('Rate Limiting', 'Rate Limiting'), subtitle: tx('Token bucket, caché y compresión', 'Token bucket, caching & compression') },
    { id: 'interview', title: 'Interview',           subtitle: tx('Preguntas Junior / Mid / Senior', 'Junior / Mid / Senior questions') },
  ];

  // ─── HTTP Verbs ───────────────────────────────────────────────────────────

  const renderVerbs = () => (
    <div className="space-y-6">
      <SectionTitle title={tx('Verbos HTTP', 'HTTP Verbs')}
        subtitle={tx('Cada método tiene semántica precisa: seguridad, idempotencia y propósito. Usarlos correctamente es la base de una API REST limpia.', 'Each method has precise semantics: safety, idempotency and purpose. Using them correctly is the foundation of a clean REST API.')} />
      <HTTPVerbsDiagram tx={tx} />

      {/* Verb deep-dives */}
      <div className="space-y-3">
        {[
          {
            method: 'GET',
            color: 'text-emerald-300', border: 'border-emerald-500/30', bg: 'bg-emerald-500/5',
            badge: tx('Seguro · Idempotente · Sin body', 'Safe · Idempotent · No body'),
            points: [
              tx('Recupera un recurso sin efectos secundarios. El servidor nunca cambia estado.', 'Retrieves a resource with no side effects. The server never changes state.'),
              tx('Se puede cachear: Cache-Control, ETag, CDN.', 'Can be cached: Cache-Control, ETag, CDN.'),
              tx('Parámetros en la query string: GET /users?role=admin&page=2', 'Parameters in the query string: GET /users?role=admin&page=2'),
              tx('Nunca uses GET para operaciones que modifiquen datos.', 'Never use GET for operations that modify data.'),
            ],
            cases: [
              tx('Listar recursos: GET /products', 'List resources: GET /products'),
              tx('Obtener uno: GET /products/42', 'Get one: GET /products/42'),
              tx('Buscar: GET /products?q=laptop&sort=price:asc', 'Search: GET /products?q=laptop&sort=price:asc'),
              tx('Recursos anidados: GET /users/5/orders', 'Nested resources: GET /users/5/orders'),
            ],
          },
          {
            method: 'POST',
            color: 'text-blue-300', border: 'border-blue-500/30', bg: 'bg-blue-500/5',
            badge: tx('No seguro · No idempotente · Con body', 'Not safe · Not idempotent · Has body'),
            points: [
              tx('Crea un recurso nuevo o dispara una acción no idempotente.', 'Creates a new resource or triggers a non-idempotent action.'),
              tx('El servidor decide el ID del recurso creado y lo devuelve en Location.', 'The server decides the created resource ID and returns it in Location.'),
              tx('Respuesta: 201 Created + Location: /users/99 + body del recurso.', 'Response: 201 Created + Location: /users/99 + resource body.'),
              tx('Dos POST iguales crean dos recursos distintos (no idempotente).', 'Two identical POSTs create two different resources (not idempotent).'),
            ],
            cases: [
              tx('Crear usuario: POST /users { name, email }', 'Create user: POST /users { name, email }'),
              tx('Autenticar: POST /auth/login { email, password }', 'Authenticate: POST /auth/login { email, password }'),
              tx('Acción de dominio: POST /orders/42/cancel', 'Domain action: POST /orders/42/cancel'),
              tx('Subir archivo: POST /uploads (multipart/form-data)', 'Upload file: POST /uploads (multipart/form-data)'),
            ],
          },
          {
            method: 'PUT',
            color: 'text-amber-300', border: 'border-amber-500/30', bg: 'bg-amber-500/5',
            badge: tx('No seguro · Idempotente · Con body', 'Not safe · Idempotent · Has body'),
            points: [
              tx('Reemplaza el recurso completo. Envías todos los campos, incluso los que no cambian.', 'Replaces the full resource. You send all fields, even unchanged ones.'),
              tx('Si el recurso no existe, algunos servidores lo crean (upsert). Define tu política.', 'If resource does not exist, some servers create it (upsert). Define your policy.'),
              tx('Idempotente: PUT /users/42 con el mismo body siempre produce el mismo estado.', 'Idempotent: PUT /users/42 with the same body always produces the same state.'),
              tx('❌ No uses PUT para actualizaciones parciales — usa PATCH.', '❌ Do not use PUT for partial updates — use PATCH.'),
            ],
            cases: [
              tx('Reemplazar perfil: PUT /users/42 { name, email, age, role }', 'Replace profile: PUT /users/42 { name, email, age, role }'),
              tx('Configuración completa: PUT /settings/theme { mode, colors, font }', 'Full config: PUT /settings/theme { mode, colors, font }'),
              tx('Upsert por clave natural: PUT /inventory/SKU-001 { qty: 50 }', 'Upsert by natural key: PUT /inventory/SKU-001 { qty: 50 }'),
            ],
          },
          {
            method: 'PATCH',
            color: 'text-violet-300', border: 'border-violet-500/30', bg: 'bg-violet-500/5',
            badge: tx('No seguro · Generalmente no idempotente · Con body', 'Not safe · Generally not idempotent · Has body'),
            points: [
              tx('Actualización parcial: envías solo los campos que cambian.', 'Partial update: you send only the fields that change.'),
              tx('Más eficiente que PUT en APIs con objetos grandes.', 'More efficient than PUT in APIs with large objects.'),
              tx('Puede ser idempotente si el body es un conjunto de valores absolutos (no operaciones incrementales).', 'Can be idempotent if body is a set of absolute values (not incremental operations).'),
              tx('JSON Patch (RFC 6902): operaciones tipadas — add, remove, replace, move, copy, test.', 'JSON Patch (RFC 6902): typed operations — add, remove, replace, move, copy, test.'),
            ],
            cases: [
              tx('Cambiar email: PATCH /users/42 { email: "new@example.com" }', 'Change email: PATCH /users/42 { email: "new@example.com" }'),
              tx('Activar feature: PATCH /users/42 { isActive: true }', 'Toggle feature: PATCH /users/42 { isActive: true }'),
              tx('JSON Patch: PATCH /doc [{ op: "replace", path: "/title", value: "New Title" }]', 'JSON Patch: PATCH /doc [{ op: "replace", path: "/title", value: "New Title" }]'),
            ],
          },
          {
            method: 'DELETE',
            color: 'text-red-300', border: 'border-red-500/30', bg: 'bg-red-500/5',
            badge: tx('No seguro · Idempotente · Sin body', 'Not safe · Idempotent · No body'),
            points: [
              tx('Elimina el recurso identificado por la URI.', 'Deletes the resource identified by the URI.'),
              tx('Idempotente: llamar DELETE /users/42 cuando ya fue eliminado devuelve 404 o 204 — el estado es el mismo (no existe).', 'Idempotent: calling DELETE /users/42 when already deleted returns 404 or 204 — state is the same (non-existent).'),
              tx('Respuesta: 204 No Content (más común) o 200 OK con el recurso eliminado.', 'Response: 204 No Content (most common) or 200 OK with the deleted resource.'),
              tx('Soft delete: no borres el registro — añade deletedAt y filtra en queries. DELETE sigue siendo el verbo correcto.', 'Soft delete: do not delete the record — add deletedAt and filter in queries. DELETE is still the correct verb.'),
            ],
            cases: [
              tx('Eliminar usuario: DELETE /users/42', 'Delete user: DELETE /users/42'),
              tx('Desconectar relación: DELETE /users/42/roles/admin', 'Disconnect relation: DELETE /users/42/roles/admin'),
              tx('Borrar lote (body opcional): DELETE /products con [ "id1", "id2" ]', 'Bulk delete (optional body): DELETE /products with [ "id1", "id2" ]'),
            ],
          },
          {
            method: 'HEAD',
            color: 'text-cyan-300', border: 'border-cyan-500/30', bg: 'bg-cyan-500/5',
            badge: tx('Seguro · Idempotente · Sin body de respuesta', 'Safe · Idempotent · No response body'),
            points: [
              tx('Idéntico a GET pero el servidor no devuelve body. Solo headers.', 'Identical to GET but server returns no body. Headers only.'),
              tx('Útil para comprobar si un recurso existe sin descargarlo.', 'Useful to check if a resource exists without downloading it.'),
              tx('Verifica metadatos: tamaño (Content-Length), tipo (Content-Type), última modificación.', 'Checks metadata: size (Content-Length), type (Content-Type), last modified.'),
              tx('Los navegadores lo usan para verificar cachés antes de descargar.', 'Browsers use it to validate caches before downloading.'),
            ],
            cases: [
              tx('Comprobar si un archivo existe: HEAD /files/report.pdf', 'Check if file exists: HEAD /files/report.pdf'),
              tx('Obtener tamaño antes de descargar: Content-Length en la respuesta', 'Get size before download: Content-Length in response'),
              tx('Validar caché: HEAD + If-None-Match: "etag" → 304 si no cambió', 'Validate cache: HEAD + If-None-Match: "etag" → 304 if unchanged'),
            ],
          },
          {
            method: 'OPTIONS',
            color: 'text-pink-300', border: 'border-pink-500/30', bg: 'bg-pink-500/5',
            badge: tx('Seguro · Idempotente · Sin body', 'Safe · Idempotent · No body'),
            points: [
              tx('Devuelve los métodos HTTP permitidos en una URI (header Allow: GET, POST, PUT).', 'Returns the HTTP methods allowed on a URI (Allow: GET, POST, PUT header).'),
              tx('El navegador lo envía automáticamente como preflight CORS antes de requests cross-origin.', 'Browser sends it automatically as CORS preflight before cross-origin requests.'),
              tx('El servidor responde con Access-Control-Allow-* para autorizar el request real.', 'Server responds with Access-Control-Allow-* to authorize the actual request.'),
              tx('Si el preflight falla (CORS mal configurado), el request real nunca se envía.', 'If preflight fails (bad CORS config), the actual request is never sent.'),
            ],
            cases: [
              tx('Preflight automático: OPTIONS /api/users — antes de POST cross-origin', 'Automatic preflight: OPTIONS /api/users — before cross-origin POST'),
              tx('Descubrir métodos: OPTIONS /products → Allow: GET, POST', 'Discover methods: OPTIONS /products → Allow: GET, POST'),
              tx('APIs de descubrimiento: describir capacidades del endpoint', 'Discovery APIs: describe endpoint capabilities'),
            ],
          },
        ].map((verb, i) => (
          <motion.div key={verb.method} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`border rounded-xl p-4 space-y-3 ${verb.border} ${verb.bg}`}>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className={`text-base font-black font-mono ${verb.color}`}>{verb.method}</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${verb.border} ${verb.color}`}>{verb.badge}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{tx('Comportamiento', 'Behavior')}</p>
                <ul className="space-y-1">
                  {verb.points.map((p, j) => (
                    <li key={j} className="flex items-start gap-1.5 text-xs text-slate-300">
                      <ArrowRight className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />{p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{tx('Cuándo usarlo', 'When to use it')}</p>
                <ul className="space-y-1">
                  {verb.cases.map((c, j) => (
                    <li key={j} className="flex items-start gap-1.5 text-xs text-slate-300 font-mono">
                      <span className={`text-xs flex-shrink-0 ${verb.color}`}>→</span>{c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <CodeBlock language="typescript" code={`// ─── GET — leer sin efectos secundarios ──────────────────────────────────────
// GET /users?role=admin&sort=name:asc&limit=20
router.get('/users', authenticate, async (req, res) => {
  const users = await userService.list(req.query);
  return res.status(200).json({ data: users, meta: { total: users.length } });
});

// ─── POST — crear recurso ─────────────────────────────────────────────────────
// POST /users  →  201 Created + Location: /users/99
router.post('/users', authenticate, validate(createUserSchema), async (req, res) => {
  const user = await userService.create(req.body);
  return res.status(201)
    .header('Location', \`/users/\${user.id}\`)
    .json({ data: user });
});

// ─── PUT — reemplazar completo ────────────────────────────────────────────────
// PUT /users/42  →  envías TODOS los campos
router.put('/users/:id', authenticate, validate(fullUserSchema), async (req, res) => {
  const user = await userService.replace(req.params.id, req.body);
  return res.status(200).json({ data: user });
});

// ─── PATCH — actualización parcial ───────────────────────────────────────────
// PATCH /users/42  →  solo los campos que cambian
router.patch('/users/:id', authenticate, validate(partialUserSchema), async (req, res) => {
  const user = await userService.update(req.params.id, req.body);
  return res.status(200).json({ data: user });
});

// ─── DELETE — eliminar ────────────────────────────────────────────────────────
// DELETE /users/42  →  204 No Content
router.delete('/users/:id', authenticate, async (req, res) => {
  await userService.delete(req.params.id); // soft-delete internamente
  return res.status(204).send();
});

// ─── HEAD — verificar existencia sin body ─────────────────────────────────────
// HEAD /files/report.pdf  →  headers sin body
router.head('/files/:name', async (req, res) => {
  const file = await fileService.findByName(req.params.name);
  if (!file) return res.status(404).send();
  return res
    .status(200)
    .header('Content-Length', String(file.sizeBytes))
    .header('Content-Type', file.mimeType)
    .header('Last-Modified', file.updatedAt.toUTCString())
    .send(); // sin body
});

// ─── OPTIONS — preflight CORS ─────────────────────────────────────────────────
// El navegador lo envía automáticamente; Express + cors() lo gestiona:
import cors from 'cors';
app.use(cors({
  origin: ['https://app.example.com'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400, // cachea el preflight 24h
}));`} />
    </div>
  );

  // ─── REST ─────────────────────────────────────────────────────────────────

  const renderRest = () => (
    <div className="space-y-6">
      <SectionTitle title={tx('Principios REST', 'REST Principles')}
        subtitle={tx('REST es un estilo arquitectónico de 6 restricciones. Bien aplicado produce APIs predecibles y escalables.', 'REST is a 6-constraint architectural style. Properly applied it produces predictable, scalable APIs.')} />
      <RESTDiagram tx={tx} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { title: tx('6 Restricciones REST', '6 REST Constraints'), color: 'text-orange-300', border: 'border-orange-500/30 bg-orange-500/5',
            items: [
              tx('1. Cliente-Servidor: separación de responsabilidades', '1. Client-Server: separation of concerns'),
              tx('2. Sin estado (stateless): cada request lleva toda la info', '2. Stateless: each request carries all info'),
              tx('3. Cacheable: respuestas deben indicar si se pueden cachear', '3. Cacheable: responses must indicate if cacheable'),
              tx('4. Interfaz uniforme: recursos con URIs, representaciones estándar', '4. Uniform Interface: resources with URIs, standard representations'),
            ]},
          { title: tx('Naming de recursos', 'Resource Naming'), color: 'text-amber-300', border: 'border-amber-500/30 bg-amber-500/5',
            items: [
              tx('Sustantivos en plural: /users, /orders, /products', 'Plural nouns: /users, /orders, /products'),
              tx('Nunca verbos en la URL: ❌ /getUser, ✅ GET /users/:id', 'Never verbs in URL: ❌ /getUser, ✅ GET /users/:id'),
              tx('Recursos anidados para relaciones: /users/:id/orders', 'Nested resources for relations: /users/:id/orders'),
              tx('Minúsculas con guiones: /product-categories, no camelCase', 'Lowercase with hyphens: /product-categories, not camelCase'),
            ]},
          { title: tx('Idempotencia', 'Idempotency'), color: 'text-yellow-300', border: 'border-yellow-500/30 bg-yellow-500/5',
            items: [
              tx('GET: idempotente y seguro — nunca modifica estado', 'GET: idempotent and safe — never modifies state'),
              tx('PUT: idempotente — mismo resultado al repetir', 'PUT: idempotent — same result when repeated'),
              tx('DELETE: idempotente — el recurso sigue sin existir', 'DELETE: idempotent — resource remains non-existent'),
              tx('POST: NO idempotente — cada llamada crea algo nuevo', 'POST: NOT idempotent — each call creates something new'),
            ]},
          { title: tx('Respuesta uniforme', 'Uniform Response'), color: 'text-emerald-300', border: 'border-emerald-500/30 bg-emerald-500/5',
            items: [
              tx('Estructura consistente: { data, error, meta, links }', 'Consistent structure: { data, error, meta, links }'),
              tx('Errores con código interno + mensaje: { code, message, details }', 'Errors with internal code + message: { code, message, details }'),
              tx('HATEOAS: incluye links a acciones relacionadas', 'HATEOAS: include links to related actions'),
              tx('Content-Type: application/json en todas las respuestas', 'Content-Type: application/json in all responses'),
            ]},
        ].map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className={`border rounded-xl p-4 ${card.border}`}>
            <p className={`font-bold text-sm mb-2 ${card.color}`}>{card.title}</p>
            <ul className="space-y-1.5">
              {card.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-xs text-slate-300">
                  <ArrowRight className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />{item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <CodeBlock language="typescript" code={`// ✅ Diseño REST bien estructurado con Express + TypeScript
import express, { Request, Response } from 'express';

const router = express.Router();

// GET /users          → listar con paginación
// GET /users/:id      → obtener uno
// POST /users         → crear
// PUT /users/:id      → reemplazar completo
// PATCH /users/:id    → actualización parcial
// DELETE /users/:id   → eliminar

// Respuesta uniforme
interface ApiResponse<T> {
  data?: T;
  error?: { code: string; message: string; details?: unknown };
  meta?: { total: number; page: number; limit: number };
}

// GET /users/:id
router.get('/users/:id', async (req: Request, res: Response) => {
  const user = await userService.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      error: { code: 'USER_NOT_FOUND', message: \`User \${req.params.id} not found\` }
    } satisfies ApiResponse<never>);
  }
  return res.status(200).json({ data: user } satisfies ApiResponse<User>);
});

// POST /users
router.post('/users', async (req: Request, res: Response) => {
  const user = await userService.create(req.body);
  return res.status(201)
    .header('Location', \`/users/\${user.id}\`)
    .json({ data: user });
});

// DELETE /users/:id  — idempotente
router.delete('/users/:id', async (req: Request, res: Response) => {
  await userService.delete(req.params.id);  // no falla si no existe
  return res.status(204).send();
});`} />
    </div>
  );

  // ─── HTTP ─────────────────────────────────────────────────────────────────

  const renderHttp = () => (
    <div className="space-y-6">
      <SectionTitle title={tx('HTTP: Códigos y Cabeceras', 'HTTP: Status Codes & Headers')}
        subtitle={tx('El protocolo HTTP tiene semántica precisa. Usarla correctamente hace tu API predecible.', 'HTTP protocol has precise semantics. Using it correctly makes your API predictable.')} />
      <StatusCodeDiagram tx={tx} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { title: tx('Códigos 2xx más usados', 'Most used 2xx codes'), color: 'text-emerald-300', border: 'border-emerald-500/30 bg-emerald-500/5',
            items: ['200 OK — GET/PUT/PATCH exitoso', '201 Created — POST crea recurso', '204 No Content — DELETE exitoso', '206 Partial Content — streaming / ranges'] },
          { title: tx('Códigos 4xx importantes', 'Important 4xx codes'), color: 'text-amber-300', border: 'border-amber-500/30 bg-amber-500/5',
            items: ['400 Bad Request — validación fallida', '401 Unauthorized — sin autenticación', '403 Forbidden — sin permisos', '404 Not Found — recurso no existe', '409 Conflict — estado conflictivo', '422 Unprocessable Entity — lógica de negocio'] },
          { title: tx('Cabeceras de caché', 'Cache headers'), color: 'text-blue-300', border: 'border-blue-500/30 bg-blue-500/5',
            items: ['Cache-Control: max-age=3600, s-maxage=86400', 'ETag: "v1.abc123" (hash del contenido)', 'Last-Modified: para recursos estáticos', 'Vary: Authorization (cachés por usuario)'] },
          { title: 'CORS & Seguridad', color: 'text-red-300', border: 'border-red-500/30 bg-red-500/5',
            items: ['Access-Control-Allow-Origin: dominio específico', 'Access-Control-Allow-Methods: GET,POST,PUT', 'X-Content-Type-Options: nosniff', 'Strict-Transport-Security: max-age=31536000'] },
        ].map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className={`border rounded-xl p-4 ${card.border}`}>
            <p className={`font-bold text-sm mb-2 ${card.color}`}>{card.title}</p>
            <ul className="space-y-1.5">
              {card.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-xs text-slate-300">
                  <ArrowRight className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />{item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <CodeBlock language="typescript" code={`// Middleware de cabeceras de seguridad + caché
import { Request, Response, NextFunction } from 'express';

export function cacheMiddleware(maxAge: number) {
  return (_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Cache-Control', \`public, max-age=\${maxAge}, s-maxage=\${maxAge * 10}\`);
    next();
  };
}

// ETag para invalidación inteligente
router.get('/products/:id', async (req, res) => {
  const product = await productService.findById(req.params.id);
  if (!product) return res.status(404).json({ error: { code: 'NOT_FOUND' } });

  const etag = \`"\${hashContent(product)}"\`;
  res.setHeader('ETag', etag);

  if (req.headers['if-none-match'] === etag) {
    return res.status(304).send(); // ← cliente ya tiene la versión correcta
  }

  return res.status(200).json({ data: product });
});

// Respuesta de error uniforme
function sendError(res: Response, status: number, code: string, message: string) {
  return res.status(status).json({
    error: { code, message, timestamp: new Date().toISOString() }
  });
}
// Uso: sendError(res, 409, 'EMAIL_TAKEN', 'This email is already registered');`} />
    </div>
  );

  // ─── Versioning ───────────────────────────────────────────────────────────

  const renderVersioning = () => (
    <div className="space-y-6">
      <SectionTitle title={tx('Versionado de APIs', 'API Versioning')}
        subtitle={tx('Las APIs evolucionan. Una buena estrategia de versionado evita romper a tus consumidores.', 'APIs evolve. A good versioning strategy avoids breaking your consumers.')} />
      <VersioningDiagram tx={tx} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { title: tx('URL Path (recomendado)', 'URL Path (recommended)'), color: 'text-emerald-300', border: 'border-emerald-500/30 bg-emerald-500/5',
            items: [
              tx('/api/v1/users → /api/v2/users', '/api/v1/users → /api/v2/users'),
              tx('Más visible y testeable (curl, browser)', 'More visible and testable (curl, browser)'),
              tx('Compatible con CDN y proxies', 'CDN and proxy compatible'),
              tx('Estándar en Twitter, Stripe, GitHub', 'Standard at Twitter, Stripe, GitHub'),
            ]},
          { title: tx('Cambios breaking vs non-breaking', 'Breaking vs non-breaking changes'), color: 'text-red-300', border: 'border-red-500/30 bg-red-500/5',
            items: [
              tx('✅ Non-breaking: añadir campos opcionales, nuevos endpoints', '✅ Non-breaking: add optional fields, new endpoints'),
              tx('✅ Non-breaking: deprecar (no eliminar) campos', '✅ Non-breaking: deprecate (not remove) fields'),
              tx('❌ Breaking: renombrar/eliminar campos existentes', '❌ Breaking: rename/remove existing fields'),
              tx('❌ Breaking: cambiar tipo de un campo', '❌ Breaking: change a field type'),
            ]},
          { title: tx('Estrategia de deprecación', 'Deprecation strategy'), color: 'text-amber-300', border: 'border-amber-500/30 bg-amber-500/5',
            items: [
              tx('Anuncia deprecación con 6+ meses de antelación', 'Announce deprecation 6+ months in advance'),
              tx('Cabecera Deprecation: fecha de fin de soporte', 'Deprecation header: end-of-support date'),
              tx('Sunset: fecha exacta de apagado', 'Sunset: exact shutdown date'),
              tx('Link: enlace a documentación de migración', 'Link: link to migration docs'),
            ]},
          { title: 'OpenAPI / Swagger', color: 'text-violet-300', border: 'border-violet-500/30 bg-violet-500/5',
            items: [
              tx('openapi: 3.1.0 es el estándar actual', 'openapi: 3.1.0 is the current standard'),
              tx('Genera documentación interactiva con Swagger UI', 'Generates interactive docs with Swagger UI'),
              tx('@nestjs/swagger o express-openapi-validator', '@nestjs/swagger or express-openapi-validator'),
              tx('Contract-first: define el spec antes de implementar', 'Contract-first: define spec before implementing'),
            ]},
        ].map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className={`border rounded-xl p-4 ${card.border}`}>
            <p className={`font-bold text-sm mb-2 ${card.color}`}>{card.title}</p>
            <ul className="space-y-1.5">
              {card.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-xs text-slate-300">
                  <ArrowRight className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />{item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <CodeBlock language="typescript" code={`// Versionado con router separado + middleware de deprecación
import express from 'express';

const v1 = express.Router();
const v2 = express.Router();

// Middleware que avisa deprecación en v1
v1.use((_req, res, next) => {
  res.setHeader('Deprecation', 'true');
  res.setHeader('Sunset', 'Sat, 31 Dec 2026 23:59:59 GMT');
  res.setHeader('Link', '</docs/migration-v2>; rel="successor-version"');
  next();
});

v1.get('/users/:id', userControllerV1.getById);  // respuesta con campo "name"
v2.get('/users/:id', userControllerV2.getById);  // respuesta con "firstName" + "lastName"

app.use('/api/v1', v1);
app.use('/api/v2', v2);

// OpenAPI spec (fragmento)
// openapi: 3.1.0
// info:
//   title: My API
//   version: 2.0.0
// paths:
//   /users/{id}:
//     get:
//       summary: Get user by ID
//       parameters:
//         - name: id
//           in: path
//           required: true
//           schema: { type: string }
//       responses:
//         '200': { description: OK, content: { application/json: { schema: { $ref: '#/components/schemas/User' } } } }`} />
    </div>
  );

  // ─── Auth ─────────────────────────────────────────────────────────────────

  const renderAuth = () => (
    <div className="space-y-6">
      <SectionTitle title={tx('Autenticación & Autorización', 'Authentication & Authorization')}
        subtitle={tx('La autenticación verifica quién eres. La autorización verifica qué puedes hacer.', 'Authentication verifies who you are. Authorization verifies what you can do.')} />
      <AuthFlowDiagram tx={tx} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { title: 'JWT — JSON Web Token', color: 'text-orange-300', border: 'border-orange-500/30 bg-orange-500/5',
            items: [
              tx('Estructura: header.payload.signature (Base64URL)', 'Structure: header.payload.signature (Base64URL)'),
              tx('Stateless: no requiere consulta a la base de datos', 'Stateless: no database lookup required'),
              tx('Expira en minutos (access) / días (refresh)', 'Expires in minutes (access) / days (refresh)'),
              tx('Nunca guardes datos sensibles en el payload', 'Never store sensitive data in payload'),
            ]},
          { title: tx('Refresh Token Rotation', 'Refresh Token Rotation'), color: 'text-amber-300', border: 'border-amber-500/30 bg-amber-500/5',
            items: [
              tx('Access token corto (15 min) — en memoria', 'Short access token (15 min) — in memory'),
              tx('Refresh token largo (7d) — httpOnly cookie', 'Long refresh token (7d) — httpOnly cookie'),
              tx('Al renovar: invalida el refresh anterior', 'On renewal: invalidate previous refresh token'),
              tx('Detecta reutilización → revoca toda la sesión', 'Detect reuse → revoke entire session'),
            ]},
          { title: 'OAuth2 Flows', color: 'text-blue-300', border: 'border-blue-500/30 bg-blue-500/5',
            items: [
              tx('Authorization Code + PKCE: apps públicas (SPA, móvil)', 'Authorization Code + PKCE: public apps (SPA, mobile)'),
              tx('Client Credentials: server-to-server sin usuario', 'Client Credentials: server-to-server without user'),
              tx('Device Code: TVs y dispositivos sin teclado', 'Device Code: TVs and keyboard-less devices'),
              tx('Evita Implicit Flow (deprecado en OAuth2.1)', 'Avoid Implicit Flow (deprecated in OAuth2.1)'),
            ]},
          { title: 'RBAC vs ABAC', color: 'text-violet-300', border: 'border-violet-500/30 bg-violet-500/5',
            items: [
              tx('RBAC: roles (admin, user, moderator) → permisos', 'RBAC: roles (admin, user, moderator) → permissions'),
              tx('ABAC: atributos (dueño, departamento, hora) → decisión', 'ABAC: attributes (owner, department, time) → decision'),
              tx('RBAC: simple y eficiente para la mayoría de apps', 'RBAC: simple and efficient for most apps'),
              tx('ABAC: más flexible, más complejo de implementar', 'ABAC: more flexible, more complex to implement'),
            ]},
        ].map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className={`border rounded-xl p-4 ${card.border}`}>
            <p className={`font-bold text-sm mb-2 ${card.color}`}>{card.title}</p>
            <ul className="space-y-1.5">
              {card.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-xs text-slate-300">
                  <ArrowRight className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />{item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <CodeBlock language="typescript" code={`import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

const ACCESS_SECRET  = process.env.ACCESS_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

// Generar par de tokens
function issueTokens(userId: string) {
  const accessToken = jwt.sign({ sub: userId }, ACCESS_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ sub: userId, jti: uuid() }, REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
}

// Middleware de autenticación
function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: { code: 'UNAUTHORIZED' } });
  try {
    req.user = jwt.verify(token, ACCESS_SECRET) as TokenPayload;
    next();
  } catch {
    return res.status(401).json({ error: { code: 'TOKEN_EXPIRED' } });
  }
}

// Refresh con rotación
router.post('/auth/refresh', async (req, res) => {
  const { refreshToken } = req.cookies;
  const payload = jwt.verify(refreshToken, REFRESH_SECRET) as { sub: string; jti: string };

  const stored = await tokenStore.get(payload.jti);
  if (!stored) {
    await tokenStore.revokeAllForUser(payload.sub); // detectó reutilización
    return res.status(401).json({ error: { code: 'TOKEN_REUSED' } });
  }

  await tokenStore.delete(payload.jti);
  const tokens = issueTokens(payload.sub);
  await tokenStore.save(tokens.refreshToken);

  res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
  return res.json({ accessToken: tokens.accessToken });
});`} />
    </div>
  );

  // ─── Pagination ───────────────────────────────────────────────────────────

  const renderPagination = () => (
    <div className="space-y-6">
      <SectionTitle title={tx('Paginación, Filtros y Ordenación', 'Pagination, Filters & Sorting')}
        subtitle={tx('Las APIs bien diseñadas permiten explorar grandes colecciones de forma eficiente.', 'Well-designed APIs allow efficient exploration of large collections.')} />
      <PaginationDiagram tx={tx} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { title: tx('Offset Pagination', 'Offset Pagination'), color: 'text-orange-300', border: 'border-orange-500/30 bg-orange-500/5',
            items: [
              tx('GET /users?page=3&limit=20', 'GET /users?page=3&limit=20'),
              tx('Simple de implementar y navegar', 'Simple to implement and navigate'),
              tx('❌ Inestable con inserciones concurrentes', '❌ Unstable with concurrent inserts'),
              tx('❌ Escala mal en tablas de millones de filas', '❌ Scales poorly on million-row tables'),
            ]},
          { title: tx('Cursor Pagination (recomendado)', 'Cursor Pagination (recommended)'), color: 'text-emerald-300', border: 'border-emerald-500/30 bg-emerald-500/5',
            items: [
              tx('GET /users?after=cursor_abc&limit=20', 'GET /users?after=cursor_abc&limit=20'),
              tx('Estable con datos que cambian en tiempo real', 'Stable with real-time changing data'),
              tx('O(log n) con índice en la columna de cursor', 'O(log n) with index on cursor column'),
              tx('Ideal para feeds, timelines y tablas grandes', 'Ideal for feeds, timelines and large tables'),
            ]},
          { title: tx('Filtros y proyección', 'Filters & projection'), color: 'text-blue-300', border: 'border-blue-500/30 bg-blue-500/5',
            items: [
              tx('Filtros: ?status=active&role=admin&minAge=18', 'Filters: ?status=active&role=admin&minAge=18'),
              tx('Rango: ?createdAfter=2024-01-01&createdBefore=2024-12-31', 'Range: ?createdAfter=2024-01-01&createdBefore=2024-12-31'),
              tx('Proyección: ?fields=id,name,email (reduce payload)', 'Projection: ?fields=id,name,email (reduces payload)'),
              tx('Buscar: ?q=alice (full-text search opcional)', 'Search: ?q=alice (optional full-text search)'),
            ]},
          { title: tx('Sorting', 'Sorting'), color: 'text-violet-300', border: 'border-violet-500/30 bg-violet-500/5',
            items: [
              tx('?sort=createdAt:desc,name:asc (múltiple)', '?sort=createdAt:desc,name:asc (multiple)'),
              tx('Solo permite ordenar por columnas indexadas', 'Only allow sorting by indexed columns'),
              tx('Incluye sort por defecto en la documentación', 'Include default sort in documentation'),
              tx('Meta en respuesta: { total, page, limit, hasMore }', 'Response meta: { total, page, limit, hasMore }'),
            ]},
        ].map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className={`border rounded-xl p-4 ${card.border}`}>
            <p className={`font-bold text-sm mb-2 ${card.color}`}>{card.title}</p>
            <ul className="space-y-1.5">
              {card.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-xs text-slate-300">
                  <ArrowRight className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />{item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <CodeBlock language="typescript" code={`// Cursor pagination con Prisma
interface PaginationParams {
  after?: string;   // cursor (base64 del ID del último item)
  before?: string;
  limit?: number;
  sort?: string;    // "createdAt:desc"
  status?: string;  // filtro
}

async function paginateUsers(params: PaginationParams) {
  const { after, limit = 20, sort = 'createdAt:desc', status } = params;
  const [sortField, sortDir] = sort.split(':') as [string, 'asc' | 'desc'];

  const cursor = after ? { id: Buffer.from(after, 'base64').toString() } : undefined;

  const users = await prisma.user.findMany({
    where: { ...(status && { status }) },
    orderBy: { [sortField]: sortDir },
    take: limit + 1,       // pedimos uno más para saber si hay siguiente
    skip: cursor ? 1 : 0,
    cursor,
  });

  const hasMore = users.length > limit;
  const items = hasMore ? users.slice(0, -1) : users;
  const nextCursor = hasMore
    ? Buffer.from(items[items.length - 1].id).toString('base64')
    : null;

  return {
    data: items,
    meta: { limit, hasMore, nextCursor }
  };
}
// GET /users?after=Y3Vyc29yXzEyMw==&limit=20&status=active&sort=name:asc`} />
    </div>
  );

  // ─── Rate Limit ───────────────────────────────────────────────────────────

  const renderRateLimit = () => (
    <div className="space-y-6">
      <SectionTitle title={tx('Rate Limiting & Performance', 'Rate Limiting & Performance')}
        subtitle={tx('Protege tu API de abusos y mantén el rendimiento bajo carga con estrategias probadas.', 'Protect your API from abuse and maintain performance under load with proven strategies.')} />
      <RateLimitDiagram tx={tx} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { title: tx('Algoritmos de rate limiting', 'Rate limiting algorithms'), color: 'text-orange-300', border: 'border-orange-500/30 bg-orange-500/5',
            items: [
              tx('Token Bucket: tokens se acumulan, ráfagas permitidas', 'Token Bucket: tokens accumulate, bursts allowed'),
              tx('Leaky Bucket: cola de requests a velocidad constante', 'Leaky Bucket: request queue at constant rate'),
              tx('Fixed Window: contador por ventana de tiempo fija', 'Fixed Window: counter per fixed time window'),
              tx('Sliding Window: ventana deslizante, más preciso', 'Sliding Window: sliding window, more precise'),
            ]},
          { title: tx('Caché HTTP', 'HTTP Caching'), color: 'text-emerald-300', border: 'border-emerald-500/30 bg-emerald-500/5',
            items: [
              tx('Cache-Control: public, max-age=3600 para recursos públicos', 'Cache-Control: public, max-age=3600 for public resources'),
              tx('ETag: hash del contenido, 304 Not Modified si coincide', 'ETag: content hash, 304 Not Modified if matches'),
              tx('CDN (CloudFront, Fastly): caché en el edge', 'CDN (CloudFront, Fastly): edge caching'),
              tx('Redis para caché de consultas costosas (TTL corto)', 'Redis for expensive query caching (short TTL)'),
            ]},
          { title: tx('Compresión & Connection', 'Compression & Connection'), color: 'text-blue-300', border: 'border-blue-500/30 bg-blue-500/5',
            items: [
              tx('gzip / brotli: comprime respuestas JSON (-70% tamaño)', 'gzip / brotli: compress JSON responses (-70% size)'),
              tx('HTTP/2: multiplexing, headers comprimidos, server push', 'HTTP/2: multiplexing, compressed headers, server push'),
              tx('Connection pooling: pg-pool, Prisma connection pool', 'Connection pooling: pg-pool, Prisma connection pool'),
              tx('Keep-Alive: reutiliza conexiones TCP', 'Keep-Alive: reuse TCP connections'),
            ]},
          { title: tx('Headers de rate limit', 'Rate limit headers'), color: 'text-violet-300', border: 'border-violet-500/30 bg-violet-500/5',
            items: [
              'RateLimit-Limit: 1000',
              'RateLimit-Remaining: 42',
              'RateLimit-Reset: 1672531200 (Unix timestamp)',
              tx('429 Too Many Requests con Retry-After: 60', '429 Too Many Requests with Retry-After: 60'),
            ]},
        ].map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className={`border rounded-xl p-4 ${card.border}`}>
            <p className={`font-bold text-sm mb-2 ${card.color}`}>{card.title}</p>
            <ul className="space-y-1.5">
              {card.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-xs text-slate-300">
                  <ArrowRight className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />{item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <CodeBlock language="typescript" code={`import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';
import compression from 'compression';

const redis = new Redis(process.env.REDIS_URL!);

// Rate limiter global con Redis (distribuido)
const limiter = rateLimit({
  windowMs: 60 * 1000,    // 1 minuto
  max: 100,               // 100 req/min por IP
  standardHeaders: 'draft-7',  // RateLimit-* headers
  legacyHeaders: false,
  store: new RedisStore({ sendCommand: (...args) => redis.call(...args) }),
  handler: (_req, res) => res.status(429).json({
    error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many requests, please retry after 1 minute' }
  }),
});

// Rate limiter estricto para auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutos
  max: 10,                     // 10 intentos de login
  skipSuccessfulRequests: true, // no cuenta logins exitosos
});

app.use(compression({ threshold: 1024 }));  // comprime respuestas > 1KB
app.use('/api', limiter);
app.post('/auth/login', authLimiter, authController.login);

// Middleware de caché con Redis
async function cacheResponse(ttl: number) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = \`cache:\${req.url}\`;
    const cached = await redis.get(key);
    if (cached) return res.json(JSON.parse(cached));

    const originalJson = res.json.bind(res);
    res.json = (body) => {
      redis.setex(key, ttl, JSON.stringify(body));
      return originalJson(body);
    };
    next();
  };
}
router.get('/products', cacheResponse(300), productController.list); // caché 5 min`} />
    </div>
  );

  // ─── Interview ────────────────────────────────────────────────────────────

  const interviewQs = {
    junior: [
      { q: tx('¿Cuál es la diferencia entre PUT y PATCH?', 'What is the difference between PUT and PATCH?'),
        a: tx('PUT reemplaza el recurso completo (idempotente). PATCH aplica cambios parciales. Con PUT envías todo el objeto; con PATCH solo los campos que cambian.', 'PUT replaces the full resource (idempotent). PATCH applies partial changes. With PUT you send the entire object; with PATCH only the changed fields.') },
      { q: tx('¿Qué significa que HTTP sea stateless?', 'What does it mean that HTTP is stateless?'),
        a: tx('Cada request es independiente: el servidor no recuerda requests anteriores. El estado debe enviarse en cada request (ej: JWT en Authorization header).', 'Each request is independent: the server does not remember previous requests. State must be sent with each request (e.g. JWT in Authorization header).') },
      { q: tx('¿Qué devuelves cuando creas un recurso?', 'What do you return when creating a resource?'),
        a: tx('201 Created con el Location header apuntando al nuevo recurso (/users/42) y el recurso creado en el body.', '201 Created with the Location header pointing to the new resource (/users/42) and the created resource in the body.') },
      { q: tx('¿Cuándo usar 401 vs 403?', 'When to use 401 vs 403?'),
        a: tx('401 Unauthorized: el usuario no está autenticado (no hay token o es inválido). 403 Forbidden: el usuario está autenticado pero no tiene permisos para ese recurso.', '401 Unauthorized: user is not authenticated (no token or invalid). 403 Forbidden: user is authenticated but lacks permissions for that resource.') },
      { q: tx('¿Qué es CORS?', 'What is CORS?'),
        a: tx('Cross-Origin Resource Sharing: mecanismo del navegador que bloquea requests desde orígenes diferentes. Se configura con headers Access-Control-Allow-Origin en el servidor.', 'Cross-Origin Resource Sharing: browser mechanism that blocks requests from different origins. Configured with Access-Control-Allow-Origin headers on the server.') },
    ],
    mid: [
      { q: tx('¿Cuándo usarías cursor pagination vs offset?', 'When would you use cursor vs offset pagination?'),
        a: tx('Cursor: feeds en tiempo real, tablas grandes (>100k filas), datos que cambian frecuentemente. Offset: listas estáticas donde necesitas navegar a páginas específicas. Cursor es O(log n) con índice; offset es O(n) con LIMIT/OFFSET.', 'Cursor: real-time feeds, large tables (>100k rows), frequently changing data. Offset: static lists where you need to jump to specific pages. Cursor is O(log n) with index; offset is O(n) with LIMIT/OFFSET.') },
      { q: tx('¿Cómo implementas refresh token rotation?', 'How do you implement refresh token rotation?'),
        a: tx('El access token dura 15 min, el refresh 7 días en httpOnly cookie. Al renovar, invalidas el refresh anterior en la base de datos y emites uno nuevo. Si detectas reutilización de un refresh ya invalidado, revocas todos los tokens del usuario (sesión comprometida).', 'Access token lasts 15 min, refresh 7 days in httpOnly cookie. On renewal, invalidate the previous refresh in the database and issue a new one. If you detect reuse of an already-invalidated refresh, revoke all user tokens (compromised session).') },
      { q: tx('¿Cómo diseñas la respuesta de error de una API?', 'How do you design API error responses?'),
        a: tx('Estructura consistente: { error: { code: "USER_NOT_FOUND", message: "...", details: [...] } }. Usa códigos internos específicos (no solo HTTP status). Incluye timestamp y un requestId para trazabilidad.', 'Consistent structure: { error: { code: "USER_NOT_FOUND", message: "...", details: [...] } }. Use specific internal codes (not just HTTP status). Include timestamp and requestId for traceability.') },
      { q: tx('¿Qué es un idempotency key?', 'What is an idempotency key?'),
        a: tx('Un UUID que el cliente envía en el header Idempotency-Key. El servidor guarda el resultado del primer request y lo devuelve en repeticiones. Esencial para operaciones de pago: si hay un timeout, el cliente reintenta sin duplicar el cargo.', 'A UUID the client sends in the Idempotency-Key header. The server stores the first request result and returns it on retries. Essential for payment operations: if there\'s a timeout, the client retries without duplicating the charge.') },
      { q: tx('¿Cómo versionarías una API con millones de usuarios?', 'How would you version an API with millions of users?'),
        a: tx('URL Path (/v2/) para visibilidad. Soporte simultáneo de v1 y v2 durante 12+ meses. Headers Deprecation + Sunset en v1. Analytics por versión para ver cuándo la mayoría migró. Feature flags para gradual rollout.', 'URL Path (/v2/) for visibility. Simultaneous support of v1 and v2 for 12+ months. Deprecation + Sunset headers on v1. Per-version analytics to see when most users migrated. Feature flags for gradual rollout.') },
    ],
    senior: [
      { q: tx('¿REST vs gRPC vs GraphQL: cuándo elegir cada uno?', 'REST vs gRPC vs GraphQL: when to choose each?'),
        a: tx('REST: estándar para APIs públicas, simple, amplio soporte. gRPC: microservicios internos, alto rendimiento, contratos fuertes con Protobuf, streaming bidireccional. GraphQL: clientes con necesidades de datos variables (móvil), evita over/under-fetching, mayor complejidad en el servidor.', 'REST: standard for public APIs, simple, wide support. gRPC: internal microservices, high performance, strong contracts with Protobuf, bidirectional streaming. GraphQL: clients with variable data needs (mobile), avoids over/under-fetching, more server complexity.') },
      { q: tx('¿Cómo diseñas rate limiting distribuido?', 'How do you design distributed rate limiting?'),
        a: tx('Redis con scripts Lua para operaciones atómicas (INCR + EXPIRE). Sliding window con sorted sets: ZADD con score=timestamp, ZREMRANGEBYSCORE para limpiar, ZCARD para contar. El algoritmo token bucket en Redis permite ráfagas controladas. Considera rate limiting por IP, por usuario y por API key con límites distintos.', 'Redis with Lua scripts for atomic operations (INCR + EXPIRE). Sliding window with sorted sets: ZADD with score=timestamp, ZREMRANGEBYSCORE to clean, ZCARD to count. Token bucket algorithm in Redis allows controlled bursts. Consider rate limiting by IP, by user and by API key with different limits.') },
      { q: tx('¿Cómo garantizas consistencia en una API de pagos?', 'How do you guarantee consistency in a payment API?'),
        a: tx('Idempotency keys almacenados en Redis/DB con TTL de 24h. Transacciones de base de datos para operaciones atómicas. Outbox pattern: escribe el evento y el estado en la misma transacción, procesa asíncronamente. Saga pattern para operaciones distribuidas: compensating transactions si algo falla.', 'Idempotency keys stored in Redis/DB with 24h TTL. Database transactions for atomic operations. Outbox pattern: write event and state in the same transaction, process asynchronously. Saga pattern for distributed operations: compensating transactions if something fails.') },
      { q: tx('¿Cómo diseñas una API para que sea hypermedia-driven (HATEOAS)?', 'How do you design a truly hypermedia-driven (HATEOAS) API?'),
        a: tx('Cada respuesta incluye _links con las acciones disponibles según el estado del recurso. Ejemplo: un order con status=pending incluye links a cancel y confirm; con status=shipped solo a track. El cliente navega por links, no construye URLs. Esto desacopla completamente al cliente de la estructura de la API.', 'Each response includes _links with available actions based on the resource state. Example: an order with status=pending includes links to cancel and confirm; with status=shipped only to track. The client navigates by links, not by constructing URLs. This completely decouples the client from the API structure.') },
      { q: tx('¿Cómo mitigas los 10 riesgos del OWASP API Security Top 10?', 'How do you mitigate the OWASP API Security Top 10 risks?'),
        a: tx('BOLA (acceso a recursos de otros): valida que req.user.id === resource.userId. Exceso de datos: proyección explícita, nunca devuelvas toda la entidad. Mass assignment: whitelist de campos permitidos en PUT/PATCH. Rate limiting: por IP + usuario + endpoint. Inyección: ORM parametrizado, nunca concatenes SQL. Autenticación rota: refresh token rotation + httpOnly cookies.', 'BOLA (access to others\' resources): validate req.user.id === resource.userId. Excessive data: explicit projection, never return the full entity. Mass assignment: whitelist of allowed fields in PUT/PATCH. Rate limiting: by IP + user + endpoint. Injection: parameterized ORM, never concatenate SQL. Broken authentication: refresh token rotation + httpOnly cookies.') },
    ],
  };

  const renderInterview = () => {
    const levels = [
      { key: 'junior', label: 'Junior', color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10' },
      { key: 'mid', label: 'Mid', color: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10' },
      { key: 'senior', label: 'Senior', color: 'text-red-400', border: 'border-red-500/30', bg: 'bg-red-500/10' },
    ];
    return (
      <div className="space-y-6">
        <SectionTitle title={tx('Preguntas de Entrevista — API Design', 'Interview Questions — API Design')}
          subtitle={tx('Preguntas reales sobre diseño de APIs REST, autenticación y performance.', 'Real questions about REST API design, authentication and performance.')} />
        {levels.map(level => (
          <div key={level.key} className="space-y-2">
            <h3 className={`text-base font-bold ${level.color} flex items-center gap-2`}>
              <span className={`px-2 py-0.5 rounded text-xs border ${level.border} ${level.bg}`}>{level.label}</span>
            </h3>
            {interviewQs[level.key].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className={`border rounded-xl overflow-hidden ${level.border}`}>
                <button onClick={() => setOpenQ(openQ === `${level.key}-${i}` ? null : `${level.key}-${i}`)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-white/5 transition-colors">
                  <span className="text-sm font-medium text-slate-200 pr-4">{item.q}</span>
                  {openQ === `${level.key}-${i}` ? <ChevronUp className={`w-4 h-4 flex-shrink-0 ${level.color}`} /> : <ChevronDown className="w-4 h-4 flex-shrink-0 text-slate-500" />}
                </button>
                <AnimatePresence>
                  {openQ === `${level.key}-${i}` && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                      className={`border-t ${level.border} px-3 py-3 ${level.bg}`}>
                      <p className="text-xs text-slate-300 leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // ─── Router ───────────────────────────────────────────────────────────────

  const renderContent = () => {
    switch (active) {
      case 'rest':       return renderRest();
      case 'verbs':      return renderVerbs();
      case 'http':       return renderHttp();
      case 'versioning': return renderVersioning();
      case 'auth':       return renderAuth();
      case 'pagination': return renderPagination();
      case 'ratelimit':  return renderRateLimit();
      case 'interview':  return renderInterview();
      default:           return renderRest();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 lg:h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <div className="lg:col-span-1 flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto">
        {sections.map(section => (
          <button key={section.id} onClick={() => setActive(section.id)} data-active={active === section.id}
            className={`flex-shrink-0 lg:flex-shrink text-left px-3 py-2.5 rounded-xl border transition-all duration-200 ${
              active === section.id
                ? 'border-orange-500/50 bg-orange-500/10 text-orange-300'
                : 'border-slate-700/50 hover:border-orange-500/30 hover:bg-orange-500/5 text-slate-400 hover:text-slate-200'
            }`}>
            <p className={`text-sm font-semibold whitespace-nowrap lg:whitespace-normal ${active === section.id ? 'text-orange-300' : ''}`}>{section.title}</p>
            <p className="text-[11px] text-slate-500 mt-0.5 hidden lg:block">{section.subtitle}</p>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="lg:col-span-3 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
