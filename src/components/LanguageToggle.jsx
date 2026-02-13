import { useLanguage } from '../contexts/LanguageContext';
import { Languages } from 'lucide-react';
import { t } from '../translations';

const LanguageToggle = () => {
    const { language, toggleLanguage } = useLanguage();
    const common = t('common', language);

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg transition-all group"
            aria-label={common.toggleLanguage}
        >
            <Languages className="w-4 h-4 text-slate-400 group-hover:text-slate-200" />
            <div className="flex items-center gap-1">
                <span
                    className={`text-xs font-medium transition-colors ${language === 'es' ? 'text-blue-400' : 'text-slate-500'
                        }`}
                >
                    ES
                </span>
                <div className="relative w-8 h-4 bg-slate-700 rounded-full transition-colors">
                    <div
                        className={`absolute top-0.5 left-0.5 w-3 h-3 bg-blue-400 rounded-full transition-transform duration-200 ${language === 'en' ? 'translate-x-4' : 'translate-x-0'
                            }`}
                    />
                </div>
                <span
                    className={`text-xs font-medium transition-colors ${language === 'en' ? 'text-blue-400' : 'text-slate-500'
                        }`}
                >
                    EN
                </span>
            </div>
        </button>
    );
};

export default LanguageToggle;
