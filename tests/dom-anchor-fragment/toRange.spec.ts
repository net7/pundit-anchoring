import { expect } from 'chai';
import 'mocha';
import { JSDOM } from 'jsdom';
import htmlMock from '../mocks/html';
import toRange from '../../dom-anchor-fragment/toRange';

describe('DOM anchor fragment - toRange', () => {
  let dom: JSDOM;
  let body: HTMLElement;
  let root: HTMLElement;

  beforeEach(() => {
    dom = new JSDOM(htmlMock);

    const { document } = dom.window;
    body = document.body;
    root = document.getElementById('root');
  });

  it('throws an error if no element exists with the stored id', () => {
    expect(() => {
      toRange(root, 'bogus');
    }).to.throw('no element found');
  });

  it('returns a range selecting the contents of the element', () => {
    const range = toRange(body, root.id);
    expect(range.commonAncestorContainer).eq(root);
  });
});
