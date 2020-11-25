// The DiffMatchPatch bitap has a hard 32-character pattern length limit.
var SLICE_LENGTH = 32;
var CONTEXT_LENGTH = SLICE_LENGTH;
var fromTextPosition = function (root, position) {
    var start = position.start, end = position.end;
    var exact = root.textContent.substr(start, end - start);
    var prefixStart = Math.max(0, start - CONTEXT_LENGTH);
    var prefix = root.textContent.substr(prefixStart, start - prefixStart);
    var suffixEnd = Math.min(root.textContent.length, end + CONTEXT_LENGTH);
    var suffix = root.textContent.substr(end, suffixEnd - end);
    return { exact: exact, prefix: prefix, suffix: suffix };
};
export default fromTextPosition;
