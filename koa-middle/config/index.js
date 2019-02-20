const _ = require('lodash');
const default_cfg = require('./default');
const dev_cfg = require('./dev');
const test_cfg = require('./testing');
const staging_cfg = require('./staging');
const prod_cfg = require('./prod');
const process = require('process');


const env = process.env.NODE_ENV;
let cfg = '';
switch (env) {
  case 'test':
    cfg = _.merge(default_cfg, test_cfg);
    break;
  case 'staging':
    cfg = _.merge(default_cfg, staging_cfg);
    break;
  case 'prod':
    cfg = _.merge(default_cfg, prod_cfg, prod_cfg);
    break;
  case 'dev':
    cfg = _.merge(default_cfg, dev_cfg);
    break;
  default :
    cfg = default_cfg;
}


module.exports = cfg;