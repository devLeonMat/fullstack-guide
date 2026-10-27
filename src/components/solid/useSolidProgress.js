import { useState } from 'react';

const STORAGE_KEY = 'solid-progress';

function load() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function save(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage unavailable (private mode, quota): progress lives only in memory.
  }
}

// Tracks which principles the learner completed (all exercises solved).
export function useSolidProgress() {
  const [completed, setCompleted] = useState(load);

  const markCompleted = (id) => {
    setCompleted(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      save(next);
      return next;
    });
  };

  const resetProgress = () => {
    setCompleted([]);
    save([]);
  };

  return { completed, markCompleted, resetProgress };
}
