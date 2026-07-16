import { AuthPage as RcmAuthPage } from '@/components/rcm/auth-page';

/** Starter-template route wired to the shared RCM sign-in standard. */
export function AuthPage() {
  return <RcmAuthPage title="Blank App" subtitle="Sign in with your RCM account to continue." />;
}
