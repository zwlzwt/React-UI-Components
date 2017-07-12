// created by @zhaoweilong
//         Name                Type                Default          Description
// @param  active              Boolean             false            控制date-picker-dialog是否显示
// @param  cancelLabel         String              取消              左边的button文案
// @param  verifyLabel         String              确认              右边button文案
// @param  inputFormat         Func                                 自定义的排版方式
// @param  locale              String或者Object                      自定义日期可以参考time.js文件
// @param  maxDate             Date
// @param  minDate             Date
// @param  onChange            Func
// @param  onClick             Func
// @param  onDismiss           Func
// @param  onEscKeyDown        Func
// @param  onKeyPress          Func
// @param  onOverlayClick      Func
// @param  value               Date
// @param  onChange            Func

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Input from '../Input/input.js'
import DatePickerDialog from './DatePickerDialog'
import time from '../Time/time.js'

class DatePicker extends Component {
  static propTypes = {
    active: PropTypes.bool,
    cancelLabel: PropTypes.string,
    inputFormat: PropTypes.func,
    rootClassName: PropTypes.string,
    locale: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    verifyLabel: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onDismiss: PropTypes.func,
    onEscKeyDown: PropTypes.func,
    onKeyPress: PropTypes.func,
    onOverlayClick: PropTypes.func,
    sundayFirstDayOfWeek: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]),
  }

  static defaultProps = {
    rootClassName: '',
    active: false,
    sundayFirstDayOfWeek: false,
  }

  state = {
    active: this.props.active,
  }

  handleInputFocus = (value, event) => {
    event.preventDefault()
    event.stopPropagation()
    this.setState({ active: true })
  }

  handleInputClick = (value, event) => {
    event.preventDefault()
    event.stopPropagation()
    this.setState({ active: true })
    if (this.props.onClick) this.props.onClick(event)
  }

  handleSelect = (value, event) => {
    if (this.props.onChange) this.props.onChange(value, event)
    this.setState({ active: false })
  }

  handleDismiss = () => {
    this.setState({ active: false })
    if (this.props.onDismiss) {
      this.props.onDismiss()
    }
  }

  render() {
    const {
      rootClassName,
      active,
      onDismiss,
      cancelLabel,
      inputFormat,
      locale,
      maxDate,
      minDate,
      verifyLabel,
      onEscKeyDown,
      onOverlayClick,
      sundayFirstDayOfWeek,
      value,
      ...others
      } = this.props

    const finalInputFormat = inputFormat || time.formatDate
    const date = Object.prototype.toString.call(value) === '[object Date]' ? value : undefined
    const formattedDate = date === undefined ? '' : finalInputFormat(value, locale)


    return (
      <div className={rootClassName}>
        <Input
          {...others}
          onFocus={this.handleInputFocus}
          onClick={this.handleInputClick}
          readOnly
          value={formattedDate}
        />
        <DatePickerDialog
          active={this.state.active}
          cancelLabel={cancelLabel}
          locale={locale}
          maxDate={maxDate}
          minDate={minDate}
          name={this.props.name}
          onDismiss={this.handleDismiss}
          verifyLabel={verifyLabel}
          onEscKeyDown={onEscKeyDown || this.handleDismiss}
          onOverlayClick={onOverlayClick || this.handleDismiss}
          onSelect={this.handleSelect}
          sundayFirstDayOfWeek={sundayFirstDayOfWeek}
          value={date}
        />
      </div>
    )
  }
}

export default DatePicker
