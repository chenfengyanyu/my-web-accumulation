import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal, Switch, Checkbox, TimePicker } from 'antd';
import moment from 'moment';
import Mixin from '../../utils/mixin';
import styles from './index.less';
const _ = require('lodash');
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const format = 'HH:mm';
const plainOptions = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

class AlarmModal extends Component {
  state = {
    checkedList: (this.props.item && this.props.item.ruler && this.props.item.ruler.cycle && Mixin.convertWeekArray(this.props.item.ruler.cycle)) || [],
    indeterminate: true,
    checkAll: false,
    timeDisable: false,
    startTime: (this.props.item && this.props.item.ruler && this.props.item.ruler.startTime) || '08:00',
    endTime: (this.props.item && this.props.item.ruler && this.props.item.ruler.endTime) || '18:00',
    enterDisable: true,
    leaveDisable: false,
  };
  onCheckChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
      checkAll: checkedList.length === plainOptions.length,
    });
  }
  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  }
  onCheckAllDay = (e) => {
    if (e.target.checked) {
      this.setState({
        timeDisable: e.target.checked,
        startTime: '00:00',
        endTime: '23:59',
      })
    } else {
      this.setState({
        timeDisable: e.target.checked,
        startTime: '08:00',
        endTime: '18:00',
      })
    }
  }
  onStartTime = (time, timeString) => {
    this.setState({
      startTime: timeString,
    })
  }
  onEndTime = (time, timeString) => {
    this.setState({
      endTime: timeString,
    })
  }
  onEnterDisableFlag = (data) => {
    this.setState({
      enterDisable: data,
    })
  }
  onLeaveDisableFlag = (data) => {
    this.setState({
      leaveDisable: data,
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Object.assign(values, {
          id: this.props.item.id,
          cycle: Mixin.convertIndex(this.state.checkedList),
          start: this.state.startTime,
          end: this.state.endTime,
        });
        this.props.onOk(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { fenceName, ruler } = this.props.item;
    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    }
    const modalOpts = {
      title: 'Update',
      visible: this.props.visible,
      onCancel: this.props.onCancel,
      wrapClassName: 'vertical-center-modal',
    }
    return (
      <Modal {...modalOpts} onOk={this.handleSubmit}>
        <Form layout="horizontal">
          <FormItem label="Fence Name：" hasFeedback {...formItemLayout}>
            {getFieldDecorator('content', {
              initialValue: fenceName,
              rules: [
                {
                  required: true,
                  message: 'Require Fence Name!',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Enter Fence：">
            {getFieldDecorator('enter', {
              valuePropName: 'checked',
              initialValue: ruler && ruler.enterIsEnable ? true : false,
            })(<Switch onChange={this.onEnterDisableFlag} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Leave Fence：">
            {getFieldDecorator('leave', {
              valuePropName: 'checked',
              initialValue: ruler && ruler.leaveIsEnable ? true : false,
            })(<Switch onChange={this.onLeaveDisableFlag} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Cycle：">
            {getFieldDecorator('cycle', { valuePropName: 'checked' })(
              <div>
                <Checkbox disabled={!this.state.enterDisable && !this.state.leaveDisable} indeterminate={this.state.indeterminate} onChange={this.onCheckAllChange} checked={this.state.checkAll}>
                  Everyday
                </Checkbox>
                <CheckboxGroup disabled={!this.state.enterDisable && !this.state.leaveDisable} options={plainOptions} defaultValue={this.state.checkedList} onChange={this.onCheckChange} />
              </div>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Time：">
            {getFieldDecorator('cycle', { valuePropName: 'checked' })(
              <div>
                <Checkbox disabled={!this.state.enterDisable && !this.state.leaveDisable} onChange={this.onCheckAllDay}>All Day</Checkbox>
                <div>
                  <TimePicker onChange={this.onStartTime} disabled={(!this.state.enterDisable && !this.state.leaveDisable) || this.state.timeDisable} defaultValue={moment(this.state.startTime, format)} format={format} />
                  <span className={styles.to}> - </span>
                  <TimePicker onChange={this.onEndTime} disabled={(!this.state.enterDisable && !this.state.leaveDisable) || this.state.timeDisable} defaultValue={moment(this.state.endTime, format)} format={format} />
                </div>
              </div>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

AlarmModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default Form.create()(AlarmModal);
