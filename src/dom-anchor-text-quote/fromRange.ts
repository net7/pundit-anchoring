import { TextQuoteSelector } from '../types';
import * as textPosition from '../dom-anchor-text-position';
import fromTextPosition from './fromTextPosition';

const fromRange = (
  root: HTMLElement,
  range: Range
): TextQuoteSelector => {
  const position = textPosition.fromRange(root, range);
  return fromTextPosition(root, position);
};

export default fromRange;
