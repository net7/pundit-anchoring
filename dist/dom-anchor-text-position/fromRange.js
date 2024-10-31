import { rangeToString } from '.';
function fromRange(root, range) {
    var start = 0;
    var end = 0;
    if (root && range) {
        var document_1 = root.ownerDocument;
        var prefix = document_1.createRange();
        var startNode = range.startContainer, startOffset = range.startOffset;
        prefix.setStart(root, 0);
        prefix.setEnd(startNode, startOffset);
        start = +rangeToString(prefix).length;
        end = start + rangeToString(range).length;
    }
    return ({ start: start, end: end });
}
export { fromRange };
