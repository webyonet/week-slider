import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import classNames from 'classnames';
import * as React from 'react';
import SliderContext from "../context";
import { getDirectionStyle } from "../util";
var Dot = function Dot(props) {
  var prefixCls = props.prefixCls,
    value = props.value,
    style = props.style,
    activeStyle = props.activeStyle,
    marksObject = props.marksObject;
  var _React$useContext = React.useContext(SliderContext),
    min = _React$useContext.min,
    max = _React$useContext.max,
    direction = _React$useContext.direction,
    included = _React$useContext.included,
    includedStart = _React$useContext.includedStart,
    includedEnd = _React$useContext.includedEnd;
  var dotClassName = "".concat(prefixCls, "-dot");
  var active = included && includedStart <= value && value <= includedEnd;
  var entity = marksObject[value];

  // ============================ Offset ============================
  var mergedStyle = _objectSpread(_objectSpread({}, getDirectionStyle(direction, value, min, max, entity === null || entity === void 0 ? void 0 : entity.positionFixer)), typeof style === 'function' ? style(value) : style);
  if (active) {
    mergedStyle = _objectSpread(_objectSpread({}, mergedStyle), typeof activeStyle === 'function' ? activeStyle(value) : activeStyle);
  }
  return /*#__PURE__*/React.createElement("span", {
    className: classNames(dotClassName, entity === null || entity === void 0 ? void 0 : entity.className, _defineProperty(_defineProperty({}, "".concat(dotClassName, "-active"), active), 'center', (entity === null || entity === void 0 ? void 0 : entity.positionFixer) % 2 === 0)),
    style: mergedStyle
  });
};
export default Dot;