import { root } from "../router/index.routes";

export function El({
  element,
  children,
  eventListener,
  dataset,
  restAttrs = {},
  className = "",
  style,
  ...rest
}) {
  const elem = document.createElement(element);
  for (const attr in rest) {
    elem[attr] = rest[attr];
  }
  if (children) {
    for (const child of children) {
      elem.append(child);
    }
  }
  if (eventListener) {
    eventListener.map((el) => elem.addEventListener(el.event, el.callback));
  }
  if (dataset) {
    for (const key in dataset) {
      elem.dataset[key] = dataset[key];
    }
  }

  if (style) {
    for (const key in style) {
      elem.style[key] = style[key];
    }
  }

  for (const key in restAttrs) {
    elem.setAttribute(key, restAttrs[key]);
  }
  elem.setAttribute("class", className);
  return elem;
}
