import {
  SiJenkins, SiGithubactions, SiGocd, SiArgo, SiSonarqubecloud, SiSonarqubeserver,
  SiJunit5, SiJest, SiJasmine, SiDocker, SiDatadog, SiDynatrace, SiNewrelic,
  SiApachekafka, SiRabbitmq, SiGooglecloud, SiGithub, SiGitlab, SiBitbucket,
  SiSubversion, SiJira, SiConfluence, SiTrello, SiSnyk, SiHelm, SiTerraform,
  SiOpentelemetry, SiPrometheus, SiSpring, SiKong,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { VscAzure, VscAzureDevops } from 'react-icons/vsc';

// Brand logo + brand color per tool name (names must match tools.js).
// Simple Icons dropped AWS and Azure marks, so those services use the cloud's logo.
const AWS = { Icon: FaAws, color: '#FF9900' };
const AZURE = { Icon: VscAzure, color: '#0078D4' };
const AZURE_DEVOPS = { Icon: VscAzureDevops, color: '#0078D7' };

export const LOGOS = {
  // CI/CD
  Jenkins: { Icon: SiJenkins, color: '#D24939' },
  'GitHub Actions': { Icon: SiGithubactions, color: '#2088FF' },
  'Azure DevOps Pipelines': AZURE_DEVOPS,
  GoCD: { Icon: SiGocd, color: '#94399E' },
  'Argo CD': { Icon: SiArgo, color: '#EF7B4D' },
  'GitLab CI': { Icon: SiGitlab, color: '#FC6D26' },
  // Quality
  SonarCloud: { Icon: SiSonarqubecloud, color: '#126ED3' },
  SonarQube: { Icon: SiSonarqubeserver, color: '#126ED3' },
  'Snyk / Dependabot': { Icon: SiSnyk, color: '#4C4A73' },
  // Testing
  'JUnit + Mockito': { Icon: SiJunit5, color: '#25A162' },
  Jest: { Icon: SiJest, color: '#C21325' },
  'Karma + Jasmine': { Icon: SiJasmine, color: '#8A4182' },
  // Containers
  Docker: { Icon: SiDocker, color: '#2496ED' },
  'Amazon EKS': AWS,
  'Azure AKS': AZURE,
  'Amazon ECS': AWS,
  Helm: { Icon: SiHelm, color: '#0F1689' },
  Terraform: { Icon: SiTerraform, color: '#844FBA' },
  // Serverless
  'AWS Lambda': AWS,
  'Azure Functions': AZURE,
  // Observability
  'Amazon CloudWatch': AWS,
  'Azure Application Insights': AZURE,
  Datadog: { Icon: SiDatadog, color: '#632CA6' },
  Dynatrace: { Icon: SiDynatrace, color: '#1496FF' },
  'New Relic': { Icon: SiNewrelic, color: '#1CE783' },
  OpenTelemetry: { Icon: SiOpentelemetry, color: '#425CC7' },
  'Prometheus + Grafana': { Icon: SiPrometheus, color: '#E6522C' },
  // Messaging
  'Apache Kafka': { Icon: SiApachekafka, color: '#231F20' },
  RabbitMQ: { Icon: SiRabbitmq, color: '#FF6600' },
  'Azure Event Hubs': AZURE,
  'Amazon SQS / SNS': AWS,
  // API gateway
  Apigee: { Icon: SiGooglecloud, color: '#4285F4' },
  'Spring Cloud Gateway': { Icon: SiSpring, color: '#6DB33F' },
  'AWS API Gateway / Kong': { Icon: SiKong, color: '#003459' },
  // Version control
  GitHub: { Icon: SiGithub, color: '#181717' },
  GitLab: { Icon: SiGitlab, color: '#FC6D26' },
  Bitbucket: { Icon: SiBitbucket, color: '#0052CC' },
  'Azure Repos': AZURE_DEVOPS,
  SVN: { Icon: SiSubversion, color: '#809CC9' },
  // Planning
  Jira: { Icon: SiJira, color: '#0052CC' },
  Confluence: { Icon: SiConfluence, color: '#172B4D' },
  'Azure Boards': AZURE_DEVOPS,
  Trello: { Icon: SiTrello, color: '#0052CC' },
};
