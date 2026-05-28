---
name: angular-material-m3-theming
description: Customize Angular Material 3 theming for this project. Use when editing Material M3 theme SCSS, component override mixins, Material design tokens, Tailwind v4 coexistence, src/themes/custom-theme.scss, or visual styling of Angular Material components.
---

# Angular Material 3 Theming

Use Angular Material 3 tokens and override mixins instead of targeting internal Material DOM classes.

## Core Rules

- Keep global theme configuration in `src/themes/custom-theme.scss`.
- Use `@use '@angular/material' as mat;`.
- Use Material system CSS variables such as `var(--mat-sys-primary)` and `var(--mat-sys-surface)`.
- Use component override mixins such as `mat.button-overrides`, `mat.sidenav-overrides`, and `mat.list-overrides`.
- Use Tailwind utilities for layout and spacing; use Material tokens for component color, shape, and state styling.
- Prefer semantic modifier classes around Material components over deep selectors into generated Material classes.

```scss
@use '@angular/material' as mat;

html {
  @include mat.theme((
    typography: Roboto,
  ));

  color-scheme: light;
  background-color: var(--mat-sys-surface);
  color: var(--mat-sys-on-surface);
  font: var(--mat-sys-body-medium);
}

.side-nav-flat {
  @include mat.sidenav-overrides((
    container-width: 250px,
    container-shape: 0,
    container-background-color: var(--mat-sys-surface-container),
  ));
}

.primary-actions {
  @include mat.button-overrides((
    filled-container-shape: 8px,
    text-container-shape: 8px,
  ));
}
```

When changing UI, verify the result in the browser at both desktop and mobile widths.
