/**
 * TODO
 * @param {number} seconds
 */
export function secondsToTime(seconds) {
  const hour = Math.floor(seconds / 3600);
  const min = Math.floor((seconds - hour * 3600) / 60);
  const sec = Math.floor(seconds - hour * 3600 - min * 60);
  return (hour > 0 ? [hour, min, sec] : [min, sec])
    .map((item) => (item < 10 ? `0${item}` : `${item}`))
    .join(':');
}
