import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Button, Card } from 'antd';
// import Mixin from '../../utils/mixin';
import styles from './index.less';
// const Search = Input.Search;
const _ = require('lodash');

class CardPane extends Component {
  state = {
    checkedList: [],
  };
  render() {
    const { title, option, content, height } = this.props;
    return (
      <div>
        <Card title={title} extra={option} style={{ minHeight: height }} >
          {content}
        </Card>
      </div>
    )
  }
}

CardPane.propTypes = {
  
}

export default CardPane;
