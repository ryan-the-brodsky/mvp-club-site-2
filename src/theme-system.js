import { lighten, darken, toHex, rgba, parseToRgba } from 'color2k';

/**
 * Derives color variants from a base color
 * @param {string} baseColor - Hex color code
 * @returns {Object} Color variants
 */
export function deriveColorVariants(baseColor) {
  return {
    base: baseColor,
    lifted: lighten(baseColor, 0.15), // Lighter for text on dark backgrounds
    tint: rgba(baseColor, 0.15), // Very light for card backgrounds
    tintSolid: lighten(baseColor, 0.4), // Solid light variant
    dark: darken(baseColor, 0.1), // Slightly darker
    muted: rgba(baseColor, 0.7), // 70% opacity
  };
}

/**
 * Predefined color schemes based on brand guidelines
 */
export const COLOR_PALETTES = {
  // Navy + Teal (Original brand)
  default: {
    primary: '#1a365d',    // Deep Navy
    secondary: '#115e59',  // Deep Teal
    accent: '#d97706',     // Amber
    accentSoft: '#f87171', // Coral
    background: '#faf5f0', // Warm Stone
  },

  midnight: {
    primary: '#081f3f',    // Darker Navy
    secondary: '#115e59',  // Deep Teal
    accent: '#d97706',     // Amber
    accentSoft: '#f87171', // Coral
    background: '#faf5f0', // Warm Stone
  },

  // Blue + Teal
  ocean: {
    primary: '#0c4a6e',    // Deep Ocean Blue
    secondary: '#0e7490',  // Cyan
    accent: '#f59e0b',     // Orange
    accentSoft: '#fb923c', // Light Orange
    background: '#f0f9ff', // Sky background
  },

  steel: {
    primary: '#1e3a5f',    // Steel Blue
    secondary: '#0f766e',  // Teal
    accent: '#f59e0b',     // Amber
    accentSoft: '#fbbf24', // Golden
    background: '#f0f9ff', // Cool background
  },

  sapphire: {
    primary: '#1e3a8a',    // Deep Blue
    secondary: '#1e40af',  // Blue
    accent: '#fbbf24',     // Golden
    accentSoft: '#fcd34d', // Light Gold
    background: '#eff6ff', // Blue background
  },

  // Teal + Orange (User favorite)
  teal: {
    primary: '#134e4a',    // Deep Teal
    secondary: '#115e59',  // Teal
    accent: '#f97316',     // Orange
    accentSoft: '#fb923c', // Light Orange
    background: '#f0fdfa', // Teal background
  },

  // Rose + Gold (User favorite)
  rose: {
    primary: '#881337',    // Deep Rose
    secondary: '#9f1239',  // Rose
    accent: '#fbbf24',     // Golden
    accentSoft: '#fcd34d', // Light Gold
    background: '#fff1f2', // Rose background
  },

  // Red + Yellow
  crimson: {
    primary: '#7f1d1d',    // Dark Red
    secondary: '#991b1b',  // Red
    accent: '#eab308',     // Yellow
    accentSoft: '#fbbf24', // Golden
    background: '#fef2f2', // Light Red background
  },

  // Purple + Amber
  indigo: {
    primary: '#3730a3',    // Indigo
    secondary: '#4338ca',  // Light Indigo
    accent: '#f59e0b',     // Amber
    accentSoft: '#fbbf24', // Golden
    background: '#eef2ff', // Indigo background
  },

  // Green + Orange
  forest: {
    primary: '#14532d',    // Forest Green
    secondary: '#166534',  // Green
    accent: '#ea580c',     // Deep Orange
    accentSoft: '#fb7185', // Rose
    background: '#f7fee7', // Light Green background
  },

  sage: {
    primary: '#15803d',    // Green
    secondary: '#047857',  // Emerald
    accent: '#f59e0b',     // Amber
    accentSoft: '#fbbf24', // Golden
    background: '#f0fdf4', // Light Green background
  },

  moss: {
    primary: '#365314',    // Deep Moss
    secondary: '#3f6212',  // Green
    accent: '#f59e0b',     // Amber
    accentSoft: '#fbbf24', // Golden
    background: '#f7fee7', // Light green background
  },

  pine: {
    primary: '#064e3b',    // Pine Green
    secondary: '#065f46',  // Emerald
    accent: '#d97706',     // Amber
    accentSoft: '#f97316', // Orange
    background: '#ecfdf5', // Mint background
  },

  // Emerald + Cyan
  mint: {
    primary: '#047857',    // Emerald
    secondary: '#059669',  // Light Emerald
    accent: '#06b6d4',     // Cyan
    accentSoft: '#22d3ee', // Light Cyan
    background: '#ecfdf5', // Mint background
  },

  // Slate + Sky Blue
  slate: {
    primary: '#1e293b',    // Dark Slate
    secondary: '#334155',  // Slate
    accent: '#0ea5e9',     // Sky Blue
    accentSoft: '#38bdf8', // Light Sky
    background: '#f8fafc', // Light background
  },

  // Navy + Coral
  nautical: {
    primary: '#0f172a',    // Deep Navy
    secondary: '#1e3a8a',  // Navy Blue
    accent: '#f97316',     // Coral Orange
    accentSoft: '#fb923c', // Light Coral
    background: '#f0f9ff', // Light Blue background
  },

  // Cobalt + Amber
  cobalt: {
    primary: '#1e40af',    // Cobalt Blue
    secondary: '#2563eb',  // Blue
    accent: '#f59e0b',     // Amber
    accentSoft: '#fbbf24', // Golden
    background: '#eff6ff', // Blue background
  },

  // Azure + Rose
  azure: {
    primary: '#0369a1',    // Azure Blue
    secondary: '#0284c7',  // Sky Blue
    accent: '#fb7185',     // Rose
    accentSoft: '#fda4af', // Light Rose
    background: '#f0f9ff', // Sky background
  },

  // Charcoal + Teal
  charcoal: {
    primary: '#1f2937',    // Charcoal
    secondary: '#374151',  // Gray
    accent: '#14b8a6',     // Teal
    accentSoft: '#2dd4bf', // Light Teal
    background: '#f9fafb', // Light Gray background
  },

  // Graphite + Amber
  graphite: {
    primary: '#18181b',    // Graphite
    secondary: '#27272a',  // Zinc
    accent: '#f59e0b',     // Amber
    accentSoft: '#fbbf24', // Golden
    background: '#fafafa', // Warm White background
  },

  // Deep Blue + Coral
  marine: {
    primary: '#0c4a6e',    // Marine Blue
    secondary: '#075985',  // Deep Sky
    accent: '#f87171',     // Coral
    accentSoft: '#fca5a5', // Light Coral
    background: '#f0f9ff', // Sky background
  },

  // Violet + Gold
  violet: {
    primary: '#5b21b6',    // Violet
    secondary: '#6b21a8',  // Purple
    accent: '#fbbf24',     // Golden
    accentSoft: '#fcd34d', // Light Gold
    background: '#faf5ff', // Violet background
  },

  // Plum + Amber
  plum: {
    primary: '#701a75',    // Plum
    secondary: '#86198f',  // Fuchsia
    accent: '#f59e0b',     // Amber
    accentSoft: '#fbbf24', // Golden
    background: '#fdf4ff', // Light Purple background
  },

  // Midnight Blue + Cyan
  midnight_blue: {
    primary: '#172554',    // Midnight Blue
    secondary: '#1e3a8a',  // Blue
    accent: '#06b6d4',     // Cyan
    accentSoft: '#22d3ee', // Light Cyan
    background: '#eff6ff', // Blue background
  },
};

/**
 * Generates a complete theme from color selections
 * @param {Object} colors - Base color selections
 * @returns {Object} Complete theme with all variants
 */
export function generateTheme(colors) {
  const primary = deriveColorVariants(colors.primary);
  const secondary = deriveColorVariants(colors.secondary);
  const accent = deriveColorVariants(colors.accent);
  const accentSoft = deriveColorVariants(colors.accentSoft);

  return {
    // Primary color family
    colorPrimary: primary.base,
    colorPrimaryLifted: primary.lifted,
    colorPrimaryTint: primary.tint,
    colorPrimaryTintSolid: primary.tintSolid,
    colorPrimaryDark: primary.dark,
    colorPrimaryMuted: primary.muted,

    // Secondary color family
    colorSecondary: secondary.base,
    colorSecondaryLifted: secondary.lifted,
    colorSecondaryTint: secondary.tint,
    colorSecondaryTintSolid: secondary.tintSolid,
    colorSecondaryDark: secondary.dark,
    colorSecondaryMuted: secondary.muted,

    // Accent color family
    colorAccent: accent.base,
    colorAccentLifted: accent.lifted,
    colorAccentTint: accent.tint,
    colorAccentTintSolid: accent.tintSolid,
    colorAccentDark: accent.dark,
    colorAccentMuted: accent.muted,

    // Soft accent color family
    colorAccentSoft: accentSoft.base,
    colorAccentSoftLifted: accentSoft.lifted,
    colorAccentSoftTint: accentSoft.tint,
    colorAccentSoftTintSolid: accentSoft.tintSolid,

    // Background
    colorBackground: colors.background,
    colorSurface: '#ffffff',

    // Semantic mappings (for backward compatibility)
    colorNavy: primary.base,
    colorTeal: secondary.base,
    colorAmber: accent.base,
    colorGolden: accent.lifted,
    colorCoral: accentSoft.base,
    colorWarmStone: colors.background,

    // Card backgrounds
    colorPalepeach: accent.tintSolid,
    colorIceblue: primary.tintSolid,
    colorPalemint: secondary.tintSolid,
  };
}

/**
 * Applies theme to document CSS variables
 * @param {Object} theme - Theme object from generateTheme
 */
export function applyTheme(theme) {
  const root = document.documentElement;

  Object.entries(theme).forEach(([key, value]) => {
    // Convert camelCase to kebab-case
    const cssVarName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    root.style.setProperty(`--${cssVarName}`, value);
  });
}

/**
 * Gets current theme from CSS variables
 */
export function getCurrentTheme() {
  const root = document.documentElement;
  const style = getComputedStyle(root);

  const theme = {};
  const varNames = [
    'color-primary', 'color-secondary', 'color-accent', 'color-accent-soft',
    'color-background', 'color-primary-lifted', 'color-secondary-lifted',
    'color-accent-lifted', 'color-primary-tint-solid', 'color-secondary-tint-solid'
  ];

  varNames.forEach(name => {
    const value = style.getPropertyValue(`--${name}`).trim();
    if (value) {
      const camelName = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      theme[camelName] = value;
    }
  });

  return theme;
}
