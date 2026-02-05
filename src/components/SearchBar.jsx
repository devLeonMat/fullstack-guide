import { useState, useEffect, useRef } from 'react';
import { Search, X, Command } from 'lucide-react';

function SearchBar({ isOpen, onClose, onSearch, results }) {
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        // Keyboard shortcut: Cmd/Ctrl + K
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                if (isOpen) {
                    onClose();
                } else {
                    // Trigger opening from parent
                    document.dispatchEvent(new CustomEvent('openSearch'));
                }
            }

            // ESC to close
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const handleSearch = (value) => {
        setQuery(value);
        onSearch(value);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm pt-20">
            <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-fade-in">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700">
                    <Search className="w-5 h-5 text-slate-400" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Buscar en todos los conceptos... (Ctrl/Cmd + K)"
                        className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 outline-none text-lg"
                    />
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-slate-800 rounded transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>

                {/* Results */}
                <div className="max-h-[500px] overflow-y-auto">
                    {query.length === 0 ? (
                        <div className="p-8 text-center text-slate-500">
                            <Command className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>Escribe para buscar en todos los tabs...</p>
                            <p className="text-sm mt-2">Clean Code, SOLID, Patterns, Architecture, Java, Spring, React, Angular</p>
                        </div>
                    ) : results.length === 0 ? (
                        <div className="p-8 text-center text-slate-500">
                            <p>No se encontraron resultados para "{query}"</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-800">
                            {results.map((result, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        result.onClick();
                                        onClose();
                                    }}
                                    className="w-full text-left px-4 py-3 hover:bg-slate-800/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className={`text-xs font-semibold px-2 py-1 rounded ${result.tabColor}`}>
                                            {result.tab}
                                        </span>
                                        <span className="text-sm text-slate-400">{result.section}</span>
                                    </div>
                                    <h4 className="font-semibold text-slate-200 mb-1">{result.title}</h4>
                                    <p className="text-sm text-slate-400 line-clamp-2">{result.preview}</p>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer hint */}
                {query.length > 0 && (
                    <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 text-xs text-slate-500 text-center">
                        {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchBar;
