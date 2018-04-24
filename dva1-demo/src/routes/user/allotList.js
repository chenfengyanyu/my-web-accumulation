import React from 'react';
import PropTypes from 'prop-types';
import Mixin from '../../utils/mixin';
import { Table, Input, Icon, Button, Popconfirm, Tooltip, Tag, Badge, Switch } from 'antd';
import styles from './index.less';

const columns = [{
  key: 'sn',
  title: 'SN',
  dataIndex: 'sn',
}, {
  key: 'deviceName',
  title: 'Name',
  dataIndex: 'deviceName',
}, {
  key: 'status',
  title: 'Status',
  dataIndex: 'status',
  render: (status, record) => {
    if (status === 1) {
      return (<Badge status="processing" text="Normal" />);
    } else if (status === 2) {
      return (<Badge status="warning" text="Inactive" />);
    } else {
      return (<Badge status="default" text="Offline" />);
    }
  },
}, {
  key: 'tags',
  title: 'Tags',
  dataIndex: 'tags',
  render: (tags) => {
    return (tags && tags.map((tag, index) => {
      let tagElem = (
        <Tag color="blue" key={index} style={{ cursor: 'text' }}>
          {tag}
        </Tag>
      );
      return tagElem;
    }))
  },
}, {
  key: 'deviceType',
  title: 'Model',
  dataIndex: 'deviceType',
}, {
  key: 'sensorData.battery',
  title: 'Power(%)',
  dataIndex: 'sensorData.battery',
  render: (battery, record) => {
    let icon = '';
    if (battery === 0) {
      icon = 'dianchidianliang';
    } else if (battery > 0 && battery < 25) {
      icon = 'dianchididianliang';
    } else if (battery >= 25 && battery < 50) {
      icon = 'dianchidianliang1';
    } else if (battery >= 50 && battery <= 90) {
      icon = 'dianchidianliang2';
    } else {
      icon = 'dianchidianliang3';
    }
    return (
      <div>
        <svg className={styles.icon} aria-hidden="true"><use xlinkHref={`#anticon-${icon}`}></use></svg>
        <span>{battery}%</span>
      </div>
    )
  },
}];

class AllotList extends React.Component {
  state = {
    initDeviceKeys: this.props.data ? this.props.data : [],
    selectedRowKeys: this.props.data ? Mixin.queryId(this.props.data) : [],
  };
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
    this.props.onResult(selectedRowKeys);
  }
  onSelect = (record, selected, selectedRows) => {
    // console.log(record, selected, selectedRows);
  }
  render() {
    const { data } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      onSelect: this.onSelect,
    };
    const pagination = {
      total: data.length,
      pageSize: 5,
      current: 1,
      showSizeChanger: false,
      showTotal: total => `Total of ${total} records`,
      onChange(current) {
        this.props.dispatch({ type: 'alarm/filter', payload: { page: current } });
      },
    };
    return (
      <Table rowSelection={rowSelection} rowKey={record => record.sn} columns={columns} dataSource={data} pagination={pagination} />
    );
  }
}

AllotList.propTypes = {
  data: PropTypes.array,
};

export default AllotList;
