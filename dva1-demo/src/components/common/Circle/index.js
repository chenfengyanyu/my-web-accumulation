import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dot from '../Dot';
import styles from './index.less';

const Circle = ({ dispatch, size, position }) => {
  const params = {
    style: {
      transform: `scale(${size})`,
      left: position[0],
      top: position[1],
    },
  }
  return (
    <div className={styles.box} {...params}>
      <div className={styles.one}></div>
      <div className={styles.two}></div>
      <Dot size={18} position={['50%', '51%']} />
    </div>
  )
}
Circle.propTypes = {
  size: PropTypes.number,
  position: PropTypes.array,
}
export default Circle;
