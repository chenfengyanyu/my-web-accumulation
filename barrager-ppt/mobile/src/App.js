import React from 'react';
import Axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import './App.css';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};
class WrappedForm extends React.Component {
  state = {
    msg: '',
  };

  check = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.info('success', values);
        
        let temp = values.msg.replace(/<[^>]+>/g, '');

        if(temp.length > 15) {
          message.error('话有点多了～');
          this.props.form.setFieldsValue({
            msg: '',
          });
          window.scrollTo(0, 0);
          return;
        }
        
        Axios.post(`http://192.168.1.53:4000/api/send`, { 
            time: new Date().getTime(),
            msg: temp,
            ua: navigator.userAgent || '-'
        })
        .then(function (response) {
          // handle success
          console.log(response);
          message.success('发送成功！');
          window.scrollTo(0, 0);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });


        this.props.form.setFieldsValue({
          msg: '',
        });
      } else {
        window.scrollTo(0, 0);
        message.error('请重新发送！');
      }
    });
  };

  cancle = () => {
    this.props.form.setFieldsValue({
      msg: '',
    });
    window.scrollTo(0, 0);
  }

  handleChange = e => {
    console.log(e)
    this.setState(
      {
        msg: e.target.value,
      },
      () => {
        this.props.form.validateFields(['msg'], { force: true });
      },
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="app-box">
        <div className="form-box">
          <Form.Item {...formItemLayout} label="">
            {getFieldDecorator('msg', {
              rules: [
                {
                  required: true,
                  message: '请输入内容',
                },
              ],
            })(<Input size="large" placeholder="发送消息，嗨起来～" />)}
          </Form.Item>
          <Form.Item {...formTailLayout} >
            <Button className="btns"  shape="round" icon="close" size="large" onClick={this.cancle}>取消</Button>
            <Button   type="primary" shape="round" icon="check" size="large" onClick={this.check}>发送</Button>
          </Form.Item>
        </div>
      </div>
    );
  }
}

const App = Form.create()(WrappedForm);

export default App;
