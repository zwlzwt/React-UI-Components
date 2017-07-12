import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './overlay.less'

class Overlay extends Component {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    rootClassName: PropTypes.string,
    lockScroll: PropTypes.bool,
    onClick: PropTypes.func,
    onEscKeyDown: PropTypes.func,
  }

  static defaultProps = {
    lockScroll: true,
  }

  componentDidMount() {
    const { active, lockScroll, onEscKeyDown } = this.props
    if (onEscKeyDown) document.body.addEventListener('keydown', this.handleEscKey)
    if (active && lockScroll) document.body.style.overflow = 'hidden'
  }

  componentWillUpdate(nextProps) {
    if (this.props.lockScroll) {
      const becomingActive = nextProps.active && !this.props.active
      const becomingUnactive = !nextProps.active && this.props.active

      if (becomingActive) {
        document.body.style.overflow = 'hidden'
      }

      if (becomingUnactive && document.querySelectorAll('[data-meituan-component="overlay"]')[0]) {
        document.body.style.overflow = ''
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.onEscKeyDown) {
      if (this.props.active && !prevProps.active) {
        document.body.addEventListener('keydown', this.handleEscKey)
      } else if (!this.props.active && prevProps.active) {
        document.body.removeEventListener('keydown', this.handleEscKey)
      }
    }
  }

  componentWillUnmount() {
    if (this.props.active && this.props.lockScroll) {
      if (document.querySelectorAll('[data-meituan-component="overlay"]')[0]) {
        document.body.style.overflow = ''
      }
    }

    if (this.props.onEscKeyDown) {
      document.body.removeEventListener('keydown', this.handleEscKey)
    }
  }

  handleEscKey = (e) => {
    if (this.props.active && this.props.onEscKeyDown && e.which === 27) {
      this.props.onEscKeyDown(e)
    }
  }

  handleClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (this.props.onClick) {
      this.props.onClick(event)
    }
  }

  render() {
    const {
      active,
      rootClassName,
      lockScroll,
      onEscKeyDown,
      ...other
    } = this.props

    return (
      <div
        {...other}
        data-meituan-component='overlay'
        onClick={this.handleClick}
        className={classnames('overlay-style', rootClassName)}
      />
    )
  }
}

export default Overlay
