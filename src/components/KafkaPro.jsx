import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Radio, Layers, GitBranch, Send, Inbox, RefreshCw, ShieldCheck, Server, Hash, ArrowRight } from 'lucide-react';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';

// ─── Shared helpers ─────────────────────────────────────────────────────────────

const FlowArrow = () => (
  <ArrowRight className="w-4 h-4 text-orange-400/60 flex-shrink-0" />
);

// ─── Section 1: Overview ─────────────────────────────────────────────────────────

const OverviewDiagram = ({ tx }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % 3), 1600);
    return () => clearInterval(id);
  }, []);

  const steps = [
    { label: tx('Producer', 'Producer'), icon: Send },
    { label: tx('Topic (particionado)', 'Topic (partitioned)'), icon: Layers },
    { label: tx('Consumer Group', 'Consumer Group'), icon: Inbox },
  ];

  return (
    <div className="bg-slate-950/40 border border-orange-500/20 rounded-xl p-4 space-y-3">
      <p className="text-xs font-semibold text-orange-300 uppercase tracking-wider text-center">
        {tx('Flujo de un evento en Kafka', 'Event flow in Kafka')}
      </p>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2">
            <motion.div
              animate={{
                backgroundColor: active === i ? 'rgba(249,115,22,0.2)' : 'rgba(15,23,42,0.4)',
                borderColor: active === i ? 'rgba(249,115,22,0.5)' : 'rgba(100,116,139,0.2)',
              }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center gap-1 px-3 py-2 border rounded-xl min-w-[110px]"
            >
              <s.icon className="w-5 h-5 text-orange-400" />
              <span className="text-xs font-bold text-slate-200 text-center">{s.label}</span>
            </motion.div>
            {i < steps.length - 1 && <FlowArrow />}
          </div>
        ))}
      </div>
      <p className="text-[11px] text-slate-500 text-center">
        {tx('Un log distribuido, ordenado e inmutable — los consumers leen a su propio ritmo', 'A distributed, ordered, immutable log — consumers read at their own pace')}
      </p>
    </div>
  );
};

// ─── Section 2: Architecture (Brokers/Topics/Partitions) ────────────────────────

const ArchitectureDiagram = ({ tx }) => {
  const partitions = [
    { id: 0, leader: 'Broker 1' },
    { id: 1, leader: 'Broker 2' },
    { id: 2, leader: 'Broker 3' },
  ];

  return (
    <div className="bg-slate-950/40 border border-orange-500/20 rounded-xl p-4 space-y-3">
      <p className="text-xs font-semibold text-orange-300 uppercase tracking-wider text-center">
        {tx('Topic "orders" con 3 particiones', 'Topic "orders" with 3 partitions')}
      </p>
      <div className="grid grid-cols-3 gap-2">
        {partitions.map(p => (
          <div key={p.id} className="p-2.5 bg-orange-500/10 border border-orange-500/30 rounded-xl">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Hash className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-xs font-bold text-slate-200">P{p.id}</span>
            </div>
            <div className="flex gap-0.5 mb-1.5">
              {[0, 1, 2, 3].map(o => (
                <div key={o} className="w-3 h-4 bg-orange-500/30 border border-orange-500/40 rounded-sm" />
              ))}
            </div>
            <p className="text-[10px] text-slate-500">{tx('líder:', 'leader:')} {p.leader}</p>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-slate-500 text-center">
        {tx('Cada partición se replica en otros brokers (factor de replicación) para tolerancia a fallos', 'Each partition is replicated to other brokers (replication factor) for fault tolerance')}
      </p>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

function KafkaPro() {
  const { language } = useLanguage();
  const tx = (es, en) => language === 'en' ? en : es;
  const [active, setActive] = useState('overview');

  const sections = [
    {
      id: 'overview',
      title: tx('¿Qué es Kafka?', 'What is Kafka?'),
      subtitle: tx('Event streaming, pub/sub, log distribuido', 'Event streaming, pub/sub, distributed log'),
      icon: Radio,
    },
    {
      id: 'architecture',
      title: tx('Arquitectura', 'Architecture'),
      subtitle: tx('Brokers, Topics, Partitions, Replication', 'Brokers, Topics, Partitions, Replication'),
      icon: Server,
    },
    {
      id: 'producers',
      title: tx('Producers', 'Producers'),
      subtitle: tx('Keys, acks, idempotencia', 'Keys, acks, idempotence'),
      icon: Send,
    },
    {
      id: 'consumers',
      title: tx('Consumers', 'Consumers'),
      subtitle: tx('Consumer groups, offsets, rebalancing', 'Consumer groups, offsets, rebalancing'),
      icon: Inbox,
    },
    {
      id: 'delivery',
      title: tx('Garantías de entrega', 'Delivery Guarantees'),
      subtitle: tx('At-most/at-least/exactly-once, retention', 'At-most/at-least/exactly-once, retention'),
      icon: ShieldCheck,
    },
    {
      id: 'spring',
      title: 'Spring Kafka',
      subtitle: tx('@KafkaListener, KafkaTemplate', '@KafkaListener, KafkaTemplate'),
      icon: GitBranch,
    },
  ];

  // ─── Section renderers ────────────────────────────────────────────────────

  const renderOverview = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">{tx('¿Qué es Kafka?', 'What is Kafka?')}</h2>
        <p className="text-slate-400 text-sm">{tx('Plataforma de streaming de eventos distribuida, usada como bus de mensajería de alto throughput', 'Distributed event streaming platform, used as a high-throughput messaging bus')}</p>
      </div>

      <OverviewDiagram tx={tx} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { title: tx('Log distribuido', 'Distributed Log'), desc: tx('Los mensajes se agregan al final de un log inmutable (append-only). No se editan ni eliminan al leer — a diferencia de una cola tradicional.', 'Messages are appended to an immutable, append-only log. They are not edited or removed on read — unlike a traditional queue.'), icon: Layers },
          { title: tx('Pub/Sub desacoplado', 'Decoupled Pub/Sub'), desc: tx('Los producers no conocen a los consumers. Múltiples consumer groups pueden leer el mismo topic de forma independiente.', 'Producers don\'t know about consumers. Multiple consumer groups can read the same topic independently.'), icon: Radio },
          { title: tx('Alto throughput', 'High Throughput'), desc: tx('Diseñado para millones de mensajes/segundo mediante escritura secuencial en disco, batching y zero-copy.', 'Designed for millions of messages/sec via sequential disk writes, batching, and zero-copy.'), icon: Server },
        ].map(({ title, desc, icon: Icon }) => (
          <div key={title} className="bg-slate-800/30 border border-orange-500/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-bold text-orange-300">{title}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-950/40 border border-orange-500/20 rounded-xl p-4">
        <p className="text-xs font-semibold text-orange-300 uppercase tracking-wider mb-3">{tx('Kafka vs cola tradicional (RabbitMQ)', 'Kafka vs Traditional Queue (RabbitMQ)')}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left py-1.5 pr-3 text-slate-400 font-semibold whitespace-nowrap">{tx('Aspecto', 'Aspect')}</th>
                <th className="text-left py-1.5 px-2 text-slate-400 font-semibold whitespace-nowrap">Kafka</th>
                <th className="text-left py-1.5 px-2 text-slate-400 font-semibold whitespace-nowrap">RabbitMQ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {[
                { a: tx('Mensaje tras leer', 'Message after read'), k: tx('Persiste (según retention)', 'Persists (per retention)'), r: tx('Se elimina de la cola', 'Removed from queue') },
                { a: tx('Múltiples lectores', 'Multiple readers'), k: tx('Sí, cada consumer group independiente', 'Yes, each consumer group independent'), r: tx('Requiere fanout exchange', 'Requires fanout exchange') },
                { a: tx('Orden', 'Ordering'), k: tx('Garantizado por partición', 'Guaranteed per partition'), r: tx('Garantizado por cola', 'Guaranteed per queue') },
                { a: tx('Caso de uso típico', 'Typical use case'), k: tx('Streaming, event sourcing, analytics', 'Streaming, event sourcing, analytics'), r: tx('Task queues, RPC', 'Task queues, RPC') },
              ].map(row => (
                <tr key={row.a}>
                  <td className="py-1.5 pr-3 font-semibold text-slate-200 whitespace-nowrap">{row.a}</td>
                  <td className="py-1.5 px-2 text-slate-300">{row.k}</td>
                  <td className="py-1.5 px-2 text-slate-300">{row.r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderArchitecture = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">{tx('Arquitectura', 'Architecture')}</h2>
        <p className="text-slate-400 text-sm">{tx('Cómo se distribuyen y replican los datos entre brokers', 'How data is distributed and replicated across brokers')}</p>
      </div>

      <ArchitectureDiagram tx={tx} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { title: 'Broker', desc: tx('Un servidor Kafka. Un cluster tiene varios brokers; cada uno almacena un subconjunto de particiones.', 'A Kafka server. A cluster has several brokers; each stores a subset of partitions.'), icon: Server },
          { title: 'Topic & Partition', desc: tx('Un topic se divide en particiones para paralelizar lectura/escritura. Cada partición es un log ordenado con offsets incrementales.', 'A topic is split into partitions to parallelize read/write. Each partition is an ordered log with incrementing offsets.'), icon: Layers },
          { title: tx('Replicación', 'Replication'), desc: tx('Cada partición tiene un líder (atiende reads/writes) y réplicas follower. Si el líder falla, una réplica sincronizada (ISR) toma su lugar.', 'Each partition has a leader (serves reads/writes) and follower replicas. If the leader fails, an in-sync replica (ISR) takes over.'), icon: GitBranch },
        ].map(({ title, desc, icon: Icon }) => (
          <div key={title} className="bg-slate-800/30 border border-orange-500/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-bold text-orange-300">{title}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-orange-300">{tx('Comandos CLI', 'CLI Commands')}</h3>
        <CodeBlock language="bash" code={`# Crear un topic con 3 particiones y factor de replicación 2
kafka-topics.sh --create \\
  --topic orders \\
  --partitions 3 \\
  --replication-factor 2 \\
  --bootstrap-server localhost:9092

# Ver detalles del topic (líder, réplicas, ISR por partición)
kafka-topics.sh --describe --topic orders --bootstrap-server localhost:9092

# Producir mensajes desde consola
kafka-console-producer.sh --topic orders --bootstrap-server localhost:9092

# Consumir desde el principio
kafka-console-consumer.sh --topic orders --from-beginning \\
  --bootstrap-server localhost:9092`} />
      </div>
    </div>
  );

  const renderProducers = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">Producers</h2>
        <p className="text-slate-400 text-sm">{tx('Cómo se decide a qué partición va cada mensaje y qué tan seguro es el envío', 'How a message is routed to a partition and how safe the send is')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { title: tx('Partitioning por key', 'Partitioning by key'), desc: tx('hash(key) % numPartitions decide la partición. Mismo key → siempre misma partición → orden garantizado para esa key (ej: por userId).', 'hash(key) % numPartitions decides the partition. Same key → always same partition → guaranteed order for that key (e.g. by userId).'), icon: Hash },
          { title: 'acks', desc: tx('acks=0 (no espera), acks=1 (líder confirma), acks=all (líder + todas las réplicas ISR confirman). Trade-off latencia vs durabilidad.', 'acks=0 (no wait), acks=1 (leader confirms), acks=all (leader + all ISR replicas confirm). Latency vs durability trade-off.'), icon: ShieldCheck },
          { title: tx('Idempotencia', 'Idempotence'), desc: tx('enable.idempotence=true evita duplicados por reintentos de red asignando un ID de secuencia por producer — necesario para exactly-once.', 'enable.idempotence=true prevents duplicates from network retries by assigning a sequence ID per producer — required for exactly-once.'), icon: RefreshCw },
        ].map(({ title, desc, icon: Icon }) => (
          <div key={title} className="bg-slate-800/30 border border-orange-500/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-bold text-orange-300">{title}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-orange-300">Java Producer</h3>
        <CodeBlock language="java" code={`Properties props = new Properties();
props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);

// Durabilidad máxima + sin duplicados
props.put(ProducerConfig.ACKS_CONFIG, "all");
props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);
props.put(ProducerConfig.RETRIES_CONFIG, Integer.MAX_VALUE);

try (KafkaProducer<String, String> producer = new KafkaProducer<>(props)) {
    // key = orderId → todos los eventos de esa orden van a la misma partición
    ProducerRecord<String, String> record =
        new ProducerRecord<>("orders", order.getId(), order.toJson());

    // Envío async con callback (no bloquea el hilo)
    producer.send(record, (metadata, exception) -> {
        if (exception != null) {
            log.error("Error al enviar a Kafka", exception);
        } else {
            log.info("Enviado a partición {} offset {}", metadata.partition(), metadata.offset());
        }
    });
}`} />
      </div>
    </div>
  );

  const renderConsumers = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">Consumers</h2>
        <p className="text-slate-400 text-sm">{tx('Cómo se reparte el trabajo de leer particiones entre varios consumers', 'How the work of reading partitions is spread across consumers')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { title: tx('Consumer Group', 'Consumer Group'), desc: tx('Cada partición la lee un único consumer dentro del grupo. Si hay más consumers que particiones, algunos quedan idle. Distintos grupos son independientes entre sí.', 'Each partition is read by exactly one consumer within the group. More consumers than partitions leaves some idle. Different groups are independent from each other.'), icon: Inbox },
          { title: 'Offset', desc: tx('Puntero a la última posición leída por partición. Se commitea (auto o manual) para saber dónde reanudar tras un restart.', 'Pointer to the last read position per partition. Committed (auto or manual) so you know where to resume after a restart.'), icon: Hash },
          { title: 'Rebalancing', desc: tx('Cuando un consumer entra/sale del grupo, las particiones se redistribuyen. Puede causar pausas breves — cooperative rebalancing lo minimiza.', 'When a consumer joins/leaves the group, partitions are redistributed. Can cause brief pauses — cooperative rebalancing minimizes it.'), icon: RefreshCw },
        ].map(({ title, desc, icon: Icon }) => (
          <div key={title} className="bg-slate-800/30 border border-orange-500/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-bold text-orange-300">{title}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-950/40 border border-orange-500/20 rounded-xl p-4">
        <p className="text-xs font-semibold text-orange-300 uppercase tracking-wider mb-2">
          {tx('Regla clave', 'Key rule')}
        </p>
        <p className="text-xs text-slate-400 leading-relaxed">
          {tx('numConsumers > numPartitions → consumers sobrantes sin trabajo. Para escalar el consumo, primero hay que aumentar las particiones del topic.', 'numConsumers > numPartitions → extra consumers sit idle. To scale consumption, you must first increase the topic\'s partitions.')}
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-orange-300">Java Consumer</h3>
        <CodeBlock language="java" code={`Properties props = new Properties();
props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
props.put(ConsumerConfig.GROUP_ID_CONFIG, "order-processing-group");
props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);

// Commit manual — control preciso de cuándo se considera "procesado"
props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false);
props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");

try (KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props)) {
    consumer.subscribe(List.of("orders"));

    while (true) {
        ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(500));
        for (ConsumerRecord<String, String> record : records) {
            processOrder(record.value());
        }
        // Commit solo después de procesar el batch completo — at-least-once
        consumer.commitSync();
    }
}`} />
      </div>
    </div>
  );

  const renderDelivery = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">{tx('Garantías de entrega', 'Delivery Guarantees')}</h2>
        <p className="text-slate-400 text-sm">{tx('Qué puede pasar con un mensaje cuando algo falla a mitad de camino', 'What can happen to a message when something fails midway')}</p>
      </div>

      <div className="bg-slate-950/40 border border-orange-500/20 rounded-xl p-4">
        <p className="text-xs font-semibold text-orange-300 uppercase tracking-wider mb-3">{tx('Semánticas', 'Semantics')}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left py-1.5 pr-3 text-slate-400 font-semibold whitespace-nowrap">{tx('Semántica', 'Semantic')}</th>
                <th className="text-left py-1.5 px-2 text-slate-400 font-semibold whitespace-nowrap">{tx('Riesgo', 'Risk')}</th>
                <th className="text-left py-1.5 px-2 text-slate-400 font-semibold whitespace-nowrap">{tx('Cómo se logra', 'How to achieve it')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {[
                { s: 'At-most-once', color: 'text-red-400', risk: tx('Pérdida de mensajes', 'Message loss'), how: tx('commitSync() antes de procesar', 'commitSync() before processing') },
                { s: 'At-least-once', color: 'text-yellow-400', risk: tx('Mensajes duplicados', 'Duplicate messages'), how: tx('commitSync() después de procesar (default recomendado)', 'commitSync() after processing (recommended default)') },
                { s: 'Exactly-once', color: 'text-emerald-400', risk: tx('Ninguno, pero mayor complejidad/latencia', 'None, but more complexity/latency'), how: tx('Idempotent producer + transacciones (read-process-write)', 'Idempotent producer + transactions (read-process-write)') },
              ].map(row => (
                <tr key={row.s}>
                  <td className={`py-1.5 pr-3 font-mono font-semibold whitespace-nowrap ${row.color}`}>{row.s}</td>
                  <td className="py-1.5 px-2 text-slate-300">{row.risk}</td>
                  <td className="py-1.5 px-2 text-slate-300">{row.how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-slate-800/30 border border-orange-500/20 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-bold text-orange-300">{tx('Retention', 'Retention')}</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {tx('log.retention.hours (default 168h/7 días) o retention.bytes. Cumplido el límite, los segmentos más viejos se eliminan — independiente de si fueron leídos.', 'log.retention.hours (default 168h/7 days) or retention.bytes. Once the limit is hit, oldest segments are deleted — regardless of whether they were read.')}
          </p>
        </div>
        <div className="bg-slate-800/30 border border-orange-500/20 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <RefreshCw className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-bold text-orange-300">Dead Letter Topic</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {tx('Mensajes que fallan repetidamente al procesarse se envían a un topic separado (ej: orders.DLT) para inspección manual sin bloquear el consumo normal.', 'Messages that repeatedly fail processing are sent to a separate topic (e.g. orders.DLT) for manual inspection without blocking normal consumption.')}
          </p>
        </div>
      </div>
    </div>
  );

  const renderSpring = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">Spring Kafka</h2>
        <p className="text-slate-400 text-sm">{tx('Integración de Kafka en un proyecto Spring Boot', 'Integrating Kafka in a Spring Boot project')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-slate-800/30 border border-orange-500/20 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <Send className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-bold text-orange-300">KafkaTemplate</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {tx('Wrapper sobre el producer nativo. send() retorna un CompletableFuture para manejar éxito/error de forma reactiva.', 'Wrapper over the native producer. send() returns a CompletableFuture to handle success/error reactively.')}
          </p>
        </div>
        <div className="bg-slate-800/30 border border-orange-500/20 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <Inbox className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-bold text-orange-300">@KafkaListener</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {tx('Anotación declarativa que registra un método como consumer. Spring maneja el polling loop, deserialización y ack por vos.', 'Declarative annotation that registers a method as a consumer. Spring handles the polling loop, deserialization, and ack for you.')}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-orange-300">{tx('Configuración y código', 'Configuration & Code')}</h3>
        <CodeBlock language="java" code={`// application.yml
// spring:
//   kafka:
//     bootstrap-servers: localhost:9092
//     producer:
//       acks: all
//       properties:
//         enable.idempotence: true
//     consumer:
//       group-id: order-processing-group
//       auto-offset-reset: earliest
//       enable-auto-commit: false

@Service
public class OrderEventProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public OrderEventProducer(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void publish(Order order) {
        kafkaTemplate.send("orders", order.getId(), order.toJson())
            .whenComplete((result, ex) -> {
                if (ex != null) {
                    log.error("Fallo al publicar orden {}", order.getId(), ex);
                } else {
                    log.info("Orden {} publicada en offset {}",
                        order.getId(), result.getRecordMetadata().offset());
                }
            });
    }
}

@Component
public class OrderEventListener {

    @KafkaListener(topics = "orders", groupId = "order-processing-group")
    public void onOrderEvent(ConsumerRecord<String, String> record, Acknowledgment ack) {
        try {
            processOrder(record.value());
            ack.acknowledge();               // commit manual — at-least-once
        } catch (Exception e) {
            log.error("Error procesando orden, se reintentará", e);
            // sin ack() → Kafka reentrega el mensaje
        }
    }

    // Retry + Dead Letter Topic declarativo (Spring Kafka 2.7+)
    @RetryableTopic(attempts = "3", backoff = @Backoff(delay = 1000, multiplier = 2.0))
    @KafkaListener(topics = "payments", groupId = "payments-group")
    public void onPaymentEvent(String payload) {
        processPayment(payload);
        // tras 3 intentos fallidos → va a "payments-dlt" automáticamente
    }
}`} />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (active) {
      case 'overview': return renderOverview();
      case 'architecture': return renderArchitecture();
      case 'producers': return renderProducers();
      case 'consumers': return renderConsumers();
      case 'delivery': return renderDelivery();
      case 'spring': return renderSpring();
      default: return renderOverview();
    }
  };

  return (
    <div className="grid lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1 space-y-2 overflow-y-auto pr-2">
        {sections.map(section => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActive(section.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${active === section.id
                ? 'bg-orange-500/20 border border-orange-500/50 text-orange-300'
                : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold">{section.title}</div>
                <div className="text-xs opacity-70 line-clamp-1">{section.subtitle}</div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="lg:col-span-3 overflow-y-auto pr-2">
        {renderContent()}
      </div>
    </div>
  );
}

export default KafkaPro;
