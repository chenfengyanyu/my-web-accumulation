import io from 'socket.io-client';
import { Modal } from 'antd';
import utils from '../utils/index';
import SELF from '../../config';
import audio from '../utils/audio';

const Audio = audio.AudioControll;

function getBASEURL() {
  let BASE_URL = `${SELF.url}?session=`;
  let userInfo = utils.cookie.getCookie('trackerSessionID');

  if (userInfo && (typeof userInfo === 'string')) {
    userInfo = JSON.parse(decodeURIComponent(userInfo));

    if (userInfo.sessionID) {
      BASE_URL += userInfo.sessionID;
    }
  }
  console.log('BASE_URL =>>>>>>>>>>>>>>>>> ', BASE_URL);
  return BASE_URL;
}

function connect() {
  let socket = io.connect(getBASEURL());
  socket.on('connect', () => {
    console.log('connect success');
  });
  socket.on('disconnect', () => {
    console.log('connect disconnect');
  });

  return socket;
}

function alarm(socket) {
  //初始化audio
  let sound = new Audio({
    src: ['/assets/audio/alarm.mp3'],
    loop: true,
    volume: 0.8,
  });
  socket.on('tracker-alarms', (alarm) => {
    let notiType = '';
    sound.play();
    notiType = 'warning';

    Modal[notiType]({
      title: 'Warning',
      content: alarm,
      onOk: sound.stop,
      onCancel: sound.stop,
    });
  });
}

export default {
  connect,
  alarm,
};
