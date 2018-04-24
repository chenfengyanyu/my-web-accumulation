import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Input, Button, Row, Col, Card, DatePicker, Spin, Icon, Menu, Dropdown } from 'antd';
import { Link } from 'dva/router';
import CardPane from '../../components/common/Card';
import MapModal from './mapModal';
import CycleModal from './cycleModal';
import EditModal from './editModal';
import Block from '../../components/common/Block';
import OverviewPane from '../../components/common/OverviewPane/';
import List from './list';
import styles from './index.less';
import Marker from '../../components/common/Marker/';

const Search = Input.Search;
function Tracker({ dispatch, tracker, app }) {
  const { lists, loading, overviewInfo, currentItem, mapModalFlag, cycleModalFlag, editModalFlag, tabActive, tabEle } = tracker;
  const handleSearch = (val) => {
    console.log(val);
    dispatch({
      type: 'tracker/query',
      payload: {
        search: val,
        limit: 10000,
      },
    })
  }
  const showMapModal = (item) => {
    // console.log(item, 'item');
    dispatch({
      type: 'tracker/showMapModal',
      payload: {
        currentItem: item,
      },
    })
  }
  const handleCycle = (item) => {
    dispatch({
      type: 'tracker/showCycleModal',
      payload: {
        currentItem: item,
      },
    })
  }
  const handleEdit = (item) => {
    dispatch({
      type: 'tracker/showEditModal',
      payload: {
        currentItem: item,
      },
    })
  }
  const handleDelete = (id) => {
    dispatch({
      type: 'tracker/delete',
      payload: id,
    })
  }
  const options = {
    header: [{
      tip: { text: 'Total' },
      text: overviewInfo.all,
    }, {
      tip: { text: 'Normal', status: 'processing' },
      text: overviewInfo.normal,
    }, {
      tip: { text: 'Inactive', status: 'warning' },
      text: overviewInfo.inactive,
    }, {
      tip: { text: 'Offline', status: 'offline' },
      text: overviewInfo.offline,
    }],
    show: false,
  };
  const mapModalProps = {
    item: currentItem ? currentItem : '',
    visible: mapModalFlag,
    onOk(data) {
      dispatch({ type: 'tracker/hideMapModal' });
    },
    onCancel() {
      dispatch({ type: 'tracker/hideMapModal' });
    },
  }
  const cycleModalProps = {
    item: currentItem,
    visible: cycleModalFlag,
    onOk(data) {
      if (data.type === 'min') {
        data.interval = data.interval * 60;
      }
      dispatch({
        type: 'tracker/cycle',
        payload: {
          cycle: data.interval,
          snList: [data.sns],
        },
      })
      dispatch({ type: 'tracker/hideCycleModal' });
    },
    onCancel() {
      dispatch({ type: 'tracker/hideCycleModal' });
    },
  }
  const editModalProps = {
    item: currentItem,
    visible: editModalFlag,
    onOk(data) {
      dispatch({
        type: 'tracker/update',
        payload: {
          sn: data.sn,
          obj: {
            deviceName: data.name,
            tags: data.tags,
            alarmAlone: data.alarms,
          },
        },
      })
      dispatch({ type: 'tracker/hideEditModal' });
    },
    onCancel() {
      dispatch({ type: 'tracker/hideEditModal' });
    },
  }
  const markerCfg = {
    markers: lists,
    height: 500,
  }
  const handleTab = (type) => {
    if (type === 'list') {
      dispatch({
        type: 'tracker/switchTab',
        payload: {
          ele: (<Spin size="large" spinning={loading}><List data={lists} onMap={showMapModal} onDelete={handleDelete} onCycle={handleCycle} onEdit={handleEdit} /></Spin>),
          act: 'list',
        },
      });
    } else if (type === 'map') {
      dispatch({
        type: 'tracker/switchTab',
        payload: {
          ele: (<Marker {...markerCfg} />),
          act: 'map',
        },
      });
    }
  }
  const pullDevice = () => {
    dispatch({
      type: 'tracker/pull',
      payload: {},
    })
  }
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to={`/cycle?owners=${app.user.roles}`}>Modify Cycle</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`/fences?owners=${app.user.roles}`}>Modify Fence</Link>
      </Menu.Item>
      {app.user.roles === 'dealers' &&
        <Menu.Item>
          <Link to="" onClick={pullDevice}>Update Device</Link>
        </Menu.Item>
      }
    </Menu>
  );
  // console.log(app.user);
  const cardPane = {
    title: <Search id="search" placeholder="input search text" onSearch={handleSearch} />,
    option: (<span className={styles.option}>
      <Icon style={{ color: tabActive === 'list' ? '#108ee9' : '' }} type="bars" onClick={() => handleTab('list')} />
      <Icon style={{ color: tabActive === 'map' ? '#108ee9' : '' }} type="environment-o" onClick={() => handleTab('map')} />
      {app.user.roles !== 'admin' && <Dropdown overlay={menu}><Icon type="filter" /></Dropdown>}
    </span>),
    height: 550,
    content: tabEle ? tabEle : (<Spin size="large" spinning={loading}><List data={lists} onMap={showMapModal} onDelete={handleDelete} onCycle={handleCycle} onEdit={handleEdit} /></Spin>),
  }

  const MapModalGen = () => <MapModal {...mapModalProps} />
  const CycleModalGen = () => <CycleModal {...cycleModalProps} />
  const EditModalGen = () => <EditModal {...editModalProps} />
  return (
    <div className="content-inner">
      <OverviewPane {...options} />
      <Block val={13} />
      <CardPane {...cardPane} />
      <MapModalGen />
      <CycleModalGen />
      <EditModalGen />
    </div>
  )
}

function mapStateToProps({ tracker, app }) {
  return { tracker, app };
}

export default connect(mapStateToProps)(Tracker);
