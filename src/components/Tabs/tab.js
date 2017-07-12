// created by @zhaoweilong
//         Name                Type                Default          Description
// @param  rootClassName       String              ''               根组建样式添加(以class的形式在css中添加)
// @param  disabled            Boolean             false            禁用这个tab
// @param  hidden              Boolean             false            隐藏掉这个tab
// @param  label               String                               tab名称标题
// @param  onClick             Function                             点击事件触发的callback


import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './tab.less'

class Tab extends Component {
  static propTypes = {
    active: PropTypes.bool,
    rootClassName: PropTypes.string,
    label: PropTypes.string,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    hidden: PropTypes.bool,
    index: PropTypes.number,
  }

  static defaultProps = {
    active: false,
    rootClassName: '',
    disabled: false,
    hidden: false,
  }

  handleClick = (event) => {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick(event, this.props.index)
    }
  }

  render() {
    const {
      rootClassName,
      label,
      children,
      disabled,
      hidden,
      index,
      active,
      ...others
    } = this.props

    const classname = classnames('tab', {
      disabled: disabled,
      hidden: hidden,
      active: active,
    }, rootClassName)

    return (
      <div
        {...others}
        className={classname}
        onClick={this.handleClick}
        >
        {label}
        {children}
      </div>
    )
  }
}

export default Tab
