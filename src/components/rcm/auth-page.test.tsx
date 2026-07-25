import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { AuthPage } from '@/components/rcm/auth-page';
import { ThemeProvider } from '@/components/rcm/theme-provider';

describe('AuthPage', () => {
  it('uses the consuming application sign-in action', async () => {
    const user = userEvent.setup();
    const onSignIn = vi.fn().mockResolvedValue(undefined);

    render(
      <ThemeProvider defaultTheme="light">
        <AuthPage title="Production Planning" onSignIn={onSignIn} />
      </ThemeProvider>
    );

    await user.click(
      screen.getByRole('button', { name: /sign in with microsoft/i })
    );
    expect(onSignIn).toHaveBeenCalledOnce();
  });

  it('uses local-development copy and exposes failures accessibly', async () => {
    const user = userEvent.setup();
    const onSignIn = vi.fn().mockRejectedValue(new Error('Local API unavailable'));

    render(
      <ThemeProvider defaultTheme="light">
        <AuthPage
          title="Blank App"
          onSignIn={onSignIn}
          fabricAuthEnabled={false}
        />
      </ThemeProvider>
    );

    await user.click(
      screen.getByRole('button', {
        name: /continue in local development/i,
      })
    );
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Local API unavailable'
    );
  });
});
