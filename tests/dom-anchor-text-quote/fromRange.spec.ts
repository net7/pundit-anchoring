import { expect } from 'chai';
import 'mocha';
import { JSDOM } from 'jsdom';
import htmlMock from '../mocks/html';
import fromRange from '../../src/dom-anchor-text-quote/fromRange';

describe('DOM anchor text quote - fromRange', () => {
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

  it('returns a text quote selector with context', () => {
    const node = root.querySelector('code');
    range.selectNodeContents(node);
    const selector = fromRange(root, range);
    expect(selector.exact).equal('commodo vitae');
    expect(selector.prefix).include('wisi, condimentum sed, ');
    expect(selector.suffix).include(', ornare sit amet');
  });
});
