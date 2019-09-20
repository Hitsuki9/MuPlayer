class Storage {
  constructor (options) {
    this.storageName = options.storageName
    this.data = JSON.parse(localStorage.getItem(this.storageName))
    if (!this.data) {
      this.data = {}
    }
    this.data.volume = this.data.volume || options.volume
  }

  get (key) {
    return this.data[key]
  }

  set (key, value) {
    this.data[key] = value
    localStorage.setItem(this.storageName, JSON.stringify(this.data))
  }
}

export default Storage
