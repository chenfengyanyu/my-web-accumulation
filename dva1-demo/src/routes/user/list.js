import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Table, Input, Icon, Button, Popconfirm, Tooltip, Tag, Badge } from 'antd';

const List = ({ onUpdate, onSwitch, onDelete, onAllot, data, app }) => {
  const { user } = app;
  const columns = [
    {
      title: 'Name',
      dataIndex: 'nickname',
      key: 'nickname',
      width: '15%',
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: 'Created Time',
      dataIndex: 'createdTime',
      key: 'createdTime',
    }, {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (record) => {
        return (
          <div>
            <Tooltip title="Edit">
              <a>
                <Icon onClick={() => onUpdate(record)} type="edit" />
              </a>
            </Tooltip>
            <span className="ant-divider" />
            <Tooltip title="Control the subaccount">
              <a>
                <Icon onClick={() => onSwitch(record)} type="swap" />
              </a>
            </Tooltip>
            {user.roles !== 'admin' && record.roles === 'business' &&
              <span>
                <span className="ant-divider" />
                <Tooltip title="Equipment distribution">
                  <a>
                    <Icon onClick={() => onAllot(record._id)} type="plus" />
                  </a>
                </Tooltip>
              </span>
            }
            <span className="ant-divider" />
            <Popconfirm title="Delete?" onConfirm={() => onDelete(record)}>
              <a disabled={record.roles === 'business' ? '' : 'disabled'}>
                <Icon type="delete" />
              </a>
            </Popconfirm>
          </div>
        )
      },
    },
  ];

  const pagination = {
    total: data.length,
    pageSize: 10,
    showSizeChanger: false,
    showTotal: total => `Total of ${total} records`,
    onShowSizeChange(current, pageSize) {},
    onChange(current) {},
  };

  return (
    <Table rowKey={record => record._id} columns={columns} dataSource={data} pagination={pagination} />);
};

List.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  onSwitch: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAllot: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

function mapStateToProps({ app }) {
  return { app }
}

export default connect(mapStateToProps)(List);
