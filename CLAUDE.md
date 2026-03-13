# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

This is a Next.js 16 project with TypeScript and Tailwind CSS v4. It uses the App Router and was created with `create-next-app`.

## Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Architecture

- **Framework**: Next.js 16 with App Router (`app/` directory)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss` - uses new `@import "tailwindcss"` syntax and `@theme inline` directive in `app/globals.css`
- **Path Aliases**: `@/*` maps to the project root (configured in `tsconfig.json`)
- **Fonts**: Uses `next/font/google` with Geist Sans and Geist Mono fonts
- **Dark Mode**: System preference-based, handled via CSS custom properties in `app/globals.css`

## Key Files

- `app/layout.tsx` - Root layout with font configuration
- `app/page.tsx` - Main page component
- `app/globals.css` - Global styles with Tailwind v4 setup and CSS custom properties
- `tsconfig.json` - TypeScript configuration with path aliases
