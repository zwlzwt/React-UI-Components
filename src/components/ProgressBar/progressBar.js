import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './progressBar.less'

class ProgressBar extends Component {
  static propTypes = {
    rootClassName: PropTypes.string,
    infoClass: PropTypes.string,
    percent: PropTypes.number,
    multicolor: PropTypes.bool,
    mode: PropTypes.oneOf(['determinate', 'indeterminate']),
    type: PropTypes.oneOf(['linear', 'circular']),
    showInfo: PropTypes.bool,
    infoUnit: PropTypes.string,
  }

  static defaultProps = {
    rootClassName: '',
    infoClass: '',
    percent: 0,
    type: 'linear',
    mode: 'determinate',
    showInfo: true,
    infoUnit: '%',
  }

  calculateRatio(value) {
    return value / 100
  }

  circularStyle() {
    return this.props.mode !== 'indeterminate'
      ? { strokeDasharray: `${2 * Math.PI * 25 * this.calculateRatio(this.props.percent)}, 400` }
      : undefined
  }

  linearStyle() {
    return { transform: `scaleX(${this.calculateRatio(this.props.percent)})` }
  }

  renderCircular() {
    return (
      <svg className='progress-circular' viewBox="0 0 60 60">
        <circle className='progress-circular-inner' style={this.circularStyle()} cx="30" cy="30" r="25" />
      </svg>
    )
  }

  renderLinear() {
    const styleLinear = this.linearStyle()
    return (
      <div>
        <span className='progress-linear' style={styleLinear} />
      </div>
    )
  }

  render() {
    const {
      rootClassName,
      percent,
      type,
      showInfo,
      infoUnit,
      infoClass,
      mode,
    } = this.props
    const className = classnames({
      linear: type === 'linear',
      circular: type === 'circular',
      indeterminate: mode === 'indeterminate',
    }, rootClassName)

    const percentNum = Number.parseInt(percent, 10)

    return (
      <div
        className={className}
      >
        {type === 'circular' ? this.renderCircular() : this.renderLinear()}
        {showInfo && type === 'circular' ? <span className={classnames('percent-num', infoClass)}>{`${percentNum}${infoUnit}`}</span> : null}
      </div>
    )
  }
}

export default ProgressBar
