import { getElementLeft, secondsToTime } from '../utils';

export default class Controller {
  constructor(mu, state) {
    this._localState = state;
    this.controlPlayButton(mu);
    this.controlPlayBar(mu);
    this.controlVolumeBar(mu);
    this.controlList(mu);
  }

  controlPlayButton(mu) {
    mu.template.$cover.addEventListener('click', () => {
      mu.player.toggle();
    });
  }

  controlPlayBar(mu) {
    const thumbMove = (event) => {
      const { template, player } = mu;

      let percentage =
        (event.clientX - getElementLeft(template.$barWrap)) /
        template.$barWrap.clientWidth;
      percentage = Math.min(1, percentage);
      percentage = Math.max(0, percentage);
      template.$ptime.innerHTML = secondsToTime(
        percentage * player.audio.duration
      );
      template.bar.set('played', percentage, 'horz', 'thumb');
    };

    const thumbUp = (event) => {
      const { template, player } = mu;

      document.removeEventListener('mousemove', thumbMove);
      document.removeEventListener('mouseup', thumbUp);
      let percentage =
        (event.clientX - getElementLeft(template.$barWrap)) /
        template.$barWrap.clientWidth;
      percentage = Math.min(1, percentage);
      percentage = Math.max(0, percentage);
      player.seek(percentage * player.audio.duration);
      this._localState.disableTimeupdate = false;
    };

    mu.template.$barWrap.addEventListener('mousedown', () => {
      this._localState.disableTimeupdate = true;
      document.addEventListener('mousemove', thumbMove);
      document.addEventListener('mouseup', thumbUp);
    });
  }

  controlVolumeBar(mu) {
    mu.template.$volume.addEventListener('click', () => {
      const {
        template: { bar },
        player: { audio }
      } = mu;

      if (audio.muted) {
        audio.muted = false;
        bar.set('volume', mu.volume(), 'vert');
      } else {
        audio.muted = true;
        bar.set('volume', 0, 'vert');
      }
    });
  }

  controlList(mu) {
    mu.template.$list.addEventListener('click', (event) => {
      const { player, list } = mu;

      let target = null;
      if (event.target.tagName === 'LI') {
        target = event.target;
      } else {
        target = event.target.parentNode;
      }
      const audioIndex =
        parseInt(
          target.getElementsByClassName('mu-player-list-index')[0].innerHTML
        ) - 1;
      if (audioIndex !== list.index) {
        list.switch(audioIndex);
        player.play();
      } else {
        player.toggle();
      }
    });
  }
}
