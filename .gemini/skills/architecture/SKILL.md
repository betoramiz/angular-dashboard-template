---
name: angular-architecture
description: Apply this project's Angular application architecture. Use when adding or refactoring dashboard features, routable pages, shared layout components, feature services, facades, models, DTO mappers, route entries, folder structure, path aliases, Tailwind v4 layout, or Angular Material 3 theme conventions.
---

# Angular Architecture

Follow the project's feature-first structure and three-layer flow. Prefer these conventions over generic Angular defaults.

## Feature Structure

```text
src/app/dashboard-features/<feature-name>/
├── components/
│   └── <inner-component>/
│       ├── <inner-component>.ts
│       ├── <inner-component>.html
│       └── <inner-component>.css
├── models/
│   ├── <feature-name>-models.ts
│   └── mappers.ts
├── <feature-name>-service.ts
├── <feature-name>-facade.ts
├── <feature-name>.ts
├── <feature-name>.html
└── <feature-name>.css
```

## Layer Rules

1. View layer: components bind to signals and delegate actions. They should not perform HTTP calls or complex RxJS orchestration.
2. Facade layer: feature-local controller that owns signals, status, error state, refresh flows, and internal subscriptions.
3. Data REST layer: stateless service extending `BaseService`, returning typed observables.

## Naming and Imports

- Routable pages use default exports.
- Nested components use named exports.
- Feature pages omit the `.component` suffix.
- Shared dialogs and layout components keep the existing `<name>-component.ts` convention.
- Shared imports use `@shared/...`.
- Imports inside the same feature use relative paths.
- The shared dialogs folder is currently spelled `dialgos`; preserve that path unless explicitly fixing the project-wide typo.

## UI Stack

- Use Tailwind CSS v4 utilities for layout, spacing, grid, and responsive structure.
- Use Angular Material 3 components and tokens for interactive controls.
- Put global Material overrides in `src/themes/custom-theme.scss`; avoid component-level CSS hacks against internal Material classes.

Read [references/architecture-patterns.md](references/architecture-patterns.md) before scaffolding a new feature or changing project structure.
