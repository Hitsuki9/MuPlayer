import handleOptions from '_js/options'
import Template from '_js/template'
import Lrc from '_js/lrc'
import Events from '_js/events'
import Storage from '_js/storage'
import Controller from '_js/controller'
import Bar from '_js/bar'
import List from '_js/list'
import utils from '_js/utils'
import icons from '_js/icons'

class MuPlayer {
  constructor (options = {}) {
    this.options = handleOptions(options)
    this.container = this.options.container
    this.paused = true
    this.disableTimeupdate = false
    this.btnTimer = 0
    this.template = new Template({
      container: this.container
    })
    this.storage = new Storage({
      storageName: this.options.storageName,
      volume: this.options.volume
    })
    if (this.options.lrcType) {
      this.lrc = new Lrc({
          container: this.template.lrc,
          async: this.options.lrcType === 1,
          player: this
      })
    }
    this.events = new Events()
    this.controller = new Controller(this)
    this.bar = new Bar(this.template)
    this.list = new List(this)

    this.container.classList.add('mu-player')
    if (this.options.lrcType) {
      this.container.classList.add('mu-player-withlrc')
    }
    if (this.options.audios.length > 1) {
      this.container.classList.add('mu-player-withlist')
    }
    if (this.options.mode === 'fixed') {
      this.container.classList.add('mu-player-fixed')
    }

    this.initAudio()
    this.bindEvents()
    this.list.cut(0)
  }

  initAudio () {
    this.audio = document.createElement('audio')
    this.audio.preload = this.options.preload
    for (let event of this.events.audioEvents) {
      this.audio.addEventListener(event, e => {
        this.events.trigger(event, e)
      })
    }
  }

  setAudio (audio) {
    this.audio.src = audio.url
  }

  bindEvents () {
    this.on('canplay', e => {
      console.log(this.audio.buffered)
      let percentage = this.audio.buffered.length ? this.audio.buffered.end(this.audio.buffered.length - 1) / this.audio.duration : 0
      this.bar.set('loaded', percentage, 'width')
    })
    this.on('durationchange', e => {
      this.template.dtime.innerHTML = this.audio.duration ? utils.secondsToTime(this.audio.duration) : '00:00'
    })
    this.on('timeupdate', e => {
      if (!this.disableTimeupdate) {
        const percentage = this.audio.currentTime / this.audio.duration
        this.bar.set('played', percentage, 'width')
        const currentTime = utils.secondsToTime(this.audio.currentTime)
        if (currentTime !== this.template.ptime.innerHTML) {
          this.template.ptime.innerHTML = currentTime
        }
      }
    })
    this.on('progress', e => {
      console.log(this.audio.buffered)
      let percentage = this.audio.buffered.length ? this.audio.buffered.end(this.audio.buffered.length - 1) / this.audio.duration : 0
      this.bar.set('loaded', percentage, 'width')
    })
    this.on('error', e => {
      this.pause()
      console.error('An audio error has occurred')
    })
  }

  async play () {
    try {
      const playPromise = await this.audio.play()
      this.paused = false
      this.setPauseButton()
    } catch (error) {
      console.error(error)
    }
  }

  setPlayButton () {
    if (this.btnTimer) {
      clearTimeout(this.btnTimer)
    }
    this.template.btn.innerHTML = icons.play
    if (this.template.btn.classList.contains('position-repair')) {
      this.template.btn.classList.remove('position-repair')
    }
    this.template.btn.classList.remove('mu-player-pause')
    this.template.btn.classList.add('mu-player-play')
  }

  pause () {
    this.audio.pause()
    this.paused = true
    this.setPlayButton()
  }

  setPauseButton () {
    this.template.btn.innerHTML = icons.pause
    this.template.btn.classList.add('position-repair')
    this.btnTimer = setTimeout(() => {
      this.template.btn.classList.remove('position-repair')
      this.template.btn.classList.remove('mu-player-play')
      this.template.btn.classList.add('mu-player-pause')
      clearTimeout(this.btnTimer)
    }, 800)
  }

  toggle () {
    if (this.paused) {
      this.play()
    } else {
      this.pause()
    }
  }

  skip (seconds) {
    seconds = Math.max(seconds, 0)
    seconds = Math.min(seconds, this.audio.duration)
    this.audio.currentTime = seconds
    this.bar.set('played', seconds / this.audio.duration, 'width')
    this.template.ptime.innerHTML = utils.secondsToTime(seconds)
  }

  cutAudio (index) {
    this.list.cut(index)
  }

  volume (percentage, nostorage) {
    percentage = parseFloat(percentage)
    if (!isNaN(percentage)) {
      percentage = Math.min(percentage, 1)
      percentage = Math.max(percentage, 0)
      if (!nostorage) {
        this.storage.set('volume', percentage)
      }
      this.bar.set('volume', percentage, 'height')
      this.audio.volume = percentage
      if (this.audio.muted) {
        this.audio.muted = false
      }
    }
    return this.audio.muted ? 0 : this.audio.volume
  }

  on (event, callback) {
    this.events.on(event, callback)
  }

  static get version () {
    return VER
  }
}

export default MuPlayer
