import { bindLocalState } from './state';
import initOptions from './options';
import Storage from './storage';
import Template from './template';
import Player from './player';
import Events from './events';
import Controller from './controller';
import List from './list';
import Lrc from './lrc';
import { initProxy } from '../utils';

// const instances = [];
let i = 1;

class MuPlayer {
  _uid = i++;
  constructor(options = {}) {
    const state = bindLocalState(this._uid);
    this.options = initOptions(options); // TODO
    this.storage = new Storage(this);
    this.template = new Template(this, state);
    /** split */
    this.player = new Player(this);
    this.events = new Events(this, state);
    this.controller = new Controller(this, state);
    this.list = new List(this);
    if (this.options.lrcType) this.lrc = new Lrc(this);
    this.list.switch(0);
    console.log(this);
  }

  static get version() {
    return __VERSION__;
  }
}

initProxy(
  MuPlayer,
  ['player', ['play', 'pause', 'toggle']],
  ['events', ['on', 'once', 'off', 'emit']],
  ['list', ['switch']]
);

export default MuPlayer;
