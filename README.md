# ruixen-ui

A CLI tool for [Ruixen UI](https://github.com/ruixen-ui) — a set of accessible React components built using TypeScript and Tailwind CSS.

## Quick Start

```bash
# Install Tailwind CSS if not already present
npm install -D tailwindcss

# Add components (auto-initializes if needed)
npx ruixen-ui add cta-01
npx ruixen-ui add accordion-01
```

**That's it!** The CLI will automatically:
- Initialize your project if needed
- Install required dependencies
- Set up configuration files
- Add the requested components

## Installation

Use directly with `npx`:

```bash
npx ruixen-ui <command>
```

Or install globally:

```bash
npm install -g ruixen-ui
ruixen-ui <command>
```

## Commands

### `init`

Sets up your project with Ruixen UI:

```bash
npx ruixen-ui init
```

- Validates Tailwind CSS installation
- Creates a `ruixen.config.json` configuration file
- Detects your framework (Next.js, Vite, or React Router)
- Supports Tailwind CSS v3 and v4
- Prompts for a theme selection (Charcoal, Jade, Copper, or Cobalt)
- Installs necessary dependencies: `clsx`, `tailwind-merge`, `class-variance-authority`
- Adds utility file: `cn()` in `lib/utils.ts`
- Adds design tokens with color palette
- Configures project paths and aliases

Example output:

```
✔ Tailwind CSS detected
✔ Framework: React Router
✔ Selected theme: Jade
✔ Dependencies installed
✔ Configuration created: ruixen.config.json
```

### `list`

Lists available components:

```bash
npx ruixen-ui list
```

### `add <component>`

Installs a UI component:

```bash
npx ruixen-ui add cta-01
```

- Adds the component to your project
- Automatically installs related dependencies if needed
- Adjusts import paths based on your framework setup

## Features

### Supported Frameworks

- Next.js (App Router & Pages Router)
- Vite + React
- React Router 7

### Automatic Alias Detection

Based on your framework, the CLI sets up aliases:

| Framework           | CSS File              | Components Path      | Utils Path         |
|---------------------|------------------------|------------------------|---------------------|
| Next.js (App)       | `app/globals.css`     | `components`          | `lib/utils`         |
| Next.js (Pages)     | `styles/globals.css`  | `components`          | `lib/utils`         |
| Vite + React        | `src/App.css`         | `src/components`      | `src/lib/utils`     |
| React Router 7      | `app/app.css`         | `app/components`      | `app/lib/utils`     |

The CLI rewrites imports accordingly:

```ts
// Before:
import { cn } from '@/lib/utils'

// After (React Router):
import { cn } from '~/lib/utils'
```

### Tailwind CSS Support

The CLI works with:

- Tailwind CSS v3 (config-based tokens)
- Tailwind CSS v4 (CSS variable-based tokens)

Tokens include `ruixen-50` to `ruixen-950` and adapt based on the selected theme.

Example usage:

```tsx
<Button className="bg-ruixen-500 hover:bg-ruixen-600 text-white">
  Submit
</Button>
```

### Themes

Choose one of the predefined color palettes:

- Charcoal – Neutral gray
- Jade – Subtle green
- Copper – Warm orange-brown
- Cobalt – Cool blue

Theme selection is interactive during `init` and stored in `ruixen.config.json`.

### File Conflict Protection

If a component already exists:

- The CLI warns about file conflicts
- Prompts for confirmation before overwriting

Example:

```
Component file already exists:
  src/components/ui/button.tsx

Overwrite? (y/N)
```

### Dependency Handling

When a component depends on others (e.g., table -> spinner), the CLI automatically resolves and installs those:

```
Installing: table
Includes: spinner
```

## Requirements

- React 18+
- Tailwind CSS v3 or v4
- Node.js 16+
- TypeScript recommended

## Usage Example

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Example() {
  return (
    <Card className="border-ruixen-200">
      <CardHeader className="bg-ruixen-50">
        <CardTitle className="text-ruixen-900">Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button className="bg-ruixen-500 hover:bg-ruixen-600 text-white">
          Get Started
        </Button>
      </CardContent>
    </Card>
  )
}
```

## Documentation

See [Ruixen UI on GitHub](https://github.com/ruixen-ui) for full component docs, customization, and examples.

## Contributing

Found a bug or want to suggest a feature? [Open an issue](https://github.com/ruixen-ui-cli/issues).

## License

ISC License