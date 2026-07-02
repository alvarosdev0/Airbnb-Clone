# Design System Master File — Airbnb Clone

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Airbnb Clone
**Generated:** 2026-07-02 (v3 — Coral Modern WCAG AA+)
**Category:** Hotel/Hospitality — Vacation Rentals
**Style:** Soft UI Evolution (skill-recommended) + Modern Coral
**Tono:** Moderno, acogedor, premium — WCAG AA+

---

## Global Rules

### Color Palette — Coral Modern

| Role | Hex | CSS Variable | Contraste WCAG |
|------|-----|--------------|----------------|
| **Primary** | `#D04444` | `--color-primary` | 4.57:1 texto ✅ AA / 4.57:1 botones ✅ AA |
| **Primary Dark** | `#B53A3A` | `--color-primary-dark` | 5.78:1 hover ✅ AA |
| **Primary Light** | `#FEF2F2` | `--color-primary-light` | Fondos sutiles |
| **Secondary** | `#6B7280` | `--color-secondary` | 4.83:1 ✅ AA (botones outline) |
| **Accent** | `#D04444` | `--color-accent` | 4.57:1 ✅ AA (estrellas, badges) |
| **Background** | `#FFFFFF` | `--color-background` | Blanco puro |
| **Foreground** | `#111111` | `--color-foreground` | 18.88:1 ✅ AAA |
| **Card** | `#FFFFFF` | `--color-card` | — |
| **Muted** | `#F7F7F7` | `--color-muted` | Fondos de sección |
| **Border** | `#E5E5E5` | `--color-border` | Bordes decorativos (1.26:1, no informativo) |
| **Ring** | `#D04444` | `--color-ring` | Focus visible |
| **Text Primary** | `#111111` | `--color-text-primary` | 18.88:1 ✅ AAA |
| **Text Secondary** | `#444444` | `--color-text-secondary` | 9.74:1 ✅ AAA |
| **Gray Soft** | `#666666` | `--color-gray-soft` | 5.74:1 ✅ AA |
| **Gray Light** | `#E5E5E5` | `--color-gray-light` | Bordes decorativos |
| **Destructive** | `#DC2626` | `--color-destructive` | 4.83:1 ✅ AA |

**Dark Mode:** Fondo `#1A1A1A`, primary `#F06A6A` (4.57:1 ✅ AA sobre cards, 5.78:1 ✅ AA sobre bg), texto `#F0F0F0` (15.27:1 ✅ AAA).

### Typography

| Role | Font | Weight | Fallback |
|------|------|--------|----------|
| **Display (h1-h2)** | Playfair Display | 600, 700 | `serif` |
| **Heading (h3-h6)** | Inter | 600, 700 | `sans-serif` |
| **Body / UI** | Inter | 300, 400, 500 | `sans-serif` |

**Mood:** Moderno, premium, acogedor, profesional

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

### Shadows (Soft UI Evolution — skill-recommended)

| Level | Value | Usage |
|-------|-------|-------|
| `shadow-soft-sm` | `0 1px 3px rgba(0,0,0,0.06)` | Card default |
| `shadow-soft-md` | `0 4px 12px rgba(0,0,0,0.08)` | Card hover |
| `shadow-soft-lg` | `0 8px 24px rgba(0,0,0,0.10)` | Modals, dropdowns |

### Border Radius (Soft UI Evolution — skill-recommended)

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-lg` | 8px | Cards, buttons |
| `rounded-xl` | 12px | Featured cards, modals |
| `rounded-full` | 9999px | Pills, search bar, avatars |

### Transitions (Soft UI Evolution — skill-recommended)

- All interactive elements: `transition-all duration-200 ease-out`
- Hover scale: 200ms
- Color/opacity shifts: 150-200ms

---

## Component Specs

### Buttons
- Primary: `bg-primary text-white font-semibold rounded-lg px-5 py-2.5`
- Hover: `hover:bg-primary-dark` with 200ms ease
- Focus: `focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2`
- State: Disabled = `opacity-50 cursor-not-allowed`
- Include `cursor-pointer`
- Outline: `border border-secondary text-secondary hover:bg-secondary hover:text-white`

### Cards (PropertyCard)
- Background: `bg-card` (white)
- Border: `border border-gray-light rounded-xl overflow-hidden`
- Default: No shadow on modern clean design
- Hover: `hover:shadow-soft-md hover:-translate-y-0.5` with 200ms ease
- Image: `aspect-[4/3] object-cover` with `hover:scale-105` 300ms
- **Text hierarchy:**
  - Title: `text-text-primary font-semibold`
  - City/Country: `text-gray-soft`
  - Price: `text-text-primary font-semibold`
  - "night": `text-gray-soft`
  - Host info: `text-gray-soft text-xs`

### SearchBar
- Container: `rounded-full border border-border bg-white shadow-soft-sm`
- Focus-within: `shadow-soft-md border-primary`
- Input: Clean, no border, `placeholder:text-gray-soft`
- Button: `rounded-full bg-primary text-white`

### CategoryBar
- Pills: `text-sm flex flex-col items-center`
- Active: `border-b-2 border-primary text-primary`
- Inactive: `text-gray-soft hover:text-text-primary`
- Scroll: Fade edges with gradient

### Inputs (Filters)
- Border: `border border-gray-light rounded-lg`
- Focus: `focus:border-primary`
- Label: `text-xs font-medium text-gray-soft`

### Footer
- Section titles: `text-xs font-semibold uppercase tracking-wider text-gray-soft`
- Links: `text-sm text-gray-soft hover:text-primary`
- Copyright: `text-xs text-gray-soft`

---

## Anti-Patterns (Do NOT Use) — from skill UX guidelines

- ❌ **Emojis as icons** — Use inline SVG
- ❌ **Slow animations (>400ms)** — Keep 150-300ms
- ❌ **Layout-shifting hovers** — Use transform/opacity only
- ❌ **Low contrast text** — All text ≥4.5:1 verified (skill UX rule)
- ❌ **Missing focus states** — Always `:focus-visible` (skill UX rule — severity: HIGH)
- ❌ **No cursor:pointer** — On all clickable elements
- ❌ **Random spacing** — Follow 8px rhythm
- ❌ **Pure black (#000) or pure white (#FFF) text** — Use warm off-tones
- ❌ **Gray text on gray background** — Skill UX rule: "text-gray-400 on gray-100" = bad

---

## Pre-Delivery Checklist (from skill UX guidelines)

- [ ] No emojis as icons (use inline SVG)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Body text contrast ≥4.5:1 minimum (skill UX rule — severity: HIGH)
- [ ] Focus states visible (`:focus-visible`) (skill UX rule — severity: HIGH)
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] 8px spacing rhythm maintained
- [ ] No horizontal scroll on mobile
- [ ] Dark/light mode contrast verified independently (skill UX rule — severity: HIGH)
