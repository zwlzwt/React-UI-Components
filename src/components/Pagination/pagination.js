import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Page from './page.js'

import './pagination.less'

function noop() {
}

class Pagination extends Component {
  static defaultProps = {
    defaultCurrent: 1,
    defaultPageSize: 10,
    total: 0,
    onChange: noop,
    rootClassName: '',
    pageClass: '',
  }

  static propTypes = {
    current: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number,
    onChange: PropTypes.func,
    defaultCurrent: PropTypes.number,
    rootClassName: PropTypes.string,
    pageClass: PropTypes.string,
  }

  state = {
    current: this.props.current || this.props.defaultCurrent,
    pageSize: this.props.pageSize || this.props.defaultPageSize,
  }

  componentWillReceiveProps(nextProps) {
    if ('current' in nextProps) {
      this.setState({
        current: nextProps.current,
      })
    }

    if ('pageSize' in nextProps) {
      const newState = {}
      let current = this.state.current
      const newCurrent = this.calculateAllPage(nextProps.pageSize)
      current = current > newCurrent ? newCurrent : current
      if (!('current' in nextProps)) {
        newState.current = current
        newState.currentInputValue = current
      }
      newState.pageSize = nextProps.pageSize
      this.setState(newState)
    }
  }

  calculateAllPage(p) {
    let pageSize = p
    if (typeof pageSize === 'undefined') {
      pageSize = this.state.pageSize
    }
    return Math.floor((this.props.total - 1) / pageSize) + 1
  }

  isValid = (page) => {
    return Number.isInteger(page) && page >= 1 && page !== this.state.current
  }

  handleChange = (p) => {
    let page = p
    if (this.isValid(page)) {
      if (page > this.calculateAllPage()) {
        page = this.calculateAllPage()
      }

      if (!('current' in this.props)) {
        this.setState({
          current: page,
        })
      }

      const pageSize = this.state.pageSize
      this.props.onChange(page, pageSize)

      return page
    }

    return this.state.current
  }

  enterRun = (event, callback, ...restParams) => {
    if (event.key === 'Enter' || event.which === 13) {
      callback(...restParams)
    }
  }

  canPrev = () => {
    return this.state.current > 1
  }

  canNext = () => {
    return this.state.current < this.calculateAllPage()
  }

  prev = () => {
    if (this.canPrev()) {
      this.handleChange(this.state.current - 1)
    }
  }

  next = () => {
    if (this.canNext()) {
      this.handleChange(this.state.current + 1)
    }
  }

  render() {
    const pageList = []
    const allPages = this.calculateAllPage()
    const prevDisabled = !this.canPrev()
    const nextDisabled = !this.canNext()
    const {
      current,
      pageSize,
    } = this.state
    const {
      rootClassName,
      pageClass,
    } = this.props
    const pageBufferSize = 2
    let firstPage = null
    let lastPage = null
    let leaveOutPrev = null
    let leaveOutNext = null

    if (allPages <= 9) {
      for (let i = 1; i <= allPages; i++) {
        const active = this.state.current === i
        pageList.push(
          <Page
            onClick={this.handleChange}
            onKeyPress={this.enterRun}
            pageNum={i}
            key={i}
            active={active}
            pageClass={pageClass}
          />
        )
      }
    } else {
      leaveOutPrev = (
        <li
          key="prev"
          className='leave-out-prev'
        >
          <a></a>
        </li>
      )
      leaveOutNext = (
        <li
          key="next"
          className='leave-out-next'
        >
          <a></a>
        </li>
      )
      lastPage = (
        <Page
          onClick={this.handleChange}
          onKeyPress={this.enterRun}
          key={allPages}
          pageNum={allPages}
          active={false}
        />
      )
      firstPage = (
        <Page
          onClick={this.handleChange}
          onKeyPress={this.enterRun}
          key={1}
          pageNum={1}
          active={false}
        />
      )

      let left = Math.max(1, current - pageBufferSize)
      let right = Math.min(current + pageBufferSize, allPages)

      if (current - 1 <= pageBufferSize) {
        right = 1 + pageBufferSize * 2
      }

      if (allPages - current <= pageBufferSize) {
        left = allPages - pageBufferSize * 2
      }

      for (let i = left; i <= right; i++) {
        const active = current === i
        pageList.push(
          <Page
            onClick={this.handleChange}
            onKeyPress={this.enterRun}
            key={i}
            pageNum={i}
            active={active}
            pageClass={pageClass}
          />
        )
      }

      if (current - 1 >= pageBufferSize * 2 && current !== 1 + 2) {
        pageList.unshift(leaveOutPrev)
      }
      if (allPages - current >= pageBufferSize * 2 && current !== allPages - 2) {
        pageList.push(leaveOutNext)
      }

      if (left !== 1) {
        pageList.unshift(firstPage)
      }
      if (right !== allPages) {
        pageList.push(lastPage)
      }
    }

    return (
      <ul
        className={classnames('pagination-wrap', rootClassName)}
      >
        <li
          title='上一页'
          className={classnames('pagination-prev', {prevDisabled})}
          onClick={this.prev}
          tabIndex="0"
        >
          <a className={classnames({disabled: prevDisabled})}></a>
        </li>
        {pageList}
        <li
          title='下一页'
          className={classnames('pagination-next', {nextDisabled})}
          onClick={this.next}
          tabIndex="0"
        >
          <a className={classnames({disabled: nextDisabled})}></a>
        </li>
      </ul>
    )
  }
}

export default Pagination
