import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Steps, Button, message, Rate, Icon } from 'antd';
import Step from '../../components/common/Step';
import DrawMap from '../../components/common/Draw/';
import Alarm from './alarmForm';
import styles from './index.less';

function MySteps({ dispatch, step }) {
  const { fenceData, alarmData } = step;
  const handleShape = (val) => {
    dispatch({
      type: 'step/fenceInfo',
      payload: val,
    })
  }
  const handleSubmit = (val) => {
    // console.log(Object.assign(fenceData, alarmData), 'submit');
    dispatch({
      type: 'step/create',
      payload: Object.assign(fenceData, val),
    })
  }
  const handleAlarm = (val) => {
    // console.log(val, 'val');
    // dispatch({
    //   type: 'step/alarmInfo',
    //   payload: {
    //     fenceName: val.content,
    //     ruler: {
    //       cycle: val.cycle,
    //       startTime: val.start,
    //       endTime: val.end,
    //       enterIsEnable: val.enter,
    //       leaveIsEnable: val.leave,
    //     },
    //   },
    // })
    let temp = {
      fenceName: val.content,
      ruler: {
        cycle: val.cycle,
        startTime: val.start,
        endTime: val.end,
        enterIsEnable: val.enter,
        leaveIsEnable: val.leave,
      },
    }
    handleSubmit(temp);
  }
  const handleCheckOne = () => {
    if (fenceData.srcData) {
      return true;
    } else {
      return false;
    }
  }
  const handleCheckTwo = () => {
    console.log(alarmData);
    if (alarmData && alarmData.fenceName) {
      return true;
    } else {
      return false;
    }
  }

  const content1 = (
    <DrawMap height={515} onShape={handleShape} />
  )
  const content2 = (
    <Alarm onOk={handleAlarm} />
  )

  const steps = [{
    title: 'First',
    content: content1,
  }, {
    title: 'Second',
    content: content2,
  }];

  return (
    <div className="content-inner">
      <div className={styles.box}>
        <Step
          config={steps}
          checkStepOne={handleCheckOne}
          checkStepTwo={handleCheckTwo}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

function mapStateToProps({ step, app }) {
  return { step, app };
}

export default connect(mapStateToProps)(MySteps);
