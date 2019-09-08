import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Input, Icon, Button, Popconfirm, Tooltip, Tag, Badge } from 'antd';
import Geolocation from '../../components/common/Geolocation/';

const AlarmLogList = ({ dispatch, onMap, page, limit = 10, logs, total }) => {
  const columns = [{
    key: 'updatedTime',
    title: 'Time',
    dataIndex: 'updatedTime',
  }, {
    key: 'sn',
    title: 'SN',
    dataIndex: 'sn',
  }, {
    key: 'deviceName',
    title: 'Account',
    dataIndex: 'deviceName',
  }, {
    key: 'alarmtip',
    title: 'Type',
    dataIndex: 'type',
    render: (type) => {
      if (type === 0) {
        return (<span style={{ color: '#41BF17' }}>进围栏</span>);
      } else if (type === 1) {
        return (<span style={{ color: '#f56a00' }}>出围栏</span>);
      } else if (type === 2) {
        return (<span style={{ color: '#FF3319' }}>低电量10%</span>);
      } else if (type === 3) {
        return (<span style={{ color: '#FF3319' }}>低电量%5</span>);
      } else if (type === 4) {
        return (<span style={{ color: '#FF3319' }}>低电量%1</span>);
      }

      return (<span style={{ color: '#d9d9d9' }}>未知</span>);
    },
  }, {
    key: 'content',
    title: 'Content',
    dataIndex: 'content',
    width: 350,
  }, {
    key: 'lonlat',
    title: 'Longtitude,Latitude',
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
  }];

  const pagination = {
    total,
    pageSize: limit,
    current: page,
    showSizeChanger: false,
    showTotal: total => `Total of ${total} records`,
    onChange(current) {
      dispatch({ type: 'alarm/filter', payload: { page: current } });
    },
  };

  return (<Table rowKey={record => record._id + record.phone} columns={columns} dataSource={logs} pagination={pagination} />
  );
};

AlarmLogList.propTypes = {
  page: PropTypes.number,
  limit: PropTypes.number,
  total: PropTypes.number,
  logs: PropTypes.array,
  onMap: PropTypes.func.isRequired,
};

export default AlarmLogList;
