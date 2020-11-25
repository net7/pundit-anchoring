import { seek } from './index';
var SHOW_TEXT = 4;
function toRange(root, selector) {
    if (selector === void 0) { selector = { start: 0, end: 0 }; }
    var document = root.ownerDocument;
    var range = document.createRange();
    var iter = document.createNodeIterator(root, SHOW_TEXT);
    var start = selector.start || 0;
    var end = selector.end || start;
    var startOffset = start - seek(iter, start);
    var startNode = iter.referenceNode;
    var remainder = end - start + startOffset;
    var endOffset = remainder - seek(iter, remainder);
    var endNode = iter.referenceNode;
    range.setStart(startNode, startOffset);
    range.setEnd(endNode, endOffset);
    return range;
}
export { toRange };
