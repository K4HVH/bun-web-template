# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

- **SolidJS** - Fine-grained reactive UI framework
- **Vite** - Build tool with HMR
- **Bun** - Runtime and package manager
- **TypeScript** - Type safety
- **Vitest** - Unit testing with `@solidjs/testing-library`
- **Playwright** - E2E testing across Chromium, Firefox, and WebKit

## Essential Commands

### Development
```bash
bun run dev                  # Start dev server (http://localhost:3000)
bunx tsc --noEmit           # Type check
```

### Testing
```bash
# IMPORTANT: Use `bun run test`, NOT `bun test` (which runs Bun's test runner)
bun run test                # Run all tests (unit + e2e)
bun run test:unit           # Run unit tests
bun run test:unit:watch     # Unit tests in watch mode
bun run test:e2e            # Run e2e tests (auto-starts dev server)
bunx vitest run <file>      # Run specific unit test file
bunx playwright test <file> # Run specific e2e test file
```

### Build
```bash
bun run build              # Production build
bun run serve              # Preview build with Vite
bun run serve:prod         # Preview with native Bun server
```

## Component Architecture

### Component Organization

Components are organized into two categories:

```
src/components/
├── inputs/              # Interactive form controls and inputs
│   ├── Button.tsx       # Primary, secondary, subtle, danger variants
│   ├── ButtonGroup.tsx  # Groups buttons horizontally/vertically
│   ├── Checkbox.tsx     # Supports icons (iconUnchecked/iconChecked)
│   ├── Combobox.tsx     # Dropdown select with Portal rendering
│   ├── RadioGroup.tsx   # Radio button groups (horizontal/vertical)
│   ├── Slider.tsx       # Single/range sliders with marks and tooltips
│   └── Spinner.tsx      # Loading indicators
└── surfaces/            # Layout and background components
    ├── Card.tsx         # Container with variants (emphasized, subtle)
    └── GridBackground.tsx # Animated grid canvas background
```

**CSS Files**: Each component has a matching CSS file in `src/styles/components/{category}/ComponentName.css`

### Design System Patterns

All input components follow consistent patterns:

1. **Size variants**: `normal` (default) | `compact`
2. **Disabled state**: `disabled?: boolean`
3. **Orientation** (where applicable): `horizontal` (default) | `vertical`
4. **Icon support**: Components use `solid-icons/bs` with `iconUnchecked` and `iconChecked` props

### Portal Rendering

**Critical**: `Combobox` uses `Portal` from `solid-js/web` to render dropdowns outside the component tree. This ensures:
- Correct z-index stacking
- Fixed positioning that works with scrolling
- Proper rendering in unit tests (query `document` instead of `container`)

**Unit test pattern for Portal components**:
```typescript
// ❌ Wrong - won't find Portal-rendered elements
const dropdown = container.querySelector('.dropdown');

// ✅ Correct - queries document body where Portal renders
const dropdown = document.querySelector('.dropdown');
```

### Multi-Select Pattern

`Combobox` supports both single and multi-select modes:
- **Single**: `value?: string`, `onChange?: (value: string) => void`
- **Multi**: `multiple={true}`, `value?: string[]`, `onChange?: (value: string[]) => void`

Multi-select uses the `Checkbox` component internally (not a custom implementation).

## Styling System

### CSS Architecture

The project uses **CSS custom properties** (CSS variables) defined in `src/styles/global.css`:

```css
/* Global tokens prefixed with --g- */
--g-background              /* Main background color */
--g-background-elevated     /* Elevated surfaces (cards, dropdowns) */
--g-text-primary            /* Primary text color */
--g-text-secondary          /* Secondary text color */
--g-text-muted              /* Muted/placeholder text */
--g-border-color            /* Default borders */
--g-border-color-emphasis   /* Emphasized borders (hover) */
--g-spacing                 /* Base spacing unit (12px) */
--g-spacing-sm              /* Small spacing (8px) */
--g-radius                  /* Border radius (6px) */
--g-transition              /* Standard transition timing */

/* Semantic colors */
--color-primary             /* Main interaction color (blue) */
--color-accent              /* Highlight/focus color */
--color-danger              /* Destructive actions (red) */
```

### Component Styling Conventions

1. **Hover effects**: Use `::before` pseudo-element with `rgba(255, 255, 255, 0.05)` overlay
2. **Focus states**: Use `outline: 2px solid var(--color-accent)` with `outline-offset: 2px`
3. **Disabled states**: Reduce opacity to `0.5` and set `cursor: not-allowed`
4. **BEM naming**: `.component__element--modifier` pattern

**Example hover effect pattern**:
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

- Located in `tests/unit/`
- Use `@solidjs/testing-library` for component rendering
- **All Portal-rendered content must be queried via `document`, not `container`**
- Each component should have comprehensive tests covering variants, states, and interactions

### E2E Tests (Playwright)

- Located in `tests/e2e/`
- Use `127.0.0.1` instead of `localhost` (critical for Firefox on Windows)
- Dev server auto-starts on port 3000
- Test reports saved to `tests/.output/` (git-ignored)

**Important Playwright patterns**:
```typescript
// Use exact matching when multiple headings contain the same text
await expect(page.getByRole('heading', { name: 'Title', exact: true })).toBeVisible();

// Scroll elements into view before interacting
await element.scrollIntoViewIfNeeded();

// Use force clicks for elements that may be overlapped
await element.click({ force: true });
```

## TypeScript Considerations

- Union types require proper type guards (e.g., `typeof value === 'string'`)
- Return types should be explicitly annotated for helper functions
- Use type assertions carefully: `as string` only when type is guaranteed
- Ignore node_modules type errors (dependencies have harmless conflicts)

## Router Structure

Routes are defined in `src/app/App.tsx` using `@solidjs/router`:
- Use `<A>` component for navigation (not `<a>`)
- Pages go in `src/app/pages/`
- Current routes: `/` (Test page with design system examples)

## Component Development Workflow

When adding new components:

1. Create component file: `src/components/{category}/ComponentName.tsx`
2. Create CSS file: `src/styles/components/{category}/ComponentName.css`
3. Import CSS at top of component: `import '../../styles/components/{category}/ComponentName.css'`
4. Follow existing patterns: size variants, disabled state, proper TypeScript types
5. Add comprehensive unit tests in `tests/unit/ComponentName.test.tsx`
6. Update `src/app/pages/Test.tsx` with usage examples
7. Verify all tests pass: `bun run test`
8. Type check: `bunx tsc --noEmit`
