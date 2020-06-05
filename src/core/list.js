export default class List {
  constructor(mu) {
    this._mu = mu;
    this.audios = mu.options.audios;
    this.index = 0;
  }

  switch(index) {
    const { audios } = this;
    const { template, player, events } = this._mu;

    events.emit('listswitch', index);

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
