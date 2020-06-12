import { secondsToTime } from '../utils';

export default class Player {
  constructor(mu) {
    this._mu = mu;
    this.audio = null;
    this.paused = false;
    this.initAudio(mu.options);
  }

  initAudio({ preload }) {
    this.audio = new Audio();
    this.audio.preload = preload;
  }

  setAudio({ url }) {
    this.audio.src = url;
  }

  seek(seconds) {
    const { template } = this._mu;

    seconds = Math.max(seconds, 0);
    seconds = Math.min(seconds, this.audio.duration);
    this.audio.currentTime = seconds;
    template.bar.set('played', seconds / this.audio.duration, 'horz', 'thumb');
    template.$ptime.innerHTML = secondsToTime(seconds);
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  toggle() {
    if (this.audio.paused) this.play();
    else this.pause();
  }

  volume(percentage, nostorage) {
    const { audio } = this;
    const { storage, template } = this._mu;

    percentage = parseFloat(percentage);
    if (!isNaN(percentage)) {
      percentage = Math.min(percentage, 1);
      percentage = Math.max(percentage, 0);
      if (!nostorage) {
        storage.set('volume', percentage);
      }
      template.bar.set('volume', percentage, 'height');
      audio.volume = percentage;
      if (audio.muted) {
        audio.muted = false;
      }
    }
    return audio.muted ? 0 : audio.volume;
  }
}
