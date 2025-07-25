"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDirectionStyle = getDirectionStyle;
exports.getIndex = getIndex;
exports.getOffset = getOffset;
function getOffset(value, min, max) {
  return (value - min) / (max - min);
}
function getDirectionStyle(direction, value, min, max) {
  var positionFixer = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var offset = getOffset(value, min, max);
  var fixer = positionFixer ? getOffset(value - positionFixer, min, max) : 0;
  if (fixer) {
    var diff = getOffset(1, min, max);
    fixer += diff * positionFixer;
    offset = fixer;
  }
  var positionStyle = {};
  switch (direction) {
    case 'rtl':
      positionStyle.right = "".concat(offset * 100, "%");
      positionStyle.transform = 'translateX(50%)';
      break;
    case 'btt':
      positionStyle.bottom = "".concat(offset * 100, "%");
      positionStyle.transform = 'translateY(50%)';
      break;
    case 'ttb':
      positionStyle.top = "".concat(offset * 100, "%");
      positionStyle.transform = 'translateY(-50%)';
      break;
    default:
      positionStyle.left = "".concat(offset * 100, "%");
      positionStyle.transform = 'translateX(-50%)';
      break;
  }
  return positionStyle;
}

/** Return index value if is list or return value directly */
function getIndex(value, index) {
  return Array.isArray(value) ? value[index] : value;
}