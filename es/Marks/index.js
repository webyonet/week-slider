import * as React from 'react';
import Mark from "./Mark";
var Marks = function Marks(props) {
  var prefixCls = props.prefixCls,
    marks = props.marks,
    onClick = props.onClick;
  var markPrefixCls = "".concat(prefixCls, "-mark");

  // Not render mark if empty
  if (!marks.length) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: markPrefixCls
  }, marks.map(function (_ref) {
    var value = _ref.value,
      style = _ref.style,
      label = _ref.label,
      className = _ref.className,
      disabled = _ref.disabled;
    return /*#__PURE__*/React.createElement(Mark, {
      key: value,
      prefixCls: markPrefixCls,
      className: className,
      style: style,
      value: value,
      disabled: disabled,
      onClick: onClick
    }, label);
  }));
};
export default Marks;