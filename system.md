# Elsai Prior Authorization Agent — Design System

## Color Palette

| Token             | Value     | Usage                                 |
|-------------------|-----------|---------------------------------------|
| `iris`            | `#5C3FEE` | Primary accent, buttons, active state |
| `ink`             | `#262A33` | Primary text                          |
| `slate`           | `#757C8D` | Secondary / muted text                |
| `border`          | `#ECECEC` | Table borders, dividers               |
| `field-border`    | `#E3E5E8` | Default input border                  |
| `field-bg`        | `#F7F5FF` | Input / field background              |
| `surface`         | `#F9F9FF` | Table header, hover row               |
| `success`         | `#169D2A` | Active / Connected / Approved         |
| `success-bg`      | `#E8F5E9` | Success badge background              |
| `warning`         | `#D97706` | Pending                               |
| `warning-bg`      | `#FEF3C7` | Pending badge background              |
| `danger`          | `#E03B3B` | Error / Denied / Inactive / Deleted   |
| `danger-bg`       | `#FFEBEE` | Error badge background                |

---

## Typography

Font family: `'Space Grotesk', sans-serif`

| Role              | Size  | Weight |
|-------------------|-------|--------|
| Page title        | 20px  | 700    |
| Modal title       | 20px  | 700    |
| Section heading   | 14px  | 600    |
| Body / label      | 14px  | 400    |
| Badge / caption   | 13px  | 400    |
| Error message     | 12px  | 400    |
| Micro / sub-label | 12px  | 600    |

---

## Text Field States

All form inputs and textareas follow a consistent 4-state model.

### Single-Line Input (`FormField`)

```
Background : #F7F5FF
Border radius : 10px
Padding : 11px 14px
Font size : 14px
Transition : border-color 0.15s
```

| State        | Border                   | Background | Text color |
|--------------|--------------------------|------------|------------|
| **Default**  | `1px solid #E3E5E8`      | `#F7F5FF`  | `#262A33`  |
| **Active / Focused** | `1px solid #5C3FEE` | `#F7F5FF` | `#262A33` |
| **Error**    | `1px solid #E03B3B`      | `#F7F5FF`  | `#262A33`  |
| **Disabled** | `1px solid #E3E5E8`      | `#EBEBEF`  | `#A0A6B2`  |

- **Error state**: shows a red helper text (`#E03B3B`, 12px) directly below the field.
- **Disabled state**: `cursor: not-allowed`, no pointer events.
- **Required fields**: red asterisk `*` in `#E03B3B` appended to the label.

### Multi-Line Textarea (`FormTextArea`)

Same token values as single-line. Additional rule:
- `resize: vertical` — user may expand vertically only.
- Default `rows`: 4.

### Dropdown / Select (`SelectDropdown`)

| State            | Trigger border           |
|------------------|--------------------------|
| **Closed**       | `1px solid #E3E5E8`      |
| **Open / Active**| `1px solid #5C3FEE`      |

- List: `position: absolute`, `max-height: 192px` (4 items), `overflowY: auto`, `zIndex: 9999`.
- Selected item: `#E8F5E9` background, green circle-tick checkmark in `#169D2A`.
- Hover item: `#F7F5FF` background.

### Search Input

Same `#F7F5FF` background and border tokens. Active (focused) border: `1px solid #5C3FEE`.

---

## Buttons

### Primary (filled)
```
Background : #5C3FEE
Color      : #FFFFFF
Border     : none
Radius     : 10px
Padding    : 10px 24px
Font       : 14px / 700
```

### Outline
```
Background : transparent
Color      : #5C3FEE
Border     : 1px solid #5C3FEE
Radius     : 10px
Padding    : 10px 24px
Font       : 14px / 700
```

### Danger outline (delete / destructive)
```
Border : 1px solid #E03B3B
Color  : #E03B3B
```

### Disabled primary
```
Background : #B8ACEF   (lightened iris)
Cursor     : not-allowed
```

---

## Status Badges

```
display     : inline-flex
align-items : center
padding     : 3px 12px
border-radius : 5px
font-size   : 13px
```

| Label          | Background  | Color     |
|----------------|-------------|-----------|
| Active         | `#E8F5E9`   | `#169D2A` |
| Connected      | `#E8F5E9`   | `#169D2A` |
| Approved       | `#E8F5E9`   | `#169D2A` |
| Pending        | `#FEF3C7`   | `#D97706` |
| Inactive       | `#FFEBEE`   | `#E03B3B` |
| Disconnected   | `#FFEBEE`   | `#E03B3B` |
| Denied         | `#FFEBEE`   | `#E03B3B` |

---

## Table Design

```
Border       : 1px solid #ECECEC
Border-radius: 10px
Overflow     : hidden
```

| Area            | Background  | Border-bottom        |
|-----------------|-------------|----------------------|
| Header row      | `#F9F9FF`   | `1px solid #ECECEC`  |
| Body row        | `#FFFFFF`   | `1px solid #ECECEC`  |
| Body row :hover | `#F9F9FF`   | —                    |

Header cell: `14px / 400 / #757C8D`, `padding: 12px 16px`.  
Body cell: `14px / 400 / #262A33`, `padding: 13px 16px`.

---

## Modal System

```
Background     : #FFFFFF
Border-radius  : 12px
Border         : 1px solid #E3E5E8
Max-height     : 90vh
Backdrop       : rgba(38, 42, 51, 0.45)
```

| Region | Behaviour |
|--------|-----------|
| Header | `flexShrink: 0` — always visible |
| Body   | `flex: 1; overflowY: auto` — scrollable |
| Footer | `flexShrink: 0` — always visible |

Widths: standard `480px`, wide (User management) `1120px`.

---

## Action Buttons (tables)

32 × 32px, `border-radius: 6px`, `border: 1px solid {color}`.

| Variant | Border / Color | Hover bg  |
|---------|---------------|-----------|
| Edit    | `#5C3FEE`     | `#F0EDFF` |
| View    | `#5C3FEE`     | `#F0EDFF` |
| Delete  | `#E03B3B`     | `#FFEBEE` |

---

## Modals — Data Source (Config Panel)

**Edit / Add Data Source**

Fields (in order):
1. Version Name `*` — single-line `FormField`
2. Description `*` — `FormTextArea` (4 rows)
3. Choose Data Source `*` — `SelectDropdown`
4. Connection String / URL — single-line `FormField` (optional)

Footer: `Cancel` (outline) + `Save` (primary, disabled until required fields filled).
