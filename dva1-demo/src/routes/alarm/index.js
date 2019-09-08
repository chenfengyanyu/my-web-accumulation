import React from 'react';
import { connect } from 'dva';
import { Breadcrumb, message, Row, Col, DatePicker, Form, Button, Input, Spin, Tabs, Icon } from 'antd';
import CardPane from '../../components/common/Card';
import moment from 'moment';
import Block from '../../components/common/Block';
import AlarmLogList from './list';
import MapModal from './mapModal';

const Search = Input.Search;
const TabPane = Tabs.TabPane;
const { MonthPicker, RangePicker } = DatePicker;
const FormItem = Form.Item;
const dateFormat = 'YYYY-MM-DD';

const INTERVAL = 90;
let today = moment();
let startMoment = moment().subtract(INTERVAL, 'days').startOf('days');
today = today.endOf('days');
const selectedRanges = {
  range: [today, startMoment],
}

//搜索词
let searchText = '';
let startDate;
let endDate;

const AlarmLog = ({ dispatch, alarm }) => {
  let { logs, loading, total, query, mapModalFlag, currentItem } = alarm;

  const showMapModal = (item) => {
    dispatch({
      type: 'alarm/showMapModal',
      payload: {
        currentItem: item,
      },
    })
  }

  const ListProps = {
    dispatch,
    logs,
    total,
    onMap: showMapModal,
    page: query.page,
    limit: query.limit,
  };

  startDate = query.startDate;
  endDate = query.endDate;

  const checkDate = (start, end) => {
    if (start.valueOf() < startMoment.valueOf()) return false;
    if (end.valueOf() > today.valueOf()) return false;
    return true;
  }

  const mapModalProps = {
    item: currentItem,
    visible: mapModalFlag,
    onOk(data) {
      dispatch({ type: 'alarm/hideMapModal' });
    },
    onCancel() {
      dispatch({ type: 'alarm/hideMapModal' });
    },
  }
  const MapModalGen = () => <MapModal {...mapModalProps} />

  const onChange = (date, dateStr) => {
    console.log('get range data: ', date, dateStr);
    let start = moment(date[0]);
    let end = moment(date[1]);
    if (!checkDate(start, end)) {
      console.log('has been return');
      return;
    }
    startDate = moment(date[0]).startOf('day').valueOf();
    endDate = moment(date[1]).endOf('day').valueOf();
    dispatch({
      type: 'alarm/filter',
      payload: {
        startTime: startDate,
        endTime: endDate,
      },
    });
    return;
  }

  //禁止选择3个月以前的数据
  const disabledStartDate = (startValue) => {
    if (!startValue) {
      return false;
    }
    return startValue.valueOf() < startMoment.valueOf() || startValue.valueOf() > moment().valueOf();
  }

  //dispatch
  const _dispatch = (payload) => {
    payload = payload || {};
    dispatch({
      type: 'alarm/filter',
      payload: Object.assign({}, {
        search: searchText,
        startTime: startDate,
        endTime: endDate,
      }, payload),
    });
  }


  //提交搜索
  const handleSubmit = (val) => {
    _dispatch({
      search: val,
    });
  }

  const onInputChange = (e) => {
    console.log(e.target.value);
  }
  const cardPane = {
    title: (<span><Search style={{ width: 200 }} placeholder="input search text" onSearch={handleSubmit} />
      <RangePicker disabledDate={disabledStartDate} defaultValue={[moment(query.startDate), moment(query.endDate)]} format={dateFormat} onChange={onChange} /></span>),
    option: '',
    height: 550,
    content: (<Spin size="large" spinning={loading}><AlarmLogList {...ListProps} /></Spin>),
  }
  return (
    <div className="content-inner">
      <CardPane {...cardPane} />
      <MapModalGen />
    </div>
  );
};

function mapStateToProps({ alarm }) {
  return { alarm };
}

export default connect(mapStateToProps)(AlarmLog);
