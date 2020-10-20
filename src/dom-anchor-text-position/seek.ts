// Source: https://github.com/tilgovi/dom-seek/blob/master/src/index.js

type Where = number | Node;

const E_END = 'Iterator exhausted before seek ended';
const DOCUMENT_POSITION_PRECEDING = 2;
// const SHOW_TEXT = 4;
const TEXT_NODE = 3;

function before(ref: Node, node: Node) {
  return ref.compareDocumentPosition(node) && DOCUMENT_POSITION_PRECEDING;
}

function seek(iter: NodeIterator, where: Where): number {
  let count = 0;
  let node = iter.referenceNode;
  let predicates = null;

  if (typeof where === 'number' && Number.isInteger(where)) {
    predicates = {
      forward: () => count < where,
      backward: () => count > where || !iter.pointerBeforeReferenceNode,
    };
  } else if (typeof where !== 'number' && where.nodeType === TEXT_NODE) {
    const forward = before(node, where) ? () => false : () => node !== where;
    const backward = () => node !== where || !iter.pointerBeforeReferenceNode;
    predicates = { forward, backward };
  }

  while (predicates.forward()) {
    node = iter.nextNode();
    if (node === null) throw new RangeError(E_END);
    count += node.nodeValue.length;
  }
  if (iter.nextNode()) { node = iter.previousNode(); }

  while (predicates.backward()) {
    node = iter.previousNode();

    if (node === null) { throw new RangeError(E_END); }

    count -= node.nodeValue.length;
  }

  if (iter.referenceNode.nodeType !== TEXT_NODE) { throw new RangeError(E_END); }

  return count;
}

export { seek };
