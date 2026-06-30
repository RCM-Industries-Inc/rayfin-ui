import { useCallback, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

/**
 * Light/dark theme backed by a shared module-level store, so every consumer
 * (header logo swap, theme toggle, page chrome) re-renders together when the
 * theme flips. The initial `.dark` class is applied by an inline script in
 * index.html before first paint; this hook reads/flips it and persists it.
 */
const listeners = new Set<() => void>();

function currentTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function applyTheme(next: Theme): void {
  document.documentElement.classList.toggle('dark', next === 'dark');
  try {
    localStorage.setItem('theme', next);
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, currentTheme, () => 'light' as Theme);
  const toggle = useCallback(() => {
    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  }, []);
  return { theme, toggle };
}
