import { TextQuoteSelector, TextPosition } from '../types';
declare const toTextPosition: (root: HTMLElement, selector: TextQuoteSelector, options?: {
    hint?: number;
}) => TextPosition;
export default toTextPosition;
