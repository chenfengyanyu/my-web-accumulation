import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'dva/router';
import { requireAuthentication } from './utils/auth';
import App from './routes/app';
import Login from './routes/login';

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/login',
      component: Login,
      getIndexRoute(nextState, cb) {
        require.ensure([], require => {
          cb(null, { component: require('./routes/login/') });
        }, 'login')
      },
    }, {
      path: '/',
      component: requireAuthentication(App),
      getIndexRoute(nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/tracker'));
          cb(null, { component: require('./routes/tracker/index') });
        }, 'tracker')
      },
      childRoutes: [
        {
          path: 'account',
          name: 'account',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/account'));
              cb(null, require('./routes/account/index'));
            }, 'account')
          },
        }, {
          path: 'user',
          name: 'user',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/user'));
              cb(null, require('./routes/user/index'));
            }, 'user')
          },
        }, {
          path: 'alarm',
          name: 'alarm',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/alarm'));
              cb(null, require('./routes/alarm/index'));
            }, 'alarm')
          },
        }, {
          path: 'tracker',
          name: 'tracker',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/tracker'));
              cb(null, require('./routes/tracker/index'));
            }, 'tracker')
          },
        }, {
          path: 'cycle',
          name: 'cycle',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/bulk'));
              cb(null, require('./routes/bulk/cycle'));
            }, 'cycle')
          },
        }, {
          path: 'fences',
          name: 'fences',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/bulk'));
              cb(null, require('./routes/bulk/fences'));
            }, 'fences')
          },
        }, {
          path: 'bind',
          name: 'bind',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/tracker'));
              cb(null, require('./routes/tracker/bind'));
            }, 'bind')
          },
        }, {
          path: 'notify',
          name: 'notify',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/notify'));
              cb(null, require('./routes/notify/index'));
            }, 'notify')
          },
        }, {
          path: 'stay',
          name: 'stay',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/stay'));
              cb(null, require('./routes/stay/index'));
            }, 'stay')
          },
        }, {
          path: 'fence/list',
          name: 'fence',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/fence'));
              cb(null, require('./routes/fence/index'));
            }, 'index')
          },
        }, {
          path: 'fence/step',
          name: 'step',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/step'));
              cb(null, require('./routes/step/index'));
            }, 'index')
          },
        }, {
          path: '*',
          name: 'error',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error/index'));
            }, 'error')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers;
