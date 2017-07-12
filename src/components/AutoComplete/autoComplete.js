// created by @zhaoweilong
//         Name                             Type                Default          Description
// @param  rootClassName                    String              ''               根组建样式添加(以class的形式在css中添加)
// @param  source                           Array                                里面的值必须为字符串并且是一纬数组 ex: ['1', '2', '3', 'wo', 'ni', 'ta']
// @param  disabled                         Boolean             false            禁用input框和input原生的disabled一致
// @param  suggestionMatch                  String              start            一共有三个值可以选择分别是: 'start', 'anywhere', 'word' 分别代表匹配开头，匹配任何地方，匹配一个单词
// @param  error                            String                               校验输入信息，不匹配显示error
// @param  label                            String                               输入框名字相当于laber标签
// @param  required                         Boolean             false            必填标示 * 必须在声明label后才有
// @param  type                             String              text             原生input的type
// @param  value                            Any                                  现在input的值
// @param  onChange                         Function                             当value发生改变时候callback 默认参数是(value,event)
// @param  showSuggestionsWhenValueIsSet    boolean             false            当value存在时是否显示suggest列表

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import Input from '../Input/input'
import './autoComplete.less'

class Autocomplete extends Component {
  static propTypes = {
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    source: PropTypes.any,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    showSuggestionsWhenValueIsSet: PropTypes.bool,
    query: PropTypes.string,
    suggestionMatch: PropTypes.oneOf(['disabled', 'start', 'anywhere', 'word', 'none']),
  }

  static defaultProps = {
    source: {},
    showSuggestionsWhenValueIsSet: false,
    suggestionMatch: 'start',
    value: '',
  }

  state = {
    showAllSuggestions: this.props.showSuggestionsWhenValueIsSet,
    query: this.query(this.props.value),
    focus: false,
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.value !== this.props.value) {
  //     this.setState({query: nextProps.value})
  //   }
  // }

  source() {
    const { source:data } = this.props
    if (Array.isArray(data)) {
      return new Map(data.map(item => [item, item]))
    } else {
      alert ('It must be array')
    }
  }

  handleQueryChange = (value, event) => {
    const query = this.clearQuery ? '' : value
    this.clearQuery = false
    if (this.props.onChange) {
      this.props.onChange(value, event)
    }

    this.updateQuery(query, true)
    this.setState({ showAllSuggestions: query ? false : this.props.showSuggestionsWhenValueIsSet, active: null })
  }

  updateQuery = (query) => {
    this.setState({ query })
  }

  handleQueryFocus = (event) => {
    this.suggestionsNode.scrollTop = 0
    this.setState({ active: '', focus: true })
    if (this.props.onFocus) this.props.onFocus(event)
  }

  handleQueryKeyUp = (event) => {
    if (event.which === 27) ReactDOM.findDOMNode(this).querySelector('input').blur()
    if ([40, 38].indexOf(event.which) !== -1) {
      const suggestionsKeys = [...this.suggestions().keys()]
      let index = suggestionsKeys.indexOf(this.state.active) + (event.which === 40 ? +1 : -1)
      if (index < 0) index = suggestionsKeys.length - 1
      if (index >= suggestionsKeys.length) index = 0
      this.setState({ active: suggestionsKeys[index] })
    }
  }

  handleSuggestionHover = (event) => {
    this.setState({ active: event.target.id })
  }

  handleQueryKeyDown = (event) => {
    let target = this.state.active
    if (event.which === 13) {
      this.select(event, target)
    }
  }

  handleQueryBlur = (event) => {
    if (this.state.focus) this.setState({ focus: false })
    if (this.props.onBlur) this.props.onBlur(event, this.state.active)
  }

  handleMouseDown = (event) => {
    this.select(event)
  }

  select = (event, renderValue) => {
    const source = this.source()
    const newValue = renderValue === void 0 ? event.target.id : renderValue
    this.setState({ query: newValue })
    if (this.props.onChange) {
      this.props.onChange(newValue, event)
    }
  }

  query(key) {
    let queryValue = ''
    if (!this.props.multiple && key) {
      const sourceValue = this.source().get(`${key}`);
      queryValue = sourceValue || key;
    }
    return queryValue;
  }

  matches(value, query) {
    const { suggestionMatch } = this.props

    if (suggestionMatch === 'disabled') {
      return true
    } else if (suggestionMatch === 'start') {
      return value.startsWith(query)
    } else if (suggestionMatch === 'anywhere') {
      return value.includes(query)
    } else if (suggestionMatch === 'word') {
      const re = new RegExp(`\\b${query}`, 'g')
      return re.test(value)
    }else if(suggestionMatch === 'none'){
      return value
    }
    return false
  }

  suggestions() {
    const source = this.source()
    const query = this.state.query
    let suggest = new Map()
    if (this.state.query && !this.state.showAllSuggestions) {
      for (const [key, value] of source) {
        if (this.matches(value, query)) {
          suggest.set(key, value)
        }
      }
    } else {
      suggest = source
    }
    return suggest
  }

  renderSuggestions() {
    const suggestions = [...this.suggestions()].map(([key, value]) => {
    return (
      <li
        id={key}
        key={key}
        className={classnames('auto-complete-suggetions-item', {'active': this.state.active === key})}
        onMouseDown={this.handleMouseDown}
        onMouseOver={this.handleSuggestionHover}
      >
        {value}
      </li>
    )
  })

    return (
      <ul
        className={classnames('auto-complete-suggetions')}
        ref={(node) => { this.suggestionsNode = node }}
      >
        {suggestions}
      </ul>
    )
  }

  render() {
    const {
    rootClassName,
    error,
    label,
    hint,
    showSuggestionsWhenValueIsSet,
    suggestionMatch,
    source,
    ...other
    } = this.props

    return (
      <div className={classnames('auto-complete', {'focus': this.state.focus}, rootClassName)}>
        <Input
          {...other}
          ref={(node) => {this.inputNode = node}}
          autoComplete="off"
          error={error}
          label={label}
          hint={hint}
          value={this.state.query || this.props.value}  // 如果value改变需要传递value值
          onChange={this.handleQueryChange}
          onFocus={this.handleQueryFocus}
          onKeyDown={this.handleQueryKeyDown}
          onKeyUp={this.handleQueryKeyUp}
          onBlur={this.handleQueryBlur}
        />
        {this.renderSuggestions()}
      </div>
    )
  }
}

export default Autocomplete
