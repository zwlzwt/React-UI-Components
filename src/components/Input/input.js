// created by @zhaoweilong
//         Name                Type                Default          Description
// @param  rootClassName       String              ''               根组建样式添加(以class的形式在css中添加)
// @param  disabled            Boolean             false            禁用input框和input原生的disabled一致
// @param  error               String                               校验输入信息，不匹配显示error
// @param  errorStyle          String              ''               error样式(必须添加根组建的class然后才能添加error class样式)
// @param  hint                String                               输入框默认的提示信息相当于placeholder
// @param  hintStyle           String              ''               hint样式(必须添加根组建的class然后才能添加hint class样式)
// @param  barStyle            String              ''               bar样式(必须添加根组建的class然后才能添加bar class样式)bar是input框底部的线
// @param  label               String                               输入框名字相当于laber标签
// @param  labelStyle          String              ''               label样式(必须添加根组建的class然后才能添加label class样式)
// @param  multiLine           Boolean             false            如果true就是textarea输入框可伸缩
// @param  maxLength           Number                               限制字数input的时候不显示输入数字和总数，textarea时候显示
// @param  rows                Number                               限制textarea的行数
// @param  maxLength           Number                               限制字数input的时候不显示输入数字和总数，textarea时候显示
// @param  required            Boolean             false            必填标示 * 必须在声明label后才有
// @param  type                String              text             原生input的type
// @param  value               Any                                  现在input的值
// @param  onChange            Function                             当value发生改变时候callback 默认参数是(value,event)
// @param  children            node                                 可扩展自定义的dom结构添加在input框下面


import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './input.less'

class Input extends Component {
  static propTypes = {
    children: PropTypes.node,
    rootClassName: PropTypes.string,
    barStyle: PropTypes.string,
    hintStyle: PropTypes.string,
    labelStyle: PropTypes.string,
    errorStyle: PropTypes.string,
    multiLine: PropTypes.bool,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    type: PropTypes.string,
    rows: PropTypes.number,
    defaultValue: PropTypes.string,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    hint: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    maxLength: PropTypes.number,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.string,
    ]),
  }

  static defaultProps = {
    rootClassName: '',
    hint: '',
    multiLine: false,
    disabled: false,
    required: false,
    type: 'text',
  }

  componentDidMount() {
    if (this.props.multiLine) {
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    const element = this.inputNode
    const { rows } = this.props
    if (typeof rows === 'number' && !isNaN(rows)) {
      element.style.height = null
    } else {
      const style = getComputedStyle(element, null)
      const heightOffset = style.boxSizing === 'content-box'
        ? -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom))
        : parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)
      element.style.height = 'auto'
      element.style.height = `${element.scrollHeight + heightOffset}px`
    }
  }

  handleChange = (event) => {
    const { onChange, multiLine, maxLength } = this.props
    const valueFromEvent = event.target.value
    const haveToTrim = (multiLine && maxLength && event.target.value.length > maxLength)
    const value = haveToTrim ? valueFromEvent.substr(0, maxLength) : valueFromEvent
    this.handleResize()

    if (onChange) onChange(value, event)
  }

  blur() {
    this.inputNode.blur()
  }

  focus() {
    this.inputNode.focus()
  }

  handlBlur = (event) => {
    const {
      onBlur
    } = this.props
    const valueFromEvent = event.target.value
    if (onBlur) onBlur(valueFromEvent, event)
  }

  handleFocus = (event) => {
    const {
      onFocus
    } = this.props
    const valueFromEvent = event.target.value
    if (onFocus) onFocus(valueFromEvent, event)
  }

  valuePresent = value => (
    value !== null
    && value !== undefined
    && value !== ''
    && !(typeof value === 'number' && isNaN(value))
  )

  render () {
    const {
      children,
      rootClassName,
      multiLine,
      defaultValue,
      disabled,
      error,
      label: labelText,
      required,
      type,
      hint,
      barStyle,
      hintStyle,
      labelStyle,
      errorStyle,
      value,
      maxLength,
      rows = 1,
      ...others
    } = this.props

    const length = maxLength && value ? value.length : 0

    const className = classnames('input-root', rootClassName)

    const inputElementProps = {
      ...others,
      onChange: this.handleChange,
      ref: node => { this.inputNode = node },
      className: classnames('input-element', {'filled': this.valuePresent(value) || this.valuePresent(defaultValue)}, {'disabled': disabled}),
      name,
      defaultValue,
      onBlur: this.handlBlur,
      onFocus: this.handleFocus,
      disabled,
      required,
      type,
      value,
    }
    if (!multiLine) {
      inputElementProps.maxLength = maxLength
    } else {
      inputElementProps.rows = rows
    }

    return(
      <div className={className}>
        {React.createElement(multiLine ? 'textarea' : 'input', inputElementProps)}
        <span className={classnames('input-bar', barStyle)}/>
        {labelText
          ? <label className={classnames('input-label', labelStyle)}>
            {labelText}
            {required ? <span className='input-required'> * </span> : null}
          </label>
          : null}
        {hint ? <span className={classnames('input-hint', hintStyle)}>{hint}</span> : null}
        {error ? <span className={classnames('input-error', errorStyle)}>{error}</span> : null}
        {maxLength && multiLine ? <span className='input-count'>{length}/{maxLength}</span> : null}
        {children}
      </div>
    )
  }
}


export default Input
