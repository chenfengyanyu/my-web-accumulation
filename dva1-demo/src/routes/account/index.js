import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { message, Row, Col, Upload, Tabs, Icon, Button, Modal } from 'antd';
import styles from './index.less';
import AccountForm from './accountForm';
import PasswordForm from './passwordForm';
import SELF from '../../../config';

const TabPane = Tabs.TabPane;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const beforeUpload = (file) => {
  let isJPG = file.type === 'image/jpeg';
  let isPNG = file.type === 'image/png';
  if (!isJPG && !isPNG) {
    message.error('You can only upload JPG file or PNG file!');
  }
  let isLt1M = file.size / 1024 / 1024 < 1;
  if (!isLt1M) {
    message.error('Image must smaller than 1MB!');
  }
  return isLt1M && isJPG || isPNG;
}

class Account extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: this.props.app.user.baseInfo && this.props.app.user.baseInfo.headUrl,
      },
    ],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
    // console.log(fileList);
    if (fileList.length > 0) {
      let temp = fileList[0].response && fileList[0].response.url;
      temp &&
      this.props.dispatch({
        type: 'account/update',
        payload: {
          headUrl: temp,
        },
        success: (data) => {
          // this.props.dispatch({ type: 'app/updateInfo', payload: data });
        },
        error: (data) => {
          console.log('error');
        },
      });
    }
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="content-inner">
        <div className={styles.box}>
          <Tabs defaultActiveKey="1">
            <TabPane tab={<span> <Icon type="apple" />Personal Center </span>} key="1">
              <Row>
                <Col xs={24} sm={10} md={10} lg={10}>
                  <div className={styles.uploadPos}>
                    <Upload
                      action={`${SELF.url}/tools/images/upload`}
                      listType="picture-card" fileList={fileList}
                      onPreview={this.handlePreview}
                      onChange={this.handleChange}
                      beforeUpload={beforeUpload}
                    >
                      {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </div>
                  <div className={styles.describePos}>(Image less than 1M png,jpg)</div>
                </Col>
                <Col xs={24} sm={10} md={10} lg={10}>
                  <AccountForm />
                </Col>
              </Row>
            </TabPane>
          </Tabs>
          <Tabs defaultActiveKey="1">
            <TabPane tab={<span> <Icon type="apple" />Change password </span>} key="1">
              <Row>
                <Col xs={24} sm={10} md={10} lg={10}>
                  <PasswordForm />
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ app, account }) {
  return { app, account };
}

export default connect(mapStateToProps)(Account);
