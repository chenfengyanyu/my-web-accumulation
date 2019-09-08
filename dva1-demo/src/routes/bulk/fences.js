import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Input, Select, Icon, Button, Spin, Steps } from 'antd';
import Block from '../../components/common/Block';
import List from './list';
import FenceList from './fenceList';
import styles from './index.less';

const Step = Steps.Step;
const Option = Select.Option;
const Search = Input.Search;

const BulkCycle = ({ bulk, dispatch }) => {
  const { lists, loading, fenceStep, fenceBtnStatus, fenceStorage, fenceCheckStatus, deviceCheckStatus, fenceLists } = bulk;
  const handleSearch = (val) => {
    console.log(val);
    // dispatch({
    //   type: 'tracker/query',
    //   payload: {
    //     search: val,
    //     limit: 10000,
    //   },
    // })
  }
  const setCycle = () => {
    let cyc = $('#cycle').val();
    if (!cyc) {
      dispatch({
        type: 'bulk/temp',
        payload: {
          step: 0,
        },
      })
    } else {
      dispatch({
        type: 'bulk/temp',
        payload: {
          cycle: cyc,
          step: 1,
        },
      })
    }
  }
  const handleDevice = (arr) => {
    if (arr.length > 0) {
      dispatch({
        type: 'bulk/fence',
        payload: {
          step: 1,
          snList: arr,
        },
      })
    } else {
      dispatch({
        type: 'bulk/fence',
        payload: {
          step: 0,
        },
      })
    }
  }
  const handleFence = (arr) => {
    if (arr.length > 0) {
      dispatch({
        type: 'bulk/fence',
        payload: {
          step: 2,
          gidList: arr,
        },
      })
    } else {
      dispatch({
        type: 'bulk/fence',
        payload: {
          step: 1,
        },
      })
    }
  }
  const handleSubmit = () => {
    console.log(fenceStorage);
    delete fenceStorage.step;
    dispatch({
      type: 'bulk/bind',
      payload: fenceStorage,
    })
  }
  const step1 = (
    <div>
      <Search placeholder="input search text" onSearch={handleSearch} />
      <Block val={13} />
      <List data={lists} onCheck={handleDevice} checkFlag={deviceCheckStatus} />
    </div>
  )
  const step2 = (
    <div>
      <Search placeholder="input search text" onSearch={handleSearch} />
      <Block val={13} />
      <FenceList data={fenceLists} onResult={handleFence} checkFlag={fenceCheckStatus} />
    </div>
  )
  const step3 = (
    <div className={styles.submitBtn}>
      <Button type="primary" disabled={fenceBtnStatus} onClick={handleSubmit}>Submit</Button>
    </div>
  )
  return (
    <div className="content-inner">
      <div className={styles.box}>
        <Steps current={fenceStep} direction="vertical">
          <Step title="Choose Corresponding Device" description={step1} />
          <Step title="Choose Corresponding Fence" description={step2} />
          <Step title="Complete" description={step3} />
        </Steps>
      </div>
    </div>
  )
}

function mapStateToProps({ bulk }) {
  return { bulk };
}

export default connect(mapStateToProps)(BulkCycle);
