import { should } from 'chai';
import { JSDOM } from 'jsdom';
import 'mocha';
import { toRange } from '../../src/dom-anchor-text-position';
import htmlMock from '../mocks/ugly-html';

should(); // enable should assertions

describe('DOM anchor text position', () => {
  let dom: JSDOM;
  let root: HTMLElement;
  let document: Document;

  beforeEach(() => {
    dom = new JSDOM(htmlMock);
    global.Node = dom.window.Node;
    document = dom.window.document;
    root = document.createElement('div');
    root.innerHTML = htmlMock;
  });

  describe('toRange', () => {
    it('returns a range selecting a whole text node', () => {
      const expected = 'commodo vitae';
      const start = root.textContent.indexOf(expected); // 382
      const end = start + expected.length;
      const range = toRange(root, { start, end });
      const text = range.toString();
      text.should.be.equal(expected);
    });

    it('returns a range selecting part of a text node', () => {
      const expected = 'do vit';
      const start = root.textContent.indexOf(expected);
      const end = start + expected.length;
      const range = toRange(root, { start, end });
      const text = range.toString();
      text.should.be.equal(expected);
    });

    it('returns a range selecting part of multiple text nodes', () => {
      const expected = 'do vitae, ornare';
      const start = root.textContent.indexOf(expected);
      const end = start + expected.length;
      const range = toRange(root, { start, end });
      const text = range.toString();
      text.should.to.equal(expected);
    });

    it('defaults to a collapsed range', () => {
      const range = toRange(root);
      range.collapsed.should.be.true;
    });

    // broken
    it('returns a range selecting the first text of the root element', () => {
      const expected = 'Pellentesque';
      const start = 0;
      const end = expected.length;
      const range = toRange(root, { start, end });
      const text = range.toString();
      text.should.be.equal(expected);
    });

    // broken
    it('returns a range selecting the last text of the root element', () => {
      const expected = 'erat.';
      const end = root.textContent.length;
      const start = end - 5;
      const range = toRange(root, { start, end });
      const text = range.toString();
      text.should.be.equal(expected);
    });

    it('returns an empty range selecting the end of the root element', () => {
      const end = root.textContent.length;
      const range = toRange(root, { start: end, end });
      const text = range.toString();
      text.should.be.equal('');
    });

    it('throws an error if the start offset is out of range', () => {
      (() => toRange(root, { start: 10000, end: 10001 }))
        .should.throw(RangeError);
    });

    it('throws an error if the end offset is out of range', () => {
      (() => toRange(root, { start: 0, end: 10000 }))
        .should.throw(RangeError);
    });

    it('handles an empty root element', () => {
      const r = document.createElement('div');
      (() => toRange(r, { start: 0, end: 0 }))
        .should.throw(RangeError);
    });

    it('handles a root element with an empty text node', () => {
      const r = document.createElement('div');
      r.appendChild(document.createTextNode(''));
      const range = toRange(r, { start: 0, end: 0 });
      range.toString().should.be.equal('');
    });

    it('handles and "end" offset less than the "start" offset', () => {
      const expected = 'do vit';
      const start = root.textContent.indexOf(expected);
      const end = start + expected.length;
      const range = toRange(root, { start: end, end: start });
      const text = range.toString();
      text.should.be.equal('');
    });
  });
});
