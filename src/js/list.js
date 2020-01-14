class List {
  constructor(player) {
    this.player = player;
    this.audios = player.options.audios;
    this.index = 0;
    this.bindEvents();
  }

  bindEvents() {
    this.player.template.list.addEventListener('click', (e) => {
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
        this.player.play();
      } else {
        this.player.toggle();
      }
    });
  }

  cut(index) {
    if (this.audios[index]) {
      this.index = index;
      const audio = this.audios[this.index];
      this.player.template.cover.style.backgroundImage = audio.cover
        ? `url('${audio.cover}')`
        : '';
      this.player.template.name.innerHTML = audio.name || '未知音频';
      this.player.template.artist.innerHTML = audio.artist
        ? ` - ${audio.artist}`
        : ' - 未知作者';
      this.player.setAudio(audio);
    }
  }
}

export default List;
