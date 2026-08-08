# RCM foundation contract

The RCM foundation has three deliberately separate layers.

```text
rcm-toolkit / rcm-industries-design
  cross-medium brand identity and scoped artifact guidance
        |
        | translate universal foundations for the web
        v
rayfin-ui
  canonical web tokens, behavior, components, and registry
        |
        | install source through @rcm/app-foundation
        v
Rayfin_Template
  canonical application scaffold and operational defaults
        |
        | clone / use as a repository template
        v
individual Rayfin applications
```

## rcm-toolkit design skill

The `rcm-industries-design` skill supports Power BI reports, Word documents, Excel workbooks,
PowerPoint presentations, web work, and other branded artifacts. Its universal
authority is the RCM identity: core colors, fixed division assignments, logo
use, and shared visual/voice principles.

Some of its typography, layout, surface, and component recipes are specifically
useful for reporting or Office artifacts. They are inputs to web design, not
automatic web requirements.

## rayfin-ui

This repository is the final authority for RCM web application UI. It:

- maps shared brand colors into semantic web tokens;
- chooses web-appropriate typography and responsive behavior;
- owns keyboard, focus, motion, contrast, and dark-mode behavior;
- publishes reusable source components through shadcn;
- shows the components in a backend-free static showcase.

It does not own app authentication, routes, Rayfin entities, Fabric workspaces,
or domain workflows. Shared presentation components receive app-specific data
and actions through props.

## Rayfin_Template

The template is the only supported starting point for a new RCM Rayfin app. It
owns:

- React/Vite/Tailwind/Rayfin scaffolding;
- auth and route wiring;
- the empty data schema and Fabric defaults;
- app naming/configuration;
- standard logo assets;
- the installed `@rcm/app-foundation`;
- validation and agent instructions.

The template vendors component source because that is how shadcn works. It does
not vendor the complete design skill, and it does not reconstruct shared
components.

## Individual applications

An application owns its business pages, entities, queries, workflows, and
app-specific compositions. A broadly reusable fix should be promoted to
`rayfin-ui`, then deliberately pulled back into the app.

Existing apps are never silently rewritten when the registry changes. Their
migration is a separate, reviewed task.
