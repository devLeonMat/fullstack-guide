// Python interview questions as plain data (no JSX). Short, spoken-style answers.

export function buildPythonInterview(tx) {
  return [
    {
      level: 'Junior',
      items: [
        {
          q: tx('¿Qué es el GIL?', 'What is the GIL?'),
          a: tx(
            'Un candado de CPython que deja que un solo hilo ejecute código Python a la vez. No molesta en I/O, porque se libera mientras esperas red o disco, pero impide usar varios núcleos con hilos en tareas de CPU. Para eso se usa multiprocessing. Desde 3.13 existe una versión sin GIL (free-threaded), todavía opcional.',
            'A CPython lock that lets only one thread run Python code at a time. It doesn’t hurt I/O, since it’s released while you wait on network or disk, but it prevents using multiple cores with threads for CPU work. That’s what multiprocessing is for. Since 3.13 there’s a free-threaded build without the GIL, still optional.'
          ),
          inPractice: tx(
            'Mis Lambdas en Python de AgentCloud eran casi todo I/O (S3, SQS), así que el GIL nunca fue el cuello de botella.',
            'My Python Lambdas at AgentCloud were almost all I/O (S3, SQS), so the GIL was never the bottleneck.'
          ),
        },
        {
          q: tx('¿List vs tuple?', 'List vs tuple?'),
          a: tx(
            'La lista se puede modificar; la tupla no. Por ser inmutable, la tupla puede ser clave de un dict y ocupa un poco menos. Uso tupla para datos fijos, como un par (moneda, monto).',
            'A list can be modified; a tuple can’t. Because it’s immutable, a tuple can be a dict key and takes a bit less memory. I use tuples for fixed data, like a (currency, amount) pair.'
          ),
        },
        {
          q: tx('¿is vs ==?', 'is vs ==?'),
          a: tx(
            '== compara valores; is compara si es el mismo objeto. is solo para None, True y False. Dos listas [1, 2] son == pero no is.',
            '== compares values; is checks whether it’s the same object. Use is only for None, True and False. Two [1, 2] lists are == but not is.'
          ),
        },
        {
          q: tx('¿Qué son *args y **kwargs?', 'What are *args and **kwargs?'),
          a: tx(
            '*args recibe los argumentos posicionales extra como tupla; **kwargs, los nombrados extra como diccionario. Son útiles para wrappers y decoradores que tienen que pasar todo tal cual a otra función.',
            '*args receives extra positional arguments as a tuple; **kwargs, extra keyword arguments as a dict. They’re handy for wrappers and decorators that must pass everything through to another function.'
          ),
        },
      ],
    },
    {
      level: 'Mid',
      items: [
        {
          q: tx('¿Generadores vs iteradores?', 'Generators vs iterators?'),
          a: tx(
            'Un iterador es cualquier objeto con __iter__ y __next__. Un generador es la forma fácil de crear uno: una función con yield que produce valores de a uno, sin cargar todo en memoria. Todo generador es iterador, no al revés.',
            'An iterator is any object with __iter__ and __next__. A generator is the easy way to make one: a function with yield that produces values one at a time without loading everything into memory. Every generator is an iterator, not the other way around.'
          ),
          inPractice: tx(
            'Para procesar archivos grandes conviene leer línea por línea con un generador en vez de cargar todo con read().',
            'For large files it’s better to read line by line with a generator instead of loading everything with read().'
          ),
        },
        {
          q: tx('¿Cómo funcionan los decoradores?', 'How do decorators work?'),
          a: tx(
            '@decorador es lo mismo que func = decorador(func): una función que recibe otra y devuelve una versión envuelta con algo extra, como logs, reintentos o caché. Con @functools.wraps se conserva el nombre y la documentación de la original.',
            '@decorator is the same as func = decorator(func): a function that takes another and returns a wrapped version with something extra, like logging, retries or caching. @functools.wraps keeps the original’s name and docs.'
          ),
        },
        {
          q: tx('¿Qué es el MRO?', 'What is the MRO?'),
          a: tx(
            'El orden en que Python busca un método cuando hay herencia, sobre todo múltiple. Lo calcula con el algoritmo C3 y lo puedes ver en Clase.__mro__. super() sigue ese orden, por eso conviene usarlo siempre en vez de llamar al padre por nombre.',
            'The order Python follows to find a method when there’s inheritance, especially multiple inheritance. It’s computed with the C3 algorithm and you can see it in Class.__mro__. super() follows that order, which is why you should always use it instead of calling the parent by name.'
          ),
        },
        {
          q: tx('¿Para qué sirve __slots__?', 'What is __slots__ for?'),
          a: tx(
            'Declara de antemano los atributos de la clase y elimina el __dict__ de cada instancia. Ahorra bastante memoria cuando tienes muchísimos objetos. A cambio, no puedes agregar atributos nuevos al vuelo. En dataclasses: @dataclass(slots=True).',
            'It declares the class attributes up front and drops each instance’s __dict__. It saves a lot of memory when you have huge numbers of objects. In exchange, you can’t add new attributes on the fly. With dataclasses: @dataclass(slots=True).'
          ),
        },
      ],
    },
    {
      level: 'Senior',
      items: [
        {
          q: tx('¿Cómo optimizarías un script lento?', 'How would you optimize a slow script?'),
          a: tx(
            'Primero mido con cProfile para ver dónde se va el tiempo; casi nunca es donde uno cree. Después: estructuras correctas (un set en vez de buscar en una lista), generadores para datos grandes, lru_cache para funciones puras caras, NumPy si hay cálculo numérico, y multiprocessing o asyncio según sea CPU o I/O.',
            'First I measure with cProfile to see where time goes; it’s rarely where you think. Then: the right structures (a set instead of searching a list), generators for large data, lru_cache for expensive pure functions, NumPy for numeric work, and multiprocessing or asyncio depending on CPU vs I/O.'
          ),
        },
        {
          q: tx('Explica el event loop de asyncio', 'Explain asyncio’s event loop'),
          a: tx(
            'Un solo hilo con una cola de corrutinas. Cuando una llega a un await de I/O, cede el control y el loop atiende otra. El sistema operativo avisa cuando el I/O terminó y esa corrutina vuelve a la cola. Así un proceso maneja miles de conexiones. Lo que lo rompe: llamar algo bloqueante (requests, time.sleep) dentro de una corrutina.',
            'One thread with a queue of coroutines. When one hits an I/O await, it yields and the loop serves another. The OS signals when the I/O is done and that coroutine goes back in the queue. That’s how one process handles thousands of connections. What breaks it: calling something blocking (requests, time.sleep) inside a coroutine.'
          ),
          inPractice: tx(
            'Es la misma regla que en WebFlux en Java, que uso en Scotiabank: nunca bloquear el hilo del event loop.',
            'It’s the same rule as WebFlux in Java, which I use at Scotiabank: never block the event loop thread.'
          ),
        },
        {
          q: tx('¿Multiprocessing vs threading vs asyncio?', 'Multiprocessing vs threading vs asyncio?'),
          a: tx(
            'Threading: hilos que comparten memoria; sirve para I/O, pero por el GIL no aprovecha varios núcleos. Multiprocessing: procesos separados, paralelismo real para CPU, con el costo de copiar datos entre ellos. asyncio: un solo hilo, ideal para muchísimas conexiones de I/O con poco consumo.',
            'Threading: threads sharing memory; fine for I/O, but because of the GIL it can’t use multiple cores. Multiprocessing: separate processes, real parallelism for CPU, at the cost of copying data between them. asyncio: one thread, ideal for huge numbers of I/O connections with little overhead.'
          ),
        },
        {
          q: tx('¿Cómo libera memoria CPython?', 'How does CPython free memory?'),
          a: tx(
            'Principalmente con conteo de referencias: cuando nadie apunta a un objeto, se libera en el acto. Para los ciclos (A apunta a B y B a A) hay un recolector generacional aparte en el módulo gc. Por eso en Python la memoria se libera de forma más predecible que en Java.',
            'Mainly through reference counting: when nothing points to an object, it’s freed on the spot. For cycles (A points to B and B to A) there’s a separate generational collector in the gc module. That’s why Python frees memory more predictably than Java.'
          ),
        },
        {
          q: tx('¿Qué cuidas al escribir una Lambda en Python?', 'What do you watch for when writing a Python Lambda?'),
          a: tx(
            'Crear los clientes (boto3, conexiones) fuera del handler para reutilizarlos entre invocaciones, mantener el paquete liviano para que el cold start sea corto, hacer el procesamiento idempotente porque un evento puede llegar dos veces, y tener una dead-letter queue para lo que falle siempre.',
            'Create clients (boto3, connections) outside the handler so they’re reused across invocations, keep the package small so cold starts stay short, make processing idempotent since an event can arrive twice, and have a dead-letter queue for whatever always fails.'
          ),
          inPractice: tx(
            'Así estaban hechas las Lambdas de procesamiento documental y tareas programadas en AgentCloud.',
            'That’s how the document-processing and scheduled-job Lambdas were built at AgentCloud.'
          ),
        },
      ],
    },
  ];
}
