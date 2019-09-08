import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dot from '../Dot';
import styles from './index.less';

const Wave = ({ dispatch, size, position }) => {
  const params = {
    style: {
      transform: `scale(${size})`,
      left: position[0],
      top: position[1],
    },
  }
  return (
    <div className={styles.dot} {...params}>
      <Dot size={5} position={['50%', '50%']} />
      <div className={styles.dot1}></div>
      <div className={styles.dot2}></div>
      <div className={styles.dot3}></div>
    </div>
  )
}
Wave.propTypes = {
  size: PropTypes.number,
  position: PropTypes.array,
}
export default Wave;
