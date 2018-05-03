/** Use Case
 * options: {
 *  header: arrary
 *  body: array
 *  show: bool是否显示折叠部分
 * }
 *
 * 始终显示的几项，不管几个都在一行显示
 * header: [{
 *  tip: {
 *    text: 是指文字,
 *    tip: {
 *      text: 是指下方提醒小字,
 *      status: 是指左侧badge的状态
 *    }
 *  }
 * }]
 * body: [{
 *  tips: [{ 多个提示字段
 *    text: 文字
 *    status: 是指左侧badge的状态
 *  }]
 * }]
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import _ from 'lodash';
import { Row, Col, Button, Badge, Input, Spin, Tabs, Icon } from 'antd';
import Animate from 'rc-animate';
import moment from 'moment';
import styles from './index.less';
import classNames from 'classnames';
import Block from '../Block';

const createReactClass = require('create-react-class');

const tips = {
  false: '更多',
  true: '收起',
}

/**
 * 头部代码
 */
const HeaderItem = ({ tip, text, style, index }) => {
  const defautlColor = '#108ee9';

  //修改text样式和tip样式
  style = style || {};
  if (_.isEmpty(style.tip)) {
    style.tip = {}
  }
  if (_.isEmpty(style.text)) {
    style.text = {};
  }

  const prefixCls = 'overview-pane';
  const headerClassName = `${prefixCls}-header-item`;
  const badgeOptions = {
    text: tip.text,
    status: tip.status || 'processing',
  }

  let badageClassNames;
  if (badgeOptions.status === 'offline') {
    badageClassNames = classNames({
      [styles['offline-status']]: true,
    });
  }
  if (index === 0) {
    badageClassNames = classNames({
      [styles.firstItem]: true,
    });
  }

  return (
    <div className={styles[headerClassName]}>
      <span style={style.text} className={styles.text}>{text}</span>
      <div>
        <Badge className={badageClassNames} {...badgeOptions} />
      </div>
    </div>
  )
}

HeaderItem.propTypes = {
  tip: PropTypes.shape({
    text: PropTypes.string,
    status: PropTypes.oneOf(['offline', 'processing', 'warning']),
  }),
  text: PropTypes.number,
  style: PropTypes.object,
  index: PropTypes.number,
};

/**
 * 折叠部分
 */
const BodyItem = ({ dispatch, tips, text, name, style, isMargin }) => {
  const circleOptions = {
  }
  const defautlColor = '#108ee9';

  const bodyClassName = 'overview-pane-body-item'

  const BodyClassNames = classNames({
    [styles[bodyClassName]]: !isMargin,
    [styles[`${bodyClassName}-margin`]]: isMargin,
  })

  style = style || {};
  if (_.isEmpty(style.tip)) {
    style.tip = {}
  }
  if (_.isEmpty(style.text)) {
    style.text = {};
  }

  if (_.isEmpty(style.footer)) {
    style.footer = {};
  }

  function mapTips() {
    return _.map(tips, (tip, index) => {
      circleOptions.color = tip.status || defautlColor;
      const badgeOptions = {
        text: tip.text,
        status: tip.status || 'processing',
      }
      let badgeClassNames;
      if (!tip.status) {
        switch (index) {
          case 0: badgeOptions.status = 'processing'; break;
          case 1: badgeOptions.status = 'warning'; break;
          case 2: badgeOptions.status = 'offline'; break;
          default: badgeOptions.status = 'processing'; break;
        }
      }
      if (badgeOptions.status === 'offline') {
        badgeClassNames = classNames({
          [styles['offline-status']]: true,
        });
      }
      return (
        <Col span={7} key={index}>
          <div className={styles.tip}>
            <Badge className={badgeClassNames} {...badgeOptions} />
          </div>
        </Col>
      );
    });
  }
  return (
    <div className={BodyClassNames} >
      <span style={style.text} className={styles.text}>{text}</span>
      <div>
        <Row type="flex" justify="space-around" align="middle">
          {mapTips()}
        </Row>
      </div>
      <footer style={style.footer}>{name}</footer>
    </div>
  )
}

BodyItem.propTypes = {
  tips: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    status: PropTypes.string,
  })),
  text: PropTypes.string,
  name: PropTypes.string,
  isMargin: PropTypes.bool,
  style: PropTypes.object,
};

const Body = ({ body, bodyStyle, show }) => {
  const mapBody = () => {
    if (!show) {
      return null;
    }
    body = _.isEmpty(body) ? [] : body;
    let col = 8;
    if (body.length === 2) {
      col = 12;
    }
    if (body.length === 1) {
      col = 24;
    }
    return _.map(body, (item, index) => {
      let isMargin = index !== 0;
      if ((index / 3) === 1) {
        isMargin = false;
      }
      return <Col span={col} key={index}>
        <BodyItem tips={item.tips} text={item.text} name={item.name} isMargin={isMargin} style={bodyStyle || {}} />
      </Col>
    });
  }

  return (
    <Row type="flex" justify="start" align="middle">
      {mapBody()}
    </Row>
  )
};

Body.propTypes = {
  body: PropTypes.arrayOf(PropTypes.shape({
    tips: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      status: PropTypes.string,
    })),
    text: PropTypes.string,
    name: PropTypes.string.isRequired,
  })),
  show: PropTypes.bool,
  bodyStyle: PropTypes.object,
};

/**
 *  OverviewPane
 */
const OverviewPaneClassName = 'overview-pane';

const OverviewPane = createReactClass({
  getInitialState() {
    return {
      showBody: false,
      tip: '更多',
    };
  },

  mapHeader() {
    const header = _.isEmpty(this.props.header) ? [] : this.props.header;
    const length = header.length;
    const col = 24 / length;
    return _.map(header, (item, index) => {
      return <Col span={col} key={index}>
        <HeaderItem tip={item.tip} text={item.text} style={this.props.headStyle || {}} index={index} />
      </Col>
    });
  },

  showMore() {
    const showBody = !this.state.showBody;
    this.setState({
      showBody,
      tip: tips[showBody],
    })
  },

  render() {
    const show = this.props.show;
    const tip = this.state.tip;
    const showBody = this.state.showBody;
    return (
      <div className={OverviewPaneClassName}>
        {show ?
          <div onClick={this.showMore} className={styles.more} >
            <span style={{ marginRight: 5 }}>
              {tip}
            </span>
            {this.state.showBody ? <Icon type="up" /> : <Icon type="down" />}
          </div>
        : null}
        <Row type="flex" justify="space-around" align="middle" className={styles['overview-header']}>
          {this.mapHeader()}
        </Row>
        <Animate showProp="show" transitionName="fade" >
          {show ? <Body body={this.props.body} bodyStyle={this.props.bodyStyle} show={showBody} /> : null}
        </Animate>
      </div>
    )
  },
});

OverviewPane.propTypes = {
  header: PropTypes.arrayOf(PropTypes.shape({
    tip: PropTypes.shape({
      text: PropTypes.string,
      status: PropTypes.oneOf(['offline', 'processing', 'warning']),
    }),
    text: PropTypes.number,
  })),
  body: PropTypes.arrayOf(PropTypes.shape({
    tips: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      status: PropTypes.oneOf(['offline', 'processing', 'warning']),
    })),
    text: PropTypes.string,
    name: PropTypes.string.isRequired,
  })),
  show: PropTypes.bool,
}

export default OverviewPane;
