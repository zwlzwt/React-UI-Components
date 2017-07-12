import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Portal from '../Portal/portal.js'

import './tooltip.less'

const POSITION = {
  BOTTOM: 'bottom',
  HORIZONTAL: 'horizontal',
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  VERTICAL: 'vertical',
}

const defaults = {
  className: '',
  delay: 0,
  hideOnClick: true,
  passthrough: true,
  showOnClick: false,
  position: POSITION.VERTICAL,
}

const getViewport = () => ({
  height: window.innerHeight || document.documentElement.offsetHeight,
  width: window.innerWidth || document.documentElement.offsetWidth,
})

const TooltipFactory = (ComposedComponent) => {
  class Tooltips extends Component {
    static propTypes = {
      children: PropTypes.node,
      rootClassName: PropTypes.string,
      onClick: PropTypes.func,
      onMouseEnter: PropTypes.func,
      onMouseLeave: PropTypes.func,
      tooltip: PropTypes.string,
    }

    state = {
      active: false,
      position: this.props.tooltipPosition,
    }

    static defaultProps = {
      rootClassName: '',
      tooltipDelay: 0,
      tooltipPosition: POSITION.VERTICAL,
    }

    componentWillUnmount() {
      if (this.timeout) clearTimeout(this.timeout)
    }

    activate() {
      if (this.timeout) clearTimeout(this.timeout)
      this.setState({ visible: true, })
      this.timeout = setTimeout(() => {
        this.setState({ active: true, })
      }, this.props.tooltipDelay)
    }

    deactivate() {
      if (this.timeout) clearTimeout(this.timeout)
      if (this.state.active) {
        this.setState({ active: false })
      } else if (this.state.visible) {
        this.setState({ visible: false })
      }
    }

    handleMouseEnter = (event) => {
      this.activate()
      if (this.props.onMouseEnter) this.props.onMouseEnter(event)
    }

    handleMouseLeave = (event) => {
      this.deactivate()
      if (this.props.onMouseLeave) this.props.onMouseLeave(event)
    }

    render() {
      const {
        active,
        position,
        visible
      } = this.state

      const {
        children,
        rootClassName,
        onClick,
        onMouseEnter,
        onMouseLeave,
        tooltip,
        tooltipDelay,
        tooltipHideOnClick,
        tooltipPosition,
        tooltipShowOnClick,
        ...other,
      } = this.props

      const childProps = {
        ...other,
        rootClassName,
        onClick: this.handleClick,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
      }

      return React.createElement(
        ComposedComponent,
        childProps,
        children,
        visible &&
        <Portal
          active={active}
          _className='wrap-reset'
          >
          <span
            ref={(node) => { this.tooltipNode = node }}
            className='tooltip-wrap'
            >
            <span className='tooltip-inner'>{tooltip}</span>
          </span>
        </Portal>
      )
    }
  }
  return Tooltips
}

export default TooltipFactory
