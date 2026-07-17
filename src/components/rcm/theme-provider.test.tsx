import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ThemeProvider, useTheme } from '@/components/rcm/theme-provider';

const mediaListeners = new Set<() => void>();
let systemPrefersDark = false;

function ThemeProbe() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <div>
      <output>{`${theme}:${resolvedTheme}`}</output>
      <button type="button" onClick={() => setTheme('light')}>Light</button>
      <button type="button" onClick={() => setTheme('dark')}>Dark</button>
      <button type="button" onClick={() => setTheme('system')}>System</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    systemPrefersDark = false;
    mediaListeners.clear();
    document.documentElement.classList.remove('light', 'dark');
    delete document.documentElement.dataset.theme;
    document.documentElement.style.colorScheme = '';

    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        get matches() {
          return query === '(prefers-color-scheme: dark)' && systemPrefersDark;
        },
        media: query,
        onchange: null,
        addEventListener: (_event: string, listener: () => void) =>
          mediaListeners.add(listener),
        removeEventListener: (_event: string, listener: () => void) =>
          mediaListeners.delete(listener),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('applies and persists an explicit theme', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeProbe />
      </ThemeProvider>
    );

    expect(document.documentElement).toHaveClass('light');
    expect(screen.getByText('light:light')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Dark' }));

    expect(document.documentElement).toHaveClass('dark');
    expect(document.documentElement).not.toHaveClass('light');
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(document.documentElement.style.colorScheme).toBe('dark');
    expect(localStorage.getItem('rcm-ui-theme')).toBe('dark');
    expect(screen.getByText('dark:dark')).toBeInTheDocument();
  });

  it('restores a saved preference', () => {
    localStorage.setItem('custom-theme', 'dark');

    render(
      <ThemeProvider defaultTheme="light" storageKey="custom-theme">
        <ThemeProbe />
      </ThemeProvider>
    );

    expect(document.documentElement).toHaveClass('dark');
    expect(screen.getByText('dark:dark')).toBeInTheDocument();
  });

  it('tracks operating-system changes in system mode', () => {
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );

    expect(screen.getByText('system:light')).toBeInTheDocument();

    act(() => {
      systemPrefersDark = true;
      mediaListeners.forEach((listener) => listener());
    });

    expect(document.documentElement).toHaveClass('dark');
    expect(screen.getByText('system:dark')).toBeInTheDocument();
  });
});
