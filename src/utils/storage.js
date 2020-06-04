export function getStorage(storageName) {
  return JSON.parse(localStorage.getItem(storageName) || '{}');
}

export function setStorage(storageName, value) {
  localStorage.setItem(storageName, JSON.stringify(value));
}
