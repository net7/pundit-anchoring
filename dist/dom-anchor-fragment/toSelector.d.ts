declare const toSelector: (root: HTMLElement | SVGSVGElement, id: string) => {
    type: 'FragmentSelector';
    value: string;
    conformsTo: string;
};
export default toSelector;
