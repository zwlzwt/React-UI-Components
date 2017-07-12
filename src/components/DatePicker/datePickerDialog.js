import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Dialog from '../Dialog/dialog.js'
import time from '../Time/time.js'
import Calendar from './calendar.js'
import './datePickerDialog.less'

class DatePickerDialog extends Component {
  static propTypes = {
    active: PropTypes.bool,
    cancelLabel: PropTypes.string,
    verifyLabel: PropTypes.string,
    locale: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    onDismiss: PropTypes.func,
    onEscKeyDown: PropTypes.func,
    onOverlayClick: PropTypes.func,
    onSelect: PropTypes.func,
    sundayFirstDayOfWeek: PropTypes.bool,
    value: PropTypes.instanceOf(Date),
  }

  static defaultProps = {
    active: false,
    cancelLabel: '取消',
    verifyLabel: '确认',
    value: new Date(),
  }

  state = {
    display: 'months',
    date: this.props.value,
  }

  handleNewDate = (value, dayClick) => {
    const state = { display: 'months', date: value }
    if (time.dateOutOfRange(value, this.props.minDate, this.props.maxDate)) {
      if (this.props.maxDate && this.props.minDate) {
        state.date = time.closestDate(value, this.props.maxDate, this.props.minDate)
      } else {
        state.date = this.props.maxDate || this.props.minDate
      }
    }
    this.setState(state)
  }

  handleSelect = (event) => {
    if (this.props.onSelect) this.props.onSelect(this.state.date, event)
  }

  handleSwitchDisplay = (event) => {
    this.setState({ display: event.target.id })
  }

  actions = [{
    label: this.props.cancelLabel,
    onClick: this.props.onDismiss,
  },{
    label: this.props.verifyLabel,
    onClick: this.handleSelect,
  }]

  render () {
    const {
      active,
      onEscKeyDown,
      onOverlayClick,
      locale,
    } = this.props

    const DayOfWeek = time.getFullDayOfWeek(this.state.date.getDay(), locale)
    const Month = time.getShortMonth(this.state.date, locale)
    const date = this.state.date.getDate()

    return (
      <Dialog
        actions={this.actions}
        active={active}
        onEscKeyDown={onEscKeyDown}
        onOverlayClick={onOverlayClick}
        rootClassName='date-pick-dialog'
        >
          <header className='dialog-header'>
            <span id='years' className='years' onClick={this.handleSwitchDisplay}>
              {this.state.date.getFullYear()}
            </span>
            <h3 id='months' className='months' onClick={this.handleSwitchDisplay}>
              {Month}{date + '日'} {DayOfWeek}
            </h3>
          </header>
          <div>
            <Calendar
              display={this.state.display}
              handleSelect={this.handleSelect}
              maxDate={this.props.maxDate}
              minDate={this.props.minDate}
              onChange={this.handleNewDate}
              selectedDate={this.state.date}
              locale={this.props.locale}
              sundayFirstDayOfWeek={this.props.sundayFirstDayOfWeek}
            />
          </div>
      </Dialog>
    )
  }
}

export default DatePickerDialog
