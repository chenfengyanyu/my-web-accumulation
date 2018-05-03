import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Input, Tabs, Icon, Button, Tooltip, Spin, Modal } from 'antd';
import CardPane from '../../components/common/Card';
import Block from '../../components/common/Block';
import AddModal from './addModal';
import UpdateModal from './updateModal';
import AllotModal from './allotModal';
import List from './list';
import styles from './index.less';
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const confirm = Modal.confirm;

const User = ({ app, user, dispatch }) => {
  const { addModalFlag, updateModalFlag, allotModalFlag, currentItem, lists, loading, allotLists, currentId } = user;
  const showAddModal = (item) => {
    dispatch({
      type: 'user/showAddModal',
      payload: {
        currentItem: {},
      },
    })
  }

  const handleSearch = (val) => {
    dispatch({
      type: 'user/query',
      payload: {
        search: val,
        limit: 10000,
      },
    })
  }

  const handleUpdate = (item) => {
    dispatch({
      type: 'user/showUpdateModal',
      payload: {
        currentItem: item,
      },
    })
  }

  const handleDelete = (item) => {
    dispatch({ type: 'user/delete', payload: item.id });
  }

  const handleSwitch = (item) => {
    confirm({
      title: 'Control the subaccount',
      content: 'Login as administrator, confirmed?',
      onOk() {
        dispatch({ type: 'app/controll', payload: item.id });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const handleAllot = (id) => {
    dispatch({
      type: 'user/queryAllot',
      payload: id,
    })
  }

  const addModalProps = {
    item: currentItem,
    visible: addModalFlag,
    context: app,
    onOk(data) {
      dispatch({ type: 'user/add', payload: data });
    },
    onCancel() {
      dispatch({ type: 'user/hideAddModal' });
    },
  }

  const updateModalProps = {
    item: currentItem,
    visible: updateModalFlag,
    onOk(data) {
      dispatch({
        type: 'user/update',
        payload: {
          id: data.id,
          item: data,
        },
      });
    },
    onCancel() {
      dispatch({ type: 'user/hideUpdateModal' });
    },
  }

  const allotModalProps = {
    id: currentId,
    list: allotLists,
    visible: allotModalFlag,
    onOk(id, data) {
      console.log(data, id);
      dispatch({ type: 'user/hideAllotModal' });
      if (!data.allotSns || !data.backSns) return;
      dispatch({
        type: 'user/setAllot',
        payload: {
          id,
          obj: data,
        },
      });
    },
    onCancel() {
      dispatch({ type: 'user/hideAllotModal' });
    },
  }

  const AddModalGen = () => <AddModal {...addModalProps} />
  const UpdateModalGen = () => <UpdateModal {...updateModalProps} />
  const AllotModalGen = () => <AllotModal {...allotModalProps} />

  const cardPane = {
    title: <Search placeholder="input name, email" style={{ width: 200 }} onSearch={handleSearch} />,
    option: (<span className={styles.option}>
      <Icon type="plus-circle-o" onClick={showAddModal} />
    </span>),
    height: 550,
    content: (<Spin size="large" spinning={loading}><List data={lists} onUpdate={handleUpdate} onDelete={handleDelete} onSwitch={handleSwitch} onAllot={handleAllot} /></Spin>),
  }

  return (
    <div className="content-inner">
      {/*<Search placeholder="input name, email" style={{ width: 200 }} onSearch={handleSearch} />
      <Button className={styles.btnPos} icon="plus-circle-o" onClick={showAddModal} type="primary">Add</Button>
      <Block val={15} />
      <Spin size="large" spinning={loading}>
        <List data={lists} onUpdate={handleUpdate} onDelete={handleDelete} onSwitch={handleSwitch} onAllot={handleAllot} />
      </Spin>*/}
      <CardPane {...cardPane} />
      <AddModalGen />
      <UpdateModalGen />
      <AllotModalGen />
    </div>
  )
}

function mapStateToProps({ user, app }) {
  return { user, app }
}

export default connect(mapStateToProps)(User);
