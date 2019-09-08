import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Input, Tabs, Icon, Row, Col, Card, Button, Spin } from 'antd';
import CardPane from '../../components/common/Card';
import Block from '../../components/common/Block';
import styles from './index.less';
import List from './list';
import AddModal from './addModal';

const TabPane = Tabs.TabPane;
const Search = Input.Search;

const Notify = ({ notify, dispatch }) => {
  const { lists, currentItem, addModalFlag, loading } = notify;

  const showAddModal = (item) => {
    dispatch({
      type: 'notify/showAddModal',
      payload: {
        currentItem: {},
      },
    })
  }

  const handleSearch = (val) => {
    dispatch({
      type: 'notify/query',
      payload: {
        search: val,
        limit: 10000,
      },
    })
  }

  const handleUpdate = (item) => {
    dispatch({
      type: 'notify/showAddModal',
      payload: {
        currentItem: item,
      },
    })
  }

  const handleState = (item, flag) => {
    item.isEnabled = flag;
    dispatch({ type: 'notify/update', payload: item });
  }

  const handleDelete = (id) => {
    dispatch({ type: 'notify/delete', payload: id });
  }

  const addModalProps = {
    item: currentItem,
    visible: addModalFlag,
    onOk(data) {
      console.log(data);
      if (data.flag === 'create') {
        dispatch({ type: 'notify/add', payload: data });
      } else if (data.flag === 'update') {
        dispatch({ type: 'notify/update', payload: data });
      } else {
        dispatch({ type: 'notify/hideAddModal' });
      }
    },
    onCancel() {
      dispatch({ type: 'notify/hideAddModal' });
    },
  }

  const AddModalGen = () => <AddModal {...addModalProps} />

  const cardPane = {
    title: <Search placeholder="input search text" style={{ width: 200 }} onSearch={handleSearch} />,
    option: (<span className={styles.option}>
      <Icon type="plus-circle-o" onClick={showAddModal} />
    </span>),
    height: 550,
    content: (<Spin size="large" spinning={loading}><List data={lists} onUpdate={handleUpdate} onDelete={handleDelete} onState={handleState} /></Spin>),
  }

  return (
    <div className="content-inner">
      <CardPane {...cardPane} />
      <AddModalGen />
    </div>
  )
}

function mapStateToProps({ notify }) {
  return { notify };
}

export default connect(mapStateToProps)(Notify);
