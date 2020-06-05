import playerRender from '@template/player.art';
import Bar from './bar';
import icons from './icons';
import { getQuery } from '../utils';

export default class Template {
  constructor({ options }, state) {
    this._localState = state;
    this.$container = options.container;
    this.init(options);
  }

  init(options) {
    const { $container } = this;
    const query = getQuery($container);

    $container.innerHTML = playerRender({
      options,
      icons
    });

    $container.classList.add('mu-player');
    if (options.lrcType) {
      $container.classList.add('mu-player-withlrc');
    }
    if (options.audios.length > 1) {
      $container.classList.add('mu-player-withlist');
    }
    if (options.mode === 'fixed') {
      $container.classList.add('mu-player-fixed');
    }

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
    this.$lrc = query('.mu-player-lrc');
    this.$list = query('.mu-player-list');

    this.bar = new Bar(this);
  }

  setPlayButton() {
    const {
      _localState: { btnTimer },
      $btn
    } = this;

    $btn.innerHTML = icons.play;
    if (btnTimer) {
      clearTimeout(btnTimer);
      return;
    }
    $btn.classList.remove('mu-player-pause');
    $btn.classList.add('mu-player-play');
  }

  setPauseButton() {
    const { _localState, $btn } = this;

    $btn.innerHTML = icons.pause;
    _localState.btnTimer = setTimeout(() => {
      $btn.classList.remove('mu-player-play');
      $btn.classList.add('mu-player-pause');
      _localState.btnTimer = 0;
    }, 800);
  }
}
