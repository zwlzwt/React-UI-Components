// created by @zhaoweilong
//         Name                             Type                Default          Description
// @param  rootClassName                    String              ''               根组建样式添加(以class的形式在css中添加)
// @param  disabled                         Boolean             false            禁用button 按钮
// @param  children                         node                                 button内部的自主添加结构
// @param  raised                           Boolean             false            是否有凸起效果
// @param  type                             String              text             原生button的type
// @param  icon                             node                                 svg的icon
// @param  label                            String                               button 上的文字
// @param  onMouseUp                        Function                             鼠标移入callback
// @param  onMouseLeave                     Function                             鼠标移出callback

import React, { Component }from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './button.less'

class Button extends Component {
  static propTypes = {
    rootClassName: PropTypes.string,
    label: PropTypes.string,
    children: PropTypes.node,
    type: PropTypes.string,
    onMouseLeave: PropTypes.func,
    onMouseUp: PropTypes.func,
    raised: PropTypes.bool,
    disabled: PropTypes.bool,
    icon: PropTypes.node,
  }

  static defaultProps = {
    rootClassName: '',
    type: 'button',
    raised: false,
  }

  getShape = () => {
    if (this.props.raised) return 'raised'
    return 'flat'
  }

  handleMouseUp = (event) => {
    this.buttonNode.blur()
    if (this.props.onMouseUp) this.props.onMouseUp(event)
  }

  handleMouseLeave = (event) => {
    this.buttonNode.blur()
    if (this.props.onMouseLeave) this.props.onMouseLeave(event)
  }

  render() {
    const {
      rootClassName,
      icon,
      label,
      children,
      raised,
      disabled,
      type,
      ...others
    } = this.props

    const shap = this.getShape()

    const classes = classnames(
      'button-style',
      shap,
      {disabled},
      rootClassName
    )

    const props = {
      ...others,
      ref: node => {this.buttonNode = node},
      disabled: this.props.disabled,
      onMouseUp: this.handleMouseUp,
      onMouseLeave: this.handleMouseLeave,
      type: type,
      className: classes,
    }

    return React.createElement(
      'button',
      props,
      icon ? <span>{icon}</span> : null,
      label,
      children,
    )
  }
}

export default Button
