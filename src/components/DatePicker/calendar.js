import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import CalendarMonth from './calendarMonth.js'
import classnames from 'classnames'
import time from '../Time/time.js'
import range from '../Time/range.js'
import './calendar.less'

import Back from './back.js'
import Next from './next.js'

const DIRECTION_STEPS = { left: -1, right: 1 }

class Calendar extends Component {
  static propTypes = {
    display: PropTypes.oneOf(['months', 'years']),
    handleSelect: PropTypes.func,
    locale: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    onChange: PropTypes.func,
    selectedDate: PropTypes.instanceOf(Date),
    sundayFirstDayOfWeek: PropTypes.bool,
  }

  static defaultProps = {
    display: 'months',
    selectedDate: new Date(),
  }

  state = {
    viewDate: this.props.selectedDate,
  }

  changeViewMonth = (event) => {
    const direction = event.currentTarget.id
    this.setState({
      direction,
      viewDate: time.addMonths(this.state.viewDate, DIRECTION_STEPS[direction]),
    })
  }

  componentWillMount() {
    document.body.addEventListener('keydown', this.handleKeys)
  }

  componentDidUpdate() {
    if (this.activeYearNode) {
      this.scrollToActive()
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeys)
  }

  scrollToActive() {
    const offset = (this.yearsNode.offsetHeight / 2) + (this.activeYearNode.offsetHeight / 2)
    this.yearsNode.scrollTop = this.activeYearNode.offsetTop - offset
  }

  handleDayClick = (day) => {
    this.props.onChange(time.setDay(this.state.viewDate, day), true)
  }

  handleYearClick = (event) => {
    const year = parseInt(event.currentTarget.id, 10)
    const viewDate = time.setYear(this.props.selectedDate, year)
    this.setState({ viewDate })
    this.props.onChange(viewDate, false)
  }

  handleKeys = (e) => {
    const { selectedDate } = this.props

    if (e.which === 37 || e.which === 38 || e.which === 39 || e.which === 40 || e.which === 13) {
      e.preventDefault()
    }

    switch (e.which) {
      case 13:
        this.props.handleSelect()
        break
      case 37:
        this.handleDayArrowKey(time.addDays(selectedDate, -1))
        break
      case 38:
        this.handleDayArrowKey(time.addDays(selectedDate, -7))
        break
      case 39:
        this.handleDayArrowKey(time.addDays(selectedDate, 1))
        break
      case 40:
        this.handleDayArrowKey(time.addDays(selectedDate, 7))
        break
      default: break
    }
  }

  handleDayArrowKey = (date) => {
    this.setState({ viewDate: date })
    this.props.onChange(date, false)
  }

  changeViewMonth = (event) => {
    const direction = event.currentTarget.id
    this.setState({
      direction,
      viewDate: time.addMonths(this.state.viewDate, DIRECTION_STEPS[direction]),
    })
  }

  renderYears() {
    return (
      <ul
        className='render-years'
        ref={(node) => {this.yearsNode = node}}
        >
        {range(1800, 2100).map(
          year => (
            <li
              className={classnames('item-style', {active: year === this.state.viewDate.getFullYear()})}
              id={year}
              key={year}
              onClick={this.handleYearClick}
              ref={(node) => {
                if (year === this.state.viewDate.getFullYear()) {
                  this.activeYearNode = node
                }
              }}
            >
              {year}
            </li>
          )
        )}
      </ul>
    )
  }

  renderMonths() {
    const animationClass = this.state.direction === 'left' ? 'slideLeft' : 'slideRight'
    return (
      <div className=''>
        <span id="left" className='prev' onClick={this.changeViewMonth}><Back/></span>
        <span id="right" className='next' onClick={this.changeViewMonth}><Next/></span>
        <CSSTransitionGroup
          transitionName={animationClass}
          transitionEnterTimeout={350}
          transitionLeaveTimeout={350}>
          <CalendarMonth
            enabledDates={this.props.enabledDates}
            disabledDates={this.props.disabledDates}
            key={this.state.viewDate.getMonth()}
            locale={this.props.locale}
            maxDate={this.props.maxDate}
            minDate={this.props.minDate}
            onDayClick={this.handleDayClick}
            selectedDate={this.props.selectedDate}
            sundayFirstDayOfWeek={this.props.sundayFirstDayOfWeek}
            theme={this.props.theme}
            viewDate={this.state.viewDate}
          />
        </CSSTransitionGroup>
      </div>
    )
  }

  render() {
    return (
      <div className='render-group'>
        {this.props.display === 'months' ? this.renderMonths() : this.renderYears()}
      </div>
    )
  }
}

export default Calendar
