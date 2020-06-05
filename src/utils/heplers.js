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
