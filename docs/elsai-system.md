# Elsai System Design Specification

## 1. Visual Theme & Atmosphere

Elsai is an AI-orchestration system defined by "Clean Technicality." It
blends a high-contrast charcoal (#262A33) and brand purple (#5C3FEE)
palette with geometric sans-serif typography. The aesthetic is modular
and layered, using lavender-tinted surfaces instead of heavy shadows to
establish hierarchy.

### Key Characteristics

-   Technical Tone: Space Grotesk for UI; Space Mono for technical data.
-   Surface Layering: Light tints (#F4F2FF) differentiate containers.
-   Consistent Geometry: 8px spacing, 8--12px radius, 50px pills.
-   Stateful Feedback: Clear hover, pressed, disabled states.

------------------------------------------------------------------------

## 2. Color Palette & Roles

### Brand & Primary

-   Primary Main: #5C3FEE
-   Secondary Dark: #262A33
-   Accent Blue: #2754F5

### Surfaces & Borders (Shell / Sidebar)

-   App Background: #F4F2FF
-   Sidebar Background: #FCFCFF
-   Surface Elevated: #F9F9FF / #FFFFFF
-   Input Surface: #F7F5FF
-   Soft Border: #EEEEEC

### Semantic (Shell)

-   Success: #15B001
-   Error: #E03B3B
-   Warning: #D97706

------------------------------------------------------------------------

## 3. Typography Rules

### Shell UI (Space Grotesk)

-   Display: 40px Bold
-   Heading 1: 24px Bold
-   Heading 2: 20px Bold
-   Heading 3: 18px SemiBold
-   Body Large: 16px Regular
-   Body Medium: 14px Regular
-   Technical: 14px Space Mono
-   Micro: 12px Regular

### Table UI (SpotifyMixUI / Space Grotesk fallback)

| Role             | Size  | Weight | Notes                        |
|------------------|-------|--------|------------------------------|
| Table Header     | 14px  | 700    | Uppercase, 1.4px tracking    |
| Row Primary      | 14px  | 600    | White #ffffff                |
| Row Secondary    | 13px  | 400    | Silver #b3b3b3               |
| Status Badge     | 11px  | 700    | Pill-shaped container        |

------------------------------------------------------------------------

## 4. Component Stylings & States

### Buttons

-   Primary: Purple (#5C3FEE), white text, pill
-   Secondary: White/transparent with border
-   Text: Transparent
-   Table Add User: Spotify Green (#1ed760), dark text, pill

### Cards

-   White background
-   12px radius
-   1px border (#EEEEEC)

### List Item

-   Lavender background (#F7F5FF)
-   8px radius

### Inputs

-   Background: #F7F5FF
-   Active: Purple border (#5C3FEE)
-   Error: Red border (#E03B3B)

### Sidebar

-   Background: #FCFCFF
-   Active item background: #F7F5FF
-   Active item text/icon: #5C3FEE
-   Inactive item text: #262A33
-   Inactive item icon: #9CA3AF
-   Border right: #EEEEEC

### Table (Dark Theme)

-   Canvas background: #121212
-   Table header background: #1f1f1f
-   Row background: #181818
-   Row hover: #282828 with shadow 0px 8px 16px rgba(0,0,0,0.4)
-   Row border: 1px bottom #252525
-   Primary text: #ffffff
-   Secondary text: #b3b3b3
-   Active badge: #1ed760 text, rgba(30,215,96,0.12) bg, 9999px pill
-   Inactive badge: #f3727f text, rgba(243,114,127,0.12) bg, 9999px pill
-   Action icons: circular (50% radius), transparent bg, #b3b3b3 icon
-   Action icon hover: white icon, #1f1f1f background

------------------------------------------------------------------------

## 5. Layout & Spacing

-   Grid: 8px
-   Spacing: 8, 16, 24, 32, 48, 64
-   Page padding: 24px

------------------------------------------------------------------------

## 6. Depth & Elevation

### Shell
-   Base: #F4F2FF
-   Sidebar: #FCFCFF
-   Cards: Border only (#EEEEEC)
-   Overlay: rgba(38,42,51,0.05) shadow

### Table (Dark)

| Level | Color    | Shadow                              | Use Case            |
|-------|----------|-------------------------------------|---------------------|
| 0     | #121212  | None                                | Page background     |
| 1     | #181818  | None                                | Table rows          |
| 2     | #282828  | 0px 8px 16px rgba(0,0,0,0.4)        | Hovered row         |

------------------------------------------------------------------------

## 7. Do's and Don'ts

### Do

-   Use Space Mono for data
-   Maintain 12px radius on cards
-   Use pill buttons for primary actions
-   Use #FCFCFF for sidebar background
-   Use #1ed760 (Spotify Green) only for Active status and Add User CTA
-   Use shade differences (#121212 vs #181818) to define table sections
-   Keep table borders minimal (#252525)

### Don't

-   No purple body text
-   No sharp corners
-   No multiple primary CTAs
-   No white/light-gray backgrounds for the table
-   No square corners for status badges or action buttons

------------------------------------------------------------------------

## 8. Modal / Form System (Iris Admin)

### Visual Theme
Crisp light-mode interface for configuration forms. Soft-tinted inputs (`#F7F5FF`) on a pure white modal surface, with `#5C3FEE` as the single brand accent.

### Color Palette

| Token            | Value     | Use                                  |
|------------------|-----------|--------------------------------------|
| Modal Surface    | `#FFFFFF` | Modal card background                |
| Input Background | `#F7F5FF` | All text inputs & selects            |
| Primary Border   | `#E3E5E8` | Inactive input border                |
| Active Border    | `#262A33` | Focused input border                 |
| Iris Primary     | `#5C3FEE` | Primary button bg, radio indicator   |
| Backdrop         | `rgba(38,42,51,0.45)` | Modal overlay         |

### Typography

| Role           | Size  | Weight | Color     | Notes                          |
|----------------|-------|--------|-----------|--------------------------------|
| Modal Title    | 20px  | 700    | `#000000` | Left-aligned in header         |
| Field Label    | 14px  | 400    | `#262A33` | Above each input               |
| Section Header | 12px  | 600    | `#757C8D` | UPPERCASE, 1px letter-spacing  |
| Button Text    | 14px  | 700    | varies    | White on primary, iris on cancel |

### Component Specs

**Inputs & Selects**
- Background: `#F7F5FF`, border: `1px solid #E3E5E8`, radius: `8px`
- Padding: `11px 12px`

**Buttons**
- Primary (Update/Create): `#5C3FEE` bg, `#FFFFFF` text, `8px` radius
- Secondary (Cancel): `transparent` bg, `1px solid #5C3FEE`, `#5C3FEE` text, `8px` radius
- Disabled state: `#B8ACEF` bg (desaturated iris)

**Modal Anatomy**
- Header: title + X close, separated from body by `1px solid #ECECEC`
- Body: form fields, `16–20px` vertical spacing
- Footer: right-aligned buttons, `1px solid #ECECEC` top separator

**Access Level Control**
- Radio accent: `#5C3FEE`
- Layout: 2-column grid
- Row separator: `1px solid #F0EEF8`

------------------------------------------------------------------------

## 9. Agent Prompt Guide

-   Primary button: purple (#5C3FEE), pill
-   Table Add button: Spotify Green (#1ed760), pill, dark text
-   Data row: #181818 background, white primary / silver secondary text
-   Status active: #1ed760, status inactive: #f3727f, pill shape
-   Action icons: circular, #b3b3b3, hover → white on #1f1f1f
-   Sidebar: #FCFCFF background, #F7F5FF active item
