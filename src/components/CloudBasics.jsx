import { useState } from 'react';
import { Cloud, Layers, ShieldCheck, Gauge, Wallet } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';

function CloudBasics() {
    const { language } = useLanguage();
    const cloudData = t('cloud', language);
    const [activeSection, setActiveSection] = useState('concepts');

    const iconMap = {
        concepts: Layers,
        comparison: Cloud,
        selection: Gauge,
        security: ShieldCheck,
        finops: Wallet
    };

    const sectionList = Object.values(cloudData.sections).map((section) => ({
        ...section,
        icon: iconMap[section.id] || Cloud
    }));
    const currentSection = sectionList.find((section) => section.id === activeSection) || sectionList[0];
    const SectionIcon = currentSection.icon;

    const renderConceptCards = () => (
        <div className="space-y-6 animate-fade-in">
            {currentSection.content.map((item, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-sky-500/30 rounded-xl p-6">
                    <div className="flex items-start gap-3 mb-4">
                        <SectionIcon className="w-6 h-6 text-sky-400 mt-1" />
                        <div>
                            <h3 className="text-xl font-bold text-sky-400">{item.topic}</h3>
                            <p className="text-slate-400 text-sm">{item.description}</p>
                        </div>
                    </div>
                    <ul className="space-y-2 ml-9">
                        {item.points.map((point, pointIdx) => (
                            <li key={pointIdx} className="flex items-start gap-2 text-slate-300 text-sm">
                                <span className="text-sky-400">•</span>
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );

    const renderComparisonTable = () => (
        <div className="bg-slate-900/50 border border-sky-500/30 rounded-xl overflow-hidden animate-fade-in">
            <div className="px-6 py-4 border-b border-slate-800">
                <h3 className="text-xl font-bold text-sky-400">{cloudData.comparisonTitle}</h3>
                <p className="text-slate-400 text-sm">{cloudData.comparisonSubtitle}</p>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-slate-950/70">
                        <tr className="text-left">
                            <th className="px-4 py-3 text-slate-300 font-semibold">{cloudData.tableCategory}</th>
                            <th className="px-4 py-3 text-orange-300 font-semibold">AWS</th>
                            <th className="px-4 py-3 text-sky-300 font-semibold">Azure</th>
                            <th className="px-4 py-3 text-emerald-300 font-semibold">GCP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cloudData.serviceMap.map((row) => (
                            <tr key={row.category} className="border-t border-slate-800 hover:bg-slate-800/30">
                                <td className="px-4 py-3 text-slate-200">{row.category}</td>
                                <td className="px-4 py-3 text-slate-300">{row.aws}</td>
                                <td className="px-4 py-3 text-slate-300">{row.azure}</td>
                                <td className="px-4 py-3 text-slate-300">{row.gcp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 lg:h-[calc(100vh-200px)]">
            <div className="lg:col-span-1 lg:overflow-y-auto lg:pr-2">
                <h3 className="text-base lg:text-lg font-bold text-sky-400 mb-2 lg:mb-4 flex items-center gap-2">
                    <Cloud className="w-5 h-5 lg:w-6 lg:h-6" />
                    {cloudData.appTitle}
                </h3>
                <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-hidden lg:pb-0 lg:space-y-2">
                {sectionList.map((section) => {
                    const Icon = section.icon;
                    return (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`flex-shrink-0 lg:w-full text-left px-3 py-2 lg:px-4 lg:py-3 rounded-lg transition-all flex items-center gap-2 lg:gap-3 ${activeSection === section.id
                                ? 'bg-sky-500/20 border border-sky-500/50 text-sky-300'
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

            <div className="lg:col-span-3 lg:overflow-y-auto lg:pr-2">
                <div className="mb-4 lg:mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <SectionIcon className="w-6 h-6 lg:w-8 lg:h-8 text-sky-400" />
                        <h2 className="text-xl lg:text-3xl font-bold text-sky-400">{currentSection.title}</h2>
                    </div>
                    <p className="text-slate-400">{currentSection.subtitle}</p>
                </div>

                {activeSection === 'comparison' ? renderComparisonTable() : renderConceptCards()}
            </div>
        </div>
    );
}

export default CloudBasics;
