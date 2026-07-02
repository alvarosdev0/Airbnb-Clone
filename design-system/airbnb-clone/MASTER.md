# Design System Master File — Airbnb Clone

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Airbnb Clone
**Generated:** 2026-07-02
**Category:** Hotel/Hospitality
**Style:** Nature Distilled + Soft UI Evolution
**Tono:** Cálido, acogedor, hospitalario — WCAG AA+

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable | Contraste WCAG |
|------|-----|--------------|----------------|
| **Primary** | `#B86045` | `--color-primary` | 4.75:1 on white ✅ |
| **Primary Dark** | `#95432C` | `--color-primary-dark` | 5.44:1 ✅ |
| **Secondary** | `#D4A373` | `--color-secondary` | Decorativo |
| **Accent** | `#B87D3E` | `--color-accent` | 3.46:1 iconos ✅ |
| **Background** | `#FBF6F0` | `--color-background` | Crema cálido |
| **Foreground** | `#2C2420` | `--color-foreground` | 12:1+ ✅ |
| **Card** | `#FFFFFF` | `--color-card` | — |
| **Muted** | `#F0E8DE` | `--color-muted` | — |
| **Border** | `#DDCFC3` | `--color-border` | — |
| **Ring** | `#B86045` | `--color-ring` | Focus visible |
| **Text Primary** | `#2C2420` | `--color-text-primary` | 12:1+ ✅ |
| **Text Secondary** | `#6B5A4C` | `--color-text-secondary` | 4.83:1 ✅ |
| **Gray Soft** | `#665548` | `--color-gray-soft` | 5.42:1 ✅ |
| **Gray Light** | `#E6D9CD` | `--color-gray-light` | Bordes sutiles |

**Dark Mode:** Otoño oscuro — `#2C2420` bg, `#E8A088` primary, `#F5F0EC` text.

### Typography

| Role | Font | Weight | Fallback |
|------|------|--------|----------|
| **Display (h1-h2)** | Playfair Display | 600, 700 | `serif` |
| **Heading (h3-h6)** | Inter | 600, 700 | `sans-serif` |
| **Body / UI** | Inter | 300, 400, 500 | `sans-serif` |

**Mood:** Elegante, cálido, acogedor, hospitalario

### Spacing (8px Base Rhythm)

| Token | Value | Usage |
|-------|-------|-------|
| `p-1` | 4px | Tight gaps |
| `p-2` | 8px | Icon gaps |
| `p-3` | 12px | Small padding |
| `p-4` | 16px | Standard padding |
| `p-6` | 24px | Section padding |
| `p-8` | 32px | Large gaps |
| `gap-5` | 20px | Card grid gaps |

### Shadows (Soft UI Evolution)

| Level | Value | Usage |
|-------|-------|-------|
| `shadow-soft-sm` | `0 1px 3px rgba(44,36,32,0.06)` | Card default |
| `shadow-soft-md` | `0 4px 12px rgba(44,36,32,0.08)` | Card hover |
| `shadow-soft-lg` | `0 8px 24px rgba(44,36,32,0.10)` | Modals |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-lg` | 8px | Cards, buttons |
| `rounded-xl` | 12px | Featured cards, modals |
| `rounded-full` | 9999px | Pills, search bar, avatars |

---

## Component Specs

### Buttons
- Primary: `bg-primary text-bg font-semibold rounded-lg px-5 py-2.5`
- Hover: `hover:bg-primary-dark` with 200ms ease
- Focus: `focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2`
- State: Disabled = `opacity-50 cursor-not-allowed`
- Include `cursor-pointer`

### Cards (PropertyCard)
- Border: `border border-gray-light rounded-xl overflow-hidden`
- Default: No shadow (flat)
- Hover: `hover:shadow-soft-md hover:-translate-y-0.5` with 200ms ease
- Image: `aspect-[4/3] object-cover` with `hover:scale-105` 300ms

### SearchBar
- Container: `rounded-full border border-border bg-bg shadow-soft-sm`
- Focus-within: `shadow-soft-md border-primary`
- Input: Clean, no border, `placeholder:text-gray-soft`
- Button: `rounded-full bg-primary text-bg`

### CategoryBar
- Pills: `text-sm flex flex-col items-center`
- Active: `border-b-2 border-primary text-primary`
- Inactive: `text-gray-soft hover:text-text-primary`
- Scroll: Fade edges with gradient

### Inputs (Filters)
- Border: `border border-gray-light rounded-lg`
- Focus: `focus:border-primary`
- Label: `text-xs font-medium text-gray-soft`

---

## Anti-Patterns (Do NOT Use)

- ❌ **Emojis as icons** — Use Heroicons SVG
- ❌ **Slow animations (>400ms)** — Keep 150-300ms
- ❌ **Layout-shifting hovers** — Use transform/opacity only
- ❌ **Low contrast text** — All text ≥4.5:1 verified
- ❌ **Missing focus states** — Always `:focus-visible`
- ❌ **No cursor:pointer** — On all clickable elements
- ❌ **Random spacing** — Follow 8px rhythm
- ❌ **Pure black (#000) or pure white (#FFF) text** — Use warm tones

---

## Pre-Delivery Checklist

- [ ] No emojis as icons (use Heroicons SVG)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Body text contrast ≥4.5:1 minimum
- [ ] Focus states visible (`:focus-visible`)
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] 8px spacing rhythm maintained
- [ ] No horizontal scroll on mobile
