declare type Selector = {
    start: number;
    end: number;
};
declare function fromRange(root: Node, range: Range): Selector;
export { fromRange };
