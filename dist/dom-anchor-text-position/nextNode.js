/**
 * Return the next node after `node` in a tree order traversal of the document.
 */
function nextNode(node, skipChildren) {
    if (skipChildren === void 0) { skipChildren = false; }
    if (!skipChildren && node.firstChild) {
        return node.firstChild;
    }
    var n = node;
    do {
        if (n.nextSibling) {
            return n.nextSibling;
        }
        n = n.parentNode;
    } while (n);
    return n;
}
export { nextNode };
