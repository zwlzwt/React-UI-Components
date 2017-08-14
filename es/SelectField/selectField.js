'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _input = require('../Input/input');

var _input2 = _interopRequireDefault(_input);

require('./selectField.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // created by @zhaoweilong
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


var SelectField = function (_Component) {
  _inherits(SelectField, _Component);

  function SelectField() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SelectField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SelectField.__proto__ || Object.getPrototypeOf(SelectField)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      active: false
    }, _this.targetIsDescendant = function (event, parent) {
      var node = event.target;

      while (node !== null) {
        if (node === parent) return true;
        node = node.parentNode;
      }
      return false;
    }, _this.handleBlur = function (event) {
      event.stopPropagation();
      _this.close();
      if (_this.props.onBlur) _this.props.onBlur(event);
    }, _this.open = function (event) {
      if (_this.state.active) return;
      if (_this.inputNode) _this.inputNode.blur();
      _this.setState({ active: true });
    }, _this.close = function () {
      if (_this.state.active) {
        _this.setState({ active: false });
      }
    }, _this.handleFocus = function (event) {
      event.stopPropagation();
      if (!_this.props.disabled) {
        _this.open(event);
      }
    }, _this.handleBlur = function (event) {
      event.stopPropagation();
      if (_this.state.active) _this.close();
      if (_this.props.onBlur) _this.props.onBlur(event);
    }, _this.handleSelect = function (item, event) {
      if (_this.props.onBlur) _this.props.onBlur(event);
      if (!_this.props.disabled && _this.props.onChange) {
        if (_this.props.name) event.target.name = _this.props.name;
        _this.props.onChange(item, event);
        _this.close();
      }
    }, _this.getSelectedItem = function () {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _this.props.source[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          if (item[_this.props.valueKey] === _this.props.value) return item;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return _this.props.source[0];
    }, _this.renderItem = function (item, key) {
      var valueKey = _this.props.valueKey;

      return _react2.default.createElement(
        'li',
        {
          key: key,
          className: (0, _classnames2.default)('options-item', { selected: _this.props.value === item[valueKey] }, { disabled: item.disabled }),
          onClick: !item.disabled && _this.handleSelect.bind(_this, item[valueKey])
        },
        item[valueKey]
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SelectField, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      document.addEventListener('click', function (e) {
        if (_this2.state.active && !_this2.targetIsDescendant(e, _reactDom2.default.findDOMNode(_this2))) {
          _this2.setState({ active: false });
        }
      }, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this3 = this;

      document.removeEventListener('click', function (e) {
        if (_this3.state.active && !_this3.targetIsDescendant(e, _reactDom2.default.findDOMNode(_this3))) {
          _this3.setState({ active: false });
        }
      }, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          source = _props.source,
          rootClassName = _props.rootClassName,
          onFocus = _props.onFocus,
          onBlur = _props.onBlur,
          required = _props.required,
          valueKey = _props.valueKey,
          disabled = _props.disabled,
          others = _objectWithoutProperties(_props, ['source', 'rootClassName', 'onFocus', 'onBlur', 'required', 'valueKey', 'disabled']);

      var selected = this.getSelectedItem();

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('select-field', { active: this.state.active }, rootClassName),
          onBlur: this.handleBlur,
          onFocus: this.handleFocus
        },
        _react2.default.createElement(_input2.default, _extends({}, others, {
          ref: function ref(node) {
            _this4.inputNode = node;
          },
          readOnly: true,
          disabled: disabled,
          required: required,
          rootClassName: 'selectInput',
          barStyle: 'disappear',
          value: selected && selected[valueKey] ? selected[valueKey] : ''
        })),
        _react2.default.createElement(
          'svg',
          { viewBox: '0 0 24 24', className: 'select-arrow' },
          _react2.default.createElement('path', { d: 'M7 10l5 5 5-5z' })
        ),
        _react2.default.createElement(
          'ul',
          { className: 'options' },
          source.map(this.renderItem)
        )
      );
    }
  }]);

  return SelectField;
}(_react.Component);

SelectField.propTypes = {
  valueKey: _propTypes2.default.string,
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  required: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool
};
SelectField.defaultProps = {
  valueKey: 'value',
  disabled: false
};
exports.default = SelectField;