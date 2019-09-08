import React, { PropTypes } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import styles from './index.less';
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

  // console.log(item);

  const modalOpts = {
    title: 'Cycle',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  const selectAfter = (
    <Select defaultValue="sec" style={{ width: 60 }} onSelect={selectValue}>
      <Option value="sec">Sec</Option>
      <Option value="min">Min</Option>
    </Select>
  );

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="Cycle：" {...formItemLayout}>
          {getFieldDecorator('interval', {
            initialValue: item.sensorData ? item.sensorData.interval : '',
            rules: [
              {
                required: true,
                message: 'transmission Cycle',
              },
            ],
          })(<Input type="number" addonAfter={selectAfter} />)}
          <div className={styles.info}>Transmission cycle is the uploading time interval of  sensor&GPS.</div>
        </FormItem>
      </Form>
    </Modal>
  )
}

CycleModal.propTypes = {
  visible: PropTypes.any,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default Form.create()(CycleModal);
