const logger = require('../util/log').getLogger('error_handle');
const SERVICE_UNAVALIABLE = 503;

module.exports = () => async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      logger.error('[error_handle] occurs error ', e.stack);
    
      if (e.status === 404) {
          ctx.body = {
              result: '404',
              message: 'Method Not Found',
          };
          return;
      }

   
      ctx.body = {
          result: '500',
          message: e.message || '请求出错',
      };
    }
};