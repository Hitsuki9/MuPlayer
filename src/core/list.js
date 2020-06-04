class List {
  constructor(mu) {
    this.mu = mu;
    this.index = 0;
    this.bindEvents();
  }

  bindEvents() {
    const { template, player } = this.mu;

    template.$list.addEventListener('click', (e) => {
      let target = null;
      if (e.target.tagName === 'LI') {
        target = e.target;
      } else {
        target = e.target.parentNode;
      }
      const audioIndex =
        parseInt(
          target.getElementsByClassName('mu-player-list-index')[0].innerHTML
        ) - 1;
      if (audioIndex !== this.index) {
        this.cut(audioIndex);
        player.play();
      } else {
        player.toggle();
      }
    });
  }

  cut(index) {
    const {
      template,
      player,
      options: { audios }
    } = this.mu;

    if (audios[index]) {
      this.index = index;
      const audio = audios[this.index];
      template.$cover.style.backgroundImage = audio.cover
        ? `url('${audio.cover}')`
        : '';
      template.$name.innerHTML = audio.name || '未知音频';
      template.$artist.innerHTML = audio.artist
        ? ` - ${audio.artist}`
        : ' - 未知作者';
      player.setAudio(audio);
    }
  }
}

export default List;
