import { secondsToTime, assert, error, log, log2 } from '../utils';

const playerEvents = ['listswitch', 'lrcshow', 'lrchide'];
const audioEvents = [
  'abort',
  'canplay',
  'canplaythrough',
  'durationchange',
  'emptied',
  'ended',
  'error',
  'loadeddata',
  'loadedmetadata',
  'loadstart',
  'pause',
  'play',
  'playing',
  'progress',
  'ratechange',
  'readystatechange',
  'seeked',
  'seeking',
  'stalled',
  'suspend',
  'timeupdate',
  'volumechange',
  'waiting'
];

export default class Events {
  constructor(mu, state) {
    this._localState = state;
    this.listeners = {};
    this.bindEvents(mu);
  }

  bindEvents(mu) {
    this.bindNativeEvents(mu);
    this.bindAudioEvents(mu);
    this.bindPlayerEvents(mu);
  }

  bindNativeEvents(mu) {
    audioEvents.forEach((eventName) => {
      mu.player.audio.addEventListener(
        eventName,
        (event) => {
          this.emit(eventName, event);
        },
        false
      );
    });
  }

  bindAudioEvents(mu) {
    this.on('canplay', () => {
      log('canplay');
      const {
        template: { bar },
        player: { audio }
      } = mu;

      const percentage = audio.buffered.length
        ? audio.buffered.end(audio.buffered.length - 1) / audio.duration
        : 0;
      bar.set('loaded', percentage, 'horz');
    });

    this.on('durationchange', () => {
      log('durationchange');
      const {
        template,
        player: { audio }
      } = mu;

      template.$dtime.innerHTML = audio.duration
        ? secondsToTime(audio.duration)
        : '00:00';
    });

    this.on('timeupdate', () => {
      log('timeupdate');
      const {
        template,
        player: { audio }
      } = mu;

      if (!this._localState.disableTimeupdate) {
        const percentage = audio.currentTime / audio.duration;
        template.bar.set('played', percentage, 'horz', 'thumb');
        const currentTime = secondsToTime(audio.currentTime);
        if (currentTime !== template.$ptime.innerHTML) {
          template.$ptime.innerHTML = currentTime;
        }
      }
    });

    this.on('progress', () => {
      log('progress');
      const {
        template: { bar },
        player: { audio }
      } = mu;

      const percentage = audio.buffered.length
        ? audio.buffered.end(audio.buffered.length - 1) / audio.duration
        : 0;
      bar.set('loaded', percentage, 'horz');
    });

    this.on('play', () => {
      log('play');
      mu.template.setPauseButton();
    });

    this.on('pause', () => {
      log('pause');
      mu.template.setPlayButton();
    });

    this.on('error', () => {
      mu.player.pause();
      error('An audio error has occurred.');
    });
  }

  bindPlayerEvents() {
    this.on('listswitch', () => {
      // TODO
      log2('listswitch');
    });
  }

  on(event, callback) {
    if (this.getEventType(event) && typeof callback === 'function') {
      const { listeners } = this;
      (listeners[event] || (listeners[event] = [])).push(callback);
    }
    return this;
  }

  once(event, callback) {
    const listener = (...args) => {
      this.off(event, listener);
      callback(...args);
    };
    listener._rawCb = callback;
    return this.on(event, listener);
  }

  emit(event, ...args) {
    if (this.getEventType(event) && this.listeners[event]) {
      const listeners = this.listeners[event].slice();
      listeners.forEach((listener) => listener(...args));
    }
  }

  off(event, callback) {
    if (this.getEventType(event) && this.listeners[event]) {
      const listeners = this.listeners[event];
      for (let i = listeners.length - 1; i >= 0; i--) {
        if (listeners[i] === callback || listeners[i]._rawCb === callback) {
          listeners.splice(i, 1);
        }
      }
    }
    return this;
  }

  getEventType(event) {
    const isPlayerEvent = playerEvents.includes(event);
    const isAudioEvent = audioEvents.includes(event);
    assert(isPlayerEvent || isAudioEvent, `Unknown event: ${event}.`);
    return isPlayerEvent ? 'playerEvent' : 'audioEvent';
  }
}
