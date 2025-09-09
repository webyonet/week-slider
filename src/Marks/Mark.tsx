import classNames from 'classnames';
import * as React from 'react';
import SliderContext from '../context';
import { getDirectionStyle } from '../util';

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

const Mark: React.FC<MarkProps> = (props) => {
  const { prefixCls, style, children, value, onClick, className, disabled, positionFixer } = props;
  const { min, max, direction, includedStart, includedEnd, included } =
    React.useContext(SliderContext);

  const textCls = `${prefixCls}-text`;

  // ============================ Offset ============================
  const positionStyle = getDirectionStyle(direction, value, min, max, positionFixer);

  return (
    <span
      className={classNames(textCls, className, {
        [`${textCls}-active`]: included && includedStart <= value && value <= includedEnd,
      })}
      style={{ ...positionStyle, ...style }}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      onClick={() => {
        if (!disabled) {
          onClick(value);
        }
      }}
    >
      {children}
    </span>
  );
};

export default Mark;
