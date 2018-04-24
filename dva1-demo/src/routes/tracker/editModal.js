import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal, Tag } from 'antd';
import MyTags from './tags';
import styles from './index.less';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const checkItem = {
  tags: [],
  alarms: [],
}

const EditModal = ({
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
        item,
        tags: checkItem.tags,
        alarms: checkItem.alarms,
      }
      onOk(data)
    })
  }

  const updateTags = (tags) => {
    checkItem.tags = tags;
  }

  const updateAlarm = (alarms) => {
    checkItem.alarms = alarms;
  }

  const modalOpts = {
    title: 'Edit',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="SN:" {...formItemLayout}>
          {getFieldDecorator('sn', {
            initialValue: item.sn,
            rules: [
              {
                required: true,
                message: 'Require SN',
              },
            ],
          })(<Input type="text" readOnly disabled />)}
        </FormItem>
        <FormItem label="Name:" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.deviceName,
            rules: [
              {
                required: true,
                message: 'Require Name',
              },
            ],
          })(<Input type="text" />)}
        </FormItem>
        <FormItem label="Label:" {...formItemLayout}>
          {getFieldDecorator('label', {
            initialValue: item.tags,
          })(<MyTags color="" tags={item.tags} type="Label" updateTags={updateTags} />)}
        </FormItem>
        <FormItem style={{ marginBottom: 0 }} label="AlarmAlone:" {...formItemLayout}>
          {getFieldDecorator('alarm', {
            initialValue: item.alarmAlone,
          })(<MyTags color="blue" tags={item.alarmAlone} type="Email" updateTags={updateAlarm} />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

EditModal.propTypes = {
  visible: PropTypes.any,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default Form.create()(EditModal);
