// created by @zhaoweilong
//         Name                Type                Default          Description
// @param  rootClassName       String              ''               根组建样式添加(以class的形式在css中添加)
// @param  disabled            Boolean             false            禁用input框和input原生的disabled一致
// @param  checked             Boolean             false            被选中状态
// @param  label               String或者node                        label名字或者自己定义dom结构
// @param  onChange            Func                                 第一个参数是value 是否被选中状态bool 

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Check from './check.js'
import './checkbox.less'

class Checkbox extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    children: PropTypes.node,
    rootClassName: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    name: PropTypes.string,
    onChange: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
  }

  static defaultProps = {
    rootClassName: '',
    checked: false,
    disabled: false,
  }

  handleToggle = (event) => {
    if (event.pageX !== 0 && event.pageY !== 0) this.blur()
    if (!this.props.disabled && this.props.onChange) {
      this.props.onChange(!this.props.checked, event)
    }
  }

  blur() {
    if (this.inputNode) {
      this.inputNode.blur()
    }
  }

  focus() {
    if (this.inputNode) {
      this.inputNode.focus()
    }
  }

  render() {
    const {
      rootClassName,
      checked,
      children,
      disabled,
      label,
      name,
      style,
      onChange,
      onMouseEnter,
      onMouseLeave,
      ...others
    } = this.props

    return (
      <label
        className={classnames('checkbox-field', rootClassName)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <input
          {...others}
          checked={checked}
          className='checkbox-real-input'
          disabled={disabled}
          name={name}
          onChange={() => {}}
          onClick={this.handleToggle}
          ref={(node) => {this.inputNode = node}}
          type="checkbox"
        />
        <Check
          checked={checked}
          disabled={disabled}
        />
        {label ? <span className={classnames('checkbox-label', {disabled: disabled})}>{label}</span> : null}
        {children}
     </label>
    )
  }
}

export default Checkbox
