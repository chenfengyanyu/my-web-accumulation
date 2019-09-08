const _ = require('lodash');
const Mixin = {
  convertWeek: (arr) => {
    let temp = [];
    if (arr.join('') === '0123456') {
      return 'Everyday';
    } else {
      temp = _.map(arr, Mixin.weekKey);
    }
    return temp.join(' , ');
  },
  convertWeekArray: (arr) => {
    let temp = [];
    temp = _.map(arr, Mixin.weekKey);
    return temp;
  },
  convertIndex: (str) => {
    return _.map(str, Mixin.reverseKey).sort();
  },
  weekKey: (day) => {
    let x = '';
    switch (day) {
      case 0:
        x = 'Sun';
        break;
      case 1:
        x = 'Mon';
        break;
      case 2:
        x = 'Tues';
        break;
      case 3:
        x = 'Wed';
        break;
      case 4:
        x = 'Thur';
        break;
      case 5:
        x = 'Fri';
        break;
      case 6:
        x = 'Sat';
        break;
      default:
        x = '';
    }
    return x;
  },
  reverseKey: (str) => {
    let x = 0;
    switch (str) {
      case 'Sun':
        x = 0;
        break;
      case 'Mon':
        x = 1;
        break;
      case 'Tues':
        x = 2;
        break;
      case 'Wed':
        x = 3;
        break;
      case 'Thur':
        x = 4;
        break;
      case 'Fri':
        x = 5;
        break;
      case 'Sat':
        x = 6;
        break;
      default:
        x = 0;
    }
    return x;
  },
  formatTime: (time) => {
    let hour = Math.floor(time / 60);
    let min = Math.floor(time % 60);
    if (hour < 10) {
      hour = `0${hour}`;
    }
    if (min < 10) {
      min = `0${min}`;
    }
    return `${hour}:${min}`;
  },
  convertTime: (start, end) => {
    return `${Mixin.formatTime(start)} ~ ${Mixin.formatTime(end)}`;
  },
  queryId: (arr) => {
    if (!arr) return;
    let sns = _.map(_.filter(arr, item => item.isAllot === true), item => item.sn);
    return sns;
  },
  filterArr: (all, part) => {
    let temp = all;
    for (let i = 0; i < all.length; i++) {
      for (let j = 0; j < part.length; j++) {
        if (all[i].id === part[j].id) {
          temp.splice(i, 1);
          --i;
          break;
        }
      }
    }
    return temp;
  },
}

export default Mixin;
