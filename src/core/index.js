import initOptions from './options';
import Template from './template';
import Lrc from './lrc';
import Events from './events';
import Player from './player';
import Storage from './storage';
import Controller from './controller';
import Bar from './bar';
import List from './list';
import { secondsToTime } from '../utils';

// const instances = [];

class MuPlayer {
  constructor(options = {}) {
    this.options = initOptions(options);
    this.disableTimeupdate = false;
    this.template = new Template(this);
    this.storage = new Storage(this);
    this.events = new Events();
    this.player = new Player(this);
    this.controller = new Controller(this);
    this.bar = new Bar(this);
    this.list = new List(this);
    if (this.options.lrcType) this.lrc = new Lrc(this);

    this.bindEvents();
    this.list.cut(0);
  }

  bindEvents() {
    this.on('canplay', () => {
      // console.log(this.audio.buffered);
      const percentage = this.audio.buffered.length
        ? this.audio.buffered.end(this.audio.buffered.length - 1) /
          this.audio.duration
        : 0;
      this.bar.set('loaded', percentage, 'width');
    });
    this.on('durationchange', () => {
      this.template.$dtime.innerHTML = this.audio.duration
        ? secondsToTime(this.audio.duration)
        : '00:00';
    });
    this.on('timeupdate', () => {
      if (!this.disableTimeupdate) {
        const percentage = this.audio.currentTime / this.audio.duration;
        this.bar.set('played', percentage, 'width', 'thumb');
        const currentTime = secondsToTime(this.audio.currentTime);
        if (currentTime !== this.template.$ptime.innerHTML) {
          this.template.$ptime.innerHTML = currentTime;
        }
      }
    });
    this.on('progress', () => {
      // console.log(this.audio.buffered);
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

  seek(seconds) {
    seconds = Math.max(seconds, 0);
    seconds = Math.min(seconds, this.audio.duration);
    this.audio.currentTime = seconds;
    this.bar.set('played', seconds / this.audio.duration, 'width', 'thumb');
    this.template.$ptime.innerHTML = secondsToTime(seconds);
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
    return __VERSION__;
  }
}

export default MuPlayer;
