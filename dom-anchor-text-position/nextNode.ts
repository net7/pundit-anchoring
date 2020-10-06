/**
 * Return the next node after `node` in a tree order traversal of the document.
 */
function nextNode(node: Node, skipChildren = false): Node {
  if (!skipChildren && node.firstChild) {
    return node.firstChild;
  }
  let n = node;
  do {
    if (n.nextSibling) {
      return n.nextSibling;
    }
    n = n.parentNode;
  } while (n);

  return n;
}

export default nextNode;
