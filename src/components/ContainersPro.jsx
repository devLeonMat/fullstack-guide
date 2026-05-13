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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 lg:h-[calc(100vh-200px)]">
            <div className="lg:col-span-1 lg:overflow-y-auto lg:pr-2">
                <h3 className="text-base lg:text-lg font-bold text-teal-400 mb-2 lg:mb-4 flex items-center gap-2">
                    <SiDocker className="w-5 h-5 lg:w-6 lg:h-6" />
                    {containersData.appTitle}
                </h3>
                <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-hidden lg:pb-0 lg:space-y-2">
                {sectionList.map((section) => {
                    const Icon = section.icon;
                    return (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`flex-shrink-0 lg:w-full text-left px-3 py-2 lg:px-4 lg:py-3 rounded-lg transition-all flex items-center gap-2 lg:gap-3 ${activeSection === section.id
                                ? 'bg-teal-500/20 border border-teal-500/50 text-teal-300'
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
                        <SectionIcon className="w-6 h-6 lg:w-8 lg:h-8 text-teal-400" />
                        <h2 className="text-xl lg:text-3xl font-bold text-teal-400">{currentSection.title}</h2>
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
