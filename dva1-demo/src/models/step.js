import { routerRedux } from 'dva/router';
import { message } from 'antd';
import utils from '../utils/cookie';
import { createFence } from '../services/step';

const moment = require('moment');
const _ = require('lodash');

export default {
  namespace: 'step',
  state: {
    fenceData: {},
    alarmData: {},
    lists: [],
  },
  effects: {
    * create({ payload }, { call, put }) {
      const results = yield call(createFence, payload);
      console.log(results, 'results');
      if (results.data && results.data.errcode === 0) {
        message.success('success', 3);
        yield put(routerRedux.push('/fence/list'));
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * setLink({ payload }, { call, put }) {
      yield put(routerRedux.push(payload));
    },
  },
  reducers: {
    'fenceInfo'(state, { payload }) {
      return {
        ...state,
        fenceData: {
          srcData: payload,
        },
      }
    },
    'alarmInfo'(state, { payload }) {
      return {
        ...state,
        // postData: {
        //   srcData: payload,
        // },
        alarmData: payload,
      }
    },
  },
}
