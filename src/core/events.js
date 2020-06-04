class Events {
  constructor() {
    this.listeners = {};
    this.playerEvents = ['lrcshow', 'lrchide'];
    this.audioEvents = [
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
  }

  on(event, callback) {
    if (this.getEventType(event) && typeof callback === 'function') {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(callback);
    }
  }

  once(event, callback) {
    // TODO
  }

  emit(event, ...args) {
    if (this.listeners[event] && this.listeners[event].length) {
      for (const callback of this.listeners[event]) {
        callback(data);
      }
    }
  }

  off(event, callback) {
    // TODO
  }

  getEventType(event) {
    if (this.playerEvents.includes(event)) {
      return 'playerEvent';
    }
    if (this.audioEvents.includes(event)) {
      return 'audioEvent';
    }
    throw new Error(`Unknown event name: ${event}`);
  }
}

export default Events;
