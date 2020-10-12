import { expect } from 'chai';
import 'mocha';
import { JSDOM } from 'jsdom';
import fromRange from '../../dom-anchor-fragment/fromRange';

describe('DOM Anchor fragment - fromRange', () => {
  let dom: JSDOM;
  let root: HTMLElement;
  let range: Range;

  beforeEach(() => {
    dom = new JSDOM(`
      <html>
        <body>
          <div id="root">
            <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et
            malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
            ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas
            semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend
            leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat
            wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet,
            wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum
            orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in
            turpis pulvinar facilisis. Ut felis.</p>
          </div>
        </body>
      </html>
    `);

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
