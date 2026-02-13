import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';

// Custom Monokai-inspired theme
const monokaiTheme = {
    'code[class*="language-"]': {
        color: '#f8f8f2',
        background: '#272822',
        textShadow: '0 1px rgba(0, 0, 0, 0.3)',
        fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
        fontSize: '0.875rem',
        textAlign: 'left',
        whiteSpace: 'pre',
        wordSpacing: 'normal',
        wordBreak: 'normal',
        wordWrap: 'normal',
        lineHeight: '1.6',
        tabSize: '4',
        hyphens: 'none',
    },
    'pre[class*="language-"]': {
        color: '#f8f8f2',
        background: '#272822',
        textShadow: '0 1px rgba(0, 0, 0, 0.3)',
        fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
        fontSize: '0.875rem',
        textAlign: 'left',
        whiteSpace: 'pre',
        wordSpacing: 'normal',
        wordBreak: 'normal',
        wordWrap: 'normal',
        lineHeight: '1.6',
        tabSize: '4',
        hyphens: 'none',
        padding: '1.5em',
        margin: '0',
        overflow: 'auto',
        borderRadius: '0.5rem',
        border: '1px solid #3e3d32',
    },
    'comment': { color: '#75715e' },
    'prolog': { color: '#75715e' },
    'doctype': { color: '#75715e' },
    'cdata': { color: '#75715e' },
    'punctuation': { color: '#f8f8f2' },
    'namespace': { opacity: '0.7' },
    'property': { color: '#f92672' },
    'tag': { color: '#f92672' },
    'constant': { color: '#ae81ff' },
    'symbol': { color: '#ae81ff' },
    'deleted': { color: '#f92672' },
    'boolean': { color: '#ae81ff' },
    'number': { color: '#ae81ff' },
    'selector': { color: '#a6e22e' },
    'attr-name': { color: '#a6e22e' },
    'string': { color: '#e6db74' },
    'char': { color: '#e6db74' },
    'builtin': { color: '#a6e22e' },
    'inserted': { color: '#a6e22e' },
    'operator': { color: '#f92672' },
    'entity': { color: '#f8f8f2', cursor: 'help' },
    'url': { color: '#f8f8f2' },
    'variable': { color: '#f8f8f2' },
    'atrule': { color: '#e6db74' },
    'attr-value': { color: '#e6db74' },
    'function': { color: '#a6e22e' },
    'class-name': { color: '#a6e22e' },
    'keyword': { color: '#66d9ef' },
    'regex': { color: '#fd971f' },
    'important': { color: '#fd971f', fontWeight: 'bold' },
    'bold': { fontWeight: 'bold' },
    'italic': { fontStyle: 'italic' },
};

function CodeBlock({ code, language = 'javascript', showLineNumbers = false }) {
    const { language: currentLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const common = t('common', currentLanguage);

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-2 px-3 py-2 bg-slate-800/70 hover:bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 transition-colors"
            >
                <span className="text-slate-400">▶</span>
                <span>{common.showExample}</span>
            </button>
        );
    }

    return (
        <div className="space-y-2">
            <button
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 px-3 py-2 bg-slate-800/70 hover:bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 transition-colors"
            >
                <span className="text-slate-400">▼</span>
                <span>{common.hideExample}</span>
            </button>

            <div className="relative rounded-lg overflow-hidden shadow-lg">
                {/* Gradient top border */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-cyan-400 to-green-400 z-10"></div>

                {/* Language badge */}
                <div className="absolute top-3 right-3 z-10">
                    <span className="px-2 py-1 bg-slate-800/80 backdrop-blur-sm text-slate-300 text-xs font-semibold rounded border border-slate-700">
                        {language.toUpperCase()}
                    </span>
                </div>

                {/* Code block */}
                <SyntaxHighlighter
                    language={language}
                    style={monokaiTheme}
                    showLineNumbers={showLineNumbers}
                    customStyle={{
                        margin: 0,
                        paddingTop: '2rem',
                        background: '#272822',
                        fontSize: '0.875rem',
                    }}
                    codeTagProps={{
                        style: {
                            fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                        }
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}

export default CodeBlock;
