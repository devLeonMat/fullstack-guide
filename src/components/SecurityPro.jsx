import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, ShieldAlert, ShieldCheck, Lock, Key, Eye, EyeOff,
  AlertTriangle, CheckCircle, XCircle, Zap, User
} from 'lucide-react';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';

const owaspItems = [
  { id: 'A01', name: 'Broken Access Control',       severity: 'Critical' },
  { id: 'A02', name: 'Cryptographic Failures',      severity: 'Critical' },
  { id: 'A03', name: 'Injection',                   severity: 'Critical' },
  { id: 'A04', name: 'Insecure Design',             severity: 'High'     },
  { id: 'A05', name: 'Security Misconfiguration',   severity: 'High'     },
  { id: 'A06', name: 'Vulnerable Components',       severity: 'High'     },
  { id: 'A07', name: 'Auth Failures',               severity: 'High'     },
  { id: 'A08', name: 'Software Integrity Failures', severity: 'Medium'   },
  { id: 'A09', name: 'Logging Failures',            severity: 'Medium'   },
  { id: 'A10', name: 'SSRF',                        severity: 'Medium'   },
];

const severityColor = {
  Critical: 'bg-red-500/20 text-red-300 border-red-500/40',
  High:     'bg-orange-500/20 text-orange-300 border-orange-500/40',
  Medium:   'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
};

const sqlCode = `// ❌ VULNERABLE — SQL Injection
const query = "SELECT * FROM users WHERE id = " + userId;
db.query(query); // attacker sends: 1 OR 1=1 --

// ✅ SAFE — Parameterized query
const query = "SELECT * FROM users WHERE id = ?";
db.query(query, [userId]);

// ✅ SAFE — ORM (Prisma / Sequelize)
const user = await prisma.user.findUnique({ where: { id: userId } });`;

const jwtCode = `// Sign JWT on login
import jwt from 'jsonwebtoken';

const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '15m' }
);

// Refresh token (long-lived, stored httpOnly cookie)
const refresh = jwt.sign({ userId: user.id }, process.env.REFRESH_SECRET, {
  expiresIn: '7d',
});
res.cookie('refreshToken', refresh, { httpOnly: true, secure: true, sameSite: 'strict' });

// Middleware — validate Authorization header
export function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(auth.slice(7), process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}`;

const rbacCode = `// Role-based middleware
const PERMISSIONS = {
  admin:  ['read', 'write', 'delete'],
  editor: ['read', 'write'],
  viewer: ['read'],
};

export function requirePermission(action) {
  return (req, res, next) => {
    const role = req.user?.role;
    if (!PERMISSIONS[role]?.includes(action)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

// Usage
app.delete('/posts/:id', requireAuth, requirePermission('delete'), deletePost);

// ABAC — attribute-based example
function canEditPost(user, post) {
  return user.role === 'admin' || post.authorId === user.id;
}`;

const cryptoCode = `import bcrypt from 'bcrypt';
import crypto from 'crypto';

// Password hashing (bcrypt — includes salt)
const ROUNDS = 12;
const hash = await bcrypt.hash(password, ROUNDS);
const match = await bcrypt.compare(password, hash); // true / false

// AES-256-GCM symmetric encryption
const KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // 32 bytes

function encrypt(text) {
  const iv  = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', KEY, iv);
  const enc  = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag  = cipher.getAuthTag();
  return { iv: iv.toString('hex'), tag: tag.toString('hex'), data: enc.toString('hex') };
}

function decrypt({ iv, tag, data }) {
  const decipher = crypto.createDecipheriv('aes-256-gcm', KEY, Buffer.from(iv, 'hex'));
  decipher.setAuthTag(Buffer.from(tag, 'hex'));
  return decipher.update(Buffer.from(data, 'hex')) + decipher.final('utf8');
}`;

const apiSecCode = `import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import { z } from 'zod';

const app = express();

// Security headers
app.use(helmet());

// CORS — explicit allowlist
app.use(cors({ origin: ['https://myapp.com'], credentials: true }));

// Rate limiting
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Request size limit
app.use(express.json({ limit: '10kb' }));

// Input validation with Zod
const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

app.post('/api/register', (req, res) => {
  const result = UserSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json(result.error.format());
  // proceed safely with result.data
});`;

const xssCsrfCode = `// Content-Security-Policy header
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc:  ["'self'"],   // no inline scripts
      styleSrc:   ["'self'", "'unsafe-inline'"],
      imgSrc:     ["'self'", 'data:', 'https:'],
    },
  })
);

// Sanitize user content with DOMPurify (browser)
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);

// CSRF token pattern (express)
import csrf from 'csurf';
app.use(csrf({ cookie: { httpOnly: true, sameSite: 'strict' } }));
app.get('/form', (req, res) => res.render('form', { csrfToken: req.csrfToken() }));

// SameSite cookie (blocks CSRF in modern browsers)
res.cookie('session', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',   // or 'lax'
});`;

/* ─── Sub-components ─────────────────────────────────────────────────── */

function SectionOWASP({ tx }) {
  const [highlighted, setHighlighted] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setHighlighted(prev => (prev + 1) % owaspItems.length);
    }, 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">OWASP Top 10</h2>
        <p className="text-slate-400 text-sm">
          {tx('Las 10 vulnerabilidades más críticas en aplicaciones web', 'The 10 most critical web application vulnerabilities')}
        </p>
      </div>

      {/* Animated list */}
      <div className="bg-slate-950/40 border border-red-500/20 rounded-xl p-4 space-y-2">
        {owaspItems.map((item, idx) => (
          <motion.div
            key={item.id}
            animate={{
              backgroundColor: idx === highlighted ? 'rgba(239,68,68,0.12)' : 'transparent',
              borderColor: idx === highlighted ? 'rgba(239,68,68,0.4)' : 'rgba(100,116,139,0.15)',
            }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg border"
          >
            <span className="text-xs font-mono text-red-400 w-8 flex-shrink-0">{item.id}</span>
            <span className={`text-sm flex-1 ${idx === highlighted ? 'text-white' : 'text-slate-300'}`}>
              {item.name}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full border ${severityColor[item.severity]}`}>
              {item.severity}
            </span>
          </motion.div>
        ))}
      </div>

      {/* SQL injection example */}
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-red-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          {tx('Ejemplo: Inyección SQL', 'Example: SQL Injection')}
        </h3>
        <CodeBlock code={sqlCode} language="javascript" />
      </div>
    </div>
  );
}

function SectionAuth({ tx }) {
  const jwtSteps = [
    { label: tx('Login', 'Login'),                   icon: User,        color: 'text-orange-300' },
    { label: tx('Servidor emite JWT', 'Server issues JWT'), icon: Key,  color: 'text-yellow-300' },
    { label: tx('Cliente almacena', 'Client stores'), icon: Lock,       color: 'text-blue-300'   },
    { label: tx('Envía en header', 'Sends in header'), icon: Zap,       color: 'text-green-300'  },
    { label: tx('Servidor valida', 'Server validates'), icon: ShieldCheck, color: 'text-red-300' },
  ];

  const jwtParts = [
    { label: 'Header',    color: 'text-red-300',    bg: 'bg-red-500/15',    text: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' },
    { label: 'Payload',   color: 'text-orange-300', bg: 'bg-orange-500/15', text: 'eyJ1c2VySWQiOiIxMjMiLCJyb2xlIjoiYWRtaW4ifQ' },
    { label: 'Signature', color: 'text-yellow-300', bg: 'bg-yellow-500/15', text: 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('Autenticación', 'Authentication')} — JWT / OAuth2
        </h2>
        <p className="text-slate-400 text-sm">
          {tx('Ciclo de vida de tokens y flujo OAuth2', 'Token lifecycle and OAuth2 flow')}
        </p>
      </div>

      {/* JWT lifecycle */}
      <div className="bg-slate-950/40 border border-red-500/20 rounded-xl p-4">
        <p className="text-xs text-slate-500 mb-3">{tx('Ciclo de vida JWT', 'JWT lifecycle')}</p>
        <div className="flex flex-wrap items-center gap-1">
          {jwtSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="flex items-center gap-1">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.12, duration: 0.35 }}
                  className="flex flex-col items-center gap-1 px-2 py-2 bg-slate-800/60 rounded-lg border border-slate-700/60"
                >
                  <Icon className={`w-4 h-4 ${step.color}`} />
                  <span className={`text-xs font-medium ${step.color} whitespace-nowrap`}>{step.label}</span>
                </motion.div>
                {idx < jwtSteps.length - 1 && (
                  <span className="text-slate-600 text-sm">→</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* JWT structure */}
      <div className="bg-slate-950/40 border border-red-500/20 rounded-xl p-4 space-y-2">
        <p className="text-xs text-slate-500 mb-2">{tx('Estructura JWT', 'JWT structure')}: header.payload.signature</p>
        <div className="flex flex-wrap gap-1 font-mono text-xs break-all">
          {jwtParts.map((part, idx) => (
            <span key={idx}>
              <span className={`${part.bg} ${part.color} px-1.5 py-0.5 rounded`}>{part.text}</span>
              {idx < jwtParts.length - 1 && <span className="text-slate-500">.</span>}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-2">
          {jwtParts.map((part) => (
            <span key={part.label} className={`text-xs ${part.color}`}>
              ■ {part.label}
            </span>
          ))}
        </div>
      </div>

      {/* OAuth2 flow */}
      <div className="bg-slate-950/40 border border-red-500/20 rounded-xl p-4">
        <p className="text-xs text-slate-500 mb-3">{tx('Flujo OAuth2', 'OAuth2 flow')}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
          {[
            { label: tx('Propietario', 'Resource Owner'), color: 'border-orange-500/40 text-orange-300' },
            { label: 'Client App',                        color: 'border-blue-500/40 text-blue-300'    },
            { label: tx('Auth Server', 'Auth Server'),    color: 'border-green-500/40 text-green-300'  },
            { label: tx('API Resource', 'Resource Server'), color: 'border-red-500/40 text-red-300'   },
          ].map((node, idx) => (
            <div key={idx} className={`border rounded-lg p-2 bg-slate-800/40 ${node.color}`}>
              <div className={`font-semibold ${node.color.split(' ')[1]}`}>{node.label}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3 text-center">
          {tx('Owner autoriza → Client obtiene code → Auth Server emite token → API acepta token', 'Owner authorizes → Client gets code → Auth Server issues token → API accepts token')}
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-base font-semibold text-orange-300 flex items-center gap-2">
          <Key className="w-4 h-4" />
          {tx('JWT: sign, verify y middleware', 'JWT: sign, verify and middleware')}
        </h3>
        <CodeBlock code={jwtCode} language="javascript" />
      </div>

      <div className="bg-slate-950/40 border border-red-500/20 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {[
          { title: tx('Refresh tokens', 'Refresh tokens'),   text: tx('Token de larga duración para renovar el access token sin re-login', 'Long-lived token to renew access token without re-login') },
          { title: tx('Expiración', 'Token expiry'),          text: tx('Access token: 15m. Refresh: 7d. Nunca tokens que no expiren', 'Access token: 15m. Refresh: 7d. Never non-expiring tokens') },
          { title: tx('Almacenamiento', 'Storage'),           text: tx('httpOnly cookies > localStorage (XSS seguro). Nunca en JS accesible', 'httpOnly cookies > localStorage (XSS safe). Never in accessible JS') },
        ].map((item) => (
          <div key={item.title} className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/40">
            <div className="text-orange-300 font-semibold mb-1">{item.title}</div>
            <div className="text-slate-400">{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionAuthZ({ tx }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep(prev => (prev + 1) % 4), 1200);
    return () => clearInterval(id);
  }, []);

  const steps = [
    { label: tx('Acción de usuario', 'User action'),    icon: User,       color: 'text-blue-300'   },
    { label: tx('Buscar rol', 'Role lookup'),            icon: Key,        color: 'text-orange-300' },
    { label: tx('Verificar permiso', 'Check permission'), icon: Shield,   color: 'text-yellow-300' },
    { label: tx('Permitir / Denegar', 'Allow / Deny'),   icon: ShieldCheck, color: 'text-green-300' },
  ];

  const permissions = [
    { role: 'admin',  read: true,  write: true,  delete: true  },
    { role: 'editor', read: true,  write: true,  delete: false },
    { role: 'viewer', read: true,  write: false, delete: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('Autorización', 'Authorization')} — RBAC / ABAC
        </h2>
        <p className="text-slate-400 text-sm">
          {tx('Control de acceso basado en roles y atributos', 'Role-based and attribute-based access control')}
        </p>
      </div>

      {/* RBAC diagram */}
      <div className="bg-slate-950/40 border border-red-500/20 rounded-xl p-4">
        <p className="text-xs text-slate-500 mb-3">RBAC: {tx('Usuarios → Roles → Permisos → Recursos', 'Users → Roles → Permissions → Resources')}</p>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {[
            { label: tx('Usuarios', 'Users'),      color: 'bg-blue-500/20 border-blue-500/40 text-blue-300'     },
            { label: tx('Roles', 'Roles'),          color: 'bg-orange-500/20 border-orange-500/40 text-orange-300' },
            { label: tx('Permisos', 'Permissions'), color: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300' },
            { label: tx('Recursos', 'Resources'),   color: 'bg-green-500/20 border-green-500/40 text-green-300'  },
          ].map((node, idx, arr) => (
            <div key={idx} className="flex items-center gap-2">
              <span className={`px-3 py-1.5 rounded-lg border font-semibold ${node.color}`}>{node.label}</span>
              {idx < arr.length - 1 && <span className="text-slate-600">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Animated permission check */}
      <div className="bg-slate-950/40 border border-red-500/20 rounded-xl p-4">
        <p className="text-xs text-slate-500 mb-3">{tx('Verificación de permiso animada', 'Animated permission check')}</p>
        <div className="flex flex-wrap items-center gap-1">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const active = idx === step;
            const done   = idx < step;
            return (
              <div key={idx} className="flex items-center gap-1">
                <motion.div
                  animate={{
                    backgroundColor: active ? 'rgba(239,68,68,0.18)' : done ? 'rgba(34,197,94,0.10)' : 'rgba(30,41,59,0.5)',
                    borderColor: active ? 'rgba(239,68,68,0.5)' : done ? 'rgba(34,197,94,0.3)' : 'rgba(100,116,139,0.3)',
                    scale: active ? 1.07 : 1,
                  }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg border"
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-red-300' : done ? 'text-green-400' : s.color}`} />
                  <span className="text-xs whitespace-nowrap text-slate-300">{s.label}</span>
                </motion.div>
                {idx < steps.length - 1 && <span className="text-slate-600 text-sm">→</span>}
              </div>
            );
          })}
          {/* Result */}
          <AnimatePresence>
            {step === 3 && (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 ml-2"
              >
                <CheckCircle className="w-5 h-5 text-green-400" />
                <XCircle className="w-5 h-5 text-red-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Permission matrix */}
      <div className="bg-slate-950/40 border border-red-500/20 rounded-xl overflow-hidden">
        <div className="px-4 py-2 border-b border-slate-800 text-xs text-slate-400">
          {tx('Matriz de permisos', 'Permission matrix')}
        </div>
        <table className="w-full text-xs">
          <thead className="bg-slate-900/50">
            <tr>
              <th className="px-4 py-2 text-left text-orange-300">{tx('Rol', 'Role')}</th>
              <th className="px-4 py-2 text-center text-slate-300">Read</th>
              <th className="px-4 py-2 text-center text-slate-300">Write</th>
              <th className="px-4 py-2 text-center text-slate-300">Delete</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((row, idx) => (
              <tr key={idx} className="border-t border-slate-800">
                <td className="px-4 py-2 font-semibold text-orange-200">{row.role}</td>
                {(['read', 'write', 'delete']).map(perm => (
                  <td key={perm} className="px-4 py-2 text-center">
                    {row[perm]
                      ? <CheckCircle className="w-4 h-4 text-green-400 mx-auto" />
                      : <XCircle className="w-4 h-4 text-red-400 mx-auto" />
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-2">
        <h3 className="text-base font-semibold text-orange-300 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          {tx('Middleware RBAC + ejemplo ABAC', 'RBAC middleware + ABAC example')}
        </h3>
        <CodeBlock code={rbacCode} language="javascript" />
      </div>

      <div className="bg-slate-950/40 border border-red-500/20 rounded-xl p-4 text-xs">
        <p className="text-orange-300 font-semibold mb-1">ABAC</p>
        <p className="text-slate-400">
          {tx(
            'ABAC evalúa atributos del usuario, recurso y entorno en tiempo de ejecución. Más flexible que RBAC pero más complejo. Ejemplo: un editor solo puede modificar sus propios posts.',
            'ABAC evaluates user, resource and environment attributes at runtime. More flexible than RBAC but more complex. Example: an editor can only modify their own posts.'
          )}
        </p>
      </div>
    </div>
  );
}

function SectionEncryption({ tx }) {
  const hashSteps = [
    { label: 'password',         color: 'text-blue-300'   },
    { label: '+ salt',           color: 'text-orange-300' },
    { label: 'bcrypt(12)',        color: 'text-yellow-300' },
    { label: tx('hash almacenado', 'stored hash'), color: 'text-green-300' },
  ];

  const tlsSteps = [
    tx('Client Hello', 'Client Hello'),
    tx('Server Hello + Cert', 'Server Hello + Cert'),
    tx('Key Exchange', 'Key Exchange'),
    tx('Finished (cifrado)', 'Finished (encrypted)'),
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('Cifrado y Hashing', 'Encryption & Hashing')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx('AES, RSA, bcrypt y TLS en la práctica', 'AES, RSA, bcrypt and TLS in practice')}
        </p>
      </div>

      {/* Symmetric vs Asymmetric */}
      <div className="bg-slate-950/40 border border-red-500/20 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-yellow-300 font-semibold text-sm">
            <Key className="w-4 h-4" />
            {tx('Simétrico (AES)', 'Symmetric (AES)')}
          </div>
          <p className="text-slate-400 text-xs">
            {tx('Una sola clave para cifrar y descifrar. Rápido. Ideal para datos en reposo. AES-256-GCM es el estándar actual.', 'Single key for encryption and decryption. Fast. Ideal for data at rest. AES-256-GCM is the current standard.')}
          </p>
          <div className="flex items-center gap-1 text-xs">
            <span className="bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded border border-yellow-500/30">🔑 key</span>
            <span className="text-slate-600">→ encrypt + decrypt</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-red-300 font-semibold text-sm">
            <Lock className="w-4 h-4" />
            {tx('Asimétrico (RSA)', 'Asymmetric (RSA)')}
          </div>
          <p className="text-slate-400 text-xs">
            {tx('Par de claves: pública para cifrar, privada para descifrar. Más lento. Usado en TLS, SSH y firmas digitales.', 'Key pair: public to encrypt, private to decrypt. Slower. Used in TLS, SSH and digital signatures.')}
          </p>
          <div className="flex items-center gap-1 text-xs flex-wrap">
            <span className="bg-green-500/20 text-green-300 px-2 py-0.5 rounded border border-green-500/30">🔓 public</span>
            <span className="text-slate-600">encrypt /</span>
            <span className="bg-red-500/20 text-red-300 px-2 py-0.5 rounded border border-red-500/30">🔒 private</span>
            <span className="text-slate-600">decrypt</span>
          </div>
        </div>
      </div>

      {/* Bcrypt pipeline */}
      <div className="bg-slate-950/40 border border-red-500/20 rounded-xl p-4">
        <p className="text-xs text-slate-500 mb-3">{tx('Pipeline de hashing de contraseña', 'Password hashing pipeline')}</p>
        <div className="flex flex-wrap items-center gap-1">
          {hashSteps.map((s, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.15, duration: 0.3 }}
                className="bg-slate-800/60 border border-slate-700/50 rounded-lg px-3 py-1.5"
              >
                <span className={`text-xs font-mono font-semibold ${s.color}`}>{s.label}</span>
              </motion.div>
              {idx < hashSteps.length - 1 && <span className="text-slate-600 text-sm">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* TLS handshake */}
      <div className="bg-slate-950/40 border border-red-500/20 rounded-xl p-4">
        <p className="text-xs text-slate-500 mb-3">TLS 1.3 {tx('Handshake simplificado', 'Simplified handshake')}</p>
        <div className="space-y-1">
          {tlsSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -16 : 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.35 }}
              className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded ${
                idx % 2 === 0
                  ? 'justify-start bg-blue-500/10 border border-blue-500/20'
                  : 'justify-end bg-orange-500/10 border border-orange-500/20'
              }`}
            >
              {idx % 2 === 0 && <span className="text-blue-300">Client</span>}
              <span className={`font-semibold ${idx % 2 === 0 ? 'text-blue-200' : 'text-orange-200'}`}>
                {idx % 2 === 0 ? '→' : '←'} {step}
              </span>
              {idx % 2 !== 0 && <span className="text-orange-300">Server</span>}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-base font-semibold text-orange-300 flex items-center gap-2">
          <Lock className="w-4 h-4" />
          {tx('bcrypt + AES-256-GCM', 'bcrypt + AES-256-GCM')}
        </h3>
        <CodeBlock code={cryptoCode} language="javascript" />
      </div>
    </div>
  );
}

function SectionAPISec({ tx }) {
  const [blocked, setBlocked] = useState(null);

  const attacks = [
    { label: tx('Sin rate limit', 'No rate limit'),    blocked: true,  color: 'text-red-300'    },
    { label: tx('Auth bypass',   'Auth bypass'),       blocked: true,  color: 'text-red-300'    },
    { label: tx('Input inválido', 'Invalid input'),    blocked: true,  color: 'text-red-300'    },
    { label: tx('CORS inválido', 'Invalid CORS'),      blocked: true,  color: 'text-red-300'    },
    { label: tx('Request válido', 'Valid request'),    blocked: false, color: 'text-green-300'  },
  ];

  useEffect(() => {
    let idx = 0;
    const id = setInterval(() => {
      setBlocked(idx % attacks.length);
      idx++;
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('Seguridad de API', 'API Security')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx('Rate limiting, headers, CORS y validación de entrada', 'Rate limiting, headers, CORS and input validation')}
        </p>
      </div>

      {/* Attack vectors diagram */}
      <div className="bg-slate-950/40 border border-red-500/20 rounded-xl p-4">
        <p className="text-xs text-slate-500 mb-3">{tx('Vectores de ataque → capa de defensa', 'Attack vectors → defense layer')}</p>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex flex-col gap-1.5 flex-1">
            {attacks.map((attack, idx) => (
              <motion.div
                key={idx}
                animate={{
                  backgroundColor: blocked === idx
                    ? (attack.blocked ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.12)')
                    : 'rgba(30,41,59,0.4)',
                  scale: blocked === idx ? 1.03 : 1,
                }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded border border-slate-700/40 text-xs"
              >
                <AlertTriangle className={`w-3.5 h-3.5 flex-shrink-0 ${blocked === idx ? attack.color : 'text-slate-600'}`} />
                <span className={blocked === idx ? attack.color : 'text-slate-500'}>{attack.label}</span>
                {blocked === idx && (
                  <span className="ml-auto">
                    {attack.blocked
                      ? <XCircle className="w-4 h-4 text-red-400" />
                      : <CheckCircle className="w-4 h-4 text-green-400" />
                    }
                  </span>
                )}
              </motion.div>
            ))}
          </div>
          <div className="flex-shrink-0 flex flex-col items-center gap-1">
            <ShieldCheck className="w-10 h-10 text-red-400" />
            <span className="text-xs text-red-300 font-semibold text-center">{tx('Capa de\nDefensa', 'Defense\nLayer')}</span>
          </div>
          <div className="flex-shrink-0 flex flex-col items-center gap-1">
            <Zap className="w-8 h-8 text-green-400" />
            <span className="text-xs text-green-300 font-semibold">API</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        {[
          { label: 'HTTPS only',                   color: 'text-orange-300' },
          { label: 'Helmet headers',               color: 'text-yellow-300' },
          { label: tx('Validación Zod', 'Zod validation'), color: 'text-blue-300' },
          { label: 'Rate limit',                   color: 'text-green-300'  },
        ].map((item) => (
          <div key={item.label} className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-2 text-center">
            <span className={`font-semibold ${item.color}`}>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <h3 className="text-base font-semibold text-orange-300 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4" />
          {tx('Rate limit, Helmet, CORS y Zod', 'Rate limit, Helmet, CORS and Zod')}
        </h3>
        <CodeBlock code={apiSecCode} language="javascript" />
      </div>
    </div>
  );
}

function SectionXSSCSRF({ tx }) {
  const [xssStep, setXssStep] = useState(0);
  const [csrfStep, setCsrfStep] = useState(0);

  const xssFlow = [
    tx('Atacante inyecta script', 'Attacker injects script'),
    tx('Guardado en DB',          'Stored in DB'),
    tx('Víctima recibe página',   'Victim receives page'),
    tx('Script ejecutado',        'Script executed'),
  ];
  const csrfFlow = [
    tx('Víctima logueada',           'Victim is logged in'),
    tx('Atacante engaña con click',  'Attacker tricks click'),
    tx('Request forjado enviado',    'Forged request sent'),
    tx('Cookie adjuntada auto',      'Cookie auto-attached'),
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setXssStep(prev => (prev + 1) % xssFlow.length);
      setCsrfStep(prev => (prev + 1) % csrfFlow.length);
    }, 1200);
    return () => clearInterval(id);
  }, []);

  const checklist = {
    xss: [
      tx('Sanitizar con DOMPurify', 'Sanitize with DOMPurify'),
      tx('CSP header estricto',    'Strict CSP header'),
      tx('Escapar output HTML',    'Escape HTML output'),
      tx('No innerHTML directo',   'No direct innerHTML'),
    ],
    csrf: [
      tx('CSRF token en forms',       'CSRF token on forms'),
      tx('SameSite=Strict cookies',   'SameSite=Strict cookies'),
      tx('Verificar Origin header',   'Verify Origin header'),
      tx('Double Submit Cookie',      'Double Submit Cookie'),
    ],
  };

  const FlowDiagram = ({ steps, activeStep, color }) => (
    <div className="flex flex-col gap-1">
      {steps.map((step, idx) => (
        <motion.div
          key={idx}
          animate={{
            backgroundColor: idx === activeStep
              ? `rgba(${color},0.18)` : 'rgba(30,41,59,0.4)',
            borderColor: idx === activeStep
              ? `rgba(${color},0.5)` : 'rgba(100,116,139,0.25)',
          }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs"
        >
          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
            idx === activeStep ? 'bg-red-500/50 text-white' : 'bg-slate-700/50 text-slate-500'
          }`}>{idx + 1}</span>
          <span className={idx === activeStep ? 'text-white' : 'text-slate-500'}>{step}</span>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">XSS & CSRF</h2>
        <p className="text-slate-400 text-sm">
          {tx('Ataques de script entre sitios y falsificación de solicitudes', 'Cross-site scripting and cross-site request forgery attacks')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* XSS flow */}
        <div className="bg-slate-950/40 border border-red-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-4 h-4 text-red-400" />
            <p className="text-xs font-semibold text-red-300">XSS ({tx('Stored', 'Stored')})</p>
          </div>
          <FlowDiagram steps={xssFlow} activeStep={xssStep} color="239,68,68" />
        </div>

        {/* CSRF flow */}
        <div className="bg-slate-950/40 border border-orange-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <EyeOff className="w-4 h-4 text-orange-400" />
            <p className="text-xs font-semibold text-orange-300">CSRF</p>
          </div>
          <FlowDiagram steps={csrfFlow} activeStep={csrfStep} color="249,115,22" />
        </div>
      </div>

      {/* Prevention checklists */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { title: tx('Prevención XSS', 'XSS Prevention'), items: checklist.xss, color: 'text-red-300' },
          { title: tx('Prevención CSRF', 'CSRF Prevention'), items: checklist.csrf, color: 'text-orange-300' },
        ].map((list) => (
          <div key={list.title} className="bg-slate-950/40 border border-slate-700/30 rounded-xl p-4">
            <p className={`text-sm font-semibold ${list.color} mb-2`}>{list.title}</p>
            <ul className="space-y-1">
              {list.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <h3 className="text-base font-semibold text-orange-300 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          {tx('CSP, DOMPurify, CSRF tokens y SameSite', 'CSP, DOMPurify, CSRF tokens and SameSite')}
        </h3>
        <CodeBlock code={xssCsrfCode} language="javascript" />
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────── */

export default function SecurityPro() {
  const { language } = useLanguage();
  const tx = (es, en) => language === 'en' ? en : es;
  const [active, setActive] = useState('owasp');

  const sections = [
    { id: 'owasp',    title: 'OWASP Top 10', subtitle: tx('Vulnerabilidades críticas', 'Critical vulnerabilities') },
    { id: 'auth',     title: tx('Autenticación', 'Authentication'), subtitle: 'JWT / OAuth2' },
    { id: 'authz',    title: tx('Autorización', 'Authorization'),   subtitle: 'RBAC / ABAC' },
    { id: 'encryption', title: tx('Cifrado', 'Encryption'),        subtitle: 'AES / RSA / bcrypt' },
    { id: 'apisec',   title: tx('API Security', 'API Security'),   subtitle: 'Helmet / Rate limit / Zod' },
    { id: 'xss-csrf', title: 'XSS & CSRF',                         subtitle: tx('Ataques y prevención', 'Attacks & prevention') },
  ];

  const renderContent = () => {
    switch (active) {
      case 'owasp':      return <SectionOWASP      tx={tx} />;
      case 'auth':       return <SectionAuth       tx={tx} />;
      case 'authz':      return <SectionAuthZ      tx={tx} />;
      case 'encryption': return <SectionEncryption tx={tx} />;
      case 'apisec':     return <SectionAPISec     tx={tx} />;
      case 'xss-csrf':   return <SectionXSSCSRF    tx={tx} />;
      default:           return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 lg:h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <div className="lg:col-span-1 lg:overflow-y-auto lg:pr-2">
        <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-hidden lg:pb-0 lg:space-y-2">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActive(section.id)}
              className={`flex-shrink-0 lg:w-full text-left px-3 py-2 lg:px-4 lg:py-3 rounded-xl transition-all ${
                active === section.id
                  ? 'bg-red-500/20 border border-red-500/40 text-red-300'
                  : 'bg-slate-800/30 border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="font-semibold text-sm whitespace-nowrap lg:whitespace-normal">{section.title}</div>
              <div className="text-xs text-slate-500 mt-0.5 hidden lg:block">{section.subtitle}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Content panel */}
      <div className="lg:col-span-3 lg:overflow-y-auto lg:pr-2 space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
