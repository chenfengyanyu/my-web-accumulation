import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Input } from 'antd';
import List from './fenceList';
import Block from '../../components/common/Block';
const _ = require('lodash');
const Search = Input.Search;

const BindModal = ({
  sn,
  visible,
  list,
  context,
  onOk,
  onCancel,
}) => {
  let ids = [];
  const handleOk = (arr) => {
    onOk(sn, ids);
  }

  const temp = (arr) => {
    ids = arr;
  }

  const handleSearch = (val) => {
    console.log(val, 'val');
  }

  const modalOpts = {
    title: 'Bind',
    width: 800,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  return (
    <Modal {...modalOpts}>
      <Search placeholder="input name, email" style={{ width: 200 }} onSearch={handleSearch} />
      <Block val={15} />
      <List data={list} onResult={temp} />
    </Modal>
  )
}

BindModal.propTypes = {
  sn: PropTypes.string,
  visible: PropTypes.any,
  list: PropTypes.array,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default BindModal;
