import { login, logout, getUserInfo, switchAccount, quitAccount } from '../services/login';
import { parse } from 'qs';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import utils from '../utils/cookie';

export default {
  namespace: 'app',
  state: {
    user: {},
    isLogin: false,
    loginButtonLoading: false,
    menuPopoverVisible: false,
    darkTheme: true,
    siderFold: false,
    isNavbar: document.body.clientWidth < 769,
    controllFlag: false,
    navOpenKeys: JSON.parse(localStorage.getItem('navOpenKeys') || '[]'),
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname !== '/login') {
          dispatch({ type: 'is_login', payload: {} });
        }
      });
      window.onresize = () => {
        dispatch({ type: 'changeNavbar' });
      }
    },
  },
  effects: {
    * login({ payload }, { call, put }) {
      yield put({ type: 'showLoginButtonLoading' });
      const results = yield call(login, parse(payload));
      if (results.data && results.data.errcode === 0) {
        yield put({
          type: 'loginSuccess',
          payload: {
            user: results.data.data,
          },
        })
        document.cookie = `trackerSessionID=${encodeURIComponent(JSON.stringify(results.data.data))}`;
        let path = location.search.split('=')[1];
        if (path) {
          yield put(routerRedux.replace(`/${path.replace('%2F', '')}`));
        } else {
          yield put(routerRedux.replace('/'));
        }
      } else {
        yield put({ type: 'hideLoginButtonLoading' });
        results.err && message.error(results.err.errmsg, 3);
        yield put(routerRedux.replace('/login'));
      }
    },
    * is_login(payload, { call, put, select }) {
      const isLogin = !!utils.getCookie('trackerSessionID');
      if (!isLogin) {
        message.warning('Login expired, please re-login.', 3);
        yield put({
          type: 'logoutSuccess',
          payload: {},
        })
      } else {
        let userInfo = utils.getCookie('trackerSessionID');
        if (typeof userInfo === 'string') {
          yield put({
            type: 'updateUserInfo',
            payload: {
              user: JSON.parse(decodeURIComponent(userInfo)),
            },
          });
        }
      }
    },
    * logout({ payload }, { call, put }) {
      const { data } = yield call(logout, payload);
      utils.delCookie('trackerSessionID');
      yield put(routerRedux.replace('/login'));
      if (data && data.errcode === 0) {
        yield put({
          type: 'logoutSuccess',
          payload: {},
        })
      }
    },
    * controll({ payload }, { call, put }) {
      const { data } = yield call(switchAccount, payload);
      console.log(data, 'data');
      if (data && data.errcode === 0) {
        yield put({
          type: 'updateUserInfo',
          payload: {
            user: data.data,
          },
        });
        document.cookie = `trackerSessionID=${encodeURIComponent(JSON.stringify(data.data))}`;
        location.reload();
        yield put(routerRedux.replace('/'));
      } else {
        message.warning('Invalid access permission!', 3);
      }
    },
    * deleteControll({ payload }, { call, put }) {
      const { data } = yield call(quitAccount, payload);
      if (data && data.errcode === 0) {
        yield put({
          type: 'updateUserInfo',
          payload: {
            user: data.data,
          },
        });
        document.cookie = `trackerSessionID=${encodeURIComponent(JSON.stringify(data.data))}`;
        // yield put(routerRedux.push('/'));
        location.reload();
      } else {
        message.warning('System busy, please try again!', 3);
      }
    },
    * updateInfo({ payload }, { call, put }) {
      const { data } = yield call(getUserInfo, payload);
      if (data && data.errcode === 0) {
        let temp = data.data;
        yield put({
          type: 'updateUserInfo',
          payload: {
            user: temp,
          },
        })
        Object.assign(temp, { sessionID: payload });
        document.cookie = `trackerSessionID=${encodeURIComponent(JSON.stringify(temp))}`;
      } else {
        data && message.error(data.errmsg, 3);
        // yield put(routerRedux.replace('/login'));
      }
    },
    * switchSider({ payload }, { put }) {
      yield put({ type: 'handleSwitchSider' })
    },
    * changeNavbar({ payload }, { put }) {
      if (document.body.clientWidth < 769) {
        yield put({ type: 'showNavbar' })
      } else {
        yield put({ type: 'hideNavbar' })
      }
    },
    * switchMenuPopver({ payload }, { put }) {
      yield put({ type: 'handleSwitchMenuPopver' })
    },
  },
  reducers: {
    loginSuccess(state, action) {
      return {
        ...state,
        ...action.payload,
        loginButtonLoading: false,
        isLogin: true,
      }
    },
    logoutSuccess(state, action) {
      return {
        ...state,
        user: {},
        isLogin: false,
      }
    },
    updateUserInfo(state, action) {
      return {
        ...state,
        ...action.payload,
        isLogin: true,
      }
    },
    resetUserInfo(state, action) {
      return {
        ...state,
        user: action.payload,
      }
    },
    showLoginButtonLoading(state) {
      return {
        ...state,
        loginButtonLoading: true,
      }
    },
    hideLoginButtonLoading(state) {
      return {
        ...state,
        loginButtonLoading: false,
      }
    },
    handleSwitchSider(state) {
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },
    showNavbar(state) {
      return {
        ...state,
        isNavbar: true,
      }
    },
    hideNavbar(state) {
      return {
        ...state,
        isNavbar: false,
      }
    },
    handleSwitchMenuPopver(state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },
    handleNavOpenKeys(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
