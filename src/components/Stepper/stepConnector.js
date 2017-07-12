import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './stepConnector.less'

const StepConnector = (props) => {
  const { orientation } = props
  const wrapperClass = classnames('line-wrapper', {horizontal: orientation === 'horizontal' ? true : false, vertical: orientation === 'vertical' ? true : false})
  const lineClass = classnames('line-style', {horizontal: orientation === 'horizontal' ? true : false, vertical: orientation === 'vertical' ? true : false})


  return (
    <div className={wrapperClass}>
      <span className={lineClass} />
    </div>
  )
}

StepConnector.propTypes = {
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
}

export default StepConnector
