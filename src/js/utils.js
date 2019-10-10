const utils = {
  getElementLeft (el) {
    let actualLeft = el.offsetLeft
    let parentEl = el.offsetParent
    const scrollLeft = document.documentElement.scrollLeft
    if (!document.fullscreenElement) {
      while (parentEl) {
        actualLeft += parentEl.offsetLeft
        parentEl = parentEl.offsetParent
      }
    } else {
      while (parentEl && parentEl !== el) {
        actualLeft += parentEl.offsetLeft
        parentEl = parentEl.offsetParent
      }
    }
    return actualLeft - scrollLeft
  },

  secondsToTime (seconds) {
    const hour = Math.floor(seconds / 3600)
    const min = Math.floor((seconds - hour * 3600) / 60)
    const sec = Math.floor(seconds - hour * 3600 - min * 60)
    return (hour > 0 ? [hour, min, sec] : [min, sec]).map(item => item < 10 ? `0${ item }` : `${ item }`).join(':')
  }
}

export default utils
