import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Row, Col, Button, Form, Input } from 'antd';
import styles from './index.less'

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 8,
    },
    sm: {
      span: 14,
      offset: 8,
    },
  },
};

class passwordForm extends React.Component {
  handleCancel = () => {
    this.props.form.setFieldsValue({
      srcPwd: '',
      newPwd0: '',
      newPwd: '',
    });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPwd0')) {
      callback('Password reset failure, please check your old password.');
    } else {
      callback();
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.props.dispatch({
          type: 'account/reset',
          payload: values,
          success: (data) => {
            this.props.dispatch({
              type: 'app/logout',
              payload: data,
            });
          },
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const FormItems = [{
      key: 'srcPwd',
      lable: 'Old password',
      initialValue: '',
      isRequired: true,
      min: 6,
      message: 'Min length 6 characters',
    }, {
      key: 'newPwd0',
      lable: 'New password',
      initialValue: '',
      isRequired: true,
      min: 6,
      message: 'Min length 6 characters',
    }, {
      key: 'newPwd',
      lable: 'Confirm password',
      initialValue: '',
      isRequired: true,
      min: 6,
      message: 'Min length 6 characters',
      validate: this.checkPassword,
    }];
    return (
      <Form layout="horizontal" onSubmit={this.handleSubmit}>
      {
        FormItems.map(form => {
          return (
            <FormItem hasFeedback key={form.key} label={form.lable} {...formItemLayout}>
              {getFieldDecorator(form.key, {
                initialValue: form.initialValue,
                rules: [
                  {
                    required: true,
                    message: form.message,
                    min: form.min,
                  }, {
                    validator: form.validate,
                  },
                ],
              })(<Input type="password" placeholder={form.message} />)}
            </FormItem>
          )
        })
      }
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit"> Save </Button>
          <Button style={{ marginLeft: '10px' }} onClick={this.handleCancel}> Cancel </Button>
        </FormItem>
      </Form>
    );
  }
}

// passwordForm.propTypes = {
//   account: PropTypes.object,
//   location: PropTypes.object,
//   dispatch: PropTypes.func,
//   loading: PropTypes.bool,
// }

function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps)(Form.create()(passwordForm));
