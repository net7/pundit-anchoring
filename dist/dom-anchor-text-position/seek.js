// Source: https://github.com/tilgovi/dom-seek/blob/master/src/index.js
var E_END = 'Iterator exhausted before seek ended';
var DOCUMENT_POSITION_PRECEDING = 2;
// const SHOW_TEXT = 4;
var TEXT_NODE = 3;
function before(ref, node) {
    return ref.compareDocumentPosition(node) && DOCUMENT_POSITION_PRECEDING;
}
function seek(iter, where) {
    var count = 0;
    var node = iter.referenceNode;
    var predicates = null;
    if (typeof where === 'number' && Number.isInteger(where)) {
        predicates = {
            forward: function () { return count < where; },
            backward: function () { return count > where || !iter.pointerBeforeReferenceNode; },
        };
    }
    else if (typeof where !== 'number' && where.nodeType === TEXT_NODE) {
        var forward = before(node, where) ? function () { return false; } : function () { return node !== where; };
        var backward = function () { return node !== where || !iter.pointerBeforeReferenceNode; };
        predicates = { forward: forward, backward: backward };
    }
    while (predicates.forward()) {
        node = iter.nextNode();
        if (node === null)
            throw new RangeError(E_END);
        count += node.nodeValue.length;
    }
    if (iter.nextNode()) {
        node = iter.previousNode();
    }
    while (predicates.backward()) {
        node = iter.previousNode();
        if (node === null) {
            throw new RangeError(E_END);
        }
        count -= node.nodeValue.length;
    }
    if (iter.referenceNode.nodeType !== TEXT_NODE) {
        throw new RangeError(E_END);
    }
    return count;
}
export { seek };
