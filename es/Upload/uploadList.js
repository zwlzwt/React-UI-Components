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

var _progressBar = require('../ProgressBar/progressBar.js');

var _progressBar2 = _interopRequireDefault(_progressBar);

var _FileIcon = require('./FileIcon');

var _FileIcon2 = _interopRequireDefault(_FileIcon);

var _Close = require('./Close');

var _Close2 = _interopRequireDefault(_Close);

var _Delete = require('./Delete');

var _Delete2 = _interopRequireDefault(_Delete);

var _Preview = require('./Preview');

var _Preview2 = _interopRequireDefault(_Preview);

require('./uploadList.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // created by @zhaoweilong


var previewFile = function previewFile(file, callback) {
  var reader = new FileReader();
  reader.onloadend = function () {
    return callback(reader.result);
  };
  reader.readAsDataURL(file);
};

var UploadList = function (_Component) {
  _inherits(UploadList, _Component);

  function UploadList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, UploadList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UploadList.__proto__ || Object.getPrototypeOf(UploadList)).call.apply(_ref, [this].concat(args))), _this), _this.handleClose = function (file) {
      var onRemove = _this.props.onRemove;
      if (onRemove) {
        onRemove(file);
      }
    }, _this.handlePreview = function (file, e) {
      var onPreview = _this.props.onPreview;

      if (!onPreview) {
        return;
      }
      e.preventDefault();
      return onPreview(file);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(UploadList, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.listType !== 'picture-card') {
        return;
      }

      (this.props.items || []).forEach(function (file) {
        if (file.thumbUrl !== undefined) {
          return;
        }
        previewFile(file, function (previewDataUrl) {
          file.thumbUrl = previewDataUrl;
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          items = _props.items,
          listType = _props.listType;


      var showList = items.map(function (file, index) {
        var progress = void 0;
        var icon = _react2.default.createElement(_FileIcon2.default, { className: 'file-icon' });

        if (listType === 'picture-card') {
          if (file.status === 'uploading' || !file.thumbUrl && !file.url) {
            icon = _react2.default.createElement(
              'div',
              { className: '' },
              'Upload...'
            );
          } else {
            icon = _react2.default.createElement(
              'a',
              {
                className: 'img-block',
                onClick: function onClick(e) {
                  return _this2.handlePreview(file, e);
                },
                href: file.url || file.thumbUrl,
                target: '_blank'
              },
              _react2.default.createElement('img', { src: file.thumbUrl || file.url, alt: file.name, className: 'img' })
            );
          }
        }

        if (file.status === 'uploading') {
          progress = _react2.default.createElement(
            'div',
            null,
            'percent' in file ? _react2.default.createElement(_progressBar2.default, { rootClassName: 'bar-pro', percent: file.percent }) : null
          );
        }

        var preview = file.url ? _react2.default.createElement(
          'a',
          {
            href: file.url,
            target: '_blank',
            className: '',
            onClick: function onClick(e) {
              return _this2.handlePreview(file, e);
            },
            title: file.name
          },
          file.name
        ) : _react2.default.createElement(
          'span',
          {
            className: 'file-name',
            onClick: function onClick(e) {
              return _this2.handlePreview(file, e);
            },
            title: file.name
          },
          file.name
        );

        var removeIcon = _react2.default.createElement(_Close2.default, { title: 'delete file', onClick: function onClick() {
            return _this2.handleClose(file);
          }, className: (0, _classnames2.default)('close-icon', { delete: listType === 'picture-card' }) });

        var previewIcon = _react2.default.createElement(
          'a',
          {
            href: file.url || file.thumbUrl,
            target: '_blank',
            onClick: function onClick(e) {
              return _this2.handlePreview(file, e);
            }
          },
          _react2.default.createElement(_Preview2.default, { className: 'preview-icon' })
        );

        var message = file.response || file.error && file.error.statusText || 'upload error';
        var iconAndPreview = file.status === 'error' ? console.log(message) : _react2.default.createElement(
          'span',
          { className: '' },
          icon,
          listType !== 'picture-card' ? preview : null
        );

        return _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)('upload-list', { card: listType === 'picture-card' }), key: file.uid || index },
          _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)('upload-item', { item: listType === 'picture-card' }) },
            iconAndPreview
          ),
          removeIcon,
          progress
        );
      });

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('upload-list-wrap', { picture: listType === 'picture-card' }) },
        showList
      );
    }
  }]);

  return UploadList;
}(_react.Component);

UploadList.propTypes = {
  listType: _propTypes2.default.oneOf(['text', 'picture-card']),
  item: _propTypes2.default.array
};
UploadList.defaultProps = {
  items: []
};
exports.default = UploadList;