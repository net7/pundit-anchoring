import * as DiffMatchPatch from 'diff-match-patch';
var SLICE_LENGTH = 32;
var SLICE_RE = new RegExp("(.|[\r\n]){1," + String(SLICE_LENGTH) + "}", 'g');
var toTextPosition = function (root, selector, options) {
    if (options === void 0) { options = {}; }
    var exact = selector.exact, prefix = selector.prefix, suffix = selector.suffix;
    var hint = options.hint;
    var dmp = new DiffMatchPatch();
    // Work around a hard limit of the DiffMatchPatch bitap implementation.
    // The search pattern must be no more than SLICE_LENGTH characters.
    var slices = exact.match(SLICE_RE);
    var havePrefix = prefix !== undefined;
    var haveSuffix = suffix !== undefined;
    var loc = (hint === undefined) ? ((root.textContent.length / 2) | 0) : hint;
    var start = Number.POSITIVE_INFINITY;
    var end = Number.NEGATIVE_INFINITY;
    var result = -1;
    var foundPrefix = false;
    dmp.Match_Distance = root.textContent.length * 2;
    // If the prefix is known then search for that first.
    if (havePrefix) {
        result = dmp.match_main(root.textContent, prefix, loc);
        if (result > -1) {
            loc = result + prefix.length;
            foundPrefix = true;
        }
    }
    // If we have a suffix, and the prefix wasn't found, then search for it.
    if (haveSuffix && !foundPrefix) {
        result = dmp.match_main(root.textContent, suffix, loc + exact.length);
        if (result > -1) {
            loc = result - exact.length;
        }
    }
    // Search for the first slice.
    var firstSlice = slices.shift();
    result = dmp.match_main(root.textContent, firstSlice, loc);
    if (result > -1) {
        start = result;
        loc = start + firstSlice.length;
        end = start + firstSlice.length;
    }
    else {
        return null;
    }
    // Create a fold function that will reduce slices to positional extents.
    var foldSlices = function (acc, slice) {
        if (!acc) {
            // A search for an earlier slice of the pattern failed to match.
            return null;
        }
        var foldResult = dmp.match_main(root.textContent, slice, acc.loc);
        if (foldResult === -1) {
            return null;
        }
        // The next slice should follow this one closely.
        acc.loc = foldResult + slice.length;
        // Expand the start and end to a quote that includes all the slices.
        acc.start = Math.min(acc.start, foldResult);
        acc.end = Math.max(acc.end, foldResult + slice.length);
        return acc;
    };
    // Use the fold function to establish the full quote extents.
    // Expect the slices to be close to one another.
    // This distance is deliberately generous for now.
    dmp.Match_Distance = 64;
    var acc = slices.reduce(foldSlices, { start: start, end: end, loc: loc });
    if (!acc) {
        return null;
    }
    return { start: acc.start, end: acc.end };
};
export default toTextPosition;
