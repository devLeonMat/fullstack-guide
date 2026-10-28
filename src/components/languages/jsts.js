// JavaScript / TypeScript interview questions as plain data (no JSX).
// Short, spoken-style answers; tables kept where a comparison reads better.

export function buildJsTsInterview(tx) {
  return [
    {
      level: 'Junior',
      items: [
        {
          q: tx('¿Qué es un closure?', 'What is a closure?'),
          a: tx(
            'Una función que recuerda las variables del lugar donde se creó, aunque se ejecute después y en otro lado. Pasa cada vez que defines una función dentro de otra. Sirve para estado privado, memoización o callbacks que necesitan “acordarse” de algo.',
            'A function that remembers the variables from where it was created, even when it runs later somewhere else. It happens every time you define a function inside another. It’s used for private state, memoization or callbacks that need to “remember” something.'
          ),
          inPractice: tx(
            'En React es la causa de los “stale closures”: un useEffect o un setInterval que ve un estado viejo porque la función se creó en un render anterior.',
            'In React it’s the cause of “stale closures”: a useEffect or setInterval that sees old state because the function was created in an earlier render.'
          ),
        },
        {
          q: tx('var vs let vs const', 'var vs let vs const'),
          a: tx(
            'Uso const por defecto y let cuando necesito reasignar; var no. La trampa clásica: con var en un for, todos los callbacks asíncronos comparten la misma variable (imprime 3, 3, 3); con let cada vuelta tiene la suya (0, 1, 2).',
            'I use const by default and let when I need to reassign; never var. The classic trap: with var in a for loop, every async callback shares the same variable (prints 3, 3, 3); with let each iteration gets its own (0, 1, 2).'
          ),
          table: {
            headers: ['', 'var', 'let', 'const'],
            rows: [
              ['Scope', tx('Función', 'Function'), tx('Bloque', 'Block'), tx('Bloque', 'Block')],
              ['Hoisting', tx('sí, vale undefined', 'yes, as undefined'), tx('sí, en TDZ', 'yes, in TDZ'), tx('sí, en TDZ', 'yes, in TDZ')],
              [tx('Re-declarable', 'Re-declarable'), tx('Sí', 'Yes'), 'No', 'No'],
              [tx('Re-asignable', 'Re-assignable'), tx('Sí', 'Yes'), tx('Sí', 'Yes'), 'No'],
            ],
          },
        },
        {
          q: tx('¿Qué es hoisting?', 'What is hoisting?'),
          a: tx(
            'Antes de ejecutar, el motor registra todas las declaraciones de su scope. Las function declarations quedan listas para usarse antes de su línea. var existe pero vale undefined. let, const y class existen pero no se pueden tocar hasta su línea (la “temporal dead zone”).',
            'Before running, the engine registers every declaration in its scope. Function declarations are ready to use before their line. var exists but is undefined. let, const and class exist but can’t be touched until their line (the “temporal dead zone”).'
          ),
        },
        {
          q: '== vs ===',
          a: tx(
            '=== compara sin convertir tipos; == convierte antes de comparar y da sorpresas. Uso siempre ===, con una sola excepción aceptada: x == null, que cubre null y undefined a la vez.',
            '=== compares without converting types; == converts first and gives surprises. I always use ===, with one accepted exception: x == null, which covers null and undefined at once.'
          ),
          table: {
            headers: [tx('operandos', 'operands'), '==', '==='],
            rows: [
              ['1, "1"', 'true', 'false'],
              ['null, undefined', 'true', 'false'],
              ['0, false', 'true', 'false'],
              ['NaN, NaN', 'false', 'false'],
            ],
          },
        },
        {
          q: 'typeof vs instanceof',
          a: tx(
            'typeof te dice el tipo primitivo como texto; instanceof revisa la cadena de prototipos. Dos trampas: typeof null es "object", y para arrays conviene Array.isArray().',
            'typeof gives you the primitive type as a string; instanceof checks the prototype chain. Two traps: typeof null is "object", and for arrays use Array.isArray().'
          ),
          table: {
            headers: ['', 'typeof', 'instanceof'],
            rows: [
              [tx('Qué revisa', 'What it checks'), tx('Tipo primitivo', 'Primitive type'), tx('Cadena de prototipos', 'Prototype chain')],
              ['typeof null', '"object" ⚠', '—'],
              ['typeof []', '"object"', '—'],
              ['[] instanceof Array', '—', 'true'],
            ],
          },
        },
        {
          q: 'null vs undefined',
          a: tx(
            'undefined es “nunca se asignó”; null es “vacío a propósito”. Lo pone el motor vs lo pones tú. Para revisar ambos a la vez: x ?? valorPorDefecto.',
            'undefined is “never assigned”; null is “empty on purpose”. The engine sets one, you set the other. To check both at once: x ?? defaultValue.'
          ),
        },
        {
          q: tx('Arrow function vs función normal', 'Arrow function vs regular function'),
          a: tx(
            'La diferencia que importa es this: la arrow lo toma del lugar donde se escribió; la normal lo decide según cómo la llamas. Por eso las arrows van bien en callbacks. Además no tienen arguments ni sirven como constructor.',
            'The difference that matters is this: an arrow takes it from where it was written; a regular function decides it by how you call it. That’s why arrows suit callbacks. They also have no arguments object and can’t be constructors.'
          ),
          table: {
            headers: ['', 'Arrow', tx('Normal', 'Regular')],
            rows: [
              ['this', tx('Léxico', 'Lexical'), tx('Según la llamada', 'By call site')],
              ['arguments', 'No', tx('Sí', 'Yes')],
              ['new', 'TypeError', tx('Sí', 'Yes')],
            ],
          },
        },
        {
          q: tx('Destructuring, spread y rest', 'Destructuring, spread and rest'),
          a: tx(
            'Destructuring saca valores de un objeto o array a variables: const { id, nombre = "?" } = usuario. Spread expande: { ...defaults, ...cambios }. Rest junta lo que sobra: const { password, ...publico } = usuario. Ojo: las copias son superficiales.',
            'Destructuring pulls values out of an object or array: const { id, name = "?" } = user. Spread expands: { ...defaults, ...changes }. Rest gathers the leftovers: const { password, ...safe } = user. Careful: copies are shallow.'
          ),
        },
      ],
    },
    {
      level: 'Mid',
      items: [
        {
          q: tx('Explica el event loop', 'Explain the event loop'),
          a: tx(
            'JavaScript corre en un solo hilo. Lo síncrono va al call stack; timers, I/O y fetch se resuelven afuera y sus callbacks esperan en colas. Cuando el stack queda vacío, el event loop vacía primero todas las microtasks (promesas) y recién después toma la siguiente macrotask (setTimeout). Por eso una promesa resuelta corre antes que un setTimeout de 0 ms.',
            'JavaScript runs on a single thread. Sync code goes on the call stack; timers, I/O and fetch are handled outside and their callbacks wait in queues. When the stack is empty, the event loop first drains every microtask (promises) and only then takes the next macrotask (setTimeout). That’s why a resolved promise runs before a 0 ms setTimeout.'
          ),
          inPractice: tx(
            'En servicios Node/NestJS (Intercorp, Lynk) la consecuencia práctica es que un cálculo pesado bloquea a todos los requests: eso va a un worker o a otro servicio.',
            'In Node/NestJS services (Intercorp, Lynk) the practical consequence is that a heavy computation blocks every request: that goes to a worker or another service.'
          ),
        },
        {
          q: tx('¿Promise vs async/await?', 'Promise vs async/await?'),
          a: tx(
            'async/await es azúcar sobre promesas: una función async siempre devuelve una promesa y await espera a que se resuelva. Se lee como código síncrono y los errores van con try/catch. El error común es hacer await en serie cuando las llamadas son independientes: ahí va Promise.all.',
            'async/await is sugar over promises: an async function always returns a promise and await waits for it to settle. It reads like sync code and errors go through try/catch. The common mistake is awaiting in sequence when calls are independent: that’s what Promise.all is for.'
          ),
          table: {
            headers: ['', 'Promise (.then)', 'async/await'],
            rows: [
              [tx('Errores', 'Errors'), '.catch()', 'try/catch'],
              [tx('Paralelo', 'Parallel'), 'Promise.all', 'await Promise.all'],
              ['Top-level', 'N/A', tx('En ES modules', 'In ES modules')],
            ],
          },
        },
        {
          q: tx('¿Cómo funciona this?', 'How does this work?'),
          a: tx(
            'this se decide al llamar la función, no al escribirla. Con new es la instancia nueva; con call/apply/bind es lo que pases; con obj.metodo() es obj; suelta es undefined en modo estricto. bind devuelve una función con this fijo, útil para pasar métodos como callbacks.',
            'this is decided when the function is called, not when it’s written. With new it’s the new instance; with call/apply/bind it’s what you pass; with obj.method() it’s obj; called bare it’s undefined in strict mode. bind returns a function with a fixed this, handy for passing methods as callbacks.'
          ),
        },
        {
          q: tx('Prototipos: ¿cómo funciona la herencia en JS?', 'Prototypes: how does inheritance work in JS?'),
          a: tx(
            'Cada objeto tiene un enlace a otro objeto, su prototipo. Si una propiedad no está en el objeto, JS la busca subiendo por esa cadena hasta llegar a null. Las class de ES6 son una sintaxis más cómoda sobre lo mismo.',
            'Every object links to another object, its prototype. If a property isn’t on the object, JS looks for it up that chain until it reaches null. ES6 classes are a nicer syntax over the same thing.'
          ),
        },
        {
          q: tx('¿Qué son los generadores?', 'What are generators?'),
          a: tx(
            'Funciones (function*) que pueden pausarse en cada yield y seguir después, conservando su estado. Sirven para secuencias perezosas e iterables propios. Fueron la base de librerías como redux-saga antes de async/await.',
            'Functions (function*) that can pause at each yield and resume later, keeping their state. They’re used for lazy sequences and custom iterables. They powered libraries like redux-saga before async/await.'
          ),
        },
        {
          q: 'WeakMap vs Map',
          a: tx(
            'WeakMap solo acepta objetos como clave y no impide que el GC los libere. Sirve para colgar datos privados a un objeto sin causar leaks. A cambio, no se puede recorrer ni saber su tamaño.',
            'WeakMap only takes objects as keys and doesn’t stop the GC from freeing them. It’s for attaching private data to an object without causing leaks. In exchange, you can’t iterate it or get its size.'
          ),
        },
        {
          q: 'Debounce vs throttle',
          a: tx(
            'Los dos limitan cuántas veces corre una función ante eventos seguidos. Debounce espera a que el usuario deje de escribir; throttle deja pasar como máximo una ejecución cada X ms.',
            'Both limit how often a function runs on rapid events. Debounce waits until the user stops typing; throttle lets through at most one run every X ms.'
          ),
          table: {
            headers: ['', 'Debounce', 'Throttle'],
            rows: [
              [tx('Ejecuta', 'Runs'), tx('Tras la última llamada', 'After the last call'), tx('Cada X ms mientras dispara', 'Every X ms while firing')],
              [tx('Típico', 'Typical'), tx('Buscador mientras escribes', 'Search as you type'), tx('Scroll, resize', 'Scroll, resize')],
            ],
          },
        },
        {
          q: tx('Optional chaining (?.) y nullish coalescing (??)', 'Optional chaining (?.) and nullish coalescing (??)'),
          a: tx(
            '?. corta la cadena y devuelve undefined si algo es null o undefined: usuario?.direccion?.calle. ?? usa el valor de la derecha solo si el de la izquierda es null o undefined, a diferencia de ||, que también pisa 0, "" y false.',
            '?. short-circuits and returns undefined if anything is null or undefined: user?.address?.street. ?? uses the right-hand value only when the left is null or undefined, unlike ||, which also overrides 0, "" and false.'
          ),
        },
      ],
    },
    {
      level: 'Senior',
      items: [
        {
          q: tx('¿Cómo funcionan los conditional types de TS?', 'How do TypeScript conditional types work?'),
          a: tx(
            'T extends U ? X : Y: un if a nivel de tipos, resuelto al compilar. Con infer sacas un tipo de adentro de otro (por ejemplo, lo que devuelve una promesa). Sobre uniones se aplican a cada miembro por separado. Así están hechos ReturnType, Awaited y Exclude.',
            'T extends U ? X : Y: an if at the type level, resolved at compile time. With infer you pull a type out of another (say, what a promise resolves to). Over unions they apply to each member separately. That’s how ReturnType, Awaited and Exclude are built.'
          ),
        },
        {
          q: tx('Structural vs nominal typing', 'Structural vs nominal typing'),
          a: tx(
            'TypeScript compara por forma: si un objeto tiene las propiedades que pide una interfaz, es compatible aunque nunca la haya “implementado”. Java compara por nombre. Para evitar mezclar, por ejemplo, un UserId con un OrderId que son ambos string, se usan “brands”.',
            'TypeScript compares by shape: if an object has the properties an interface asks for, it’s compatible even if it never “implemented” it. Java compares by name. To avoid mixing, say, a UserId and an OrderId that are both strings, people use “brands”.'
          ),
          inPractice: tx(
            'Viniendo de Java es lo primero que sorprende: en TS dos DTOs distintos con los mismos campos son intercambiables.',
            'Coming from Java it’s the first surprise: in TS two different DTOs with the same fields are interchangeable.'
          ),
        },
        {
          q: tx('Covarianza y contravarianza en TS', 'Covariance and contravariance in TS'),
          a: tx(
            'En posiciones de salida (lo que devuelves) un subtipo sirve donde se espera el tipo padre: covarianza. En posiciones de entrada (parámetros) es al revés: una función que acepta Animal sirve donde se espera una que acepta Dog. TS es permisivo con los parámetros de métodos por compatibilidad, aunque técnicamente no es seguro.',
            'In output positions (what you return) a subtype works where the parent type is expected: covariance. In input positions (parameters) it’s the reverse: a function that accepts Animal works where one accepting Dog is expected. TS is lenient with method parameters for compatibility, even though it’s technically unsound.'
          ),
        },
        {
          q: tx('¿Cómo optimiza V8 tu código?', 'How does V8 optimize your code?'),
          a: tx(
            'Primero interpreta y, cuando una función se usa mucho, la compila a código máquina optimizado. Esa optimización asume que los objetos tienen siempre la misma forma; si cambias el orden de las propiedades o el tipo de una variable, V8 descarta lo optimizado. Moraleja: objetos con forma estable.',
            'It first interprets and, when a function gets hot, compiles it to optimized machine code. That optimization assumes objects always have the same shape; if you change property order or a variable’s type, V8 throws the optimization away. Moral: keep object shapes stable.'
          ),
        },
        {
          q: tx('Microtasks vs macrotasks en detalle', 'Microtasks vs macrotasks in detail'),
          a: tx(
            'Después de cada macrotask se vacía toda la cola de microtasks, incluidas las que se agregan mientras se vacía; si encolas microtasks sin fin, bloqueas todo. En Node hay dos colas extra: process.nextTick, que va antes que las promesas, y setImmediate, que corre después del I/O.',
            'After each macrotask the whole microtask queue is drained, including ones added while draining; queue them endlessly and you block everything. Node adds two extra queues: process.nextTick, which runs before promises, and setImmediate, which runs after I/O.'
          ),
        },
        {
          q: tx('Tree shaking: ¿qué es y qué lo rompe?', 'Tree shaking: what is it and what breaks it?'),
          a: tx(
            'El bundler elimina el código que nadie importa, analizando los import/export de ES modules. Lo rompen require(), los barrel files con export * y los módulos con efectos secundarios; "sideEffects": false en package.json le dice al bundler que puede borrar sin miedo.',
            'The bundler drops code nobody imports, by analyzing ES module import/export. It’s broken by require(), barrel files with export * and modules with side effects; "sideEffects": false in package.json tells the bundler it can delete safely.'
          ),
        },
        {
          q: tx('¿Qué son Proxy y Reflect?', 'What are Proxy and Reflect?'),
          a: tx(
            'Proxy envuelve un objeto e intercepta operaciones como leer o escribir propiedades. Así funciona la reactividad de Vue 3, por ejemplo. Reflect expone esas mismas operaciones con su comportamiento normal, para delegar dentro del Proxy sin reimplementarlas.',
            'Proxy wraps an object and intercepts operations like reading or writing properties. That’s how Vue 3 reactivity works, for example. Reflect exposes those same operations with their default behavior, so you can delegate inside the Proxy without reimplementing them.'
          ),
        },
        {
          q: tx('¿Cómo funciona el GC de V8 y qué causa leaks?', 'How does V8’s GC work and what causes leaks?'),
          a: tx(
            'Es generacional: los objetos nuevos se limpian seguido y rápido; los que sobreviven pasan a una zona que se limpia menos. Libera lo que no es alcanzable desde las raíces. Los leaks típicos: listeners que nunca se quitan, timers sin limpiar y closures que retienen objetos grandes.',
            'It’s generational: new objects are collected often and quickly; survivors move to an area collected less often. It frees whatever isn’t reachable from the roots. Typical leaks: listeners never removed, timers never cleared and closures holding on to large objects.'
          ),
          inPractice: tx(
            'En React, la versión de esto es el useEffect sin función de limpieza: la suscripción o el intervalo sigue vivo después de desmontar el componente.',
            'In React, the version of this is a useEffect without a cleanup function: the subscription or interval stays alive after the component unmounts.'
          ),
        },
      ],
    },
  ];
}
