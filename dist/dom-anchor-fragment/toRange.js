var toRange = function (root, id) {
    var el = root.querySelector("#" + id);
    if (el === null) {
        throw new Error("no element found with id \"" + id + "\"");
    }
    var range = root.ownerDocument.createRange();
    range.selectNodeContents(el);
    return range;
};
export default toRange;
