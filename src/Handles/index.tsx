import * as React from 'react';
import { flushSync } from 'react-dom';
import type { OnStartMove } from '../interface';
import { getIndex } from '../util';
import type { HandleProps } from './Handle';
import Handle from './Handle';

export interface HandlesProps {
  prefixCls: string;
  style?: React.CSSProperties | React.CSSProperties[];
  values: number[];
  onStartMove: OnStartMove;
  onOffsetChange: (value: number | 'min' | 'max', valueIndex: number) => void;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onDelete?: (index: number) => void;
  handleRender?: HandleProps['render'];
  /**
   * When config `activeHandleRender`,
   * it will render another hidden handle for active usage.
   * This is useful for accessibility or tooltip usage.
   */
  activeHandleRender?: HandleProps['render'];
  draggingIndex: number;
  draggingDelete: boolean;
  onChangeComplete?: () => void;
  marksObject:any;
  handleInnerComponent?: React.ReactNode;
  handleActionComponent?: React.ReactNode;
}

export interface HandlesRef {
  focus: (index: number) => void;
  hideHelp: VoidFunction;
}

const Handles = React.forwardRef<HandlesRef, HandlesProps>((props, ref) => {
  const {
    prefixCls,
    style,
    onStartMove,
    onOffsetChange,
    values,
    handleRender,
    activeHandleRender,
    draggingIndex,
    draggingDelete,
    marksObject,
    handleInnerComponent,
    handleActionComponent,
    onFocus,
    ...restProps
  } = props;
  const handlesRef = React.useRef<Record<number, HTMLDivElement>>({});

  // =========================== Active ===========================
  const [activeVisible, setActiveVisible] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);

  const onActive = (index: number) => {
    setActiveIndex(index);
    setActiveVisible(true);
  };

  const onHandleFocus = (e: React.FocusEvent<HTMLDivElement>, index: number) => {
    onActive(index);
    onFocus?.(e);
  };

  const onHandleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    onActive(index);
  };

  // =========================== Render ===========================
  React.useImperativeHandle(ref, () => ({
    focus: (index: number) => {
      handlesRef.current[index]?.focus();
    },
    hideHelp: () => {
      flushSync(() => {
        setActiveVisible(false);
      });
    },
  }));

  // =========================== Render ===========================
  // Handle Props
  const handleProps = {
    prefixCls,
    onStartMove,
    onOffsetChange,
    render: handleRender,
    onFocus: onHandleFocus,
    onMouseEnter: onHandleMouseEnter,
    ...restProps,
  };

  return (
    <>
      {values.map<React.ReactNode>((value, index) => {
        const dragging = draggingIndex === index;

        return (
          <Handle
            ref={(node) => {
              if (!node) {
                delete handlesRef.current[index];
              } else {
                handlesRef.current[index] = node;
              }
            }}
            dragging={dragging}
            draggingDelete={dragging && draggingDelete}
            style={getIndex(style, index)}
            key={index}
            value={value}
            marksObject={marksObject}
            valueIndex={index}
            handleInnerComponent={handleInnerComponent}
            handleActionComponent={handleActionComponent}
            {...handleProps}
          />
        );
      })}
    </>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Handles.displayName = 'Handles';
}

export default Handles;
