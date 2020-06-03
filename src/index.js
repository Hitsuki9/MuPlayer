import MuPlayer from './core';
import '@style/index.less';

const CON_NAME_CSS =
  'color: #eee; background: #4c5391; padding: 5px 0; border-radius: 5px 0 0 5px;';
const CON_VER_CSS =
  'background: #eee; color: #000; padding: 5px 0; border-radius: 0 5px 5px 0;';

console.log(`%c MuPlayer %c ${__VERSION__} `, CON_NAME_CSS, CON_VER_CSS);

export default MuPlayer;
