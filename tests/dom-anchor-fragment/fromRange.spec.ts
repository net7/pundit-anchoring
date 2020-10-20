import { expect } from 'chai';
import 'mocha';
import { JSDOM } from 'jsdom';
import { fromRange } from '../../src/dom-anchor-fragment';
import htmlMock from '../mocks/html';

describe('DOM anchor fragment - fromRange', () => {
  let dom: JSDOM;
  let root: HTMLElement;
  let range: Range;

  beforeEach(() => {
    dom = new JSDOM(htmlMock);

    // globals
    global.Node = dom.window.Node;

    const { document } = dom.window;
    root = document.getElementById('root');
    range = document.createRange();
  });

  it('returns id equals null if no fragment identifier is found', () => {
    range.selectNode(root);
    const result = fromRange(root, range);
    expect(result.id).is.null;
  });

  it('returns id equals to common ancestor id', () => {
    range.selectNodeContents(root);
    const result = fromRange(root, range);
    expect(result.id).eq(root.id);
  });

  it('returns id equals to any ancestor id', () => {
    range.selectNodeContents(root.children[0]);
    const result = fromRange(root, range);
    expect(result.id).eq(root.id);
  });
});
