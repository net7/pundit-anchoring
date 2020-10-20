import { expect } from 'chai';
import 'mocha';
import { JSDOM } from 'jsdom';
import htmlMock from '../mocks/html';
import fromSelector from '../../src/dom-anchor-fragment/fromSelector';

describe('DOM anchor fragment - fromSelector', () => {
  let dom: JSDOM;
  let root: HTMLElement;

  beforeEach(() => {
    dom = new JSDOM(htmlMock);

    const { document } = dom.window;
    root = document.getElementById('root');
  });

  it('returns an id equals to the value of the selector', () => {
    const selector = {
      value: 'test-id',
    };
    const result = fromSelector(root, selector);
    expect(result.id).eq(selector.value);
  });
});
