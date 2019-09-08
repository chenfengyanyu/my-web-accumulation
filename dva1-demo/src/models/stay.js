import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { createNotify, updateNotify, deleteNotify, getStay, getExcel } from '../services/stay';

const moment = require('moment');
const _ = require('lodash');

export default {
  namespace: 'stay',
  state: {
    currentItem: {},
    lists: [],
    mapModalFlag: false,
    loading: false,
    total: 0,
    query: {
      search: '',
      page: 1,
      limit: 10,
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/stay') {
          dispatch({ type: 'query' });
        }
      });
    },
  },
  effects: {
    * query({ payload }, { call, put, select }) {
      let params = yield select((state) => state.stay.query);
      params = Object.assign({}, params, payload);
      yield put({ type: 'showLoading' });
      const results = yield call(getStay, params);
      if (results.data && results.data.errcode === 0) {
        yield put({
          type: 'queryList',
          payload: {
            data: results.data.data || [],
            total: results.data.count,
            params,
          },
        })
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * download({ payload }, { call, put }) {
      const results = yield call(getExcel, payload);
    },
  },
  reducers: {
    'queryList'(state, { payload }) {
      _.forEach(payload.data, item => {
        item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss');
        item.children && _.forEach(item.children, item => {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss');
        })
      })
      return {
        ...state,
        total: payload.total,
        lists: payload.data,
        loading: false,
        query: payload.params,
      };
    },
    'showLoading'(state) {
      return {
        ...state,
        loading: true,
      }
    },
    'showMapModal'(state, { payload }) {
      return {
        ...state,
        currentItem: payload.currentItem,
        mapModalFlag: true,
      }
    },
    'hideMapModal'(state) {
      return {
        ...state,
        mapModalFlag: false,
      }
    },
  },
}
