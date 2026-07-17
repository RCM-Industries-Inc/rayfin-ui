# Rayfin UI

The RCM Industries component standard for Rayfin apps — a [shadcn/ui](https://ui.shadcn.com)
component library implementing the **Modern Teal v2** design system, distributed as a
[GitHub registry](https://ui.shadcn.com/docs/registry/github).

The canonical light visual specification is the RCM Design System
[`DESIGN.md`](https://github.com/RCM-Industries-Inc/Design-System/blob/main/DESIGN.md).
Rayfin UI adds the web-specific dark counterpart required by RCM applications.
Both modes are fully opaque and use the same typography, shape, motion, and
component language. The former dark/glass treatment remains retired.

This one repository plays three roles:

| Role | What it is |
| --- | --- |
| **Showcase** | A static gallery and visual contract for Modern Teal v2, deployed to GitHub Pages. |
| **Registry** | `registry.json` at the repo root, plus per-item files published to Pages under `/r/` — apps pull components via `shadcn add` (GitHub shorthand or the `@rcm` namespace). |
| **Starter template** | Pre-wired Rayfin (Vite + React 19 + Tailwind v4 + Fabric auth) — clone to start a new app. |

> **Note:** distribution uses the GitHub registry, which requires this repo to be
> **public** on `github.com`. The component source is public; no secrets live here.

## Start a new app on the standard

Begin from Rayfin's `blankapp` template (Fabric auth + routing + Vite + Tailwind v4),
then pull the RCM standard onto it. On Windows, run these in **Git Bash** (PowerShell
may block `npm.ps1` via execution policy; alternatively use `npm.cmd`).

```bash
# 1. Scaffold the blankapp (interactive — choose "Blank App")
npm create @microsoft/rayfin@latest my-new-app
#    …or non-interactive:
#    npm create @microsoft/rayfin@latest -- my-new-app -t blankapp --project-name my-new-app

cd my-new-app

# 2. Initialize shadcn (lays down neutral tokens)
npx shadcn@latest init -t vite -b radix -p nova -y

# 3. Register the RCM registry namespace (one-time)
npx shadcn@latest registry add @rcm=https://rcm-industries-inc.github.io/rayfin-ui/r/{name}.json

# 4. Pull the RCM standard from this registry (theme first)
npx shadcn@latest add @rcm/rcm-theme
npx shadcn@latest add @rcm/theme-provider
npx shadcn@latest add @rcm/button @rcm/input @rcm/select @rcm/field
npx shadcn@latest add @rcm/app-shell @rcm/auth-page
npx shadcn@latest add @rcm/modal @rcm/data-table
```

Tidy-up after step 2: `init` adds a Geist webfont `@import` to `src/main.css` —
delete it, since `rcm-theme` sets the RCM Segoe/system font stack. Wrap the app
root in `<ThemeProvider>` as shown under [Theme](#theme); `app-shell` and
`auth-page` include the standard selector.

Other Rayfin templates (the `-t` flag): `blankapp` (auth only), `todoapp`,
`gettingstartedauth`, `dataapp` (when the app needs a Fabric data model).

**Alternative — clone this repo:** `rayfin-ui` is already shadcn + RCM-themed +
Fabric-wired, so you can `git clone` it, delete `src/showcase`, point
`src/main.tsx` back at `<App />`, and rename in `package.json` + `rayfin/rayfin.yml`.
Faster to a themed app, but you inherit showcase/registry files you must strip —
fine for a spike, less clean as a repeatable pattern.

## Consuming components in another Rayfin app

In an app that already has shadcn initialized (`npx shadcn@latest init`), register
the `@rcm` namespace once, then add components by their short name. The namespace is
backed by the per-item files this repo publishes to GitHub Pages, and it's what the
**shadcn MCP server** needs to search/browse the registry.

```bash
# 1. Register the namespace (one-time, writes to components.json)
npx shadcn@latest registry add @rcm=https://rcm-industries-inc.github.io/rayfin-ui/r/{name}.json

# 2. Brand tokens and behavior — do this first
npx shadcn@latest add @rcm/rcm-theme
npx shadcn@latest add @rcm/theme-provider

# 3. Components — pulls the source into your repo (it's yours to edit)
npx shadcn@latest add @rcm/button @rcm/card @rcm/modal @rcm/data-table

# Browse what's available
npx shadcn@latest search @rcm
```

`shadcn add` copies the component **source** into your tree (vendoring). RCM
composites resolve their dependencies to the RCM-owned primitives in this
registry, preserving v2 radii, states, focus, motion, and elevation. It is a
one-time copy, not a runtime dependency—re-run `add` to pull updates.

**Without registering a namespace**, the GitHub shorthand resolves the same registry:

```bash
npx shadcn@latest add RCM-Industries-Inc/rayfin-ui/rcm-theme
npx shadcn@latest add RCM-Industries-Inc/rayfin-ui/modal
```

## Available registry items

| Item | Type | Description |
| --- | --- | --- |
| `rcm-theme` | theme | Canonical light tokens plus the opaque web dark token system. |
| `theme-provider`, `theme-toggle` | component | Persistent light/dark/system behavior and the standard selector. |
| `button`, `badge`, `card` | UI | RCM actions, status pills, and elevated containers. |
| `input`, `textarea`, `select`, `checkbox`, `field` | UI | Opaque form controls with canonical focus and state behavior. |
| `table`, `tabs` | UI | RCM matrix and page-navigation recipes. |
| `dialog`, `dropdown-menu`, `popover`, `sheet`, `tooltip`, `sonner` | UI | Overlays and feedback using v2 elevation and motion. |
| `modal` | component | Dialog-based modal with an ergonomic `title`/`subtitle`/`footer` API. |
| `data-table` | component | Themed, client-sorted table over `@tanstack/react-table` + the shadcn Table. |
| `app-shell` | component | Required RCM top navigation and aligned page canvas. |
| `auth-page` | component | Required RCM Microsoft sign-in page. |

Use the `@rcm` version of any primitive listed above. Upstream shadcn components
are a starting point, but their default radii, motion, focus, and interaction
states are not the RCM standard.

## Migrating from light-only Modern Teal v2

1. Re-add `@rcm/rcm-theme`, then re-add every installed `@rcm` component to
   refresh its vendored source.
2. Add `@rcm/theme-provider` and wrap the application root. Remove custom
   theme hooks or `next-themes`; the shared provider owns persistence and live
   system-preference updates.
3. Keep the `ThemeToggle` supplied by `app-shell` and `auth-page`; do not create
   an app-specific toggle.
4. Replace gradients, translucent fills, backdrop blur, glow shapes, and glass
   cards with the opaque light/dark page and card recipes.
5. Provide both `Logo_RCM_Teal.png` and `Logo_RCM_White.png` in `src/assets/`.
   Shared chrome chooses the correct asset for the resolved theme.

## Local development

```bash
npm install
npm run dev:ui          # run the showcase locally (no Rayfin backend needed)
npm run build:registry # build per-item registry files into public/r/
npm run build:pages    # build the registry + static showcase (what CI deploys)
```

The showcase entry (`src/main.tsx` → `src/showcase/`) has no auth/backend
dependency so it can be served statically. The Fabric-auth scaffolding
(`src/App.tsx`, `src/components/AuthPage.tsx`, `src/services/`) remains for the
starter-template role; point `main.tsx` at `<App />` to use it.

## Theme

`src/main.css` is rayfin-ui's implementation of the canonical Design System: it
keeps the canonical light tokens unchanged and adds an opaque dark semantic
layer for web applications. Brand hues remain recognizable; foregrounds,
surfaces, interaction washes, sentiment colors, and data colors are adapted for
dark-canvas contrast. Deep teal remains the table-header band in both modes.
The theme maps onto shadcn semantic tokens and Tailwind utilities
(`bg-primary` and `bg-teal` both work). The `rcm-theme` registry item mirrors
both token sets for distribution.

Wrap every Rayfin app at its entry point. The default follows the operating
system, persists an explicit user choice under `rcm-ui-theme`, and responds when
the system preference changes:

```tsx
import { ThemeProvider } from '@/components/rcm/theme-provider';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
```

Use semantic utilities (`bg-background`, `bg-card`, `text-fg-1`,
`text-accent-foreground`) in application code. Brand utilities such as
`bg-teal` represent fixed identity colors and should not be used as general
foreground or surface roles. `app-shell`, `auth-page`, and `sonner` expect to be
rendered under the shared provider.
