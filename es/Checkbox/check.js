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

require('./check.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Check = function Check(props) {
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)('fake-input', { checked: props.checked, disabled: props.disabled })
    },
    props.children
  );
};

Check.propTypes = {
  checked: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  children: _propTypes2.default.node
};

exports.default = Check;