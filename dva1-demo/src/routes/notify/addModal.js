import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal, Switch } from 'antd';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const AddModal = ({
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
        return
      }
      const data = {
        ...getFieldsValue(),
        id: item._id,
        flag: item._id ? 'update' : 'create',
      }
      onOk(data)
    })
  }

  const modalOpts = {
    title: item._id ? 'Update' : 'Add',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="Email：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('content', {
            initialValue: item.content,
            rules: [
              {
                required: true,
                message: '请填写Email',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Name：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
                message: '请填写姓名',
              },
            ],
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

AddModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default Form.create()(AddModal);
