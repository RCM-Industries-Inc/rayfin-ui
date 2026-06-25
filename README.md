# Rayfin UI

The RCM Industries component standard for Rayfin apps — a [shadcn/ui](https://ui.shadcn.com)
component library themed with the **Modern Teal** brand palette, distributed as a
[GitHub registry](https://ui.shadcn.com/docs/registry/github).

This one repository plays three roles:

| Role | What it is |
| --- | --- |
| **Showcase** | A static gallery of every component (light + dark), deployed to GitHub Pages. |
| **Registry** | `registry.json` at the repo root — apps pull components with `shadcn add`. |
| **Starter template** | Pre-wired Rayfin (Vite + React 19 + Tailwind v4 + Fabric auth) — clone to start a new app. |

> **Note:** distribution uses the GitHub registry, which requires this repo to be
> **public** on `github.com`. The component source is public; no secrets live here.

## Consuming components in another Rayfin app

In an app that already has shadcn initialized (`npx shadcn@latest init`):

```bash
# 1. Brand tokens — adds RCM colors to your :root / .dark (do this first)
npx shadcn@latest add RCM-Industries-Inc/rayfin-ui/rcm-theme

# 2. Components — pulls the source into your repo (it's yours to edit)
npx shadcn@latest add RCM-Industries-Inc/rayfin-ui/modal
```

`shadcn add` copies the component **source** into your tree (vendoring) and resolves
any base primitives (e.g. `dialog`) from the upstream shadcn registry. It is a
one-time copy, not a runtime dependency — re-run `add` to pull updates.

## Available registry items

| Item | Type | Description |
| --- | --- | --- |
| `rcm-theme` | theme | RCM brand palette mapped onto shadcn semantic tokens (light + dark). |
| `modal` | component | Dialog-based modal with an ergonomic `title`/`subtitle`/`footer` API. |

## Local development

```bash
npm install
npm run dev:ui      # run the showcase locally (no Rayfin backend needed)
npm run build:pages # build the static showcase
```

The showcase entry (`src/main.tsx` → `src/showcase/`) has no auth/backend
dependency so it can be served statically. The Fabric-auth scaffolding
(`src/App.tsx`, `src/components/AuthPage.tsx`, `src/services/`) remains for the
starter-template role; point `main.tsx` at `<App />` to use it.

## Theme

`src/main.css` is the single source of truth for the theme: it defines the RCM
raw palette, maps it onto shadcn's semantic tokens, and exposes both as Tailwind
utilities (`bg-primary` and `bg-teal` both work). The `rcm-theme` registry item
mirrors the semantic mapping for distribution.
