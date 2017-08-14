'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // created by @zhaoweilong
//         Name                             Type                Default          Description
// @param  rootClassName                    String              ''               根组建样式添加(以class的形式在css中添加)
// @param  name                             String                               给选择框name值
// @param  value                            Any                                  默认的radio的value值
// @param  onChange                         Function                             当value变化时候的callback 默认参数是radio的value

var RadioGroup = function (_Component) {
  _inherits(RadioGroup, _Component);

  function RadioGroup() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RadioGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (value) {
      if (_this.props.onChange) _this.props.onChange(value);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RadioGroup, [{
    key: 'renderRadioButtons',
    value: function renderRadioButtons() {
      var _this2 = this;

      return _react2.default.Children.map(this.props.children, function (child) {
        return _react2.default.cloneElement(child, {
          checked: child.props.value === _this2.props.value,
          disabled: _this2.props.disabled || child.props.disabled,
          onChange: _this2.handleChange.bind(_this2, child.props.value)
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.props.rootClassName },
        this.renderRadioButtons()
      );
    }
  }]);

  return RadioGroup;
}(_react.Component);

RadioGroup.propTypes = {
  children: _propTypes2.default.node,
  rootClassName: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  onChange: _propTypes2.default.func,
  value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
};
RadioGroup.defaultProps = {
  rootClassName: '',
  disabled: false
};
exports.default = RadioGroup;