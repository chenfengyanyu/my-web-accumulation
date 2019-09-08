import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Block = ({ dispatch, val }) => {
  return (
    <div style={{ height: val, clear: 'both' }}></div>
  )
}
Block.propTypes = {
  val: PropTypes.number,
}
export default Block;
