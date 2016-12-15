"use strict";

exports.__esModule = true;

var _scoreMap;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _reactMotion = require("react-motion");

var _finalize_selection = require("../components/finalize_selection");

var _finalize_selection2 = _interopRequireDefault(_finalize_selection);

var _actions = require("../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var scoreMap = (_scoreMap = {}, _scoreMap[_actions.LIKE] = 1, _scoreMap[_actions.DISLIKE] = -1, _scoreMap[_actions.LOVE] = 2, _scoreMap);

var ConfigureFinalize = function (_Component) {
  _inherits(ConfigureFinalize, _Component);

  function ConfigureFinalize() {
    _classCallCheck(this, ConfigureFinalize);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.handleChange = _this.handleChange.bind(_this);
    _this.getDefaultStyles = _this.getDefaultStyles.bind(_this);
    _this.getStyles = _this.getStyles.bind(_this);
    _this.assignScoreToImages = _this.assignScoreToImages.bind(_this);
    _this.updateFilter = _this.updateFilter.bind(_this);
    _this.getQualifiedImages = _this.getQualifiedImages.bind(_this);
    _this.qualifyImage = _this.qualifyImage.bind(_this);
    _this.unqualifyImage = _this.unqualifyImage.bind(_this);
    _this.handleModeChange = _this.handleModeChange.bind(_this);

    _this.state = {
      value: '',
      filter: _actions.QUALIFIED,
      previewMode: 'thumbnail'
    };
    return _this;
  }

  ConfigureFinalize.prototype.componentWillMount = function componentWillMount() {
    this.assignScoreToImages();
    this.setState({ qualifiedCount: this.getQualifiedImages().length });
  };

  ConfigureFinalize.prototype.handleChange = function handleChange(_ref) {
    var value = _ref.target.value;

    this.setState({ value: value });
  };

  ConfigureFinalize.prototype.handleModeChange = function handleModeChange(mode) {
    this.setState({ previewMode: mode });
  };

  // actual animation-related logic


  ConfigureFinalize.prototype.getDefaultStyles = function getDefaultStyles() {
    var _props = this.props,
        images = _props.images,
        imageIdList = _props.imageIdList,
        albums = _props.albums;


    return imageIdList.map(function (imageId) {
      return {
        data: Object.assign({}, images[imageId], { imageId: imageId, albumName: albums[images[imageId]] }),
        key: imageId,
        style: { height: 0, opacity: 1 }
      };
    });
  };

  ConfigureFinalize.prototype.getStyles = function getStyles() {
    var _this2 = this;

    var _props2 = this.props,
        images = _props2.images,
        imageIdList = _props2.imageIdList,
        albums = _props2.albums;
    var _state = this.state,
        value = _state.value,
        filter = _state.filter,
        previewMode = _state.previewMode;


    return imageIdList.filter(function (imageId) {
      var _images$imageId = images[imageId],
          score = _images$imageId.score,
          force_qualify = _images$imageId.force_qualify;

      return _this2.isQualifyingImage(filter, score, force_qualify);
    }).map(function (imageId, i) {
      var image = images[imageId];
      var albumName = albums[image.album_id].name;
      return {
        data: Object.assign({}, image, { filter: filter, imageId: imageId, albumName: albumName }),
        key: imageId,
        style: {
          height: (0, _reactMotion.spring)(previewMode === 'thumbnail' ? 95 : 40, _reactMotion.presets.gentle),
          opacity: (0, _reactMotion.spring)(1, _reactMotion.presets.gentle)
        }
      };
    });
  };

  ConfigureFinalize.prototype.willEnter = function willEnter() {
    return {
      height: 0,
      opacity: 1,
      backgroundColor: '#fff'
    };
  };

  ConfigureFinalize.prototype.willLeave = function willLeave() {
    return {
      height: (0, _reactMotion.spring)(0),
      opacity: (0, _reactMotion.spring)(0)
    };
  };

  ConfigureFinalize.prototype.isQualifyingImage = function isQualifyingImage(filter, score) {
    var forceQualified = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var reaction = forceQualified.reaction;


    switch (filter) {
      case _actions.ALL:
        return true;
      case _actions.QUALIFIED:
        return reaction === _actions.QUALIFIED || reaction !== _actions.UNQUALIFIED && score > 0;
      case _actions.UNQUALIFIED:
        return reaction === _actions.UNQUALIFIED || reaction !== _actions.QUALIFIED && (!score || score < 1);
    }

    return true;
  };

  ConfigureFinalize.prototype.getQualifiedImages = function getQualifiedImages() {
    var _this3 = this;

    var _props3 = this.props,
        images = _props3.images,
        imageIdList = _props3.imageIdList;


    return imageIdList.filter(function (imageId) {
      var image = images[imageId];
      var filename = image.filename,
          score = image.score,
          force_qualify = image.force_qualify;

      var qualified = _this3.isQualifyingImage(_actions.QUALIFIED, score, force_qualify);
      image.qualified = qualified;
      return qualified;
    });
  };

  ConfigureFinalize.prototype.assignScoreToImages = function assignScoreToImages() {
    var _props4 = this.props,
        images = _props4.images,
        imageIdList = _props4.imageIdList,
        updateScoreInStore = _props4.updateScoreInStore;

    var scores = {};

    imageIdList.forEach(function (imageId) {
      var image = images[imageId];
      var score = image.score,
          liked = image.liked,
          album_id = image.album_id;

      var tempScore = 0;

      if (!image.liked) {
        return;
      }

      image.liked.forEach(function (like) {
        tempScore += scoreMap[+like.reaction_type];
      });

      if (score !== tempScore) {
        scores[imageId] = { score: tempScore, album_id: album_id };
      }
    });

    if (Object.keys(scores)) {
      updateScoreInStore(scores);
    }
  };

  ConfigureFinalize.prototype.updateFilter = function updateFilter(filter) {
    this.setState({ filter: filter });
  };

  ConfigureFinalize.prototype.qualifyImage = function qualifyImage(imageId, albumId) {
    var _props5 = this.props,
        updateImageQualificationInStore = _props5.updateImageQualificationInStore,
        order_id = _props5.order_id;

    updateImageQualificationInStore(imageId, albumId, _actions.QUALIFIED);
    (0, _actions.updateQualification)({ image_id: imageId, order_id: order_id, reaction: _actions.QUALIFIED }, function (_ref2) {
      var res = _ref2.res,
          err = _ref2.err;

      if (err) {
        updateImageQualificationInStore(imageId, albumId, _actions.UNQUALIFIED);
        console.log(err);
      }
    });
  };

  ConfigureFinalize.prototype.unqualifyImage = function unqualifyImage(imageId, albumId) {
    var _props6 = this.props,
        updateImageQualificationInStore = _props6.updateImageQualificationInStore,
        order_id = _props6.order_id;

    updateImageQualificationInStore(imageId, albumId, _actions.UNQUALIFIED);
    (0, _actions.updateQualification)({ image_id: imageId, order_id: order_id, reaction: _actions.UNQUALIFIED }, function (_ref3) {
      var res = _ref3.res,
          err = _ref3.err;

      if (err) {
        updateImageQualificationInStore(imageId, albumId, _actions.QUALIFIED);
        console.log(err);
      }
    });
  };

  ConfigureFinalize.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState({ qualifiedCount: this.getQualifiedImages().length });
  };

  ConfigureFinalize.prototype.render = function render() {
    var _props7 = this.props,
        imageIdList = _props7.imageIdList,
        pathname = _props7.pathname;


    return _react2.default.createElement(_finalize_selection2.default, {
      handleChange: this.handleChange,
      willEnter: this.willEnter,
      willLeave: this.willLeave,
      getStyles: this.getStyles,
      getDefaultStyles: this.getDefaultStyles,
      value: this.state.value,
      updateFilter: this.updateFilter,
      qualifiedCount: this.state.qualifiedCount,
      totalCount: imageIdList.length,
      qualifyImage: this.qualifyImage,
      unqualifyImage: this.unqualifyImage,
      filter: this.state.filter,
      handleModeChange: this.handleModeChange,
      viewMode: this.state.previewMode,
      pathname: pathname
    });
  };

  return ConfigureFinalize;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store) {
  var images = store.images,
      albums = store.albums;

  var imageIdList = [];

  for (var albumId in albums) {
    imageIdList = imageIdList.concat(albums[albumId].files);
  }

  return {
    order_id: store.order.id,
    imageIdList: imageIdList,
    images: images,
    albums: albums
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateScoreInStore: function updateScoreInStore(scores) {
      dispatch((0, _actions.updateScore)(scores));
    },

    updateImageQualificationInStore: function updateImageQualificationInStore(imageId, albumId, qualify) {
      dispatch((0, _actions.updateImageQualification)(imageId, albumId, qualify));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ConfigureFinalize);
//# sourceMappingURL=finalize_selection.js.map