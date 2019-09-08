import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Input, Select, Icon, Button, Spin, Steps } from 'antd';
import Block from '../../components/common/Block';
import List from './list';
import styles from './index.less';

const Step = Steps.Step;
const Option = Select.Option;
const Search = Input.Search;

const BulkCycle = ({ bulk, dispatch }) => {
  const { lists, loading, step, btnStatus, tempStorage, checkStatus } = bulk;
  // sec:秒，min:分钟
  const selectVal = {
    type: 'sec',
  };
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
      if (selectVal.type === 'min') {
        cyc = cyc * 60;
      }
      dispatch({
        type: 'bulk/temp',
        payload: {
          cycle: cyc,
          step: 1,
        },
      })
    }
  }
  const selectValue = (val) => {
    selectVal.type = val;
    setCycle();
  }
  const handleCheck = (arr) => {
    if (arr.length > 0) {
      dispatch({
        type: 'bulk/temp',
        payload: {
          step: 2,
          snList: arr,
        },
      })
    } else {
      dispatch({
        type: 'bulk/temp',
        payload: {
          step: 1,
        },
      })
    }
  }
  const handleSubmit = () => {
    delete tempStorage.step;
    dispatch({
      type: 'bulk/cycle',
      payload: tempStorage,
    })
  }
  const selectAfter = (
    <Select defaultValue="sec" style={{ width: 60 }} onSelect={selectValue}>
      <Option value="sec">Sec</Option>
      <Option value="min">Min</Option>
    </Select>
  );
  const step1 = (
    <span>
      <Input id="cycle" className={styles.cycleInput} onChange={setCycle} type="number" addonAfter={selectAfter} />
    </span>
  )
  const step2 = (
    <div>
      <Search placeholder="input search text" onSearch={handleSearch} />
      <Block val={13} />
      <List data={lists} onCheck={handleCheck} checkFlag={checkStatus} />
    </div>
  )
  const step3 = (
    <div className={styles.submitBtn}>
      <Button type="primary" disabled={btnStatus} onClick={handleSubmit}>Submit</Button>
    </div>
  )
  return (
    <div className="content-inner">
      <div className={styles.box}>
        <Steps current={step} direction="vertical">
          <Step title="Set Transmission Cycle" description={step1} />
          <Step title="Choose Corresponding Device" description={step2} />
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
