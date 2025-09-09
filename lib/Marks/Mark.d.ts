import * as React from 'react';
export interface MarkProps {
    prefixCls: string;
    className: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    value: number;
    positionFixer?: number;
    disabled: boolean;
    onClick: (value: number) => void;
}
declare const Mark: React.FC<MarkProps>;
export default Mark;
