import { getStorage, setStorage } from '../utils';

class Storage {
  constructor(mu) {
    this.name = mu.options.storageName;
  }

  get(key) {
    const storage = getStorage(this.name);
    return key ? storage[key] : storage;
  }

  set(key, value) {
    const storage = {
      ...this.get(),
      [key]: value
    };
    setStorage(this.name, storage);
  }
}

export default Storage;
