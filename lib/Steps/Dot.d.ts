import * as React from 'react';
export interface DotProps {
    prefixCls: string;
    value: number;
    style?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
    activeStyle?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
    marksObject: any;
}
declare const Dot: React.FC<DotProps>;
export default Dot;
