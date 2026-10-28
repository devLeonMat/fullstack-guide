// DevOps toolbox as plain data (no JSX) so it can be tested with Node.
// Tools are grouped by the need they cover. "usedAt" only lists client projects
// backed by the CV; an empty list means the user confirmed using the tool but it
// isn't tied to a CV project yet. "alternatives" are well-known options NOT used,
// kept separate so the page never overstates real experience.

const P = {
  scotiabank: { client: 'Scotiabank Perú', project: 'Pagos QR' },
  healthcare: { client: 'HealthCare', project: 'AgentCloud' },
  sambasafety: { client: 'SambaSafety', project: 'Qorta' },
  gnb: { client: 'Banco GNB Paraguay', project: 'Banca digital' },
  ncb: { client: 'National Commercial Bank', project: 'Lynk' },
  bcp: { client: 'BCP', project: 'Tío Grou' },
  intercorp: { client: 'Intercorp Retail', project: 'Tracking de incidentes' },
  sura: { client: 'SURA Perú', project: 'Contrato Digital' },
  equifax: { client: 'Equifax', project: 'KATRINA' },
  olva: { client: 'Olva Courier', project: 'ERP' },
  limaw: { client: 'LimaW', project: 'Biometría Zircon' },
};

export function buildToolbox(tx) {
  return [
    {
      id: 'cicd',
      icon: 'cicd',
      title: tx('CI/CD', 'CI/CD'),
      need: tx('Compilar, probar y desplegar en cada cambio', 'Build, test and deploy on every change'),
      summary: tx(
        'El pipeline es el camino que recorre cada commit hasta producción: compila, corre las pruebas, pasa los quality gates y despliega. Cambié de herramienta casi en cada cliente, pero la idea es siempre la misma: que desplegar sea aburrido y repetible.',
        'The pipeline is the path every commit takes to production: build, run tests, pass the quality gates and deploy. I switched tools at almost every client, but the idea is always the same: make deploying boring and repeatable.'
      ),
      tools: [
        {
          name: 'Jenkins',
          what: tx('Servidor de CI/CD con pipelines como código (Jenkinsfile). Muy común en bancos con infraestructura propia.', 'CI/CD server with pipelines as code (Jenkinsfile). Very common at banks with their own infrastructure.'),
          usedAt: [P.scotiabank, P.bcp, P.sura],
        },
        {
          name: 'GitHub Actions',
          what: tx('Workflows en YAML que viven junto al código en GitHub. Lo más simple de poner en marcha.', 'YAML workflows that live next to the code on GitHub. The simplest to get going.'),
          usedAt: [P.healthcare],
        },
        {
          name: 'Azure DevOps Pipelines',
          what: tx('Pipelines integrados con repos, tableros y releases en un solo lugar dentro de Azure.', 'Pipelines integrated with repos, boards and releases in one place inside Azure.'),
          usedAt: [P.ncb, P.intercorp],
        },
        {
          name: 'GoCD',
          what: tx('Herramienta de entrega continua centrada en modelar el flujo completo de un release.', 'Continuous delivery tool focused on modeling a release’s full flow.'),
          usedAt: [P.equifax],
        },
        {
          name: 'Argo CD',
          what: tx('GitOps para Kubernetes: el cluster se sincroniza solo con lo que está en Git, y volver atrás es revertir un commit.', 'GitOps for Kubernetes: the cluster syncs itself with what’s in Git, and rolling back is reverting a commit.'),
          usedAt: [],
        },
      ],
      alternatives: [
        { name: 'GitLab CI', note: tx('Si el código ya vive en GitLab, es la opción natural.', 'If the code already lives in GitLab, it’s the natural choice.') },
      ],
    },
    {
      id: 'quality',
      icon: 'quality',
      title: tx('Calidad y seguridad del código', 'Code quality and security'),
      need: tx('Que el código malo no llegue a main', 'Keep bad code out of main'),
      summary: tx(
        'Un quality gate frena el merge si baja la cobertura, aparece un bug o una vulnerabilidad. En banca se suma la remediación de lo que encuentran las pruebas de penetración.',
        'A quality gate blocks the merge if coverage drops or a bug or vulnerability shows up. In banking you also fix whatever the penetration tests find.'
      ),
      tools: [
        {
          name: 'SonarCloud',
          what: tx('Análisis estático en la nube: bugs, code smells, cobertura y vulnerabilidades en cada PR.', 'Cloud static analysis: bugs, code smells, coverage and vulnerabilities on every PR.'),
          usedAt: [P.scotiabank, P.ncb],
        },
        {
          name: 'SonarQube',
          what: tx('Lo mismo que SonarCloud, instalado en la infraestructura de la empresa.', 'The same as SonarCloud, installed on the company’s own infrastructure.'),
          usedAt: [P.bcp, P.intercorp, P.sura, P.equifax],
        },
      ],
      practice: tx(
        'En Scotiabank, además del gate de SonarCloud, remediamos las vulnerabilidades reportadas en las pruebas de penetración.',
        'At Scotiabank, on top of the SonarCloud gate, we fixed the vulnerabilities reported by penetration tests.'
      ),
      alternatives: [
        { name: 'Snyk / Dependabot', note: tx('Avisan de dependencias con vulnerabilidades conocidas.', 'They flag dependencies with known vulnerabilities.') },
      ],
    },
    {
      id: 'testing',
      icon: 'testing',
      title: tx('Pruebas automatizadas', 'Automated testing'),
      need: tx('Cambiar código sin miedo', 'Change code without fear'),
      summary: tx(
        'Las pruebas son lo que hace confiable al pipeline. Varios clientes exigían una cobertura mínima para pasar el gate: mantuvimos más de 85% en Banco GNB y más de 95% en Qorta.',
        'Tests are what make the pipeline trustworthy. Several clients required a minimum coverage to pass the gate: we kept it above 85% at Banco GNB and above 95% at Qorta.'
      ),
      tools: [
        {
          name: 'JUnit + Mockito',
          what: tx('El estándar en Java: JUnit corre las pruebas y Mockito simula las dependencias.', 'The Java standard: JUnit runs the tests and Mockito fakes the dependencies.'),
          usedAt: [P.sambasafety, P.gnb, P.intercorp, P.olva],
        },
        {
          name: 'Jest',
          what: tx('Pruebas unitarias para JavaScript y TypeScript: React, React Native y Angular.', 'Unit tests for JavaScript and TypeScript: React, React Native and Angular.'),
          usedAt: [P.sambasafety, P.gnb, P.ncb],
        },
        {
          name: 'Karma + Jasmine',
          what: tx('El combo clásico de pruebas en Angular antes de que llegaran Jest y Vitest.', 'The classic Angular testing combo before Jest and Vitest arrived.'),
          usedAt: [P.equifax, P.bcp, P.intercorp],
        },
      ],
    },
    {
      id: 'containers',
      icon: 'containers',
      title: tx('Contenedores y orquestación', 'Containers and orchestration'),
      need: tx('Correr lo mismo en todos lados y escalar', 'Run the same thing everywhere and scale'),
      summary: tx(
        'Docker empaqueta el servicio con todo lo que necesita; Kubernetes decide dónde corre, cuántas réplicas hay y qué pasa cuando una se cae. Usé Kubernetes administrado en las dos nubes principales.',
        'Docker packages the service with everything it needs; Kubernetes decides where it runs, how many replicas there are and what happens when one dies. I’ve used managed Kubernetes on both major clouds.'
      ),
      tools: [
        {
          name: 'Docker',
          what: tx('Imagen del servicio con su runtime y dependencias: lo que corre en local es lo que corre en producción.', 'An image of the service with its runtime and dependencies: what runs locally is what runs in production.'),
          usedAt: [P.healthcare, P.equifax],
        },
        {
          name: 'Amazon EKS',
          what: tx('Kubernetes administrado por AWS.', 'Kubernetes managed by AWS.'),
          usedAt: [P.healthcare, P.sambasafety, P.gnb],
        },
        {
          name: 'Azure AKS',
          what: tx('Kubernetes administrado por Azure.', 'Kubernetes managed by Azure.'),
          usedAt: [P.ncb, P.bcp],
        },
        {
          name: 'Amazon ECS',
          what: tx('Orquestador de contenedores propio de AWS, más simple que Kubernetes.', 'AWS’s own container orchestrator, simpler than Kubernetes.'),
          usedAt: [P.sura],
        },
      ],
      alternatives: [
        { name: 'Helm', note: tx('Plantillas para desplegar en Kubernetes sin repetir YAML.', 'Templates to deploy to Kubernetes without repeating YAML.') },
        { name: 'Terraform', note: tx('Infraestructura como código para crear clusters, bases y redes.', 'Infrastructure as code to create clusters, databases and networks.') },
      ],
    },
    {
      id: 'serverless',
      icon: 'serverless',
      title: 'Serverless',
      need: tx('Correr código por evento sin administrar servidores', 'Run code per event without managing servers'),
      summary: tx(
        'Para trabajo disparado por eventos o con tráfico a ráfagas: procesar un archivo, una tarea programada, un webhook. Lo usé en tres proyectos, con tres lenguajes distintos.',
        'For event-triggered or bursty work: processing a file, a scheduled job, a webhook. I used it on three projects, with three different languages.'
      ),
      tools: [
        {
          name: 'AWS Lambda',
          what: tx('Funciones disparadas por S3, SQS, horarios o HTTP. En AgentCloud con Python; en SURA con Node.js y Express.', 'Functions triggered by S3, SQS, schedules or HTTP. At AgentCloud with Python; at SURA with Node.js and Express.'),
          usedAt: [P.healthcare, P.sura],
        },
        {
          name: 'Azure Functions',
          what: tx('El equivalente en Azure. En Lynk, con Node.js y NestJS.', 'The Azure equivalent. At Lynk, with Node.js and NestJS.'),
          usedAt: [P.ncb],
        },
      ],
    },
    {
      id: 'observability',
      icon: 'observability',
      title: tx('Observabilidad', 'Observability'),
      need: tx('Monitoreo, trazabilidad y logs', 'Monitoring, tracing and logs'),
      summary: tx(
        'El monitoreo te dice que algo está mal; la observabilidad te deja preguntar por qué sin desplegar código nuevo. Se apoya en tres señales (logs, métricas y trazas) más alertas para enterarte a tiempo.',
        'Monitoring tells you something is wrong; observability lets you ask why without deploying new code. It rests on three signals (logs, metrics and traces) plus alerts so you find out in time.'
      ),
      signals: [
        {
          signal: 'Logs',
          question: tx('¿Qué pasó exactamente?', 'What exactly happened?'),
          used: tx('CloudWatch Logs (AgentCloud) y Application Insights (Lynk)', 'CloudWatch Logs (AgentCloud) and Application Insights (Lynk)'),
          standard: 'ELK / OpenSearch, Loki',
        },
        {
          signal: tx('Métricas y monitoreo', 'Metrics and monitoring'),
          question: tx('¿Cómo está el sistema ahora mismo?', 'How is the system doing right now?'),
          used: tx('Dynatrace (Scotiabank), CloudWatch y Datadog (AgentCloud), Application Insights (Lynk) y New Relic', 'Dynatrace (Scotiabank), CloudWatch and Datadog (AgentCloud), Application Insights (Lynk) and New Relic'),
          standard: 'Prometheus + Grafana, Micrometer',
        },
        {
          signal: tx('Trazas (trazabilidad)', 'Traces (tracing)'),
          question: tx('¿Por qué servicios pasó este request y dónde se demoró?', 'Which services did this request go through, and where was it slow?'),
          used: tx('Application Insights (Lynk) y New Relic, que correlacionan requests y dependencias entre servicios', 'Application Insights (Lynk) and New Relic, which correlate requests and dependencies across services'),
          standard: 'OpenTelemetry + Jaeger / Tempo, AWS X-Ray',
        },
        {
          signal: tx('Alertas', 'Alerts'),
          question: tx('¿Quién se entera cuando algo falla?', 'Who finds out when something breaks?'),
          used: tx('Dynatrace, monitores de Datadog, alarmas de CloudWatch y alertas de Application Insights y New Relic', 'Dynatrace, Datadog monitors, CloudWatch alarms and Application Insights and New Relic alerts'),
          standard: 'Alertmanager, PagerDuty / Opsgenie',
        },
      ],
      tools: [
        {
          name: 'Amazon CloudWatch',
          what: tx('Logs, métricas y alarmas de todo lo que corre en AWS: Lambdas, EKS, SQS.', 'Logs, metrics and alarms for everything running on AWS: Lambdas, EKS, SQS.'),
          usedAt: [P.healthcare],
        },
        {
          name: 'Azure Application Insights',
          what: tx('Telemetría de aplicación: requests, errores, dependencias y trazas distribuidas entre servicios.', 'Application telemetry: requests, errors, dependencies and distributed traces across services.'),
          usedAt: [P.ncb],
        },
        {
          name: 'Datadog',
          what: tx('Plataforma de observabilidad: métricas, dashboards y monitores con alertas sobre servicios e infraestructura en un solo lugar.', 'Observability platform: metrics, dashboards and alerting monitors for services and infrastructure in one place.'),
          usedAt: [P.healthcare],
        },
        {
          name: 'Dynatrace',
          what: tx('APM con descubrimiento automático: mapea servicios y dependencias, mide tiempos por transacción y detecta anomalías por su cuenta.', 'APM with automatic discovery: maps services and dependencies, measures per-transaction timings and detects anomalies on its own.'),
          usedAt: [P.scotiabank],
        },
        {
          name: 'New Relic',
          what: tx('APM completo: tiempos por endpoint, errores, trazas distribuidas, dashboards y alertas, sin importar la nube.', 'Full APM: per-endpoint timings, errors, distributed traces, dashboards and alerts, whatever the cloud.'),
          usedAt: [],
        },
      ],
      practice: tx(
        'Lo que más ayuda al depurar en microservicios es un correlation id que viaje en cada request y aparezca en cada log. Con eso, un error en un servicio se puede seguir hasta el que lo originó.',
        'What helps most when debugging microservices is a correlation id that travels with every request and shows up in every log. With it, an error in one service can be traced back to the one that caused it.'
      ),
      alternatives: [
        { name: 'OpenTelemetry', note: tx('El estándar abierto para instrumentar una vez y mandar logs, métricas y trazas a cualquier backend.', 'The open standard to instrument once and send logs, metrics and traces to any backend.') },
        { name: 'Prometheus + Grafana', note: tx('La pareja más común para métricas y dashboards fuera de las nubes administradas.', 'The most common pair for metrics and dashboards outside managed clouds.') },
      ],
    },
    {
      id: 'messaging',
      icon: 'messaging',
      title: tx('Mensajería y eventos', 'Messaging and events'),
      need: tx('Que los servicios se hablen sin depender uno del otro', 'Let services talk without depending on each other'),
      summary: tx(
        'Un broker desacopla al que avisa del que reacciona y absorbe picos de carga. La elección depende de si necesitas un log de eventos que se puede releer (Kafka) o una cola de tareas (RabbitMQ, SQS).',
        'A broker decouples whoever announces from whoever reacts and absorbs load spikes. The choice depends on whether you need a replayable event log (Kafka) or a task queue (RabbitMQ, SQS).'
      ),
      tools: [
        {
          name: 'Apache Kafka',
          what: tx('Log de eventos distribuido: alto volumen, orden por partición y consumidores que releen.', 'Distributed event log: high volume, per-partition ordering and consumers that can replay.'),
          usedAt: [P.ncb, P.healthcare],
        },
        {
          name: 'RabbitMQ',
          what: tx('Broker de colas clásico. En Qorta migré sus listeners a Spring Cloud Stream.', 'Classic queue broker. At Qorta I migrated its listeners to Spring Cloud Stream.'),
          usedAt: [P.equifax, P.sambasafety],
        },
        {
          name: 'Azure Event Hubs',
          what: tx('Ingesta de eventos administrada en Azure, compatible con el protocolo de Kafka.', 'Managed event ingestion on Azure, compatible with the Kafka protocol.'),
          usedAt: [P.ncb],
        },
        {
          name: 'Amazon SQS / SNS',
          what: tx('SQS es una cola; SNS reparte un mensaje a varios suscriptores.', 'SQS is a queue; SNS fans a message out to several subscribers.'),
          usedAt: [P.healthcare, P.sura],
        },
      ],
    },
    {
      id: 'gateway',
      icon: 'gateway',
      title: 'API gateway',
      need: tx('Una sola puerta de entrada a las APIs', 'A single front door to your APIs'),
      summary: tx(
        'El gateway se pone delante de los servicios y resuelve lo que no quieres repetir en cada uno: autenticación, cuotas, enrutamiento y versionado de APIs.',
        'The gateway sits in front of the services and handles what you don’t want to repeat in each one: authentication, quotas, routing and API versioning.'
      ),
      tools: [
        {
          name: 'Apigee',
          what: tx('Gestión de APIs de Google Cloud. En Scotiabank conecta GCP con los servicios de integración hacia el AS/400.', 'Google Cloud’s API management. At Scotiabank it connects GCP with the integration services that reach the AS/400.'),
          usedAt: [P.scotiabank],
        },
      ],
      alternatives: [
        { name: 'Spring Cloud Gateway', note: tx('Gateway en código, dentro del ecosistema Spring.', 'A gateway in code, inside the Spring ecosystem.') },
        { name: 'AWS API Gateway / Kong', note: tx('Opciones típicas en AWS o en Kubernetes.', 'Typical options on AWS or Kubernetes.') },
      ],
    },
    {
      id: 'repos',
      icon: 'repos',
      title: tx('Control de versiones', 'Version control'),
      need: tx('Dónde vive el código y cómo se revisa', 'Where code lives and how it’s reviewed'),
      summary: tx(
        'Git es constante; lo que cambia es dónde se aloja y cómo se integra con el pipeline y las revisiones. En los proyectos más antiguos todavía tocó SVN.',
        'Git is constant; what changes is where it’s hosted and how it plugs into the pipeline and reviews. Older projects still meant SVN.'
      ),
      tools: [
        { name: 'GitHub', what: tx('Repos, pull requests y Actions en un solo lugar.', 'Repos, pull requests and Actions in one place.'), usedAt: [P.healthcare] },
        { name: 'GitLab', what: tx('Repos con CI integrado; muy usado en Latinoamérica.', 'Repos with built-in CI; widely used in Latin America.'), usedAt: [P.gnb, P.bcp, P.sura, P.olva] },
        { name: 'Bitbucket', what: tx('El repo del ecosistema Atlassian, junto a Jira.', 'The Atlassian ecosystem’s repo, next to Jira.'), usedAt: [P.scotiabank, P.sambasafety] },
        { name: 'Azure Repos', what: tx('Repos dentro de Azure DevOps.', 'Repos inside Azure DevOps.'), usedAt: [P.ncb] },
        { name: 'SVN', what: tx('Control de versiones centralizado, previo a Git.', 'Centralized version control, before Git.'), usedAt: [P.equifax, P.limaw] },
      ],
    },
    {
      id: 'tracking',
      icon: 'tracking',
      title: tx('Gestión y documentación', 'Planning and documentation'),
      need: tx('Organizar el trabajo del equipo', 'Organize the team’s work'),
      summary: tx(
        'Tableros para el sprint, documentación compartida y trazabilidad de cada tarea hasta el commit que la resolvió.',
        'Boards for the sprint, shared documentation and traceability from each task to the commit that closed it.'
      ),
      tools: [
        { name: 'Jira', what: tx('Backlog, sprints y tableros en equipos Scrum.', 'Backlog, sprints and boards for Scrum teams.'), usedAt: [P.sura, P.equifax] },
        { name: 'Confluence', what: tx('Documentación técnica y de procesos del equipo.', 'The team’s technical and process documentation.'), usedAt: [P.equifax] },
        { name: 'Azure Boards', what: tx('Tableros dentro de Azure DevOps, ligados a repos y pipelines.', 'Boards inside Azure DevOps, tied to repos and pipelines.'), usedAt: [P.ncb, P.intercorp] },
        { name: 'Trello', what: tx('Tablero Kanban simple para equipos chicos.', 'A simple Kanban board for small teams.'), usedAt: [P.olva] },
      ],
    },
  ];
}
