# Maintaining the RCM web foundation

## Normal component change

1. Confirm the behavior is generic across RCM web apps.
2. Implement it in `src/components/ui/` or `src/components/rcm/`.
3. Add or update focused tests.
4. Update its item in `registry.json`.
5. Run `npm run validate`.
6. Review the generated item with
   `npx shadcn@latest view RCM-Industries-Inc/rayfin-ui/<item>` after it is
   published.

App-specific behavior stays in the application.

## Universal brand change

1. Approve the universal change in `Design-System`.
2. Identify what actually transfers to the web.
3. Update `rcm-theme`, component behavior, assets, tests, and showcase as
   appropriate.
4. Increment `release` in `src/lib/rcm-foundation.ts` when the coordinated
   baseline changes.
5. Run the full validation gate and publish.
6. Refresh `Rayfin_Template`.

Do not copy a report or presentation recipe directly into the web layer without
checking responsiveness, interaction, contrast, and accessibility.

## Refreshing Rayfin_Template

From the template repository:

```powershell
npx shadcn@latest view @rcm/app-foundation
npx shadcn@latest add @rcm/app-foundation --dry-run
npx shadcn@latest add @rcm/app-foundation --diff
```

Review every affected file. Use `--overwrite` only after the local differences
are understood and explicitly accepted. Then run the template's full
foundation, lint, test, and build gates.

## Updating an existing application

Treat each existing app as an independent migration:

1. Inspect its local modifications and installed component versions.
2. Preview only the desired registry items.
3. Reconcile app-specific changes rather than overwriting them.
4. Test the app's domain workflows.

A registry release does not authorize a workspace-wide application migration.

## Release checklist

- `registry.json` validates and all declared files exist.
- Internal dependencies use `@rcm`.
- `@rcm/app-foundation` contains every mandatory new-app item.
- Theme values preserve the universal RCM palette and division mapping.
- Shared components contain no app auth, router, schema, or business imports.
- Brand-asset requirements are documented.
- Tests, lint, registry build, and showcase build pass.
- `Rayfin_Template` is refreshed in a separate reviewed change.
