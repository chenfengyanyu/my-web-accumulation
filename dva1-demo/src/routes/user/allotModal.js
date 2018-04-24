import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Input } from 'antd';
import List from './allotList';
import Block from '../../components/common/Block';
const _ = require('lodash');
const Search = Input.Search;

const AllotModal = ({
  id,
  visible,
  list,
  context,
  onOk,
  onCancel,
}) => {
  let xxx = {};
  const handleOk = (arr) => {
    onOk(id, xxx);
  }

  const temp = (arr) => {
    let allot = [];
    let back = [];
    list && list.forEach((item) => {
      if (item.isAllot === true && _.indexOf(arr, item.sn) === -1) {
        back.push(item.sn);
      } else if (!item.isAllot && _.indexOf(arr, item.sn) !== -1) {
        allot.push(item.sn);
      }
    });
    xxx = {
      allotSns: allot,
      backSns: back,
    }
  }

  const handleSearch = (val) => {
    console.log(val, 'val');
  }

  const modalOpts = {
    title: 'Allot',
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

AllotModal.propTypes = {
  id: PropTypes.string,
  visible: PropTypes.any,
  list: PropTypes.array,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default AllotModal;
