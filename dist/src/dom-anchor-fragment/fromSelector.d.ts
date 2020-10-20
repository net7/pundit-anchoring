declare const fromSelector: (root: HTMLElement, selector: {
    value: string;
}) => {
    root: HTMLElement;
    id: string | null;
};
export default fromSelector;
