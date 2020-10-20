import * as textPosition from '../../src/dom-anchor-text-position';
import fromTextPosition from './fromTextPosition';
var fromRange = function (root, range) {
    var position = textPosition.fromRange(root, range);
    return fromTextPosition(root, position);
};
export default fromRange;
