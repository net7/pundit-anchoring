var fromRange = function (root, range) {
    var el = range.commonAncestorContainer;
    while (el !== null && !el.id) {
        if (root.compareDocumentPosition(el) && Node.DOCUMENT_POSITION_CONTAINED_BY) {
            el = el.parentElement;
        }
        else {
            throw new Error('no fragment identifier found');
        }
    }
    return { root: root, id: el ? el.id : null };
};
export default fromRange;
