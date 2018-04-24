import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal, Select } from 'antd';
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
// sec:秒，min:分钟
const selectVal = {
  type: 'sec',
};

function selectValue(val) {
  selectVal.type = val;
}

const CycleModal = ({
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
        sns: item.sn,
        item,
        type: selectVal.type,
      }
      onOk(data)
    })
  }

  const modalOpts = {
    title: '修改传输周期',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  const selectAfter = (
    <Select defaultValue="sec" style={{ width: 60 }} onSelect={selectValue}>
      <Option value="sec">秒</Option>
      <Option value="min">分钟</Option>
    </Select>
  );

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label="传输周期：" {...formItemLayout}>
          {getFieldDecorator('interval', {
            initialValue: `${item.interval}`,
            rules: [
              {
                required: true,
                message: '请输入传输周期',
              },
            ],
          })(<Input type="number" addonAfter={selectAfter} />)}
          <p style={{ fontSize: 12, width: 300, marginTop: 8 }}>传输周期为该配置数据传输的时间间隔</p>
        </FormItem>
      </Form>
    </Modal>
  )
}

// CycleModal.propTypes = {
//   visible: PropTypes.boolean,
//   item: PropTypes.object,
//   onOk: PropTypes.func,
//   onCancel: PropTypes.func,
// }

export default Form.create()(CycleModal)
