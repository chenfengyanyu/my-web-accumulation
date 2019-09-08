import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal, Switch, Checkbox, TimePicker, Button } from 'antd';
import moment from 'moment';
import Mixin from '../../utils/mixin';
import styles from './index.less';
const _ = require('lodash');
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const format = 'HH:mm';
const plainOptions = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

class AlarmForm extends Component {
  state = {
    checkedList: [],
    indeterminate: true,
    checkAll: false,
    timeDisable: false,
    startTime: '08:00',
    endTime: '18:00',
    enterFlag: false,
    leaveFlag: false,
    enterDisable: true,
    leaveDisable: true,
  };
  onCheckChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
      checkAll: checkedList.length === plainOptions.length,
    });
  }
  onCheckAllChange = (e) => {
    e.stopPropagation();
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  }
  onCheckAllDay = (e) => {
    e.stopPropagation();
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
  reformData = (e) => {
    // e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Object.assign(values, {
          cycle: Mixin.convertIndex(this.state.checkedList),
          start: this.state.startTime,
          end: this.state.endTime,
        });
        console.log(values, 'values');
        this.props.onOk(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 7,
        },
        sm: {
          span: 8,
        },
      },
      wrapperCol: {
        xs: {
          span: 14,
        },
        sm: {
          span: 10,
        },
      },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 7,
        },
        sm: {
          span: 14,
          offset: 8,
        },
      },
    };
    return (
      <Form layout="horizontal" className={styles.place}>
        <FormItem label="Fence Name：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('content', {
            initialValue: '',
            rules: [
              {
                required: true,
                message: 'Enter Fence Name',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Enter Fence：">
          {getFieldDecorator('enter', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Switch onChange={this.onEnterDisableFlag} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Leave Fence：">
          {getFieldDecorator('leave', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Switch onChange={this.onLeaveDisableFlag} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Cycle：">
          {getFieldDecorator('cycle', { valuePropName: 'checked' })(
            <div>
              <Checkbox disabled={!this.state.enterDisable && !this.state.leaveDisable} indeterminate={this.state.indeterminate} onChange={this.onCheckAllChange} checked={this.state.checkAll}>
                Everyday
              </Checkbox>
              <CheckboxGroup disabled={!this.state.enterDisable && !this.state.leaveDisable} options={plainOptions} value={this.state.checkedList} onChange={this.onCheckChange} />
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
        <FormItem {...tailFormItemLayout}>
          <Button className={styles.subBtn} type="primary" onClick={this.reformData}>
            Next
          </Button>
        </FormItem>
      </Form>
    )
  }
}

AlarmForm.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default Form.create()(AlarmForm);
