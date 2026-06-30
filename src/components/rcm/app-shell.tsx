import { LogOut } from 'lucide-react';
import { type ReactNode } from 'react';

import { ThemeToggle } from '@/components/rcm/theme-toggle';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/AuthContext';
import { useTheme } from '@/hooks/useTheme';
import logoTeal from '@/assets/Logo_RCM_Teal.png';
import logoWhite from '@/assets/Logo_RCM_White.png';

interface AppShellProps {
  /** App name shown in the header, e.g. "Production Planning". */
  title: string;
  /** Optional one-line descriptor under the title. */
  subtitle?: string;
  /** App-specific context control rendered after the title (e.g. a division selector). */
  context?: ReactNode;
  /** App-specific actions rendered before the user / theme / sign-out cluster. */
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
 * user · theme · sign out, over a full-height canvas.
 *
 * The entire navbar (logo, separator, title, theme toggle, sign-out button) is
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
  const { theme } = useTheme();
  const { user, signOut } = useAuth();
  const logo = theme === 'dark' ? logoWhite : logoTeal;
  const container = `mx-auto w-full ${maxWidth} px-6`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className={`flex h-16 items-center gap-3 ${container}`}>
          <img src={logo} alt="RCM Industries" className="h-9 w-auto shrink-0" />
          <div className="h-8 w-px shrink-0 bg-border" />
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-lg font-semibold tracking-tight text-foreground">{title}</span>
            {subtitle && <span className="truncate text-xs text-muted-foreground">{subtitle}</span>}
          </div>
          {context && <div className="ml-2 flex shrink-0 items-center">{context}</div>}

          <div className="ml-auto flex shrink-0 items-center gap-2">
            {actions}
            {user && (
              <span className="hidden max-w-[180px] truncate text-sm text-muted-foreground md:inline">
                {user.name}
              </span>
            )}
            <ThemeToggle />
            <Button variant="outline" onClick={() => void signOut()} aria-label="Sign out">
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </div>
      </header>
      <main className={`${container} py-5`}>{children}</main>
    </div>
  );
}
