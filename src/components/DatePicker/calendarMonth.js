import React, { Component } from 'react'
import PropTypes from 'prop-types'
import time from '../Time/time.js'
import CalendarDay from './calendarDay.js'
import range from '../Time/range.js'
import './calendarMonth.less'

class Month extends Component {
  static propTypes = {
    locale: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    onDayClick: PropTypes.func,
    selectedDate: PropTypes.instanceOf(Date),
    sundayFirstDayOfWeek: PropTypes.bool,
    viewDate: PropTypes.instanceOf(Date),
  }

  handleDayClick = (day) => {
    if (this.props.onDayClick) this.props.onDayClick(day)
  }

  renderWeeks() {
    const days = range(0, 7).map(d => time.getDayOfWeekLetter(d, this.props.locale))
    const source = (this.props.sundayFirstDayOfWeek) ? days : [...days.slice(1), days[0]]
    return source.map((day, i) => (<span key={i} className='calendar-month-week-item'>{day}</span>))
  }

  isDayDisabled(date) {
    const { minDate, maxDate, enabledDates, disabledDates } = this.props
    const compareDate = compDate => date.getTime() === compDate.getTime()
    return  time.dateOutOfRange(date, minDate, maxDate)
  }

  renderDays() {
    return range(1, time.getDaysInMonth(this.props.viewDate) + 1).map((i) => {
      const date = new Date(this.props.viewDate.getFullYear(), this.props.viewDate.getMonth(), i)
      return (
        <CalendarDay
          key={i}
          day={i}
          disabled={this.isDayDisabled(date)}
          onClick={this.handleDayClick}
          selectedDate={this.props.selectedDate}
          viewDate={this.props.viewDate}
          sundayFirstDayOfWeek={this.props.sundayFirstDayOfWeek}
        />
      )
    })
  }

  render() {
    const fullMonth = time.getFullMonth(this.props.viewDate, this.props.locale)
    const fullYear = this.props.viewDate.getFullYear()
    return (
      <div className='calendar-month-wrap'>
        <span className='calendar-month-title'>
          {fullYear} {fullMonth}
        </span>
        <div className='calendar-month-weeks'>{this.renderWeeks()}</div>
        <div className='calendar-month-days'>{this.renderDays()}</div>
      </div>
    )
  }
}

export default Month
