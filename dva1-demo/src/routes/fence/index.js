import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Input, Tabs, Icon, Row, Col, Card, Button, Spin } from 'antd';
import CardPane from '../../components/common/Card';
import Block from '../../components/common/Block';
import OverviewPane from '../../components/common/OverviewPane/';
import List from './list';
import AlarmModal from './alarmModal';
import EditModal from './editModal';
import styles from './index.less';

const TabPane = Tabs.TabPane;
const Search = Input.Search;

const Fence = ({ fence, dispatch }) => {
  const { lists, overviewInfo, currentItem, alarmModalFlag, editModalFlag, loading } = fence;
  const handleSearch = (val) => {
    dispatch({
      type: 'fence/query',
      payload: {
        search: val,
        limit: 10000,
      },
    })
  }

  const handleUpdate = (item) => {
    dispatch({
      type: 'fence/showAlarmModal',
      payload: {
        currentItem: item,
      },
    })
  }

  const handleEdit = (item) => {
    dispatch({
      type: 'fence/showEditModal',
      payload: {
        currentItem: item,
      },
    })
  }

  const handleDelete = (id) => {
    dispatch({ type: 'fence/delete', payload: id });
  }

  const gotoLink = () => {
    dispatch({
      type: 'fence/setLink',
      payload: '/fence/step',
    })
  }

  const options = {
    header: [{
      tip: { text: 'Total' },
      text: overviewInfo.all,
    }, {
      tip: { text: 'Activated', status: 'processing' },
      text: overviewInfo.use,
    }, {
      tip: { text: 'Inactive', status: 'offline' },
      text: overviewInfo.unuse,
    }],
  };

  const alarmModalProps = {
    item: currentItem,
    visible: alarmModalFlag,
    onOk(data) {
      console.log(data, 'alarm');
      dispatch({
        type: 'fence/update',
        payload: {
          id: data.id,
          fenceName: data.content,
          ruler: {
            cycle: data.cycle,
            startTime: data.start,
            endTime: data.end,
            enterIsEnable: data.enter,
            leaveIsEnable: data.leave,
          },
        },
      });
    },
    onCancel() {
      dispatch({ type: 'fence/hideAlarmModal' });
    },
  }

  const AlarmModalGen = () => <AlarmModal {...alarmModalProps} />

  const editModalProps = {
    item: currentItem,
    visible: editModalFlag,
    onOk(data) {
      dispatch({
        type: 'fence/update',
        payload: {
          id: data.id,
          srcData: data.info,
        },
      });
      dispatch({ type: 'fence/hideEditModal' });
    },
    onCancel() {
      dispatch({ type: 'fence/hideEditModal' });
    },
  }

  const EditModalGen = () => <EditModal {...editModalProps} />

  const cardPane = {
    title: <Search placeholder="input search text" style={{ width: 200 }} onSearch={handleSearch} />,
    option: (<span className={styles.option}>
      <Icon type="plus-circle-o" onClick={gotoLink} />
    </span>),
    height: 550,
    content: (<Spin size="large" spinning={loading}><List data={lists} onUpdate={handleUpdate} onEdit={handleEdit} onDelete={handleDelete} /></Spin>),
  }

  return (
    <div className="content-inner">
      <OverviewPane {...options} />
      <Block val={14} />
      <CardPane {...cardPane} />
      <AlarmModalGen />
      <EditModalGen />
    </div>
  )
}

function mapStateToProps({ fence }) {
  return { fence };
}

export default connect(mapStateToProps)(Fence);
