import { nextNode } from './nextNode';

/**
 * Returns the first node from an HTML Range
 * @param range an HTML Range element
 */
function firstNode(range: Range): Node {
  if (range.startContainer.nodeType === Node.ELEMENT_NODE) {
    const node = range.startContainer.childNodes[range.startOffset];
    return node || nextNode(range.startContainer, true /* skip children */);
  }
  return range.startContainer;
}

export { firstNode };
