// created by @zhaoweilong
//         Name                             Type                Default          Description
// @param  rootClassName                    String              ''               根组建样式添加(以class的形式在css中添加)
// @param  disabled                         Boolean             false            禁用radio和radio的disabled一致
// @param  label                            String                               输入框名字相当于laber标签在选择框右侧
// @param  name                             String                               给选择框name值
// @param  value                            Any                                  radio的value值

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './radioButton.less'

class RadioButton extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    rootClassName: PropTypes.string,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  }

  static defaultProps = {
    checked: false,
    disabled: false,
  }

  blur() {
    if (this.inputNode) {
      this.inputNode.blur();
    }
  }

  focus() {
    if (this.inputNode) {
      this.inputNode.focus();
    }
  }

  handleClick = (event) => {
    const { checked, disabled, onChange } = this.props
    if (event.pageX !== 0 && event.pageY !== 0) this.blur()
    if (!disabled && !checked && onChange) onChange(event, this)
  }

  render() {
    const {
      rootClassName,
      checked,
      children,
      className,
      disabled,
      label,
      name,
      onChange,
      onMouseEnter,
      onMouseLeave,
      theme,
      ...others
      } = this.props

    return (
      <label
        className={classnames('radio', {disabled: disabled}, rootClassName)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        >
        <input
          {...others}
          checked={checked}
          className='real-radio'
          type="radio"
          ref={(node) => { this.inputNode = node }}
          onChange={()=>{}}
          onClick={this.handleClick}
          disabled={disabled}
          name={name}
        />
        <div className='fade-radio'></div>
        {label ? <span className='radio-label'>{label}</span> : null}
        {children}
      </label>

    )
  }
}

export default RadioButton
