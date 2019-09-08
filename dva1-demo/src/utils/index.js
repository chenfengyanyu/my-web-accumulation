import config from './config';
import menu from './menu';
import request from './request';
import cookie from './cookie';
import classnames from 'classnames';
import { color } from './theme';

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase();
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase();
}

module.exports = {
  config,
  menu,
  color,
  classnames,
  cookie,
}
