import handleOptions from '@js/options';
import Template from '@js/template';
import Lrc from '@js/lrc';
import Events from '@js/events';
import Storage from '@js/storage';
import Controller from '@js/controller';
import Bar from '@js/bar';
import List from '@js/list';
import utils from '@js/utils';
import icons from '@js/icons';

class MuPlayer {
  constructor(options = {}) {
    this.options = handleOptions(options);
    this.container = this.options.container;
    this.paused = true;
    this.disableTimeupdate = false;
    this.btnTimer = 0;
    this.template = new Template(this.options);
    this.storage = new Storage({
      storageName: this.options.storageName,
      volume: this.options.volume
    });
    if (this.options.lrcType) {
      this.lrc = new Lrc({
        container: this.template.lrc,
        async: this.options.lrcType === 1,
        player: this
      });
    }
    this.events = new Events();
    this.controller = new Controller(this);
    this.bar = new Bar(this.template);
    this.list = new List(this);

    this.container.classList.add('mu-player');
    if (this.options.lrcType) {
      this.container.classList.add('mu-player-withlrc');
    }
    if (this.options.audios.length > 1) {
      this.container.classList.add('mu-player-withlist');
    }
    if (this.options.mode === 'fixed') {
      this.container.classList.add('mu-player-fixed');
    }

    this.initAudio();
    this.bindEvents();
    this.list.cut(0);
  }

  initAudio() {
    this.audio = document.createElement('audio');
    this.audio.preload = this.options.preload;
    for (const event of this.events.audioEvents) {
      this.audio.addEventListener(event, (e) => {
        this.events.trigger(event, e);
      });
    }
  }

  setAudio(audio) {
    this.audio.src = audio.url;
  }

  bindEvents() {
    this.on('canplay', () => {
      console.log(this.audio.buffered);
      const percentage = this.audio.buffered.length
        ? this.audio.buffered.end(this.audio.buffered.length - 1) /
          this.audio.duration
        : 0;
      this.bar.set('loaded', percentage, 'width');
    });
    this.on('durationchange', () => {
      this.template.dtime.innerHTML = this.audio.duration
        ? utils.secondsToTime(this.audio.duration)
        : '00:00';
    });
    this.on('timeupdate', () => {
      if (!this.disableTimeupdate) {
        const percentage = this.audio.currentTime / this.audio.duration;
        this.bar.set('played', percentage, 'width', 'thumb');
        const currentTime = utils.secondsToTime(this.audio.currentTime);
        if (currentTime !== this.template.ptime.innerHTML) {
          this.template.ptime.innerHTML = currentTime;
        }
      }
    });
    this.on('progress', () => {
      console.log(this.audio.buffered);
      const percentage = this.audio.buffered.length
        ? this.audio.buffered.end(this.audio.buffered.length - 1) /
          this.audio.duration
        : 0;
      this.bar.set('loaded', percentage, 'width');
    });
    this.on('error', () => {
      this.pause();
      console.error('An audio error has occurred');
    });
  }

  async play() {
    try {
      const playPromise = await this.audio.play();
      console.log(playPromise);
      this.paused = false;
      this.setPauseButton();
    } catch (error) {
      console.error(error);
    }
  }

  setPlayButton() {
    if (this.btnTimer) {
      clearTimeout(this.btnTimer);
    }
    this.template.btn.innerHTML = icons.play;
    this.template.btn.classList.remove('mu-player-pause');
    this.template.btn.classList.add('mu-player-play');
  }

  pause() {
    this.audio.pause();
    this.paused = true;
    this.setPlayButton();
  }

  setPauseButton() {
    this.template.btn.innerHTML = icons.pause;
    this.btnTimer = setTimeout(() => {
      this.template.btn.classList.remove('mu-player-play');
      this.template.btn.classList.add('mu-player-pause');
      clearTimeout(this.btnTimer);
    }, 800);
  }

  toggle() {
    if (this.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  seek(seconds) {
    seconds = Math.max(seconds, 0);
    seconds = Math.min(seconds, this.audio.duration);
    this.audio.currentTime = seconds;
    this.bar.set('played', seconds / this.audio.duration, 'width', 'thumb');
    this.template.ptime.innerHTML = utils.secondsToTime(seconds);
  }

  cutAudio(index) {
    this.list.cut(index);
  }

  volume(percentage, nostorage) {
    percentage = parseFloat(percentage);
    if (!isNaN(percentage)) {
      percentage = Math.min(percentage, 1);
      percentage = Math.max(percentage, 0);
      if (!nostorage) {
        this.storage.set('volume', percentage);
      }
      this.bar.set('volume', percentage, 'height');
      this.audio.volume = percentage;
      if (this.audio.muted) {
        this.audio.muted = false;
      }
    }
    return this.audio.muted ? 0 : this.audio.volume;
  }

  on(event, callback) {
    this.events.on(event, callback);
  }

  static get version() {
    return VER;
  }
}

export default MuPlayer;
