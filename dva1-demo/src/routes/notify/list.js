import React from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Icon, Button, Popconfirm, Tooltip, Switch } from 'antd';

const List = ({ onUpdate, onState, onDelete, data }) => {
  const columns = [
    {
      key: 'content',
      title: 'Email',
      dataIndex: 'content',
    }, {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
    }, {
      key: 'createdTime',
      title: 'Created Time',
      dataIndex: 'createdTime',
    }, {
      key: '',
      title: 'Switch',
      render: (text, record) => {
        function onChange(checked) {
          onState(record, checked);
        }
        return (
          <Switch defaultChecked={record.isEnabled} onChange={onChange} checkedChildren={'On'} unCheckedChildren={'Off'} />
          );
      },
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        return (
          <div>
            <Tooltip title="Edit">
              <a href="#">
                <Icon onClick={() => onUpdate(record)} type="edit" />
              </a>
            </Tooltip>
            <span className="ant-divider" />
            <Tooltip title="Delete">
              <Popconfirm title="Delete?" onConfirm={() => onDelete(record._id)} okText="Ok" cancelText="否">
                <a href="#" disabled={record.isEnabled ? 'disabled' : ''}>
                  <Icon type="delete" />
                </a>
              </Popconfirm>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const pagination = {
    total: data.length,
    pageSize: 10,
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
  onState: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default List;
