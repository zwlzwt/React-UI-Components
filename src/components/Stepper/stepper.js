// created by @zhaoweilong
//         Name                             Type                        Default          Description
// @param  rootClassName                    String                      ''               根组建样式添加(以class的形式在css中添加)
// @param  children                         node                                         必须是多个step组建 ex:<step/>
// @param  activeStep                       number                                       设置步骤数的index 初始数是0
// @param  connector                        node                                         步骤之间的连接线可以自定义
// @param  orientation                      'horizontal' || 'vertical'   'horizontal'    步骤纵向排版还是竖向排版

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import StepConnector from './stepConnector'
import './stepper.less'

class Stepper extends Component {

  static propTypes = {
    rootClassName: PropTypes.string,
    activeStep: PropTypes.number,
    children: PropTypes.arrayOf(PropTypes.node),
    connector: PropTypes.node,
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  }

  static defaultProps = {
    connector: <StepConnector />,
    orientation: 'horizontal',
  }

  render() {
    const {
      rootClassName,
      activeStep,
      children,
      connector,
      orientation,
    } = this.props

    const numChildren = React.Children.count(children)
    const steps = React.Children.map(children, (step, index) => {
      const controlProps = {index}

      controlProps.orientation = this.props.orientation

      if (activeStep === index) {
        controlProps.active = true
      } else if (activeStep > index) {
        controlProps.completed = true
      } else if (activeStep < index) {
        controlProps.disabled = true
      }

      if (index + 1 === numChildren) {
        controlProps.last = true
      }

      return [
        index > 0 && React.cloneElement(connector, {orientation}),
        React.cloneElement(step, Object.assign(controlProps, step.props)),
      ]
    })

    return (
      <div className={classnames('stepper-root', {horizontal: orientation === 'horizontal' ? true : false, vertical: orientation === 'vertical' ? true : false},  rootClassName)}>
        {steps}
      </div>
    )
  }
}

export default Stepper
