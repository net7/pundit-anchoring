import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import 'mocha';
import { fromRange } from '../../dom-anchor-text-position/src/fromRange';
import htmlMock from './mocks/html';

describe('DOM anchor text position', () => {
  let dom: JSDOM;
  let root: HTMLElement;
  let range: Range;
  let codeNode: Node;
  let emNode: Node;

  beforeEach(() => {
    dom = new JSDOM(htmlMock);
    global.Node = dom.window.Node;
    const { document } = dom.window;
    root = document.createElement('div');
    root.innerHTML = htmlMock;
    range = document.createRange();
    codeNode = root.querySelector('code');
    emNode = root.querySelector('em');
  });

  describe('fromRange', () => {
    it('can describe part of a single text node', () => {
      const textNode = codeNode.childNodes[0];
      range.setStart(textNode, 5);
      range.setEnd(textNode, 12);
      const { start, end } = fromRange(root, range);
      const text = root.textContent.substr(start, end - start);
      expect(text).to.be.equal('do vita');
    });

    it('can describe a whole, single text node', () => {
      const textNode = codeNode.childNodes[0];
      range.selectNodeContents(textNode);
      const { start, end } = fromRange(root, range);
      const text = root.textContent.substr(start, end - start);
      expect(text).to.be.equal('commodo vitae');
    });

    it('can describe a range from one text node to another', () => {
      const emText = emNode.childNodes[0];
      const codeText = codeNode.childNodes[0];
      range.setStart(emText, 7);
      range.setEnd(codeText, 7);
      const { start, end } = fromRange(root, range);
      const text = root.textContent.substr(start, end - start);
      expect(text).to.be.equal([
        'ultricies mi vitae est.',
        ' Mauris placerat eleifend\n  leo. Quisque sit amet est',
        ' et sapien ullamcorper pharetra. Vestibulum erat\n',
        '  wisi, condimentum sed, commodo',
      ].join(''));
    });

    it('can describe a whole, single element', () => {
      range.selectNodeContents(codeNode);
      const { start, end } = fromRange(root, range);
      const text = root.textContent.substr(start, end - start);
      expect(text).to.be.equal('commodo vitae');
    });

    it('can describe a range between two elements', () => {
      range.setStartBefore(emNode);
      range.setEndAfter(codeNode);
      const { start, end } = fromRange(root, range);
      const text = root.textContent.substr(start, end - start);
      const expected = [
        'Aenean ultricies mi vitae est.',
        ' Mauris placerat eleifend\n  leo. Quisque sit amet est',
        ' et sapien ullamcorper pharetra. Vestibulum erat\n',
        '  wisi, condimentum sed, commodo vitae',
      ].join('');
      expect(text).to.be.equal(expected);
    });

    it('can describe a range between an element and a text node', () => {
      const codeText = codeNode.childNodes[0];
      range.setStartBefore(emNode);
      range.setEnd(codeText, 7);
      const { start, end } = fromRange(root, range);
      const text = root.textContent.substr(start, end - start);
      const expected = [
        'Aenean ultricies mi vitae est.',
        ' Mauris placerat eleifend\n  leo. Quisque sit amet est',
        ' et sapien ullamcorper pharetra. Vestibulum erat\n',
        '  wisi, condimentum sed, commodo',
      ].join('');
      expect(text).to.be.equal(expected);
    });

    it('can describe a range between a text node and an element', () => {
      const emText = emNode.childNodes[0];
      range.setStart(emText, 7);
      range.setEndAfter(codeNode);
      const { start, end } = fromRange(root, range);
      const text = root.textContent.substr(start, end - start);
      const expected = [
        'ultricies mi vitae est.',
        ' Mauris placerat eleifend\n  leo. Quisque sit amet est',
        ' et sapien ullamcorper pharetra. Vestibulum erat\n',
        '  wisi, condimentum sed, commodo vitae',
      ].join('');
      expect(text).to.be.equal(expected);
    });

    it('can describe a range starting at an empty element', () => {
      const hrEl = root.querySelector('hr');
      range.setStart(hrEl, 0);
      range.setEnd(hrEl.nextSibling.nextSibling.firstChild, 16);
      const { start, end } = fromRange(root, range);
      const text = root.textContent.substr(start, end - start);
      expect(text).to.be.equal('\nPraesent dapibus');
    });

    it('can describe a range ending at an empty element', () => {
      const hrEl = root.querySelector('hr');
      const prevText = hrEl.previousSibling.previousSibling.lastChild;
      range.setStart(prevText, prevText.textContent.length - 9);
      range.setEnd(hrEl, 0);
      const { start, end } = fromRange(root, range);
      const text = root.textContent.substr(start, end - start);
      expect(text).to.be.equal('Ut felis.\n');
    });

    it('can describe a range beginning at the end of a non-empty element', () => {
      const strongEl = root.querySelector('strong');
      range.setStart(strongEl, 1);
      range.setEnd(strongEl.nextSibling, 9);
      const { start, end } = fromRange(root, range);
      const text = root.textContent.substr(start, end - start);
      expect(text).to.be.equal(' senectus');
    });

    it('can describe a collapsed range', () => {
      const strongEl = root.querySelector('strong');
      range.setStart(strongEl.firstChild, 10);
      range.setEnd(strongEl.firstChild, 5);
      const { start, end } = fromRange(root, range);
      const text = root.textContent.substr(start, end - start);
      expect(text).to.be.equal('');
    });
  });
});
