class Events {
  constructor() {
    this.boundEvents = {};
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
      if (!this.boundEvents[event]) {
        this.boundEvents[event] = [];
      }
      this.boundEvents[event].push(callback);
    }
  }

  trigger(event, data) {
    if (this.boundEvents[event] && this.boundEvents[event].length) {
      for (const callback of this.boundEvents[event]) {
        callback(data);
      }
    }
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
