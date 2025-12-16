#!/usr/bin/env node
import fs from 'fs';

// Mapping of hex colors to CSS variable names
const colorMap = {
  '#1a365d': 'var(--color-primary)',
  '#115e59': 'var(--color-secondary)',
  '#d97706': 'var(--color-accent)',
  '#fbbf24': 'var(--color-accent-lifted)',
  '#f87171': 'var(--color-accent-soft)',
  '#2563eb': 'var(--color-primary-lifted)', // Royal blue
  '#5a8a7a': 'var(--color-secondary-lifted)', // Sage
  '#faf5f0': 'var(--color-background)',
  '#ffffff': '#ffffff', // Keep white as-is
  '#fef3c7': 'var(--color-accent-tint-solid)',
  '#eff6ff': 'var(--color-primary-tint-solid)',
  '#f0fdfa': 'var(--color-secondary-tint-solid)',
};

const filePath = './src/mvp-club-site.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace colors in style props and CSS
Object.entries(colorMap).forEach(([hex, varName]) => {
  // Match backgroundColor: '#hex' or color: '#hex'
  const regex1 = new RegExp(`(backgroundColor|color|borderColor|border):\\s*['"]${hex}['"]`, 'gi');
  content = content.replace(regex1, `$1: '${varName}'`);

  // Match style={{ backgroundColor: '#hex' }}
  const regex2 = new RegExp(`${hex}`, 'gi');
  content = content.replace(regex2, varName);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Colors converted to CSS variables!');
