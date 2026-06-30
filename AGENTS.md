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

- **App shell / top navigation — always the shared component.** Every app's
  header MUST be `app-shell`:
  `npx shadcn@latest add RCM-Industries-Inc/rayfin-ui/app-shell`. Pass only
  `title` / `subtitle` / `context` / `actions`; never rebuild the logo,
  separator order, height, theme toggle, or sign-out. It pulls in `theme-toggle`
  + the `useTheme` hook and depends on the shared `button`. It expects the
  scaffold's `AuthContext` and the RCM logos at `src/assets/Logo_RCM_Teal.png`
  (light) and `Logo_RCM_White.png` (dark) — from the RCM Design System.
- **Theme first.** Add `rcm-theme` before anything else
  (`… add …/rcm-theme`) so all shadcn components render in RCM Modern Teal
  (light + dark). Build on the tokens; don't invent colors.
- **Primitives & composites.** Use the shared `button`, `modal`, `data-table`,
  etc. Keep their sizes/variants; don't fork them.
- **Canonical spec.** The full header/nav standard (height, order, sizes) is
  documented in the RCM Design System under "App Shell & Top Navigation".

Evolving these shared standards should be **additive** — extend, don't fork.
