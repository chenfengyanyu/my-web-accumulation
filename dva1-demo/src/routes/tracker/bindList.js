import React from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Icon, Button, Popconfirm, Tooltip, Switch, Badge } from 'antd';
import Mixin from '../../utils/mixin';
import styles from './index.less';

class List extends React.Component {
  state = {
    selectedRowKeys: (this.props.data && this.props.data.length > 0) ? [this.props.data[0]._id] : [],
  };
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
    this.props.onSelect(selectedRowKeys);
  }
  onSelect = (record, selected, selectedRows) => {
    // console.log(record, selected, selectedRows);
    // this.setState({ selectedRowKeys: [record.id] });
  }
  render() {
    const { data } = this.props;
    const { selectedRowKeys } = this.state;
    const columns = [
      {
        key: 'fenceName',
        title: 'Fence Name',
        dataIndex: 'fenceName',
      }, {
        key: 'srcData.type',
        title: 'Type',
        dataIndex: 'srcData.type',
        render: (type, record) => {
          let icon = '';
          if (type === 'rect') {
            icon = 'xuanzefanwei4';
          } else if (type === 'circle') {
            icon = 'xuanzefanwei3';
          }
          return (<svg className={styles.icon} aria-hidden="true"><use xlinkHref={`#anticon-${icon}`}></use></svg>);
        },
      }, {
        key: 'ruler',
        title: 'Alarm',
        dataIndex: 'ruler',
        render: (text, record) => {
          return (
            <div>
              <div>
                <span className={styles.label}>enter</span>
                <Switch disabled size="small" defaultChecked={text.enterIsEnable} />
              </div>
              <div>
                <span className={styles.label}>exit</span>
                <Switch disabled size="small" defaultChecked={text.leaveIsEnable} />
              </div>
            </div>
            );
        },
      }, {
        key: 'ruler.enterCycle',
        title: 'Cycle',
        dataIndex: 'ruler.enterCycle',
        render: (status, record) => {
          let desc = Mixin.convertWeek(record.ruler.cycle);
          return (
            <div>
              <div>{desc}</div>
              <div>{record.ruler.startTime} ~ {record.ruler.endTime}</div>
            </div>
          );
        },
      }, {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          return (
            <div>
              <Tooltip title="Unbind">
                <Popconfirm title="Unbind?" onConfirm={() => this.props.onBind(record.id)} okText="yes" cancelText="no">
                  <a href="#">
                    <Icon type="disconnect" />
                  </a>
                </Popconfirm>
              </Tooltip>
            </div>
          );
        },
      },
    ];
    const rowSelection = {
      selectedRowKeys,
      type: 'radio',
      onChange: this.onSelectChange,
      onSelect: this.onSelect,
    };
    const pagination = {
      total: data.length,
      pageSize: 6,
      showSizeChanger: false,
      showTotal: total => `Total of ${total} records`,
      onShowSizeChange(current, pageSize) {},
      onChange(current) {
        // console.log(current);
      },
    };
    return (
      <Table rowKey={record => record._id} rowSelection={rowSelection} columns={columns} dataSource={data} pagination={pagination} />
    );
  }
}

List.propTypes = {
  onBind: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default List;
