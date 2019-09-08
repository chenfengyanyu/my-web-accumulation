import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Box from './login/index';
import Dot from '../components/common/Dot';
import Circle from '../components/common/Circle';
import Wave from '../components/common/Wave';
import styles from '../components/layout/main.less';
import { Spin } from 'antd';
import '../components/layout/common.less';

const Login = ({ location, dispatch, app, loading }) => {
  const {
    login,
    loginButtonLoading,
    user,
    siderFold,
    darkTheme,
    isNavbar,
  } = app;
  const loginProps = {
    loading,
    loginButtonLoading,
    onOk(data) {
      dispatch({ type: 'app/login', payload: data });
    },
  }

  return (
    <div className={styles.spin}>
      <Dot size={10} position={['20%', '20%']} />
      <Dot size={9} position={['95%', '60%']} />
      <Dot size={8} position={['50%', '92%']} />
      <Dot size={5} position={['60%', '25%']} />
      <Dot size={10} position={['30%', '80%']} />
      <Circle size={0.8} position={['25%', '45%']} />
      <Wave size={1.2} position={['55%', '5%']} />
      <Wave size={0.8} position={['70%', '80%']} />
      <Spin tip="加载用户信息..." spinning={false} size="large">
        <Box {...loginProps} />
      </Spin>
    </div>
  )
}

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(Login);
