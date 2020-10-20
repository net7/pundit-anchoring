import * as textPosition from '../dom-anchor-text-position';
import { TextQuoteSelector } from './interfaces';
import toTextPosition from './toTextPosition';

const toRange = (
  root: HTMLElement,
  selector: TextQuoteSelector,
  options: {
    hint?: number;
  } = {}
): Range => {
  const position = toTextPosition(root, selector, options);
  if (position === null) {
    return null;
  }
  return textPosition.toRange(root, position);
};

export default toRange;
