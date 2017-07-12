// created by @zhaoweilong
//         Name                Type                Default          Description
// @param  rootClassName       String              ''               根组建样式添加(以class的形式在css中添加)
// @param  source              Array                                里面含有object的array ex:[{value: 'wo'},{value: 'ni'}] 可以在obj中设置disabled让条目失效
// @param  disabled(in source) Boolean                              ex:[{value: 'wo', disabled},{value: 'ni'}] 可以在obj中设置disabled让条目失效
// @param  valueKey            String                               可以自己定义source中的{value: 'wo'}key value
// @param  disabled            Boolean             false            禁用input框和input原生的disabled一致
// @param  error               String                               校验输入信息，不匹配显示error
// @param  label               String                               输入框名字相当于laber标签
// @param  required            Boolean             false            必填标示 * 必须在声明label后才有
// @param  type                String              text             原生input的type
// @param  value               Any                                  现在input的值
// @param  onChange            Function                             当value发生改变时候callback 默认参数是(value,event)
// @param  onFocus             Function                             当focus时候触发的callback 默认参数(event)
// @param  onBlur              Function                             当blur时候触发的callback 默认参数(event)


import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import ReactDOM from 'react-dom'
import Input from '../Input/input'
import './selectField.less'

class SelectField extends Component {
  static propTypes = {
    valueKey: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    valueKey: 'value',
    disabled: false,
  }

  state = {
    active: false
  }

  componentDidMount() {
    document.addEventListener('click', e => {
      if (this.state.active && !this.targetIsDescendant(e, ReactDOM.findDOMNode(this))) {
        this.setState({ active: false })
      }
    }, false)
  }

  componentWillUnmount() {
    document.removeEventListener('click', e => {
      if (this.state.active && !this.targetIsDescendant(e, ReactDOM.findDOMNode(this))) {
        this.setState({ active: false })
      }
    }, false)
  }

  targetIsDescendant = (event, parent) => {
    let node = event.target

    while (node !== null) {
      if (node === parent) return true
      node = node.parentNode
    }
    return false
  }

  handleBlur = (event) => {
    event.stopPropagation()
    this.close()
    if (this.props.onBlur) this.props.onBlur(event)
  }

  open = (event) => {
    if (this.state.active) return
    if (this.inputNode) this.inputNode.blur()
    this.setState({ active: true })
  }

  close = () => {
    if (this.state.active) {
      this.setState({ active: false })
    }
  }

  handleFocus = (event) => {
    event.stopPropagation()
    if (!this.props.disabled) {
      this.open(event)
    }
  }

  handleBlur = (event) => {
    event.stopPropagation()
    if (this.state.active) this.close()
    if (this.props.onBlur) this.props.onBlur(event)
  }

  handleSelect = (item, event) => {
    if (this.props.onBlur) this.props.onBlur(event)
    if (!this.props.disabled && this.props.onChange) {
      if (this.props.name) event.target.name = this.props.name
      this.props.onChange(item, event)
      this.close()
    }
  }

  getSelectedItem = () => {
    for (const item of this.props.source) {
      if (item[this.props.valueKey] === this.props.value) return item
    }
    return this.props.source[0]
  }

  renderItem = (item, key) => {
    const { valueKey } = this.props
    return (
      <li
        key={key}
        className={classnames('options-item', {selected: this.props.value === item[valueKey]}, {disabled: item.disabled})}
        onClick={!item.disabled && this.handleSelect.bind(this, item[valueKey])}
        >
        {item[valueKey]}
      </li>
    )
  }

  render() {
    const {
      source,
      rootClassName,
      onFocus,
      onBlur,
      required,
      valueKey,
      disabled,
      ...others,
    } = this.props

    const selected = this.getSelectedItem()

    return (
      <div
        className={classnames('select-field', {active: this.state.active}, rootClassName)}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
      >
        <Input
          {...others}
          ref={(node) => {this.inputNode = node}}
          readOnly
          disabled={disabled}
          required={required}
          rootClassName='selectInput'
          barStyle='disappear'
          value={selected && selected[valueKey] ? selected[valueKey] : ''}
        />
        <svg viewBox="0 0 24 24" className="select-arrow"><path d="M7 10l5 5 5-5z"></path></svg>
        <ul className='options'>
          {source.map(this.renderItem)}
        </ul>
      </div>
    )
  }

}

export default SelectField
