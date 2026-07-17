import { LogOut } from 'lucide-react';
import { type ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/rcm/theme-toggle';
import { useAuth } from '@/hooks/AuthContext';
import logoTeal from '@/assets/Logo_RCM_Teal.png';
import logoWhite from '@/assets/Logo_RCM_White.png';

interface AppShellProps {
  /** App name shown in the header, e.g. "Production Planning". */
  title: string;
  /** Optional one-line descriptor under the title. */
  subtitle?: string;
  /** App-specific context control rendered after the title (e.g. a division selector). */
  context?: ReactNode;
  /** App-specific actions rendered before the user / sign-out cluster. */
  actions?: ReactNode;
  /**
   * Tailwind `max-w-*` for the shared header+content container. The width is the
   * ONE thing apps may vary; the default `max-w-[1600px]` fills large screens and
   * stays responsive on small ones (via `w-full`). An app may pass a narrower value
   * if its content reads better tighter. The header and body always use this same
   * value, so the navbar stays aligned with the content. Must be a literal class
   * string so Tailwind generates it.
   */
  maxWidth?: string;
  children: ReactNode;
}

/**
 * The standard RCM app shell — one consistent top navigation across every RCM
 * Rayfin app: brand logo · separator · title/subtitle · [context] … [actions] ·
 * theme · user · sign out, over a full-height Modern Teal canvas.
 *
 * The entire navbar (theme-aware logo, separator, title, theme, and sign-out) is
 * fixed here so it is IDENTICAL in every app — same height, same icons, same
 * button sizes — by construction, not convention. Apps customize ONLY `title` /
 * `subtitle` / `context` / `actions` / `maxWidth`, and render page content as
 * children. They must NOT add their own max-width wrapper — the shell owns it so
 * the navbar and content always align.
 *
 * Uses only shadcn semantic tokens so it is portable to any app on `rcm-theme`.
 */
export function AppShell({
  title,
  subtitle,
  context,
  actions,
  maxWidth = 'max-w-[1600px]',
  children,
}: AppShellProps) {
  const { user, signOut } = useAuth();
  const container = `mx-auto w-full ${maxWidth} px-6`;

  return (
    <div className="min-h-screen bg-background text-fg-2">
      <header className="sticky top-0 z-30 border-b border-border bg-card">
        <div className={`flex h-16 items-center gap-3 ${container}`}>
          <div className="h-9 shrink-0">
            <img src={logoTeal} alt="RCM Industries" className="h-9 w-auto dark:hidden" />
            <img src={logoWhite} alt="RCM Industries" className="hidden h-9 w-auto dark:block" />
          </div>
          <div className="h-8 w-px shrink-0 bg-border" />
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-xl font-semibold tracking-tight text-fg-1">{title}</span>
            {subtitle && <span className="truncate text-[13px] text-fg-2">{subtitle}</span>}
          </div>
          {context && <div className="ml-2 flex shrink-0 items-center">{context}</div>}

          <div className="ml-auto flex shrink-0 items-center gap-2">
            {actions}
            <ThemeToggle />
            {user && (
              <span className="hidden max-w-[180px] truncate text-[13px] text-fg-2 md:inline">
                {user.name}
              </span>
            )}
            <Button variant="outline" onClick={() => void signOut()} aria-label="Sign out">
              <LogOut className="size-4" strokeWidth={1.5} />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </div>
      </header>
      <main className={`${container} py-6`}>{children}</main>
    </div>
  );
}
