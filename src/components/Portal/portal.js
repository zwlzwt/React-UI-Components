import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './portal.less'

const Portal = props => {
  return (
    props.active ? <div className='portal-style' style={props._className}>{props.children}</div> : null
  )
}

export default Portal
