const fromRange = (
  root: HTMLElement,
  range: Range
): {
  root: HTMLElement;
  id: string | null;
} => {
  let el = range.commonAncestorContainer as HTMLElement;

  while (el !== null && !el.id) {
    if (root.compareDocumentPosition(el) && Node.DOCUMENT_POSITION_CONTAINED_BY) {
      el = el.parentElement;
    } else {
      throw new Error('no fragment identifier found');
    }
  }

  return { root, id: el ? el.id : null };
};

export default fromRange;
