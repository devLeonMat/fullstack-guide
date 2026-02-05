import { useState, useEffect } from 'react';
import { Code, Box, Puzzle, Network, Coffee, Leaf, Atom, Triangle, Search, Server } from 'lucide-react';
import CleanCode from './components/CleanCode';
import Solid from './components/Solid';
import Patterns from './components/Patterns';
import Architecture from './components/Architecture';
import JavaPro from './components/JavaPro';
import SpringPro from './components/SpringPro';
import ReactPro from './components/ReactPro';
import AngularPro from './components/AngularPro';
import NodePro from './components/NodePro';
import SearchBar from './components/SearchBar';

function App() {
  const [activeTab, setActiveTab] = useState('cleancode');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const tabs = [
    { id: 'cleancode', name: 'Clean Code', icon: Code, color: 'text-green-400', bgColor: 'bg-green-500/10' },
    { id: 'solid', name: 'SOLID', icon: Box, color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
    { id: 'patterns', name: 'Patterns', icon: Puzzle, color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
    { id: 'architecture', name: 'Architecture', icon: Network, color: 'text-cyan-400', bgColor: 'bg-cyan-500/10' },
    { id: 'node', name: 'Node.js Pro', icon: Server, color: 'text-emerald-400', bgColor: 'bg-emerald-500/10' },
    { id: 'java', name: 'Java Pro', icon: Coffee, color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
    { id: 'spring', name: 'Spring Pro', icon: Leaf, color: 'text-green-400', bgColor: 'bg-green-500/10' },
    { id: 'react', name: 'React Pro', icon: Atom, color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
    { id: 'angular', name: 'Angular Pro', icon: Triangle, color: 'text-red-400', bgColor: 'bg-red-500/10' },
  ];

  // Search index - simplified version
  const searchIndex = [
    // Clean Code
    { tab: 'cleancode', tabName: 'Clean Code', tabColor: 'bg-green-500/20 text-green-400', section: 'Principios', title: 'DRY - Don\'t Repeat Yourself', preview: 'No repitas código. Cada pieza de conocimiento debe tener una única representación en el sistema.' },
    { tab: 'cleancode', tabName: 'Clean Code', tabColor: 'bg-green-500/20 text-green-400', section: 'Principios', title: 'KISS - Keep It Simple', preview: 'Mantén las cosas simples. La simplicidad debe ser un objetivo clave del diseño.' },
    { tab: 'cleancode', tabName: 'Clean Code', tabColor: 'bg-green-500/20 text-green-400', section: 'Principios', title: 'YAGNI - You Aren\'t Gonna Need It', preview: 'No agregues funcionalidad hasta que realmente la necesites.' },
    { tab: 'cleancode', tabName: 'Clean Code', tabColor: 'bg-green-500/20 text-green-400', section: 'Principios', title: 'Boy Scout Rule', preview: 'Siempre deja el código un poco mejor que como lo encontraste.' },
    { tab: 'cleancode', tabName: 'Clean Code', tabColor: 'bg-green-500/20 text-green-400', section: 'Principios', title: 'Self-Documenting Code', preview: 'El código debe explicarse a sí mismo. Usa nombres descriptivos.' },

    // SOLID
    { tab: 'solid', tabName: 'SOLID', tabColor: 'bg-blue-500/20 text-blue-400', section: 'Principios OOP', title: 'Single Responsibility Principle', preview: 'Una clase debe tener una única responsabilidad y una sola razón para cambiar.' },
    { tab: 'solid', tabName: 'SOLID', tabColor: 'bg-blue-500/20 text-blue-400', section: 'Principios OOP', title: 'Open/Closed Principle', preview: 'Abierto para extensión, cerrado para modificación. Usa abstracción y polimorfismo.' },
    { tab: 'solid', tabName: 'SOLID', tabColor: 'bg-blue-500/20 text-blue-400', section: 'Principios OOP', title: 'Liskov Substitution Principle', preview: 'Los objetos de una clase derivada deben poder reemplazar objetos de la clase base.' },
    { tab: 'solid', tabName: 'SOLID', tabColor: 'bg-blue-500/20 text-blue-400', section: 'Principios OOP', title: 'Interface Segregation Principle', preview: 'No se debe forzar a los clientes a depender de interfaces que no usan.' },
    { tab: 'solid', tabName: 'SOLID', tabColor: 'bg-blue-500/20 text-blue-400', section: 'Principios OOP', title: 'Dependency Inversion Principle', preview: 'Depende de abstracciones, no de implementaciones concretas.' },

    // Patterns
    { tab: 'patterns', tabName: 'Patterns', tabColor: 'bg-purple-500/20 text-purple-400', section: 'Design Patterns', title: 'Singleton Pattern', preview: 'Asegura que una clase tenga una única instancia y proporciona un punto de acceso global.' },
    { tab: 'patterns', tabName: 'Patterns', tabColor: 'bg-purple-500/20 text-purple-400', section: 'Design Patterns', title: 'Factory Pattern', preview: 'Define una interfaz para crear objetos, pero deja que las subclases decidan qué clase instanciar.' },
    { tab: 'patterns', tabName: 'Patterns', tabColor: 'bg-purple-500/20 text-purple-400', section: 'Design Patterns', title: 'Observer Pattern', preview: 'Define una dependencia uno-a-muchos. Cuando un objeto cambia, todos sus dependientes son notificados.' },
    { tab: 'patterns', tabName: 'Patterns', tabColor: 'bg-purple-500/20 text-purple-400', section: 'Design Patterns', title: 'Strategy Pattern', preview: 'Define una familia de algoritmos, encapsula cada uno y los hace intercambiables.' },
    { tab: 'patterns', tabName: 'Patterns', tabColor: 'bg-purple-500/20 text-purple-400', section: 'Design Patterns', title: 'Adapter Pattern', preview: 'Permite que interfaces incompatibles trabajen juntas.' },
    { tab: 'patterns', tabName: 'Patterns', tabColor: 'bg-purple-500/20 text-purple-400', section: 'Design Patterns', title: 'Command Pattern', preview: 'Encapsula una solicitud como un objeto.' },

    // Architecture
    { tab: 'architecture', tabName: 'Architecture', tabColor: 'bg-cyan-500/20 text-cyan-400', section: 'Arquitecturas', title: 'MVC - Model View Controller', preview: 'Separa la lógica de negocio, la presentación y el control de flujo.' },
    { tab: 'architecture', tabName: 'Architecture', tabColor: 'bg-cyan-500/20 text-cyan-400', section: 'Arquitecturas', title: 'Microservices', preview: 'Arquitectura distribuida donde cada servicio es independiente y auto-contenido.' },
    { tab: 'architecture', tabName: 'Architecture', tabColor: 'bg-cyan-500/20 text-cyan-400', section: 'Arquitecturas', title: 'Event-Driven Architecture', preview: 'Los componentes se comunican a través de eventos asíncronos.' },
    { tab: 'architecture', tabName: 'Architecture', tabColor: 'bg-cyan-500/20 text-cyan-400', section: 'Arquitecturas', title: 'Hexagonal Architecture', preview: 'Aísla la lógica de negocio de dependencias externas mediante puertos y adaptadores.' },

    // Java
    { tab: 'java', tabName: 'Java Pro', tabColor: 'bg-orange-500/20 text-orange-400', section: 'Features', title: 'Lambda Expressions', preview: 'Programación funcional en Java 8+' },
    { tab: 'java', tabName: 'Java Pro', tabColor: 'bg-orange-500/20 text-orange-400', section: 'Features', title: 'Stream API', preview: 'Procesamiento de colecciones funcional' },
    { tab: 'java', tabName: 'Java Pro', tabColor: 'bg-orange-500/20 text-orange-400', section: 'Features', title: 'Records', preview: 'Clases de datos inmutables en Java 17+' },
    { tab: 'java', tabName: 'Java Pro', tabColor: 'bg-orange-500/20 text-orange-400', section: 'Features', title: 'Virtual Threads', preview: 'Concurrencia ligera en Java 21' },

    // Spring
    { tab: 'spring', tabName: 'Spring Pro', tabColor: 'bg-green-500/20 text-green-400', section: 'Core', title: 'Dependency Injection', preview: 'Inyección de dependencias en Spring' },
    { tab: 'spring', tabName: 'Spring Pro', tabColor: 'bg-green-500/20 text-green-400', section: 'Core', title: 'Bean Scopes', preview: 'Singleton, Prototype, Request, Session' },
    { tab: 'spring', tabName: 'Spring Pro', tabColor: 'bg-green-500/20 text-green-400', section: 'Data', title: 'JPA Repositories', preview: 'CRUD sin escribir SQL' },
    { tab: 'spring', tabName: 'Spring Pro', tabColor: 'bg-green-500/20 text-green-400', section: 'Boot', title: 'Spring Boot Starters', preview: 'Dependencias pre-configuradas' },

    // React
    { tab: 'react', tabName: 'React Pro', tabColor: 'bg-blue-500/20 text-blue-400', section: 'Core', title: 'Virtual DOM', preview: 'Representación en memoria del DOM real' },
    { tab: 'react', tabName: 'React Pro', tabColor: 'bg-blue-500/20 text-blue-400', section: 'Core', title: 'JSX', preview: 'Sintaxis de extensión de JavaScript' },
    { tab: 'react', tabName: 'React Pro', tabColor: 'bg-blue-500/20 text-blue-400', section: 'Hooks', title: 'useState', preview: 'Estado local en componentes funcionales' },
    { tab: 'react', tabName: 'React Pro', tabColor: 'bg-blue-500/20 text-blue-400', section: 'Hooks', title: 'useEffect', preview: 'Efectos secundarios y sincronización' },
    { tab: 'react', tabName: 'React Pro', tabColor: 'bg-blue-500/20 text-blue-400', section: 'Hooks', title: 'useMemo', preview: 'Memoización de valores calculados' },

    // Angular
    { tab: 'angular', tabName: 'Angular Pro', tabColor: 'bg-red-500/20 text-red-400', section: 'Building Blocks', title: 'Components', preview: 'Bloques fundamentales de Angular' },
    { tab: 'angular', tabName: 'Angular Pro', tabColor: 'bg-red-500/20 text-red-400', section: 'Building Blocks', title: 'Directives', preview: 'Modifican comportamiento del DOM' },
    { tab: 'angular', tabName: 'Angular Pro', tabColor: 'bg-red-500/20 text-red-400', section: 'Reactivity', title: 'Signals', preview: 'Sistema reactivo moderno de Angular 16+' },
    { tab: 'angular', tabName: 'Angular Pro', tabColor: 'bg-red-500/20 text-red-400', section: 'RxJS', title: 'Observables', preview: 'Streams de datos asíncronos' },

    // Node.js
    { tab: 'node', tabName: 'Node.js Pro', tabColor: 'bg-emerald-500/20 text-emerald-400', section: 'Fundamentals', title: 'Event Loop', preview: 'Ciclo de eventos asíncrono, non-blocking I/O' },
    { tab: 'node', tabName: 'Node.js Pro', tabColor: 'bg-emerald-500/20 text-emerald-400', section: 'Fundamentals', title: 'Modules', preview: 'CommonJS vs ES Modules' },
    { tab: 'node', tabName: 'Node.js Pro', tabColor: 'bg-emerald-500/20 text-emerald-400', section: 'Fundamentals', title: 'NPM', preview: 'Node Package Manager y gestión de dependencias' },
    { tab: 'node', tabName: 'Node.js Pro', tabColor: 'bg-emerald-500/20 text-emerald-400', section: 'APIs', title: 'Express.js', preview: 'Framework web más popular para Node.js' },
    { tab: 'node', tabName: 'Node.js Pro', tabColor: 'bg-emerald-500/20 text-emerald-400', section: 'APIs', title: 'Fastify', preview: 'Framework rápido con validación de schemas' },
    { tab: 'node', tabName: 'Node.js Pro', tabColor: 'bg-emerald-500/20 text-emerald-400', section: 'APIs', title: 'GraphQL', preview: 'API flexible con Apollo Server' },
  ];

  const handleSearch = (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results = searchIndex
      .filter(item =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.preview.toLowerCase().includes(lowerQuery) ||
        item.section.toLowerCase().includes(lowerQuery)
      )
      .map(item => ({
        ...item,
        onClick: () => setActiveTab(item.tab)
      }))
      .slice(0, 10); // Limit to 10 results

    setSearchResults(results);
  };

  // Listen for custom search event
  useEffect(() => {
    const handler = () => setIsSearchOpen(true);
    document.addEventListener('openSearch', handler);
    return () => document.removeEventListener('openSearch', handler);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'cleancode': return <CleanCode />;
      case 'solid': return <Solid />;
      case 'patterns': return <Patterns />;
      case 'architecture': return <Architecture />;
      case 'node': return <NodePro />;
      case 'java': return <JavaPro />;
      case 'spring': return <SpringPro />;
      case 'react': return <ReactPro />;
      case 'angular': return <AngularPro />;
      default: return <CleanCode />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Search Bar */}
      <SearchBar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
        results={searchResults}
      />

      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                FullStack Guide
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Guía Interactiva para Desarrolladores / Interactive Developer Guide
              </p>
            </div>

            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg transition-all group"
            >
              <Search className="w-4 h-4 text-slate-400 group-hover:text-slate-200" />
              <span className="text-slate-400 text-sm group-hover:text-slate-200">Buscar...</span>
              <kbd className="px-2 py-1 text-xs bg-slate-700/50 border border-slate-600 rounded">⌘K</kbd>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-800 sticky top-[73px] z-40">
        <div className="container mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${activeTab === tab.id
                  ? `${tab.bgColor} ${tab.color} font-semibold`
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-slate-800 mt-16 py-6">
        <div className="container mx-auto px-6 text-center text-slate-400 text-sm">
          <p>FullStack Guide © 2026 - Guía de referencia para desarrolladores</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
