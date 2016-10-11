"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _image_feedback = require("../components/image_feedback");

var _image_feedback2 = _interopRequireDefault(_image_feedback);

var _actions = require("../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageFeedbackHandler = function (_Component) {
  _inherits(ImageFeedbackHandler, _Component);

  function ImageFeedbackHandler() {
    _classCallCheck(this, ImageFeedbackHandler);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.onReactionUpdate = _this.onReactionUpdate.bind(_this);
    return _this;
  }

  ImageFeedbackHandler.prototype.onReactionUpdate = function onReactionUpdate(reaction) {
    var _props = this.props;
    var image = _props.image;
    var onReaction = _props.onReaction;
    var orderId = _props.orderId;
    var oldReaction = image.likes;


    var newReaction = oldReaction === reaction ? _actions.DEFAULT_REACTION : reaction;

    onReaction(image, newReaction);

    var postData = {
      reaction_type: newReaction,
      image_uuid: image.id,
      order_id: orderId,
      index: image.index
    };

    (0, _actions.sendImageFeedback)(postData, function (_ref) {
      var status = _ref.status;
      var textStatus = _ref.textStatus;
      return console.log(status || textStatus);
    });
  };

  ImageFeedbackHandler.prototype.onCommentImage = function onCommentImage() {};

  ImageFeedbackHandler.prototype.render = function render() {
    var _this2 = this;

    var likes = this.props.image.likes;


    return _react2.default.createElement(_image_feedback2.default, {
      onLike: function onLike() {
        return _this2.onReactionUpdate(_actions.LIKE);
      },
      onDisike: function onDisike() {
        return _this2.onReactionUpdate(_actions.DISLIKE);
      },
      onLove: function onLove() {
        return _this2.onReactionUpdate(_actions.LOVE);
      },
      onComment: this.onCommentImage,
      likes: likes
    });
  };

  return ImageFeedbackHandler;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  var order = store.order;

  return {
    orderId: order.id
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    onReaction: function onReaction(image, value) {
      dispatch((0, _actions.updateReaction)(image, value));
    },

    onComment: function onComment(image, comment) {
      dispatch((0, _actions.commentOnImage)(image, comment));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ImageFeedbackHandler);
//# sourceMappingURL=image_feedback.js.map