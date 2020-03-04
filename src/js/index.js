import MuPlayer from '@js/player';
import '@style/index.less';

const CON_NAME_CSS =
  'color: #eee; background: #4c5391; padding: 5px 0; border-radius: 5px 0 0 5px;';
const CON_VER_CSS =
  'background: #eee; padding: 5px 0; border-radius: 0 5px 5px 0;';

console.log(`%c MuPlayer %c ${VER} `, CON_NAME_CSS, CON_VER_CSS);

export default MuPlayer;
