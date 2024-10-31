import { nextNode, firstNode, firstNodeAfter } from '.';
/**
 * Calls the callback function for each Node in the Range object
 * @param range A Range object
 * @param cb A callback function
 */
function forEachNodeInRange(range, cb) {
    var node = firstNode(range);
    var pastEnd = firstNodeAfter(range);
    while (node !== pastEnd) {
        cb(node);
        node = nextNode(node);
    }
}
export { forEachNodeInRange };
