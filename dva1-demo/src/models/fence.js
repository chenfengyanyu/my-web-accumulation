import { routerRedux } from 'dva/router';
import { message } from 'antd';
import utils from '../utils/cookie';
import { createNotify, updateFence, deleteFence, getFence, getOverview } from '../services/fence';

const moment = require('moment');
const _ = require('lodash');

export default {
  namespace: 'fence',
  state: {
    currentItem: {},
    lists: [],
    alarmModalFlag: false,
    editModalFlag: false,
    loading: false,
    overviewInfo: {
      all: 0,
      use: 0,
      unuse: 0,
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/fence/list') {
          dispatch({ type: 'query', payload: {} });
          dispatch({ type: 'overview', payload: {} });
        }
      });
    },
  },
  effects: {
    * query({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const results = yield call(getFence, payload);
      // console.log(results, 'query');
      if (results.data && results.data.errcode === 0) {
        yield put({ type: 'queryList', payload: results.data.data })
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * add({ payload }, { call, put, select }) {
      const results = yield call(createNotify, payload);
      if (results.data && results.data.errcode === 0) {
        message.success('success!', 3);
        yield put({ type: 'hideAddModal' });
        yield put({ type: 'query', payload: {} });
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * update({ payload }, { call, put, select }) {
      const results = yield call(updateFence, payload);
      if (results.data && results.data.errcode === 0) {
        yield put({ type: 'hideAlarmModal' });
        yield put({ type: 'query', payload: {} });
        message.success('success!', 3);
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * delete({ payload }, { call, put }) {
      const results = yield call(deleteFence, payload);
      if (results.data && results.data.errcode === 0) {
        message.success('success!', 3);
        yield put({ type: 'query', payload: {} });
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * overview({ payload }, { call, put }) {
      const results = yield call(getOverview, payload);
      if (results.data && results.data.errcode === 0) {
        yield put({
          type: 'getOverview',
          payload: {
            all: results.data.all,
            use: results.data.use,
            unuse: (results.data.all - results.data.use),
          },
        })
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * setLink({ payload }, { call, put }) {
      yield put(routerRedux.push(payload));
    },
  },
  reducers: {
    'queryList'(state, { payload }) {
      _.forEach(payload, item => {
        item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss');
        item.children && _.forEach(item.children, item => {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss');
        })
      })
      return {
        ...state,
        lists: payload,
        loading: false,
      };
    },
    'updateList'(state, { payload }) {
      return {
        ...state,
        currentItem: payload,
      };
    },
    'getOverview'(state, { payload }) {
      return {
        ...state,
        overviewInfo: payload,
      };
    },
    'showLoading'(state) {
      return {
        ...state,
        loading: true,
      }
    },
    'showAlarmModal'(state, { payload }) {
      return {
        ...state,
        currentItem: payload.currentItem,
        alarmModalFlag: true,
      }
    },
    'hideAlarmModal'(state) {
      return {
        ...state,
        alarmModalFlag: false,
      }
    },
    'showEditModal'(state, { payload }) {
      return {
        ...state,
        currentItem: payload.currentItem,
        editModalFlag: true,
      }
    },
    'hideEditModal'(state) {
      return {
        ...state,
        editModalFlag: false,
      }
    },
  },
}
