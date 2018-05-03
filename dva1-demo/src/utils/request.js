import fetch from 'dva/fetch';
import utils from './cookie';
import { routerRedux } from 'dva/router';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  // console.log(response,'response');
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === 401) {
    utils.delCookie('trackerSessionID');
    location.href = '/login';
  }

  // const error = new Error(response.statusText); error.statusCode =
  // response.status; error.response = response; error.data = response.json();
  // throw error;
  return response.json().then((json) => { throw json; });
}

//全局添加headers，及 sessionID 票据
function optionsAppend(options) {
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');

  let userInfo = utils.getCookie('trackerSessionID');
  if (userInfo && (typeof userInfo === 'string')) {
    userInfo = JSON.parse(decodeURIComponent(userInfo));
    if (userInfo.sessionID) {
      headers.set('x-session-id', userInfo.sessionID);
    }
  }

  let customOptions = {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers,
  };

  return Object.assign(customOptions, options); //{...customOptions,...options};
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  options = optionsAppend(options);
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({ data }))
    .catch((err) => ({ err }));
}
