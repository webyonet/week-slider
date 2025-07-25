import * as React from 'react';
import type { HandlesProps } from './Handles';
import type { MarkObj } from './Marks';
import type { AriaValueFormat, SliderClassNames, SliderStyles } from './interface';
/**
 * New:
 * - click mark to update range value
 * - handleRender
 * - Fix handle with count not correct
 * - Fix pushable not work in some case
 * - No more FindDOMNode
 * - Move all position related style into inline style
 * - Key: up is plus, down is minus
 * - fix Key with step = null not align with marks
 * - Change range should not trigger onChange
 * - keyboard support pushable
 */
export type RangeConfig = {
    editable?: boolean;
    draggableTrack?: boolean;
    /** Set min count when `editable` */
    minCount?: number;
    /** Set max count when `editable` */
    maxCount?: number;
};
export interface SliderProps<ValueType = number | number[]> {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    classNames?: SliderClassNames;
    styles?: SliderStyles;
    id?: string;
    disabled?: boolean;
    keyboard?: boolean;
    autoFocus?: boolean;
    onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
    range?: boolean | RangeConfig;
    /** @deprecated Use `range.minCount` or `range.maxCount` to handle this */
    count?: number;
    min?: number;
    max?: number;
    step?: number | null;
    value?: ValueType;
    defaultValue?: ValueType;
    onChange?: (value: ValueType) => void;
    /** @deprecated It's always better to use `onChange` instead */
    onBeforeChange?: (value: ValueType) => void;
    /** @deprecated Use `onChangeComplete` instead */
    onAfterChange?: (value: ValueType) => void;
    onChangeComplete?: (value: ValueType) => void;
    allowCross?: boolean;
    pushable?: boolean | number;
    reverse?: boolean;
    vertical?: boolean;
    included?: boolean;
    startPoint?: number;
    /** @deprecated Please use `styles.track` instead */
    trackStyle?: React.CSSProperties | React.CSSProperties[];
    /** @deprecated Please use `styles.handle` instead */
    handleStyle?: React.CSSProperties | React.CSSProperties[];
    /** @deprecated Please use `styles.rail` instead */
    railStyle?: React.CSSProperties;
    dotStyle?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
    activeDotStyle?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
    marks?: Record<string | number, React.ReactNode | MarkObj>;
    dots?: boolean;
    handleRender?: HandlesProps['handleRender'];
    activeHandleRender?: HandlesProps['handleRender'];
    handleInnerComponent?: React.ReactNode;
    handleActionComponent?: React.ReactNode;
    track?: boolean;
    tabIndex?: number | number[];
    ariaLabelForHandle?: string | string[];
    ariaLabelledByForHandle?: string | string[];
    ariaRequired?: boolean;
    ariaValueTextFormatterForHandle?: AriaValueFormat | AriaValueFormat[];
}
export interface SliderRef {
    focus: () => void;
    blur: () => void;
}
declare const WeekSlider: React.ForwardRefExoticComponent<SliderProps<number | number[]> & React.RefAttributes<SliderRef>>;
export default WeekSlider;
