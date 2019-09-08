import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import moment from 'moment';
import { Input, Button, Row, Col, Card, DatePicker, Spin, Icon } from 'antd';
import CardPane from '../../components/common/Card';
import Block from '../../components/common/Block';
import List from './list';
import MapModal from './mapModal';
import styles from './index.less';
const RangePicker = DatePicker.RangePicker;
const Search = Input.Search;

const INTERVAL = 90;
let startMoment = moment().subtract(INTERVAL, 'days').startOf('days');
const START_MOMENT_TIMESTAMP = startMoment.valueOf();

function Stay({ dispatch, stay, location, app }) {
  const { lists, mapModalFlag, loading, currentItem, total, query } = stay;
  let dateArr = [];
  const downloadExcel = () => {
    dispatch({
      type: 'stay/download',
      payload: {
        uid: app.user._id,
        beginTime: dateArr.length > 0 && new Date(dateArr[0]).getTime(),
        endTime: dateArr.length > 1 && new Date(dateArr[1]).getTime(),
        search: $('#search').val(),
      },
    })
  }
  const onChange = (date, dateStr) => {
    dateArr = dateStr;
  }
  const showMapModal = (item) => {
    dispatch({
      type: 'stay/showMapModal',
      payload: {
        currentItem: item,
      },
    })
  }
  const disabledDate = (current, b) => {
    let value = current.valueOf();
    const OK = value > Date.now() || value < START_MOMENT_TIMESTAMP;
    if (OK) {
      return true;
    }
    return false;
  }
  const handleSearch = (val) => {
    dispatch({
      type: 'stay/query',
      payload: {
        search: val,
        page: 1,
      },
    })
  }
  const mapModalProps = {
    item: currentItem,
    visible: mapModalFlag,
    onOk(data) {
      dispatch({ type: 'stay/hideMapModal' });
    },
    onCancel() {
      dispatch({ type: 'stay/hideMapModal' });
    },
  }
  const MapModalGen = () => <MapModal {...mapModalProps} />
  const cardPane = {
    title: (<span><Search id="search" placeholder="input search text" onSearch={handleSearch} />
      <RangePicker onChange={onChange} disabledDate={disabledDate} format="YYYY-MM-DD" /></span>),
    option: (<span className={styles.option}>
      <Icon type="download" onClick={downloadExcel} />
    </span>),
    height: 550,
    content: (<Spin size="large" spinning={loading}><List data={lists} onMap={showMapModal} total={total} limit={query.limit} page={query.page} dispatch={dispatch} /></Spin>),
  }
  return (
    <div className="content-inner">
      <CardPane {...cardPane} />
      <MapModalGen />
    </div>
  )
}

function mapStateToProps({ stay, app }) {
  return { stay, app };
}

export default connect(mapStateToProps)(Stay);
