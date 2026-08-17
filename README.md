# rayfin-ui

`rayfin-ui` is the canonical **web application UI layer** for RCM Industries.
It translates the company's shared brand foundations into accessible,
responsive React components for Rayfin apps and distributes their source
through a shadcn registry.

This repository has two jobs:

| Role | Purpose |
| --- | --- |
| Web component registry | Own the standard theme, primitives, app shell, sign-in page, and reusable composites. |
| Static showcase | Make the web standard visible and testable without a Rayfin backend. |

It is not an application starter and contains no application data model or
Fabric deployment configuration. Start applications from
[`Rayfin_Template`](https://github.com/RCM-Industries-Inc/Rayfin_Template).

## How the three repositories work together

| Repository | Authority |
| --- | --- |
| [`rcm-toolkit` design skill](https://github.com/RCM-Industries-Inc/rcm-toolkit/tree/main/.agents/skills/rcm-industries-design) | Cross-medium RCM brand foundation: especially colors, division assignments, logo rules, and shared identity. |
| **`rayfin-ui`** | Web-specific interpretation: semantic tokens, typography, accessibility, interaction, dark mode, and component APIs. |
| [`Rayfin_Template`](https://github.com/RCM-Industries-Inc/Rayfin_Template) | Golden-path Rayfin application with auth, routing, app configuration, validation, and the web foundation already installed. |

Report, Office, and presentation recipes from the design skill are not
automatically web rules. Web code preserves the universal brand foundation and
then follows this repository.

See [Foundation contract](docs/FOUNDATION.md) for the full ownership boundary.

## Starting a new app

Clone or create a repository from `Rayfin_Template`. Do not clone this
showcase/registry and strip files from it.

The template already contains:

- Vite, React, TypeScript, Tailwind 4, and shadcn `radix-nova`
- the `@rcm` registry namespace
- the `@rcm/app-foundation` baseline
- RCM brand assets
- Rayfin auth, routing, data-schema, and Fabric defaults
- instructions and checks for future agents

## Consuming the registry directly

Existing shadcn projects can register the namespace in `components.json`:

```json
{
  "registries": {
    "@rcm": "https://rcm-industries-inc.github.io/rayfin-ui/r/{name}.json"
  }
}
```

Install the coordinated baseline:

```powershell
npx shadcn@latest view @rcm/app-foundation
npx shadcn@latest add @rcm/app-foundation --dry-run
npx shadcn@latest add @rcm/app-foundation
```

Or install one item:

```powershell
npx shadcn@latest add @rcm/button
```

`shadcn add` intentionally copies source into the consuming repository. This
keeps applications independent at runtime and lets teams make genuinely
app-specific changes. It is not automatic inheritance:

- fix a generic pattern in `rayfin-ui`;
- inspect the update with `--dry-run` and `--diff`;
- deliberately refresh the starter or an application;
- never overwrite local application changes without review.

The source-copy model and update workflow are detailed in
[Maintenance](docs/MAINTENANCE.md).

## App-foundation contents

`@rcm/app-foundation` is the one-item baseline for a new app. It installs:

- Modern Teal web theme and light/dark/system behavior
- standard app shell and sign-in page
- core cards and form fields
- modal, data table, and toast foundations
- a machine-readable RCM web-foundation marker

The consuming app must provide the standard logo files at:

```text
public/brand/Logo_RCM_Teal.png
public/brand/Logo_RCM_White.png
```

`Rayfin_Template` already includes them. Other consumers should copy the
canonical assets from `rcm-toolkit/.agents/skills/rcm-industries-design/assets/`.

The shared `app-shell` keeps context, navigation, theme, and sign-out controls
usable on narrow screens by compacting its gutters and secondary brand text;
the complete logo and application title return at the `sm` breakpoint.

## Individual registry items

| Category | Items |
| --- | --- |
| Foundation | `app-foundation`, `utils`, `rcm-theme`, `theme-provider`, `theme-toggle` |
| Application chrome | `app-shell`, `auth-page` |
| Primitives | `badge`, `button`, `card`, `checkbox`, `dialog`, `dropdown-menu`, `field`, `input`, `label`, `popover`, `select`, `separator`, `sheet`, `sonner`, `table`, `tabs`, `textarea`, `tooltip` |
| Composites | `modal`, `combobox`, `data-table` |

Use the `@rcm` version when it exists. Add an upstream shadcn component only
when the registry does not provide it, then decide whether the resulting
generic pattern belongs here.

## Working in this repository

```powershell
npm ci
npm run dev
npm run check:foundation
npm run lint
npm test
npm run build:pages
```

`npm run build:pages` creates the per-item registry under `public/r/` and the
static showcase under `dist/`. GitHub Actions validates both and deploys the
showcase/registry to Pages.

Run the complete local gate with:

```powershell
npm run validate
```

## Design defaults

The universal RCM palette and logo rules come from `rcm-industries-design`. This web
layer additionally owns:

- semantic rather than raw-color component APIs;
- Segoe UI plus accessible system fallbacks;
- responsive layout and keyboard behavior;
- focus, reduced motion, and contrast;
- an opaque dark mode appropriate for web apps;
- the exact component composition exposed by this registry.

For maintenance and release order, read [Maintenance](docs/MAINTENANCE.md).
