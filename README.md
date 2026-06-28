# Rayfin UI

The RCM Industries component standard for Rayfin apps — a [shadcn/ui](https://ui.shadcn.com)
component library themed with the **Modern Teal** brand palette, distributed as a
[GitHub registry](https://ui.shadcn.com/docs/registry/github).

This one repository plays three roles:

| Role | What it is |
| --- | --- |
| **Showcase** | A static gallery of every component (light + dark), deployed to GitHub Pages. |
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

# 3. Pull the RCM standard from this registry
npx shadcn@latest add RCM-Industries-Inc/rayfin-ui/rcm-theme       # brand tokens — do first
npx shadcn@latest add RCM-Industries-Inc/rayfin-ui/modal RCM-Industries-Inc/rayfin-ui/data-table

# 4. Add whatever upstream primitives the app needs
npx shadcn@latest add button input select dialog table popover sheet field
```

Tidy-up after step 2: `init` adds a Geist webfont `@import` to `src/main.css` —
delete it, since `rcm-theme` sets the RCM Segoe/system font stack.

Other Rayfin templates (the `-t` flag): `blankapp` (auth only), `todoapp`,
`gettingstartedauth`, `dataapp` (when the app needs a Fabric data model).

**Alternative — clone this repo:** `rayfin-ui` is already shadcn + RCM-themed +
Fabric-wired, so you can `git clone` it, delete `src/showcase`, point
`src/main.tsx` back at `<App />`, and rename in `package.json` + `rayfin/rayfin.yml`.
Faster to a themed app, but you inherit showcase/registry files you must strip —
fine for a spike, less clean as a repeatable pattern.

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

### Using the `@rcm` namespace (recommended)

The Pages deploy also publishes per-item registry files (built by `shadcn build`),
so apps can register a named namespace instead of repeating the long GitHub path.
This is what the **shadcn MCP server** needs to search/browse this registry.

```bash
# one-time, in the consuming app
npx shadcn@latest registry add @rcm=https://rcm-industries-inc.github.io/rayfin-ui/r/{name}.json
```

```bash
# then add components by namespace
npx shadcn@latest add @rcm/rcm-theme @rcm/modal @rcm/data-table
npx shadcn@latest search @rcm        # browse available items
```

The GitHub shorthand (`RCM-Industries-Inc/rayfin-ui/<item>`) keeps working too; the
namespace is just a cleaner alias backed by the same registry.

## Available registry items

| Item | Type | Description |
| --- | --- | --- |
| `rcm-theme` | theme | RCM brand palette mapped onto shadcn semantic tokens (light + dark). |
| `modal` | component | Dialog-based modal with an ergonomic `title`/`subtitle`/`footer` API. |
| `data-table` | component | Themed, client-sorted table over `@tanstack/react-table` + the shadcn Table. |

Base shadcn primitives (button, input, select, dialog, popover, sheet, field,
table, …) are pulled from the **upstream** shadcn registry and themed
automatically by `rcm-theme`. This registry hosts only the RCM theme and RCM
composites; the showcase documents both.

## Local development

```bash
npm install
npm run dev:ui      # run the showcase locally (no Rayfin backend needed)
npm run build:registry # build per-item registry files into public/r/
npm run build:pages # build the registry + static showcase (what CI deploys)
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
