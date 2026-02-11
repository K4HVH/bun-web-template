# CLAUDE.md

Guidance for Claude Code when working in this repository. This is a SolidJS component library and personal homepage with a dark "Midnight" theme.

## Tech Stack

- **SolidJS** (`solid-js@^1.9.5`) - Fine-grained reactive UI framework
- **Vite** (`vite@^7.1.4`) - Build tool with HMR, root set to `src/`
- **Bun** - Runtime and package manager
- **TypeScript** (`typescript@^5.7.2`) - Type safety
- **Vitest** (`vitest@^4.0.18`) - Unit testing with `@solidjs/testing-library` and jsdom
- **Playwright** (`@playwright/test@^1.58.0`) - E2E testing across Chromium, Firefox, and WebKit
- **solid-icons** (`solid-icons@^1.2.0`) - Bootstrap icons via `solid-icons/bs`
- **@solidjs/router** (`@solidjs/router@^0.15.4`) - Client-side routing
- **canvas** (`canvas@^3.2.1`) - Node.js canvas implementation for `GridBackground` jsdom compatibility

## Essential Commands

### Development
```bash
bun run dev                  # Start dev server (http://localhost:3000)
bunx tsc --noEmit           # Type check
```

### Testing
```bash
# IMPORTANT: Use `bun run test`, NOT `bun test` (which runs Bun's test runner instead of Vitest)
bun run test                # Run all tests (unit + e2e sequentially)
bun run test:unit           # Run unit tests only
bun run test:unit:watch     # Unit tests in watch mode
bun run test:e2e            # Run e2e tests (auto-starts dev server)
bunx vitest run <file>      # Run specific unit test file
bunx playwright test <file> # Run specific e2e test file
```

### Build
```bash
bun run build              # Production build (output: dist/)
bun run serve              # Preview build with Vite
bun run serve:prod         # Preview with native Bun server (serve.ts)
```

## Project Structure

```
src/
  index.html               # HTML entry point (Vite root is src/)
  index.tsx                 # App bootstrap
  app/
    App.tsx                 # Router setup with nested routes, wraps in NotificationProvider
    pages/
      Test.tsx              # Layout shell: sidebar Pane + Tabs nav, renders routed demo via children
      demos/                # 20 individual demo files (TypographyDemo.tsx, ButtonDemo.tsx, TableDemo.tsx, MenuDemo.tsx, etc.)
  components/
    inputs/                 # Interactive form controls (8 components)
    surfaces/               # Layout and background (2 components)
    display/                # Data presentation (5 components)
    feedback/               # User feedback (2 components)
    navigation/             # Navigation patterns (3 components)
  styles/
    global.css              # Theme tokens, resets, typography, utilities
    components/{category}/  # Per-component CSS files (mirror component tree)
  utils/
    cssVariables.ts         # getCSSVariable() / setCSSVariable() helpers
tests/
  setup.ts                  # Imports @testing-library/jest-dom
  unit/                     # Vitest unit tests (18 test files)
  e2e/                      # Playwright e2e tests (7 spec files)
  .output/                  # Test reports and results (git-ignored)
serve.ts                     # Native Bun static file server with SPA fallback
Dockerfile                   # Multi-stage build (Debian builder + Alpine runner)
.github/workflows/ci.yml    # CI pipeline
```

## Component Architecture

### Component Organization

Components are organized into five categories:

```
src/components/
  inputs/                    # Interactive form controls
    Button.tsx               # Variants: primary, secondary, subtle, danger. Sizes: compact, normal, spacious. Supports icon + loading state (shows Spinner).
    ButtonGroup.tsx          # Groups buttons. Orientation: horizontal (default), vertical.
    Checkbox.tsx             # Supports label, indeterminate, icon mode (iconUnchecked/iconChecked).
    Combobox.tsx             # Dropdown select via Portal. Single or multi-select. Uses Checkbox internally for multi.
    RadioGroup.tsx           # Radio buttons with options array. Orientation: horizontal, vertical (default). Icon mode support.
    Slider.tsx               # Single/range slider. Marks, tooltips (Portal), orientation, step=null snaps to marks only.
    Spinner.tsx              # Loading indicator. Sizes: sm, normal, lg.
    TextField.tsx            # Text input/textarea. Supports label, prefix/suffix, clearable, multiline with auto-grow, character count.
  surfaces/                  # Layout and background
    Card.tsx                 # Container. Variants: default, emphasized, subtle. Accent borders: primary, secondary, accent. Padding: compact, normal, spacious. Exports CardHeader.
    GridBackground.tsx       # Full-viewport canvas grid with gradient. Uses getCSSVariable() utility.
  display/                   # Data presentation
    Avatar.tsx               # Image/initials/icon avatar. Sizes: compact, normal, spacious. Shape: circle (default), square. Renders as <button> when onClick provided, <div> otherwise.
    AvatarGroup.tsx          # Groups Avatars with overlap. max prop shows "+N" overflow. Spacing: tight, normal, loose.
    Badge.tsx                # Notification badge overlay. Variants: primary, success, warning, error, info, neutral. Modes: content, dot, icon. Placement: top-right (default), top-left, bottom-right, bottom-left.
    Table.tsx                # Data table/grid. Multi-select with checkboxes, sortable columns, sticky header (optional). Variants: default, emphasized, subtle. Sizes: compact, normal, spacious. Loading skeleton, empty state, flexible column config.
    Tooltip.tsx              # Hover/focus tooltip via Portal. Placement: top (default), bottom, left, right with auto-flip. Show/hide delays with fade animation.
  feedback/                  # User feedback
    Dialog.tsx               # Modal dialog via Portal over Card. Sizes: small, medium (default), large, fullscreen. Backdrop/escape dismiss. Exports DialogHeader, DialogFooter.
    Notification.tsx         # Toast notification system. Context-based: NotificationProvider + useNotification(). Variants: success, error, warning, info. Positions: top-right (default), top-center, bottom-right, bottom-center. Auto-dismiss with configurable duration.
  navigation/                # Navigation patterns
    Menu.tsx                 # Dropdown/context menu via Portal. Triggers: click, contextmenu, both. Auto-positioning with flip. Anchored (follows trigger on scroll) or unanchored. Variants: default, emphasized, subtle. Sizes: compact, normal, spacious. Supports nested submenus with hover. Exports MenuItem, MenuSeparator.
    Pane.tsx                 # Collapsible side/top/bottom panel. States: closed, partial, open. Modes: permanent (push, with handle) or temporary (overlay, with backdrop). Controlled or uncontrolled. Position: left (default), right, top, bottom.
    Tabs.tsx                 # Tab bar for content switching. Variants: primary, secondary, subtle. Orientation: horizontal (default), vertical. Options array with value/label/icon. Controlled or uncontrolled. Sizes: compact, normal, spacious.
```

**CSS Files**: Each component has a matching CSS file at `src/styles/components/{category}/ComponentName.css`. Exception: `GridBackground` uses inline styles only.

### Design System Patterns

Consistent patterns across components:

1. **Size variants**: Most components support `'normal'` (default) | `'compact'`. Button and Card also support `'spacious'`.
2. **Disabled state**: `disabled?: boolean` -- reduces opacity, sets `cursor: not-allowed`.
3. **Orientation** (RadioGroup, Slider, ButtonGroup, Tabs): `'horizontal'` | `'vertical'`.
4. **Icon support**: Components use `solid-icons/bs`. Checkbox and RadioGroup accept `iconUnchecked`/`iconChecked` component props for custom icon mode.
5. **splitProps pattern**: All components use SolidJS `splitProps()` to separate local props from passthrough DOM attributes.
6. **Class composition**: Components build class strings via array `.join(' ')` pattern, accepting an optional `class` prop to append.

### Portal Rendering

Six components render via `Portal` from `solid-js/web`: **Combobox** (dropdown), **Menu** (dropdown menu), **Slider** (tooltip), **Tooltip**, **Dialog**, and **Notification**. This ensures correct z-index stacking and fixed positioning.

**Unit test pattern for Portal components**:
```typescript
// WRONG - won't find Portal-rendered elements
const dropdown = container.querySelector('.dropdown');

// CORRECT - queries document body where Portal renders
const dropdown = document.querySelector('.dropdown');
```

### Multi-Select Pattern

`Combobox` supports both single and multi-select modes:
- **Single**: `value?: string`, `onChange?: (value: string) => void`
- **Multi**: `multiple={true}`, `value?: string[]`, `onChange?: (value: string[]) => void`

Multi-select renders `Checkbox` components internally for each option. Chips with remove buttons display selected values.

## Design System

### CSS Architecture

The project uses CSS custom properties defined in `src/styles/global.css` with a "Midnight" dark theme (black/blue).

**Primitive scales** (used to define semantic tokens):
```css
--color-gray-{900..100}     /* #0a0a0a to #cccccc */
--color-blue-{950..300}     /* #001433 to #66b3ff */
--color-red-{900..300}      /* #4a0000 to #f87171 */
--color-green-{900..300}    /* #003300 to #6ee7b7 */
--color-yellow-{900..300}   /* #4d3300 to #fcd34d */
--spacing-{1..16}           /* 4px to 64px (4px base unit) */
--radius-{none,sm,md,lg,xl,full} /* 0, 2px, 4px, 8px, 12px, 9999px */
--transition-{fast,normal,slow}  /* 0.1s, 0.2s, 0.3s ease */
--font-size-{xs..6xl}       /* 12px to 60px */
```

**Semantic colors**:
```css
--color-primary: var(--color-blue-600)     /* #0066cc */
--color-secondary: var(--color-blue-800)   /* #003366 */
--color-accent: var(--color-blue-500)      /* #0080ff */
--color-danger: var(--color-red-600)       /* #b30000 */
--color-success: var(--color-green-500)    /* #10b981 */
--color-warning: var(--color-yellow-500)   /* #f59e0b */
```

**Global defaults** (prefixed `--g-`):
```css
--g-spacing: var(--spacing-4)              /* 16px */
--g-spacing-sm: var(--spacing-2)           /* 8px */
--g-spacing-lg: var(--spacing-6)           /* 24px */
--g-spacing-xs: var(--spacing-1)           /* 4px */
--g-radius: var(--radius-md)               /* 4px */
--g-border-width: var(--border-width-thin) /* 1px */
--g-transition: var(--transition-normal)   /* 0.2s ease */
--g-border-color: var(--color-gray-700)    /* #2a2a2a */
--g-border-color-subtle: var(--color-gray-800)
--g-border-color-emphasis: var(--color-primary)
--g-background: linear-gradient(205deg, var(--color-gray-900), var(--color-gray-800))
--g-background-elevated: linear-gradient(205deg, var(--color-gray-800), var(--color-gray-700))
--g-background-subtle: var(--color-black)  /* #000000 */
--g-text-primary: var(--color-white)       /* #ffffff */
--g-text-secondary: var(--color-gray-100)  /* #cccccc */
--g-text-muted: var(--color-muted)         /* var(--color-gray-400) = #6a6a6a */
--g-text-link: var(--color-primary)
--g-button-primary: linear-gradient(205deg, var(--color-blue-600), var(--color-blue-700))
--g-button-danger: linear-gradient(205deg, var(--color-red-600), var(--color-red-700))
```

### Styling Conventions

1. **Hover effects**: Use `::before` pseudo-element with `rgba(255, 255, 255, 0.05)` overlay
2. **Focus states**: Use `outline: 2px solid var(--color-accent)` with `outline-offset: 2px`
3. **Disabled states**: Reduce opacity to `0.5` and set `cursor: not-allowed`
4. **BEM naming**: `.component__element--modifier` pattern
5. **Gradients**: Backgrounds and buttons use `linear-gradient(205deg, ...)` for consistent angle

**Hover effect pattern**:
```css
.component {
  position: relative;
}
.component::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0);
  transition: background var(--g-transition);
  pointer-events: none;
}
.component:hover::before {
  background: rgba(255, 255, 255, 0.05);
}
```

## Testing Guidelines

### Unit Tests (Vitest)

- Located in `tests/unit/` (16 test files covering all components)
- Config: `vitest.config.ts` -- jsdom environment, setup file imports `@testing-library/jest-dom`
- Uses `@solidjs/testing-library` for component rendering
- **All Portal-rendered content must be queried via `document`, not `container`** (affects Combobox, Slider tooltip, Tooltip, Dialog, Notification)
- Resolve conditions: `['development', 'browser']` in vitest config

### E2E Tests (Playwright)

- Located in `tests/e2e/` (7 spec files)
- Config: `playwright.config.ts` -- tests Chromium, Firefox, and WebKit
- Uses `127.0.0.1` instead of `localhost` (critical for cross-browser compat)
- Dev server auto-starts via `bun run dev --host 127.0.0.1` on port 3000
- `reuseExistingServer: !process.env.CI` -- reuses running server locally, starts fresh in CI
- Retries: 0 locally, 2 in CI. Workers: default locally, 3 in CI.
- Reports: `tests/.output/report/`, results: `tests/.output/results/` (git-ignored)

**Important Playwright patterns**:
```typescript
// Use exact matching when multiple headings contain the same text
await expect(page.getByRole('heading', { name: 'Title', exact: true })).toBeVisible();

// Scroll elements into view before interacting
await element.scrollIntoViewIfNeeded();

// Use force clicks for elements that may be overlapped
await element.click({ force: true });
```

## Build & Deploy

### Docker

Multi-stage Dockerfile:
- **Builder** (`oven/bun:1-debian`): Installs deps with `--frozen-lockfile`, builds via `bun run build`. Uses cache mounts for Bun install cache and Vite cache.
- **Runner** (`oven/bun:1-alpine`): Copies `dist/` and `serve.ts`. Runs as non-root user `bunuser:nodejs` on port 3000.

`serve.ts` is a native Bun static file server with SPA fallback (serves `index.html` for unmatched routes). Configurable via `PORT` and `PUBLIC_DIR` env vars.

### CI/CD Pipeline

`.github/workflows/ci.yml` runs on push to `main`, tags `v*.*.*`, and PRs to `main`.

Three jobs:
1. **test**: Installs Bun + deps, caches Playwright browsers, runs `bun run test` (unit + e2e), then `bun run build`.
2. **build-image** (needs test): Builds Docker images for `linux/amd64` and `linux/arm64` in parallel using matrix strategy. Pushes by digest to `ghcr.io`.
3. **merge-manifests** (needs build-image, non-PR only): Creates multi-arch manifest list and pushes final tags (semver, branch, sha, latest).

### Fedora Playwright Compatibility

`playwright.config.ts` sets `PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=1` to bypass Playwright's Debian-only host validation on Fedora. Actual browser libraries are expected at `~/.cache/ms-playwright/fedora-compat/`.

## Git Workflow Rules

**CRITICAL**: Never execute git commands that modify state or affect remote without explicit user permission.

**NEVER run without permission**: `git add`, `git commit`, `git push`, `git reset --hard`, `git checkout .`, `git clean -f`, `git rebase`, `git merge`, `git branch -D`, `git push --force`, or any other destructive/state-modifying operation.

**Safe to run**: `git status`, `git log`, `git diff`, `git show`, `git branch` (list only), `git remote -v`.

**Workflow**: Complete all work, verify tests pass, then ASK the user if they want to stage/commit changes. Provide a suggested commit message but let the user decide.

## TypeScript Considerations

- Union types require proper type guards (e.g., `typeof value === 'string'`)
- Return types should be explicitly annotated for helper functions
- Use type assertions carefully: `as string` only when type is guaranteed
- Ignore node_modules type errors (dependencies have harmless conflicts)
- Avatar uses discriminated union types (`AvatarButtonProps | AvatarDivProps`) based on presence of `onClick`

## Router Structure

Routes defined in `src/app/App.tsx` using `@solidjs/router` with nested layout routes:
- App is wrapped in `NotificationProvider` (required for `useNotification()` hook)
- `Test` is the layout component (sidebar Pane + Tabs nav), renders child routes via `props.children`
- Each demo has its own route (e.g., `/typography`, `/button`, `/pane`). `/` redirects to `/typography`
- Demo files live in `src/app/pages/demos/` (18 files, one per component)
- Use `<A>` component for navigation (not `<a>`)

## Component Development Workflow

When adding new components:

1. Create component file: `src/components/{category}/ComponentName.tsx`
2. Create CSS file: `src/styles/components/{category}/ComponentName.css`
3. Import CSS at top of component: `import '../../styles/components/{category}/ComponentName.css'`
4. Follow existing patterns: size variants, disabled state, `splitProps()`, class composition, TypeScript interface
5. Use `Portal` for any floating/overlay content (dropdowns, tooltips, modals)
6. Add comprehensive unit tests in `tests/unit/ComponentName.test.tsx`
7. Add e2e tests in `tests/e2e/` if the component has complex interactions
8. Create a demo file in `src/app/pages/demos/ComponentNameDemo.tsx` and add a route in `src/app/App.tsx`
9. Verify all tests pass: `bun run test`
10. Type check: `bunx tsc --noEmit`
11. **Update documentation**: Update all three docs (`CLAUDE.md`, `README.md`, `DOCS.md`) with the new component, updated counts, and any architectural changes. This is mandatory, not optional.
