import { useState } from 'react';
import { Braces, Clock3, Sigma, AlertTriangle, MessageCircleQuestion } from 'lucide-react';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';

function JSTSPro() {
    const { language } = useLanguage();
    const data = t('jsts', language);
    const [activeSection, setActiveSection] = useState('core');

    const iconMap = {
        core: Braces,
        async: Clock3,
        ts: Sigma,
        pitfalls: AlertTriangle,
        interview: MessageCircleQuestion
    };

    const sectionList = Object.values(data.sections).map((section) => ({
        ...section,
        icon: iconMap[section.id] || Braces
    }));
    const currentSection = sectionList.find((section) => section.id === activeSection) || sectionList[0];
    const SectionIcon = currentSection.icon;

    const renderContentCards = () => (
        <div className="space-y-6 animate-fade-in">
            {currentSection.content.map((item, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-yellow-500/30 rounded-xl p-6">
                    <div className="mb-4">
                        <h3 className="text-xl font-bold text-yellow-300">{item.topic}</h3>
                        <p className="text-sm text-slate-400">{item.description}</p>
                    </div>

                    <ul className="space-y-2 mb-4">
                        {item.points.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2 text-slate-300 text-sm">
                                <span className="text-yellow-300">•</span>
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>

                    <CodeBlock code={item.code} language="javascript" />
                </div>
            ))}
        </div>
    );

    const renderInterviewTable = () => (
        <div className="bg-slate-900/50 border border-yellow-500/30 rounded-xl overflow-hidden animate-fade-in">
            <div className="px-5 py-4 border-b border-slate-800 text-sm text-slate-400">
                {currentSection.subtitle}
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-slate-950/70">
                        <tr className="text-left">
                            <th className="px-4 py-3 text-yellow-300 font-semibold w-[40%]">Q</th>
                            <th className="px-4 py-3 text-slate-300 font-semibold">A</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentSection.rows.map((row, idx) => (
                            <tr key={idx} className="border-t border-slate-800 hover:bg-slate-800/30">
                                <td className="px-4 py-3 text-slate-200 align-top">{row.q}</td>
                                <td className="px-4 py-3 text-slate-300 align-top">{row.a}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
            <div className="lg:col-span-1 space-y-2 overflow-y-auto pr-2">
                <h3 className="text-lg font-bold text-yellow-300 mb-4 flex items-center gap-2">
                    <Braces className="w-6 h-6" />
                    {data.appTitle}
                </h3>
                {sectionList.map((section) => {
                    const Icon = section.icon;
                    return (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${activeSection === section.id
                                ? 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-300'
                                : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <div className="flex-1">
                                <div className="font-semibold">{section.title}</div>
                                <div className="text-xs opacity-70 line-clamp-1">{section.subtitle}</div>
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="lg:col-span-3 overflow-y-auto pr-2">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <SectionIcon className="w-8 h-8 text-yellow-300" />
                        <h2 className="text-3xl font-bold text-yellow-300">{currentSection.title}</h2>
                    </div>
                    <p className="text-slate-400">{currentSection.subtitle}</p>
                </div>

                {activeSection === 'interview' ? renderInterviewTable() : renderContentCards()}
            </div>
        </div>
    );
}

export default JSTSPro;
