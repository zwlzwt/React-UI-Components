// created by @zhaoweilong
//         Name                Type                Default          Description
// @param  rootClassName       String              ''               根组建样式添加(以class的形式在css中添加)
// @param  index               Number              0                现在tab的位置
// @param  hidden              Boolean             false            隐藏掉这个tab
// @param  onChange            Function                             当tab变化时候的callback默认参数是(index)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TabContent from './tabContent'
import './tabs.less'

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func,
    index: PropTypes.number,
  }

  static defaultProps = {
    index: 0,
  }

  state = {
    pointer: {},
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
    clearTimeout(this.resizeTimeout)
  }

  componentDidUpdate(prevProps) {
    const { index, children } = this.props
    const { index: prevIndex, children: prevChildren } = prevProps

    if (index !== prevIndex || children !== prevChildren) {
      this.updatePointer(index)
    }
  }

  handleResize = () => {
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout)
    this.resizeTimeout = setTimeout(() => {
      this.updatePointer(this.props.index)
    }, 100)
  }

  updatePointer = (idx) => {
    if (this.navigationNode && this.navigationNode.children[idx]) {
      requestAnimationFrame(() => {
        const nav = this.navigationNode.getBoundingClientRect()
        const label = this.navigationNode.children[idx].getBoundingClientRect()
        const scrollLeft = this.navigationNode.scrollLeft
        this.setState({
          pointer: {
            top: `${nav.height}px`,
            left: `${(label.left + scrollLeft) - nav.left}px`,
            width: `${label.width}px`,
          },
        })
      })
    }
  }

  handleHeaderClick = (idx) => {
    if (this.props.onChange) {
      this.props.onChange(idx)
    }
  }

  renderChildren() {
    const headers = []
    const contents = []

    React.Children.forEach(this.props.children, (item) => {
      headers.push(item)
      if (item.props.children) {
        contents.push(
          <TabContent>
            {item.props.children}
          </TabContent>
        )
      }
    })

    return { headers, contents }
  }

  renderHeaders(headers) {
    return headers.map((ele, idx) => React.cloneElement(ele, {
      children: null,
      key: idx,
      active: this.props.index === idx,
      index: idx,
      onClick: (event, index) => {
        this.handleHeaderClick(index)
        if (ele.props.onClick) {
          ele.props.onClick(event)
        }
      },
    }))
  }

  renderContents(contents) {
    const contentElements = contents.map((ele, idx) => React.cloneElement(ele, {
      key: idx,
      active: this.props.index === idx,
      tabIndex: idx,
    }))

    return contentElements.filter((ele, idx) => (idx === this.props.index))
  }

  render() {
    const {
      rootClassName,
    } = this.props
    const { headers, contents } = this.renderChildren()

    const classname = classnames('tabs', rootClassName)

    return (
      <div className={classname}>
        <div className='navigationContainer'>
          <nav className='tabs-navigation' ref={(node) => {this.navigationNode = node}}>
            {this.renderHeaders(headers)}
            <span className='tab-bar' style={this.state.pointer}></span>
          </nav>
        </div>
        {this.renderContents(contents)}
      </div>
    )
  }
}

export default Tabs
