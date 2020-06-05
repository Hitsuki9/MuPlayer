import { getStorage, setStorage } from '../utils';

export default class Storage {
  constructor(mu) {
    this.name = mu.options.storageName;
    this.storage = getStorage(this.name);
  }

  get(key) {
    return key ? this.storage[key] : this.storage;
  }

  set(key, value) {
    this.storage[key] = value;
    setStorage(this.name, this.storage);
  }
}
