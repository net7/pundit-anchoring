import { expect } from 'chai';
import 'mocha';
import { JSDOM } from 'jsdom';
import htmlMock from '../mocks/html';
import fromTextPosition from '../../src/dom-anchor-text-quote/fromTextPosition';
import { TextQuotePosition } from '../../src/dom-anchor-text-quote/interfaces';

const position: TextQuotePosition = {
  start: 420,
  end: 433
};

describe('DOM anchor text quote - fromTextPosition', () => {
  let dom: JSDOM;
  let root: HTMLElement;

  beforeEach(() => {
    dom = new JSDOM(htmlMock);

    // globals
    global.Node = dom.window.Node;

    const { document } = dom.window;
    root = document.getElementById('root');
  });

  it('returns a text quote selector with context', () => {
    const selector = fromTextPosition(root, position);
    expect(selector.exact).equal('commodo vitae');
    expect(selector.prefix).include('wisi, condimentum sed, ');
    expect(selector.suffix).include(', ornare sit amet');
  });
});
