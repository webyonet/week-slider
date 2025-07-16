import * as React from 'react';
import type { InternalMarkObj } from '../Marks';
export interface StepsProps {
    prefixCls: string;
    marks: InternalMarkObj[];
    dots?: boolean;
    style?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
    activeStyle?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
    marksObject: any;
}
declare const Steps: React.FC<StepsProps>;
export default Steps;
