import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Row, Col, Button, Form, Input } from 'antd';
import styles from './index.less'

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 6,
    },
    sm: {
      span: 14,
      offset: 6,
    },
  },
};

class accountForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'account/update',
          payload: values,
        })
      }
    });
  }

  handleCancel = () => {
    this.props.form.setFieldsValue({
      nickname: this.props.app.user && this.props.app.user.nickname,
      mobile: this.props.app.user && this.props.app.user.baseInfo && this.props.app.user.baseInfo.mobile,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const FormItems = [
      {
        key: 'nickname',
        lable: 'Name',
        initialValue: this.props.app.user && this.props.app.user.nickname,
        isRequired: true,
        message: 'Require Name',
      }, {
        key: 'mobile',
        lable: 'Phone',
        initialValue: this.props.app.user && this.props.app.user.baseInfo && this.props.app.user.baseInfo.mobile,
        isRequired: true,
        message: 'Require Phone',
      },
    ];
    return (
      <Form layout="horizontal" onSubmit={this.handleSubmit}>
        <FormItem key="account" label="Account:" {...formItemLayout}>
          {getFieldDecorator('account', {
            initialValue: this.props.app && this.props.app.user.email,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input disabled />)}
        </FormItem>
        {FormItems.map(form => {
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
                    validator: form.test,
                  },
                ],
              })(<Input placeholder={form.message} />)}
            </FormItem>
          )
        })
      }
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button onClick={this.handleCancel} style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        </FormItem>
      </Form>
    );
  }
}

function mapStateToProps({ app, account }) {
  return { app, account };
}

export default connect(mapStateToProps)(Form.create()(accountForm));
