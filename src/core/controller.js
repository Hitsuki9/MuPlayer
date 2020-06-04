import { getElementLeft, secondsToTime } from '../utils';

class Controller {
  constructor(mu) {
    this.mu = mu;
    this.initPlayBtn();
    this.initPlayBar();
    this.initVolumeBar();
  }

  initPlayBtn() {
    const { template, player } = this.mu;

    template.$cover.addEventListener('click', () => {
      player.toggle();
    });
  }

  initPlayBar() {
    const { template, player, bar } = this.mu;

    const thumbMove = (e) => {
      let percentage =
        (e.clientX - getElementLeft(template.$barWrap)) /
        template.$barWrap.clientWidth;
      percentage = Math.min(1, percentage);
      percentage = Math.max(0, percentage);
      template.$ptime.innerHTML = secondsToTime(
        percentage * player.audio.duration
      );
      bar.set('played', percentage, 'width', 'thumb');
    };

    const thumbUp = (e) => {
      document.removeEventListener('mousemove', thumbMove);
      document.removeEventListener('mouseup', thumbUp);
      let percentage =
        (e.clientX - getElementLeft(template.$barWrap)) /
        template.$barWrap.clientWidth;
      percentage = Math.min(1, percentage);
      percentage = Math.max(0, percentage);
      this.mu.seek(percentage * this.player.audio.duration);
      this.mu.disableTimeupdate = false;
    };

    template.$barWrap.addEventListener('mousedown', () => {
      this.mu.disableTimeupdate = true;
      document.addEventListener('mousemove', thumbMove);
      document.addEventListener('mouseup', thumbUp);
    });
  }

  initVolumeBar() {
    const { template, player, bar } = this.mu;

    template.$volume.addEventListener('click', () => {
      if (player.audio.muted) {
        player.audio.muted = false;
        bar.set('volume', this.mu.volume(), 'height');
      } else {
        player.audio.muted = true;
        bar.set('volume', 0, 'height');
      }
    });
  }
}

export default Controller;
