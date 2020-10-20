import { TextQuotePosition, TextQuoteSelector } from './interfaces';

// The DiffMatchPatch bitap has a hard 32-character pattern length limit.
const SLICE_LENGTH = 32;
const CONTEXT_LENGTH = SLICE_LENGTH;

const fromTextPosition = (
  root: HTMLElement,
  position: TextQuotePosition
): TextQuoteSelector => {
  const { start, end } = position;
  const exact = root.textContent.substr(start, end - start);
  const prefixStart = Math.max(0, start - CONTEXT_LENGTH);
  const prefix = root.textContent.substr(prefixStart, start - prefixStart);
  const suffixEnd = Math.min(root.textContent.length, end + CONTEXT_LENGTH);
  const suffix = root.textContent.substr(end, suffixEnd - end);

  return { exact, prefix, suffix };
};

export default fromTextPosition;
