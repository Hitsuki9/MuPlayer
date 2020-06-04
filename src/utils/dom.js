/**
 * TODO
 * @param {Element} el
 */
export function getElementLeft(el) {
  let actualLeft = el.offsetLeft;
  let parentEl = el.offsetParent;
  const scrollLeft = document.documentElement.scrollLeft;
  if (!document.fullscreenElement) {
    while (parentEl) {
      actualLeft += parentEl.offsetLeft;
      parentEl = parentEl.offsetParent;
    }
  } else {
    while (parentEl && parentEl !== el) {
      actualLeft += parentEl.offsetLeft;
      parentEl = parentEl.offsetParent;
    }
  }
  return actualLeft - scrollLeft;
}

/**
 * TODO
 * @param {*} parent
 */
export function getQuery(parent) {
  return (selector) => parent.querySelector(selector);
}
