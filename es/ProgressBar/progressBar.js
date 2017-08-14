'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./progressBar.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProgressBar = function (_Component) {
  _inherits(ProgressBar, _Component);

  function ProgressBar() {
    _classCallCheck(this, ProgressBar);

    return _possibleConstructorReturn(this, (ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).apply(this, arguments));
  }

  _createClass(ProgressBar, [{
    key: 'calculateRatio',
    value: function calculateRatio(value) {
      return value / 100;
    }
  }, {
    key: 'circularStyle',
    value: function circularStyle() {
      return this.props.mode !== 'indeterminate' ? { strokeDasharray: 2 * Math.PI * 25 * this.calculateRatio(this.props.percent) + ', 400' } : undefined;
    }
  }, {
    key: 'linearStyle',
    value: function linearStyle() {
      return { transform: 'scaleX(' + this.calculateRatio(this.props.percent) + ')' };
    }
  }, {
    key: 'renderCircular',
    value: function renderCircular() {
      return _react2.default.createElement(
        'svg',
        { className: 'progress-circular', viewBox: '0 0 60 60' },
        _react2.default.createElement('circle', { className: 'progress-circular-inner', style: this.circularStyle(), cx: '30', cy: '30', r: '25' })
      );
    }
  }, {
    key: 'renderLinear',
    value: function renderLinear() {
      var styleLinear = this.linearStyle();
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('span', { className: 'progress-linear', style: styleLinear })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          rootClassName = _props.rootClassName,
          percent = _props.percent,
          type = _props.type,
          showInfo = _props.showInfo,
          infoUnit = _props.infoUnit,
          infoClass = _props.infoClass,
          mode = _props.mode;

      var className = (0, _classnames2.default)({
        linear: type === 'linear',
        circular: type === 'circular',
        indeterminate: mode === 'indeterminate'
      }, rootClassName);

      var percentNum = Number.parseInt(percent, 10);

      return _react2.default.createElement(
        'div',
        {
          className: className
        },
        type === 'circular' ? this.renderCircular() : this.renderLinear(),
        showInfo && type === 'circular' ? _react2.default.createElement(
          'span',
          { className: (0, _classnames2.default)('percent-num', infoClass) },
          '' + percentNum + infoUnit
        ) : null
      );
    }
  }]);

  return ProgressBar;
}(_react.Component);

ProgressBar.propTypes = {
  rootClassName: _propTypes2.default.string,
  infoClass: _propTypes2.default.string,
  percent: _propTypes2.default.number,
  multicolor: _propTypes2.default.bool,
  mode: _propTypes2.default.oneOf(['determinate', 'indeterminate']),
  type: _propTypes2.default.oneOf(['linear', 'circular']),
  showInfo: _propTypes2.default.bool,
  infoUnit: _propTypes2.default.string
};
ProgressBar.defaultProps = {
  rootClassName: '',
  infoClass: '',
  percent: 0,
  type: 'linear',
  mode: 'determinate',
  showInfo: true,
  infoUnit: '%'
};
exports.default = ProgressBar;