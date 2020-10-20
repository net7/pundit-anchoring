/**
 * Calls the callback function for each Node in the Range object
 * @param range A Range object
 * @param cb A callback function
 */
declare function forEachNodeInRange(range: Range, cb: (x: Node) => any): void;
export { forEachNodeInRange };
