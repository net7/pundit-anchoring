const fromSelector = (
  root: HTMLElement,
  selector: { value: string }
): {
  root: HTMLElement;
  id: string | null;
} => ({ root, id: selector.value });

export default fromSelector;
