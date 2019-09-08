import React from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Icon, Button, Popconfirm, Tooltip, Switch, Badge } from 'antd';
import Mixin from '../../utils/mixin';
import styles from './index.less';

const columns = [
  {
    key: 'fenceName',
    title: 'Name',
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
  },
];
class List extends React.Component {
  state = {
    selectedRowKeys: [],
  };
  onSelectChange = (selectedRowKeys) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
    this.props.onResult(selectedRowKeys);
  }
  render() {
    const { data, checkFlag } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const pagination = {
      total: data.length,
      pageSize: 5,
      showSizeChanger: false,
      showTotal: total => `Total of ${total} records`,
      onShowSizeChange(current, pageSize) {},
      onChange(current) {
        // console.log(current);
      },
    };
    return (
      <Table rowKey={record => record._id} rowSelection={checkFlag ? rowSelection : undefined} columns={columns} dataSource={data} pagination={pagination} />
    );
  }
}

List.propTypes = {
  onResult: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default List;
