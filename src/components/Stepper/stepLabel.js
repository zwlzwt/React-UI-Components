// created by @zhaoweilong
//         Name                             Type                        Default          Description
// @param  rootClassName                    String                      ''               根组建样式添加(以class的形式在css中添加)
// @param  children                         node                                         label的内容，步骤名称

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './stepLabel.less'

const renderIcon = (completed, icon, active) => {
  const iconType = typeof icon

  if (iconType === 'number' || iconType === 'string') {
    if (completed) {
      return (
        <svg viewBox="0 0 24 24" className={classnames("icon-svg-container", {completed})}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z">
          </path>
        </svg>
      )
    }

    return (
      <svg viewBox="0 0 24 24" className={classnames("icon-svg-container", {active})}>
        <circle cx="12" cy="12" r="10" />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="12"
          fill="#fff"
        >
          {icon}
        </text>
      </svg>
    )
  }

  return icon;
}

const StepLabel = (props) => {
  const {
    active,
    children,
    completed,
    icon: indexIcon,
    last,
    ...other
  } = props

  const icon = renderIcon(completed, indexIcon, active)

  return (
    <span className="step-label-root" {...other}>
      {icon && (
        <span className='step-label-icon'>
          {icon}
        </span>
      )}
      {children}
    </span>
  )
}

StepLabel.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  completed: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]),
  last: PropTypes.bool,
}

export default StepLabel
