import React from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Icon, Button, Popconfirm, Tooltip, Switch, Badge } from 'antd';
import Mixin from '../../utils/mixin';
import styles from './index.less';

const List = ({ onUpdate, onEdit, onDelete, data }) => {
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
      key: 'deviceNum',
      title: 'Status',
      dataIndex: 'deviceNum',
      render: (status, record) => {
        if (record.deviceNum > 0) {
          return (<Badge status="processing" text="Activated" />);
        } else {
          return (<Badge status="default" text="Inactive" />);
        }
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
              <Switch disabled size="small" checked={text.enterIsEnable} />
            </div>
            <div>
              <span className={styles.label}>exit</span>
              <Switch disabled size="small" checked={text.leaveIsEnable} />
            </div>
          </div>
          );
      },
    }, {
      key: 'createTime',
      title: 'Created Time',
      dataIndex: 'createTime',
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
            <Tooltip title="Edit">
              <a>
                <Icon onClick={() => onEdit(record)} type="edit" />
              </a>
            </Tooltip>
            <span className="ant-divider" />
            <Tooltip title="Alarm">
              <a>
                <Icon onClick={() => onUpdate(record)} type="sound" />
              </a>
            </Tooltip>
            <span className="ant-divider" />
            {record.deviceNum > 0 &&
              <Tooltip title="Delete">
                <Popconfirm title="Geo-fencing is using, confirm to delete?" onConfirm={() => onDelete(record._id)} okText="Yes" cancelText="No">
                  <a>
                    <Icon type="delete" />
                  </a>
                </Popconfirm>
              </Tooltip>
            }
            {(record.deviceNum === 0 || record.deviceNum < 0) &&
              <Tooltip title="Delete">
                <Popconfirm title="Delete?" onConfirm={() => onDelete(record._id)} okText="Yes" cancelText="No">
                  <a>
                    <Icon type="delete" />
                  </a>
                </Popconfirm>
              </Tooltip>
            }
          </div>
        );
      },
    },
  ];
  const pagination = {
    total: data.length,
    pageSize: 8,
    showSizeChanger: false,
    showTotal: total => `Total of ${total} records`,
    onShowSizeChange(current, pageSize) {},
    onChange(current) {
      // console.log(current);
    },
  };
  return (<Table rowKey={record => record._id} columns={columns} dataSource={data} pagination={pagination} />);
};

List.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default List;
