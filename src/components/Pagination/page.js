import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import './page.less'

const Page = props => {
  const handleClick = () => {
    props.onClick(props.pageNum)
  }

  const handleKeyPress = event => {
    props.onKeyPress(event, props.onClick, props.pageNum)
  }

  return (
    <li
      title={props.pageNum}
      tabIndex="0"
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      className={classnames('page-item-style', {'foucs-active': props.active}, props.pageClass)}
    >
      <a>{props.pageNum}</a>
    </li>
  )
}

Page.propTypes = {
  pageNum: PropTypes.number,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  handleKeyPress: PropTypes.func,
  pageClass: PropTypes.string,
}

export default Page
