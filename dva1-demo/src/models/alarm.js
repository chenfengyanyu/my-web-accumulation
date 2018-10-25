import { message } from 'antd';
import { queryAlarmLogs } from '../services/alarm.js';

const _ = require('lodash');
const moment = require('moment');
const startDate = moment().subtract(2, 'days').startOf('day')
  .valueOf();
const endDate = moment().endOf('day').valueOf();

export default {
  namespace: 'alarm',
  state: {
    logs: [],
    tatal: 0,
    mapModalFlag: false,
    currentItem: {},
    query: {
      startDate,
      endDate,
      search: '',
      page: 1,
      limit: 10,
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        const pathname = location.pathname.replace(/\//g, '');
        if (pathname === 'alarm') {
          dispatch({
            type: 'filter',
          })
        }
      })
    },
  },
  effects: {
    /**
      payload: {
        startDate,
        endDate,
        search: '',
        page: 1,
        limit: 10,·
      }
     */
    * filter({ payload }, { call, put, select }) {
      let params = yield select((state) => state.query);
      params = Object.assign({}, params, payload);
      yield put({ type: 'showLoading' });
      let results = yield call(queryAlarmLogs, params);

      if (results && results.data && results.data.errcode === 0) {
        yield put({
          type: 'showLogs',
          payload: {
            data: results.data.data || [],
            total: results.data.count,
            params,
          },
        });
      }
    },
  },
  reducers: {
    'showLogs'(state, { payload: { data, params, total } }) {
      let sortAndFormat = _.sortBy(data, item => -item.createdTime);
      _.map(sortAndFormat, item => { item.updatedTime = moment(item.createdTime).format('YYYY-MM-DD HH:mm:ss') });
      return { ...state, total, logs: sortAndFormat, loading: false, query: params };
    },
    'showLoading'(state) {
      return { ...state, loading: true }
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
};
