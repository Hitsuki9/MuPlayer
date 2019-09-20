export default (options) => {
  const defaultOptions = {
    container: document.querySelector('#mu-player'),
    mode: 'normal',
    preload: 'auto',
    autoplay: false,
    volume: 1.0,
    audios: [],
    lrcType: 0,
    listMaxLength: 3,
    storageName: 'mu-player-setting'
  }

  for (const option in defaultOptions) {
    if (!options.hasOwnProperty(option)) {
      options[option] = defaultOptions[option]
    }
  }

  return options
}
