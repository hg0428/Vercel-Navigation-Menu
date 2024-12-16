# Vercel Navigation Menu

A TypeScript-based navigation menu implementation with SCSS styling.

This is my replica of the Vercel navigation menu. It is simple, clean, and has smooth animations. This code was not copied from Vercel; I simply built it inspired by the Vercel design (plus their code wasn't good anyway).

In many ways, this is *better* than the original Vercel navigation menu. The Vercel navigation menu has a few bugs that this does not have.

All content is simply placeholder content.

## Prerequisites

- [Bun](https://bun.sh/) runtime

## Installation

```bash
# Install dependencies
bun install
```

## Development

The project uses the following technologies:

- TypeScript for type-safe JavaScript
- SCSS for styling
- Webpack for bundling
- Babel for transpilation

## Building

```bash
# Run the build script
./build.sh
```

This will:

1. Compile TypeScript using Webpack
2. Process SCSS files to CSS

## Project Structure

- `dropdown.ts` - Main TypeScript implementation
- `main.scss` - SCSS styles
- `index.html` - Demo page
- `build.sh` - Build script
- `webpack.config.cjs` - Webpack configuration
- `babel.config.json` - Babel configuration
