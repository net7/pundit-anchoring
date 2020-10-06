const fromRange = (root: HTMLElement, range: Range): string | null => {
  let el = range.commonAncestorContainer as HTMLElement;
  let id: string | null;

  while (el !== null && !el.id) {
    if (root.compareDocumentPosition(el) && Node.DOCUMENT_POSITION_CONTAINED_BY) {
      el = el.parentElement;
      id = el.id;
    } else {
      id = null;
    }
  }

  return id;
};

export default fromRange;
