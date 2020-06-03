const map = {
  width: ['scaleX', 'left'],
  height: ['scaleY', 'bottom']
};

class Bar {
  constructor(template) {
    this.el = {};
    this.el.played = template.played;
    this.el.loaded = template.loaded;
    this.el.thumb = template.thumb;
    this.el.volume = template.volumeBar;
  }

  set(type, percentage, widthOrHeight, bindThumb) {
    this.el[type].style.transform = `${map[widthOrHeight][0]}(${percentage})`;
    if (bindThumb) {
      this.el[bindThumb].style[map[widthOrHeight][1]] = `calc(${
        percentage * 100
      }% - 5px)`;
    }
  }
}

export default Bar;
