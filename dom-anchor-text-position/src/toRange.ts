import { seek } from './index';

const SHOW_TEXT = 4;

function toRange(root: Node, selector = { start: 0, end: 0 }): Range {
  const document = root.ownerDocument;
  const range = document.createRange();
  const iter = document.createNodeIterator(root, SHOW_TEXT);
  const start = selector.start || 0;
  const end = selector.end || start;
  const startOffset = start - seek(iter, start);
  const startNode = iter.referenceNode;
  const remainder = end - start + startOffset;
  const endOffset = remainder - seek(iter, remainder);
  const endNode = iter.referenceNode;

  range.setStart(startNode, startOffset);
  range.setEnd(endNode, endOffset);

  return range;
}

export { toRange };
