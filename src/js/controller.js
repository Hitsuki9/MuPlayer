import utils from '@js/utils'

class Controller {
  constructor (player) {
    this.player = player
    this.initPlayBtn()
    this.initPlayBar()
    this.initVolumeBar()
  }

  initPlayBtn () {
    this.player.template.cover.addEventListener('click', () => {
      this.player.toggle()
    })
  }

  initPlayBar () {
    const thumbMove = e => {
      let percentage = (e.clientX - utils.getElementLeft(this.player.template.barWrap)) / this.player.template.barWrap.clientWidth
      percentage = Math.min(1, percentage)
      percentage = Math.max(0, percentage)
      this.player.template.ptime.innerHTML = utils.secondsToTime(percentage * this.player.audio.duration)
      this.player.bar.set('played', percentage, 'width')
    }

    const thumbUp = e => {
      document.removeEventListener('mousemove', thumbMove)
      document.removeEventListener('mouseup', thumbUp)
      let percentage = (e.clientX - utils.getElementLeft(this.player.template.barWrap)) / this.player.template.barWrap.clientWidth
      percentage = Math.min(1, percentage)
      percentage = Math.max(0, percentage)
      this.player.skip(percentage * this.player.audio.duration)
      this.player.disableTimeupdate = false
    }

    this.player.template.barWrap.addEventListener('mousedown', () => {
      this.player.disableTimeupdate = true
      document.addEventListener('mousemove', thumbMove)
      document.addEventListener('mouseup', thumbUp)
    })
  }

  initVolumeBar () {
    this.player.template.volume.addEventListener('click', () => {
      if (this.player.audio.muted) {
        this.player.audio.muted = false
        this.player.bar.set('volume', this.player.volume(), 'height')
      } else {
        this.player.audio.muted = true
        this.player.bar.set('volume', 0, 'height')
      }
    })
  }
}

export default Controller
