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
  children: ReactNode;
}

/**
 * The standard RCM app shell — one consistent top navigation across every RCM
 * Rayfin app: brand logo · separator · title/subtitle · [context] … [actions] ·
 * user · theme · sign out, over a full-height canvas.
 *
 * Apps customize ONLY `title` / `subtitle` / `context` / `actions`; the chrome
 * (height, logo, order, button sizing) stays identical so every app reads as
 * one product. Do not hand-roll an app header — use this. See the RCM Design
 * System "App Shell & Top Navigation" standard.
 *
 * Uses only shadcn semantic tokens (background / card / border / foreground /
 * muted-foreground) so it is portable to any app on the `rcm-theme`. Expects the
 * standard Rayfin scaffold: `useAuth` (@/hooks/AuthContext), `useTheme`
 * (@/hooks/useTheme), the shared `Button`, and the RCM logos in @/assets
 * (Logo_RCM_Teal.png / Logo_RCM_White.png).
 */
export function AppShell({ title, subtitle, context, actions, children }: AppShellProps) {
  const { theme } = useTheme();
  const { user, signOut } = useAuth();
  const logo = theme === 'dark' ? logoWhite : logoTeal;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="flex h-16 items-center gap-3 px-4">
          <img src={logo} alt="RCM Industries" className="h-8 w-auto shrink-0" />
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
      <main className="px-4 py-5">{children}</main>
    </div>
  );
}
