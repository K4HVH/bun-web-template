import { Component, createSignal, splitProps, onMount, onCleanup, Show, For } from 'solid-js';
import { Portal } from 'solid-js/web';
import '../../styles/components/inputs/Slider.css';

interface SliderMark {
  value: number;
  label?: string;
}

interface SliderProps {
  value?: number | [number, number];
  onChange?: (value: number | [number, number]) => void;
  onBlur?: () => void;
  min?: number;
  max?: number;
  step?: number | null;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  size?: 'normal' | 'compact';
  range?: boolean;
  marks?: SliderMark[];
  showTooltip?: boolean;
  error?: string;
  invalid?: boolean;
  class?: string;
  'aria-describedby'?: string;
  'aria-required'?: boolean;
  'aria-labelledby'?: string;
}

export const Slider: Component<SliderProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'value',
    'onChange',
    'onBlur',
    'min',
    'max',
    'step',
    'disabled',
    'orientation',
    'size',
    'range',
    'marks',
    'showTooltip',
    'error',
    'invalid',
    'class',
    'aria-describedby',
    'aria-required',
    'aria-labelledby',
  ]);

  const min = () => local.min ?? 0;
  const max = () => local.max ?? 100;
  const step = () => local.step === null ? null : (local.step ?? 1);
  const orientation = () => local.orientation ?? 'horizontal';
  const size = () => local.size ?? 'normal';
  const restrictToMarks = () => step() === null && local.marks && local.marks.length > 0;

  const [isDragging, setIsDragging] = createSignal(false);
  const [activeThumb, setActiveThumb] = createSignal<'start' | 'end' | null>(null);
  const [hoveredThumb, setHoveredThumb] = createSignal<'start' | 'end' | null>(null);
  const [tooltipPosition, setTooltipPosition] = createSignal({ top: 0, left: 0 });

  let trackRef: HTMLDivElement | undefined;
  let startThumbRef: HTMLDivElement | undefined;
  let endThumbRef: HTMLDivElement | undefined;

  const getValue = (): [number, number] => {
    if (local.range) {
      if (Array.isArray(local.value)) {
        return local.value;
      }
      return [min(), max()];
    }
    const val = Array.isArray(local.value) ? local.value[0] : (local.value ?? min());
    return [val, val];
  };

  const [startValue, endValue] = getValue();

  const percentageFromValue = (value: number) => {
    const range = max() - min();
    return ((value - min()) / range) * 100;
  };

  const updateTooltipPosition = () => {
    const currentThumb = activeThumb() || hoveredThumb();
    const thumbRef = currentThumb === 'start' ? startThumbRef : endThumbRef;
    if (thumbRef) {
      const rect = thumbRef.getBoundingClientRect();
      const isHorizontal = orientation() === 'horizontal';
      setTooltipPosition({
        top: isHorizontal ? rect.top - 8 : rect.top + rect.height / 2,
        left: isHorizontal ? rect.left + rect.width / 2 : rect.right + 8,
      });
    }
  };

  const getTooltipValue = () => {
    const currentThumb = activeThumb() || hoveredThumb();
    const [start, end] = getValue();
    return currentThumb === 'start' ? start : end;
  };

  const valueFromPosition = (clientPos: number) => {
    if (!trackRef) return min();

    const rect = trackRef.getBoundingClientRect();
    const isHorizontal = orientation() === 'horizontal';
    const trackSize = isHorizontal ? rect.width : rect.height;
    const trackStart = isHorizontal ? rect.left : rect.top;
    const position = clientPos - trackStart;

    let percentage = isHorizontal ? position / trackSize : 1 - (position / trackSize);
    percentage = Math.max(0, Math.min(1, percentage));

    const range = max() - min();
    let value = min() + percentage * range;

    // Snap to marks or step
    if (restrictToMarks()) {
      // Find nearest mark
      const marks = local.marks!;
      const nearest = marks.reduce((prev, curr) => {
        return Math.abs(curr.value - value) < Math.abs(prev.value - value) ? curr : prev;
      });
      return nearest.value;
    } else {
      // Snap to step
      const stepValue = step()!;
      value = Math.round(value / stepValue) * stepValue;
      value = Math.max(min(), Math.min(max(), value));
      return value;
    }
  };

  const handlePointerDown = (e: PointerEvent, thumb: 'start' | 'end') => {
    if (local.disabled) return;

    e.preventDefault();
    setIsDragging(true);
    setActiveThumb(thumb);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    // Only update position if not already hovering this thumb
    if (local.showTooltip !== false && hoveredThumb() !== thumb) {
      updateTooltipPosition();
    }
    setHoveredThumb(null); // Clear hover state when dragging starts
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging() || !activeThumb() || local.disabled) return;

    const clientPos = orientation() === 'horizontal' ? e.clientX : e.clientY;
    const newValue = valueFromPosition(clientPos);

    if (local.range) {
      const [start, end] = getValue();
      if (activeThumb() === 'start') {
        if (newValue > end) {
          // Crossed over - swap to end thumb
          setActiveThumb('end');
          local.onChange?.([end, newValue]);
        } else {
          local.onChange?.([newValue, end]);
        }
      } else {
        if (newValue < start) {
          // Crossed over - swap to start thumb
          setActiveThumb('start');
          local.onChange?.([newValue, start]);
        } else {
          local.onChange?.([start, newValue]);
        }
      }
    } else {
      local.onChange?.(newValue);
    }

    if (local.showTooltip !== false) {
      updateTooltipPosition();
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setActiveThumb(null);
  };

  const handleTrackClick = (e: MouseEvent) => {
    if (local.disabled || isDragging()) return;

    const clientPos = orientation() === 'horizontal' ? e.clientX : e.clientY;
    const newValue = valueFromPosition(clientPos);

    if (local.range) {
      const [start, end] = getValue();
      const distToStart = Math.abs(newValue - start);
      const distToEnd = Math.abs(newValue - end);

      if (distToStart < distToEnd) {
        local.onChange?.([newValue, end]);
      } else {
        local.onChange?.([start, newValue]);
      }
    } else {
      local.onChange?.(newValue);
    }
  };

  const classNames = () => {
    const classes = ['slider'];

    if (orientation() === 'vertical') {
      classes.push('slider--vertical');
    }

    if (size() === 'compact') {
      classes.push('slider--compact');
    }

    if (local.disabled) {
      classes.push('slider--disabled');
    }

    if (isDragging()) {
      classes.push('slider--dragging');
    }

    if (local.invalid || local.error) {
      classes.push('slider--invalid');
    }

    if (local.class) {
      classes.push(local.class);
    }

    return classes.join(' ');
  };

  return (
    <>
      <div class={classNames()} onBlur={local.onBlur} aria-invalid={local.invalid || !!local.error} {...rest}>
        <div
          ref={trackRef}
          class="slider__track"
          onClick={handleTrackClick}
        >
          <div
            class="slider__range"
            style={{
              [orientation() === 'horizontal' ? 'left' : 'bottom']: `${percentageFromValue(getValue()[0])}%`,
              [orientation() === 'horizontal' ? 'width' : 'height']: `${percentageFromValue(getValue()[1]) - percentageFromValue(getValue()[0])}%`,
            }}
          />

          {/* Marks */}
          <Show when={local.marks}>
            <For each={local.marks}>
              {(mark) => (
                <div
                  class="slider__mark"
                  style={{
                    [orientation() === 'horizontal' ? 'left' : 'bottom']: `${percentageFromValue(mark.value)}%`,
                  }}
                >
                  <div class="slider__mark-dot" />
                  <Show when={mark.label}>
                    <div class="slider__mark-label">{mark.label}</div>
                  </Show>
                </div>
              )}
            </For>
          </Show>

          {local.range && (
            <div
              ref={startThumbRef}
              class="slider__thumb slider__thumb--start"
              style={{
                [orientation() === 'horizontal' ? 'left' : 'bottom']: `${percentageFromValue(getValue()[0])}%`,
              }}
              onPointerDown={(e) => handlePointerDown(e, 'start')}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onMouseEnter={() => {
                if (local.showTooltip !== false) {
                  setHoveredThumb('start');
                  updateTooltipPosition();
                }
              }}
              onMouseLeave={() => setHoveredThumb(null)}
              tabIndex={local.disabled ? -1 : 0}
            />
          )}

          <div
            ref={endThumbRef}
            class="slider__thumb slider__thumb--end"
            style={{
              [orientation() === 'horizontal' ? 'left' : 'bottom']: `${percentageFromValue(getValue()[1])}%`,
            }}
            onPointerDown={(e) => handlePointerDown(e, 'end')}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onMouseEnter={() => {
              if (local.showTooltip !== false) {
                setHoveredThumb('end');
                updateTooltipPosition();
              }
            }}
            onMouseLeave={() => setHoveredThumb(null)}
            tabIndex={local.disabled ? -1 : 0}
          />
        </div>
      </div>

      {/* Tooltip */}
      <Show when={(isDragging() || hoveredThumb()) && local.showTooltip !== false}>
        <Portal>
          <div
            class="slider__tooltip"
            style={{
              position: 'fixed',
              top: `${tooltipPosition().top}px`,
              left: `${tooltipPosition().left}px`,
              transform: orientation() === 'horizontal'
                ? 'translate(-50%, -100%)'
                : 'translateY(-50%)',
            }}
          >
            {getTooltipValue()}
          </div>
        </Portal>
      </Show>
    </>
  );
};
