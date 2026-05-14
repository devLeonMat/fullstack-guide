import { useState, useEffect, useMemo, useRef, lazy, Suspense } from 'react';
import { Code, Box, Puzzle, Network, Search, Cloud, Coffee, Star, BookOpen, Sun, Moon, GitBranch, Bot, Globe, BrainCircuit } from 'lucide-react';
import { SiSpring, SiReact, SiAngular, SiNodedotjs, SiDocker, SiJavascript, SiGraphql, SiPython, SiKotlin } from 'react-icons/si';
import SearchBar from './components/SearchBar';
import LanguageToggle from './components/LanguageToggle';
import { useLanguage } from './contexts/LanguageContext';
import { useTheme } from './contexts/ThemeContext';
import { useStudyMode } from './contexts/StudyModeContext';
import { useProgress } from './hooks/useProgress';
import { buildSearchIndex } from './data/searchIndex';
import { t } from './translations';

const CleanCode = lazy(() => import('./components/CleanCode'));
const Solid = lazy(() => import('./components/Solid'));
const Patterns = lazy(() => import('./components/Patterns'));
const Architecture = lazy(() => import('./components/Architecture'));
const JSTSPro = lazy(() => import('./components/JSTSPro'));
const JavaPro = lazy(() => import('./components/JavaPro'));
const SpringPro = lazy(() => import('./components/SpringPro'));
const ReactPro = lazy(() => import('./components/ReactPro'));
const AngularPro = lazy(() => import('./components/AngularPro'));
const NodePro = lazy(() => import('./components/NodePro'));
const CloudBasics = lazy(() => import('./components/CloudBasics'));
const ContainersPro = lazy(() => import('./components/ContainersPro'));
const GraphQLPro = lazy(() => import('./components/GraphQLPro'));
const TestingPro = lazy(() => import('./components/TestingPro'));
const DatabasesPro = lazy(() => import('./components/DatabasesPro'));
const SecurityPro = lazy(() => import('./components/SecurityPro'));
const PythonPro = lazy(() => import('./components/PythonPro'));
const KotlinPro = lazy(() => import('./components/KotlinPro'));
const DSAPro = lazy(() => import('./components/DSAPro'));
const AILLMPro = lazy(() => import('./components/AILLMPro'));
const APIDesignPro = lazy(() => import('./components/APIDesignPro'));
const GitAdvancedPro = lazy(() => import('./components/GitAdvancedPro'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-8 h-8 border-2 border-slate-600 border-t-blue-400 rounded-full animate-spin" />
  </div>
);

function App() {
  const { language } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { studyMode, toggleStudyMode } = useStudyMode();
  const { visited, favorites, markVisited, toggleFavorite } = useProgress();
  const common = t('common', language);

  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.slice(1);
    return hash || 'cleancode';
  });
  const [activeCategory, setActiveCategory] = useState('fundamentals');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const categoryScrollRef = useRef(null);
  const tabScrollRef = useRef(null);

  const categories = useMemo(() => [
    { id: 'fundamentals', name: common.categoryFundamentals },
    { id: 'languages', name: common.categoryLanguages },
    { id: 'backend', name: common.categoryBackend },
    { id: 'frontend', name: common.categoryFrontend },
    { id: 'clouddevops', name: common.categoryCloudDevops },
    { id: 'databases', name: common.categoryDatabases },
    { id: 'ai', name: common.categoryAI },
    ...(favorites.size > 0 ? [{ id: 'favorites', name: common.categoryFavorites }] : []),
  ], [language, favorites.size, common]);

  const tabs = useMemo(() => [
    { id: 'cleancode', category: 'fundamentals', name: 'Clean Code', icon: Code, color: 'text-green-400', bgColor: 'bg-green-500/10' },
    { id: 'solid', category: 'fundamentals', name: 'SOLID', icon: Box, color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
    { id: 'patterns', category: 'fundamentals', name: 'Patterns', icon: Puzzle, color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
    { id: 'architecture', category: 'fundamentals', name: 'Architecture', icon: Network, color: 'text-cyan-400', bgColor: 'bg-cyan-500/10' },
    { id: 'dsa', category: 'fundamentals', name: common.tabDSA, icon: BrainCircuit, color: 'text-indigo-400', bgColor: 'bg-indigo-500/10' },
    { id: 'jsts', category: 'languages', name: common.tabJsTs, icon: SiJavascript, color: 'text-yellow-300', bgColor: 'bg-yellow-500/10' },
    { id: 'java', category: 'languages', name: 'Java Pro', icon: Coffee, color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
    { id: 'python', category: 'languages', name: common.tabPython, icon: SiPython, color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
    { id: 'kotlin', category: 'languages', name: common.tabKotlin, icon: SiKotlin, color: 'text-violet-400', bgColor: 'bg-violet-500/10' },
    { id: 'node', category: 'backend', name: 'Node.js Pro', icon: SiNodedotjs, color: 'text-emerald-400', bgColor: 'bg-emerald-500/10' },
    { id: 'spring', category: 'backend', name: 'Spring Pro', icon: SiSpring, color: 'text-green-400', bgColor: 'bg-green-500/10' },
    { id: 'graphql', category: 'backend', name: 'GraphQL Pro', icon: SiGraphql, color: 'text-pink-400', bgColor: 'bg-pink-500/10' },
    { id: 'apidesign', category: 'backend', name: common.tabAPIDesign, icon: Globe, color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
    { id: 'react', category: 'frontend', name: 'React Pro', icon: SiReact, color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
    { id: 'angular', category: 'frontend', name: 'Angular Pro', icon: SiAngular, color: 'text-red-400', bgColor: 'bg-red-500/10' },
    { id: 'cloud', category: 'clouddevops', name: common.tabCloud, icon: Cloud, color: 'text-sky-400', bgColor: 'bg-sky-500/10' },
    { id: 'containers', category: 'clouddevops', name: common.tabContainers, icon: SiDocker, color: 'text-teal-400', bgColor: 'bg-teal-500/10' },
    { id: 'git', category: 'clouddevops', name: common.tabGit, icon: GitBranch, color: 'text-rose-400', bgColor: 'bg-rose-500/10' },
    { id: 'testing', category: 'databases', name: common.tabTesting, icon: Code, color: 'text-amber-400', bgColor: 'bg-amber-500/10' },
    { id: 'databases', category: 'databases', name: common.tabDatabases, icon: Network, color: 'text-violet-400', bgColor: 'bg-violet-500/10' },
    { id: 'security', category: 'databases', name: common.tabSecurity, icon: Box, color: 'text-red-400', bgColor: 'bg-red-500/10' },
    { id: 'aillm', category: 'ai', name: common.tabAILLM, icon: Bot, color: 'text-fuchsia-400', bgColor: 'bg-fuchsia-500/10' },
  ], [language, common]);

  const visibleTabs = useMemo(() => {
    if (activeCategory === 'favorites') {
      return tabs.filter(tab => favorites.has(tab.id));
    }
    return tabs.filter(tab => tab.category === activeCategory);
  }, [tabs, activeCategory, favorites]);

  const searchIndex = useMemo(() => buildSearchIndex(language), [language]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    markVisited(tabId);
    window.history.replaceState(null, '', `#${tabId}`);
  };

  const handleSearch = (query) => {
    if (!query || query.length < 2) { setSearchResults([]); return; }
    const lowerQuery = query.toLowerCase();
    const results = searchIndex
      .filter(item =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.preview.toLowerCase().includes(lowerQuery) ||
        item.section.toLowerCase().includes(lowerQuery)
      )
      .map(item => ({ ...item, onClick: () => handleTabChange(item.tab) }))
      .slice(0, 10);
    setSearchResults(results);
  };

  // Sync category when tab changes
  useEffect(() => {
    const current = tabs.find(tab => tab.id === activeTab);
    if (current && current.category !== activeCategory && activeCategory !== 'favorites') {
      setActiveCategory(current.category);
    }
  }, [activeTab, activeCategory, tabs]);

  // Validate hash on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && tabs.find(t => t.id === hash)) {
      handleTabChange(hash);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll active category into view
  useEffect(() => {
    const el = categoryScrollRef.current?.querySelector('[data-active="true"]');
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeCategory]);

  // Auto-scroll active tab into view
  useEffect(() => {
    const el = tabScrollRef.current?.querySelector('[data-active="true"]');
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeTab]);

  // Open search via keyboard or custom event
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
      case 'jsts': return <JSTSPro />;
      case 'cloud': return <CloudBasics />;
      case 'containers': return <ContainersPro />;
      case 'node': return <NodePro />;
      case 'java': return <JavaPro />;
      case 'spring': return <SpringPro />;
      case 'react': return <ReactPro />;
      case 'angular': return <AngularPro />;
      case 'graphql': return <GraphQLPro />;
      case 'testing': return <TestingPro />;
      case 'databases': return <DatabasesPro />;
      case 'security': return <SecurityPro />;
      case 'python': return <PythonPro />;
      case 'kotlin': return <KotlinPro />;
      case 'dsa': return <DSAPro />;
      case 'aillm': return <AILLMPro />;
      case 'apidesign': return <APIDesignPro />;
      case 'git': return <GitAdvancedPro />;
      default: return <CleanCode />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <SearchBar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
        results={searchResults}
      />

      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 md:gap-3">
                <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                  {common.appTitle}
                </h1>
                <span className="px-2 py-0.5 text-xs font-mono font-semibold rounded-full bg-slate-800 border border-slate-600 text-slate-400">
                  v{__APP_VERSION__}
                </span>
              </div>
              <p className="text-slate-400 text-xs md:text-sm mt-0.5 md:mt-1">{common.appSubtitle}</p>
            </div>

            <div className="flex items-center gap-1.5 md:gap-2">
              {/* Study mode toggle */}
              <button
                onClick={toggleStudyMode}
                title={studyMode ? common.studyModeOn : common.studyMode}
                className={`flex items-center gap-1.5 px-2.5 md:px-3 py-2 rounded-lg border transition-all text-sm ${
                  studyMode
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden md:inline">{studyMode ? common.studyModeOn : common.studyMode}</span>
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                title={theme === 'dark' ? common.lightMode : common.darkMode}
                className="flex items-center gap-1.5 px-2.5 md:px-3 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg transition-all text-slate-400 hover:text-slate-200"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <LanguageToggle />

              {/* Search button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 md:px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg transition-all group"
              >
                <Search className="w-4 h-4 text-slate-400 group-hover:text-slate-200" />
                <span className="hidden sm:inline text-slate-400 text-sm group-hover:text-slate-200">{common.search}</span>
                <kbd className="hidden sm:inline px-2 py-1 text-xs bg-slate-700/50 border border-slate-600 rounded">⌘K</kbd>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-800 sticky top-[57px] md:top-[73px] z-40">
        <div className="container mx-auto px-4 md:px-6 py-2 md:py-3 space-y-1.5 md:space-y-3">

          {/* Category row */}
          <div className="relative">
            <div ref={categoryScrollRef} className="flex gap-1.5 md:gap-2 overflow-x-auto scrollbar-hide scroll-smooth">
              {categories.map(category => (
                <button
                  key={category.id}
                  data-active={activeCategory === category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    if (category.id !== 'favorites') {
                      const firstTab = tabs.find(tab => tab.category === category.id);
                      if (firstTab) handleTabChange(firstTab.id);
                    }
                  }}
                  className={`flex-shrink-0 px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-all whitespace-nowrap text-xs md:text-sm font-medium ${
                    activeCategory === category.id
                      ? 'bg-slate-700 text-slate-100 font-semibold border border-slate-500'
                      : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700'
                  }`}
                >
                  {category.id === 'favorites' ? `★ ${category.name}` : category.name}
                </button>
              ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none md:hidden" />
          </div>

          {/* Tab row */}
          <div className="relative">
            {activeCategory === 'favorites' && visibleTabs.length === 0 ? (
              <p className="text-slate-500 text-sm py-1">{common.noFavoritesHint}</p>
            ) : (
              <div ref={tabScrollRef} className="flex gap-1 md:gap-2 overflow-x-auto scrollbar-hide scroll-smooth">
                {visibleTabs.map(tab => (
                  <div key={tab.id} className="flex-shrink-0 relative group">
                    <button
                      data-active={activeTab === tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`flex items-center gap-1.5 md:gap-2 pl-3 pr-8 py-1.5 md:pl-4 md:pr-9 md:py-2 rounded-lg transition-all whitespace-nowrap text-sm ${
                        activeTab === tab.id
                          ? `${tab.bgColor} ${tab.color} font-semibold`
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                    >
                      <tab.icon className="w-4 h-4 md:w-5 md:h-5" />
                      <span>{tab.name}</span>
                      {visited.has(tab.id) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                      )}
                    </button>
                    {/* Favorite star */}
                    <button
                      onClick={e => { e.stopPropagation(); toggleFavorite(tab.id); }}
                      title={favorites.has(tab.id) ? common.progressFavorited : '★'}
                      className={`absolute right-1.5 top-1/2 -translate-y-1/2 p-0.5 rounded transition-all text-xs ${
                        favorites.has(tab.id)
                          ? 'text-yellow-400 opacity-100'
                          : 'text-slate-600 opacity-0 group-hover:opacity-100 hover:text-yellow-400'
                      }`}
                    >
                      <Star className={`w-3 h-3 ${favorites.has(tab.id) ? 'fill-yellow-400' : ''}`} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-slate-900/80 to-transparent pointer-events-none md:hidden" />
          </div>

        </div>
      </nav>

      {/* Study mode banner */}
      {studyMode && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-center text-amber-300 text-xs">
          <BookOpen className="w-3.5 h-3.5 inline mr-1.5" />
          {common.studyModeHint} —{' '}
          <button onClick={toggleStudyMode} className="underline hover:text-amber-200">
            {common.studyModeOff}
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-5 md:py-8">
        <div className="animate-fade-in">
          <Suspense fallback={<LoadingSpinner />}>
            {renderContent()}
          </Suspense>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-slate-800 mt-8 md:mt-16 py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-6 text-center text-slate-400 text-xs md:text-sm">
          <p>{common.footer}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
