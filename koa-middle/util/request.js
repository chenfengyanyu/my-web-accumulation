const request = require('request');
const logger = require('./log').getLogger('request');

const defaul_options = {
  timeout: 5*60*1000,
};
const allowMethods = [ 'get', 'post' ];

/**
 * @param  {} method
 * @param  {} url
 * @param  {} params
 */
const _request = (method, url, params) => {
  return new Promise((resolve, reject) => {
    if (!url) {
      return reject(new Error('http url invalid!'));
    }
    if (!method || !method.toString()) {
      return reject(new Error('http method invalid!'));
    }

    method = method.toString().toLowerCase();
    if (!allowMethods.includes(method)) {
      return reject(new Error(`http method is not allowed! method: ${method}`));
    }

    let option = {
      url,
    }

    if (method === 'get') option.qs = params || {};
    if (method === 'post') {
      option.body = params;
      option.json = true;
    }

    option = Object.assign({ ...defaul_options }, option);

    logger.info({ type: 'request params', method, option });
    // console.error({ type: 'request params', method, option });
    request[ method ](option, (err, res, body) => {
      if (err) {
          logger.error('[request] error ', method, option, err, ' status is ', res && res.statusCode, ' res is ', body);
          return reject(
              new Error(
                `request api failed! error: ${err.message} method: ${method} url: ${url} params: ${JSON.stringify(params)}`
              )
          );
      }
      if (!body) logger.info(`[native request] , ${method}, ${JSON.stringify(option)}, response data: ${JSON.stringify(body)};`);

      logger.debug(`[native request] , ${method}, ${JSON.stringify(option)}, response data: ${JSON.stringify(body)};`);
      logger.info(`[native request] , ${method}, ${JSON.stringify(option)}`);
      
      try {
        return resolve(body);
      } catch (e) {
        throw 'response json parse failed!';
      }
      
    });
  })
}

exports.get = function get(url, qs) {
  return _request('get', url, qs);
};

exports.post = function post(url, params) {
  return _request('post', url, params);
};
