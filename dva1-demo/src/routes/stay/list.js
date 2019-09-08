import React from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Icon, Button, Popconfirm, Tooltip, Switch, Badge, Tag } from 'antd';

const List = ({ dispatch, onMap, data, page, limit = 10, total }) => {
  const columns = [
    {
      key: 'sn',
      title: 'SN',
      dataIndex: 'sn',
    }, {
      key: 'devices.deviceName',
      title: 'Name',
      dataIndex: 'devices.deviceName',
    }, {
      key: 'tags',
      title: 'Tags',
      dataIndex: 'devices.tags',
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
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      render: (status, record) => {
        if (status === 1) {
          return (<Badge status="error" text="Still" />);
        } else if (status === 2) {
          return (<Badge status="processing" text="Move" />);
        } else {
          return (<Badge status="default" text="Unknow" />);
        }
      },
    }, {
      key: 'createTime',
      title: 'Updating Time',
      dataIndex: 'createTime',
    }, {
      title: 'Longtitude,Latitude',
      key: 'action',
      render: (text, record) => {
        return (
          <div>
            <span>{record.lonlat[1]}, </span>
            <span>{record.lonlat[0]} </span>
            <Tooltip title="Map">
              <a onClick={() => onMap(record)}>
                <svg style={{ fontSize: '15px', verticalAlign: 'bottom' }} className="icon" aria-hidden="true"><use xlinkHref={'#anticon-dingwei'}></use></svg>
              </a>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const pagination = {
    total,
    pageSize: limit,
    current: page,
    showSizeChanger: false,
    showTotal: total => `Total of ${total} records`,
    onShowSizeChange(current, pageSize) {},
    onChange(current) {
      dispatch({ type: 'stay/query', payload: { page: current } });
    },
  };
  return (<Table rowKey={record => record._id} columns={columns} dataSource={data} pagination={pagination} />);
};

List.propTypes = {
  onMap: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default List;
