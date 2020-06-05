const localStates = {};

export function bindLocalState(uid) {
  return (localStates[uid] = {
    btnTimer: 0,
    disableTimeupdate: false
  });
}

export function getLocalState(uid, key) {
  const localState = localStates[uid];
  return key ? localState[key] : localState;
}
