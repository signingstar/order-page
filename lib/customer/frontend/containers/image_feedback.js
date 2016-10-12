"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _image_feedback = require("../components/image_feedback");

var _image_feedback2 = _interopRequireDefault(_image_feedback);

var _image_feedback_modal = require("../components/image_feedback_modal");

var _image_feedback_modal2 = _interopRequireDefault(_image_feedback_modal);

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
    _this.compileReactionList = _this.compileReactionList.bind(_this);
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

  ImageFeedbackHandler.prototype.compileReactionList = function compileReactionList() {
    var _reactionList;

    var _props2 = this.props;
    var likes = _props2.likes;
    var liked = _props2.liked;

    var defaultObj = { count: 0, users: [] };
    var reactionList = (_reactionList = {}, _reactionList[_actions.LIKE] = { count: 0, users: [] }, _reactionList[_actions.DISLIKE] = { count: 0, users: [] }, _reactionList[_actions.LOVE] = { count: 0, users: [] }, _reactionList);
    var reaction = void 0;

    liked.forEach(function (like) {
      var reaction_type = like.reaction_type;


      switch (+reaction_type) {
        case _actions.LIKE:
          reaction = reactionList[_actions.LIKE];
          reaction.count = reaction.count + 1;
          reaction.users.push(like.name);
          break;
        case _actions.DISLIKE:
          reaction = reactionList[_actions.DISLIKE];
          reaction.count = reaction.count + 1;
          reaction.users.push(like.name);
          break;
        case _actions.LOVE:
          reaction = reactionList[_actions.LOVE];
          reaction.count = reaction.count + 1;
          reaction.users.push(like.name);
          break;
      }
    });

    if (likes >= 0) {
      reactionList[likes].count = reactionList[likes].count + 1;
      reactionList[likes].users.unshift('You');
    }

    return reactionList;
  };

  ImageFeedbackHandler.prototype.render = function render() {
    var _this2 = this;

    var _props3 = this.props;
    var likes = _props3.image.likes;
    var modal = _props3.modal;

    var reactionList = this.compileReactionList();

    return modal ? _react2.default.createElement(_image_feedback_modal2.default, {
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
      likes: likes,
      reactions: reactionList
    }) : _react2.default.createElement(_image_feedback2.default, {
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
      likes: likes,
      reactions: reactionList
    });
  };

  return ImageFeedbackHandler;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  var order = store.order;
  var _ownProps$image = ownProps.image;
  var likes = _ownProps$image.likes;
  var _ownProps$image$liked = _ownProps$image.liked;
  var liked = _ownProps$image$liked === undefined ? [] : _ownProps$image$liked;


  return {
    orderId: order.id,
    likes: likes,
    liked: liked
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