import * as textPosition from 'dom-anchor-text-position';
import { TextSelector } from './interfaces';
import toTextPosition from './toTextPosition';

const toRange = (
  root: HTMLElement,
  selector: TextSelector,
  options: {
    hint?: number;
  } = {}
): TextSelector => {
  const position = toTextPosition(root, selector, options);
  if (position === null) {
    return null;
  }
  return textPosition.toRange(root, position);
};

export default toRange;
