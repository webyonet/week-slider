import * as React from 'react';
import Mark from './Mark';

export interface MarkObj {
  style?: React.CSSProperties;
  label?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  positionFixer?: number;
}

export interface InternalMarkObj extends MarkObj {
  value: number;
}

export interface MarksProps {
  prefixCls: string;
  marks?: InternalMarkObj[];
  onClick: (value: number) => void;
}

const Marks: React.FC<MarksProps> = (props) => {
  const { prefixCls, marks, onClick } = props;

  const markPrefixCls = `${prefixCls}-mark`;

  // Not render mark if empty
  if (!marks.length) {
    return null;
  }

  return (
    <div className={markPrefixCls}>
      {marks.map<React.ReactNode>(({ value, style, label, className, disabled, positionFixer }) => (
        <Mark key={value} prefixCls={markPrefixCls} className={className} style={style} value={value} disabled={disabled} positionFixer={positionFixer} onClick={onClick}>
          {label}
        </Mark>
      ))}
    </div>
  );
};

export default Marks;
