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
  // Original MVP Club brand colors
  default: {
    primary: '#1a365d',    // Deep Navy
    secondary: '#115e59',  // Deep Teal
    accent: '#d97706',     // Amber
    accentSoft: '#f87171', // Coral
    background: '#faf5f0', // Warm Stone
  },

  // Cool tones
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

  arctic: {
    primary: '#0f766e',    // Dark Teal
    secondary: '#155e75',  // Dark Cyan
    accent: '#06b6d4',     // Bright Cyan
    accentSoft: '#22d3ee', // Light Cyan
    background: '#ecfeff', // Cyan background
  },

  sapphire: {
    primary: '#1e3a8a',    // Deep Blue
    secondary: '#1e40af',  // Blue
    accent: '#fbbf24',     // Golden
    accentSoft: '#fcd34d', // Light Gold
    background: '#eff6ff', // Blue background
  },

  // Warm tones
  sunset: {
    primary: '#7c2d12',    // Deep Brown
    secondary: '#9a3412',  // Orange Brown
    accent: '#eab308',     // Yellow
    accentSoft: '#f97316', // Orange
    background: '#fffbeb', // Warm Yellow background
  },

  desert: {
    primary: '#78350f',    // Deep Brown
    secondary: '#92400e',  // Brown
    accent: '#f59e0b',     // Amber
    accentSoft: '#fbbf24', // Golden
    background: '#fef3c7', // Warm background
  },

  ember: {
    primary: '#991b1b',    // Deep Red
    secondary: '#b45309',  // Orange Brown
    accent: '#f59e0b',     // Amber
    accentSoft: '#fb923c', // Light Orange
    background: '#fff7ed', // Warm background
  },

  terracotta: {
    primary: '#9a3412',    // Terracotta
    secondary: '#be123c',  // Rose
    accent: '#eab308',     // Yellow
    accentSoft: '#fbbf24', // Golden
    background: '#fef2f2', // Light Rose background
  },

  // Green tones
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

  mint: {
    primary: '#047857',    // Emerald
    secondary: '#059669',  // Light Emerald
    accent: '#06b6d4',     // Cyan
    accentSoft: '#22d3ee', // Light Cyan
    background: '#ecfdf5', // Mint background
  },

  olive: {
    primary: '#4d7c0f',    // Olive
    secondary: '#65a30d',  // Lime
    accent: '#eab308',     // Yellow
    accentSoft: '#fbbf24', // Golden
    background: '#fef9c3', // Yellow background
  },

  // Earthy tones
  copper: {
    primary: '#92400e',    // Deep Copper
    secondary: '#b45309',  // Bronze
    accent: '#eab308',     // Yellow
    accentSoft: '#fbbf24', // Golden
    background: '#fef3c7', // Warm background
  },

  clay: {
    primary: '#78350f',    // Clay Brown
    secondary: '#a16207',  // Warm Brown
    accent: '#f59e0b',     // Amber
    accentSoft: '#fb923c', // Light Orange
    background: '#fef9c3', // Warm yellow background
  },

  // Neutral + warm accents
  slate: {
    primary: '#1e293b',    // Dark Slate
    secondary: '#334155',  // Slate
    accent: '#0ea5e9',     // Sky Blue
    accentSoft: '#38bdf8', // Light Sky
    background: '#f8fafc', // Light background
  },

  cedar: {
    primary: '#713f12',    // Cedar Brown
    secondary: '#854d0e',  // Warm Brown
    accent: '#f59e0b',     // Amber
    accentSoft: '#fbbf24', // Golden
    background: '#fef3c7', // Warm background
  },

  // Unique combinations
  rose: {
    primary: '#881337',    // Deep Rose
    secondary: '#9f1239',  // Rose
    accent: '#fbbf24',     // Golden
    accentSoft: '#fcd34d', // Light Gold
    background: '#fff1f2', // Rose background
  },

  teal: {
    primary: '#134e4a',    // Deep Teal
    secondary: '#115e59',  // Teal
    accent: '#f97316',     // Orange
    accentSoft: '#fb923c', // Light Orange
    background: '#f0fdfa', // Teal background
  },

  indigo: {
    primary: '#3730a3',    // Indigo
    secondary: '#4338ca',  // Light Indigo
    accent: '#f59e0b',     // Amber
    accentSoft: '#fbbf24', // Golden
    background: '#eef2ff', // Indigo background
  },

  crimson: {
    primary: '#7f1d1d',    // Dark Red
    secondary: '#991b1b',  // Red
    accent: '#eab308',     // Yellow
    accentSoft: '#fbbf24', // Golden
    background: '#fef2f2', // Light Red background
  },

  // Growth-focused
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

  // Premium warm
  mahogany: {
    primary: '#7c2d12',    // Mahogany
    secondary: '#92400e',  // Warm Brown
    accent: '#fbbf24',     // Golden
    accentSoft: '#fcd34d', // Light Gold
    background: '#fff7ed', // Warm background
  },

  bronze: {
    primary: '#78350f',    // Bronze
    secondary: '#a16207',  // Brass
    accent: '#0ea5e9',     // Sky Blue
    accentSoft: '#38bdf8', // Light Sky
    background: '#fefce8', // Warm background
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
