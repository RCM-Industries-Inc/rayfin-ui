import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = Exclude<Theme, 'system'>;

interface ThemeProviderProps {
  children: ReactNode;
  /** Initial preference when the user has not saved one. */
  defaultTheme?: Theme;
  /** Override when an app needs an isolated preference key. */
  storageKey?: string;
}

interface ThemeProviderValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeProviderValue | undefined>(undefined);

const isTheme = (value: string | null): value is Theme =>
  value === 'light' || value === 'dark' || value === 'system';

const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const getStoredTheme = (storageKey: string, fallback: Theme): Theme => {
  if (typeof window === 'undefined') return fallback;

  try {
    const storedTheme = window.localStorage.getItem(storageKey);
    return isTheme(storedTheme) ? storedTheme : fallback;
  } catch {
    return fallback;
  }
};

/**
 * Owns the RCM light/dark preference for Vite-based Rayfin apps. The provider
 * persists explicit choices, follows live OS changes in system mode, and keeps
 * both the root class and native `color-scheme` in sync.
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'rcm-ui-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() =>
    getStoredTheme(storageKey, defaultTheme)
  );
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    theme === 'system' ? getSystemTheme() : theme
  );

  useLayoutEffect(() => {
    const root = window.document.documentElement;
    const media = window.matchMedia?.('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const nextTheme =
        theme === 'system'
          ? media?.matches
            ? 'dark'
            : 'light'
          : theme;

      root.classList.remove('light', 'dark');
      root.classList.add(nextTheme);
      root.dataset.theme = nextTheme;
      root.style.colorScheme = nextTheme;
      setResolvedTheme(nextTheme);
    };

    applyTheme();

    if (theme !== 'system' || !media) return;

    media.addEventListener?.('change', applyTheme);
    return () => media.removeEventListener?.('change', applyTheme);
  }, [theme]);

  const setTheme = useCallback(
    (nextTheme: Theme) => {
      try {
        window.localStorage.setItem(storageKey, nextTheme);
      } catch {
        // The visual preference still applies when storage is unavailable.
      }
      setThemeState(nextTheme);
    },
    [storageKey]
  );

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [resolvedTheme, setTheme, theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// Provider and hook intentionally ship together as one registry item.
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within an RCM ThemeProvider.');
  }

  return context;
}
