var HTML_CONFORMS_TO_TEXT = 'https://tools.ietf.org/html/rfc3236';
var SVG_CONFORMS_TO_TEXT = 'http://www.w3.org/TR/SVG/';
var toSelector = function (root, id) {
    var el = root.querySelector("#" + id);
    if (el === null) {
        throw new Error("no element found with id \"" + id + "\"");
    }
    return {
        type: 'FragmentSelector',
        value: id,
        conformsTo: el instanceof SVGElement
            ? SVG_CONFORMS_TO_TEXT
            : HTML_CONFORMS_TO_TEXT,
    };
};
export default toSelector;
