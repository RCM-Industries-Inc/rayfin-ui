import { createRoot } from 'react-dom/client';

import { ThemeProvider } from '@/components/rcm/theme-provider';
import { ShowcaseApp } from '@/showcase/ShowcaseApp';

import './main.css';

// This repository deploys only the static web-component showcase and registry.
// New applications start from RCM-Industries-Inc/Rayfin_Template.
createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <ShowcaseApp />
  </ThemeProvider>
);
