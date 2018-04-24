import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

class NoticeForm extends Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let tempObj = {
          types: 'phone',
          content: values.phone,
          remarks: values.name,
          isEnabled: false,
        }
        this.props.onSubmit(tempObj);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('phone', {
            rules: [
              {
                required: true,
                message: '请输入手机号码',
              },
            ],
          })(
            <Input addonBefore={<Icon type="phone" />} placeholder="手机号码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入姓名',
              },
            ],
          })(
            <Input addonBefore={< Icon type="user" />} placeholder="姓名" />
          )}
        </FormItem>
        <FormItem>
          <Button type="ghost" htmlType="submit">添加</Button>
        </FormItem>
      </Form>
    );
  }
}

export default NoticeForm;
