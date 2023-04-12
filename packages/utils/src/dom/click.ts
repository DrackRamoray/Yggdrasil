export const click = (node: HTMLElement) => {
  const evt = new MouseEvent('click');
  node.dispatchEvent(evt);
};
