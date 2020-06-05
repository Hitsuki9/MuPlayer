const ossUrl = '//muplayer.oss-cn-hangzhou.aliyuncs.com/';
const options = {
  container: document.querySelector('#mu-player'),
  audios: [
    {
      name: 'ウルフ',
      artist: 'CHiCO with HoneyWorks',
      url: ossUrl + 'audios/ウルフ.mp3',
      cover: ossUrl + 'covers/wolf.jpg',
      theme: '#ebd0c2'
    },
    {
      name: 'フレスベルグの少女～風花雪月～',
      artist: 'Caro',
      url: ossUrl + 'audios/フレスベルグの少女.mp3',
      cover: ossUrl + 'covers/fireEmblem.png',
      theme: '#ebd0c2'
    },
    {
      name: '愛にできることはまだあるかい',
      artist: '獅子神レオナ',
      url: ossUrl + 'audios/愛にできることはまだあるかい.mp3',
      cover: ossUrl + 'covers/天气之子.jpg',
      theme: '#ebd0c2'
    },
    {
      name: 'Connexion',
      artist: 'R!n/Gemie',
      url: ossUrl + 'audios/Connexion.mp3',
      cover: ossUrl + 'covers/connexion.jpg',
      theme: '#ebd0c2'
    },
    {
      name: '勾指起誓',
      artist: '鹿乃',
      url: ossUrl + 'audios/勾指起誓.mp3',
      cover: ossUrl + 'covers/2比3.jpg',
      theme: '#ebd0c2'
    },
    {
      name: 'WHITE FIRST LOVE',
      artist: '小宮有紗',
      url: ossUrl + 'audios/WHITE FIRST LOVE.mp3',
      cover: ossUrl + 'covers/WHITE FIRST LOVE.jpg',
      theme: '#ebd0c2'
    },
    {
      name: 'シンセカイ案内所',
      artist: '初音ミク',
      url: ossUrl + 'audios/シンセカイ案内所.mp3',
      cover: ossUrl + 'covers/2比3.jpg',
      theme: '#ebd0c2'
    },
    {
      name: '愛言葉Ⅲ',
      artist: '黒兎ウル',
      url: ossUrl + 'audios/愛言葉Ⅲ.mp3',
      cover: ossUrl + 'covers/2比3.jpg',
      theme: '#ebd0c2'
    },
    {
      name: '歌に形はないけれど',
      artist: '獅子神レオナ',
      url: ossUrl + 'audios/歌に形はないけれど.mp3',
      cover: ossUrl + 'covers/2比3.jpg',
      theme: '#ebd0c2'
    }
  ],
  lrcType: 0,
  autoplay: true,
  listMaxLength: 8
};
const mu = new MuPlayer(options);
