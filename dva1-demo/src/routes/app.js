import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { LocaleProvider, locales, Spin } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import Header from '../components/layout/header';
import Bread from '../components/layout/bread';
import Footer from '../components/layout/footer';
import Sider from '../components/layout/sider';
import styles from '../components/layout/main.less';
import { classnames } from '../utils';
import '../components/layout/common.less';


function App({ children, location, dispatch, app, loading }) {
  const {
    loginButtonLoading,
    user,
    siderFold,
    darkTheme,
    isNavbar,
    controllFlag,
    menuPopoverVisible,
  } = app;
  const headerProps = {
    user,
    controllFlag,
    siderFold,
    location,
    isNavbar,
    menuPopoverVisible,
    switchMenuPopover() {
      dispatch({ type: 'app/switchMenuPopver' })
    },
    logout() {
      dispatch({ type: 'app/logout' });
    },
    switchSider() {
      dispatch({ type: 'app/switchSider' });
    },
    quitController() {
      dispatch({
        type: 'app/deleteControll',
        payload: {
          id: user.id,
        },
      })
    },
  }

  const siderProps = {
    siderFold,
    darkTheme,
    location,
  }

  return (
    <div>
      <LocaleProvider locale={enUS}>
        <div className={classnames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold }, { [styles.withnavbar]: isNavbar })}>
            {!isNavbar
              ? <aside className={classnames(styles.sider, { [styles.light]: !darkTheme })}>
                <Sider {...siderProps} />
              </aside>
              : ''}
          <div className={styles.main}>
            <Header {...headerProps} />
            <Bread location={location} />
            <div className={styles.container}>
              <div className={styles.content}>
                {children}
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </LocaleProvider>
    </div>
  )
}

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(App);
