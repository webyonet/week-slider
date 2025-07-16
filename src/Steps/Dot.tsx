import classNames from 'classnames';
import * as React from 'react';
import SliderContext from '../context';
import { getDirectionStyle } from '../util';

export interface DotProps {
  prefixCls: string;
  value: number;
  style?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
  activeStyle?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
  marksObject: any;
}

const Dot: React.FC<DotProps> = (props) => {
  const { prefixCls, value, style, activeStyle, marksObject } = props;
  const { min, max, direction, included, includedStart, includedEnd } =
    React.useContext(SliderContext);

  const dotClassName = `${prefixCls}-dot`;
  const active = included && includedStart <= value && value <= includedEnd;

  const entity = marksObject[value];

  // ============================ Offset ============================
  let mergedStyle: React.CSSProperties = {
    ...getDirectionStyle(direction, value, min, max, entity?.positionFixer),
    ...(typeof style === 'function' ? style(value) : style),
  };

  if (active) {
    mergedStyle = {
      ...mergedStyle,
      ...(typeof activeStyle === 'function' ? activeStyle(value) : activeStyle),
    };
  }

  return (
    <span
      className={classNames(dotClassName, entity?.className, { [`${dotClassName}-active`]: active, 'center': (entity?.positionFixer % 2 === 0) })}
      style={mergedStyle}
    />
  );
};

export default Dot;
