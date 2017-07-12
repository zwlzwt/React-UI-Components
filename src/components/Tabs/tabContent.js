import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './tabContent.less'

class TabContent extends Component {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    tabIndex: PropTypes.number,
  }

  render() {
    return (
      <section className='tab-content' tabIndex={this.props.tabIndex}>
        {this.props.children}
      </section>
    )
  }
}

export default TabContent
