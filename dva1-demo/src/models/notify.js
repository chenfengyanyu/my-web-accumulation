import { routerRedux } from 'dva/router';
import { message } from 'antd';
import utils from '../utils/cookie';
import { createNotify, updateNotify, deleteNotify, getNotify } from '../services/notify';

const moment = require('moment');
const _ = require('lodash');

export default {
  namespace: 'notify',
  state: {
    currentItem: {},
    lists: [],
    addModalFlag: false,
    loading: false,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/notify') {
          dispatch({ type: 'query', payload: {} });
        }
      });
    },
  },
  effects: {
    * query({
      payload,
    }, { call, put }) {
      yield put({ type: 'showLoading' });
      const results = yield call(getNotify, payload);
      // console.log(results,'results');
      if (results.data && results.data.errcode === 0) {
        yield put({ type: 'queryList', payload: results.data.data })
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * add({
      payload,
    }, { call, put, select }) {
      const results = yield call(createNotify, payload);
      if (results.data && results.data.errcode === 0) {
        message.success('success!', 3);
        yield put({ type: 'hideAddModal' });
        yield put({ type: 'query', payload: {} });
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * update({
      payload,
    }, { call, put }) {
      const results = yield call(updateNotify, payload);
      console.log(results, 'results');
      if (results.data && results.data.errcode === 0) {
        message.success('success!', 3);
        yield put({ type: 'hideAddModal' });
        yield put({ type: 'query', payload: {} });
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * delete({
      payload,
    }, { call, put }) {
      const results = yield call(deleteNotify, payload);
      if (results.data && results.data.errcode === 0) {
        message.success('success!', 3);
        yield put({ type: 'query', payload: {} });
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
  },
  reducers: {
    'queryList'(state, { payload }) {
      _.forEach(payload, item => {
        item.createdTime = moment(item.createdTime).format('YYYY-MM-DD HH:mm:ss');
        item.children && _.forEach(item.children, item => {
          item.createdTime = moment(item.createdTime).format('YYYY-MM-DD HH:mm:ss');
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
    'showLoading'(state) {
      return {
        ...state,
        loading: true,
      }
    },
    'showAddModal'(state, { payload }) {
      return {
        ...state,
        currentItem: payload.currentItem,
        addModalFlag: true,
      }
    },
    'hideAddModal'(state) {
      return {
        ...state,
        addModalFlag: false,
      }
    },
  },
}
