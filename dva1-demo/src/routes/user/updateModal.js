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

const updateModal = ({
  visible,
  item = {},
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
        updateFlag: 'update',
      }
      onOk(data)
    })
  }

  const modalOpts = {
    title: '修改用户',
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
      message: 'Require Account',
    }, {
      key: 'email',
      lable: 'Email：',
      initialValue: item.email,
      // min: 11,
      isRequired: true,
      message: 'Require Email',
    }, {
      key: 'password',
      lable: 'Password：',
      initialValue: item.password,
      min: 6,
      isRequired: false,
      message: 'Min length 6 characters',
    },
  ];

  if (item && item.roles === 'dealers') {
    FormItems.push({
      key: 'appId',
      lable: 'AppId：',
      initialValue: item.appId,
      isRequired: true,
      message: 'Require AppID',
    }, {
      key: 'appKey',
      lable: 'AppKey：',
      initialValue: item.appKey,
      isRequired: true,
      message: 'Require AppKey',
    }, {
      key: 'appSecret',
      lable: 'AppSecret：',
      initialValue: item.appSecret,
      isRequired: true,
      message: 'Require AppSecret',
    }, {
      key: 'businessLimit',
      lable: '子账号个数：',
      initialValue: (item.config && item.config.businessLimit) || 1,
      isRequired: false,
      message: '请填写子帐号个数',
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
          } else if (form.key === 'email') {
            return (
              <FormItem key={form.key} label={form.lable} {...formItemLayout}>
                {getFieldDecorator(form.key, {
                  initialValue: form.initialValue,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input disabled min={1} max={10} />)}
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

updateModal.propTypes = {
  visible: PropTypes.any,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default Form.create()(updateModal);
