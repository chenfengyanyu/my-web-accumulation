import { routerRedux } from 'dva/router';
import { message, notification } from 'antd';
import utils from '../utils/cookie';
import { getTracker, updateCycle } from '../services/tracker';
import { getFence, bulkBindFence } from '../services/fence';

const moment = require('moment');
const _ = require('lodash');

export default {
  namespace: 'bulk',
  state: {
    lists: [],
    fenceLists: [],
    loading: false,
    step: 0,
    btnStatus: 'disabled',
    tempStorage: {},
    checkStatus: false,
    fenceBtnStatus: 'disabled',
    fenceStep: 0,
    fenceCheckStatus: false,
    fenceStorage: {},
    deviceCheckStatus: true,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/cycle' || location.pathname === '/fences') {
          dispatch({ type: 'query', payload: { owners: location.query.owners } });
        }
        if (location.pathname === '/fences') {
          dispatch({ type: 'queryFence', payload: {} });
        }
      });
    },
  },
  effects: {
    * query({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const results = yield call(getTracker, payload);
      // console.log(results);
      if (results.data && results.data.errcode === 0) {
        yield put({ type: 'queryList', payload: results.data.data });
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * queryFence({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const results = yield call(getFence, payload);
      if (results.data && results.data.errcode === 0) {
        yield put({ type: 'queryFenceList', payload: results.data.data });
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * temp({ payload }, { call, put, select }) {
      let old = yield select(state => state.bulk.tempStorage);
      yield put({ type: 'tempStorage', payload: Object.assign(old, payload) });
    },
    * fence({ payload }, { call, put, select }) {
      let old = yield select(state => state.bulk.fenceStorage);
      yield put({ type: 'fenceStorage', payload: Object.assign(old, payload) });
    },
    * cycle({ payload }, { call, put, select }) {
      const results = yield call(updateCycle, payload);
      if (results.data && results.data.errcode === 0) {
        let ok = results.data.ok;
        let fail = results.data.faild;
        let nopermiss = results.data.noPermissionSnList;
        if (ok.length > 0) {
          notification.success({ message: 'Success SN list', description: ok.join(' , '), duration: null });
        }
        if (fail.length > 0) {
          notification.error({ message: 'Fail Sn list', description: fail.join(' , '), duration: null });
        }
        if (nopermiss.length > 0) {
          notification.warn({ message: 'No Permission Sn List', description: nopermiss.join(' , '), duration: null });
        }
        yield put(routerRedux.replace('/tracker'));
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * bind({ payload }, { call, put, select }) {
      const results = yield call(bulkBindFence, payload);
      if (results.data && results.data.errcode === 0) {
        message.success('success', 3);
        yield put(routerRedux.replace('/tracker'));
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
  },
  reducers: {
    'queryList'(state, { payload }) {
      _.forEach(payload, item => {
        item.updatedTime = moment(item.updatedTime).format('YYYY-MM-DD HH:mm:ss');
        item.children && _.forEach(item.children, item => {
          item.updatedTime = moment(item.updatedTime).format('YYYY-MM-DD HH:mm:ss');
        })
      })
      return {
        ...state,
        lists: payload,
        loading: false,
      };
    },
    'queryFenceList'(state, { payload }) {
      _.forEach(payload, item => {
        item.updatedTime = moment(item.updatedTime).format('YYYY-MM-DD HH:mm:ss');
        item.children && _.forEach(item.children, item => {
          item.updatedTime = moment(item.updatedTime).format('YYYY-MM-DD HH:mm:ss');
        })
      })
      return {
        ...state,
        fenceLists: payload,
        loading: false,
      };
    },
    'tempStorage'(state, { payload }) {
      return {
        ...state,
        tempStorage: payload,
        step: payload.step,
        btnStatus: payload.step === 2 ? '' : 'disabled',
        checkStatus: payload.step > 0 && true,
      }
    },
    'fenceStorage'(state, { payload }) {
      return {
        ...state,
        fenceStorage: payload,
        fenceStep: payload.step,
        fenceBtnStatus: payload.step === 2 ? '' : 'disabled',
        fenceCheckStatus: payload.step > 0 && true,
      }
    },
  },
}
