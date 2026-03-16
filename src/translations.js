// Centralized translations for the FullStack Guide application
export const translations = {
    common: {
        es: {
            appTitle: 'FullStack Guide',
            appSubtitle: 'Guía Interactiva para Desarrolladores',
            search: 'Buscar...',
            searchPlaceholder: 'Buscar en todos los conceptos... (Ctrl/Cmd + K)',
            searchHint: 'Escribe para buscar en todos los tabs...',
            searchTabsList: 'Clean Code, SOLID, Patterns, Architecture, JavaScript/TypeScript, Cloud, Containers, Node, Java, Spring, React, Angular',
            noResultsFor: 'No se encontraron resultados para',
            resultsSingular: 'resultado encontrado',
            resultsPlural: 'resultados encontrados',
            tabCloud: 'Cloud Basics',
            tabContainers: 'Containers Pro',
            tabJsTs: 'JS/TS Pro',
            showExample: 'Mostrar ejemplo',
            hideExample: 'Ocultar ejemplo',
            toggleLanguage: 'Cambiar idioma',
            categoryFundamentals: 'Fundamentos',
            categoryLanguages: 'Lenguajes',
            categoryBackend: 'Frameworks Backend',
            categoryFrontend: 'Frontend',
            categoryCloudDevops: 'Cloud/DevOps',
            footer: 'FullStack Guide © 2026 - Guía de referencia para desarrolladores',
            bad: 'MALO',
            good: 'BUENO',
            violation: 'VIOLACIÓN',
            solution: 'SOLUCIÓN',
        },
        en: {
            appTitle: 'FullStack Guide',
            appSubtitle: 'Interactive Developer Guide',
            search: 'Search...',
            searchPlaceholder: 'Search across all concepts... (Ctrl/Cmd + K)',
            searchHint: 'Type to search across all tabs...',
            searchTabsList: 'Clean Code, SOLID, Patterns, Architecture, JavaScript/TypeScript, Cloud, Containers, Node, Java, Spring, React, Angular',
            noResultsFor: 'No results found for',
            resultsSingular: 'result found',
            resultsPlural: 'results found',
            tabCloud: 'Cloud Basics',
            tabContainers: 'Containers Pro',
            tabJsTs: 'JS/TS Pro',
            showExample: 'Show example',
            hideExample: 'Hide example',
            toggleLanguage: 'Toggle language',
            categoryFundamentals: 'Fundamentals',
            categoryLanguages: 'Languages',
            categoryBackend: 'Backend Frameworks',
            categoryFrontend: 'Frontend',
            categoryCloudDevops: 'Cloud/DevOps',
            footer: 'FullStack Guide © 2026 - Developer reference guide',
            bad: 'BAD',
            good: 'GOOD',
            violation: 'VIOLATION',
            solution: 'SOLUTION',
        }
    },

    cleancode: {
        es: {
            title: 'Principios de Clean Code',
            dry: {
                title: 'DRY',
                subtitle: "Don't Repeat Yourself",
                summary: 'No repitas código',
                explanation: 'Cada pieza de conocimiento debe tener una única representación en el sistema. La duplicación aumenta el mantenimiento y los bugs.'
            },
            kiss: {
                title: 'KISS',
                subtitle: 'Keep It Simple, Stupid',
                summary: 'Mantén las cosas simples',
                explanation: 'La simplicidad debe ser un objetivo clave del diseño. Evita la complejidad innecesaria.'
            },
            yagni: {
                title: 'YAGNI',
                subtitle: "You Aren't Gonna Need It",
                summary: 'No lo necesitarás',
                explanation: 'No agregues funcionalidad hasta que realmente la necesites.'
            },
            boyscout: {
                title: 'Boy Scout Rule',
                subtitle: 'Leave it Better',
                summary: 'Deja el código mejor de como lo encontraste',
                explanation: 'Siempre deja el código un poco mejor que como lo encontraste.'
            },
            selfdoc: {
                title: 'Self-Documenting Code',
                subtitle: 'Code as Documentation',
                summary: 'El código debe explicarse a sí mismo',
                explanation: 'Usa nombres descriptivos que hagan obvio el propósito del código.'
            },
            srp: {
                title: 'Single Responsibility',
                subtitle: 'One Job Per Function',
                summary: 'Una función, una responsabilidad',
                explanation: 'Cada función debe hacer una sola cosa y hacerla bien.'
            },
            defensive: {
                title: 'Defensive Programming',
                subtitle: 'Expect the Unexpected',
                summary: 'Anticipa errores',
                explanation: 'Valida entradas y maneja casos extremos proactivamente.'
            },
            naming: {
                title: 'Meaningful Names',
                subtitle: 'Intention-Revealing Names',
                summary: 'Nombres que revelen intención',
                explanation: 'Los nombres deben revelar la intención sin necesidad de comentarios.'
            },
            failfast: {
                title: 'Fail Fast',
                subtitle: 'Detect Errors Early',
                summary: 'Falla rápido y visiblemente',
                explanation: 'Detecta y reporta errores lo antes posible, no los escondas.'
            },
            composition: {
                title: 'Composition Over Inheritance',
                subtitle: 'Has-A vs Is-A',
                summary: 'Favorece composición sobre herencia',
                explanation: 'Usa composición para agregar funcionalidad de forma flexible.'
            }
        },
        en: {
            title: 'Clean Code Principles',
            dry: {
                title: 'DRY',
                subtitle: "Don't Repeat Yourself",
                summary: "Don't repeat code",
                explanation: 'Every piece of knowledge must have a single, unambiguous representation in the system. Duplication increases maintenance and bugs.'
            },
            kiss: {
                title: 'KISS',
                subtitle: 'Keep It Simple, Stupid',
                summary: 'Keep things simple',
                explanation: 'Simplicity should be a key design goal. Avoid unnecessary complexity.'
            },
            yagni: {
                title: 'YAGNI',
                subtitle: "You Aren't Gonna Need It",
                summary: "You won't need it",
                explanation: "Don't add functionality until you actually need it."
            },
            boyscout: {
                title: 'Boy Scout Rule',
                subtitle: 'Leave it Better',
                summary: 'Leave the code better than you found it',
                explanation: 'Always leave the code a little better than you found it.'
            },
            selfdoc: {
                title: 'Self-Documenting Code',
                subtitle: 'Code as Documentation',
                summary: 'Code should explain itself',
                explanation: 'Use descriptive names that make the purpose of the code obvious.'
            },
            srp: {
                title: 'Single Responsibility',
                subtitle: 'One Job Per Function',
                summary: 'One function, one responsibility',
                explanation: 'Each function should do one thing and do it well.'
            },
            defensive: {
                title: 'Defensive Programming',
                subtitle: 'Expect the Unexpected',
                summary: 'Anticipate errors',
                explanation: 'Validate inputs and handle edge cases proactively.'
            },
            naming: {
                title: 'Meaningful Names',
                subtitle: 'Intention-Revealing Names',
                summary: 'Names that reveal intention',
                explanation: 'Names should reveal intention without the need for comments.'
            },
            failfast: {
                title: 'Fail Fast',
                subtitle: 'Detect Errors Early',
                summary: 'Fail quickly and visibly',
                explanation: "Detect and report errors as early as possible, don't hide them."
            },
            composition: {
                title: 'Composition Over Inheritance',
                subtitle: 'Has-A vs Is-A',
                summary: 'Favor composition over inheritance',
                explanation: 'Use composition to add functionality flexibly.'
            }
        }
    },

    solid: {
        es: {
            title: 'Principios SOLID',
            subtitle: 'Fundamentos de la Programación Orientada a Objetos',
            s: {
                letter: 'S',
                title: 'Single Responsibility Principle',
                analogy: '🧑‍🍳 Analogía del Restaurante',
                analogyText: 'Un chef se enfoca en cocinar, el mesero en atender, y el cajero en cobrar. Cada uno tiene una única responsabilidad.',
                explanation: 'Una clase debe tener una única responsabilidad y una sola razón para cambiar. Esto hace que el código sea más mantenible y fácil de testear.',
            },
            o: {
                letter: 'O',
                title: 'Open/Closed Principle',
                analogy: '🔌 Analogía del Enchufe',
                analogyText: 'Un enchufe acepta diferentes aparatos sin modificar su estructura. Está abierto a extensión, cerrado a modificación.',
                explanation: 'Las entidades de software deben estar abiertas para extensión pero cerradas para modificación. Usa abstracción y polimorfismo.',
            },
            l: {
                letter: 'L',
                title: 'Liskov Substitution Principle',
                analogy: '🚗 Analogía del Vehículo',
                analogyText: 'Si tu código espera un "Vehículo", debe funcionar igual con un Auto, Moto o Camión sin saber cuál es específicamente.',
                explanation: 'Los objetos de una clase derivada deben poder reemplazar objetos de la clase base sin alterar el comportamiento del programa.',
            },
            i: {
                letter: 'I',
                title: 'Interface Segregation Principle',
                analogy: '🎛️ Analogía del Control Remoto',
                analogyText: 'Un control remoto de TV no debería tener botones para abrir puertas de garaje. Interfaces específicas para cada necesidad.',
                explanation: 'No se debe forzar a los clientes a depender de interfaces que no usan. Es mejor tener muchas interfaces específicas que una general.',
            },
            d: {
                letter: 'D',
                title: 'Dependency Inversion Principle',
                analogy: '🔋 Analogía de la Batería',
                analogyText: 'Tu teléfono depende de "una batería" (abstracción), no de "Batería Samsung Modelo X" (implementación concreta).',
                explanation: 'Los módulos de alto nivel no deben depender de módulos de bajo nivel. Ambos deben depender de abstracciones.',
            }
        },
        en: {
            title: 'SOLID Principles',
            subtitle: 'Object-Oriented Programming Fundamentals',
            s: {
                letter: 'S',
                title: 'Single Responsibility Principle',
                analogy: '🧑‍🍳 Restaurant Analogy',
                analogyText: 'A chef focuses on cooking, the waiter on serving, and the cashier on billing. Each has a single responsibility.',
                explanation: 'A class should have only one responsibility and only one reason to change. This makes code more maintainable and testable.',
            },
            o: {
                letter: 'O',
                title: 'Open/Closed Principle',
                analogy: '🔌 Electrical Outlet Analogy',
                analogyText: 'An outlet accepts different devices without modifying its structure. Open for extension, closed for modification.',
                explanation: 'Software entities should be open for extension but closed for modification. Use abstraction and polymorphism.',
            },
            l: {
                letter: 'L',
                title: 'Liskov Substitution Principle',
                analogy: '🚗 Vehicle Analogy',
                analogyText: 'If your code expects a "Vehicle", it should work equally with a Car, Motorcycle, or Truck without knowing which one specifically.',
                explanation: 'Objects of a derived class should be able to replace objects of the base class without altering program behavior.',
            },
            i: {
                letter: 'I',
                title: 'Interface Segregation Principle',
                analogy: '🎛️ Remote Control Analogy',
                analogyText: "A TV remote shouldn't have buttons to open garage doors. Specific interfaces for each need.",
                explanation: "Clients shouldn't be forced to depend on interfaces they don't use. Multiple specific interfaces are better than one general interface.",
            },
            d: {
                letter: 'D',
                title: 'Dependency Inversion Principle',
                analogy: '🔋 Battery Analogy',
                analogyText: 'Your phone depends on "a battery" (abstraction), not on "Samsung Model X Battery" (concrete implementation).',
                explanation: "High-level modules shouldn't depend on low-level modules. Both should depend on abstractions.",
            }
        }
    },

    patterns: {
        es: {
            title: 'Patrones de Diseño',
            subtitle: 'Soluciones probadas a problemas comunes',
            categories: {
                creational: 'Creacionales',
                structural: 'Estructurales',
                behavioral: 'Comportamiento'
            }
        },
        en: {
            title: 'Design Patterns',
            subtitle: 'Proven solutions to common problems',
            categories: {
                creational: 'Creational',
                structural: 'Structural',
                behavioral: 'Behavioral'
            }
        }
    },

    architecture: {
        es: {
            title: 'Arquitecturas de Software',
            subtitle: 'Patrones arquitectónicos modernos',
            mvc: 'Separación de Modelo, Vista y Controlador',
            microservices: 'Servicios independientes y escalables',
            eventdriven: 'Comunicación mediante eventos asíncronos',
            hexagonal: 'Aislamiento de lógica de negocio',
        },
        en: {
            title: 'Software Architectures',
            subtitle: 'Modern architectural patterns',
            mvc: 'Model, View, and Controller separation',
            microservices: 'Independent and scalable services',
            eventdriven: 'Communication via asynchronous events',
            hexagonal: 'Business logic isolation',
        }
    },

    node: {
        es: {
            title: 'Node.js Pro',
            subtitle: 'JavaScript del lado del servidor',
            fundamentalsTitle: 'Fundamentos de Node.js',
            interviewTitle: 'Preguntas de Entrevista',
        },
        en: {
            title: 'Node.js Pro',
            subtitle: 'Server-side JavaScript',
            fundamentalsTitle: 'Node.js Fundamentals',
            interviewTitle: 'Interview Questions',
        }
    },

    java: {
        es: {
            title: 'Java Pro',
            subtitle: 'Características avanzadas de Java',
            fundamentalsTitle: 'Fundamentos Avanzados',
            interviewTitle: 'Preguntas de Entrevista',
        },
        en: {
            title: 'Java Pro',
            subtitle: 'Advanced Java features',
            fundamentalsTitle: 'Advanced Fundamentals',
            interviewTitle: 'Interview Questions',
        }
    },

    spring: {
        es: {
            title: 'Spring Pro',
            subtitle: 'Framework empresarial de Java',
            fundamentalsTitle: 'Fundamentos de Spring',
            interviewTitle: 'Preguntas de Entrevista',
        },
        en: {
            title: 'Spring Pro',
            subtitle: 'Enterprise Java framework',
            fundamentalsTitle: 'Spring Fundamentals',
            interviewTitle: 'Interview Questions',
        }
    },

    cloud: {
        es: {
            appTitle: 'Cloud Basics',
            comparisonTitle: 'Mapa de servicios equivalentes',
            comparisonSubtitle: 'Referencia rápida para traducir arquitectura entre nubes.',
            tableCategory: 'Categoría',
            sections: {
                concepts: {
                    id: 'concepts',
                    title: 'Fundamentos Cloud',
                    subtitle: 'IaaS, PaaS, SaaS, seguridad y escalabilidad',
                    content: [
                        {
                            topic: 'IaaS vs PaaS vs SaaS',
                            description: 'Modelos de servicio cloud y nivel de responsabilidad',
                            points: [
                                'IaaS: control alto de infraestructura (VM, red, storage), más operación manual.',
                                'PaaS: despliegue más rápido con menos gestión operativa de plataforma.',
                                'SaaS: producto listo, enfoque en negocio y no en infraestructura.',
                                'Regla práctica: a más control, más responsabilidad operativa.'
                            ]
                        },
                        {
                            topic: 'Shared Responsibility Model',
                            description: 'Seguridad compartida entre proveedor y cliente',
                            points: [
                                'Proveedor: datacenters, hardware físico y servicios base.',
                                'Cliente: identidades, permisos, cifrado, datos y configuración.',
                                'Error típico: asumir que "estar en cloud" equivale a estar seguro.',
                                'Prioridad inicial: IAM mínimo privilegio + logging + backups.'
                            ]
                        },
                        {
                            topic: 'Escalabilidad y Alta Disponibilidad',
                            description: 'Diseño resiliente para carga variable y fallos',
                            points: [
                                'Usa autoscaling y balanceadores para distribuir tráfico.',
                                'Despliega en múltiples zonas para reducir single points of failure.',
                                'Diseña componentes stateless para facilitar escalado horizontal.',
                                'Define SLO/SLA y pruebas de capacidad desde el inicio.'
                            ]
                        },
                        {
                            topic: 'Costos y FinOps',
                            description: 'Control de gasto en entornos cloud',
                            points: [
                                'Activa budgets y alertas de costo desde el día 1.',
                                'Etiqueta recursos por entorno, equipo y proyecto.',
                                'Apaga entornos no productivos fuera de horario.',
                                'Optimiza: rightsizing, reserved/savings plans y lifecycle policies.'
                            ]
                        }
                    ]
                },
                comparison: {
                    id: 'comparison',
                    title: 'AWS vs Azure vs GCP',
                    subtitle: 'Servicios equivalentes más usados'
                },
                selection: {
                    id: 'selection',
                    title: 'Selección de Plataforma',
                    subtitle: 'Cuándo elegir cada proveedor',
                    content: [
                        {
                            topic: 'AWS',
                            description: 'Muy completo para infraestructura y catálogo amplio',
                            points: [
                                'Ecosistema maduro para enterprise y startups.',
                                'Oferta extensa de servicios administrados.',
                                'Fuerte en workloads híbridos y multi-cuenta compleja.'
                            ]
                        },
                        {
                            topic: 'Azure',
                            description: 'Excelente en ecosistema Microsoft',
                            points: [
                                'Integración fuerte con AD/Entra, Windows Server y .NET.',
                                'Buen encaje para organizaciones enterprise tradicionales.',
                                'Ventajas en escenarios híbridos con tooling Microsoft.'
                            ]
                        },
                        {
                            topic: 'GCP',
                            description: 'Muy fuerte en datos, analítica y Kubernetes',
                            points: [
                                'BigQuery y stack de datos/ML muy competitivo.',
                                'GKE y experiencia de plataforma de contenedores sólida.',
                                'Suele destacar por simplicidad en ciertos servicios core.'
                            ]
                        },
                        {
                            topic: 'Checklist rápido de decisión',
                            description: 'Marco simple para elegir sin sobre-analizar',
                            points: [
                                'Skills internas del equipo actual.',
                                'Integración con stack existente y compliance.',
                                'Costo total (no solo precio unitario).',
                                'Requisitos de latencia/regiones y soporte.'
                            ]
                        }
                    ]
                },
                security: {
                    id: 'security',
                    title: 'Baseline de Seguridad Cloud',
                    subtitle: 'Prácticas mínimas para producción',
                    content: [
                        {
                            topic: 'Identidad y Accesos',
                            description: 'IAM como primer control de seguridad',
                            points: [
                                'MFA obligatorio para cuentas privilegiadas.',
                                'Evita credenciales estáticas; prioriza roles/managed identities.',
                                'Aplicar least privilege y revisión periódica de permisos.'
                            ]
                        },
                        {
                            topic: 'Datos y Secretos',
                            description: 'Protección de información sensible',
                            points: [
                                'Cifrado en tránsito y en reposo.',
                                'Secretos en gestores dedicados, nunca hardcoded.',
                                'Backups probados con ejercicios de restauración.'
                            ]
                        },
                        {
                            topic: 'Observabilidad y Respuesta',
                            description: 'Detección temprana y trazabilidad',
                            points: [
                                'Centraliza logs, métricas y alertas accionables.',
                                'Registra eventos de auditoría de IAM y cambios de recursos.',
                                'Playbooks de incidentes y on-call definidos.'
                            ]
                        },
                        {
                            topic: 'Gobernanza',
                            description: 'Políticas para escalar sin perder control',
                            points: [
                                'Políticas de naming, tags y guardrails desde el inicio.',
                                'Separar cuentas/suscripciones/proyectos por entorno.',
                                'Policy as Code para cumplimiento continuo.'
                            ]
                        }
                    ]
                },
                finops: {
                    id: 'finops',
                    title: 'Fundamentos FinOps',
                    subtitle: 'Control y optimización de costos cloud',
                    content: [
                        {
                            topic: 'Visibilidad',
                            description: 'Sin visibilidad no hay optimización real',
                            points: [
                                'Dashboard de costo por producto y equipo.',
                                'Alertas por desvíos de presupuesto.',
                                'Forecast mensual y trimestral.'
                            ]
                        },
                        {
                            topic: 'Optimización',
                            description: 'Reducir desperdicio sin afectar disponibilidad',
                            points: [
                                'Rightsizing de instancias y bases de datos.',
                                'Apagar recursos ociosos y limpiar snapshots viejos.',
                                'Mover workloads estables a planes de ahorro/reservas.'
                            ]
                        },
                        {
                            topic: 'Operación',
                            description: 'Disciplina continua de costo',
                            points: [
                                'Cost reviews semanales con ingeniería y producto.',
                                'KPIs: costo por cliente, costo por request, costo por entorno.',
                                'Automatizar recomendaciones y acciones repetitivas.'
                            ]
                        }
                    ]
                }
            },
            serviceMap: [
                { category: 'Compute (VM)', aws: 'EC2', azure: 'Virtual Machines', gcp: 'Compute Engine' },
                { category: 'Contenedores (K8s)', aws: 'EKS', azure: 'AKS', gcp: 'GKE' },
                { category: 'Serverless Functions', aws: 'Lambda', azure: 'Azure Functions', gcp: 'Cloud Functions' },
                { category: 'Object Storage', aws: 'S3', azure: 'Blob Storage', gcp: 'Cloud Storage' },
                { category: 'Base de datos relacional', aws: 'RDS / Aurora', azure: 'Azure SQL Database', gcp: 'Cloud SQL' },
                { category: 'NoSQL', aws: 'DynamoDB', azure: 'Cosmos DB', gcp: 'Firestore / Bigtable' },
                { category: 'Load Balancer', aws: 'ELB / ALB / NLB', azure: 'Azure Load Balancer / App Gateway', gcp: 'Cloud Load Balancing' },
                { category: 'IAM', aws: 'IAM', azure: 'Microsoft Entra ID + RBAC', gcp: 'Cloud IAM' },
                { category: 'Monitoreo', aws: 'CloudWatch', azure: 'Azure Monitor', gcp: 'Cloud Monitoring' },
                { category: 'CI/CD', aws: 'CodePipeline', azure: 'Azure DevOps / GitHub Actions', gcp: 'Cloud Build' }
            ]
        },
        en: {
            appTitle: 'Cloud Basics',
            comparisonTitle: 'Equivalent Services Map',
            comparisonSubtitle: 'Quick reference to translate architecture across clouds.',
            tableCategory: 'Category',
            sections: {
                concepts: {
                    id: 'concepts',
                    title: 'Cloud Fundamentals',
                    subtitle: 'IaaS, PaaS, SaaS, security and scalability',
                    content: [
                        {
                            topic: 'IaaS vs PaaS vs SaaS',
                            description: 'Cloud service models and responsibility levels',
                            points: [
                                'IaaS: high infrastructure control (VM, networking, storage), more operational work.',
                                'PaaS: faster delivery with less platform management.',
                                'SaaS: ready-to-use product focused on business outcomes.',
                                'Practical rule: more control means more operational responsibility.'
                            ]
                        },
                        {
                            topic: 'Shared Responsibility Model',
                            description: 'Security responsibilities between provider and customer',
                            points: [
                                'Provider: data centers, physical hardware, and base services.',
                                'Customer: identities, permissions, encryption, data, and configuration.',
                                'Common mistake: assuming cloud automatically means secure.',
                                'Initial baseline: least-privilege IAM + logging + backups.'
                            ]
                        },
                        {
                            topic: 'Scalability and High Availability',
                            description: 'Resilient design for variable load and failures',
                            points: [
                                'Use autoscaling and load balancers to distribute traffic.',
                                'Deploy across multiple zones to reduce single points of failure.',
                                'Design stateless components to scale horizontally.',
                                'Define SLO/SLA and run capacity tests early.'
                            ]
                        },
                        {
                            topic: 'Cost and FinOps',
                            description: 'Cloud cost control in practice',
                            points: [
                                'Enable budgets and cost alerts from day one.',
                                'Tag resources by environment, team, and project.',
                                'Turn off non-production environments outside working hours.',
                                'Optimize with rightsizing, savings plans, and lifecycle policies.'
                            ]
                        }
                    ]
                },
                comparison: {
                    id: 'comparison',
                    title: 'AWS vs Azure vs GCP',
                    subtitle: 'Most common service equivalents'
                },
                selection: {
                    id: 'selection',
                    title: 'Platform Selection',
                    subtitle: 'When to choose each provider',
                    content: [
                        {
                            topic: 'AWS',
                            description: 'Very complete for infrastructure and broad service catalog',
                            points: [
                                'Mature ecosystem for enterprise and startups.',
                                'Extensive managed services portfolio.',
                                'Strong in hybrid workloads and multi-account setups.'
                            ]
                        },
                        {
                            topic: 'Azure',
                            description: 'Excellent for Microsoft ecosystem',
                            points: [
                                'Strong integration with AD/Entra, Windows Server, and .NET.',
                                'Great fit for traditional enterprise organizations.',
                                'Advantages in hybrid scenarios with Microsoft tooling.'
                            ]
                        },
                        {
                            topic: 'GCP',
                            description: 'Strong in data, analytics, and Kubernetes',
                            points: [
                                'BigQuery and data/ML stack are highly competitive.',
                                'Solid Kubernetes platform experience with GKE.',
                                'Often stands out for simplicity in core services.'
                            ]
                        },
                        {
                            topic: 'Quick decision checklist',
                            description: 'Simple framework to choose without overanalyzing',
                            points: [
                                'Current internal team skills.',
                                'Fit with existing stack and compliance constraints.',
                                'Total cost (not just unit price).',
                                'Latency/region requirements and support model.'
                            ]
                        }
                    ]
                },
                security: {
                    id: 'security',
                    title: 'Cloud Security Baseline',
                    subtitle: 'Minimum production practices',
                    content: [
                        {
                            topic: 'Identity and Access',
                            description: 'IAM as the first security control',
                            points: [
                                'Enforce MFA for privileged accounts.',
                                'Avoid static credentials; prefer roles/managed identities.',
                                'Apply least privilege and regularly review permissions.'
                            ]
                        },
                        {
                            topic: 'Data and Secrets',
                            description: 'Protect sensitive information',
                            points: [
                                'Encrypt data at rest and in transit.',
                                'Store secrets in dedicated secret managers, never hardcoded.',
                                'Test backups with regular restore drills.'
                            ]
                        },
                        {
                            topic: 'Observability and Response',
                            description: 'Early detection and traceability',
                            points: [
                                'Centralize logs, metrics, and actionable alerts.',
                                'Track IAM audit events and infrastructure changes.',
                                'Define incident playbooks and on-call coverage.'
                            ]
                        },
                        {
                            topic: 'Governance',
                            description: 'Policies to scale without losing control',
                            points: [
                                'Set naming, tagging, and guardrail policies early.',
                                'Separate accounts/subscriptions/projects by environment.',
                                'Adopt policy as code for continuous compliance.'
                            ]
                        }
                    ]
                },
                finops: {
                    id: 'finops',
                    title: 'FinOps Essentials',
                    subtitle: 'Cloud cost control and optimization',
                    content: [
                        {
                            topic: 'Visibility',
                            description: 'No optimization without visibility',
                            points: [
                                'Cost dashboards by product and team.',
                                'Alerts for budget deviations.',
                                'Monthly and quarterly cost forecasting.'
                            ]
                        },
                        {
                            topic: 'Optimization',
                            description: 'Reduce waste without hurting availability',
                            points: [
                                'Rightsize instances and databases.',
                                'Shut down idle resources and clean old snapshots.',
                                'Move stable workloads to savings/reserved plans.'
                            ]
                        },
                        {
                            topic: 'Operations',
                            description: 'Continuous cost discipline',
                            points: [
                                'Weekly cost reviews with engineering and product.',
                                'KPIs: cost per customer, request, and environment.',
                                'Automate recommendations and repetitive actions.'
                            ]
                        }
                    ]
                }
            },
            serviceMap: [
                { category: 'Compute (VM)', aws: 'EC2', azure: 'Virtual Machines', gcp: 'Compute Engine' },
                { category: 'Containers (K8s)', aws: 'EKS', azure: 'AKS', gcp: 'GKE' },
                { category: 'Serverless Functions', aws: 'Lambda', azure: 'Azure Functions', gcp: 'Cloud Functions' },
                { category: 'Object Storage', aws: 'S3', azure: 'Blob Storage', gcp: 'Cloud Storage' },
                { category: 'Relational Database', aws: 'RDS / Aurora', azure: 'Azure SQL Database', gcp: 'Cloud SQL' },
                { category: 'NoSQL', aws: 'DynamoDB', azure: 'Cosmos DB', gcp: 'Firestore / Bigtable' },
                { category: 'Load Balancer', aws: 'ELB / ALB / NLB', azure: 'Azure Load Balancer / App Gateway', gcp: 'Cloud Load Balancing' },
                { category: 'IAM', aws: 'IAM', azure: 'Microsoft Entra ID + RBAC', gcp: 'Cloud IAM' },
                { category: 'Monitoring', aws: 'CloudWatch', azure: 'Azure Monitor', gcp: 'Cloud Monitoring' },
                { category: 'CI/CD', aws: 'CodePipeline', azure: 'Azure DevOps / GitHub Actions', gcp: 'Cloud Build' }
            ]
        }
    },

    containers: {
        es: {
            appTitle: 'Containers Pro',
            cheatsheet: 'Cheatsheet minimalista: comando + descripción.',
            command: 'Comando',
            description: 'Descripción',
            sections: {
                docker: {
                    id: 'docker',
                    title: 'Comandos Docker',
                    subtitle: 'Comandos básicos y directos',
                    commands: [
                        { cmd: 'docker ps', desc: 'Lista contenedores en ejecución.' },
                        { cmd: 'docker images', desc: 'Lista imágenes locales.' },
                        { cmd: 'docker build -t mi-app:1.0 .', desc: 'Construye una imagen desde Dockerfile.' },
                        { cmd: 'docker run -d -p 3000:3000 --name mi-app mi-app:1.0', desc: 'Inicia un contenedor en segundo plano.' },
                        { cmd: 'docker logs -f mi-app', desc: 'Sigue logs en tiempo real.' },
                        { cmd: 'docker exec -it mi-app sh', desc: 'Abre shell dentro del contenedor.' },
                        { cmd: 'docker stop mi-app', desc: 'Detiene el contenedor.' },
                        { cmd: 'docker rm mi-app', desc: 'Elimina el contenedor.' }
                    ]
                },
                kubernetes: {
                    id: 'kubernetes',
                    title: 'Comandos Kubernetes',
                    subtitle: 'Comandos básicos y directos',
                    commands: [
                        { cmd: 'kubectl get nodes', desc: 'Lista nodos del cluster.' },
                        { cmd: 'kubectl get pods -A', desc: 'Lista pods en todos los namespaces.' },
                        { cmd: 'kubectl get deploy -n mi-namespace', desc: 'Lista deployments en un namespace.' },
                        { cmd: 'kubectl apply -f deployment.yaml', desc: 'Crea o actualiza recursos.' },
                        { cmd: 'kubectl rollout status deploy/mi-app -n mi-namespace', desc: 'Revisa estado del rollout.' },
                        { cmd: 'kubectl scale deploy/mi-app --replicas=3 -n mi-namespace', desc: 'Escala réplicas.' },
                        { cmd: 'kubectl logs -f deploy/mi-app -n mi-namespace', desc: 'Sigue logs del deployment.' },
                        { cmd: 'kubectl exec -it pod/mi-app-abc123 -n mi-namespace -- sh', desc: 'Abre shell dentro de un pod.' }
                    ]
                }
            }
        },
        en: {
            appTitle: 'Containers Pro',
            cheatsheet: 'Minimal cheatsheet: command + description.',
            command: 'Command',
            description: 'Description',
            sections: {
                docker: {
                    id: 'docker',
                    title: 'Docker Commands',
                    subtitle: 'Basic and direct commands',
                    commands: [
                        { cmd: 'docker ps', desc: 'List running containers.' },
                        { cmd: 'docker images', desc: 'List local images.' },
                        { cmd: 'docker build -t mi-app:1.0 .', desc: 'Build an image from Dockerfile.' },
                        { cmd: 'docker run -d -p 3000:3000 --name mi-app mi-app:1.0', desc: 'Start a container in background mode.' },
                        { cmd: 'docker logs -f mi-app', desc: 'Follow logs in real time.' },
                        { cmd: 'docker exec -it mi-app sh', desc: 'Open a shell inside the container.' },
                        { cmd: 'docker stop mi-app', desc: 'Stop the container.' },
                        { cmd: 'docker rm mi-app', desc: 'Remove the container.' }
                    ]
                },
                kubernetes: {
                    id: 'kubernetes',
                    title: 'Kubernetes Commands',
                    subtitle: 'Basic and direct commands',
                    commands: [
                        { cmd: 'kubectl get nodes', desc: 'List cluster nodes.' },
                        { cmd: 'kubectl get pods -A', desc: 'List pods in all namespaces.' },
                        { cmd: 'kubectl get deploy -n mi-namespace', desc: 'List deployments in a namespace.' },
                        { cmd: 'kubectl apply -f deployment.yaml', desc: 'Create or update resources.' },
                        { cmd: 'kubectl rollout status deploy/mi-app -n mi-namespace', desc: 'Check rollout status.' },
                        { cmd: 'kubectl scale deploy/mi-app --replicas=3 -n mi-namespace', desc: 'Scale replicas.' },
                        { cmd: 'kubectl logs -f deploy/mi-app -n mi-namespace', desc: 'Follow deployment logs.' },
                        { cmd: 'kubectl exec -it pod/mi-app-abc123 -n mi-namespace -- sh', desc: 'Open a shell inside a pod.' }
                    ]
                }
            }
        }
    },

    jsts: {
        es: {
            appTitle: 'JavaScript/TypeScript Pro',
            sections: {
                core: {
                    id: 'core',
                    title: 'Core JavaScript',
                    subtitle: 'Fundamentos que siempre preguntan',
                    content: [
                        {
                            topic: 'Scope, Hoisting y Closure',
                            description: 'Entender esto evita errores comunes en entrevistas.',
                            points: [
                                '`let` y `const` respetan block scope; `var` tiene function scope.',
                                'Hoisting existe para declaraciones; con `let/const` hay TDZ.',
                                'Closure: una función mantiene acceso a su scope léxico.'
                            ],
                            code: `function counter() {
  let c = 0;
  return () => ++c;
}
const next = counter();
next(); // 1
next(); // 2`
                        },
                        {
                            topic: 'this, call, apply, bind',
                            description: '`this` depende de cómo invocas la función, no de dónde se declara.',
                            points: [
                                'Método: `obj.fn()` => `this` apunta a `obj`.',
                                'Función suelta en strict mode: `this` es `undefined`.',
                                '`bind` crea una nueva función con `this` fijo.'
                            ],
                            code: `const user = { name: 'Ana' };
function hi() { return this.name; }
hi.call(user);      // Ana
hi.apply(user);     // Ana
const h = hi.bind(user);
h();                // Ana`
                        }
                    ]
                },
                async: {
                    id: 'async',
                    title: 'Async JavaScript',
                    subtitle: 'Event loop, promises y patrones prácticos',
                    content: [
                        {
                            topic: 'Event Loop',
                            description: 'Diferencia entre macrotasks y microtasks.',
                            points: [
                                'Microtasks (`Promise.then`) se vacían antes de la siguiente macrotask.',
                                '`setTimeout(..., 0)` sigue siendo macrotask.',
                                'Orden típico: sync -> microtasks -> macrotask.'
                            ],
                            code: `console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');
// A D C B`
                        },
                        {
                            topic: 'Promises y async/await',
                            description: 'Patrones básicos para entrevistas.',
                            points: [
                                'Usa `try/catch` con `await` para manejo claro de errores.',
                                '`Promise.all` falla rápido; `allSettled` no.',
                                'Evita `await` secuencial cuando tareas son independientes.'
                            ],
                            code: `async function load() {
  try {
    const [u, p] = await Promise.all([
      fetch('/user').then(r => r.json()),
      fetch('/posts').then(r => r.json())
    ]);
    return { u, p };
  } catch (e) {
    throw new Error('Load failed');
  }
}`
                        }
                    ]
                },
                ts: {
                    id: 'ts',
                    title: 'TypeScript Essentials',
                    subtitle: 'Tipos que más valoran en entrevistas',
                    content: [
                        {
                            topic: 'Type vs Interface + Generics',
                            description: 'Ambos sirven, pero tienen matices de uso.',
                            points: [
                                '`interface` destaca para contratos extensibles.',
                                '`type` destaca para unions, intersections y mapped types.',
                                'Generics crean APIs reutilizables y type-safe.'
                            ],
                            code: `interface User { id: number; name: string; }
type ApiResult<T> = { data: T; error?: string };
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}`
                        },
                        {
                            topic: 'Narrowing y Type Guards',
                            description: 'Imprescindible para código robusto en TS.',
                            points: [
                                'Usa `typeof`, `in`, `instanceof` y guards personalizados.',
                                'Discriminated unions simplifican lógica condicional.',
                                'Prefiere `unknown` sobre `any` en límites externos.'
                            ],
                            code: `type Shape =
  | { kind: 'circle'; r: number }
  | { kind: 'square'; s: number };

function area(shape: Shape) {
  switch (shape.kind) {
    case 'circle': return Math.PI * shape.r ** 2;
    case 'square': return shape.s * shape.s;
  }
}`
                        }
                    ]
                },
                pitfalls: {
                    id: 'pitfalls',
                    title: 'Interview Pitfalls',
                    subtitle: 'Errores típicos y cómo responderlos',
                    content: [
                        {
                            topic: 'Coerción y comparación',
                            description: 'Preguntas clásicas de JS.',
                            points: [
                                'Evita `==` salvo casos muy controlados; usa `===`.',
                                '`null == undefined` es `true`, pero con `===` no.',
                                '`[] == false` es `true` por coerción implícita.'
                            ],
                            code: `0 == false      // true
0 === false     // false
null == undefined  // true
[] == false     // true`
                        },
                        {
                            topic: 'Mutabilidad',
                            description: 'Spread no es deep copy.',
                            points: [
                                'Objetos/arrays se pasan por referencia.',
                                '`{...obj}` y `[...arr]` copian sólo primer nivel.',
                                'En frontend, inmutabilidad reduce bugs de estado.'
                            ],
                            code: `const a = { x: { y: 1 } };
const b = { ...a };
b.x.y = 99;
console.log(a.x.y); // 99`
                        }
                    ]
                },
                interview: {
                    id: 'interview',
                    title: 'Preguntas Rápidas',
                    subtitle: 'Checklist para repaso pre-entrevista',
                    rows: [
                        { q: 'Diferencia entre `type` e `interface`', a: '`interface` para contratos extensibles; `type` para composición avanzada (union/intersection).' },
                        { q: '¿Cuándo usar `Promise.allSettled`?', a: 'Cuando necesitas el resultado de todas las tareas aunque algunas fallen.' },
                        { q: '¿Qué problema resuelve un closure?', a: 'Encapsular estado privado sin exponerlo globalmente.' },
                        { q: '`any` vs `unknown`', a: '`unknown` fuerza validación antes de usar; es más seguro que `any`.' },
                        { q: 'Microtask vs Macrotask', a: 'Microtasks (promises) se ejecutan antes de la siguiente macrotask (setTimeout).' }
                    ]
                }
            }
        },
        en: {
            appTitle: 'JavaScript/TypeScript Pro',
            sections: {
                core: {
                    id: 'core',
                    title: 'Core JavaScript',
                    subtitle: 'Fundamentals frequently asked in interviews',
                    content: [
                        {
                            topic: 'Scope, Hoisting and Closure',
                            description: 'Understanding this avoids common interview mistakes.',
                            points: [
                                '`let` and `const` are block-scoped; `var` is function-scoped.',
                                'Hoisting exists for declarations; `let/const` have TDZ.',
                                'Closure means a function keeps access to lexical scope.'
                            ],
                            code: `function counter() {
  let c = 0;
  return () => ++c;
}
const next = counter();
next(); // 1
next(); // 2`
                        },
                        {
                            topic: 'this, call, apply, bind',
                            description: '`this` depends on invocation style, not declaration place.',
                            points: [
                                'Method call: `obj.fn()` => `this` points to `obj`.',
                                'Standalone function in strict mode: `this` is `undefined`.',
                                '`bind` returns a new function with fixed `this`.'
                            ],
                            code: `const user = { name: 'Ana' };
function hi() { return this.name; }
hi.call(user);      // Ana
hi.apply(user);     // Ana
const h = hi.bind(user);
h();                // Ana`
                        }
                    ]
                },
                async: {
                    id: 'async',
                    title: 'Async JavaScript',
                    subtitle: 'Event loop, promises and practical patterns',
                    content: [
                        {
                            topic: 'Event Loop',
                            description: 'Difference between macrotasks and microtasks.',
                            points: [
                                'Microtasks (`Promise.then`) are drained before next macrotask.',
                                '`setTimeout(..., 0)` is still a macrotask.',
                                'Typical order: sync -> microtasks -> macrotask.'
                            ],
                            code: `console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');
// A D C B`
                        },
                        {
                            topic: 'Promises and async/await',
                            description: 'Core interview-ready async patterns.',
                            points: [
                                'Use `try/catch` with `await` for clear error handling.',
                                '`Promise.all` fails fast; `allSettled` does not.',
                                'Avoid sequential `await` when tasks are independent.'
                            ],
                            code: `async function load() {
  try {
    const [u, p] = await Promise.all([
      fetch('/user').then(r => r.json()),
      fetch('/posts').then(r => r.json())
    ]);
    return { u, p };
  } catch (e) {
    throw new Error('Load failed');
  }
}`
                        }
                    ]
                },
                ts: {
                    id: 'ts',
                    title: 'TypeScript Essentials',
                    subtitle: 'Types that interviewers value most',
                    content: [
                        {
                            topic: 'Type vs Interface + Generics',
                            description: 'Both are useful, with different strengths.',
                            points: [
                                '`interface` is great for extensible contracts.',
                                '`type` is great for unions, intersections and mapped types.',
                                'Generics help design reusable and type-safe APIs.'
                            ],
                            code: `interface User { id: number; name: string; }
type ApiResult<T> = { data: T; error?: string };
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}`
                        },
                        {
                            topic: 'Narrowing and Type Guards',
                            description: 'Essential for robust TypeScript code.',
                            points: [
                                'Use `typeof`, `in`, `instanceof`, and custom guards.',
                                'Discriminated unions simplify conditional logic.',
                                'Prefer `unknown` over `any` at external boundaries.'
                            ],
                            code: `type Shape =
  | { kind: 'circle'; r: number }
  | { kind: 'square'; s: number };

function area(shape: Shape) {
  switch (shape.kind) {
    case 'circle': return Math.PI * shape.r ** 2;
    case 'square': return shape.s * shape.s;
  }
}`
                        }
                    ]
                },
                pitfalls: {
                    id: 'pitfalls',
                    title: 'Interview Pitfalls',
                    subtitle: 'Common mistakes and how to answer them',
                    content: [
                        {
                            topic: 'Coercion and comparison',
                            description: 'Classic JavaScript interview traps.',
                            points: [
                                'Avoid `==` except in very controlled scenarios; use `===`.',
                                '`null == undefined` is `true`, but not with `===`.',
                                '`[] == false` is `true` due to implicit coercion.'
                            ],
                            code: `0 == false      // true
0 === false     // false
null == undefined  // true
[] == false     // true`
                        },
                        {
                            topic: 'Mutability',
                            description: 'Spread is not a deep copy.',
                            points: [
                                'Objects/arrays are passed by reference.',
                                '`{...obj}` and `[...arr]` copy only first level.',
                                'In frontend apps, immutability helps reduce state bugs.'
                            ],
                            code: `const a = { x: { y: 1 } };
const b = { ...a };
b.x.y = 99;
console.log(a.x.y); // 99`
                        }
                    ]
                },
                interview: {
                    id: 'interview',
                    title: 'Quick Questions',
                    subtitle: 'Checklist for pre-interview review',
                    rows: [
                        { q: 'Difference between `type` and `interface`', a: '`interface` for extensible contracts; `type` for advanced composition (union/intersection).' },
                        { q: 'When should you use `Promise.allSettled`?', a: 'When you need results from all tasks even if some fail.' },
                        { q: 'What problem does closure solve?', a: 'It encapsulates private state without exposing it globally.' },
                        { q: '`any` vs `unknown`', a: '`unknown` forces validation before usage, making it safer than `any`.' },
                        { q: 'Microtask vs Macrotask', a: 'Microtasks (promises) run before the next macrotask (setTimeout).' }
                    ]
                }
            }
        }
    },

    react: {
        es: {
            title: 'React Pro',
            subtitle: 'Biblioteca UI declarativa',
            fundamentalsTitle: 'Fundamentos de React',
            interviewTitle: 'Preguntas de Entrevista',
        },
        en: {
            title: 'React Pro',
            subtitle: 'Declarative UI library',
            fundamentalsTitle: 'React Fundamentals',
            interviewTitle: 'Interview Questions',
        }
    },

    angular: {
        es: {
            title: 'Angular Pro',
            subtitle: 'Framework completo para SPAs',
            fundamentalsTitle: 'Fundamentos de Angular',
            interviewTitle: 'Preguntas de Entrevista',
        },
        en: {
            title: 'Angular Pro',
            subtitle: 'Complete framework for SPAs',
            fundamentalsTitle: 'Angular Fundamentals',
            interviewTitle: 'Interview Questions',
        }
    }
};

// Helper function to get translated text
export const t = (path, language = 'es') => {
    const keys = path.split('.');
    let value = translations;

    for (const key of keys) {
        value = value?.[key];
        if (value === undefined) {
            console.warn(`Translation not found for: ${path}`);
            return path;
        }
    }

    return value?.[language] || value?.es || path;
};

export default translations;
