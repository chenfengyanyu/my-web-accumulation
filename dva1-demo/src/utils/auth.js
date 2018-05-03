import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerActions } from 'react-router-redux';

export const requireAuthentication = UserAuthWrapper({
  authSelector: state => state.app,
  predicate: app => app.isLogin,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsJWTAuthenticated',
})
