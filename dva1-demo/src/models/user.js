import { routerRedux } from 'dva/router';
import { message } from 'antd';
import utils from '../utils/cookie';
import { getAccount, addAccount, updateAccount, deleteAccount, getAllot, allotDevice } from '../services/user';

const moment = require('moment');
const _ = require('lodash');

export default {
  namespace: 'user',
  state: {
    currentItem: {},
    lists: [],
    allotLists: [],
    addModalFlag: false,
    updateModalFlag: false,
    allotModalFlag: false,
    loading: false,
    currentId: '',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/user') {
          dispatch({ type: 'query', payload: {} });
          dispatch({ type: 'queryAllot', payload: {} });
        }
      });
    },
  },
  effects: {
    * query({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const results = yield call(getAccount, payload);
      if (results.data && results.data.errcode === 0) {
        yield put({ type: 'queryList', payload: results.data.data })
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * add({ payload }, { call, put, select }) {
      const results = yield call(addAccount, payload);
      if (results.data && results.data.errcode === 0) {
        message.success('success!', 3);
        yield put({ type: 'hideAddModal' });
        yield put({ type: 'query', payload: {} });
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * update({ payload }, { call, put }) {
      const results = yield call(updateAccount, payload);
      if (results.data && results.data.errcode === 0) {
        message.success('success!', 3);
        yield put({ type: 'hideUpdateModal' });
        yield put({ type: 'query', payload: {} });
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * delete({ payload }, { call, put }) {
      const results = yield call(deleteAccount, payload);
      if (results.data && results.data.errcode === 0) {
        message.success('success!', 3);
        yield put({ type: 'query', payload: {} });
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * queryAllot({ payload }, { call, put }) {
      if (typeof(payload) === 'object') return;
      const results = yield call(getAllot, payload);
      console.log(results, 'results');
      if (results.data && results.data.errcode === 0) {
        yield put({ type: 'showAllotModal', payload: { id: payload } })
        yield put({ type: 'queryAllotList', payload: results.data.data });
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * setAllot({ payload }, { call, put }) {
      const results = yield call(allotDevice, payload.obj, payload.id);
      // console.log(results, 'results');
      if (results.data && results.data.errcode === 0) {
        message.success('success!', 3);
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
    'queryAllotList'(state, { payload }) {
      _.forEach(payload, item => {
        item.updatedTime = moment(item.updatedTime).format('YYYY-MM-DD HH:mm:ss');
        item.children && _.forEach(item.children, item => {
          item.updatedTime = moment(item.updatedTime).format('YYYY-MM-DD HH:mm:ss');
        })
      })
      return {
        ...state,
        allotLists: payload,
        loading: false,
      };
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
    'showUpdateModal'(state, { payload }) {
      return {
        ...state,
        currentItem: payload.currentItem,
        updateModalFlag: true,
      }
    },
    'hideUpdateModal'(state) {
      return {
        ...state,
        updateModalFlag: false,
      }
    },
    'showAllotModal'(state, { payload }) {
      return {
        ...state,
        allotModalFlag: true,
        currentId: payload.id,
      }
    },
    'hideAllotModal'(state) {
      return {
        ...state,
        allotModalFlag: false,
      }
    },
  },
}
