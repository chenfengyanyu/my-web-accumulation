import howler from 'howler';
const Howl = howler.Howl;

function AudioControll(opt) {
  this.opt = opt;
  this._init();
}

let sound = {};

AudioControll.prototype = {
  _init() {
    sound = new Howl({
      src: this.opt.src,
      loop: this.opt.loop,
      volume: this.opt.volume,
    });
  },
  play() {
    sound.play();
  },
  stop() {
    sound.playing() && sound.stop();
  },
  //间隔播放
  interrupte() {
    sound.play();
    setInterval(() => {
      if (sound.playing()) {
        sound.pause();
      } else {
        sound.play();
      }
    }, 1000);
  },
}

export default {
  AudioControll,
};
