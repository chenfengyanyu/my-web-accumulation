/* Use Case
const steps = [{
  title: 'First',
  content: 'First',
}, {
  title: 'Second',
  content: 'Second-content',
}, {
  title: 'Last',
  content: 'Last-content',
}];

<Step config={steps} />
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Steps, Button, message, Badge, Icon } from 'antd';
import styles from './index.less';
const Step = Steps.Step;

class MySteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  next() {
    const current = this.state.current + 1;
    if (current === 1) {
      if (!this.props.checkStepOne()) {
        message.warning('请先绘制围栏！', 3);
      } else {
        this.setState({ current });
      }
    } else if (current === 2) {
      if (this.props.checkStepTwo()) {
        this.props.onSubmit();
        this.setState({ current });
      } else {
        message.warning('请填写围栏信息！', 3);
      }
    }
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {
    const steps = this.props.config;
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className={styles.stepsContent}>{steps[this.state.current].content}</div>
        <div className={styles.stepsAction}>
          {/*
            this.state.current > 0
            &&
              <Button style={{ marginRight: 15 }} onClick={() => this.prev()}>
                Previous
              </Button>
          */}
          {
            this.state.current < steps.length - 1
            &&
              <Button type="primary" onClick={() => this.next()}>Next</Button>
          }
          {/*
            this.state.current === steps.length - 1
            &&
              <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
          */}
        </div>
      </div>
    );
  }
}

MySteps.propTypes = {
  config: PropTypes.array,
}

export default MySteps;
