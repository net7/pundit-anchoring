import { forEachNodeInRange } from '.';

function rangeToString(range: Range): string {
  let text = '';
  forEachNodeInRange(range, (node) => {
    if (node.nodeType !== Node.TEXT_NODE) {
      return;
    }
    const start = node === range.startContainer ? range.startOffset : 0;
    const end = node === range.endContainer ? range.endOffset : node.textContent.length;
    text += node.textContent.slice(start, end);
  });
  return text;
}

export { rangeToString };
