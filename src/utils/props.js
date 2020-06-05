/**
 * TODO
 * @param {*} target
 * @param {*} source
 * @param {*} methods
 */
export function proxyMethods(target, source, methods) {
  methods.forEach((method) => {
    if (source[method]) {
      target[method] = (...args) => source[method](...args);
    }
  });
}
