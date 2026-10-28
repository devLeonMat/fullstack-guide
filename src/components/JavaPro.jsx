import { useState } from 'react';
import { Cpu, Layers, MessageCircleQuestion, Coffee, Briefcase } from 'lucide-react';
import CodeBlock from './CodeBlock';
import Tabs from './solid/Tabs';
import InterviewQA from './languages/InterviewQA';
import { buildJavaVersions, buildJavaFundamentals, buildJavaInterview } from './languages/java';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';

function JavaPro() {
    const { language } = useLanguage();
    const tx = (es, en) => language === 'en' ? en : es;
    const [activeSection, setActiveSection] = useState('features');

    const sections = [
        {
            id: 'features',
            title: tx('Versiones 8 → 25', 'Versions 8 → 25'),
            subtitle: tx('Lo que cambió y dónde lo usé', 'What changed and where I used it'),
            icon: Layers,
        },
        {
            id: 'fundamentals',
            title: tx('Fundamentos', 'Fundamentals'),
            subtitle: tx('JVM, memoria, colecciones, concurrencia', 'JVM, memory, collections, concurrency'),
            icon: Cpu,
        },
        {
            id: 'interview',
            title: tx('Entrevista', 'Interview'),
            subtitle: tx('Preguntas por nivel', 'Questions by level'),
            icon: MessageCircleQuestion,
        },
    ];
    const currentSection = sections.find(s => s.id === activeSection);
    const SectionIcon = currentSection.icon;

    const renderFeatures = () => {
        const items = buildJavaVersions(tx).map(v => ({
            id: v.id,
            label: v.version,
            content: (
                <div className="space-y-4">
                    <div className="flex items-start gap-2 bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                        <Briefcase className="w-4 h-4 flex-shrink-0 mt-0.5 text-orange-400" aria-hidden="true" />
                        <p className="text-sm text-slate-300">
                            <span className="font-semibold text-orange-300">{v.version} ({v.year}) · </span>
                            {v.usedAt}
                        </p>
                    </div>
                    {v.features.map(f => (
                        <div key={f.name} className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 space-y-3">
                            <div>
                                <h4 className="font-bold text-orange-300">{f.name}</h4>
                                <p className="text-sm text-slate-300 leading-relaxed">{f.desc}</p>
                            </div>
                            <CodeBlock code={f.code} language="java" />
                        </div>
                    ))}
                </div>
            ),
        }));
        return <Tabs items={items} label={tx('Versiones de Java', 'Java versions')} tx={tx} />;
    };

    const renderFundamentals = () => {
        const items = buildJavaFundamentals(tx).map(topic => ({
            id: topic.id,
            label: topic.topic,
            content: (
                <div className="space-y-4">
                    <p className="text-slate-300 leading-relaxed">{topic.description}</p>
                    <ul className="space-y-2">
                        {topic.points.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300 leading-relaxed">
                                <span className="text-orange-400 mt-0.5">•</span>
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                    <CodeBlock code={topic.code} language="java" />
                </div>
            ),
        }));
        return <Tabs items={items} label={tx('Fundamentos de Java', 'Java fundamentals')} tx={tx} />;
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'fundamentals': return renderFundamentals();
            case 'interview': return <InterviewQA groups={buildJavaInterview(tx)} tx={tx} accent="orange" />;
            default: return renderFeatures();
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 lg:h-[calc(100vh-200px)]">
            {/* Sidebar */}
            <div className="lg:col-span-1 lg:overflow-y-auto lg:pr-2">
                <h3 className="text-base lg:text-lg font-bold text-orange-400 mb-2 lg:mb-4 flex items-center gap-2">
                    <Coffee className="w-5 h-5 lg:w-6 lg:h-6" />
                    {t('java', language).title}
                </h3>
                <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-hidden lg:pb-0 lg:space-y-2">
                {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`flex-shrink-0 lg:w-full text-left px-3 py-2 lg:px-4 lg:py-3 rounded-lg transition-all flex items-center gap-2 lg:gap-3 ${activeSection === section.id
                                ? 'bg-orange-500/20 border border-orange-500/50 text-orange-300'
                                : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                }`}
                        >
                            <Icon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-sm lg:text-base whitespace-nowrap lg:whitespace-normal">{section.title}</div>
                                <div className="hidden lg:block text-xs opacity-70 line-clamp-1">{section.subtitle}</div>
                            </div>
                        </button>
                    );
                })}
                </div>
            </div>

            {/* Content Panel */}
            <div className="lg:col-span-3 lg:overflow-y-auto lg:pr-2">
                <div className="mb-4 lg:mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <SectionIcon className="w-6 h-6 lg:w-8 lg:h-8 text-orange-400" />
                        <h2 className="text-xl lg:text-3xl font-bold text-orange-400">{currentSection.title}</h2>
                    </div>
                    <p className="text-slate-400">{currentSection.subtitle}</p>
                </div>
                <div key={activeSection} className="animate-fade-in">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default JavaPro;
