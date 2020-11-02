import { rangeToString } from '.';
import { Selector } from '../types';

function fromRange(root: Node, range: Range): Selector {
  let start = 0;
  let end = 0;
  if (root && range) {
    const document = root.ownerDocument;
    const prefix = document.createRange();

    const {
      startContainer: startNode,
      startOffset
    } = range;

    prefix.setStart(root, 0);
    prefix.setEnd(startNode, startOffset);

    start = +rangeToString(prefix).length;
    end = start + rangeToString(range).length;
  }
  return ({ start, end });
}

export { fromRange };
