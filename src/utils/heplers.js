import { methodProxy } from './proxy';

/**
 * transform seconds to time like hh:mm:ss
 * @param {number} seconds
 */
export function secondsToTime(seconds) {
  const hour = Math.floor(seconds / 3600);
  seconds = seconds % 3600;
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return (hour > 0 ? [hour, min, sec] : [min, sec])
    .map((item) => (item < 10 ? `0${item}` : `${item}`))
    .join(':');
}

/**
 * TODO
 * @param {*} target
 * @param  {...any} sources
 */
export function initProxy(target, ...sources) {
  // prototype methods proxy
  if (target?.prototype?.constructor === target) {
    sources.forEach((source) => {
      const [prop, methodNames] = source;
      methodNames.forEach((methodName) =>
        methodProxy(target.prototype, prop, methodName)
      );
    });
  }
  // instance props proxy
  else {
    // TODO
  }
}
