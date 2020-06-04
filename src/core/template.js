import playerRender from '@template/player.art';
import icons from './icons';
import { getQuery } from '../utils';

class Template {
  constructor(mu) {
    const { options } = mu;

    this.$container = options.container;
    this.btnTimer = 0;
    this.init(options);
  }
  init(options) {
    this.$container.innerHTML = playerRender({
      options,
      icons
    });

    this.$container.classList.add('mu-player');
    if (options.lrcType) {
      this.$container.classList.add('mu-player-withlrc');
    }
    if (options.audios.length > 1) {
      this.$container.classList.add('mu-player-withlist');
    }
    if (options.mode === 'fixed') {
      this.$container.classList.add('mu-player-fixed');
    }

    const query = getQuery(this.$container);

    this.$lrc = query('.mu-player-lrc');
    this.$list = query('.mu-player-list');
    this.$cover = query('.mu-player-cover');
    this.$btn = query('.mu-player-button');
    this.$name = query('.mu-player-name');
    this.$artist = query('.mu-player-artist');
    this.$barWrap = query('.mu-player-bar-wrap');
    this.$loaded = query('.mu-player-loaded');
    this.$played = query('.mu-player-played');
    this.$thumb = query('.mu-player-thumb');
    this.$dtime = query('.mu-player-dtime');
    this.$ptime = query('.mu-player-ptime');
    this.$volume = query('.mu-player-icon-volume');
    this.$volumeBar = query('.mu-player-volume');
  }

  setPlayButton() {
    if (this.btnTimer) {
      clearTimeout(this.btnTimer);
    }
    this.$btn.innerHTML = icons.play;
    this.$btn.classList.remove('mu-player-pause');
    this.$btn.classList.add('mu-player-play');
  }

  setPauseButton() {
    this.$btn.innerHTML = icons.pause;
    this.btnTimer = setTimeout(() => {
      this.$btn.classList.remove('mu-player-play');
      this.$btn.classList.add('mu-player-pause');
      clearTimeout(this.btnTimer);
    }, 800);
  }
}

export default Template;
