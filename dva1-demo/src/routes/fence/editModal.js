import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import DrawMap from '../../components/common/Draw';
import Mixin from '../../utils/mixin';
import styles from './index.less';
const _ = require('lodash');

let shapeInfo = null;
class EditModal extends Component {
  handleShape = this.handleShape.bind(this);
  handleSubmit = this.handleSubmit.bind(this);
  handleShape(val) {
    shapeInfo = val;
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onOk({ info: shapeInfo, id: this.props.item.id });
  }
  render() {
    const { srcData } = this.props.item;
    const modalOpts = {
      title: 'Edit',
      width: 800,
      visible: this.props.visible,
      onCancel: this.props.onCancel,
      wrapClassName: 'vertical-center-modal',
    }
    return (
      <Modal {...modalOpts} onOk={this.handleSubmit}>
        <DrawMap
          data={srcData}
          height={400}
          onShape={this.handleShape}
        />
      </Modal>
    )
  }
}

EditModal.propTypes = {
  visible: PropTypes.any,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default EditModal;
