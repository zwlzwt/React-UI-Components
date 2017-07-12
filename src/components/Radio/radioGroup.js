// created by @zhaoweilong
//         Name                             Type                Default          Description
// @param  rootClassName                    String              ''               根组建样式添加(以class的形式在css中添加)
// @param  name                             String                               给选择框name值
// @param  value                            Any                                  默认的radio的value值
// @param  onChange                         Function                             当value变化时候的callback 默认参数是radio的value

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class RadioGroup extends Component {
  static propTypes = {
    children: PropTypes.node,
    rootClassName: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  }

  static defaultProps = {
    rootClassName: '',
    disabled: false,
  }

  handleChange = (value) => {
    if (this.props.onChange) this.props.onChange(value)
  }

  renderRadioButtons() {
    return React.Children.map(this.props.children, child => (
      React.cloneElement(child, {
        checked: child.props.value === this.props.value,
        disabled: this.props.disabled || child.props.disabled,
        onChange: this.handleChange.bind(this, child.props.value),
      })
    ))
  }

  render() {
    return (
      <div className={this.props.rootClassName}>
        {this.renderRadioButtons()}
      </div>
    )
  }
}

export default RadioGroup
