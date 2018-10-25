import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import PropTypes from 'prop-types';
import { Table, Input, Icon, Button, Popconfirm, Tooltip, Tag, Badge, Switch } from 'antd';
import styles from './index.less';

class TrackerList extends React.Component { 
  state = {
    filteredInfo: null,
  };
  handleChange = (pagination, filters, sorter) => {
    // console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
    });
  }
  render() {
    let { filteredInfo } = this.state;
    filteredInfo = filteredInfo || {};
    const { data, dispatch, onMap, onDelete, onCycle, onEdit, app } = this.props;
    const pagination = {
      total: data,
      pageSize: 8,
      current: 1,
      showSizeChanger: false,
      showTotal: total => `Total of ${total} records`,
      onChange(current) {
        // dispatch({ type: 'alarm/filter', payload: { page: current } });
      },
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
      width: 80,
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
      width: 80,
      filters: [
        { text: 'T1', value: 'T1' },
        { text: 'T2', value: 'T2' },
      ],
      filteredValue: filteredInfo.deviceType || null,
      onFilter: (value, record) => record.deviceType.includes(value),
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
    }, {
      key: 'updatedTime',
      title: 'Updated Time',
      dataIndex: 'updatedTime',
    }, {
      key: '_alarmSwitch',
      title: 'Switch',
      render: (text, record) => {
        return (
          <Switch disabled size="small" checked={text._alarmSwitch} />
        );
      },
    }, {
      key: 'operation',
      dataIndex: 'geo',
      title: 'Action',
      render: (text, record) => {
        return (
          <div>
            {record.sensorData && record.sensorData.lonlat &&
              <span>
                <Tooltip title="Location">
                  <a onClick={() => onMap(record)}>
                    <svg className={styles.config} aria-hidden="true"><use xlinkHref="#anticon-dingwei1"></use></svg>
                  </a>
                </Tooltip>
                <span className="ant-divider" />
              </span>
            }
            {record.owners && app.user.id === record.owners.id &&
              <span>
                <Tooltip title="Edit">
                  <a onClick={() => onEdit(record)}>
                    <Icon type="edit" />
                  </a>
                </Tooltip>
                <span className="ant-divider" />
                <Tooltip title="Fence">
                  <Link to={`/bind?sn=${record.sn}`}>
                    <svg className={styles.config} aria-hidden="true"><use xlinkHref="#anticon-diliweilan1"></use></svg>
                  </Link>
                </Tooltip>
                <span className="ant-divider" />
                <Tooltip title="Cycle" onClick={() => onCycle(record)}>
                  <a>
                    <Icon type="clock-circle-o" />
                  </a>
                </Tooltip>
                <span className="ant-divider" />
                <Tooltip title="Disassociate">
                  <Popconfirm title="Disassociate？" onConfirm={() => onDelete(record.sn)} okText="yes" cancelText="no">
                    <a>
                      <Icon type="disconnect" />
                    </a>
                  </Popconfirm>
                </Tooltip>
              </span>
            }
          </div>
        );
      },
    }];
    return (
      <Table rowKey={record => record._id} columns={columns} dataSource={data} pagination={pagination} onChange={this.handleChange} />
    );
  }
}

TrackerList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onMap: PropTypes.func.isRequired,
  onCycle: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(TrackerList);
