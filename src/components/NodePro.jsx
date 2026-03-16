import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, MessageCircleQuestion } from 'lucide-react';
import { SiNodedotjs } from 'react-icons/si';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';

function NodePro() {
  const { language } = useLanguage();
  const tx = (es, en) => (language === 'en' ? en : es);
  const pickPipe = (text) => {
    if (typeof text !== 'string') return text;
    const parts = text.split(' | ');
    if (parts.length < 2) return text;
    return language === 'en' ? parts[1] : parts[0];
  };
  const pickSlash = (text) => {
    if (typeof text !== 'string') return text;
    const parts = text.split(' / ');
    if (parts.length < 2) return text;
    return language === 'en' ? parts[0] : parts[1];
  };
  const [activeSection, setActiveSection] = useState('fundamentals');
  const [expandedFundamentals, setExpandedFundamentals] = useState({
    0: true, // First fundamental open by default
  });
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [expandedLevels, setExpandedLevels] = useState({
    junior: true, // Junior level open by default
  });

  const toggleFundamental = (idx) => {
    setExpandedFundamentals(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const toggleQuestion = (level, idx) => {
    const key = `${level}-${idx}`;
    setExpandedQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleLevel = (level) => {
    setExpandedLevels(prev => ({
      ...prev,
      [level]: !prev[level]
    }));
  };

  const sections = {
    fundamentals: {
      id: 'fundamentals',
      title: tx('Fundamentos', 'Fundamentals'),
      subtitle: 'Event Loop, Modules, NPM, Streams & Core Concepts',
      icon: SiNodedotjs,
      content: [
        {
          topic: 'Event Loop & Non-blocking I/O / Event Loop e I/O No Bloqueante',
          description: 'Node.js ejecuta JavaScript de forma asíncrona mediante el Event Loop | Node.js executes JavaScript asynchronously through the Event Loop',
          points: [
            '⚡ Single-threaded: Un solo thread maneja múltiples operaciones mediante callbacks asíncronos | Single thread handles multiple operations via async callbacks',
            '⚡ Event Loop Phases: Timers → Pending CB → Poll → Check (setImmediate) → Close. Process.nextTick tiene máxima prioridad | Timers → Pending CB → Poll → Check (setImmediate) → Close. Process.nextTick has highest priority',
            '⚡ libuv: Librería C++ que maneja el Event Loop y operaciones async (file system, network) | C++ library managing Event Loop and async operations',
            '⚡ Non-blocking: Las operaciones I/O no detienen la ejecución. Usa callbacks/promises para resultados | I/O operations don\'t stop execution. Uses callbacks/promises for results',
            '⚡ Ideal para I/O intensivo, NO para CPU intensivo (cálculos pesados bloquean el loop) | Ideal for I/O intensive, NOT for CPU intensive (heavy computations block the loop)'
          ],
          code: `// Event Loop - Non-blocking I/O\nconst fs = require('fs');\n\n// Asíncrono (no bloquea)\nfs.readFile('file.txt', 'utf8', (err, data) => {\n  console.log('2. File read:', data);\n});\n\nconsole.log('1. Start');\nconsole.log('3. End');\n// Output: 1. Start → 3. End → 2. File read\n\n// Event Loop Phases\nsetTimeout(() => console.log('Timeout'), 0);    // Timers phase\nsetImmediate(() => console.log('Immediate'));   // Check phase\nprocess.nextTick(() => console.log('NextTick')); // Highest priority\n// Output: NextTick → Timeout → Immediate\n\n// Blocking vs Non-blocking\nconst data = fs.readFileSync('file.txt'); // ❌ BLOCKS thread\nfs.readFile('file.txt', (err, data) => {}); // ✅ Non-blocking`
        },
        {
          topic: 'Modules (CommonJS vs ESM) / Módulos',
          description: 'Sistema de módulos para organizar y reutilizar código | Module system to organize and reuse code',
          points: [
            '📦 CommonJS: require/module.exports, carga síncrona, formato tradicional de Node.js | require/module.exports, synchronous loading, traditional Node.js format',
            '📦 ES Modules: import/export, asíncrono, estándar moderno de JavaScript. Requiere "type": "module" en package.json | import/export, asynchronous, modern JavaScript standard. Requires "type": "module" in package.json',
            '📦 Named vs Default Exports: export { fn } vs export default. Import con {} para named, sin {} para default | export { fn } vs export default. Import with {} for named, without for default',
            '📦 Module Caching: Los módulos se cachcan después de la primera carga (require.cache) | Modules are cached after first load (require.cache)',
            '📦 Top-level await: Solo disponible en ESM, permite await fuera de funciones async | Only available in ESM, allows await outside async functions'
          ],
          code: `// CommonJS (traditional)\n// math.js\nmodule.exports = {\n  add: (a, b) => a + b,\n  subtract: (a, b) => a - b\n};\n// app.js\nconst math = require('./math');\nconsole.log(math.add(2, 3)); // 5\n\n// ES Modules (modern) - package.json: "type": "module"\n// math.mjs\nexport const add = (a, b) => a + b;\nexport const subtract = (a, b) => a - b;\nexport default class Calculator {\n  multiply(a, b) { return a * b; }\n}\n// app.mjs\nimport Calculator, { add, subtract } from './math.mjs';\nconsole.log(add(2, 3)); // 5\nconst calc = new Calculator();\n\n// Top-level await (ESM only)\nconst response = await fetch('https://api.example.com/data');\nconst data = await response.json();`
        },
        {
          topic: 'NPM & Package Management / Gestión de Paquetes',
          description: 'Node Package Manager gestiona dependencias y scripts del proyecto | Node Package Manager handles project dependencies and scripts',
          points: [
            '📦 package.json: Manifiesto del proyecto con metadata, dependencies, scripts | Project manifest with metadata, dependencies, scripts',
            '📦 dependencies vs devDependencies: Producción vs desarrollo. npm install vs npm install -D | Production vs development. npm install vs npm install -D',
            '📦 package-lock.json: Versiones exactas para consistencia entre entornos. Commitear siempre | Exact versions for consistency across environments. Always commit',
            '📦 Semantic Versioning: ^1.2.3 (minor/patch), ~1.2.3 (patch only), 1.2.3 (exact) | ^1.2.3 (minor/patch), ~1.2.3 (patch only), 1.2.3 (exact)',
            '📦 npm scripts: Comandos custom (start, dev, test, build). Ejecutar con npm run <script> | Custom commands (start, dev, test, build). Run with npm run <script>'
          ],
          code: `// package.json\n{\n  "name": "my-app",\n  "version": "1.0.0",\n  "type": "module",\n  "scripts": {\n    "start": "node index.js",\n    "dev": "nodemon index.js",\n    "test": "jest",\n    "build": "webpack"\n  },\n  "dependencies": {\n    "express": "^4.18.0"  // ^ = minor/patch updates OK\n  },\n  "devDependencies": {\n    "nodemon": "^2.0.0",\n    "jest": "^29.0.0"\n  },\n  "engines": {\n    "node": ">=18.0.0"\n  }\n}\n\n// npm commands\nnpm install express       // Add to dependencies\nnpm install -D nodemon    // Add to devDependencies\nnpm install               // Install all from package.json\nnpm update                // Update packages\nnpm audit                 // Check vulnerabilities\nnpm audit fix             // Fix vulnerabilities\nnpm ci                    // Clean install (CI/CD)`
        },
        {
          topic: 'Streams & Buffers / Streams y Buffers',
          description: 'Procesamiento eficiente de datos grandes mediante chunks | Efficient processing of large data through chunks',
          points: [
            '💧 Buffer: Manejo de datos binarios en memoria. Útil para archivos, imágenes, video | Binary data handling in memory. Useful for files, images, video',
            '💧 Stream Types: Readable (read), Writable (write), Duplex (both), Transform (modify while streaming) | Readable (read), Writable (write), Duplex (both), Transform (modify while streaming)',
            '💧 Ventajas: Menor uso de memoria (procesa chunks, no todo el archivo), más rápido (empieza antes de cargar todo) | Lower memory usage (processes chunks, not whole file), faster (starts before loading everything)',
            '💧 pipe(): Conecta streams, datos fluyen de readable a writable automáticamente | Connects streams, data flows from readable to writable automatically',
            '💧 Eventos: data (chunk received), end (finished), error, close | data (chunk received), end (finished), error, close'
          ],
          code: `// Buffer - binary data\nconst buffer = Buffer.from('Hello World');\nconsole.log(buffer); // <Buffer 48 65 6c 6c 6f...>\nconsole.log(buffer.toString()); // Hello World\nconsole.log(buffer.toJSON()); // { type: 'Buffer', data: [...] }\n\n// Streams - process large files efficiently\nconst fs = require('fs');\n\n// Readable Stream\nconst readStream = fs.createReadStream('large-file.txt', {\n  encoding: 'utf8',\n  highWaterMark: 16384 // 16KB chunks\n});\n\nreadStream.on('data', (chunk) => {\n  console.log('Chunk received:', chunk.length);\n});\n\nreadStream.on('end', () => console.log('Finished'));\nreadStream.on('error', (err) => console.error('Error:', err));\n\n// Pipe - connect streams\nconst writeStream = fs.createWriteStream('output.txt');\nreadStream.pipe(writeStream);\n\n// Transform Stream - modify data\nconst { Transform } = require('stream');\nconst upperCase = new Transform({\n  transform(chunk, encoding, callback) {\n    this.push(chunk.toString().toUpperCase());\n    callback();\n  }\n});\n\nreadStream.pipe(upperCase).pipe(writeStream);`
        },
        {
          topic: 'Error Handling & Debugging / Manejo de Errores',
          description: 'Estrategias para capturar y manejar errores en aplicaciones Node.js | Strategies to catch and handle errors in Node.js applications',
          points: [
            '❌ Try/Catch: Para código síncrono y async/await. No funciona con callbacks | For synchronous code and async/await. Doesn\'t work with callbacks',
            '❌ Error-first Callbacks: Convención (err, data). Siempre verificar err primero | Convention (err, data). Always check err first',
            '❌ Promise .catch(): Captura errores en cadenas de promises | Catches errors in promise chains',
            '❌ Event Emitters: error event debe tener listener o la app crashea | error event must have listener or app crashes',
            '❌ Global Handlers: process.on(\'uncaughtException\'), process.on(\'unhandledRejection\') para últimos recursos | process.on(\'uncaughtException\'), process.on(\'unhandledRejection\') as last resort'
          ],
          code: `// Try/Catch with async/await ✅\nasync function getData() {\n  try {\n    const data = await fetchAPI();\n    return data;\n  } catch (error) {\n    console.error('Error:', error.message);\n    throw error; // Re-throw or handle\n  }\n}\n\n// Error-first callback\nfs.readFile('file.txt', (err, data) => {\n  if (err) {\n    console.error('Error reading file:', err);\n    return;\n  }\n  console.log(data.toString());\n});\n\n// Promise error handling\nfetchAPI()\n  .then(data => processData(data))\n  .catch(err => console.error('Error:', err))\n  .finally(() => console.log('Done'));\n\n// EventEmitter error handling\nconst EventEmitter = require('events');\nconst emitter = new EventEmitter();\n\nemitter.on('error', (err) => {\n  console.error('Event error:', err);\n});\n\nemitter.emit('error', new Error('Something went wrong'));\n\n// Global error handlers (last resort)\nprocess.on('uncaughtException', (err) => {\n  console.error('Uncaught Exception:', err);\n  process.exit(1); // Exit after logging\n});\n\nprocess.on('unhandledRejection', (reason, promise) => {\n  console.error('Unhandled Rejection at:', promise, 'reason:', reason);\n});`
        },
        {
          topic: 'Security Best Practices / Mejores Prácticas de Seguridad',
          description: 'Proteger aplicaciones Node.js contra vulnerabilidades comunes | Protect Node.js applications against common vulnerabilities',
          points: [
            '🔒 Input Validation: Validar y sanitizar SIEMPRE el input del usuario (express-validator, joi) | ALWAYS validate and sanitize user input (express-validator, joi)',
            '🔒 Helmet.js: Protege contra ataques comunes configurando headers HTTP seguros | Protects against common attacks by setting secure HTTP headers',
            '🔒 Rate Limiting: Prevenir brute force y DDoS (express-rate-limit) | Prevent brute force and DDoS (express-rate-limit)',
            '🔒 Environment Variables: Secrets en .env, NUNCA en código. Usar dotenv | Secrets in .env, NEVER in code. Use dotenv',
            '🔒 Dependencies Audit: npm audit regularmente, mantener packages actualizados | npm audit regularly, keep packages updated'
          ],
          code: `// Helmet.js - Security headers\nconst helmet = require('helmet');\napp.use(helmet()); // Sets various HTTP headers\n\n// Input Validation with express-validator\nconst { body, validationResult } = require('express-validator');\n\napp.post('/user',\n  body('email').isEmail().normalizeEmail(),\n  body('password').isLength({ min: 8 }),\n  (req, res) => {\n    const errors = validationResult(req);\n    if (!errors.isEmpty()) {\n      return res.status(400).json({ errors: errors.array() });\n    }\n    // Process validated data\n  }\n);\n\n// Rate Limiting\nconst rateLimit = require('express-rate-limit');\n\nconst limiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutes\n  max: 100 // limit each IP to 100 requests per windowMs\n});\n\napp.use('/api/', limiter);\n\n// Environment Variables\nrequire('dotenv').config();\n\nconst dbPassword = process.env.DB_PASSWORD; // ✅ Good\nconst apiKey = 'hardcoded-key'; // ❌ BAD! Never do this\n\n// SQL Injection Prevention\nconst { query } = require('your-db-library');\n\n// ❌ BAD - SQL Injection vulnerable\nconst userId = req.params.id;\nquery(\`SELECT * FROM users WHERE id = '\${userId}'\`);\n\n// ✅ GOOD - Parameterized query\nquery('SELECT * FROM users WHERE id = ?', [userId]);`
        },
        {
          topic: 'Performance Optimization / Optimización de Rendimiento',
          description: 'Técnicas para mejorar la velocidad y eficiencia de aplicaciones Node.js | Techniques to improve speed and efficiency of Node.js applications',
          points: [
            '🚀 Clustering: Aprovechar múltiples CPU cores mediante cluster module o PM2 | Leverage multiple CPU cores via cluster module or PM2',
            '🚀 Caching: Redis/Memcached para datos frecuentes. Reduce llamadas a DB | Redis/Memcached for frequent data. Reduces DB calls',
            '🚀 Compression: gzip/brotli para respuestas HTTP (compression middleware) | gzip/brotli for HTTP responses (compression middleware)',
            '🚀 Connection Pooling: Reutilizar conexiones DB en lugar de crear nuevas | Reuse DB connections instead of creating new ones',
            '🚀 Async: Preferir async/await sobre callbacks. Node ≥18 usa nativamente más async ops | Prefer async/await over callbacks. Node ≥18 uses natively more async ops'
          ],
          code: `// Clustering - utilize all CPU cores\nconst cluster = require('cluster');\nconst os = require('os');\nconst numCPUs = os.cpus().length;\n\nif (cluster.isMaster) {\n  console.log(\`Master \${process.pid} is running\`);\n  // Fork workers\n  for (let i = 0; i < numCPUs; i++) {\n    cluster.fork();\n  }\n  cluster.on('exit', (worker) => {\n    console.log(\`Worker \${worker.process.pid} died\`);\n    cluster.fork(); // Replace dead worker\n  });\n} else {\n  // Workers share TCP connection\n  require('./app.js').listen(3000);\n  console.log(\`Worker \${process.pid} started\`);\n}\n\n// Caching with Redis\nconst redis = require('redis');\nconst client = redis.createClient();\n\napp.get('/data/:id', async (req, res) => {\n  const { id } = req.params;\n  \n  // Check cache first\n  const cached = await client.get(\`data:\${id}\`);\n  if (cached) {\n    return res.json(JSON.parse(cached));\n  }\n  \n  // Get from DB if not cached\n  const data = await database.getData(id);\n  \n  // Store in cache for 1 hour\n  await client.setEx(\`data:\${id}\`, 3600, JSON.stringify(data));\n  \n  res.json(data);\n});\n\n// Compression\nconst compression = require('compression');\napp.use(compression()); // Compresses all responses\n\n// Connection Pooling (PostgreSQL example)\nconst { Pool } = require('pg');\nconst pool = new Pool({\n  max: 20, // Maximum connections\n  idleTimeoutMillis: 30000\n});\n\nconst result = await pool.query('SELECT * FROM users');`
        },
        {
          topic: 'Testing / Pruebas',
          description: 'Estrategias para testing de aplicaciones Node.js con Jest y Supertest | Strategies for testing Node.js applications with Jest and Supertest',
          points: [
            '🧪 Unit Tests: Probar funciones/módulos individuales aisladamente (Jest, Mocha) | Test individual functions/modules in isolation (Jest, Mocha)',
            '🧪 Integration Tests: Probar múltiples módulos trabajando juntos | Test multiple modules working together',
            '🧪 API Tests: Probar endpoints HTTP (Supertest + Jest) | Test HTTP endpoints (Supertest + Jest)',
            '🧪 Mocking: Simular dependencias externas (DB, APIs) con jest.mock() | Simulate external dependencies (DB, APIs) with jest.mock()',
            '🧪 Coverage: Medir cobertura de tests con jest --coverage. Target: >80% | Measure test coverage with jest --coverage. Target: >80%'
          ],
          code: `// math.js\nfunction add(a, b) {\n  return a + b;\n}\n\nfunction divide(a, b) {\n  if (b === 0) throw new Error('Division by zero');\n  return a / b;\n}\n\nmodule.exports = { add, divide };\n\n// math.test.js\nconst { add, divide } = require('./math');\n\ndescribe('Math Functions', () => {\n  test('add should sum two numbers', () => {\n    expect(add(2, 3)).toBe(5);\n    expect(add(-1, 1)).toBe(0);\n  });\n\n  test('divide should divide numbers', () => {\n    expect(divide(10, 2)).toBe(5);\n  });\n\n  test('divide should throw error on zero', () => {\n    expect(() => divide(10, 0)).toThrow('Division by zero');\n  });\n});\n\n// API Testing with Supertest\nconst request = require('supertest');\nconst app = require('./app');\n\ndescribe('API Endpoints', () => {\n  test('GET /api/users should return users', async () => {\n    const res = await request(app)\n      .get('/api/users')\n      .expect(200)\n      .expect('Content-Type', /json/);\n    \n    expect(Array.isArray(res.body)).toBe(true);\n  });\n\n  test('POST /api/users should create user', async () => {\n    const newUser = { name: 'John', email: 'john@test.com' };\n    \n    const res = await request(app)\n      .post('/api/users')\n      .send(newUser)\n      .expect(201);\n    \n    expect(res.body).toHaveProperty('id');\n    expect(res.body.name).toBe('John');\n  });\n});\n\n// Mocking\njest.mock('./database');\nconst db = require('./database');\n\ntest('getUserById should return user', async () => {\n  db.findById.mockResolvedValue({ id: 1, name: 'Test' });\n  \n  const user = await getUserById(1);\n  \n  expect(user.name).toBe('Test');\n  expect(db.findById).toHaveBeenCalledWith(1);\n});`
        }
      ]
    },
    apis: {
      id: 'apis',
      title: 'APIs & Frameworks',
      subtitle: 'Express, Fastify, REST, GraphQL',
      icon: Zap,
      content: [
        {
          topic: 'Express.js - REST API',
          description: 'Framework web más popular',
          code: `const express = require('express');
const app = express();

// Middleware
app.use(express.json()); // Parse JSON body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded

// Logger middleware
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
});

// Routes
app.get('/api/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
});

app.post('/api/users', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

app.put('/api/users/:id', async (req, res) => {
  const user = await User.update(req.params.id, req.body);
  res.json(user);
});

app.delete('/api/users/:id', async (req, res) => {
  await User.delete(req.params.id);
  res.status(204).send();
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(3000, () => console.log('Server on port 3000'));`,
          points: [
            'Middleware: funciones que procesan requests',
            'Routing: GET, POST, PUT, DELETE',
            'req.params, req.query, req.body',
            'res.json(), res.status(), res.send()',
            'Error handling middleware al final'
          ]
        },
        {
          topic: 'Fastify - Performance',
          description: 'Framework rápido con validación de schemas',
          code: `const fastify = require('fastify')({ logger: true });

// Schema validation con JSON Schema
const userSchema = {
  body: {
    type: 'object',
    required: ['name', 'email'],
    properties: {
      name: { type: 'string', minLength: 3 },
      email: { type: 'string', format: 'email' }
    }
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        email: { type: 'string' }
      }
    }
  }
};

// Routes con schema
fastify.post('/users', { schema: userSchema }, async (req, reply) => {
  const user = await User.create(req.body);
  reply.code(201).send(user);
});

// Hooks
fastify.addHook('onRequest', async (req, reply) => {
  console.log('Request received');
});

// Plugins
fastify.register(require('@fastify/cors'));
fastify.register(require('@fastify/helmet'));

await fastify.listen({ port: 3000 });`,
          points: [
            '2x más rápido que Express',
            'Validación de schemas automática',
            'Serialización JSON optimizada',
            'Plugin architecture',
            'TypeScript support out of the box'
          ]
        },
        {
          topic: 'Authentication & JWT',
          description: 'Autenticación con JSON Web Tokens',
          code: `const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await User.create({
    email,
    password: hashedPassword
  });
  
  res.status(201).json({ id: user.id, email: user.email });
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findByEmail(email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  
  // Verify password
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  
  // Generate JWT
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  res.json({ token });
});

// Auth Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'No token' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Protected route
app.get('/profile', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json(user);
});`,
          points: [
            'bcrypt para hash de passwords',
            'JWT: stateless authentication',
            'Token en header: Authorization: Bearer <token>',
            'Middleware para proteger rutas',
            'Refresh tokens para sesiones largas'
          ]
        },
        {
          topic: 'GraphQL con Apollo Server',
          description: 'API flexible con GraphQL',
          code: `const { ApolloServer, gql } = require('apollo-server');

// Schema
const typeDefs = gql\`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }
  
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }
  
  type Query {
    user(id: ID!): User
    users: [User!]!
    posts: [Post!]!
  }
  
  type Mutation {
    createUser(name: String!, email: String!): User!
    createPost(title: String!, content: String!, authorId: ID!): Post!
  }
\`;

// Resolvers
const resolvers = {
  Query: {
    user: (_, { id }) => User.findById(id),
    users: () => User.findAll(),
    posts: () => Post.findAll()
  },
  
  Mutation: {
    createUser: (_, { name, email }) => User.create({ name, email }),
    createPost: (_, { title, content, authorId }) => 
      Post.create({ title, content, authorId })
  },
  
  User: {
    posts: (user) => Post.findByAuthorId(user.id)
  },
  
  Post: {
    author: (post) => User.findById(post.authorId)
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(\`Server at \${url}\`));`,
          points: [
            'Schema-first development',
            'Queries: solicitar datos específicos',
            'Mutations: modificar datos',
            'Resolvers: funciones que obtienen los datos',
            'No over-fetching ni under-fetching'
          ]
        }
      ]
    },
    interview: {
      id: 'interview',
      title: 'Interview Questions',
      subtitle: tx('Preguntas frecuentes por nivel', 'Frequently asked questions by level'),
      icon: MessageCircleQuestion,
      content: {
        junior: [
          { q: '¿Qué es Node.js?', a: 'Runtime de JavaScript construido sobre V8 de Chrome. Permite ejecutar JS en el servidor con I/O asíncrono y non-blocking.' },
          { q: '¿Qué es NPM?', a: 'Node Package Manager. Sistema de gestión de paquetes para JavaScript. Registry con millones de librerías.' },
          { q: 'Callback vs Promise vs Async/Await', a: 'Callback: función pasada como argumento. Promise: objeto con then/catch. Async/Await: syntax sugar sobre promises.' },
          { q: '¿Qué es el Event Loop?', a: 'Mecanismo que permite operaciones asíncronas en un solo thread. Procesa callbacks en fases: timers, I/O, check.' },
          { q: 'CommonJS vs ES Modules', a: 'CommonJS usa require/module.exports (sync). ESM usa import/export (async). ESM es el estándar moderno.' }
        ],
        mid: [
          { q: 'Explica las fases del Event Loop', a: 'Timers → Pending → Poll → Check → Close. Cada fase tiene una queue de callbacks. Process.nextTick tiene prioridad.' },
          { q: '¿Cómo manejar errores en async?', a: 'Try/catch con async/await. .catch() con promises. Error middleware en Express. process.on("uncaughtException").' },
          { q: 'Streams: cuándo usarlos', a: 'Para archivos grandes, video/audio streaming. Memoria eficiente al procesar chunks. Readable, Writable, Transform, Duplex.' },
          { q: 'Clustering en Node.js', a: 'Cluster module para aprovechar múltiples CPUs. Master process spawn workers. PM2 gestiona clustering automáticamente.' },
          { q: 'Diferencia entre setImmediate vs setTimeout(0)', a: 'setImmediate ejecuta en check phase. setTimeout(0) en timers. En I/O callback, setImmediate siempre primero.' }
        ],
        senior: [
          { q: 'Diseña un sistema de rate limiting', a: 'Token bucket o sliding window. Redis para storage distribuido. Considera: IP, user ID, endpoints. Implementa 429 status.' },
          { q: 'Memory leaks: cómo detectar y prevenir', a: 'Heap snapshots en Chrome DevTools. --inspect flag. Evita: closures innecesarias, event listeners sin cleanup, caché infinito.' },
          { q: 'Optimización de performance en Node', a: 'Clustering, caching (Redis), CDN, compresión, lazy loading, pagination, indexing DB, connection pooling.' },
          { q: 'Microservices con Node: challenges', a: 'Service discovery, circuit breakers, distributed tracing, eventual consistency, API gateway, message queues.' },
          { q: 'Security best practices', a: 'Helmet.js, CORS config, rate limiting, input validation, SQL injection prevention, HTTPS, secrets en env vars, dependency audit.' }
        ]
      }
    }
  };

  const sectionList = Object.values(sections);
  const currentSection = sections[activeSection];
  const SectionIcon = currentSection.icon;

  const renderFundamentals = () => (
    <div className="space-y-6">
      {currentSection.content.map((item, idx) => {
        const isExpanded = expandedFundamentals[idx];

        return (
          <div key={idx} className="bg-slate-900/50 border border-emerald-500/30 rounded-xl overflow-hidden">
            {/* Header */}
            <button
              onClick={() => toggleFundamental(idx)}
              className="w-full flex items-center justify-between p-6 hover:bg-slate-900/70 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <SiNodedotjs className="w-6 h-6 text-emerald-400" />
                <h3 className="text-xl font-bold text-emerald-400">{pickSlash(item.topic)}</h3>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </button>

            {/* Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <p className="text-slate-400 text-sm mb-4">
                      <span className="text-slate-300">{pickPipe(item.description)}</span>
                    </p>

                    <ul className="space-y-2 mb-4">
                      {item.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 text-sm">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          <span className="text-slate-300">
                            <span>{pickPipe(point)}</span>
                          </span>
                        </li>
                      ))}
                    </ul>

                    {item.code && (
                      <div>
                        <CodeBlock code={item.code} language="javascript" />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );

  const renderAPIs = () => (
    <div className="space-y-6">
      {currentSection.content.map((item, idx) => (
        <div key={idx} className="bg-slate-900/50 border border-emerald-500/30 rounded-xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <Zap className="w-6 h-6 text-emerald-400 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-emerald-400">{item.topic}</h3>
              <p className="text-slate-400 text-sm">{item.description}</p>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 mb-4 overflow-x-auto">
            <CodeBlock code={item.code} language="javascript" />
          </div>

          <ul className="space-y-2 ml-9">
            {item.points.map((point, pIdx) => (
              <li key={pIdx} className="flex items-start gap-2 text-slate-300 text-sm">
                <span className="text-emerald-400">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const renderInterview = () => (
    <div className="space-y-6">
      {Object.entries(currentSection.content).map(([level, questions]) => {
        const isLevelExpanded = expandedLevels[level];

        return (
          <div key={level} className="bg-slate-900/50 border border-emerald-500/30 rounded-xl overflow-hidden">
            {/* Level Header */}
            <button
              onClick={() => toggleLevel(level)}
              className="w-full flex items-center justify-between p-6 hover:bg-slate-900/70 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <MessageCircleQuestion className="w-6 h-6 text-emerald-400" />
                <h3 className="text-2xl font-bold text-emerald-400 capitalize">{level} Level</h3>
                <span className="text-slate-500 text-sm">({questions.length} {tx('preguntas', 'questions')})</span>
              </div>
              <motion.div
                animate={{ rotate: isLevelExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </button>

            {/* Level Content */}
            <AnimatePresence>
              {isLevelExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 space-y-3">
                    {questions.map((item, idx) => {
                      const questionKey = `${level}-${idx}`;
                      const isQuestionExpanded = expandedQuestions[questionKey];

                      return (
                        <div key={idx} className="bg-slate-800/50 border border-slate-700/50 rounded-lg overflow-hidden">
                          {/* Question Header */}
                          <button
                            onClick={() => toggleQuestion(level, idx)}
                            className="w-full flex items-start justify-between p-4 hover:bg-slate-800/70 transition-colors text-left gap-3"
                          >
                            <div className="flex items-start gap-2 flex-1 min-w-0">
                              <span className="text-emerald-400 font-bold flex-shrink-0">Q{idx + 1}:</span>
                              <p className="font-semibold text-emerald-300 text-sm">
                                {pickSlash(item.q)}
                              </p>
                            </div>
                            <motion.div
                              animate={{ rotate: isQuestionExpanded ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="flex-shrink-0"
                            >
                              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </motion.div>
                          </button>

                          {/* Question Answer */}
                          <AnimatePresence>
                            {isQuestionExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 pt-2">
                                  {/* English Question */}
                                  {/* Answer */}
                                  <div className="flex items-start gap-2 ml-2 bg-slate-900/50 p-3 rounded border-l-2 border-green-400/50">
                                    <span className="text-green-400 font-bold flex-shrink-0">A:</span>
                                    <div className="text-sm">
                                      <p className="text-slate-200 leading-relaxed">{pickPipe(item.a)}</p>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'fundamentals': return renderFundamentals();
      case 'apis': return renderAPIs();
      case 'interview': return renderInterview();
      default: return renderFundamentals();
    }
  };

  return (
    <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-2 overflow-y-auto pr-2">
        <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
          <SiNodedotjs className="w-6 h-6" />
          {t('node', language).title}
        </h3>
        {sectionList.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${activeSection === section.id
                ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-300'
                : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
            >
              <Icon className="w-5 h-5" />
              <div className="flex-1">
                <div className="font-semibold">{section.title}</div>
                <div className="text-xs opacity-70 line-clamp-1">{section.subtitle}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Content Panel */}
      <div className="lg:col-span-3 overflow-y-auto pr-2">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <SectionIcon className="w-8 h-8 text-emerald-400" />
            <h2 className="text-3xl font-bold text-emerald-400">{currentSection.title}</h2>
          </div>
          <p className="text-slate-400">{currentSection.subtitle}</p>
        </div>
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default NodePro;
