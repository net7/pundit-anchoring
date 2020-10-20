import { Anchoring } from '@pundit-3/common';
import * as textPosition from '../../src/dom-anchor-text-position';
import fromTextPosition from './fromTextPosition';

const fromRange = (
  root: HTMLElement,
  range: Range
): Anchoring.TextQuoteSelector => {
  const position = textPosition.fromRange(root, range);
  return fromTextPosition(root, position);
};

export default fromRange;
