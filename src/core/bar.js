const DirectionMap = {
  horz: ['scaleX', 'left'],
  vert: ['scaleY', 'bottom']
};

const THUMB_RADIUS = 5;

export default class Bar {
  constructor(template) {
    this.el = {
      played: template.$played,
      loaded: template.$loaded,
      thumb: template.$thumb,
      volume: template.$volumeBar
    };
  }

  set(elName, percentage, direction, cascadedThumb) {
    const [scale, position] = DirectionMap[direction];

    this.el[elName].style.transform = `${scale}(${percentage})`;

    if (cascadedThumb) {
      this.el[cascadedThumb].style[position] = `calc(${
        percentage * 100
      }% - ${THUMB_RADIUS}px)`;
    }
  }
}
