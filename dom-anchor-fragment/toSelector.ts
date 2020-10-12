const HTML_CONFORMS_TO_TEXT = 'https://tools.ietf.org/html/rfc3236';
const SVG_CONFORMS_TO_TEXT = 'http://www.w3.org/TR/SVG/';

const toSelector = (
  root: HTMLElement | SVGSVGElement,
  id: string
): {
  type: 'FragmentSelector',
  value: string,
  conformsTo: string;
} => {
  const el = root.querySelector(`#${id}`);
  if (el === null) {
    throw new Error(`no element found with id "${id}"`);
  }

  return {
    type: 'FragmentSelector',
    value: id,
    conformsTo: el instanceof SVGElement
      ? SVG_CONFORMS_TO_TEXT
      : HTML_CONFORMS_TO_TEXT,
  };
};

export default toSelector;
