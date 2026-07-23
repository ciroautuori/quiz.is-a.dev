# Design System

## Register
product

## Theme & Color Strategy
Catppuccin Mocha (dark mode default) and Latte (light mode option).

### Color Tokens
- **Background App**: `var(--ctp-app-bg)` (#11111b Mocha / #dce0e8 Latte)
- **Background Surface**: `var(--ctp-bg)` (#1e1e2e Mocha / #eff1f5 Latte)
- **Mantle / Sidebar**: `var(--ctp-mantle)` (#181825 Mocha / #e6e9ef Latte)
- **Text Main**: `var(--ctp-text)` (#cdd6f4 Mocha / #4c4f69 Latte - contrast ≥ 7:1)
- **Subtext**: `var(--ctp-subtext0)` (#a6adc8 Mocha / #6c6f85 Latte - contrast ≥ 4.5:1)
- **Accents**:
  - Mauve: `var(--ctp-mauve)` (#cba6f7 / #8839ef) - Primary action
  - Green: `var(--ctp-green)` (#a6e3a1 / #40a02b) - Beginner / Success
  - Peach: `var(--ctp-peach)` (#fab387 / #fe640b) - Intermediate / Warning
  - Red: `var(--ctp-red)` (#f38ba8 / #d20f39) - Advanced / Error
  - Sapphire: `var(--ctp-sapphire)` (#74c7ec / #209fb5) - Functions / Code info

## Typography
- **Body / UI**: System UI font stack (`system-ui, -apple-system, sans-serif`)
- **Code / Monospace**: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`
- Line height: 1.5 - 1.6
- Max width body: 70ch

## Components & Layout
- **Navbar**: Top persistent bar with theme toggle, streak badges, navigation links
- **Game View**: Single column or split layout for question, Python code box, and 4-choice response grid
- **Modals**: Centered `<dialog>` or accessible backdrop fixed overlays with focus traps
- **Code Box**: Terminal-style box with line numbers, syntax highlighting, and copy button
- **Mobile Bottom Nav**: Fixed bottom bar for small viewports with clear touch targets (≥44px)

## Motion & Transitions
- Standard transition: `transition: all 0.2s ease`
- Spring easing for subtle pops: `cubic-bezier(0.16, 1, 0.3, 1)`
- Reduced motion override: `@media (prefers-reduced-motion: reduce) { transition: none; animation: none; }`
