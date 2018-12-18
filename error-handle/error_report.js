/*
 * @Author: Jartto 
 * @Date: 2018-11-22 16:34:00 
 * @Last Modified time: 2018-11-22 16:34:00 
 */
// 调用方法
// jsErrorReport({
//   team: 'OnlineMath',
//   url:'//log.17zuoye.cn/log', // 上报地址
//   app:'app-student-h5', // 上报模块名
//   env: 'testing', // 环境
//   logChannel: 'middle:frontend_error', // 上报的表
//   data:{} // 额外数据
// });
;
(function () {
  'use strict';
  if (window.jsErrorReport) {
    return window.jsErrorReport;
  };

  const LOG_LEVEL = {
    EMERG: 0,
    ALERT: 1,
    CRIT: 2,
    ERROR: 3,
    WARNING: 4,
    NOTICE: 5,
    INFO: 6,
    DEBUG: 7
  };

  let defaults = {
    team: '', // 业务线
    ts: '', // 发送数据时的时间戳
    app: '', // 模块名,
    level: LOG_LEVEL.ERROR, //js日志错误级别，如warning, error, info, debug
    msg: '', //错误的具体信息,
    ua: navigator.appVersion,
    channel: '',
    env: 'testing',
    data: {}
  };

  // const originAddEventListener = EventTarget.prototype.addEventListener;
  // EventTarget.prototype.addEventListener = function (type, listener, options) {
  //   // 捕获添加事件时的堆栈
  //   const addStack = new Error(`Event (${type})`).stack;
  //    const wrappedListener = function (...args) {
  //      try {
  //        return listener.apply(this, args);
  //      }
  //      catch (err) {
  //         // 异常发生时，扩展堆栈
  //         err.stack += '\n' + addStack;
  //         throw err;
  //      }
  //    }
  //    return originAddEventListener.call(this, type, wrappedListener, options);
  //  }

  let jsErrorReport = (params) => {
    let url = params.url;

    if (!url) return;
    defaults.app = params.app;
    defaults.channel = params.logChannel;
    defaults.env = params.env;
    defaults.team = params.team;
    defaults.userid = getCookie('uid', '') || window.appInfo || '-';
    
    // 静态资源监控
    window.addEventListener('error', function (e) {
      defaults.ts = new Date().getTime();
      defaults.msg = e.target.localName + ' 加载异常！';
      defaults.data = JSON.stringify({
        localname: e.target.localName,
        target: window.location.hash,
        type: e.type,
        resourceUrl: e.target.currentSrc,
        url: window.location.href,
        category: 'Resource Error'
      });
      if (e.target !== window) {
        report(url, Object.assign({}, params.data || {}, defaults));
      }
    }, true);

    // 监控 JS 异常
    window.onerror = function (msg, _url, line, col, error) {
      setTimeout(function () {
        //不一定所有浏览器都支持 col 参数，如果不支持就用 window.event 来兼容
        col = col || (window.event && window.event.errorCharacter) || 0;

        if (error && error.stack) {
          //msg 信息较少,如果浏览器有追溯栈信息,使用追溯栈信息
          defaults.msg = error.stack.toString();
        } else if(jsErrorReport.callee){
          let ext = [];
          let fn = jsErrorReport.callee.caller;
          let c = 3;
          while (fn && (--c > 0)) {
            ext.push(fn.toString());
            if (fn === fn.caller) {
              break;
            }
            fn = fn.caller;
          }
          ext = ext.join(',');
          defaults.stack = ext;
        } else {
          defaults.msg = msg;
        }

        // 跨域脚本异常
        if (msg.toLowerCase().indexOf('script error') > -1) {
          defaults.msg = `Script Error: See Browser Console for Detail----->${defaults.msg}`;
        }

        // 试图拿到浏览器历史记录-单页应用就算了吧
        // if (window.history && window.history.state) {
        //   defaults.history = window.history.state;
        // }

        defaults.data = {
          target: window.location.hash,
          resourceUrl: _url,
          url: window.location.href,
          category: 'JS Error',
          line,
          col,
        };
        defaults.ts = new Date().getTime();
        defaults.msg && report(url, Object.assign({}, params.data || {}, defaults));
      }, 0);

      return true;
    };

    // promise 异常
    window.addEventListener('unhandledrejection', function (event) {
      event.preventDefault();

      let desc = event.reason;
      defaults.ts = new Date().getTime();

      console.log('#####',defaults);
      if (desc.stack) {
        desc.stack.replace(/\((.+?):(\d+):(\d+)\)/, function (m, p1, p2, p3) {
          defaults.data = {
            target: window.location.hash,
            resourceUrl: p1,
            url: window.location.href,
            category: 'Promise Error',
            stack: desc.stack,
            line: p2,
            col: p3
          }
          defaults.msg = desc.message;
        });
      } else {
        defaults.data = {
          target: window.location.hash,
          resourceUrl: url,
          url: window.location.href,
          category: 'Promise Error'
        }
        defaults.msg = desc;
      }
      defaults.msg && report(url, Object.assign({}, params.data || {}, defaults));
    }, true);
  }

  /*
   * 格式化参数
   */
  function formatParams(data) {
    let arr = [];
    for (let name in data) {
      arr.push(`${encodeURIComponent(name)}=${encodeURIComponent(data[name])}`);
    }
    return arr.join('&');
  }
  /**
   * 上报函数
   * @param  {String} url
   * @param  {Object} data
   */
  function report(url, data) {
    let logParams = {
      _c: data.channel,
      _l: data.level,
      _log: encodeURIComponent(JSON.stringify(data)),
      _t: data.ts
    };

    let img = new Image();
    img.src = `${url}?${formatParams(logParams)}`;
  }
  /**
   * 获取 cookie
   * @param {String} name 
   * @param {String} defaultValue 
   */
  function getCookie(name, defaultValue) {
    let strCookie = document.cookie;
    let arrCookie = strCookie.split('; ');
    for (let i = 0; i < arrCookie.length; i++) {
      let arr = arrCookie[i].split('=');
      if (arr[0] === name) return arr[1];
    }
    return defaultValue;
  }


  /* eslint-disable */
  // if (typeof module !== 'undefined') {
  //   // module.exports = jsErrorReport;
  // }
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return jsErrorReport;
    });
  }

  window.jsErrorReport = jsErrorReport;
})();
