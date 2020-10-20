import { nextNode } from '.';
/**
 * Returns the first node after a Range
 */
function firstNodeAfter(range) {
    if (range.endContainer.nodeType === Node.ELEMENT_NODE) {
        var node = range.endContainer.childNodes[range.endOffset];
        return node || nextNode(range.endContainer, true /* skip children */);
    }
    return nextNode(range.endContainer);
}
export { firstNodeAfter };
