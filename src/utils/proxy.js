export function methodProxy(target, prop, methodName) {
  target[methodName] = function (...args) {
    return this[prop]?.[methodName](...args);
  };
}
