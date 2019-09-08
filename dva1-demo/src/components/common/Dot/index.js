import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

const Dot = ({ dispatch, size, position }) => {
  const params = {
    style: {
      width: size,
      height: size,
      left: position[0],
      top: position[1],
    },
  }
  return (
    <div className={styles.circle} {...params}></div>
  )
}
Dot.propTypes = {
  size: PropTypes.number,
  position: PropTypes.array,
}
export default Dot;
