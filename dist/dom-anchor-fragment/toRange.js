var toRange = function (root, id) {
    var el = root.querySelector("#".concat(id));
    if (el === null) {
        throw new Error("no element found with id \"".concat(id, "\""));
    }
    var range = root.ownerDocument.createRange();
    range.selectNodeContents(el);
    return range;
};
export default toRange;
