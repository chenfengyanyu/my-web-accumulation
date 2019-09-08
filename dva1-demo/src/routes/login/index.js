import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Form, Input } from 'antd';
import { config } from '../../utils';
import styles from './index.less';

const FormItem = Form.Item

const login = ({
  loginButtonLoading,
  onOk,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      onOk(values);
    })
  }

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img alt={'logo'} src={config.logoSrc} />
        <span>Tracker</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: 'Login account can\'t be empty.',
              },
            ],
          })(<Input size="large" onPressEnter={handleOk} placeholder="Email Account" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Password can\'t be empty.',
              },
            ],
          })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="Password" />)}
        </FormItem>
        <Row>
          <Button type="primary" size="large" onClick={handleOk} loading={loginButtonLoading}>
            Login
          </Button>
        </Row>
        <p>SENSORO All Right Reserved © 2017</p>
      </form>
    </div>
  )
}

login.propTypes = {
  form: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  onOk: PropTypes.func,
}

export default Form.create()(login);
