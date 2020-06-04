export default class Player {
  constructor(mu) {
    const {
      options: { preload },
      events,
      template
    } = mu;

    this.audio = null;
    this.paused = true;
    this.template = template;
    this.initAudio(preload);
    this.bindEvents(events);
  }

  initAudio(preload) {
    this.audio = document.createElement('audio');
    this.audio.preload = preload;
  }

  bindEvents(events) {
    const { audioEvents } = events;

    audioEvents.forEach((eventName) => {
      this.audio.addEventListener(
        eventName,
        (event) => {
          events.trigger(eventName, event);
        },
        false
      );
    });
  }

  setAudio(audio) {
    this.audio.src = audio.url;
  }

  play() {
    this.audio.play();
    this.paused = false;
    this.template.setPauseButton();
  }

  pause() {
    this.audio.pause();
    this.paused = true;
    this.template.setPlayButton();
  }

  toggle() {
    if (this.paused) this.play();
    else this.pause();
  }
}
