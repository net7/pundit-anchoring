import { forEachNodeInRange } from '.';
function rangeToString(range) {
    var text = '';
    forEachNodeInRange(range, function (node) {
        if (node.nodeType !== Node.TEXT_NODE) {
            return;
        }
        var start = node === range.startContainer ? range.startOffset : 0;
        var end = node === range.endContainer ? range.endOffset : node.textContent.length;
        text += node.textContent.slice(start, end);
    });
    return text;
}
export { rangeToString };
