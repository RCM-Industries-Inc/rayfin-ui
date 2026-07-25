# Repository instructions

This repository is the canonical RCM **web UI registry and showcase**. It is not
a Rayfin app starter, backend, or Fabric deployment project.

## Start every task

1. Read [`docs/FOUNDATION.md`](docs/FOUNDATION.md).
2. For brand changes, read the sibling
   `../Design-System/APPLICABILITY.md` and the relevant universal guidance. If
   the sibling checkout is unavailable, use the
   [Design-System repository](https://github.com/RCM-Industries-Inc/Design-System).
3. Load the installed `shadcn` skill and use the shadcn MCP/CLI for component
   discovery, registry inspection, and updates.
4. Run `npx shadcn@latest info --json` before changing shadcn configuration.

## Ownership

- `Design-System` owns cross-medium brand foundations: colors, division
  assignments, logo rules, and shared identity.
- This repository owns the web interpretation: semantic tokens, web
  typography, accessibility, responsive behavior, interaction, dark mode, and
  reusable React APIs.
- `Rayfin_Template` owns application scaffolding: Rayfin auth, routes, schema,
  workspace defaults, app configuration, and starter documentation.

Do not copy Power BI, Word, Excel, or presentation recipes into web code merely
because they appear in `Design-System`. Preserve universal brand intent, then
make web-appropriate decisions here.

## Component rules

- Use shadcn `radix-nova`, Tailwind 4, semantic tokens, and Lucide icons.
- Use existing `src/components/ui` primitives before composing a new one.
- Forms use `FieldGroup` and `Field`; do not hand-build label/error spacing.
- Keep keyboard behavior, focus, reduced motion, contrast, and responsive
  behavior accessible.
- Shared components must not import an application's auth context, router,
  entity schema, or business services. Receive app state and actions through
  props.
- Standard chrome is `app-shell`; standard sign-in presentation is
  `auth-page`.
- Components use the public brand-asset contract documented in `README.md`.
- Generic patterns belong here. Domain-specific pages and workflows remain in
  their application.

## Registry rules

- Register every distributed item in `registry.json`.
- Internal dependencies use explicit `@rcm/<item>` addresses.
- Keep the `@rcm` namespace in `components.json` so the shadcn MCP can browse
  the registry.
- Inspect CLI output and diffs before accepting upstream shadcn updates. Never
  overwrite a modified component without explicit approval.
- `@rcm/app-foundation` is the coordinated new-app baseline. Update its
  dependency list when a component becomes mandatory for all new apps.
- Source-copy distribution is intentional; this repository does not become a
  runtime npm dependency of applications.

## Required verification

Run from this repository:

```powershell
npm run check:foundation
npm run lint
npm test
npm run build:pages
```

`npm run validate` runs the complete gate. Do not edit generated `public/r/` or
`dist/`; regenerate them.

## Coordinated changes

For a universal brand change:

1. Change and approve it in `Design-System`.
2. Translate only the relevant parts into the web theme/components here.
3. Validate and publish this registry.
4. Refresh `Rayfin_Template` with a reviewed shadcn dry run and diff.
5. Leave migrations of existing applications for a separately scoped effort.

Read [`docs/MAINTENANCE.md`](docs/MAINTENANCE.md) before changing a public
component API or foundation release marker.
