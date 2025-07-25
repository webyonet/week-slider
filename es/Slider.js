import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import cls from 'classnames';
import useEvent from "rc-util/es/hooks/useEvent";
import useMergedState from "rc-util/es/hooks/useMergedState";
import isEqual from "rc-util/es/isEqual";
import warning from "rc-util/es/warning";
import Handles from "./Handles";
import Marks from "./Marks";
import Steps from "./Steps";
import Tracks from "./Tracks";
import SliderContext from "./context";
import useDrag from "./hooks/useDrag";
import useOffset from "./hooks/useOffset";
import useRange from "./hooks/useRange";

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

var WeekSlider = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$prefixCls = props.prefixCls,
    prefixCls = _props$prefixCls === void 0 ? 'rc-slider' : _props$prefixCls,
    className = props.className,
    style = props.style,
    classNames = props.classNames,
    styles = props.styles,
    id = props.id,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$keyboard = props.keyboard,
    keyboard = _props$keyboard === void 0 ? true : _props$keyboard,
    autoFocus = props.autoFocus,
    onFocus = props.onFocus,
    onBlur = props.onBlur,
    _props$min = props.min,
    min = _props$min === void 0 ? 0 : _props$min,
    _props$max = props.max,
    max = _props$max === void 0 ? 100 : _props$max,
    _props$step = props.step,
    step = _props$step === void 0 ? 1 : _props$step,
    value = props.value,
    defaultValue = props.defaultValue,
    range = props.range,
    count = props.count,
    onChange = props.onChange,
    onBeforeChange = props.onBeforeChange,
    onAfterChange = props.onAfterChange,
    onChangeComplete = props.onChangeComplete,
    _props$allowCross = props.allowCross,
    allowCross = _props$allowCross === void 0 ? true : _props$allowCross,
    _props$pushable = props.pushable,
    pushable = _props$pushable === void 0 ? false : _props$pushable,
    reverse = props.reverse,
    vertical = props.vertical,
    _props$included = props.included,
    included = _props$included === void 0 ? true : _props$included,
    startPoint = props.startPoint,
    trackStyle = props.trackStyle,
    handleStyle = props.handleStyle,
    railStyle = props.railStyle,
    dotStyle = props.dotStyle,
    activeDotStyle = props.activeDotStyle,
    marks = props.marks,
    dots = props.dots,
    handleRender = props.handleRender,
    activeHandleRender = props.activeHandleRender,
    track = props.track,
    handleInnerComponent = props.handleInnerComponent,
    handleActionComponent = props.handleActionComponent,
    _props$tabIndex = props.tabIndex,
    tabIndex = _props$tabIndex === void 0 ? 0 : _props$tabIndex,
    ariaLabelForHandle = props.ariaLabelForHandle,
    ariaLabelledByForHandle = props.ariaLabelledByForHandle,
    ariaRequired = props.ariaRequired,
    ariaValueTextFormatterForHandle = props.ariaValueTextFormatterForHandle;
  var handlesRef = React.useRef(null);
  var containerRef = React.useRef(null);
  var direction = React.useMemo(function () {
    if (vertical) {
      return reverse ? 'ttb' : 'btt';
    }
    return reverse ? 'rtl' : 'ltr';
  }, [reverse, vertical]);

  // ============================ Range =============================
  var _useRange = useRange(range),
    _useRange2 = _slicedToArray(_useRange, 5),
    rangeEnabled = _useRange2[0],
    rangeEditable = _useRange2[1],
    rangeDraggableTrack = _useRange2[2],
    minCount = _useRange2[3],
    maxCount = _useRange2[4];
  var mergedMin = React.useMemo(function () {
    return isFinite(min) ? min : 0;
  }, [min]);
  var mergedMax = React.useMemo(function () {
    return isFinite(max) ? max : 100;
  }, [max]);

  // ============================= Step =============================
  var mergedStep = React.useMemo(function () {
    return step !== null && step <= 0 ? 1 : step;
  }, [step]);

  // ============================= Push =============================
  var mergedPush = React.useMemo(function () {
    if (typeof pushable === 'boolean') {
      return pushable ? mergedStep : false;
    }
    return pushable >= 0 ? pushable : false;
  }, [pushable, mergedStep]);

  // ============================ Marks =============================
  var markList = React.useMemo(function () {
    return Object.keys(marks || {}).map(function (key) {
      var mark = marks[key];
      var markObj = {
        value: Number(key)
      };
      if (mark && _typeof(mark) === 'object' && ! /*#__PURE__*/React.isValidElement(mark) && ('label' in mark || 'style' in mark)) {
        markObj.style = mark.style;
        markObj.className = mark.className;
        markObj.disabled = mark.disabled;
        markObj.label = mark.label;
      } else {
        // @ts-ignore
        markObj.className = mark.className;
        // @ts-ignore
        markObj.disabled = mark.disabled;
        markObj.label = mark;
      }
      return markObj;
    }).sort(function (a, b) {
      return a.value - b.value;
    });
  }, [marks]);

  // ============================ Format ============================
  var _useOffset = useOffset(mergedMin, mergedMax, mergedStep, markList, allowCross, mergedPush),
    _useOffset2 = _slicedToArray(_useOffset, 2),
    formatValue = _useOffset2[0],
    offsetValues = _useOffset2[1];

  // ============================ Values ============================
  var _useMergedState = useMergedState(defaultValue, {
      value: value
    }),
    _useMergedState2 = _slicedToArray(_useMergedState, 2),
    mergedValue = _useMergedState2[0],
    setValue = _useMergedState2[1];
  var rawValues = React.useMemo(function () {
    var valueList = mergedValue === null || mergedValue === undefined ? [] : Array.isArray(mergedValue) ? mergedValue : [mergedValue];
    var _valueList = _slicedToArray(valueList, 1),
      _valueList$ = _valueList[0],
      val0 = _valueList$ === void 0 ? mergedMin : _valueList$;
    var returnValues = mergedValue === null ? [] : [val0];

    // Format as range
    if (rangeEnabled) {
      returnValues = _toConsumableArray(valueList);

      // When count provided or value is `undefined`, we fill values
      if (count || mergedValue === undefined) {
        var pointCount = count >= 0 ? count + 1 : 2;
        returnValues = returnValues.slice(0, pointCount);

        // Fill with count
        while (returnValues.length < pointCount) {
          var _returnValues;
          returnValues.push((_returnValues = returnValues[returnValues.length - 1]) !== null && _returnValues !== void 0 ? _returnValues : mergedMin);
        }
      }
      returnValues.sort(function (a, b) {
        return a - b;
      });
    }

    // Align in range
    returnValues.forEach(function (val, index) {
      returnValues[index] = formatValue(val);
    });
    return returnValues;
  }, [mergedValue, rangeEnabled, mergedMin, count, formatValue]);

  // =========================== onChange ===========================
  var getTriggerValue = function getTriggerValue(triggerValues) {
    return rangeEnabled ? triggerValues : triggerValues[0];
  };
  var triggerChange = useEvent(function (nextValues) {
    var _marks$nextValues;
    // @ts-ignore
    if (!((_marks$nextValues = marks[nextValues]) !== null && _marks$nextValues !== void 0 && _marks$nextValues.disabled)) {
      // Order first
      var cloneNextValues = _toConsumableArray(nextValues).sort(function (a, b) {
        return a - b;
      });

      // Trigger event if needed
      if (onChange && !isEqual(cloneNextValues, rawValues, true)) {
        onChange(getTriggerValue(cloneNextValues));
      }

      // We set this later since it will re-render component immediately
      setValue(cloneNextValues);
    }
  });
  var finishChange = useEvent(function (draggingDelete) {
    // Trigger from `useDrag` will tell if it's a delete action
    if (draggingDelete) {
      handlesRef.current.hideHelp();
    }
    var finishValue = getTriggerValue(rawValues);
    onChangeComplete === null || onChangeComplete === void 0 || onChangeComplete(finishValue);
  });
  var onDelete = function onDelete(index) {
    if (disabled || !rangeEditable || rawValues.length <= minCount) {
      return;
    }
    var cloneNextValues = _toConsumableArray(rawValues);
    cloneNextValues.splice(index, 1);
    onBeforeChange === null || onBeforeChange === void 0 || onBeforeChange(getTriggerValue(cloneNextValues));
    triggerChange(cloneNextValues);
    var nextFocusIndex = Math.max(0, index - 1);
    handlesRef.current.hideHelp();
    handlesRef.current.focus(nextFocusIndex);
  };
  var _useDrag = useDrag(containerRef, direction, rawValues, mergedMin, mergedMax, formatValue, triggerChange, finishChange, offsetValues, rangeEditable, minCount),
    _useDrag2 = _slicedToArray(_useDrag, 5),
    draggingIndex = _useDrag2[0],
    draggingValue = _useDrag2[1],
    draggingDelete = _useDrag2[2],
    cacheValues = _useDrag2[3],
    onStartDrag = _useDrag2[4];

  /**
   * When `rangeEditable` will insert a new value in the values array.
   * Else it will replace the value in the values array.
   */
  var changeToCloseValue = function changeToCloseValue(newValue, e) {
    if (!disabled) {
      // Create new values
      var cloneNextValues = _toConsumableArray(rawValues);
      var valueIndex = 0;
      var valueBeforeIndex = 0; // Record the index which value < newValue
      var valueDist = mergedMax - mergedMin;
      rawValues.forEach(function (val, index) {
        var dist = Math.abs(newValue - val);
        if (dist <= valueDist) {
          valueDist = dist;
          valueIndex = index;
        }
        if (val < newValue) {
          valueBeforeIndex = index;
        }
      });
      var focusIndex = valueIndex;
      if (rangeEditable && valueDist !== 0 && (!maxCount || rawValues.length < maxCount)) {
        cloneNextValues.splice(valueBeforeIndex + 1, 0, newValue);
        focusIndex = valueBeforeIndex + 1;
      } else {
        cloneNextValues[valueIndex] = newValue;
      }

      // Fill value to match default 2 (only when `rawValues` is empty)
      if (rangeEnabled && !rawValues.length && count === undefined) {
        cloneNextValues.push(newValue);
      }
      var nextValue = getTriggerValue(cloneNextValues);
      onBeforeChange === null || onBeforeChange === void 0 || onBeforeChange(nextValue);
      triggerChange(cloneNextValues);
      if (e) {
        var _document$activeEleme, _document$activeEleme2;
        (_document$activeEleme = document.activeElement) === null || _document$activeEleme === void 0 || (_document$activeEleme2 = _document$activeEleme.blur) === null || _document$activeEleme2 === void 0 || _document$activeEleme2.call(_document$activeEleme);
        handlesRef.current.focus(focusIndex);
        onStartDrag(e, focusIndex, cloneNextValues);
      } else {
        // https://github.com/ant-design/ant-design/issues/49997
        onAfterChange === null || onAfterChange === void 0 || onAfterChange(nextValue);
        warning(!onAfterChange, '[rc-slider] `onAfterChange` is deprecated. Please use `onChangeComplete` instead.');
        onChangeComplete === null || onChangeComplete === void 0 || onChangeComplete(nextValue);
      }
    }
  };

  // ============================ Click =============================
  var onSliderMouseDown = function onSliderMouseDown(e) {
    e.preventDefault();
    var _containerRef$current = containerRef.current.getBoundingClientRect(),
      width = _containerRef$current.width,
      height = _containerRef$current.height,
      left = _containerRef$current.left,
      top = _containerRef$current.top,
      bottom = _containerRef$current.bottom,
      right = _containerRef$current.right;
    var clientX = e.clientX,
      clientY = e.clientY;
    var percent;
    switch (direction) {
      case 'btt':
        percent = (bottom - clientY) / height;
        break;
      case 'ttb':
        percent = (clientY - top) / height;
        break;
      case 'rtl':
        percent = (right - clientX) / width;
        break;
      default:
        percent = (clientX - left) / width;
    }
    var nextValue = mergedMin + percent * (mergedMax - mergedMin);
    changeToCloseValue(formatValue(nextValue), e);
  };

  // =========================== Keyboard ===========================
  var _React$useState = React.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    keyboardValue = _React$useState2[0],
    setKeyboardValue = _React$useState2[1];
  var onHandleOffsetChange = function onHandleOffsetChange(offset, valueIndex) {
    if (!disabled) {
      var next = offsetValues(rawValues, offset, valueIndex);
      onBeforeChange === null || onBeforeChange === void 0 || onBeforeChange(getTriggerValue(rawValues));
      triggerChange(next.values);
      setKeyboardValue(next.value);
    }
  };
  React.useEffect(function () {
    if (keyboardValue !== null) {
      var valueIndex = rawValues.indexOf(keyboardValue);
      if (valueIndex >= 0) {
        handlesRef.current.focus(valueIndex);
      }
    }
    setKeyboardValue(null);
  }, [keyboardValue]);

  // ============================= Drag =============================
  var mergedDraggableTrack = React.useMemo(function () {
    if (rangeDraggableTrack && mergedStep === null) {
      if (process.env.NODE_ENV !== 'production') {
        warning(false, '`draggableTrack` is not supported when `step` is `null`.');
      }
      return false;
    }
    return rangeDraggableTrack;
  }, [rangeDraggableTrack, mergedStep]);
  var onStartMove = useEvent(function (e, valueIndex) {
    onStartDrag(e, valueIndex);
    onBeforeChange === null || onBeforeChange === void 0 || onBeforeChange(getTriggerValue(rawValues));
  });

  // Auto focus for updated handle
  var dragging = draggingIndex !== -1;
  React.useEffect(function () {
    if (!dragging) {
      var valueIndex = rawValues.lastIndexOf(draggingValue);
      handlesRef.current.focus(valueIndex);
    }
  }, [dragging]);

  // =========================== Included ===========================
  var sortedCacheValues = React.useMemo(function () {
    return _toConsumableArray(cacheValues).sort(function (a, b) {
      return a - b;
    });
  }, [cacheValues]);

  // Provide a range values with included [min, max]
  // Used for Track, Mark & Dot
  var _React$useMemo = React.useMemo(function () {
      if (!rangeEnabled) {
        return [mergedMin, sortedCacheValues[0]];
      }
      return [sortedCacheValues[0], sortedCacheValues[sortedCacheValues.length - 1]];
    }, [sortedCacheValues, rangeEnabled, mergedMin]),
    _React$useMemo2 = _slicedToArray(_React$useMemo, 2),
    includedStart = _React$useMemo2[0],
    includedEnd = _React$useMemo2[1];

  // ============================= Refs =============================
  React.useImperativeHandle(ref, function () {
    return {
      focus: function focus() {
        handlesRef.current.focus(0);
      },
      blur: function blur() {
        var _containerRef$current2;
        var _document = document,
          activeElement = _document.activeElement;
        if ((_containerRef$current2 = containerRef.current) !== null && _containerRef$current2 !== void 0 && _containerRef$current2.contains(activeElement)) {
          activeElement === null || activeElement === void 0 || activeElement.blur();
        }
      }
    };
  });

  // ========================== Auto Focus ==========================
  React.useEffect(function () {
    if (autoFocus) {
      handlesRef.current.focus(0);
    }
  }, []);

  // =========================== Context ============================
  var context = React.useMemo(function () {
    return {
      min: mergedMin,
      max: mergedMax,
      direction: direction,
      disabled: disabled,
      keyboard: keyboard,
      step: mergedStep,
      included: included,
      includedStart: includedStart,
      includedEnd: includedEnd,
      range: rangeEnabled,
      tabIndex: tabIndex,
      ariaLabelForHandle: ariaLabelForHandle,
      ariaLabelledByForHandle: ariaLabelledByForHandle,
      ariaRequired: ariaRequired,
      ariaValueTextFormatterForHandle: ariaValueTextFormatterForHandle,
      styles: styles || {},
      classNames: classNames || {}
    };
  }, [mergedMin, mergedMax, direction, disabled, keyboard, mergedStep, included, includedStart, includedEnd, rangeEnabled, tabIndex, ariaLabelForHandle, ariaLabelledByForHandle, ariaRequired, ariaValueTextFormatterForHandle, styles, classNames]);

  // ============================ Render ============================
  return /*#__PURE__*/React.createElement(SliderContext.Provider, {
    value: context
  }, /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    className: cls(prefixCls, className, _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-disabled"), disabled), "".concat(prefixCls, "-vertical"), vertical), "".concat(prefixCls, "-horizontal"), !vertical), "".concat(prefixCls, "-with-marks"), markList.length)),
    style: style,
    onMouseDown: onSliderMouseDown,
    id: id
  }, /*#__PURE__*/React.createElement("div", {
    className: cls("".concat(prefixCls, "-rail"), classNames === null || classNames === void 0 ? void 0 : classNames.rail),
    style: _objectSpread(_objectSpread({}, railStyle), styles === null || styles === void 0 ? void 0 : styles.rail)
  }), track !== false && /*#__PURE__*/React.createElement(Tracks, {
    prefixCls: prefixCls,
    style: trackStyle,
    values: rawValues,
    startPoint: startPoint,
    onStartMove: mergedDraggableTrack ? onStartMove : undefined
  }), /*#__PURE__*/React.createElement(Steps, {
    prefixCls: prefixCls,
    marks: markList,
    marksObject: marks,
    dots: dots,
    style: dotStyle,
    activeStyle: activeDotStyle
  }), /*#__PURE__*/React.createElement(Handles, {
    ref: handlesRef,
    prefixCls: prefixCls,
    style: handleStyle,
    values: cacheValues,
    draggingIndex: draggingIndex,
    draggingDelete: draggingDelete,
    onStartMove: onStartMove,
    onOffsetChange: onHandleOffsetChange,
    onFocus: onFocus,
    onBlur: onBlur,
    marksObject: marks,
    handleRender: handleRender,
    activeHandleRender: activeHandleRender,
    handleInnerComponent: handleInnerComponent,
    handleActionComponent: handleActionComponent,
    onChangeComplete: finishChange,
    onDelete: rangeEditable ? onDelete : undefined
  }), /*#__PURE__*/React.createElement(Marks, {
    prefixCls: prefixCls,
    marks: markList,
    onClick: changeToCloseValue
  })));
});
if (process.env.NODE_ENV !== 'production') {
  WeekSlider.displayName = 'WeekSlider';
}
export default WeekSlider;