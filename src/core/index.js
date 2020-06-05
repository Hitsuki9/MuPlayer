import { bindLocalState } from './state';
import initOptions from './options';
import Storage from './storage';
import Template from './template';
import Player from './player';
import Events from './events';
import Controller from './controller';
import List from './list';
import Lrc from './lrc';
import { proxyMethods } from '../utils';

// const instances = [];
let i = 1;

export default class MuPlayer {
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

    proxyMethods(this, this.player, ['play', 'pause', 'toggle', 'seek']);
    proxyMethods(this, this.events, ['on', 'off', 'once', 'emit']);
    proxyMethods(this, this.list, ['switch']);
    this.switch(0);
    console.log(this);
  }

  static get version() {
    return __VERSION__;
  }
}
