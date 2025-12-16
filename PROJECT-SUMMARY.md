# MVP Club Site - Project Summary

## 🎨 Style System

### Brand Colors (CSS Variables)
- **Primary** (`--color-primary`): Deep Navy `#1a365d` - Headers, nav, primary buttons
- **Secondary** (`--color-secondary`): Deep Teal `#115e59` - Stats, accent sections
- **Accent** (`--color-accent`): Amber `#d97706` - CTAs, badges
- **Accent Lifted** (`--color-accent-lifted`): Golden `#fbbf24` - Text on dark backgrounds
- **Accent Soft** (`--color-accent-soft`): Coral `#f87171` - Decorative accents
- **Background** (`--color-background`): Warm Stone `#faf5f0` - Page background

### Auto-Generated Variants
Each base color generates:
- `*-lifted`: +15% lightness (text on dark backgrounds)
- `*-tint`: 15% opacity (subtle backgrounds)
- `*-tint-solid`: +40% lightness (card backgrounds)
- `*-dark`: -10% lightness
- `*-muted`: 70% opacity

### Typography
- **Display**: Zilla Slab (Regular only, NEVER bold)
- **Body**: Inter (Regular 400, Semi-bold 600)

### Emotional Foundation
- Authority without coldness
- Warm approachability
- Human-centered transformation
- Avoid: Black, purple primaries, typical tech startup aesthetics
- Premium without being corporate

## 🎯 Site Structure

### Sections
1. **Hero**: Strategic AI Transformation tagline
2. **Problem**: AI Adoption Crisis (10% use, $47B spent, 73% anxiety)
3. **Journey**: AnimatedValley component
4. **Philosophy**: Human + AI Teams as new unit of labor
5. **Methodology**: The Work Loop (6 steps: Articulate, Build, Prompt, Execute, Evaluate, Iterate)
6. **Organizations**: 6-Week Strategic Transformation program
7. **Practitioners**: AI-First Practitioner Community
8. **Team**: Meet the team (Ryan + 2 co-founders)
9. **Testimonials**: Community voices
10. **Contact**: Get Started (dual CTA for B2B/B2C)

## 🛠 Tech Stack

- **Framework**: React + Vite
- **Styling**: Tailwind CSS v3
- **Colors**: CSS variables + `color2k` library for derivations
- **Icons**: Lucide React
- **Deployment**: GitHub Pages (`npm run deploy`)
- **URL**: https://ryan-the-brodsky.github.io/mvp-club-site-2/

## ✨ Key Features

### Color Explorer (Dev Mode)
- Toggle: `Cmd+K` or `Ctrl+K`
- 28 preset palettes organized by mood/temperature
- Custom color picker (Primary, Secondary, Accent, Accent Soft, Background)
- Real-time theme updates via CSS variables
- All variants auto-generated programmatically

### Files
- `src/mvp-club-site.jsx` - Main site component
- `src/ColorExplorer.jsx` - Dev mode UI
- `src/theme-system.js` - Color derivation logic, 28 palettes
- `src/AnimatedValley.jsx` - Journey section animation
- `public/mvp-club-logo.jpeg` - Logo (navbar + favicon)

## 📝 Content Guidelines

### Core Value Prop
"Turn AI Access Into Genuine Capability" - focus on transformation, not just tools

### Tone
- Professional but warm
- Strategic depth without jargon
- Practical, human-centered
- Avoid: overpromising, typical consultant speak, cold corporate language

### Key Concepts
- **Human + AI Teams** (not human vs AI)
- **Practice over training** (continuous, not one-time)
- **Context matters** (tailored to specific workflows)
- **Good enough mindset** (iteration over perfection)

## 🚀 Deployment

```bash
npm run dev      # Local development
npm run build    # Build for production
npm run deploy   # Deploy to GitHub Pages
```

## 📋 Recent Changes
- All hardcoded colors converted to CSS variables
- 28 preset color palettes added
- Logo added to navbar and favicon
- Navbar uses solid primary background
- Removed "Explore" scroll arrow
- AnimatedValley section added between Problem and Philosophy
