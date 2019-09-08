import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import PropTypes from 'prop-types';
import { Table, Input, Icon, Button, Popconfirm, Tooltip, Tag, Badge, Switch } from 'antd';
import styles from './index.less';

class TrackerList extends React.Component {
  state = {
    selectedRowKeys: [],
    loading: false,
    filteredInfo: null,
  };
  onSelectChange = (selectedRowKeys) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
    this.props.onCheck(selectedRowKeys);
  }
  handleChange = (pagination, filters, sorter) => {
    // console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }
  render() {
    const { data, dispatch, checkFlag } = this.props;
    let { selectedRowKeys, filteredInfo } = this.state;
    filteredInfo = filteredInfo || {};
    const pagination = {
      total: data.length,
      pageSize: 5,
      current: 1,
      showSizeChanger: false,
      showTotal: total => `Total of ${total} records`,
      onChange(current) {
        dispatch({ type: 'alarm/filter', payload: { page: current } });
      },
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const columns = [{
      key: 'owners.nickname',
      title: 'Account',
      dataIndex: 'owners.nickname',
      width: 70,
    }, {
      key: 'sn',
      title: 'SN',
      dataIndex: 'sn',
    }, {
      key: 'deviceName',
      title: 'Name',
      dataIndex: 'deviceName',
      width: 120,
    }, {
      key: 'deviceType',
      title: 'Model',
      dataIndex: 'deviceType',
      width: 80,
      filters: [
        { text: 'T1', value: 'T1' },
        { text: 'T2', value: 'T2' },
      ],
      filteredValue: filteredInfo.deviceType || null,
      onFilter: (value, record) => record.deviceType.includes(value),
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
      key: 'sensorData.battery',
      title: 'Power(%)',
      dataIndex: 'sensorData.battery',
      width: 80,
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
            <span>{battery ? battery : '100'}%</span>
          </div>
        )
      },
    }, {
      key: 'sensorData.interval',
      title: 'Cycle',
      dataIndex: 'sensorData.interval',
      render: (cycle, record) => {
        if (!cycle) { cycle = '--'; }
        return (
          <Badge count={`${cycle} S`} style={{ backgroundColor: '#fff', color: '#6c6c6c', boxShadow: '0 0 0 1px #d9d9d9 inset' }} />
        );
      },
    }];
    return (
      <Table rowSelection={checkFlag ? rowSelection : undefined} rowKey={record => record.sn} columns={columns} dataSource={data} pagination={pagination} onChange={this.handleChange} />
    );
  }
}

TrackerList.propTypes = {
  checkFlag: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(TrackerList);
