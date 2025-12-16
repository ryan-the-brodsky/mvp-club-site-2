# Color Explorer Dev Mode

## What It Does

The Color Explorer is a developer tool that lets you:
- Test different color schemes in real-time
- Explore how brand colors work together
- Programmatically generate color variants (lifted, tints, etc.)
- Switch between preset palettes
- Create custom color combinations

## How to Use

### Opening the Color Explorer

**Keyboard Shortcut**: Press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux)

**Or**: Click the floating palette icon in the bottom-right corner

### Features

#### 1. Preset Palettes
Choose from predefined color schemes:
- **Default**: Original MVP Club brand colors
- **Ocean**: Deep blues with orange accents
- **Forest**: Greens with warm accents
- **Sunset**: Browns and yellows
- **Midnight**: Deep purples with orange

#### 2. Custom Colors
Adjust individual colors using:
- Color picker (click the colored square)
- Hex input (type the value directly)

Each base color automatically generates:
- **Lifted variant**: Lighter version for text on dark backgrounds
- **Tint**: Very light version for card backgrounds (15% opacity)
- **Tint Solid**: Solid light variant for backgrounds
- **Dark**: Slightly darker version
- **Muted**: 70% opacity version

#### 3. Real-Time Updates
All changes apply instantly to the page - no refresh needed!

## Color System Architecture

### CSS Variables

The site uses CSS custom properties that are dynamically updated:

| Variable | Purpose | Derived From |
|----------|---------|--------------|
| `--color-primary` | Headers, nav, primary buttons | Base primary color |
| `--color-primary-lifted` | Royal blue for borders/links | Primary + lighten 15% |
| `--color-primary-tint-solid` | Ice blue card backgrounds | Primary + lighten 40% |
| `--color-secondary` | Stats, accent sections | Base secondary color |
| `--color-secondary-lifted` | Sage for containers | Secondary + lighten 15% |
| `--color-secondary-tint-solid` | Pale mint backgrounds | Secondary + lighten 40% |
| `--color-accent` | CTA buttons, badges | Base accent color |
| `--color-accent-lifted` | Golden for text on dark | Accent + lighten 15% |
| `--color-accent-tint-solid` | Pale peach backgrounds | Accent + lighten 40% |
| `--color-accent-soft` | Decorative accents | Base soft accent |
| `--color-background` | Page background | Direct value |

### Color Derivation Logic

Uses `color2k` library to programmatically generate variants:

```javascript
import { lighten, rgba } from 'color2k';

const variants = {
  base: '#1a365d',
  lifted: lighten('#1a365d', 0.15),    // +15% lightness
  tint: rgba('#1a365d', 0.15),         // 15% opacity
  tintSolid: lighten('#1a365d', 0.4),  // +40% lightness
  dark: darken('#1a365d', 0.1),        // -10% lightness
  muted: rgba('#1a365d', 0.7),         // 70% opacity
};
```

## Customization Tips

### Creating a New Palette

1. Open Color Explorer (`Cmd+K`)
2. Choose a preset as starting point or start from scratch
3. Adjust Primary, Secondary, and Accent colors
4. The system auto-generates all variants
5. Test across different sections of the page

### Color Relationships

- **Primary**: Should be deep/authoritative (navbars, headers)
- **Secondary**: Complementary to primary (accents, containers)
- **Accent**: High energy (CTAs, highlights)
- **Accent Soft**: Softer version of accent (borders, decorations)
- **Background**: Neutral, warm, or cool depending on desired feel

### Best Practices

✅ **Do**:
- Keep primary and secondary colors distinct
- Use high-contrast accent colors
- Test readability on both light and dark backgrounds
- Check that lifted variants work well as text

❌ **Don't**:
- Use very similar colors for primary and secondary
- Choose accent colors too close to primary/secondary
- Forget to test dark-on-light and light-on-dark combinations

## Technical Details

### Files

- `src/theme-system.js` - Color derivation logic and palette definitions
- `src/ColorExplorer.jsx` - Dev mode UI component
- `src/mvp-club-site.jsx` - Main site using CSS variables

### How It Works

1. On mount, default theme is generated and applied to CSS variables
2. ColorExplorer provides UI to change base colors
3. When colors change, new theme is generated with all variants
4. CSS variables are updated via `document.documentElement.style.setProperty()`
5. All components using `var(--color-*)` update automatically

### Adding New Color Variables

1. Update `deriveColorVariants()` in `theme-system.js` to add new variant
2. Add mapping in `generateTheme()` function
3. Use `var(--your-new-variable)` in components

Example:
```javascript
// In theme-system.js
export function deriveColorVariants(baseColor) {
  return {
    base: baseColor,
    lifted: lighten(baseColor, 0.15),
    extraLight: lighten(baseColor, 0.5), // NEW VARIANT
  };
}

export function generateTheme(colors) {
  const primary = deriveColorVariants(colors.primary);
  return {
    colorPrimary: primary.base,
    colorPrimaryLifted: primary.lifted,
    colorPrimaryExtraLight: primary.extraLight, // ADD TO THEME
  };
}

// In components
<div style={{ backgroundColor: 'var(--color-primary-extra-light)' }}>
```

## Future Enhancements

Possible additions:
- Export/import color schemes as JSON
- Share color schemes via URL
- Accessibility contrast checker
- Dark mode toggle
- Color harmony suggestions
- Gradient builder
