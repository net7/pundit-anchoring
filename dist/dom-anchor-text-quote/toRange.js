import * as textPosition from '../dom-anchor-text-position';
import toTextPosition from './toTextPosition';
var toRange = function (root, selector, options) {
    if (options === void 0) { options = {}; }
    var position = toTextPosition(root, selector, options);
    if (position === null) {
        return null;
    }
    return textPosition.toRange(root, position);
};
export default toRange;
