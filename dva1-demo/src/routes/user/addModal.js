import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, Checkbox, Modal, Switch, Select } from 'antd';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const addModal = ({
  visible,
  item = {},
  context,
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
        id: item._id,
      }
      onOk(data)
    })
  }

  const modalOpts = {
    title: 'Add',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  const FormItems = [
    {
      key: 'nickname',
      lable: 'Account：',
      initialValue: item.nickname,
      isRequired: true,
      message: 'Require Account!',
    }, {
      key: 'email',
      lable: 'Email：',
      initialValue: item.email,
      // min: 11,
      isRequired: true,
      message: 'Require Email!',
    }, {
      key: 'password',
      lable: 'Password：',
      initialValue: item.password,
      min: 6,
      isRequired: true,
      message: 'Min length 6 characters!',
    },
  ];

  if (context && context.user && context.user.roles === 'admin') {
    FormItems.push({
      key: 'appId',
      lable: 'AppId：',
      initialValue: item.appId,
      isRequired: true,
      message: 'Require AppID!',
    }, {
      key: 'appKey',
      lable: 'AppKey：',
      initialValue: item.appKey,
      isRequired: true,
      message: 'Require AppKey!',
    }, {
      key: 'appSecret',
      lable: 'AppSecret：',
      initialValue: item.appSecret,
      isRequired: true,
      message: 'Require AppSecret!',
    }, {
      key: 'businessLimit',
      lable: 'Sub Account：',
      initialValue: (item.config && item.config.businessLimit) || 1,
      isRequired: false,
      message: 'Require Sub Account!',
    });
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        {FormItems.map(form => {
          if (form.key === 'businessLimit') {
            return (
              <FormItem key={form.key} label={form.lable} {...formItemLayout}>
                {getFieldDecorator(form.key, {
                  initialValue: form.initialValue,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<InputNumber min={1} max={10} />)}
              </FormItem>
            )
          } else {
            return (
              <FormItem key={form.key} label={form.lable} hasFeedback {...formItemLayout}>
                {getFieldDecorator(form.key, {
                  initialValue: form.initialValue,
                  rules: [
                    {
                      min: form.min,
                      max: form.max,
                      required: form.isRequired,
                      message: form.message,
                    },
                  ],
                })(<Input />)}
              </FormItem>
            )
          }
        })}
      </Form>
    </Modal>
  )
}

addModal.propTypes = {
  visible: PropTypes.any,
  context: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default Form.create()(addModal);
