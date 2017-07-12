import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './step.less'

class Step extends Component {
  static propTypes = {
    rootClassName: PropTypes.string,
    active: PropTypes.bool,
    children: PropTypes.node,
    completed: PropTypes.bool,
    disabled: PropTypes.bool,
    index: PropTypes.number,
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    last: PropTypes.bool,
  }

  renderChild = (child) => {
    const {
      active,
      completed,
      disabled,
      index,
      last,
    } = this.props

    const icon = index + 1

    return React.cloneElement(child, Object.assign(
      {active, completed, disabled, icon, last},
      child.props
    ))
  }

  render() {
    const {
      rootClassName,
      active,
      completed,
      disabled,
      index,
      last,
      children,
      orientation,
      ...other,
    } = this.props

    return (
      <div className={classnames('step-item', rootClassName)} {...other}>
        {React.Children.map(children, this.renderChild)}
      </div>
    )
  }
}

export default Step
