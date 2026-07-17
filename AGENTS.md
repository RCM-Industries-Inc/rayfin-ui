# AGENTS.md

This project ships Rayfin agent context.
Load `.agents/skills/rayfin/SKILL.md` and the `rayfin` MCP server in `.mcp.json` before writing Rayfin code.

Rayfin docs are version-locked to the packages installed in this project.
Prefer the MCP tools `search_docs`, `get_doc`, `list_docs`, and `discover_packages` for examples, API details, and troubleshooting.
If MCP is unavailable, run `rayfin docs ...` from the project root so the CLI reads this project's `node_modules`.
If `rayfin` is not on `PATH`, use `npx -y @microsoft/rayfin-cli docs ...` from the project root.

Use `discover_packages` or `rayfin docs discover <topic>` when installed docs do not cover the task.

## RCM UI standards (required for every app)

These keep every RCM app looking like one product. Do not hand-roll chrome that
already exists here, and do not restyle shared components per app.

Before changing a visual artifact, read the RCM Design System's canonical
`DESIGN.md` v2 specification. In the standard sibling checkout it is
`../Design-System/DESIGN.md`; the repository source is
https://github.com/RCM-Industries-Inc/Design-System/blob/main/DESIGN.md.

- **App shell / top navigation — always the shared component.** Every app's
  header MUST be `app-shell`:
  `npx shadcn@latest add RCM-Industries-Inc/rayfin-ui/app-shell`. Pass only
  `title` / `subtitle` / `context` / `actions`; never rebuild the logo,
  separator order, height, theme selector, or sign-out. It depends on the
  shared `button` and `theme-toggle`, and expects the scaffold's `AuthContext`
  plus the teal and white RCM logos in `src/assets/`.
- **Sign-in page — always the shared component.** Every app's login MUST be
  `auth-page` (`npx shadcn@latest add RCM-Industries-Inc/rayfin-ui/auth-page`).
  Pass only `title` / `subtitle` / `footer`; the card, the "Sign in with
  Microsoft" Button, and the sizing are fixed.
- **Theme first.** Add `rcm-theme` before anything else
  (`… add …/rcm-theme`) so all shadcn components render in RCM Modern Teal
  v2. Rayfin apps must support the canonical light theme and rayfin-ui's opaque
  web dark theme. Add `theme-provider`, wrap the application root, and keep the
  shared `theme-toggle` in `app-shell` and `auth-page`. The retired Teal Glass
  treatment stays retired: no gradients, translucent surfaces, backdrop blur,
  glow effects, or decorative glass. Build on the tokens; don't invent colors,
  shadows, radii, or motion values.
- **Primitives & composites.** Use the shared `button`, `modal`, `data-table`,
  etc. from this registry, not same-named upstream shadcn items. Keep their
  sizes/variants; don't fork them.
- **Typography & data.** Use Segoe UI/system fallbacks, weights 400/600 only,
  and tabular lining figures for every value that can change.
- **Canonical spec.** If this repository disagrees with RCM Design System
  `DESIGN.md`, update rayfin-ui to match it.

### Adding or changing a shared component

This repo is the home for **reusable** RCM UI. When an app needs a component that
isn't app-specific (chrome, a primitive, a pattern any app could reuse):

1. Build it here under `src/components/rcm/` (or `ui/`), on-theme, shadcn tokens.
2. Register it in `registry.json` (name, description, files, deps) so apps add it
   with `npx shadcn add RCM-Industries-Inc/rayfin-ui/<name>`.
3. Document the standard in the RCM Design System, and mandate it above if it's
   chrome every app must share.

App-specific UI (tied to one app's domain) stays in that app. Everything reusable
belongs here — **default to promoting it.**

Evolve shared standards centrally. Extend reusable APIs when appropriate; when
the canonical Design System retires a pattern, migrate it here instead of
preserving a visual fork.
