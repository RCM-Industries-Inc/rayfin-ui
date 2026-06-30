import { useState } from 'react';

import { ThemeToggle } from '@/components/rcm/theme-toggle';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/AuthContext';
import { useTheme } from '@/hooks/useTheme';
import logoTeal from '@/assets/Logo_RCM_Teal.png';
import logoWhite from '@/assets/Logo_RCM_White.png';

/** Microsoft four-square mark for the sign-in button. */
const msLogo = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 21 21" className="mr-2">
    <rect x="1" y="1" width="9" height="9" fill="#f25022" />
    <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
    <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
    <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
  </svg>
);

interface AuthPageProps {
  /** App name shown above the sign-in button. */
  title: string;
  /** Short instruction under the title. */
  subtitle?: string;
  /** Optional caption under the card. */
  footer?: string;
}

/**
 * The standard RCM sign-in page — one consistent login card across every RCM
 * Rayfin app: theme-aware logo, app title/subtitle, and the shared "Sign in with
 * Microsoft" Button, on a subtle teal-tinted backdrop. Apps customize ONLY
 * `title` / `subtitle` / `footer`; the card, button, and sizing are fixed so
 * every app's login reads as one product. Uses only shadcn semantic tokens.
 */
export function AuthPage({
  title,
  subtitle = 'Sign in with your RCM account to continue.',
  footer,
}: AuthPageProps) {
  const { signIn, fabricAuthEnabled } = useAuth();
  const { theme } = useTheme();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await signIn();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in.');
    } finally {
      setIsLoading(false);
    }
  };

  const buttonLabel = isLoading
    ? fabricAuthEnabled
      ? 'Opening Fabric…'
      : 'Signing in…'
    : 'Sign in with Microsoft';

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary">
      {/* Decorative on-brand teal glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />

      <div className="absolute right-4 top-4 z-10">
        <ThemeToggle />
      </div>

      <div className="relative flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
            <div className="mb-8 flex flex-col items-center text-center">
              <img
                src={theme === 'dark' ? logoWhite : logoTeal}
                alt="RCM Industries"
                className="mb-5 h-10 w-auto"
              />
              <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
              {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
            </div>

            <Button
              type="button"
              onClick={handleSignIn}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {msLogo}
              {buttonLabel}
            </Button>

            {error && <p className="mt-3 text-center text-sm text-destructive">{error}</p>}
          </div>
          {footer && <p className="mt-4 text-center text-xs text-muted-foreground">{footer}</p>}
        </div>
      </div>
    </div>
  );
}
