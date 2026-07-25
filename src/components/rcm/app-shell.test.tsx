import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { AppShell } from '@/components/rcm/app-shell';
import { ThemeProvider } from '@/components/rcm/theme-provider';

describe('AppShell', () => {
  it('receives user and auth behavior from the consuming application', async () => {
    const user = userEvent.setup();
    const onSignOut = vi.fn();

    render(
      <ThemeProvider defaultTheme="light">
        <AppShell
          title="Production Planning"
          subtitle="Operations"
          userName="Pat Planner"
          onSignOut={onSignOut}
        >
          Page content
        </AppShell>
      </ThemeProvider>
    );

    expect(screen.getByText('Production Planning')).toBeInTheDocument();
    expect(screen.getByText('Pat Planner')).toBeInTheDocument();
    expect(screen.getByText('Page content')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Sign out' }));
    expect(onSignOut).toHaveBeenCalledOnce();
  });

  it('uses the public RCM brand-asset contract', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <AppShell title="Blank App" brandAssetBase="/custom-brand">
          Page content
        </AppShell>
      </ThemeProvider>
    );

    const logos = screen.getAllByAltText('RCM Industries');
    expect(logos[0]).toHaveAttribute(
      'src',
      '/custom-brand/Logo_RCM_Teal.png'
    );
    expect(logos[1]).toHaveAttribute(
      'src',
      '/custom-brand/Logo_RCM_White.png'
    );
  });
});
