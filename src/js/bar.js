class Bar {
  constructor (template) {
    this.el = {}
    this.el.played = template.played
    this.el.loaded = template.loaded
    this.el.volume = template.volumeBar
  }

  set (type, percentage, widthOrHeight) {
    this.el[type].style[widthOrHeight] = `${ percentage * 100 }%`
  }
}

export default Bar
