'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./stepConnector.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StepConnector = function StepConnector(props) {
  var orientation = props.orientation;

  var wrapperClass = (0, _classnames2.default)('line-wrapper', { horizontal: orientation === 'horizontal' ? true : false, vertical: orientation === 'vertical' ? true : false });
  var lineClass = (0, _classnames2.default)('line-style', { horizontal: orientation === 'horizontal' ? true : false, vertical: orientation === 'vertical' ? true : false });

  return _react2.default.createElement(
    'div',
    { className: wrapperClass },
    _react2.default.createElement('span', { className: lineClass })
  );
};

StepConnector.propTypes = {
  orientation: _propTypes2.default.oneOf(['horizontal', 'vertical'])
};

exports.default = StepConnector;