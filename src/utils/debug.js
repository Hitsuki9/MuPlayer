export function assert(condition, msg) {
  if (!condition) throw new Error(`[MuPlayer] ${msg}`);
}

export function error(msg) {
  console.error(`[MuPlayer error] ${msg}`);
}

export function log(msg) {
  console.log(`%c ${msg}`, 'color: green; font-weight: bold;');
}

export function log2(msg) {
  console.log(`%c ${msg}`, 'color: purple; font-weight: bold;');
}
