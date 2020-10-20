import { expect } from 'chai';
import 'mocha';
import { JSDOM } from 'jsdom';
import htmlMock from '../mocks/html';
import toRange from '../../src/dom-anchor-text-quote/toRange';

function simplify(str) {
  return str.replace(/\s+/g, ' ');
}

describe('DOM anchor text quote - toRange', () => {
  let dom: JSDOM;
  let root: HTMLElement;

  beforeEach(() => {
    dom = new JSDOM(htmlMock);

    // globals
    global.Node = dom.window.Node;

    const { document } = dom.window;
    root = document.getElementById('root');
  });

  it('finds an exact quote', () => {
    const exact = 'commodo vitae';
    const range = toRange(root, { exact });
    const text = range.toString();
    expect(text).equal(exact);
  });

  it('finds an exact quote longer than 32 characters', () => {
    const exact = 'Quisque sit amet est et sapien ullamcorper pharetra';
    const range = toRange(root, { exact });
    const text = range.toString();
    expect(text).equal(exact);
  });

  it('finds a close exact quote', () => {
    const exact = 'commodo cites';
    const range = toRange(root, { exact });
    const text = range.toString();
    expect(text).equal('commodo vitae');
  });

  it('finds a n exact quote using context', () => {
    const exact = 'commodo vitae';
    const prefix = 'condimentum sed, ';
    const suffix = ', ornare sit amet';
    const range = toRange(root, { exact, prefix, suffix });
    const text = range.toString();
    expect(text).equal(exact);
  });

  it('finds a close quote using context', () => {
    const exact = 'commodo cites';
    const prefix = 'condimentum sed, ';
    const suffix = ', ornare sit amet';
    const range = toRange(root, { exact, prefix, suffix });
    const text = range.toString();
    expect(text).equal('commodo vitae');
  });

  it('can disambiguate using the prefix', () => {
    const exact = 'on';
    const prefix = 'Donec n';
    const range = toRange(root, { exact, prefix });
    const text = range.toString();
    const textNode = range.commonAncestorContainer;
    const anchorNode = textNode.parentNode as HTMLElement;
    expect(text).equal('on');
    expect(anchorNode.tagName).equal('A');
  });

  it('can disambiguate using the suffix', () => {
    const exact = 'on';
    const suffix = ' enim in';
    const range = toRange(root, { exact, suffix });
    const text = range.toString();
    const textNode = range.commonAncestorContainer;
    const anchorNode = textNode.parentNode as HTMLElement;
    expect(text).equal('on');
    expect(anchorNode.tagName).equal('A');
  });

  it('succeeds with the best match even if the context fails', () => {
    const exact = 'commodo vitae';
    const prefix = 'bogomips';
    const suffix = 'bogomips';
    const range = toRange(root, { exact, prefix, suffix });
    const text = range.toString();
    expect(text).equal('commodo vitae');
  });

  it('returns null when the quote is not found', () => {
    const exact = 'bogus';
    const range = toRange(root, { exact });
    expect(range).to.be.null;
  });

  it('returns null when a long quote is not found', () => {
    const exactArr = [
      // Long quote whose first 32 chars match, but whose remainder does not
      'Quisque sit amet est et sapien ullam triceracorn',

      // Long quote where no part matches
      'This is a long quote which does not match any part of the text',

      // Long quote where the start and end match but a chunk in the middle
      // does not
      simplify(`Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas. *** DOES NOT MATCH*** tortor
          quam, feugiat vitae, ultricies eget, *** DOES NOT MATCH ***. Donec
          eu libero sit amet quam egestas semper.`)
    ];

    exactArr.forEach((exact) => {
      const range = toRange(root, { exact });
      expect(range).to.be.null;
    });
  });

  it('uses a hint option to prioritize matches', () => {
    const exact = 'Aenean';
    const first = root.textContent.indexOf('Aenean');
    const last = root.textContent.lastIndexOf('Aenean');
    const rangeFirst = toRange(root, { exact }, { hint: first });
    const rangeLast = toRange(root, { exact }, { hint: last });
    expect(rangeFirst.startContainer).not.equal(rangeLast.startContainer);
  });
});
