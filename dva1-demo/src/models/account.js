import { routerRedux } from 'dva/router';
import { message } from 'antd';
import utils from '../utils/cookie';
import { update, reset } from '../services/account';
const _ = require('lodash');

export default {
  namespace: 'account',
  state: {
    context: 'test',
  },
  subscriptions: {
    setup({ dispatch }) {},
  },
  effects: {
    * update({ payload }, { call, put }) {
      const results = yield call(update, payload);
      // console.log(results.data.data);
      if (results.data && results.data.errcode === 0) {
        let userInfo = utils.getCookie('trackerSessionID');
        let old = JSON.parse(decodeURIComponent(userInfo));
        let last = results.data.data;
        _.assign(old, last);
        yield put({
          type: 'app/updateInfo',
          payload: old.sessionID,
        })
        message.success('success!', 3);
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * reset(action, { call, put }) {
      const results = yield call(reset, action.payload);
      // console.log(results);
      if (results.data && results.data.errcode === 0) {
        message.success('success!', 3);
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
  },
  reducers: {
    // loginSuccess(state, action) {   return { ...state, ...action.payload} }
  },
}
