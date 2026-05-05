# Table Design System — Soft-Light Theme

## 1. Visual Theme & Atmosphere

This system focuses on high legibility and professional clarity. It uses
a "soft-light" approach where the UI stays out of the way of the data.
Unlike dark-themed systems, this design utilises subtle off-white
backgrounds and crisp borders to define hierarchy, creating an airy and
organised workspace.

### Key Characteristics

- Soft-Light Palette: `#F9F9FF` for headers; pure white `#FFFFFF` for rows.
- Muted Typography: Secondary data and headers use slate `#757C8D`; primary content uses `#262A33`.
- Functional Status Indicators: `#169D2A` (Active), `#E03B3B` (Inactive).
- Linear Geometry: Sharp 1px borders, tight spacing, high information density.

---

## 2. Color Palette & Roles

### Surfaces

| Token             | Value     | Use                        |
|-------------------|-----------|----------------------------|
| Header Background | `#F9F9FF` | Thead row background        |
| Row Background    | `#FFFFFF` | Tbody row default           |
| Row Hover         | `#F9F9FF` | Tbody row on mouse enter    |
| Border            | `#ECECEC` | All cell/row separators     |

### Text

| Token        | Value     | Use                              |
|--------------|-----------|----------------------------------|
| Primary Data | `#262A33` | User name, S.No, role            |
| Header/Meta  | `#757C8D` | Column headers, email, secondary |
| Success      | `#169D2A` | Active badge text                |
| Error        | `#E03B3B` | Inactive badge text, delete icon |

---

## 3. Typography Rules

| Role          | Size  | Weight | Color     | Notes                   |
|---------------|-------|--------|-----------|-------------------------|
| Table Header  | 14px  | 400    | `#757C8D` | Muted, no uppercase      |
| Primary Data  | 14px  | 400    | `#262A33` | High contrast            |
| Secondary Data| 14px  | 400    | `#757C8D` | Email, role, S.No        |
| Status Badge  | 14px  | 400    | Semantic  | Matches Active/Inactive  |

---

## 4. Component Stylings

### Table Rows

- Background: `#FFFFFF`
- Border: 1px solid `#ECECEC` (bottom only)
- Hover: background transitions to `#F9F9FF`
- Cell padding: 12px–16px horizontal

### Status Badges

- Active: bg `#E8F5E9`, text `#169D2A`, radius 4–6px
- Inactive: bg `#FFEBEE`, text `#E03B3B`, radius 4–6px
- Font: 14px, weight 400

### Action Buttons

- Geometry: 4px border-radius (slightly rounded square)
- Size: 30×30px
- Default icon colour: `#757C8D`
- Delete icon colour: `#E03B3B`
- Hover: light tinted background matching icon colour

---

## 5. Layout Principles

- Base unit: 8px
- Cell padding: `12px 16px`
- No heavy shadows — rely on border + shade variation

---

## 6. Do's and Don'ts

### Do

- Pure white rows — maintain clean aesthetic
- `#757C8D` for all non-essential metadata
- 1px borders only — no visual clutter
- Uniform 14px for both headers and data

### Don't

- No heavy shadows
- No bright colours for body text
- No full-pill badges (max 6px radius)
- No uppercase table headers
