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

var FinalizeSelection = function (_Component) {
  _inherits(FinalizeSelection, _Component);

  function FinalizeSelection() {
    _classCallCheck(this, FinalizeSelection);

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

  FinalizeSelection.prototype.componentWillMount = function componentWillMount() {
    this.assignScoreToImages();
    this.setState({ qualifiedCount: this.getQualifiedImages().length });
  };

  FinalizeSelection.prototype.handleChange = function handleChange(_ref) {
    var value = _ref.target.value;

    this.setState({ value: value });
  };

  FinalizeSelection.prototype.handleModeChange = function handleModeChange(mode) {
    this.setState({ previewMode: mode });
  };

  // actual animation-related logic


  FinalizeSelection.prototype.getDefaultStyles = function getDefaultStyles() {
    var images = this.props.images;

    return images.map(function (image) {
      return { data: image, key: image.id, style: { height: 0, opacity: 1 } };
    });
  };

  FinalizeSelection.prototype.isQualifyingImage = function isQualifyingImage(filter, score) {
    var forceQualified = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var reaction_type = forceQualified.reaction_type;


    switch (filter) {
      case _actions.ALL:
        return true;
      case _actions.QUALIFIED:
        return reaction_type === _actions.QUALIFIED || reaction_type !== _actions.UNQUALIFIED && score > 0;
      case _actions.UNQUALIFIED:
        return reaction_type === _actions.UNQUALIFIED || reaction_type !== _actions.QUALIFIED && !score;
    }

    return true;
  };

  FinalizeSelection.prototype.getQualifiedImages = function getQualifiedImages() {
    var _this2 = this;

    var images = this.props.images;


    return images.filter(function (image) {
      var filename = image.filename,
          score = image.score,
          forceQualify = image.forceQualify;

      var qualified = _this2.isQualifyingImage(_actions.QUALIFIED, score, forceQualify);
      image.qualified = qualified;
      return qualified;
    });
  };

  FinalizeSelection.prototype.getStyles = function getStyles() {
    var _this3 = this;

    var images = this.props.images;
    var _state = this.state,
        value = _state.value,
        filter = _state.filter,
        previewMode = _state.previewMode;

    var filteredImages = images.filter(function (_ref2) {
      var filename = _ref2.filename,
          score = _ref2.score,
          forceQualify = _ref2.forceQualify;

      return _this3.isQualifyingImage(filter, score, forceQualify);
    });

    return filteredImages.map(function (image, i) {
      return {
        data: Object.assign({}, image, { filter: filter }),
        key: image.id,
        style: {
          height: (0, _reactMotion.spring)(previewMode === 'thumbnail' ? 95 : 40, _reactMotion.presets.gentle),
          opacity: (0, _reactMotion.spring)(1, _reactMotion.presets.gentle)
        }
      };
    });
  };

  FinalizeSelection.prototype.willEnter = function willEnter() {
    return {
      height: 0,
      opacity: 1,
      backgroundColor: '#fff'
    };
  };

  FinalizeSelection.prototype.willLeave = function willLeave() {
    return {
      height: (0, _reactMotion.spring)(0),
      opacity: (0, _reactMotion.spring)(0)
    };
  };

  FinalizeSelection.prototype.assignScoreToImages = function assignScoreToImages() {
    var _props = this.props,
        images = _props.images,
        updateScoreInStore = _props.updateScoreInStore;

    var scores = {};

    images.forEach(function (image) {
      var id = image.id,
          score = image.score,
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
        scores[image.id] = { score: tempScore, album_id: album_id };
      }
    });

    if (Object.keys(scores)) {
      updateScoreInStore(scores);
    }
  };

  FinalizeSelection.prototype.updateFilter = function updateFilter(filter) {
    this.setState({ filter: filter });
  };

  FinalizeSelection.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
    this.setState({ qualifiedCount: this.getQualifiedImages().length });
  };

  FinalizeSelection.prototype.qualifyImage = function qualifyImage(imageId, albumId) {
    var _props2 = this.props,
        updateImageQualificationInStore = _props2.updateImageQualificationInStore,
        order_id = _props2.order_id;

    updateImageQualificationInStore(imageId, albumId, _actions.QUALIFIED);
    (0, _actions.updateQualification)({ image_id: imageId, order_id: order_id, reaction: _actions.QUALIFIED }, function (_ref3) {
      var res = _ref3.res,
          err = _ref3.err;
      return console.log(res);
    });
  };

  FinalizeSelection.prototype.unqualifyImage = function unqualifyImage(imageId, albumId) {
    var _props3 = this.props,
        updateImageQualificationInStore = _props3.updateImageQualificationInStore,
        order_id = _props3.order_id;

    updateImageQualificationInStore(imageId, albumId, _actions.UNQUALIFIED);
    (0, _actions.updateQualification)({ image_id: imageId, order_id: order_id, reaction: _actions.UNQUALIFIED }, function (_ref4) {
      var res = _ref4.res,
          err = _ref4.err;
      return console.log(res);
    });
  };

  FinalizeSelection.prototype.render = function render() {
    var images = this.props.images;


    return _react2.default.createElement(_finalize_selection2.default, {
      images: images,
      handleChange: this.handleChange,
      willEnter: this.willEnter,
      willLeave: this.willLeave,
      getStyles: this.getStyles,
      getDefaultStyles: this.getDefaultStyles,
      value: this.state.value,
      updateFilter: this.updateFilter,
      qualifiedCount: this.state.qualifiedCount,
      totalCount: images.length,
      qualifyImage: this.qualifyImage,
      unqualifyImage: this.unqualifyImage,
      filter: this.state.filter,
      handleModeChange: this.handleModeChange,
      viewMode: this.state.previewMode
    });
  };

  return FinalizeSelection;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store) {
  var images = store.images;

  var imageList = [];

  for (var album in images) {
    imageList = imageList.concat(images[album].files);
  }

  return {
    order_id: store.order.id,
    images: imageList
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

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FinalizeSelection);
//# sourceMappingURL=finalize_selection.js.map