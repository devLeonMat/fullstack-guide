// Kotlin interview questions as plain data (no JSX). Short, spoken-style answers,
// often contrasted with Java since that's the background they build on.

export function buildKotlinInterview(tx) {
  return [
    {
      level: 'Junior',
      items: [
        {
          q: tx('¿val vs var?', 'val vs var?'),
          a: tx(
            'val no se puede reasignar, como final en Java; var sí. Uso val por defecto y var solo cuando de verdad cambia. Ojo: val no hace inmutable al objeto; una val de una MutableList se puede seguir modificando.',
            'val can’t be reassigned, like final in Java; var can. I use val by default and var only when it really changes. Careful: val doesn’t make the object immutable; a val holding a MutableList can still be modified.'
          ),
        },
        {
          q: tx('¿Qué es null safety?', 'What is null safety?'),
          a: tx(
            'El tipo dice si algo puede ser null: String nunca lo es, String? sí. El compilador no te deja usar un String? sin manejar el null, con ?. (llamada segura), ?: (valor por defecto) o !! (forzar, y arriesgar la excepción). La mayoría de los NullPointerException desaparecen al compilar.',
            'The type says whether something can be null: String never is, String? can be. The compiler won’t let you use a String? without handling null, via ?. (safe call), ?: (default value) or !! (force it, and risk the exception). Most NullPointerExceptions are caught at compile time.'
          ),
          inPractice: tx(
            'Viniendo de Java, el punto débil está en la interoperabilidad: lo que devuelve una librería Java llega como “tipo de plataforma” y Kotlin no puede garantizar nada. Ahí conviene declarar el tipo explícito.',
            'Coming from Java, the weak spot is interop: what a Java library returns arrives as a “platform type” and Kotlin can’t guarantee anything. That’s where you should declare the type explicitly.'
          ),
        },
        {
          q: tx('¿Data class vs clase normal?', 'Data class vs regular class?'),
          a: tx(
            'Una data class te genera equals, hashCode, toString, copy y componentN a partir del constructor. Es el equivalente a un record de Java, pero con copy() para crear variantes sin mutar.',
            'A data class generates equals, hashCode, toString, copy and componentN from the constructor. It’s the equivalent of a Java record, plus copy() to create variants without mutating.'
          ),
        },
        {
          q: tx('¿Qué es un companion object?', 'What is a companion object?'),
          a: tx(
            'Kotlin no tiene static; el companion object es un objeto único dentro de la clase donde pones constantes y factories. Desde Java se ve como Clase.Companion, salvo que uses @JvmStatic.',
            'Kotlin has no static; the companion object is a single object inside the class where you put constants and factories. From Java it shows up as Class.Companion, unless you use @JvmStatic.'
          ),
        },
      ],
    },
    {
      level: 'Mid',
      items: [
        {
          q: tx('¿Coroutines vs threads?', 'Coroutines vs threads?'),
          a: tx(
            'Una coroutine es una tarea liviana que se suspende sin bloquear el hilo, así que miles pueden compartir unos pocos hilos. Uso coroutines para I/O y concurrencia en general, y hilos o Dispatchers.Default solo para trabajo de CPU.',
            'A coroutine is a lightweight task that suspends without blocking the thread, so thousands can share a few threads. I use coroutines for I/O and concurrency in general, and threads or Dispatchers.Default only for CPU work.'
          ),
          inPractice: tx(
            'Es la misma idea que los virtual threads o WebFlux en Java: atender mucho I/O con pocos hilos. En Kotlin se escribe como código secuencial con suspend.',
            'It’s the same idea as virtual threads or WebFlux in Java: serve lots of I/O with few threads. In Kotlin you write it as sequential code with suspend.'
          ),
        },
        {
          q: tx('Scope functions: let, run, apply, also, with', 'Scope functions: let, run, apply, also, with'),
          a: tx(
            'Todas ejecutan un bloque sobre un objeto; cambian en cómo lo nombras (it o this) y qué devuelven. Mi regla corta: apply para configurar un objeto, let para trabajar con un valor que puede ser null, also para efectos secundarios como logs.',
            'They all run a block on an object; they differ in how you refer to it (it or this) and what they return. My short rule: apply to configure an object, let to work with a value that may be null, also for side effects like logging.'
          ),
        },
        {
          q: tx('¿Sealed classes: cuándo y por qué?', 'Sealed classes: when and why?'),
          a: tx(
            'Para un conjunto cerrado de casos que el compilador conoce: estados de pantalla (Cargando, Éxito, Error) o resultados de una operación. El when sobre una sealed class es exhaustivo, así que si agregas un caso, el compilador te muestra todo lo que falta actualizar.',
            'For a closed set of cases the compiler knows about: screen states (Loading, Success, Error) or operation results. A when over a sealed class is exhaustive, so if you add a case, the compiler shows you everything that needs updating.'
          ),
        },
        {
          q: tx('¿Flow vs LiveData?', 'Flow vs LiveData?'),
          a: tx(
            'LiveData es de Android y está atado al ciclo de vida. Flow es Kotlin puro: se testea sin Android y tiene operadores (map, debounce, combine). Hoy en un ViewModel se usa StateFlow; LiveData queda para código existente.',
            'LiveData is Android-specific and tied to the lifecycle. Flow is pure Kotlin: testable without Android and full of operators (map, debounce, combine). Today a ViewModel uses StateFlow; LiveData stays for existing code.'
          ),
        },
      ],
    },
    {
      level: 'Senior',
      items: [
        {
          q: tx('¿Cómo evita structured concurrency los leaks?', 'How does structured concurrency prevent leaks?'),
          a: tx(
            'Toda coroutine vive dentro de un scope. Si el scope se cancela (por ejemplo, viewModelScope cuando se destruye el ViewModel), se cancelan todas sus hijas. Y si una hija falla, cancela a sus hermanas. No quedan tareas huérfanas corriendo. Por eso GlobalScope casi nunca es buena idea.',
            'Every coroutine lives inside a scope. If the scope is cancelled (say, viewModelScope when the ViewModel is destroyed), all its children are cancelled. And if one child fails, it cancels its siblings. No orphan tasks are left running. That’s why GlobalScope is almost never a good idea.'
          ),
        },
        {
          q: tx('StateFlow vs SharedFlow', 'StateFlow vs SharedFlow'),
          a: tx(
            'StateFlow siempre tiene un valor actual y quien se suscribe lo recibe de inmediato: sirve para estado. SharedFlow no guarda valor por defecto y se configura cuántos eventos reenvía: sirve para eventos de una sola vez, como mostrar un mensaje o navegar.',
            'StateFlow always has a current value and new subscribers get it right away: it’s for state. SharedFlow keeps no value by default and you configure how many events it replays: it’s for one-off events, like showing a message or navigating.'
          ),
        },
        {
          q: tx('¿Cuándo usarías Kotlin Multiplatform?', 'When would you use Kotlin Multiplatform?'),
          a: tx(
            'Cuando quieres compartir lógica de negocio, red y datos entre Android e iOS, pero mantener la UI nativa en cada plataforma. Frente a React Native, compartes menos UI pero ganas rendimiento y acceso nativo directo.',
            'When you want to share business logic, networking and data between Android and iOS while keeping native UI on each platform. Compared to React Native, you share less UI but gain performance and direct native access.'
          ),
          inPractice: tx(
            'Mis apps móviles multiplataforma las hice con React Native (Lynk, Banco GNB, AgentCloud), así que esta es la comparación que me toca explicar.',
            'I built my cross-platform mobile apps with React Native (Lynk, Banco GNB, AgentCloud), so this is the comparison I usually have to explain.'
          ),
        },
        {
          q: tx('¿inline + reified: cómo funcionan?', 'inline + reified: how do they work?'),
          a: tx(
            'Una función inline copia su cuerpo en cada lugar donde se llama, y eso evita crear objetos para las lambdas. Como el código se copia, el compilador conoce el tipo genérico real en cada llamada, y con reified puedes usar T::class dentro. Sin eso, el tipo se borra como en Java.',
            'An inline function copies its body into every call site, which avoids allocating objects for lambdas. Since the code is copied, the compiler knows the real generic type at each call, and with reified you can use T::class inside. Without it, the type is erased like in Java.'
          ),
        },
      ],
    },
  ];
}
