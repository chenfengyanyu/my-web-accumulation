import { message } from 'antd';
import { getTracker, getOverview, getOneDevice, bindDevice, unbindFence, deleteDevice, updateCycle, updateDevice, pullDevice } from '../services/tracker';
import { getFence } from '../services/fence';
import Mixin from '../utils/mixin';

const moment = require('moment');
const _ = require('lodash');

export default {
  namespace: 'tracker',
  state: {
    loading: true,
    lists: [],
    oneDevice: {},
    fenceList: [],
    overviewInfo: {
      all: 0,
      inactive: 0,
      offline: 0,
      normal: 0,
    },
    bindModalFlag: false,
    shape: {},
    mapModalFlag: false,
    currentItem: {},
    cycleModalFlag: false,
    editModalFlag: false,
    tabActive: 'list',
    tabEle: '',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/tracker' || location.pathname === '/') {
          dispatch({ type: 'query', payload: {} });
          dispatch({ type: 'overview', payload: {} });
        }
        if (location.pathname === '/bind') {
          dispatch({ type: 'queryOne', payload: location.query.sn });
          // dispatch({ type: 'fenceList', payload: {} });
        }
      });
    },
  },
  effects: {
    * query({ payload }, { call, put, select }) {
      // let ownersId = yield select(state => state.app.user.id);
      // Object.assign(payload, { owners: ownersId });
      yield put({ type: 'showLoading' });
      const results = yield call(getTracker, payload);
      // console.log(results);
      if (results.data && results.data.errcode === 0) {
        yield put({ type: 'queryList', payload: results.data.data });
        yield put({
          type: 'switchTab',
          payload: {
            ele: '',
            act: 'list',
          },
        })
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * queryOne({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const results = yield call(getOneDevice, payload);
      if (results.data && results.data.errcode === 0) {
        if (results.data.data.geofences && results.data.data.geofences.length > 0) {
          yield put({
            type: 'updateShape',
            payload: results.data.data.geofences,
          });
        }
        yield put({ type: 'queryOneInfo', payload: results.data.data });
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * overview({ payload }, { call, put }) {
      const results = yield call(getOverview, payload);
      // console.log(results);
      if (results.data && results.data.errcode === 0) {
        yield put({
          type: 'getOverview',
          payload: {
            all: results.data.total,
            inactive: results.data.notActive,
            offline: results.data.offLine,
            normal: (results.data.total - results.data.notActive - results.data.offLine),
          },
        })
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * fenceList({ payload }, { call, put, select }) {
      const results = yield call(getFence, payload);
      // console.log(results);
      if (results.data && results.data.errcode === 0) {
        let part = yield select(state => state.tracker.oneDevice.geofences);
        let all = results.data.data;
        yield put({ type: 'queryFenceList', payload: Mixin.filterArr(all, part) });
        yield put({
          type: 'showBindModal',
          payload: {
            currentItem: {},
          },
        })
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * bind({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      let sn = payload.sn;
      const results = yield call(bindDevice, sn, payload.obj);
      if (results.data && results.data.errcode === 0) {
        yield put({ type: 'queryOne', payload: sn });
        message.success('success!', 3);
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * unBind({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const results = yield call(unbindFence, payload);
      if (results.data && results.data.errcode === 0) {
        yield put({ type: 'queryOne', payload: payload.sn });
        yield put({
          type: 'updateShape',
          payload: [{
            srcData: {},
          }],
        })
        message.success('success!', 3);
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * showShape({ payload }, { call, put, select }) {
      let arrs = yield select(state => state.tracker.oneDevice.geofences);
      yield put({
        type: 'updateShape',
        payload: _.filter(arrs, item => item.id === payload),
      });
    },
    * delete({ payload }, { call, put }) {
      const results = yield call(deleteDevice, payload);
      if (results.data && results.data.errcode === 0) {
        yield put({ type: 'query', payload: {} });
        message.success('success!', 3);
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * cycle({ payload }, { call, put }) {
      const results = yield call(updateCycle, payload);
      if (results.data && results.data.errcode === 0) {
        if (results.data.ok.length > 0) {
          message.success('success!', 3);
        } else if (results.data.faild.length > 0) {
          message.error('faild!', 3);
        } else if (results.data.noPermissionSnList.length > 0) {
          message.info('no permission!', 3);
        }
        // yield put({ type: 'query', payload: {} });
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * update({ payload }, { call, put }) {
      const results = yield call(updateDevice, payload.sn, payload.obj);
      if (results.data && results.data.errcode === 0) {
        yield put({ type: 'query', payload: {} });
        message.success('success!', 3);
      } else {
        results.err && message.error(results.err.errmsg, 3);
      }
    },
    * pull({ payload }, { call, put }) {
      const results = yield call(pullDevice);
      if (results.data && results.data.errcode === 0) {
        yield put({ type: 'query', payload: {} });
        message.success('success!', 3);
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
    'queryOneInfo'(state, { payload }) {
      return {
        ...state,
        oneDevice: payload,
        loading: false,
      }
    },
    'queryFenceList'(state, { payload }) {
      return {
        ...state,
        fenceList: payload,
      }
    },
    'updateShape'(state, { payload }) {
      return {
        ...state,
        shape: payload[0].srcData,
      }
    },
    'getOverview'(state, { payload }) {
      return {
        ...state,
        overviewInfo: payload,
      };
    },
    'showBindModal'(state, { payload }) {
      return {
        ...state,
        currentItem: payload.currentItem,
        bindModalFlag: true,
      }
    },
    'hideBindModal'(state) {
      return {
        ...state,
        bindModalFlag: false,
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
    'showCycleModal'(state, { payload }) {
      return {
        ...state,
        currentItem: payload.currentItem,
        cycleModalFlag: true,
      }
    },
    'hideCycleModal'(state) {
      return {
        ...state,
        cycleModalFlag: false,
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
    'switchTab'(state, { payload }) {
      return {
        ...state,
        tabActive: payload.act,
        tabEle: payload.ele,
      }
    },
  },
};
