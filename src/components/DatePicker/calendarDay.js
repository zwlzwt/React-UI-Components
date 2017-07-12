import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import time from '../Time/time.js'
import './calendarDay.less'

class Day extends Component {
  static propTypes = {
    day: PropTypes.number,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    selectedDate: PropTypes.instanceOf(Date),
    sundayFirstDayOfWeek: PropTypes.bool,
    viewDate: PropTypes.instanceOf(Date),
  }

  dayStyle() {
    if (this.props.day === 1) {
      const e = (this.props.sundayFirstDayOfWeek) ? 0 : 1
      const firstDay = time.getFirstWeekDay(this.props.viewDate) - e

      return {
        marginLeft: `${(firstDay >= 0 ? firstDay : 6) * (100 / 7)}%`,
      }
    }
    return undefined
  }

  isSelected() {
    const sameYear = this.props.viewDate.getFullYear() === this.props.selectedDate.getFullYear()
    const sameMonth = this.props.viewDate.getMonth() === this.props.selectedDate.getMonth()
    const sameDay = this.props.day === this.props.selectedDate.getDate()
    return sameYear && sameMonth && sameDay
  }

  handleClick = () => {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick(this.props.day)
    }
  }

  render() {
    const dayItemStyle = classnames('day-item', {active: this.isSelected(), disabled: this.props.disabled})
    return (
      <div className='calendar-day' style={this.dayStyle()}>
        <span onClick={this.handleClick} className={dayItemStyle}>
          {this.props.day}
        </span>
      </div>
    )
  }
}

export default Day
