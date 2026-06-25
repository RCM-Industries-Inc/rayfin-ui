import { createRoot } from 'react-dom/client';

import { ShowcaseApp } from '@/showcase/ShowcaseApp';

import './main.css';

// The deployed artifact is the static component showcase — it has no auth or
// backend dependency, so it can be served from GitHub Pages. The Fabric-auth
// scaffolding (App.tsx, AuthPage, services) remains in the repo for the
// template/starter role; point this entry at <App /> to use it.
createRoot(document.getElementById('root')!).render(<ShowcaseApp />);
