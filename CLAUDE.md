# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React application for visualizing the Río Atuel (Atuel River) geography, built with Vite. The project uses custom SVG components to create an interactive geographical visualization with custom styling.

## Technology Stack

- **React 19.1.1** with React Compiler enabled (impacts dev & build performance)
- **Vite 7.x** as the build tool and dev server
- **Tailwind CSS 4.x** for styling (using Vite plugin)
- **ESLint** for code linting
- Custom fonts: Vegan, Circular, and Roboto (italic)

## Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build locally
npm preview
```

## Architecture

### Component Structure

The application is built with custom SVG-based components located in `src/App.jsx`:

- **`HBoton`**: Horizontal button with SVG circle and rounded rectangle
- **`Rio`**: Renders curved river paths using SVG with water texture pattern
  - Uses percentage-based path data that converts to absolute coordinates
  - Supports custom path definitions with Bézier curves (M, C, S, Q, T commands)
  - Water texture loaded from `/assets/water-tile.webp`
- **`Margen`**: Circular margin/border component with positioned text circles
  - Supports clip paths for partial circle rendering
  - Text circles can be positioned at specific angles around the main circle
- **`Boton`**: Standard rounded button with SVG rectangle

### Key Patterns

1. **Percentage-based coordinates**: All SVG components (`Rio`, `Margen`) accept path definitions in percentage format (0-1 range) that are converted to absolute pixel coordinates. This allows for responsive sizing.

2. **Centering with negative margins**: Components use `marginLeft: -${width/2}px` and `marginTop: -${height/2}px` to center elements at their specified position, allowing for easy absolute/fixed positioning.

3. **Z-index layering**: All custom components accept a `z` prop for layering control.

### Styling

- Custom color palette defined in `src/App.css` using Tailwind's `@theme` directive
- Custom fonts loaded via `@font-face` from `/public/fonts/`
- Complex gradient background spanning 784vh of scroll height
- Tailwind classes extended with custom font families: `font-vegan`, `font-roboto`, `font-circular`

### ESLint Configuration

- Flat config format (`eslint.config.js`)
- Custom rule: `no-unused-vars` allows uppercase constants with pattern `^[A-Z_]`
- React hooks and React Refresh plugins enabled

## File Structure

```
src/
  App.jsx       # Main component with all SVG components
  App.css       # Custom styles, fonts, and Tailwind theme
  index.css     # Base styles
  main.jsx      # React entry point
public/
  fonts/        # Custom font files (Vegan, Circular)
  assets/       # Images (water-tile.webp)
```

## React Compiler

The React Compiler is enabled via Babel plugin in `vite.config.js`. This is a performance optimization but impacts build times. Be aware when modifying the Vite configuration.
