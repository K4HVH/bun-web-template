# Homepage v2

A SolidJS component library and design system built with Vite and Bun. Features a dark "Midnight" theme with 20 components across 5 categories, comprehensive test coverage, and Docker containerized deployment.

## Features

- **20 components** across 5 categories (inputs, display, feedback, surfaces, navigation)
- **Dark theme design system** using CSS custom properties ("Midnight" black and blue scheme)
- **Unit testing** with Vitest and @solidjs/testing-library
- **E2E testing** with Playwright across Chromium, Firefox, and WebKit
- **Docker deployment** with multi-stage builds and native Bun server
- **CI/CD** with GitHub Actions (multi-architecture Docker images for amd64 and arm64)

## Quick Start

### Prerequisites

- [Bun](https://bun.sh) (runtime and package manager)

### Install

```bash
bun install
```

### Start Development Server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the component showcase.

## Component Library

### Inputs

Interactive form controls and user input components.

| Component | Description |
|-----------|-------------|
| **Button** | Primary, secondary, subtle, and danger variants |
| **ButtonGroup** | Groups buttons horizontally or vertically |
| **Checkbox** | Checkbox with custom icon support |
| **Combobox** | Dropdown select with Portal rendering (single and multi-select) |
| **RadioGroup** | Radio button groups with horizontal/vertical layout |
| **Slider** | Single and range sliders with marks and tooltips |
| **Spinner** | Loading indicators |
| **TextField** | Text input field |

### Display

Components for presenting information.

| Component | Description |
|-----------|-------------|
| **Avatar** | User avatar display |
| **AvatarGroup** | Grouped avatar display with overlap |
| **Badge** | Status and label badges |
| **Table** | Data table with sorting, selection, and sticky headers |
| **Tooltip** | Hover tooltips for contextual information |

### Feedback

User feedback and dialog components.

| Component | Description |
|-----------|-------------|
| **Dialog** | Modal dialog overlay |
| **Notification** | Toast notifications with provider context |

### Surfaces

Layout containers and background elements.

| Component | Description |
|-----------|-------------|
| **Card** | Container with emphasized and subtle variants |
| **GridBackground** | Animated canvas grid background |

### Navigation

Page layout and navigation components.

| Component | Description |
|-----------|-------------|
| **Menu** | Dropdown/context menu with nested submenus |
| **Pane** | Collapsible side/top/bottom panel |
| **Tabs** | Tab bar for content switching with icon support |

## Project Structure

```
src/
├── index.html                  # HTML entry point
├── index.tsx                   # JavaScript entry point
├── app/
│   ├── App.tsx                 # Router setup with nested routes, NotificationProvider
│   └── pages/
│       ├── Test.tsx            # Layout shell: sidebar Pane + Tabs nav
│       └── demos/              # 20 demo files (TypographyDemo.tsx, ButtonDemo.tsx, TableDemo.tsx, MenuDemo.tsx, etc.)
├── components/
│   ├── inputs/                 # Button, Checkbox, Combobox, Slider, etc.
│   ├── display/                # Avatar, Badge, Tooltip, etc.
│   ├── feedback/               # Dialog, Notification
│   ├── surfaces/               # Card, GridBackground
│   └── navigation/             # Menu, Pane, Tabs
├── styles/
│   ├── global.css              # Theme tokens and global styles
│   └── components/             # Per-component CSS files
└── utils/
    └── cssVariables.ts         # CSS variable utilities

tests/
├── unit/                       # Vitest component tests
└── e2e/                        # Playwright browser tests

serve.ts                        # Native Bun production server
Dockerfile                      # Multi-stage Docker build
scripts/
└── playwright-fedora-fix.sh    # Playwright dependency fix for Fedora
```

## Development

### Commands

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server with HMR |
| `bun run build` | Production build to `dist/` |
| `bun run serve` | Preview build with Vite |
| `bun run serve:prod` | Preview with native Bun server |

### Testing

**Important:** Use `bun run test`, not `bun test` (the latter runs Bun's built-in test runner instead of Vitest).

| Command | Description |
|---------|-------------|
| `bun run test` | Run all tests (unit + e2e) |
| `bun run test:unit` | Run unit tests only |
| `bun run test:unit:watch` | Unit tests in watch mode |
| `bun run test:unit:ui` | Unit tests with Vitest UI |
| `bun run test:e2e` | Run e2e tests (auto-starts dev server) |
| `bun run test:e2e:ui` | E2E tests with Playwright UI |
| `bun run test:e2e:headed` | E2E tests in headed browser mode |

Install Playwright browsers before running e2e tests:

```bash
bunx playwright install chromium firefox webkit
```

### Type Checking

```bash
bunx tsc --noEmit
```

## Fedora Development

If running Playwright on Fedora, use the included fix script to install required system dependencies:

```bash
bash scripts/playwright-fedora-fix.sh
```

## Build & Deployment

### Docker

The project uses a multi-stage Docker build:

1. **Builder stage** (`oven/bun:1-debian`) -- installs dependencies and builds the Vite production bundle
2. **Runner stage** (`oven/bun:1-alpine`) -- serves static files with a native Bun server (`serve.ts`), running as a non-root user

```bash
# Build the image
docker build -t homepage-v2 .

# Run on port 3000
docker run -p 3000:3000 homepage-v2
```

### CI/CD

The GitHub Actions pipeline (`.github/workflows/ci.yml`) runs on every push to `main` and on pull requests:

1. **Test** -- installs dependencies, runs unit and e2e tests, builds the application
2. **Build images** -- builds Docker images natively on both amd64 and arm64 runners (no QEMU emulation)
3. **Merge manifests** -- creates a multi-arch manifest and pushes to GitHub Container Registry (`ghcr.io`)

Image tags: `latest` (main branch), `main`, `sha-<commit>`, `v*.*.*` (semver tags).

```bash
docker pull ghcr.io/<your-username>/homepage-v2:latest
```

## Design System

The project uses a "Midnight" dark theme defined entirely through CSS custom properties in `src/styles/global.css`. The token system includes:

- **Color scales** -- gray and blue palettes with semantic aliases
- **Global tokens** (`--g-*`) -- background, text, border, spacing, radius, and transition values
- **Semantic colors** -- `--color-primary`, `--color-accent`, `--color-danger`
- **Component patterns** -- hover overlays via `::before` pseudo-elements, consistent focus rings, BEM naming

Each component has its own CSS file in `src/styles/components/{category}/` that builds on these global tokens.

## Tech Stack

- [SolidJS](https://solidjs.com) -- fine-grained reactive UI framework
- [@solidjs/router](https://docs.solidjs.com/solid-router) -- client-side routing
- [Vite](https://vitejs.dev) -- build tool with HMR
- [Bun](https://bun.sh) -- runtime and package manager
- [TypeScript](https://www.typescriptlang.org) -- type safety
- [Vitest](https://vitest.dev) -- unit testing
- [Playwright](https://playwright.dev) -- end-to-end testing
- [solid-icons](https://github.com/x64Bits/solid-icons) -- icon library

## License

MIT
