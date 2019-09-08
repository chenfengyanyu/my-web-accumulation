import React from 'react';
import { Link } from 'dva/router';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Input, Tabs, Icon, Row, Col, Card, Button, Spin } from 'antd';
import CardPane from '../../components/common/Card';
import ShapeMap from '../../components/common/Shape';
import Block from '../../components/common/Block';
import styles from './index.less';
import List from './bindList';
import BindModal from './bindModal';

const Search = Input.Search;

const Bind = ({ tracker, dispatch, location }) => {
  const { oneDevice, loading, bindModalFlag, fenceList, shape } = tracker;

  const showBindModal = (item) => {
    dispatch({
      type: 'tracker/fenceList',
      payload: {},
    })
  }

  const handleBind = (gid) => {
    dispatch({
      type: 'tracker/unBind',
      payload: {
        sn: location.query.sn,
        gid,
      },
    })
  }

  const handleSelect = (arr) => {
    dispatch({
      type: 'tracker/showShape',
      payload: arr[0],
    })
  }

  const bindModalProps = {
    sn: location.query.sn,
    list: fenceList,
    visible: bindModalFlag,
    onOk(sn, data) {
      dispatch({
        type: 'tracker/bind',
        payload: {
          sn,
          obj: {
            ids: data,
          },
        },
      });
      dispatch({ type: 'tracker/hideBindModal' });
    },
    onCancel() {
      dispatch({ type: 'tracker/hideBindModal' });
    },
  }

  const BindModalGen = () => <BindModal {...bindModalProps} />

  const cardPane = {
    title: <span>Fence Lists</span>,
    option: (<span className={styles.option}>
      <Link to="/tracker"><Icon type="left-circle-o" /></Link>
      <Icon type="plus-circle-o" onClick={showBindModal} />
    </span>),
    height: 550,
    content: (<Spin size="large" spinning={loading}><List data={oneDevice.geofences ? oneDevice.geofences : []} onBind={handleBind} onSelect={handleSelect} /></Spin>),
  }
  return (
    <div className="content-inner">
      <ShapeMap data={shape} height={400} />
      <Block val={15} />
      <CardPane {...cardPane} />
      <BindModalGen />
    </div>
  )
}

function mapStateToProps({ tracker }) {
  return { tracker };
}

export default connect(mapStateToProps)(Bind);
