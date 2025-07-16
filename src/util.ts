import type { Direction } from './interface';

export function getOffset(value: number, min: number, max: number) {
  return (value - min) / (max - min);
}

export function getDirectionStyle(direction: Direction, value: number, min: number, max: number, positionFixer: number = null) {
  let offset = getOffset(value, min, max);

  let fixer = positionFixer ? (getOffset(value - positionFixer, min, max)) : 0;

  if (fixer) {
    const diff = getOffset(1, min, max);

    fixer += diff * positionFixer;

    offset = fixer;
  }

  const positionStyle: React.CSSProperties = {};

  switch (direction) {
    case 'rtl':
      positionStyle.right = `${offset * 100}%`;
      positionStyle.transform = 'translateX(50%)';
      break;

    case 'btt':
      positionStyle.bottom = `${offset * 100}%`;
      positionStyle.transform = 'translateY(50%)';
      break;

    case 'ttb':
      positionStyle.top = `${offset * 100}%`;
      positionStyle.transform = 'translateY(-50%)';
      break;

    default:
      positionStyle.left = `${offset * 100}%`;
      positionStyle.transform = 'translateX(-50%)';
      break;
  }

  return positionStyle;
}

/** Return index value if is list or return value directly */
export function getIndex<T>(value: T | T[], index: number) {
  return Array.isArray(value) ? value[index] : value;
}
