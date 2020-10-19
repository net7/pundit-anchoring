import * as textPosition from 'dom-anchor-text-position';
import { TextSelector } from './interfaces';
import fromTextPosition from './fromTextPosition';

const fromRange = (
  root: HTMLElement,
  range: Range
): TextSelector => {
  const position = textPosition.fromRange(root, range);
  return fromTextPosition(root, position);
};

export default fromRange;
