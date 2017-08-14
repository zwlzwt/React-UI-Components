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

var _tabContent = require('./tabContent');

var _tabContent2 = _interopRequireDefault(_tabContent);

require('./tabs.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // created by @zhaoweilong
//         Name                Type                Default          Description
// @param  rootClassName       String              ''               根组建样式添加(以class的形式在css中添加)
// @param  index               Number              0                现在tab的位置
// @param  hidden              Boolean             false            隐藏掉这个tab
// @param  onChange            Function                             当tab变化时候的callback默认参数是(index)

var Tabs = function (_Component) {
  _inherits(Tabs, _Component);

  function Tabs() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Tabs);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      pointer: {}
    }, _this.handleResize = function () {
      if (_this.resizeTimeout) clearTimeout(_this.resizeTimeout);
      _this.resizeTimeout = setTimeout(function () {
        _this.updatePointer(_this.props.index);
      }, 100);
    }, _this.updatePointer = function (idx) {
      if (_this.navigationNode && _this.navigationNode.children[idx]) {
        requestAnimationFrame(function () {
          var nav = _this.navigationNode.getBoundingClientRect();
          var label = _this.navigationNode.children[idx].getBoundingClientRect();
          var scrollLeft = _this.navigationNode.scrollLeft;
          _this.setState({
            pointer: {
              top: nav.height + 'px',
              left: label.left + scrollLeft - nav.left + 'px',
              width: label.width + 'px'
            }
          });
        });
      }
    }, _this.handleHeaderClick = function (idx) {
      if (_this.props.onChange) {
        _this.props.onChange(idx);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Tabs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
      clearTimeout(this.resizeTimeout);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props = this.props,
          index = _props.index,
          children = _props.children;
      var prevIndex = prevProps.index,
          prevChildren = prevProps.children;


      if (index !== prevIndex || children !== prevChildren) {
        this.updatePointer(index);
      }
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var headers = [];
      var contents = [];

      _react2.default.Children.forEach(this.props.children, function (item) {
        headers.push(item);
        if (item.props.children) {
          contents.push(_react2.default.createElement(
            _tabContent2.default,
            null,
            item.props.children
          ));
        }
      });

      return { headers: headers, contents: contents };
    }
  }, {
    key: 'renderHeaders',
    value: function renderHeaders(headers) {
      var _this2 = this;

      return headers.map(function (ele, idx) {
        return _react2.default.cloneElement(ele, {
          children: null,
          key: idx,
          active: _this2.props.index === idx,
          index: idx,
          onClick: function onClick(event, index) {
            _this2.handleHeaderClick(index);
            if (ele.props.onClick) {
              ele.props.onClick(event);
            }
          }
        });
      });
    }
  }, {
    key: 'renderContents',
    value: function renderContents(contents) {
      var _this3 = this;

      var contentElements = contents.map(function (ele, idx) {
        return _react2.default.cloneElement(ele, {
          key: idx,
          active: _this3.props.index === idx,
          tabIndex: idx
        });
      });

      return contentElements.filter(function (ele, idx) {
        return idx === _this3.props.index;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var rootClassName = this.props.rootClassName;

      var _renderChildren = this.renderChildren(),
          headers = _renderChildren.headers,
          contents = _renderChildren.contents;

      var classname = (0, _classnames2.default)('tabs', rootClassName);

      return _react2.default.createElement(
        'div',
        { className: classname },
        _react2.default.createElement(
          'div',
          { className: 'navigationContainer' },
          _react2.default.createElement(
            'nav',
            { className: 'tabs-navigation', ref: function ref(node) {
                _this4.navigationNode = node;
              } },
            this.renderHeaders(headers),
            _react2.default.createElement('span', { className: 'tab-bar', style: this.state.pointer })
          )
        ),
        this.renderContents(contents)
      );
    }
  }]);

  return Tabs;
}(_react.Component);

Tabs.propTypes = {
  children: _propTypes2.default.node,
  onChange: _propTypes2.default.func,
  index: _propTypes2.default.number
};
Tabs.defaultProps = {
  index: 0
};
exports.default = Tabs;