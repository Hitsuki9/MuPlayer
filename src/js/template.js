import playerRender from '@template/player.art'
import icons from '@js/icons'

class Template {
  constructor (options) {
    this.container = options.container
    this.init(options)
  }
  init (options) {
    this.container.innerHTML = playerRender({
      options,
      icons
    })

    this.lrc = this.container.querySelector('.mu-player-lrc')
    this.list = this.container.querySelector('.mu-player-list')
    this.cover = this.container.querySelector('.mu-player-cover')
    this.btn = this.container.querySelector('.mu-player-button')
    this.name = this.container.querySelector('.mu-player-name')
    this.artist = this.container.querySelector('.mu-player-artist')
    this.barWrap = this.container.querySelector('.mu-player-bar-wrap')
    this.loaded = this.container.querySelector('.mu-player-loaded')
    this.played = this.container.querySelector('.mu-player-played')
    this.thumb = this.container.querySelector('.mu-player-thumb')
    this.dtime = this.container.querySelector('.mu-player-dtime')
    this.ptime = this.container.querySelector('.mu-player-ptime')
    this.volume = this.container.querySelector('.mu-player-icon-volume')
    this.volumeBar = this.container.querySelector('.mu-player-volume')
  }
}

export default Template
