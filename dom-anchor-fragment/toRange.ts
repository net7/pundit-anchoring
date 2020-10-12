const toRange = (
  root: HTMLElement,
  id: string
): Range => {
  const el = root.querySelector(`#${id}`);
  if (el === null) {
    throw new Error(`no element found with id "${id}"`);
  }

  const range = root.ownerDocument.createRange();
  range.selectNodeContents(el);

  return range;
};

export default toRange;
