'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _input = require('../Input/input');

var _input2 = _interopRequireDefault(_input);

require('./autoComplete.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // created by @zhaoweilong
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

var Autocomplete = function (_Component) {
  _inherits(Autocomplete, _Component);

  function Autocomplete() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Autocomplete);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      showAllSuggestions: _this.props.showSuggestionsWhenValueIsSet,
      query: _this.query(_this.props.value),
      focus: false
    }, _this.handleQueryChange = function (value, event) {
      var query = _this.clearQuery ? '' : value;
      _this.clearQuery = false;
      if (_this.props.onChange) {
        _this.props.onChange(value, event);
      }

      _this.updateQuery(query, true);
      _this.setState({ showAllSuggestions: query ? false : _this.props.showSuggestionsWhenValueIsSet, active: null });
    }, _this.updateQuery = function (query) {
      _this.setState({ query: query });
    }, _this.handleQueryFocus = function (event) {
      _this.suggestionsNode.scrollTop = 0;
      _this.setState({ active: '', focus: true });
      if (_this.props.onFocus) _this.props.onFocus(event);
    }, _this.handleQueryKeyUp = function (event) {
      if (event.which === 27) _reactDom2.default.findDOMNode(_this).querySelector('input').blur();
      if ([40, 38].indexOf(event.which) !== -1) {
        var suggestionsKeys = [].concat(_toConsumableArray(_this.suggestions().keys()));
        var index = suggestionsKeys.indexOf(_this.state.active) + (event.which === 40 ? +1 : -1);
        if (index < 0) index = suggestionsKeys.length - 1;
        if (index >= suggestionsKeys.length) index = 0;
        _this.setState({ active: suggestionsKeys[index] });
      }
    }, _this.handleSuggestionHover = function (event) {
      _this.setState({ active: event.target.id });
    }, _this.handleQueryKeyDown = function (event) {
      var target = _this.state.active;
      if (event.which === 13) {
        _this.select(event, target);
      }
    }, _this.handleQueryBlur = function (event) {
      if (_this.state.focus) _this.setState({ focus: false });
      if (_this.props.onBlur) _this.props.onBlur(event, _this.state.active);
    }, _this.handleMouseDown = function (event) {
      _this.select(event);
    }, _this.select = function (event, renderValue) {
      var source = _this.source();
      var newValue = renderValue === void 0 ? event.target.id : renderValue;
      _this.setState({ query: newValue });
      if (_this.props.onChange) {
        _this.props.onChange(newValue, event);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Autocomplete, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        this.setState({ query: nextProps.value });
      }
    }
  }, {
    key: 'source',
    value: function source() {
      var data = this.props.source;

      if (Array.isArray(data)) {
        return new Map(data.map(function (item) {
          return [item, item];
        }));
      } else {
        alert('It must be array');
      }
    }
  }, {
    key: 'query',
    value: function query(key) {
      var queryValue = '';
      if (!this.props.multiple && key) {
        var sourceValue = this.source().get('' + key);
        queryValue = sourceValue || key;
      }
      return queryValue;
    }
  }, {
    key: 'matches',
    value: function matches(value, query) {
      var suggestionMatch = this.props.suggestionMatch;


      if (suggestionMatch === 'disabled') {
        return true;
      } else if (suggestionMatch === 'start') {
        return value.startsWith(query);
      } else if (suggestionMatch === 'anywhere') {
        return value.includes(query);
      } else if (suggestionMatch === 'word') {
        var re = new RegExp('\\b' + query, 'g');
        return re.test(value);
      } else if (suggestionMatch === 'none') {
        return value;
      }
      return false;
    }
  }, {
    key: 'suggestions',
    value: function suggestions() {
      var source = this.source();
      var query = this.state.query;
      var suggest = new Map();
      if (this.state.query && !this.state.showAllSuggestions) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = source[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                key = _step$value[0],
                value = _step$value[1];

            if (this.matches(value, query)) {
              suggest.set(key, value);
            }
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
      } else {
        suggest = source;
      }
      return suggest;
    }
  }, {
    key: 'renderSuggestions',
    value: function renderSuggestions() {
      var _this2 = this;

      var suggestions = [].concat(_toConsumableArray(this.suggestions())).map(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            key = _ref3[0],
            value = _ref3[1];

        return _react2.default.createElement(
          'li',
          {
            id: key,
            key: key,
            className: (0, _classnames2.default)('auto-complete-suggetions-item', { 'active': _this2.state.active === key }),
            onMouseDown: _this2.handleMouseDown,
            onMouseOver: _this2.handleSuggestionHover
          },
          value
        );
      });

      return _react2.default.createElement(
        'ul',
        {
          className: (0, _classnames2.default)('auto-complete-suggetions'),
          ref: function ref(node) {
            _this2.suggestionsNode = node;
          }
        },
        suggestions
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          rootClassName = _props.rootClassName,
          error = _props.error,
          label = _props.label,
          hint = _props.hint,
          showSuggestionsWhenValueIsSet = _props.showSuggestionsWhenValueIsSet,
          suggestionMatch = _props.suggestionMatch,
          source = _props.source,
          other = _objectWithoutProperties(_props, ['rootClassName', 'error', 'label', 'hint', 'showSuggestionsWhenValueIsSet', 'suggestionMatch', 'source']);

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('auto-complete', { 'focus': this.state.focus }, rootClassName) },
        _react2.default.createElement(_input2.default, _extends({}, other, {
          ref: function ref(node) {
            _this3.inputNode = node;
          },
          autoComplete: 'off',
          error: error,
          label: label,
          hint: hint,
          value: this.state.query || this.props.value // 如果value改变需要传递value值
          , onChange: this.handleQueryChange,
          onFocus: this.handleQueryFocus,
          onKeyDown: this.handleQueryKeyDown,
          onKeyUp: this.handleQueryKeyUp,
          onBlur: this.handleQueryBlur
        })),
        this.renderSuggestions()
      );
    }
  }]);

  return Autocomplete;
}(_react.Component);

Autocomplete.propTypes = {
  error: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  source: _propTypes2.default.any,
  onFocus: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  showSuggestionsWhenValueIsSet: _propTypes2.default.bool,
  query: _propTypes2.default.string,
  suggestionMatch: _propTypes2.default.oneOf(['disabled', 'start', 'anywhere', 'word', 'none'])
};
Autocomplete.defaultProps = {
  source: {},
  showSuggestionsWhenValueIsSet: false,
  suggestionMatch: 'start',
  value: ''
};
exports.default = Autocomplete;