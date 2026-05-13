import { useState } from 'react';

function loadSet(key) {
  try { return new Set(JSON.parse(localStorage.getItem(key) || '[]')); }
  catch { return new Set(); }
}

function saveSet(key, set) {
  localStorage.setItem(key, JSON.stringify([...set]));
}

export function useProgress() {
  const [visited, setVisited] = useState(() => loadSet('visited'));
  const [favorites, setFavorites] = useState(() => loadSet('favorites'));

  const markVisited = (tabId) => {
    setVisited(prev => {
      if (prev.has(tabId)) return prev;
      const next = new Set(prev);
      next.add(tabId);
      saveSet('visited', next);
      return next;
    });
  };

  const toggleFavorite = (tabId) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(tabId)) next.delete(tabId);
      else next.add(tabId);
      saveSet('favorites', next);
      return next;
    });
  };

  const clearProgress = () => {
    setVisited(new Set());
    setFavorites(new Set());
    localStorage.removeItem('visited');
    localStorage.removeItem('favorites');
  };

  return { visited, favorites, markVisited, toggleFavorite, clearProgress };
}
