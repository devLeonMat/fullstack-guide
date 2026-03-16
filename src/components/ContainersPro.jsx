import { useState } from 'react';
import { ShipWheel } from 'lucide-react';
import { SiDocker, SiKubernetes } from 'react-icons/si';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';

function ContainersPro() {
    const { language } = useLanguage();
    const containersData = t('containers', language);
    const [activeSection, setActiveSection] = useState('docker');

    const iconMap = {
        docker: SiDocker,
        kubernetes: SiKubernetes
    };

    const sectionList = Object.values(containersData.sections).map((section) => ({
        ...section,
        icon: iconMap[section.id] || ShipWheel
    }));
    const currentSection = sectionList.find((section) => section.id === activeSection) || sectionList[0];
    const SectionIcon = currentSection.icon;

    return (
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
            <div className="lg:col-span-1 space-y-2 overflow-y-auto pr-2">
                <h3 className="text-lg font-bold text-teal-400 mb-4 flex items-center gap-2">
                    <SiDocker className="w-6 h-6" />
                    {containersData.appTitle}
                </h3>
                {sectionList.map((section) => {
                    const Icon = section.icon;
                    return (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${activeSection === section.id
                                ? 'bg-teal-500/20 border border-teal-500/50 text-teal-300'
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
                        <SectionIcon className="w-8 h-8 text-teal-400" />
                        <h2 className="text-3xl font-bold text-teal-400">{currentSection.title}</h2>
                    </div>
                    <p className="text-slate-400">{currentSection.subtitle}</p>
                </div>

                <div className="bg-slate-900/50 border border-teal-500/30 rounded-xl overflow-hidden animate-fade-in">
                    <div className="px-5 py-4 border-b border-slate-800 text-sm text-slate-400">
                        {containersData.cheatsheet}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-slate-950/70">
                                <tr className="text-left">
                                    <th className="px-4 py-3 text-teal-300 font-semibold w-[55%]">{containersData.command}</th>
                                    <th className="px-4 py-3 text-slate-300 font-semibold">{containersData.description}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentSection.commands.map((item, idx) => (
                                    <tr key={idx} className="border-t border-slate-800 hover:bg-slate-800/30">
                                        <td className="px-4 py-3 align-top">
                                            <code className="text-xs md:text-sm text-teal-200 font-mono break-all">{item.cmd}</code>
                                        </td>
                                        <td className="px-4 py-3 text-slate-300 align-top">{item.desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContainersPro;
