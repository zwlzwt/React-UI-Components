import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './check.less'

const Check = props => (
  <div
    className={classnames('fake-input', {checked:props.checked, disabled: props.disabled})}
  >
    {props.children}
  </div>
)

Check.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
}

export default Check
