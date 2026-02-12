# Documentation

Comprehensive reference for the SolidJS component library. Combines the component reference, design system tokens, and architecture documentation.

---

# Part 1: Component Reference

A comprehensive reference for all 20 components in this SolidJS design system, organized by category.

---

## Inputs

### Button

A clickable button element with multiple visual variants, size options, icon support, and a loading state that displays an integrated spinner.

**Props Interface**

```typescript
interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'subtle' | 'danger';  // default: 'primary'
  size?: 'compact' | 'normal' | 'spacious';                  // default: 'normal'
  loading?: boolean;                                          // default: false
  icon?: Component;                                           // optional icon component
  iconPosition?: 'left' | 'right';                            // default: 'left'
  children?: JSX.Element;
}
```

**Variants and States**

- **Variants**: `primary` (filled blue), `secondary` (bordered), `subtle` (transparent background), `danger` (filled red)
- **Sizes**: `compact` (smaller padding/font), `normal`, `spacious` (larger padding/font)
- **States**: disabled (opacity 0.5, cursor not-allowed), loading (shows spinner, disables button)
- **Icon-only**: When `icon` is provided without `children`, the button renders as a square icon button

**Usage Example**

```tsx
import { Button } from '../components/inputs/Button';
import { BsPlus } from 'solid-icons/bs';

<Button variant="primary" onClick={handleClick}>Save</Button>
<Button variant="secondary" size="compact">Cancel</Button>
<Button variant="danger" loading={isDeleting()}>Delete</Button>
<Button icon={BsPlus} iconPosition="left">Add Item</Button>
<Button icon={BsPlus} variant="subtle" />  {/* Icon-only */}
```

**Key CSS Classes**

| Class | Description |
|---|---|
| `.button` | Base class |
| `.button--primary`, `.button--secondary`, `.button--subtle`, `.button--danger` | Variant modifiers |
| `.button--compact`, `.button--spacious` | Size modifiers |
| `.button--loading` | Loading state |
| `.button--icon-only` | Icon-only mode (square padding) |
| `.button__icon` | Icon wrapper span |

---

### ButtonGroup

A container that groups multiple Button components together, merging their borders and adjusting border-radius so they appear as a single connected unit.

**Props Interface**

```typescript
interface ButtonGroupProps extends JSX.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';  // default: 'horizontal'
  children?: JSX.Element;
}
```

**Variants and States**

- **Orientation**: `horizontal` (buttons side by side) or `vertical` (buttons stacked)
- Border radius is removed from middle buttons and preserved only on the outer edges of first/last children
- Adjacent borders overlap to prevent doubling

**Usage Example**

```tsx
import { ButtonGroup } from '../components/inputs/ButtonGroup';
import { Button } from '../components/inputs/Button';

<ButtonGroup>
  <Button variant="secondary">Left</Button>
  <Button variant="secondary">Center</Button>
  <Button variant="secondary">Right</Button>
</ButtonGroup>

<ButtonGroup orientation="vertical">
  <Button variant="secondary">Top</Button>
  <Button variant="secondary">Bottom</Button>
</ButtonGroup>
```

**Key CSS Classes**

| Class | Description |
|---|---|
| `.button-group` | Base container (horizontal layout) |
| `.button-group--vertical` | Vertical layout modifier |

---

### Checkbox

A styled checkbox input with support for labels, indeterminate state, and custom icon mode where icons replace the default checkbox box.

**Props Interface**

```typescript
interface CheckboxProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string;                    // optional label text
  size?: 'normal' | 'compact';      // default: 'normal'
  indeterminate?: boolean;           // default: false
  iconUnchecked?: Component;        // icon shown when unchecked
  iconChecked?: Component;          // icon shown when checked
}
```

**Variants and States**

- **Sizes**: `normal` (18px box) or `compact` (14px box)
- **States**: checked (filled primary color with checkmark), unchecked, indeterminate (filled with horizontal dash), disabled (opacity 0.5)
- **Icon mode**: When `iconUnchecked` or `iconChecked` is provided, icons replace the standard checkbox box with opacity-based transitions

**Usage Example**

```tsx
import { Checkbox } from '../components/inputs/Checkbox';
import { BsHeart, BsHeartFill } from 'solid-icons/bs';

<Checkbox label="Accept terms" checked={checked()} onChange={handleChange} />
<Checkbox size="compact" label="Small checkbox" />
<Checkbox indeterminate={true} label="Select all" />
<Checkbox
  iconUnchecked={BsHeart}
  iconChecked={BsHeartFill}
  label="Favorite"
/>
```

**Key CSS Classes**

| Class | Description |
|---|---|
| `.checkbox` | Base label wrapper |
| `.checkbox--compact` | Compact size modifier |
| `.checkbox--disabled` | Disabled state |
| `.checkbox--icon` | Icon mode modifier |
| `.checkbox__input` | Hidden native input |
| `.checkbox__box` | Custom checkbox visual (with `::after` checkmark) |
| `.checkbox__label` | Label text |
| `.checkbox__icon-wrapper` | Icon container |
| `.checkbox__icon--unchecked`, `.checkbox__icon--checked` | Icon state toggles |

---

### Combobox

A dropdown select component supporting both single and multi-select modes. Uses `Portal` from `solid-js/web` to render the dropdown outside the component tree for proper z-index and positioning.

**Props Interface**

```typescript
interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: Component;
  iconUnchecked?: Component;
  iconChecked?: Component;
}

interface ComboboxProps {
  name?: string;
  value?: string | string[];                        // string for single, string[] for multi
  onChange?: (value: string | string[]) => void;
  options: ComboboxOption[];                         // required
  placeholder?: string;                              // default: 'Select...'
  size?: 'normal' | 'compact';                       // default: 'normal'
  disabled?: boolean;                                // default: false
  multiple?: boolean;                                // default: false
  class?: string;
}
```

**Variants and States**

- **Single select**: Value is a string; dropdown closes on selection
- **Multi select**: Value is a string array; dropdown stays open; selected items render as removable chips; each option shows a Checkbox internally
- **Sizes**: `normal` or `compact`
- **States**: open (border highlights, arrow rotates), disabled (opacity 0.5), option selected, option disabled

**Usage Example**

```tsx
import { Combobox } from '../components/inputs/Combobox';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana', disabled: true },
  { value: 'cherry', label: 'Cherry' },
];

{/* Single select */}
<Combobox
  options={options}
  value={selected()}
  onChange={setSelected}
  placeholder="Pick a fruit"
/>

{/* Multi select */}
<Combobox
  multiple
  options={options}
  value={selectedList()}
  onChange={setSelectedList}
/>
```

**Key CSS Classes**

| Class | Description |
|---|---|
| `.combobox` | Base wrapper |
| `.combobox--compact` | Compact size |
| `.combobox--disabled` | Disabled state |
| `.combobox--open` | Open state |
| `.combobox__trigger` | Clickable trigger area |
| `.combobox__value` | Value display area |
| `.combobox__placeholder` | Placeholder text |
| `.combobox__arrow` | Dropdown arrow indicator |
| `.combobox__dropdown` | Portal-rendered dropdown container |
| `.combobox__option` | Individual option row |
| `.combobox__option--selected` | Selected option |
| `.combobox__option--disabled` | Disabled option |
| `.combobox__chips` | Multi-select chips container |
| `.combobox__chip` | Individual chip |
| `.combobox__chip-remove` | Chip remove button |

**Testing Notes**

The dropdown is rendered via `Portal` and will not be found inside the component's container element. Query `document` directly:

```typescript
// Correct
const dropdown = document.querySelector('.combobox__dropdown');

// Incorrect - will return null
const dropdown = container.querySelector('.combobox__dropdown');
```

---

### RadioGroup

A group of radio buttons supporting labels, custom icons, and both horizontal and vertical layouts. Each option can have its own icon pair.

**Props Interface**

```typescript
interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
  iconUnchecked?: Component;
  iconChecked?: Component;
}

interface RadioGroupProps {
  name: string;                                     // required - groups radios together
  value?: string;                                   // currently selected value
  onChange?: (value: string) => void;
  options: RadioOption[];                            // required
  size?: 'normal' | 'compact';                      // default: 'normal'
  orientation?: 'horizontal' | 'vertical';           // default: 'vertical'
  disabled?: boolean;                               // default: false
  class?: string;
}
```

**Variants and States**

- **Sizes**: `normal` (18px circle) or `compact` (14px circle)
- **Orientation**: `vertical` (stacked) or `horizontal` (inline, wrapping)
- **States**: checked (filled primary color with inner dot), unchecked, disabled (opacity 0.5)
- **Icon mode**: Icons replace the default radio circle with opacity-based transitions

**Usage Example**

```tsx
import { RadioGroup } from '../components/inputs/RadioGroup';

<RadioGroup
  name="color"
  value={selectedColor()}
  onChange={setSelectedColor}
  orientation="horizontal"
  options={[
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green', disabled: true },
  ]}
/>
```

**Key CSS Classes**

| Class | Description |
|---|---|
| `.radio-group` | Base container (vertical layout) |
| `.radio-group--horizontal` | Horizontal layout |
| `.radio` | Individual radio label wrapper |
| `.radio--compact` | Compact size |
| `.radio--disabled` | Disabled state |
| `.radio--icon` | Icon mode |
| `.radio__input` | Hidden native radio input |
| `.radio__circle` | Custom radio visual (with `::after` inner dot) |
| `.radio__label` | Label text |
| `.radio__icon-wrapper` | Icon container |
| `.radio__icon--unchecked`, `.radio__icon--checked` | Icon state toggles |

---

### Slider

A range slider supporting single and dual-thumb modes, marks with labels, tooltips, and both horizontal and vertical orientations. Tooltips are rendered via `Portal`.

**Props Interface**

```typescript
interface SliderMark {
  value: number;
  label?: string;
}

interface SliderProps {
  value?: number | [number, number];                          // single or range value
  onChange?: (value: number | [number, number]) => void;
  min?: number;                                               // default: 0
  max?: number;                                               // default: 100
  step?: number | null;                                       // default: 1. null = snap to marks only
  disabled?: boolean;                                         // default: false
  orientation?: 'horizontal' | 'vertical';                    // default: 'horizontal'
  size?: 'normal' | 'compact';                                // default: 'normal'
  range?: boolean;                                            // default: false
  marks?: SliderMark[];                                       // optional tick marks
  showTooltip?: boolean;                                      // default: true (shown on hover/drag)
  class?: string;
}
```

**Variants and States**

- **Single slider**: One thumb, value is a number
- **Range slider**: Two thumbs (`range={true}`), value is `[number, number]`; thumbs can cross over and will swap
- **Orientation**: `horizontal` or `vertical` (200px default height)
- **Sizes**: `normal` (6px track, 18px thumb) or `compact` (4px track, 14px thumb)
- **Marks**: Dots along the track with optional labels; when `step={null}`, the slider snaps to mark values only
- **Tooltip**: Portal-rendered tooltip showing the current value on hover or drag
- **States**: disabled, dragging (thumb scales up with shadow)

**Usage Example**

```tsx
import { Slider } from '../components/inputs/Slider';

<Slider value={volume()} onChange={setVolume} />

<Slider
  range
  value={[20, 80]}
  onChange={setRange}
  min={0}
  max={100}
  step={5}
  marks={[
    { value: 0, label: '0%' },
    { value: 50, label: '50%' },
    { value: 100, label: '100%' },
  ]}
/>
```

**Key CSS Classes**

| Class | Description |
|---|---|
| `.slider` | Base wrapper |
| `.slider--vertical` | Vertical orientation |
| `.slider--compact` | Compact size |
| `.slider--disabled` | Disabled state |
| `.slider--dragging` | Active drag state |
| `.slider__track` | Track bar |
| `.slider__range` | Filled portion of track |
| `.slider__thumb` | Draggable thumb |
| `.slider__thumb--start`, `.slider__thumb--end` | Range thumb identifiers |
| `.slider__mark` | Mark container |
| `.slider__mark-dot` | Mark dot |
| `.slider__mark-label` | Mark label text |
| `.slider__tooltip` | Portal-rendered tooltip |

**Testing Notes**

The tooltip is rendered via `Portal`. Query `document` directly to find `.slider__tooltip`.

---

### Spinner

A minimal animated loading spinner rendered as a rotating bordered circle. Inherits `currentColor` for the border, making it adaptable to its parent context.

**Props Interface**

```typescript
interface SpinnerProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'normal' | 'lg';  // default: 'normal'
}
```

**Variants and States**

- **Sizes**: `sm` (12px), `normal` (16px), `lg` (20px)
- Renders as a `<span>` element
- Animation: 0.6s linear infinite rotation

**Usage Example**

```tsx
import { Spinner } from '../components/inputs/Spinner';

<Spinner />
<Spinner size="sm" />
<Spinner size="lg" />
```

**Key CSS Classes**

| Class | Description |
|---|---|
| `.spinner` | Base class (16px default) |
| `.spinner--sm` | Small size (12px) |
| `.spinner--lg` | Large size (20px) |

---

### TextField

A text input component supporting single-line and multi-line modes, with optional label, prefix/suffix content, clearable button, character count, and auto-growing textarea.

**Props Interface**

```typescript
interface TextFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  onInput?: (value: string) => void;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';  // default: 'text'
  placeholder?: string;
  disabled?: boolean;                          // default: false
  size?: 'normal' | 'compact';                // default: 'normal'
  label?: string;                              // optional label above input
  maxLength?: number;                          // maximum character count
  showCount?: boolean;                         // show character counter (requires maxLength)
  prefix?: JSX.Element | string;               // content before the input
  suffix?: JSX.Element | string;               // content after the input
  clearable?: boolean;                         // show clear (X) button when value is non-empty
  multiline?: boolean;                         // render as textarea instead of input
  rows?: number;                               // default: 3 (multiline only)
  maxRows?: number;                            // max auto-grow rows (disables manual resize)
  class?: string;
  name?: string;
  id?: string;
}
```

**Variants and States**

- **Single-line**: Default mode with `<input>` element
- **Multi-line**: `multiline={true}` renders a `<textarea>` with auto-grow behavior
- **Sizes**: `normal` or `compact` (smaller padding and font)
- **States**: disabled (opacity 0.5), focused (primary border color)
- **Features**: clearable (shows X button), character count, prefix/suffix (supports embedding components like Combobox)
- Number input spinners are hidden by default

**Usage Example**

```tsx
import { TextField } from '../components/inputs/TextField';

<TextField
  label="Username"
  value={username()}
  onChange={setUsername}
  placeholder="Enter your name"
  clearable
/>

<TextField
  multiline
  rows={3}
  maxRows={6}
  maxLength={200}
  showCount
  value={bio()}
  onChange={setBio}
/>

<TextField prefix="$" suffix=".00" type="number" />
```

**Key CSS Classes**

| Class | Description |
|---|---|
| `.textfield` | Base container |
| `.textfield--compact` | Compact size |
| `.textfield--disabled` | Disabled state |
| `.textfield__label` | Label element |
| `.textfield__wrapper` | Input wrapper (border, background) |
| `.textfield__input` | Input or textarea element |
| `.textfield__input--with-prefix` | Input with prefix (removes left padding) |
| `.textfield__input--with-suffix` | Input with suffix (removes right padding) |
| `.textfield__prefix`, `.textfield__suffix` | Prefix/suffix containers |
| `.textfield__suffix-container` | Container for clear button, count, and suffix |
| `.textfield__clear` | Clear button |
| `.textfield__count` | Character count display |

---

## Surfaces

### Card

A container component with visual variants, optional left accent border, interactive hover effects, and configurable padding. Also exports a `CardHeader` sub-component.

**Props Interface**

```typescript
interface CardProps extends JSX.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'emphasized' | 'subtle';                // default: 'default'
  interactive?: boolean;                                         // default: false
  accent?: 'primary' | 'secondary' | 'accent' | 'none';         // default: 'none'
  padding?: 'compact' | 'normal' | 'spacious';                  // default: 'normal'
  children?: JSX.Element;
}

interface CardHeaderProps {
  title: string;       // required
  subtitle?: string;
}
```

**Variants and States**

- **Variants**: `default` (standard background), `emphasized` (elevated background, emphasized border), `subtle` (subtle background and border)
- **Interactive**: When `true`, the card has a pointer cursor, lifts on hover (`translateY(-2px)`), and presses down on click
- **Accent**: Adds a thicker left border in the specified color (`primary`, `secondary`, or `accent`)
- **Padding**: `compact`, `normal`, or `spacious`

**Usage Example**

```tsx
import { Card, CardHeader } from '../components/surfaces/Card';

<Card>
  <CardHeader title="Settings" subtitle="Configure your preferences" />
  <p>Card content here</p>
</Card>

<Card variant="emphasized" interactive accent="primary" padding="spacious">
  <p>Clickable emphasized card with accent border</p>
</Card>
```

**Key CSS Classes**

| Class | Description |
|---|---|
| `.card` | Base container |
| `.card--default`, `.card--emphasized`, `.card--subtle` | Variant modifiers |
| `.card--interactive` | Hover lift effect |
| `.card--accent-left` | Left accent border |
| `.card--primary`, `.card--secondary`, `.card--accent` | Accent color modifiers |
| `.card--compact`, `.card--spacious` | Padding modifiers |
| `.card__header` | Header sub-component |

---

### GridBackground

A full-viewport canvas element that draws an animated grid pattern with a gradient. The grid is rendered using the Canvas 2D API and auto-resizes with the window. This component has no CSS file; it uses inline styles exclusively.

**Props Interface**

```typescript
interface GridBackgroundProps {
  gridSize?: number;    // default: 10 (pixel spacing between lines)
  gridColor?: string;   // default: CSS variable '--color-gray-800'
}
```

**Variants and States**

- Renders a `<canvas>` element with `position: fixed`, `pointer-events: none`, and `z-index: 0`
- The grid uses a linear gradient from `--color-gray-800` to `--color-blue-950` at 30% opacity
- Automatically re-renders on window resize with DPR-aware scaling
- Skips drawing if CSS variables are unavailable (test environments)

**Usage Example**

```tsx
import { GridBackground } from '../components/surfaces/GridBackground';

<GridBackground />
<GridBackground gridSize={20} />
```

**Key CSS Classes**

This component uses inline styles only. No external CSS classes.

---

## Display

### Avatar

A user avatar component that displays an image, initials derived from a name, or a fallback icon. Automatically renders as a `<button>` when an `onClick` handler is provided, otherwise renders as a `<div>`.

**Props Interface**

```typescript
type AvatarBaseProps = {
  src?: string;                                        // image URL
  alt?: string;                                        // alt text for image
  name?: string;                                       // used to generate initials
  initials?: string;                                   // explicit initials (max 2 chars)
  icon?: Component;                                    // custom fallback icon (default: BsPerson)
  size?: 'compact' | 'normal' | 'spacious';            // default: 'normal'
  shape?: 'circle' | 'square';                         // default: 'circle'
  variant?: 'primary' | 'secondary' | 'subtle';        // default: 'secondary'
  class?: string;
};

// When onClick is provided, renders as <button> with these additional props:
type AvatarButtonProps = AvatarBaseProps &
  JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
    onClick: JSX.EventHandler<HTMLButtonElement, MouseEvent>;
    disabled?: boolean;
  };

// Otherwise renders as <div>:
type AvatarDivProps = AvatarBaseProps &
  Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onClick'>;

type AvatarProps = AvatarButtonProps | AvatarDivProps;
```

**Variants and States**

- **Content priority**: Image > Initials > Icon (fallback)
- **Sizes**: `compact` (32px), `normal` (40px), `spacious` (48px)
- **Shapes**: `circle` (default, full border radius) or `square` (standard border radius)
- **Variants**: `primary` (filled blue, white text), `secondary` (bordered, standard text), `subtle` (transparent)
- **Interactive**: When `onClick` is provided, renders as `<button>` with focus ring and hover/active states
- **Image error**: Falls back to initials or icon if image fails to load

**Usage Example**

```tsx
import { Avatar } from '../components/display/Avatar';

<Avatar src="/photo.jpg" alt="Jane Doe" />
<Avatar name="John Smith" variant="primary" />
<Avatar initials="AB" size="spacious" shape="square" />
<Avatar onClick={handleProfileClick} name="User" />
```

**Key CSS Classes**

| Class | Description |
|---|---|
| `.avatar` | Base class (40px circle) |
| `.avatar--compact`, `.avatar--spacious` | Size modifiers |
| `.avatar--square` | Square shape |
| `.avatar--primary`, `.avatar--secondary`, `.avatar--subtle` | Color variants |
| `.avatar--interactive` | Interactive (button) mode |
| `.avatar__image` | Image element |
| `.avatar__initials` | Initials text |
| `.avatar__icon` | Icon fallback |

---

### AvatarGroup

A container that displays multiple Avatar components in an overlapping row. When the number of avatars exceeds the `max` prop, remaining avatars are collapsed into a `+N` overflow avatar.

**Props Interface**

```typescript
interface AvatarGroupProps extends JSX.HTMLAttributes<HTMLDivElement> {
  children?: JSX.Element;                                     // Avatar components
  max?: number;                                               // max visible avatars before overflow
  size?: 'compact' | 'normal' | 'spacious';                   // default: 'normal'
  spacing?: 'tight' | 'normal' | 'loose';                     // default: 'normal'
  onOverflowClick?: () => void;                                // handler for the overflow avatar
}
```

**Variants and States**

- **Sizes**: `compact` (32px avatars), `normal` (40px), `spacious` (48px)
- **Spacing**: `tight` (more overlap), `normal`, `loose` (less overlap)
- **Overflow**: When `max` is set and children exceed it, a secondary avatar with `+N` initials appears
- Z-index stacking: Earlier avatars appear in front; hovered avatars come to front
- Each avatar gets a background-colored ring (`box-shadow`) for visual separation

**Usage Example**

```tsx
import { AvatarGroup } from '../components/display/AvatarGroup';
import { Avatar } from '../components/display/Avatar';

<AvatarGroup max={3} spacing="normal">
  <Avatar name="Alice" variant="primary" />
  <Avatar name="Bob" />
  <Avatar name="Charlie" />
  <Avatar name="Dave" />
  <Avatar name="Eve" />
</AvatarGroup>
{/* Displays: Alice, Bob, Charlie, +2 */}
```

**Key CSS Classes**

| Class | Description |
|---|---|
| `.avatar-group` | Base container |
| `.avatar-group--compact`, `.avatar-group--spacious` | Size modifiers |
| `.avatar-group--spacing-tight`, `.avatar-group--spacing-normal`, `.avatar-group--spacing-loose` | Spacing modifiers |
| `.avatar-group__item` | Wrapper for each avatar (handles overlap margin and z-index) |

---

### Badge

A notification badge that wraps any element and displays a count, dot, or icon indicator at a configurable corner position.

**Props Interface**

```typescript
interface BadgeProps {
  children: JSX.Element;                                                          // required - wrapped content
  content?: string | number;                                                      // badge text or count
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';    // default: 'error'
  placement?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';         // default: 'top-right'
  dot?: boolean;                                                                  // show as small dot instead of content
  icon?: Component;                                                               // show icon instead of content
  max?: number;                                                                   // default: 99 (shows "99+" when exceeded)
  showZero?: boolean;                                                             // default: false
  class?: string;
}
```

**Variants and States**

- **Color variants**: `primary` (blue), `success` (green), `warning` (yellow with black text), `error` (red), `info` (blue-600), `neutral` (gray)
- **Placement**: `top-right`, `top-left`, `bottom-right`, `bottom-left` (uses CSS `transform: translate()`)
- **Dot mode**: Shows a small 10px dot with no text
- **Icon mode**: Shows an 18px badge with an icon component
- **Max**: When content is a number exceeding `max`, displays as `{max}+` (e.g., "99+")
- **showZero**: By default, a numeric content of 0 hides the badge; set `showZero` to override
- Badge is `pointer-events: none` and will not intercept clicks

**Usage Example**

```tsx
import { Badge } from '../components/display/Badge';
import { Avatar } from '../components/display/Avatar';
import { BsCheck } from 'solid-icons/bs';

<Badge content={5} variant="error">
  <Avatar name="User" />
</Badge>

<Badge dot variant="success" placement="bottom-right">
  <Avatar name="Online" />
</Badge>

<Badge icon={BsCheck} variant="success">
  <Avatar name="Verified" />
</Badge>
```

**Key CSS Classes**

| Class | Description |
|---|---|
| `.badge__wrapper` | Outer positioning wrapper |
| `.badge` | Badge element |
| `.badge--primary`, `.badge--success`, `.badge--warning`, `.badge--error`, `.badge--info`, `.badge--neutral` | Color variants |
| `.badge--top-right`, `.badge--top-left`, `.badge--bottom-right`, `.badge--bottom-left` | Placement modifiers |
| `.badge--dot` | Dot mode (10px circle) |
| `.badge--icon` | Icon mode (18px circle) |

---

### Table

A data table component with multi-select, sortable columns, sticky header support, and multiple visual variants. Supports loading states with skeleton rows and empty states with custom messages.

**Props Interface**

```typescript
interface Column<T> {
  key: string;                                                    // unique column identifier
  header: string;                                                 // column header text
  cell: (row: T) => JSX.Element | string | number;              // cell renderer function
  width?: string;                                                 // CSS width value (e.g., "200px")
  align?: 'left' | 'center' | 'right';                           // text alignment (default: 'left')
  sortable?: boolean;                                            // allow sorting on this column (default: true when onSort provided)
}

interface TableProps<T> {
  columns: Column<T>[];                                          // required - column definitions
  data: T[];                                                     // required - data array
  getRowId: (row: T) => string;                                 // required - unique row ID extractor
  // Selection
  selectable?: boolean;                                          // show selection checkboxes
  selectedRows?: Set<string> | string[];                        // controlled selected row IDs
  onSelectionChange?: (selected: Set<string>) => void;          // selection change handler
  // Sorting
  sortKey?: string;                                              // current sort column key
  sortDirection?: 'asc' | 'desc';                               // current sort direction
  onSort?: (key: string, direction: 'asc' | 'desc') => void;   // sort change handler
  // Appearance
  variant?: 'default' | 'emphasized' | 'subtle';                // default: 'default'
  size?: 'compact' | 'normal' | 'spacious';                     // default: 'normal'
  stickyHeader?: boolean;                                        // sticky table header
  // States
  loading?: boolean;                                             // show skeleton loading rows
  emptyMessage?: string;                                         // empty state message (default: "No data available")
  // Other
  class?: string;                                                // additional CSS class
}
```

**Features**

- **Multi-select**: Checkbox column with select all/individual row selection
- **Sortable columns**: Click headers to toggle asc/desc sort with chevron indicators
- **Sticky header**: Optional sticky positioning for scrollable tables
- **Variants**: `default` (bordered), `emphasized` (primary gradient header), `subtle` (minimal borders)
- **Sizes**: `compact`, `normal`, `spacious` (matches Button/Card sizing)
- **Loading state**: Shows 5 animated skeleton rows while loading
- **Empty state**: Centered message when no data
- **Flexible columns**: Custom width, alignment, and cell rendering per column
- **Row selection styling**: Selected rows have blue background tint

**Usage Example**

```tsx
import { Table, type Column } from '../components/display/Table';
import { createSignal } from 'solid-js';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const users: User[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { id: '2', name: 'Bob', email: 'bob@example.com', role: 'User' },
];

const columns: Column<User>[] = [
  { key: 'name', header: 'Name', cell: (row) => row.name, width: '200px' },
  { key: 'email', header: 'Email', cell: (row) => row.email },
  { key: 'role', header: 'Role', cell: (row) => row.role, width: '120px', align: 'center' },
];

function UserTable() {
  const [selected, setSelected] = createSignal<Set<string>>(new Set());
  const [sortKey, setSortKey] = createSignal<string>();
  const [sortDir, setSortDir] = createSignal<'asc' | 'desc'>('asc');

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    setSortKey(key);
    setSortDir(direction);
  };

  return (
    <Table
      columns={columns}
      data={users}
      getRowId={(row) => row.id}
      selectable
      selectedRows={selected()}
      onSelectionChange={setSelected}
      sortKey={sortKey()}
      sortDirection={sortDir()}
      onSort={handleSort}
      stickyHeader
      variant="emphasized"
      size="normal"
    />
  );
}
```

**Key CSS Classes**

| Class | Description |
|---|---|
| `.table` | Outer wrapper with border and background |
| `.table__container` | Scrollable container |
| `.table__element` | `<table>` element |
| `.table__header` | `<thead>` element |
| `.table__header-cell` | Header cell |
| `.table__header-cell--sortable` | Sortable header (clickable with hover effect) |
| `.table__header-cell--sorted` | Currently sorted column |
| `.table__row` | Table row with hover effect |
| `.table__row--selected` | Selected row (blue background) |
| `.table__row--skeleton` | Loading skeleton row |
| `.table__cell` | Table cell |
| `.table--default`, `.table--emphasized`, `.table--subtle` | Variant modifiers |
| `.table--compact`, `.table--spacious` | Size modifiers |
| `.table--sticky-header` | Enables sticky header positioning |

**Important Notes**

- Selection state is controlled externally via `selectedRows` and `onSelectionChange`
- Sorting must be implemented by parent component (Table only handles UI)
- `stickyHeader` requires a fixed height container to scroll properly
- Column `sortable: false` explicitly disables sorting for that column
- Empty state spans all columns including checkbox column
- Loading skeleton shows 5 rows regardless of data length

---

### Tooltip

A hover/focus-triggered tooltip that renders its content via `Portal` for proper z-index stacking. Supports four placements with automatic flipping when there is insufficient viewport space.

**Props Interface**

```typescript
interface TooltipProps {
  content: JSX.Element;                                    // required - tooltip content
  children: JSX.Element;                                   // required - trigger element
  placement?: 'top' | 'bottom' | 'left' | 'right';        // default: 'top'
  size?: 'normal' | 'compact';                             // default: 'normal'
  disabled?: boolean;                                      // default: false
  class?: string;
}
```

**Variants and States**

- **Placement**: `top`, `bottom`, `left`, `right` with automatic flipping to the opposite side if there is not enough space
- **Sizes**: `normal` (14px font, 8px/12px padding) or `compact` (12px font, 6px/10px padding)
- **Timing**: 200ms show delay, 100ms hide delay, 150ms fade transition
- **Accessibility**: Uses `aria-describedby` and `role="tooltip"`
- **Trigger**: Responds to mouse enter/leave and focus/blur events
- Tooltip is clamped to viewport edges with 8px margin

**Usage Example**

```tsx
import { Tooltip } from '../components/display/Tooltip';
import { Button } from '../components/inputs/Button';

<Tooltip content="Save your changes" placement="bottom">
  <Button>Save</Button>
</Tooltip>

<Tooltip content="Detailed help text" size="compact">
  <span>Hover me</span>
</Tooltip>
```

**Key CSS Classes**

| Class | Description |
|---|---|
| `.tooltip__trigger` | Wrapper around children |
| `.tooltip` | Portal-rendered tooltip element |
| `.tooltip--visible` | Visible state (opacity 1) |
| `.tooltip--top`, `.tooltip--bottom`, `.tooltip--left`, `.tooltip--right` | Placement modifiers |
| `.tooltip--compact` | Compact size |

**Testing Notes**

The tooltip content is rendered via `Portal`. Query `document` directly to find `.tooltip` elements. The tooltip has a 200ms show delay, so tests may need to wait before asserting visibility.

---

## Feedback

### Dialog

A modal dialog rendered via `Portal` with a backdrop overlay, escape key dismissal, and body scroll locking. Uses `Card` (emphasized variant) internally for the dialog panel. Also exports `DialogHeader` and `DialogFooter` sub-components.

**Props Interface**

```typescript
interface DialogProps {
  open: boolean;                         // required - controls visibility
  onClose: () => void;                   // required - close callback
  size?: 'small' | 'medium' | 'large' | 'fullscreen';  // default: 'medium'
  dismissOnBackdrop?: boolean;           // default: true
  dismissOnEscape?: boolean;             // default: true
  children?: JSX.Element;
  class?: string;
}

interface DialogHeaderProps {
  title: string;         // required
  subtitle?: string;
  onClose?: () => void;  // close button handler
  showClose?: boolean;   // default: true
}

interface DialogFooterProps {
  children?: JSX.Element;
  align?: 'left' | 'center' | 'right';  // default: 'right'
}
```

**Variants and States**

- **Sizes**: `small` (max-width 400px), `medium` (600px), `large` (800px), `fullscreen` (fills viewport minus padding)
- **Backdrop**: Blurred semi-transparent overlay; clicks close the dialog by default (`dismissOnBackdrop`)
- **Escape**: Pressing Escape closes the dialog by default (`dismissOnEscape`)
- **Animations**: Backdrop fades in; dialog scales in from 95%
- **Body scroll**: Locked when dialog is open; restored on close/unmount
- **DialogHeader**: Shows title, optional subtitle, and optional close button (X icon)
- **DialogFooter**: Footer with configurable alignment (`left`, `center`, `right`)

**Usage Example**

```tsx
import { Dialog, DialogHeader, DialogFooter } from '../components/feedback/Dialog';
import { Button } from '../components/inputs/Button';

<Dialog open={isOpen()} onClose={() => setIsOpen(false)} size="medium">
  <DialogHeader
    title="Confirm Action"
    subtitle="This cannot be undone"
    onClose={() => setIsOpen(false)}
  />
  <p>Are you sure you want to proceed?</p>
  <DialogFooter>
    <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button variant="danger" onClick={handleConfirm}>Delete</Button>
  </DialogFooter>
</Dialog>
```

**Key CSS Classes**

| Class | Description |
|---|---|
| `.dialog__backdrop` | Fixed overlay with blur |
| `.dialog` | Dialog container |
| `.dialog--small`, `.dialog--large`, `.dialog--fullscreen` | Size modifiers |
| `.dialog__header` | Header with title and close button |
| `.dialog__title` | Title text |
| `.dialog__subtitle` | Subtitle text |
| `.dialog__close` | Close button (X) |
| `.dialog__footer` | Footer container |
| `.dialog__footer--left`, `.dialog__footer--center` | Footer alignment modifiers |

**Testing Notes**

The entire dialog (backdrop + content) is rendered via `Portal`. Query `document` directly. The dialog sets `aria-modal="true"` and `role="dialog"` on the dialog element.

---

### Notification

A toast notification system with a context provider pattern. Provides `NotificationProvider` (wraps the app), `useNotification` hook (returns `notify`, `dismiss`, `dismissAll`), and internally rendered notification items via `Portal`.

**Props Interface**

```typescript
type NotificationVariant = 'success' | 'error' | 'warning' | 'info';
type NotificationPosition = 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';

interface NotificationAction {
  label: string;
  onClick: () => void;
}

interface NotificationOptions {
  id?: string;                                 // custom ID; auto-generated if omitted
  variant?: NotificationVariant;               // default: 'info'
  title: string;                               // required
  message?: string;                            // optional body text
  duration?: number | null;                    // default: 5000 (ms). null = persistent
  position?: NotificationPosition;             // default: 'top-right'
  actions?: NotificationAction[];              // optional action buttons
  onClose?: () => void;                        // callback when dismissed
}

// Provider component
NotificationProvider: Component<{ children: JSX.Element }>

// Hook return type
interface NotificationContextType {
  notify: (options: NotificationOptions) => string;   // returns notification ID
  dismiss: (id: string) => void;
  dismissAll: () => void;
}
```

**Variants and States**

- **Variants**: `success` (green accent, check icon), `error` (red accent, X icon), `warning` (yellow accent, triangle icon), `info` (blue accent, info icon)
- **Positions**: `top-right`, `top-center`, `bottom-right`, `bottom-center` (each has its own container)
- **Duration**: Auto-dismisses after duration; set to `null` for persistent notifications
- **Actions**: Optional action buttons rendered as compact subtle Buttons
- **Animations**: Slide-in from right (right positions), fade-in from top/bottom (center positions); reverse on dismiss
- Each notification uses a `Card` (emphasized variant) internally with a colored left accent border

**Usage Example**

```tsx
import { NotificationProvider, useNotification } from '../components/feedback/Notification';

// Wrap app in provider
<NotificationProvider>
  <App />
</NotificationProvider>

// Inside a component
const { notify, dismiss } = useNotification();

notify({
  variant: 'success',
  title: 'File saved',
  message: 'Your changes have been saved successfully.',
  duration: 3000,
  position: 'top-right',
});

notify({
  variant: 'error',
  title: 'Upload failed',
  message: 'Could not upload the file.',
  duration: null,  // persistent
  actions: [
    { label: 'Retry', onClick: () => retryUpload() },
  ],
});
```

**Key CSS Classes**

| Class | Description |
|---|---|
| `.notification-container` | Fixed position container |
| `.notification-container--top-right`, `--top-center`, `--bottom-right`, `--bottom-center` | Position modifiers |
| `.notification` | Individual notification item |
| `.notification--success`, `--error`, `--warning`, `--info` | Variant modifiers (set accent border color and icon color) |
| `.notification--dismissing` | Dismiss animation state |
| `.notification__wrapper` | Internal flex layout |
| `.notification__icon` | Variant icon |
| `.notification__content` | Title + message container |
| `.notification__title` | Title text |
| `.notification__message` | Message text |
| `.notification__actions` | Action buttons container |
| `.notification__close` | Close button (X) |

**Testing Notes**

All notification containers are rendered via `Portal`. Query `document` directly. The hook `useNotification` must be called within a `NotificationProvider`. Notifications have a 300ms slide-in/out animation.

---

## Navigation

### Menu

A dropdown or context menu that renders via Portal with auto-positioning and viewport edge detection. Supports click and right-click triggers, nested submenus with hover, and is designed as a flexible surface (like Card) where any content can be rendered.

**Props Interface**

```typescript
interface MenuProps {
  trigger: JSX.Element;                // Element that opens the menu
  children: JSX.Element;                // Menu content (MenuItem, MenuSeparator, or custom)
  openOn?: 'click' | 'contextmenu' | 'both';  // default: 'both'
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'right-start' | 'left-start';  // default: 'bottom-start'
  autoFlip?: boolean;                   // default: true
  anchored?: boolean;                   // default: true (follows trigger on scroll/resize)
  open?: boolean;                       // controlled state
  onOpenChange?: (open: boolean) => void;
  variant?: 'default' | 'emphasized' | 'subtle';  // default: 'default'
  size?: 'compact' | 'normal' | 'spacious';  // default: 'normal'
  class?: string;
}

interface MenuItemProps {
  children: JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
  submenu?: () => JSX.Element;          // Function that returns nested submenu content
  class?: string;
}
```

**Variants and States**

- **Trigger modes**: `click` (left-click only), `contextmenu` (right-click only), `both` (either click)
- **Placement**: Initial menu position relative to trigger (`bottom-start`, `bottom-end`, `top-start`, `top-end`, `right-start`, `left-start`). Includes 4px gap between trigger and menu.
- **Auto-flip**: Automatically repositions menu when it would overflow viewport edges
- **Anchored**: When `true` (default), menu follows trigger element on scroll and resize. When `false`, menu stays fixed in viewport position.
- **Variants**: `default` (standard border/background), `emphasized` (elevated background, emphasis border), `subtle` (no border, lighter shadow)
- **Sizes**: `compact` (smaller padding/font), `normal`, `spacious` (larger padding/font)
- **Controlled vs Uncontrolled**: Provide `open` + `onOpenChange` for controlled state; otherwise menu manages its own open/closed state
- **Nested submenus**: MenuItem accepts `submenu` prop as a function that returns JSX; submenu appears on hover and auto-positions to right or left of parent with 4px gap. Using a function ensures proper reactive ownership and disposal.
- **Dismissal**: Closes on click outside, Escape key, or when MenuItem without submenu is clicked
- **Portal rendering**: Menu renders to document.body via Portal for correct z-index stacking

**Usage Example**

```tsx
import { Menu, MenuItem, MenuSeparator } from '../components/navigation/Menu';
import { Button } from '../components/inputs/Button';
import { BsGear, BsTrash } from 'solid-icons/bs';

{/* Basic menu with click trigger */}
<Menu trigger={<Button>Actions</Button>} openOn="click">
  <MenuItem onClick={handleEdit}>
    <BsGear /> Edit
  </MenuItem>
  <MenuSeparator />
  <MenuItem onClick={handleDelete} disabled>
    <BsTrash /> Delete
  </MenuItem>
</Menu>

{/* Context menu (right-click) */}
<Menu
  trigger={<div>Right-click me</div>}
  openOn="contextmenu"
  placement="bottom-end"
>
  <MenuItem>Cut</MenuItem>
  <MenuItem>Copy</MenuItem>
  <MenuItem>Paste</MenuItem>
</Menu>

{/* Nested submenus - submenu prop accepts a function */}
<Menu trigger={<Button>File</Button>}>
  <MenuItem>New</MenuItem>
  <MenuItem
    submenu={() => (
      <>
        <MenuItem>Project 1</MenuItem>
        <MenuItem>Project 2</MenuItem>
      </>
    )}
  >
    Open Recent
  </MenuItem>
  <MenuItem
    submenu={() => (
      <>
        <MenuItem>JSON</MenuItem>
        <MenuItem>CSV</MenuItem>
        <MenuItem
          submenu={() => (
            <>
              <MenuItem>A4</MenuItem>
              <MenuItem>Letter</MenuItem>
            </>
          )}
        >
          PDF
        </MenuItem>
      </>
    )}
  >
    Export
  </MenuItem>
</Menu>

{/* Custom content (not using MenuItem) */}
<Menu trigger={<Button>Custom</Button>}>
  <div style={{ padding: 'var(--g-spacing)' }}>
    <h4>Menu Title</h4>
    <p>You can put any content here.</p>
    <MenuSeparator />
    <MenuItem>Still works</MenuItem>
  </div>
</Menu>

{/* Controlled state */}
<Menu
  trigger={<Button>Controlled</Button>}
  open={menuOpen()}
  onOpenChange={setMenuOpen}
>
  <MenuItem>Item</MenuItem>
</Menu>

{/* Unanchored menu (stays fixed on scroll) */}
<Menu
  trigger={<Button>Fixed Menu</Button>}
  anchored={false}
>
  <MenuItem>Stays in place</MenuItem>
  <MenuItem>when you scroll</MenuItem>
</Menu>
```

**Key CSS Classes**

| Class | Description |
|---|---|
| `.menu` | Base menu surface (Portal-rendered) |
| `.menu--default`, `.menu--emphasized`, `.menu--subtle` | Variant modifiers |
| `.menu--compact`, `.menu--spacious` | Size modifiers |
| `.menu--bottom-start`, `.menu--bottom-end`, etc. | Placement modifiers |
| `.menu--submenu` | Nested submenu modifier (slide-in animation) |
| `.menu__trigger` | Wrapper for trigger element |
| `.menu__item` | Menu item button |
| `.menu__item--disabled` | Disabled menu item |
| `.menu__item--has-submenu` | Item with nested submenu |
| `.menu__item-chevron` | Chevron icon for submenu indicator |
| `.menu__separator` | Horizontal separator line |

**Design Notes**

- Menu is intentionally designed as a flexible surface (similar to Card) where you can render any content, not just MenuItem components
- MenuItem and MenuSeparator are convenience helpers but are entirely optional
- Position calculation runs on menu open and updates when window resizes
- Submenus use the same positioning logic as the main menu
- Click outside detection excludes both menu and trigger elements

---

### Pane

A collapsible panel that attaches to any edge of its container (or the viewport). Supports three states (closed/partial/open), permanent and temporary modes, push and overlay layout behaviors, and both controlled and uncontrolled usage.

**Props Interface**

```typescript
type PaneState = 'closed' | 'partial' | 'open';
type PanePosition = 'left' | 'right' | 'top' | 'bottom';

interface PaneProps extends JSX.HTMLAttributes<HTMLDivElement> {
  position?: PanePosition;                 // default: 'left'
  mode?: 'permanent' | 'temporary';        // default: 'permanent'
  behavior?: 'push' | 'overlay';           // default: 'push' for permanent, 'overlay' for temporary
  state?: PaneState;                       // controlled state
  onStateChange?: (state: PaneState) => void;
  defaultState?: PaneState;                // default: 'closed' (uncontrolled mode)
  handle?: boolean;                        // default: true for permanent, false for temporary
  backdrop?: boolean;                      // default: true (overlay mode only)
  fixed?: boolean;                         // default: false (use fixed positioning instead of absolute)
  openSize?: string;                       // default: '280px' for left/right, '240px' for top/bottom
  partialSize?: string;                    // default: '56px'
  size?: 'compact' | 'normal' | 'spacious'; // default: 'normal' (affects handle size)
  children?: JSX.Element;                  // content for open state
  partialChildren?: JSX.Element;           // content for partial state (skipped if not provided)
  class?: string;
}
```

**Variants and States**

- **Positions**: `left`, `right`, `top`, `bottom` -- determines which edge the pane attaches to
- **States**: `closed` (collapsed, 0 size), `partial` (shows `partialChildren` at `partialSize`, or clips `children` to `partialSize` if `partialChildren` is not provided), `open` (shows `children` at `openSize`)
- **Modes**: `permanent` (always shows a handle, defaults to push behavior) or `temporary` (can be fully hidden, defaults to overlay behavior, closes on Escape)
- **Behaviors**: `push` (displaces adjacent content) or `overlay` (slides over content with optional backdrop)
- **Handle**: A clickable bar that cycles through states: closed -> partial -> open -> closed (skips partial if neither `partialChildren` nor `partialSize` is provided)
- **Controlled vs Uncontrolled**: Provide `state` + `onStateChange` for controlled; use `defaultState` for uncontrolled
- **Backdrop**: Semi-transparent overlay shown when overlay pane is not closed; clicking it closes the pane
- **Fixed**: When `true` with overlay behavior, uses `position: fixed` instead of `position: absolute`
- **Size**: Affects handle dimensions -- `compact` (20px), `normal` (24px), `spacious` (32px)
- Content layers use absolute positioning and opacity-based cross-fade transitions

**Usage Example**

```tsx
import { Pane } from '../components/navigation/Pane';

{/* Uncontrolled permanent pane */}
<Pane position="left" defaultState="open">
  <nav>Navigation content</nav>
</Pane>

{/* Controlled with partial state */}
<Pane
  position="left"
  state={paneState()}
  onStateChange={setPaneState}
  openSize="300px"
  partialSize="64px"
  partialChildren={<IconNav />}
>
  <FullNav />
</Pane>

{/* Temporary overlay drawer */}
<Pane
  position="right"
  mode="temporary"
  state={drawerOpen() ? 'open' : 'closed'}
  onStateChange={(s) => setDrawerOpen(s === 'open')}
  fixed
>
  <DrawerContent />
</Pane>
```

**Key CSS Classes**

| Class | Description |
|---|---|
| `.pane` | Base container |
| `.pane--left`, `.pane--right`, `.pane--top`, `.pane--bottom` | Position modifiers |
| `.pane--closed`, `.pane--partial`, `.pane--open` | State modifiers |
| `.pane--permanent`, `.pane--temporary` | Mode modifiers |
| `.pane--overlay` | Overlay behavior (absolute positioning) |
| `.pane--fixed` | Fixed viewport positioning |
| `.pane--compact`, `.pane--spacious` | Handle size modifiers |
| `.pane__body` | Content area (transitions width/height) |
| `.pane__content` | Content layer (absolute, opacity transitions) |
| `.pane__content--full` | Open state content |
| `.pane__content--partial` | Partial state content |
| `.pane__content--active` | Currently visible content layer |
| `.pane__handle` | Toggle handle bar |
| `.pane__handle-icon` | Chevron icon inside handle |
| `.pane__handle-icon--rotated` | Rotated icon (open state) |
| `.pane__backdrop` | Overlay backdrop |
| `.pane__backdrop--visible` | Visible backdrop |
| `.pane__backdrop--fixed` | Fixed position backdrop |

**Testing Notes**

- Pane content uses `width: 100%; height: 100%; box-sizing: border-box` so content always matches the body size during transitions
- When `partialSize` is set without `partialChildren`, the full content layer is active in both open and partial states — the body's `overflow: hidden` clips to the partial size
- Sidebar tabs in partial Pane mode may be overlapped by adjacent elements. Use `page.evaluate()` to click tabs directly via DOM in E2E tests

---

### Tabs

A tab bar component for switching between content sections. Uses an options array API (not children). Supports controlled and uncontrolled usage, keyboard navigation, icon-only mode, and three visual variants.

**Props Interface**

```typescript
interface TabOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: Component;
}

interface TabsProps {
  options: TabOption[];
  value?: string;                                    // controlled value
  onChange?: (value: string) => void;
  defaultValue?: string;                             // uncontrolled default
  variant?: 'primary' | 'secondary' | 'subtle';     // default: 'primary'
  orientation?: 'horizontal' | 'vertical';           // default: 'horizontal'
  size?: 'compact' | 'normal' | 'spacious';          // default: 'normal'
  iconOnly?: boolean;                                // default: false
  disabled?: boolean;                                // default: false
  class?: string;
}
```

**Variants and States**

- **Variants**: `primary` (active tab uses button-primary gradient), `secondary` (active tab has border + background), `subtle` (active tab has persistent tint)
- **Orientation**: `horizontal` (row layout) or `vertical` (column layout)
- **Sizes**: `compact` (smaller padding/font), `normal`, `spacious` (larger padding/font)
- **Icon-only**: Renders only icons, hides labels, uses `aria-label` for accessibility
- **Labels-hidden mode**: Apply `tabs--labels-hidden` CSS class to hide labels while preserving icon position (used in collapsed Pane sidebar)
- **Keyboard navigation**: Arrow keys cycle through enabled tabs (wrapping), Home/End jump to first/last
- **Controlled vs Uncontrolled**: Provide `value` + `onChange` for controlled; use `defaultValue` for uncontrolled

**Usage Example**

```tsx
import { Tabs } from '../components/navigation/Tabs';
import { BsType, BsCursor } from 'solid-icons/bs';

{/* Basic horizontal tabs */}
<Tabs
  options={[
    { value: 'tab1', label: 'Tab 1' },
    { value: 'tab2', label: 'Tab 2' },
  ]}
  value={activeTab()}
  onChange={setActiveTab}
/>

{/* Vertical tabs with icons in a sidebar */}
<Tabs
  orientation="vertical"
  variant="subtle"
  options={[
    { value: 'typography', label: 'Typography', icon: BsType },
    { value: 'button', label: 'Button', icon: BsCursor },
  ]}
  value={activeDemo()}
  onChange={(v) => navigate(`/${v}`)}
  class={collapsed() ? 'tabs--labels-hidden' : ''}
/>
```

**Key CSS Classes**

| Class | Description |
|---|---|
| `.tabs` | Base container (flexbox row) |
| `.tabs--primary`, `.tabs--secondary`, `.tabs--subtle` | Variant modifiers |
| `.tabs--vertical` | Column layout |
| `.tabs--compact`, `.tabs--spacious` | Size modifiers |
| `.tabs--icon-only` | Icon-only mode (square padding) |
| `.tabs--labels-hidden` | Hides labels, preserves icon position |
| `.tabs--disabled` | Disabled state |
| `.tabs__tab` | Individual tab button |
| `.tabs__tab--active` | Active/selected tab |
| `.tabs__tab-icon` | Icon wrapper span |
| `.tabs__tab-label` | Label text span |

---

# Part 2: Design System

Reference for the Midnight Theme design tokens, color scales, and styling patterns. All values are extracted directly from `src/styles/global.css`.

---

## Color Scales

### Base Colors

| Token | Hex |
|---|---|
| `--color-black` | `#000000` |
| `--color-white` | `#ffffff` |

### Gray Scale

| Token | Hex |
|---|---|
| `--color-gray-900` | `#0a0a0a` |
| `--color-gray-800` | `#1a1a1a` |
| `--color-gray-700` | `#2a2a2a` |
| `--color-gray-600` | `#3a3a3a` |
| `--color-gray-500` | `#4a4a4a` |
| `--color-gray-400` | `#6a6a6a` |
| `--color-gray-300` | `#8a8a8a` |
| `--color-gray-200` | `#aaaaaa` |
| `--color-gray-100` | `#cccccc` |

### Blue Scale (Midnight Theme)

| Token | Hex | Description |
|---|---|---|
| `--color-blue-950` | `#001433` | Very dark blue |
| `--color-blue-900` | `#002047` | Dark blue |
| `--color-blue-800` | `#003366` | Muted blue |
| `--color-blue-700` | `#004d99` | Medium blue |
| `--color-blue-600` | `#0066cc` | Standard blue |
| `--color-blue-500` | `#0080ff` | Bright blue |
| `--color-blue-400` | `#3399ff` | Light blue |
| `--color-blue-300` | `#66b3ff` | Lighter blue |

### Red Scale

| Token | Hex | Description |
|---|---|---|
| `--color-red-900` | `#4a0000` | Very dark red |
| `--color-red-800` | `#660000` | Dark red |
| `--color-red-700` | `#8b0000` | Deep red |
| `--color-red-600` | `#b30000` | Standard red |
| `--color-red-500` | `#dc2626` | Bright red |
| `--color-red-400` | `#ef4444` | Light red |
| `--color-red-300` | `#f87171` | Lighter red |

### Green Scale

| Token | Hex | Description |
|---|---|---|
| `--color-green-900` | `#003300` | Very dark green |
| `--color-green-800` | `#004d00` | Dark green |
| `--color-green-700` | `#006600` | Deep green |
| `--color-green-600` | `#008000` | Standard green |
| `--color-green-500` | `#10b981` | Bright green |
| `--color-green-400` | `#34d399` | Light green |
| `--color-green-300` | `#6ee7b7` | Lighter green |

### Yellow/Orange Scale

| Token | Hex | Description |
|---|---|---|
| `--color-yellow-900` | `#4d3300` | Very dark yellow |
| `--color-yellow-800` | `#664400` | Dark yellow |
| `--color-yellow-700` | `#805500` | Deep yellow |
| `--color-yellow-600` | `#996600` | Standard yellow |
| `--color-yellow-500` | `#f59e0b` | Bright yellow/orange |
| `--color-yellow-400` | `#fbbf24` | Light yellow |
| `--color-yellow-300` | `#fcd34d` | Lighter yellow |

---

## Semantic Color Mappings

These alias tokens map to the raw color scales above:

| Token | Value | Resolved Hex | Purpose |
|---|---|---|---|
| `--color-primary` | `var(--color-blue-600)` | `#0066cc` | Main interaction color |
| `--color-secondary` | `var(--color-blue-800)` | `#003366` | Secondary elements |
| `--color-tertiary` | `var(--color-gray-600)` | `#3a3a3a` | Tertiary elements |
| `--color-accent` | `var(--color-blue-500)` | `#0080ff` | Highlight/accent color |
| `--color-muted` | `var(--color-gray-400)` | `#6a6a6a` | Muted text/elements |
| `--color-danger` | `var(--color-red-600)` | `#b30000` | Danger/destructive actions |
| `--color-success` | `var(--color-green-500)` | `#10b981` | Success/positive actions |
| `--color-warning` | `var(--color-yellow-500)` | `#f59e0b` | Warning/caution actions |

---

## Spacing Scale

Based on a 4px base unit:

| Token | Value |
|---|---|
| `--spacing-1` | `4px` |
| `--spacing-2` | `8px` |
| `--spacing-3` | `12px` |
| `--spacing-4` | `16px` |
| `--spacing-5` | `20px` |
| `--spacing-6` | `24px` |
| `--spacing-8` | `32px` |
| `--spacing-10` | `40px` |
| `--spacing-12` | `48px` |
| `--spacing-16` | `64px` |

---

## Typography

### Font Sizes

| Token | Value |
|---|---|
| `--font-size-xs` | `12px` |
| `--font-size-sm` | `14px` |
| `--font-size-base` | `16px` |
| `--font-size-lg` | `18px` |
| `--font-size-xl` | `20px` |
| `--font-size-2xl` | `24px` |
| `--font-size-3xl` | `30px` |
| `--font-size-4xl` | `36px` |
| `--font-size-5xl` | `48px` |
| `--font-size-6xl` | `60px` |

### Line Heights

| Token | Value |
|---|---|
| `--line-height-tight` | `1.25` |
| `--line-height-snug` | `1.375` |
| `--line-height-normal` | `1.5` |
| `--line-height-relaxed` | `1.625` |
| `--line-height-loose` | `2` |

### Font Weights

| Token | Value |
|---|---|
| `--font-weight-normal` | `400` |
| `--font-weight-medium` | `500` |
| `--font-weight-semibold` | `600` |
| `--font-weight-bold` | `700` |

### Letter Spacing

| Token | Value |
|---|---|
| `--letter-spacing-tight` | `-0.025em` |
| `--letter-spacing-normal` | `0` |
| `--letter-spacing-wide` | `0.025em` |

### Font Stack

```
-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif
```

Monospace (code blocks):
```
'Courier New', Courier, monospace
```

### Heading Defaults

All headings (`h1`-`h6`) share:
- **Weight**: `var(--font-weight-semibold)` (600)
- **Line height**: `var(--line-height-tight)` (1.25)
- **Letter spacing**: `var(--letter-spacing-tight)` (-0.025em)
- **Color**: `var(--g-text-primary)` (white)
- **Margin**: `0 0 var(--g-spacing) 0` (0 0 16px 0)

Individual heading sizes:

| Element | Token | Resolved Size | Extra |
|---|---|---|---|
| `h1` | `--font-size-5xl` | `48px` | `font-weight: bold (700)` |
| `h2` | `--font-size-4xl` | `36px` | |
| `h3` | `--font-size-3xl` | `30px` | |
| `h4` | `--font-size-2xl` | `24px` | |
| `h5` | `--font-size-xl` | `20px` | |
| `h6` | `--font-size-lg` | `18px` | |

---

## Border System

### Border Radii

| Token | Value |
|---|---|
| `--radius-none` | `0` |
| `--radius-sm` | `2px` |
| `--radius-md` | `4px` |
| `--radius-lg` | `8px` |
| `--radius-xl` | `12px` |
| `--radius-full` | `9999px` |

### Border Widths

| Token | Value |
|---|---|
| `--border-width-thin` | `1px` |
| `--border-width-medium` | `2px` |
| `--border-width-thick` | `3px` |

---

## Transitions

| Token | Value |
|---|---|
| `--transition-fast` | `0.1s ease` |
| `--transition-normal` | `0.2s ease` |
| `--transition-slow` | `0.3s ease` |

---

## Global Application Defaults (--g-* tokens)

These are the tokens used throughout all components. Changing them adjusts the overall look and feel.

### Spacing Defaults

| Token | Value | Resolved |
|---|---|---|
| `--g-spacing` | `var(--spacing-4)` | `16px` |
| `--g-spacing-sm` | `var(--spacing-2)` | `8px` |
| `--g-spacing-lg` | `var(--spacing-6)` | `24px` |
| `--g-spacing-xs` | `var(--spacing-1)` | `4px` |

### Border Defaults

| Token | Value | Resolved |
|---|---|---|
| `--g-radius` | `var(--radius-md)` | `4px` |
| `--g-border-width` | `var(--border-width-thin)` | `1px` |
| `--g-border-width-accent` | `var(--border-width-thick)` | `3px` |
| `--g-border-color` | `var(--color-gray-700)` | `#2a2a2a` |
| `--g-border-color-subtle` | `var(--color-gray-800)` | `#1a1a1a` |
| `--g-border-color-emphasis` | `var(--color-primary)` | `#0066cc` |

### Transition Default

| Token | Value | Resolved |
|---|---|---|
| `--g-transition` | `var(--transition-normal)` | `0.2s ease` |

### Background Defaults

| Token | Value | Description |
|---|---|---|
| `--g-background` | `linear-gradient(205deg, var(--color-gray-900), var(--color-gray-800))` | Standard background (`#0a0a0a` to `#1a1a1a`) |
| `--g-background-elevated` | `linear-gradient(205deg, var(--color-gray-800), var(--color-gray-700))` | Elevated surfaces (`#1a1a1a` to `#2a2a2a`) |
| `--g-background-subtle` | `var(--color-black)` | Subtle/base background (`#000000`) |

### Text Defaults

| Token | Value | Resolved |
|---|---|---|
| `--g-text-primary` | `var(--color-white)` | `#ffffff` |
| `--g-text-secondary` | `var(--color-gray-100)` | `#cccccc` |
| `--g-text-muted` | `var(--color-muted)` | `#6a6a6a` |
| `--g-text-link` | `var(--color-primary)` | `#0066cc` |

### Typography Defaults

| Token | Value | Resolved |
|---|---|---|
| `--g-font-size` | `var(--font-size-base)` | `16px` |
| `--g-line-height` | `var(--line-height-normal)` | `1.5` |
| `--g-font-weight` | `var(--font-weight-normal)` | `400` |

### Button Gradient Defaults

| Token | Value |
|---|---|
| `--g-button-primary` | `linear-gradient(205deg, var(--color-blue-600), var(--color-blue-700))` -- `#0066cc` to `#004d99` |
| `--g-button-danger` | `linear-gradient(205deg, var(--color-red-600), var(--color-red-700))` -- `#b30000` to `#8b0000` |

---

## Utility Classes

### Text Size

| Class | Effect |
|---|---|
| `.text-xs` | `font-size: 12px` |
| `.text-sm` | `font-size: 14px` |
| `.text-base` | `font-size: 16px` |
| `.text-lg` | `font-size: 18px` |
| `.text-xl` | `font-size: 20px` |
| `.text-2xl` | `font-size: 24px` |
| `.text-3xl` | `font-size: 30px` |
| `.text-4xl` | `font-size: 36px` |
| `.text-5xl` | `font-size: 48px` |
| `.text-6xl` | `font-size: 60px` |

### Text Color

| Class | Resolved Color |
|---|---|
| `.text-white` | `#ffffff` |
| `.text-gray-100` | `#cccccc` |
| `.text-gray-200` | `#aaaaaa` |
| `.text-gray-300` | `#8a8a8a` |
| `.text-muted` | `#6a6a6a` |
| `.text-primary` | `#0066cc` |
| `.text-secondary` | `#003366` |
| `.text-accent` | `#0080ff` |

### Font Weight

| Class | Weight |
|---|---|
| `.font-normal` | `400` |
| `.font-medium` | `500` |
| `.font-semibold` | `600` |
| `.font-bold` | `700` |

### Text Alignment

| Class | Alignment |
|---|---|
| `.text-center` | `center` |
| `.text-left` | `left` |
| `.text-right` | `right` |

### Container

| Class | `max-width` | `padding` |
|---|---|---|
| `.container` | `800px` | `24px` (--g-spacing-lg) |
| `.container--wide` | `1200px` | inherits |
| `.container--narrow` | `600px` | inherits |

### Grid Layout

| Class | `gap` |
|---|---|
| `.grid` | `24px` (--g-spacing-lg) |
| `.grid--sm` | `8px` (--g-spacing-sm) |
| `.grid--md` | `16px` (--g-spacing) |

### Flex Layout

| Class | Behavior |
|---|---|
| `.flex` | `display: flex; align-items: center; gap: 16px` |
| `.flex--sm` | `display: flex; align-items: center; gap: 8px` |
| `.flex--wrap` | `flex-wrap: wrap` |

---

## Styling Patterns

### Hover Effect (::before Pseudo-Element Overlay)

All interactive components use a `::before` pseudo-element for hover overlays. This approach keeps the hover effect independent of background gradients and child content.

```css
.component {
  position: relative;
  overflow: hidden;
}

.component::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0);
  transition: background var(--g-transition);
  pointer-events: none;
  border-radius: inherit;
}

/* Hover: lighten */
.component:hover:not(:disabled)::before {
  background: rgba(255, 255, 255, 0.05);  /* subtle variant */
  /* or */
  background: rgba(255, 255, 255, 0.1);   /* primary/danger variant */
}

/* Active: darken */
.component:active:not(:disabled)::before {
  background: rgba(0, 0, 0, 0.05);  /* subtle variant */
  /* or */
  background: rgba(0, 0, 0, 0.1);   /* primary/danger variant */
}
```

The hover intensity depends on the component variant:
- **Primary / Danger** buttons: `rgba(255, 255, 255, 0.1)` hover, `rgba(0, 0, 0, 0.1)` active
- **Secondary / Subtle** buttons, **Cards**, **Dialogs**: `rgba(255, 255, 255, 0.05)` hover, `rgba(0, 0, 0, 0.05)` active

When the parent uses `overflow: hidden`, the `::before` inherits `border-radius` and clips naturally. Components that render children on top of the overlay set `z-index: 0` on the `::before` and `z-index: 1` on direct children (see Card.css).

### Focus States

All focusable elements use a consistent focus-visible ring:

```css
.component:focus-visible {
  outline: 2px solid var(--color-primary);  /* #0066cc */
  outline-offset: 2px;
}
```

The focus ring typically uses `var(--color-primary)`, though some components (Slider, RadioGroup, Combobox) use `var(--color-accent)`. It is always `2px` wide and offset `2px` from the element boundary. The `:focus-visible` pseudo-class ensures the ring only appears for keyboard navigation, not mouse clicks.

### Disabled States

```css
.component:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
```

All disabled states reduce opacity to `0.5` and set `cursor: not-allowed`. Hover/active effects are guarded with `:not(:disabled)` to prevent interaction feedback on disabled elements.

### BEM Naming Convention

The project follows BEM (Block Element Modifier) naming:

```
.block                    -- Component root (e.g., .button, .card, .dialog)
.block__element           -- Sub-part (e.g., .button__icon, .card__header, .dialog__footer)
.block--modifier          -- Variant/state (e.g., .button--primary, .card--compact, .dialog--large)
.block__element--modifier -- Combined (e.g., .dialog__footer--left)
```

Examples from the codebase:

| Block | Elements | Modifiers |
|---|---|---|
| `.button` | `__icon` | `--primary`, `--secondary`, `--subtle`, `--danger`, `--compact`, `--spacious`, `--icon-only`, `--loading` |
| `.card` | `__header` | `--default`, `--emphasized`, `--subtle`, `--interactive`, `--compact`, `--spacious`, `--accent-left`, `--primary`, `--secondary`, `--accent` |
| `.dialog` | `__backdrop`, `__header`, `__header-content`, `__title`, `__subtitle`, `__close`, `__footer` | `--small`, `--medium`, `--large`, `--fullscreen`, `--left`, `--center`, `--right` |

---

## Scrollbar Styling

Custom scrollbar styling is applied globally:

- **Width/Height**: 8px
- **Track**: transparent
- **Thumb**: `var(--g-border-color)` (gray-700, `#2a2a2a`)
- **Thumb hover**: `var(--g-border-color-emphasis)` (primary, `#0066cc`)
- **Firefox**: `scrollbar-width: thin`

---

## Base Reset

The global stylesheet applies a minimal reset:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

`html` and `body` are set to `width: 100%; height: 100%; overflow: hidden` with `var(--g-background-subtle)` (`#000000`) as the root background. Font smoothing is enabled with `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale`.

---

# Part 3: Architecture

Technical architecture reference for the SolidJS component library. Covers the reactivity model, file organization, build pipeline, testing, Docker, and CI/CD.

---

## SolidJS Reactivity Model

SolidJS uses **fine-grained reactivity** rather than a virtual DOM. Instead of re-rendering entire component trees when state changes, SolidJS tracks which specific DOM nodes depend on which signals and updates only those nodes directly.

Key implications for this codebase:

- **Components run once**. A SolidJS component function executes a single time to set up the DOM. It does not re-execute on state changes. This means code placed at the top level of a component body runs only during initialization.
- **Signals drive updates**. Reactive state is created with `createSignal()`. When a signal is read inside a reactive context (JSX expressions, `createEffect`, `createMemo`), SolidJS automatically subscribes to that signal. When the signal changes, only the subscribed DOM nodes or effects update.
- **No stale closures**. Because components do not re-render, there is no risk of capturing stale values in closures (a common React pitfall). Signals always return the current value when called.
- **JSX compiles to real DOM operations**. The `vite-plugin-solid` compiler transforms JSX into direct DOM creation and reactive binding calls at build time, not a virtual DOM diffing step.
- **Props are reactive getters**. Component props are accessed as getters, not plain values. Destructuring props at the top level breaks reactivity. Use `props.name` or the `splitProps`/`mergeProps` utilities instead.

The TypeScript configuration uses `"jsx": "preserve"` with `"jsxImportSource": "solid-js"`, deferring JSX transformation to the Vite plugin.

---

## Router Structure

Routing is handled by `@solidjs/router` (v0.15.4), configured in `src/app/App.tsx` using nested layout routes.

```tsx
<NotificationProvider>
  <Router>
    <Route path="/" component={Test}>
      <Route path="/" component={() => <Navigate href="/typography" />} />
      <Route path="typography" component={TypographyDemo} />
      <Route path="button" component={ButtonDemo} />
      {/* ... 18 demo routes total */}
    </Route>
  </Router>
</NotificationProvider>
```

`Test` is the layout component — it renders the sidebar Pane with Tabs navigation and receives the matched child route via `props.children` (using `RouteSectionProps` from `@solidjs/router`). Each demo component has its own URL route.

### Current Routes

| Path | Component | Description |
|---|---|---|
| `/` | (redirect) | Redirects to `/typography` |
| `/typography` | `TypographyDemo` | Typography examples |
| `/textfield` | `TextFieldDemo` | TextField examples |
| `/card` | `CardDemo` | Card examples |
| `/checkbox` | `CheckboxDemo` | Checkbox examples |
| `/radiogroup` | `RadioGroupDemo` | RadioGroup examples |
| `/combobox` | `ComboboxDemo` | Combobox examples |
| `/multiselect` | `MultiSelectComboboxDemo` | Multi-select Combobox examples |
| `/slider` | `SliderDemo` | Slider examples |
| `/button` | `ButtonDemo` | Button examples |
| `/buttongroup` | `ButtonGroupDemo` | ButtonGroup examples |
| `/spinner` | `SpinnerDemo` | Spinner examples |
| `/dialog` | `DialogDemo` | Dialog examples |
| `/notification` | `NotificationDemo` | Notification examples |
| `/tooltip` | `TooltipDemo` | Tooltip examples |
| `/badge` | `BadgeDemo` | Badge examples |
| `/avatar` | `AvatarDemo` | Avatar examples |
| `/tabs` | `TabsDemo` | Tabs examples |
| `/pane` | `PaneDemo` | Pane examples |

The `NotificationProvider` wraps the entire router, making the notification system available on every route.

Demo files are located in `src/app/pages/demos/`. The layout shell is at `src/app/pages/Test.tsx`.

---

## File Organization

```
src/
  app/
    App.tsx                          -- Root component with Router, nested routes, providers
    pages/
      Test.tsx                       -- Layout shell: sidebar Pane + Tabs nav, renders routed children
      demos/                         -- 18 individual demo files
        TypographyDemo.tsx
        TextFieldDemo.tsx
        CardDemo.tsx
        CheckboxDemo.tsx
        RadioGroupDemo.tsx
        ComboboxDemo.tsx
        MultiSelectComboboxDemo.tsx
        SliderDemo.tsx
        ButtonDemo.tsx
        ButtonGroupDemo.tsx
        SpinnerDemo.tsx
        DialogDemo.tsx
        NotificationDemo.tsx
        TooltipDemo.tsx
        BadgeDemo.tsx
        AvatarDemo.tsx
        TabsDemo.tsx
        PaneDemo.tsx
  components/
    display/                         -- Data presentation components
      Avatar.tsx
      AvatarGroup.tsx
      Badge.tsx
      Tooltip.tsx
    feedback/                        -- User feedback components
      Dialog.tsx
      Notification.tsx
    inputs/                          -- Interactive form controls
      Button.tsx
      ButtonGroup.tsx
      Checkbox.tsx
      Combobox.tsx
      RadioGroup.tsx
      Slider.tsx
      Spinner.tsx
      TextField.tsx
    navigation/                      -- Navigation components
      Pane.tsx
      Tabs.tsx
    surfaces/                        -- Layout and background components
      Card.tsx
      GridBackground.tsx
  styles/
    global.css                       -- Theme tokens, reset, typography, utilities
    components/
      display/
        Avatar.css
        AvatarGroup.css
        Badge.css
        Tooltip.css
      feedback/
        Dialog.css
        Notification.css
      inputs/
        Button.css
        ButtonGroup.css
        Checkbox.css
        Combobox.css
        RadioGroup.css
        Slider.css
        Spinner.css
        TextField.css
      navigation/
        Pane.css
        Tabs.css
      surfaces/
        Card.css
tests/
  setup.ts                           -- Test setup (imports @testing-library/jest-dom)
  unit/                              -- Vitest unit tests
    App.test.tsx
    Avatar.test.tsx
    AvatarGroup.test.tsx
    Badge.test.tsx
    Button.test.tsx
    Card.test.tsx
    Checkbox.test.tsx
    Combobox.test.tsx
    Dialog.test.tsx
    Notification.test.tsx
    Pane.test.tsx
    Tabs.test.tsx
    RadioGroup.test.tsx
    Slider.test.tsx
    TextField.test.tsx
    Tooltip.test.tsx
  e2e/                               -- Playwright E2E tests
    app.spec.ts
    button-sizing.spec.ts
    combobox.spec.ts
    dialog.spec.ts
    notification.spec.ts
    pane.spec.ts
    tabs.spec.ts
  .output/                           -- Test reports and results (git-ignored)
```

### Conventions

- Every component TSX file has a matching CSS file at the same relative path under `src/styles/components/`. For example, `src/components/inputs/Button.tsx` pairs with `src/styles/components/inputs/Button.css`.
- CSS is imported at the top of each component file: `import '../../styles/components/inputs/Button.css'`.
- Unit test files mirror the component name: `tests/unit/Button.test.tsx` for `Button.tsx`.
- E2E test files use `.spec.ts` and are feature-focused rather than component-focused.
- `GridBackground.tsx` is the only component without a dedicated CSS file (it renders to a `<canvas>` element).

---

## CSS Architecture

### Token Hierarchy

The CSS system has three layers:

1. **Raw scales** -- Primitive values with no semantic meaning. Examples: `--color-blue-600: #0066cc`, `--spacing-4: 16px`, `--radius-md: 4px`.
2. **Semantic aliases** -- Named roles that reference raw scales. Examples: `--color-primary: var(--color-blue-600)`, `--color-danger: var(--color-red-600)`.
3. **Global defaults (--g-*)** -- Application-wide tokens that reference semantic aliases or raw scales. These are the tokens components actually consume. Examples: `--g-border-color: var(--color-gray-700)`, `--g-background: linear-gradient(...)`.

Components reference `--g-*` tokens almost exclusively. This means a theme change only requires updating the global defaults section in `global.css`.

### BEM Naming

All component CSS uses BEM naming:

```
.block           -- Component root
.block__element  -- Sub-part of the component
.block--modifier -- Variant or state of the block
```

### No CSS Modules or CSS-in-JS

The project uses plain CSS files with global class names. There is no CSS modules configuration, no styled-components, and no CSS-in-JS runtime. Class name scoping is achieved through BEM discipline.

---

## Build Pipeline

### Development

```
bun run dev
  -> vite (dev server, port 3000)
  -> vite-plugin-solid (JSX compilation)
  -> solid-devtools/vite (dev tools integration)
  -> HMR via Vite
```

Vite is configured with `root: 'src'` so the entry `index.html` lives inside the `src/` directory.

### Production Build

```
bun run build
  -> vite build
  -> target: esnext
  -> output: dist/ (relative to project root, via outDir: '../dist')
```

### Production Serve

Two options:

1. **Vite preview** (`bun run serve`): Uses `vite preview` to serve the `dist/` directory. Suitable for local testing.

2. **Bun native server** (`bun run serve:prod`): Runs `serve.ts`, a lightweight static file server built on `Bun.serve()`. Features:
   - Serves files from `./dist` (configurable via `PUBLIC_DIR` env var)
   - Port defaults to `3000` (configurable via `PORT` env var)
   - SPA fallback: returns `dist/index.html` for any unmatched route
   - Tries paths with `.html` extension and `/index.html` suffix before falling back
   - No external dependencies

---

## Docker Architecture

The `Dockerfile` uses a multi-stage build:

### Stage 1: Builder (`oven/bun:1-debian`)

- **Base image**: `oven/bun:1-debian` (Debian-based, needed for native dependency compilation -- the `canvas` npm package requires native build tools)
- **Cache mounts**: Bun install cache (`/root/.bun/install/cache`) and Vite cache (`node_modules/.vite`) are mounted as Docker build cache layers for faster rebuilds
- **Steps**: `bun install --frozen-lockfile` then `bun run build`

### Stage 2: Runner (`oven/bun:1-alpine`)

- **Base image**: `oven/bun:1-alpine` (Alpine Linux, minimal image size)
- **Security**: Creates a non-root user (`bunuser:1001` in `nodejs:1001` group)
- **Copied files**: Only `dist/` (built assets) and `serve.ts` (server script) are copied from the builder -- no `node_modules`, no source code
- **Entrypoint**: `bun run serve.ts`
- **Exposed port**: `3000`

The Debian builder stage is necessary because the `canvas` npm package (used by `GridBackground.tsx`) has native C++ bindings that require build tools not available in Alpine. The final Alpine runner stage does not need `canvas` because it only serves the pre-built static files.

---

## CI/CD Pipeline

Defined in `.github/workflows/ci.yml`. Triggers on pushes to `main`, version tags (`v*.*.*`), and pull requests against `main`.

### Job 1: `test`

Runs on `ubuntu-latest`:

1. **Checkout** repository
2. **Setup Bun** (latest version via `oven-sh/setup-bun@v2`)
3. **Cache** Bun dependencies (`~/.bun/install/cache` and `node_modules`, keyed on `bun.lock`)
4. **Install** dependencies with `bun install --frozen-lockfile`
5. **Cache** Playwright browsers (`~/.cache/ms-playwright`, keyed on `bun.lock`)
6. **Install Playwright browsers**: Full install on cache miss (`bunx playwright install --with-deps chromium firefox webkit`), system deps only on cache hit (`bunx playwright install-deps chromium firefox webkit`)
7. **Run all tests**: `bun run test` (runs unit tests then E2E tests sequentially)
8. **Cache** Vite build output (`dist/` and `node_modules/.vite`, keyed on source files and `bun.lock`)
9. **Build** the application with `bun run build`

### Job 2: `build-image` (depends on `test`)

Runs on a matrix of two runners for multi-architecture Docker images:

| Runner | Platform | Arch label |
|---|---|---|
| `ubuntu-latest` | `linux/amd64` | `amd64` |
| `ubuntu-24.04-arm` | `linux/arm64` | `arm64` |

Steps:
1. **Checkout**, **setup Docker buildx**
2. **Log into GHCR** (`ghcr.io`) using `GITHUB_TOKEN` (skipped on PRs)
3. **Extract Docker metadata** -- generates image tags from semver, branch name, and short SHA
4. **Build and push by digest** -- builds the Docker image for the target platform, pushes by digest (not by tag). Uses GitHub Actions cache (`type=gha`) scoped per architecture
5. **Export and upload digest** as a build artifact (skipped on PRs)

### Job 3: `merge-manifests` (depends on `build-image`, skipped on PRs)

1. **Downloads** both architecture digests
2. **Creates a multi-architecture manifest list** and pushes it to GHCR
3. **Tags**: `latest` (on `main` branch), semver versions, branch name, short SHA
4. **Inspects** the final image for verification

### Registry

- **Registry**: `ghcr.io` (GitHub Container Registry)
- **Image name**: lowercase `github.repository`
- **Permissions**: `contents: read`, `packages: write`

---

## Fedora Playwright Compatibility

The script at `scripts/playwright-fedora-fix.sh` resolves library incompatibilities when running Playwright's bundled WebKit on Fedora.

### The Problem

Playwright downloads pre-built browser binaries compiled on Ubuntu. WebKit's MiniBrowser requires specific shared library versions that differ on Fedora:

| Library | Ubuntu (Playwright expects) | Fedora (ships) | Issue |
|---|---|---|---|
| ICU | 74 (`libicudata.so.74`) | 76/77 | ICU uses versioned symbols; major version mismatch breaks ABI |
| libjpeg | `libjpeg.so.8` (turbo ABI) | `libjpeg.so.62` | Different ABI entirely |
| libjxl | `libjxl.so.0.8` | `libjxl.so.0.11` | Minor version mismatch, symlink-compatible |

### The Fix

The script performs these steps:

1. **Downloads Ubuntu packages** for ICU 74 and libjpeg-turbo8 from the Ubuntu mirror, extracts the `.so` files using `ar` and `zstd`
2. **Places them** in `~/.cache/ms-playwright/fedora-compat/`
3. **Creates symlinks** for libjxl pointing to the system version
4. **Patches WebKit wrapper scripts** (`MiniBrowser` in both `minibrowser-gtk` and `minibrowser-wpe` variants) to prepend the compat directory to `LD_LIBRARY_PATH`
5. Is **idempotent** -- safe to re-run after Playwright browser updates

### Configuration

The Playwright config (`playwright.config.ts`) includes a companion line:

```ts
process.env.PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS ??= '1';
```

This skips Playwright's built-in Debian-only host validation check, which would fail on Fedora even though the actual required libraries are provided via the compat directory.

### Required System Tools

- `wget` -- for downloading Ubuntu packages
- `ar` (from `binutils`) -- for extracting `.deb` files
- `zstd` -- for decompressing `data.tar.zst` inside the `.deb`

---

## Testing Architecture

### Unit Tests (Vitest)

**Configuration** (`vitest.config.ts`):

| Setting | Value |
|---|---|
| Environment | `jsdom` |
| Globals | `true` (no need to import `describe`, `it`, `expect`) |
| Setup file | `tests/setup.ts` (imports `@testing-library/jest-dom` for DOM matchers) |
| Include pattern | `tests/unit/**/*.{test,spec}.{js,ts,jsx,tsx}` |
| Exclude | `tests/e2e/**`, `node_modules/**` |
| Resolve conditions | `['development', 'browser']` |
| SolidJS plugin | `vite-plugin-solid` with `hot: false, dev: false` (disables HMR in tests) |

**Key library**: `@solidjs/testing-library` (v0.8.10) for rendering SolidJS components in the jsdom environment.

**Command**: `bun run test:unit` (runs `vitest run`). Use `bun run test:unit:watch` for watch mode.

**Portal testing pattern**: Components that render via `Portal` (e.g., Combobox dropdowns, Dialogs) attach content to `document.body`, not to the component's container. Always query `document` instead of the container returned by `render()`:

```typescript
// Correct for Portal-rendered elements
const dropdown = document.querySelector('.combobox__dropdown');

// Incorrect -- Portal content is not inside the render container
const dropdown = container.querySelector('.combobox__dropdown');
```

### E2E Tests (Playwright)

**Configuration** (`playwright.config.ts`):

| Setting | Value |
|---|---|
| Test directory | `tests/e2e/` |
| Fully parallel | `true` |
| Retries | 2 in CI, 0 locally |
| Workers | 3 in CI, auto locally |
| Base URL | `http://127.0.0.1:3000` |
| Trace | On first retry |
| Screenshots | Only on failure |
| Report output | `tests/.output/report` (HTML) |
| Results output | `tests/.output/results` |

**Browser matrix**:

| Project | Device profile |
|---|---|
| `chromium` | Desktop Chrome |
| `firefox` | Desktop Firefox |
| `webkit` | Desktop Safari |

**Dev server**: Playwright auto-starts the dev server with `bun run dev --host 127.0.0.1` on port 3000. In CI, a fresh server is always started (`reuseExistingServer: false`). Locally, an already-running server on port 3000 is reused.

**Important**: The base URL uses `127.0.0.1` instead of `localhost`. This is critical for Firefox compatibility on some platforms where `localhost` may resolve to IPv6 (`::1`) while the server only listens on IPv4.

### Running Tests

| Command | What it does |
|---|---|
| `bun run test` | Runs unit tests, then E2E tests (sequential) |
| `bun run test:unit` | Unit tests only (`vitest run`) |
| `bun run test:unit:watch` | Unit tests in watch mode |
| `bun run test:e2e` | E2E tests only (`playwright test`) |
| `bun run test:e2e:ui` | E2E tests with Playwright UI mode |
| `bun run test:e2e:headed` | E2E tests with visible browser windows |
| `bunx vitest run <file>` | Run a specific unit test file |
| `bunx playwright test <file>` | Run a specific E2E test file |

### TypeScript Configuration

From `tsconfig.json`:

| Setting | Value | Purpose |
|---|---|---|
| `jsx` | `preserve` | Let vite-plugin-solid handle JSX transformation |
| `jsxImportSource` | `solid-js` | SolidJS JSX types |
| `target` | `ESNext` | Modern JS output |
| `module` | `ESNext` | ES module syntax |
| `moduleResolution` | `bundler` | Vite/Bun-compatible resolution |
| `strict` | `true` | Full type checking |
| `noEmit` | `true` | TypeScript is used for checking only; Vite handles emit |
| `isolatedModules` | `true` | Required for Vite compatibility |
| `types` | `["vite/client", "bun"]` | Ambient type declarations |
