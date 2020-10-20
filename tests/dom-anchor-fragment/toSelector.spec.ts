import { expect } from 'chai';
import 'mocha';
import { JSDOM } from 'jsdom';
import { toSelector } from '../../src/dom-anchor-fragment';
import htmlMock from '../mocks/html';

describe('DOM anchor fragment - toSelector', () => {
  let dom: JSDOM;
  let body: HTMLElement;
  let root: HTMLElement;

  beforeEach(() => {
    dom = new JSDOM(htmlMock);

    // globals
    global.SVGElement = dom.window.SVGElement;
    global.document = dom.window.document;

    body = document.body;
    root = document.getElementById('root');
  });

  it('returns a selector from an HTMLElement', () => {
    const selector = toSelector(body, root.id);
    expect(selector).to.deep.equal({
      type: 'FragmentSelector',
      value: root.id,
      conformsTo: 'https://tools.ietf.org/html/rfc3236'
    });
  });

  it('returns a selector from an SVGElement', () => {
    const svg = document.createElementNS(
      'http://www.w3.org/2000/svg', 'svg'
    );
    const rect = document.createElementNS(
      'http://www.w3.org/2000/svg', 'rect'
    );
    rect.id = 'rectangle1';
    root.appendChild(svg);
    svg.appendChild(rect);
    const selector = toSelector(svg, rect.id);
    expect(selector).to.deep.equal({
      type: 'FragmentSelector',
      value: rect.id,
      conformsTo: 'http://www.w3.org/TR/SVG/'
    });
  });

  it('throws an error if no element exists with the stored id', () => {
    expect(() => {
      toSelector(root, 'bogus');
    }).to.throw('no element found');
  });
});
