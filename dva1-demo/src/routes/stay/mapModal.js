import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import Geolocation from '../../components/common/Geolocation/';

const mapModal = ({
  visible,
  item = {},
  context,
  onOk,
  onCancel,
}) => {
  function handleOk() {
    const data = {
      id: item._id,
    }
    onOk(data);
  }

  const modalOpts = {
    title: 'Location',
    width: 800,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }
  const geoCfg = {
    item: item.devices,
    desc: item && item.sn,
    lonlat: {
      lat: item.lonlat && item.lonlat[1],
      lng: item.lonlat && item.lonlat[0],
    },
  }

  return (
    <Modal {...modalOpts}>
      <Geolocation {...geoCfg} />
    </Modal>
  )
}

mapModal.propTypes = {
  visible: PropTypes.any,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default mapModal;
