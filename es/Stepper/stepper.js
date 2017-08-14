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

var _stepConnector = require('./stepConnector');

var _stepConnector2 = _interopRequireDefault(_stepConnector);

require('./stepper.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // created by @zhaoweilong
//         Name                             Type                        Default          Description
// @param  rootClassName                    String                      ''               根组建样式添加(以class的形式在css中添加)
// @param  children                         node                                         必须是多个step组建 ex:<step/>
// @param  activeStep                       number                                       设置步骤数的index 初始数是0
// @param  connector                        node                                         步骤之间的连接线可以自定义
// @param  orientation                      'horizontal' || 'vertical'   'horizontal'    步骤纵向排版还是竖向排版

var Stepper = function (_Component) {
  _inherits(Stepper, _Component);

  function Stepper() {
    _classCallCheck(this, Stepper);

    return _possibleConstructorReturn(this, (Stepper.__proto__ || Object.getPrototypeOf(Stepper)).apply(this, arguments));
  }

  _createClass(Stepper, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          rootClassName = _props.rootClassName,
          activeStep = _props.activeStep,
          children = _props.children,
          connector = _props.connector,
          orientation = _props.orientation;


      var numChildren = _react2.default.Children.count(children);
      var steps = _react2.default.Children.map(children, function (step, index) {
        var controlProps = { index: index };

        controlProps.orientation = _this2.props.orientation;

        if (activeStep === index) {
          controlProps.active = true;
        } else if (activeStep > index) {
          controlProps.completed = true;
        } else if (activeStep < index) {
          controlProps.disabled = true;
        }

        if (index + 1 === numChildren) {
          controlProps.last = true;
        }

        return [index > 0 && _react2.default.cloneElement(connector, { orientation: orientation }), _react2.default.cloneElement(step, Object.assign(controlProps, step.props))];
      });

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('stepper-root', { horizontal: orientation === 'horizontal' ? true : false, vertical: orientation === 'vertical' ? true : false }, rootClassName) },
        steps
      );
    }
  }]);

  return Stepper;
}(_react.Component);

Stepper.propTypes = {
  rootClassName: _propTypes2.default.string,
  activeStep: _propTypes2.default.number,
  children: _propTypes2.default.arrayOf(_propTypes2.default.node),
  connector: _propTypes2.default.node,
  orientation: _propTypes2.default.oneOf(['horizontal', 'vertical'])
};
Stepper.defaultProps = {
  connector: _react2.default.createElement(_stepConnector2.default, null),
  orientation: 'horizontal'
};
exports.default = Stepper;