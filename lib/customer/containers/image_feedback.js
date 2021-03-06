"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _feedback_panel = require("../components/feedback/feedback_panel");

var _feedback_panel2 = _interopRequireDefault(_feedback_panel);

var _feedback_panel_modal = require("../components/feedback/feedback_panel_modal");

var _feedback_panel_modal2 = _interopRequireDefault(_feedback_panel_modal);

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
    var _props = this.props,
        image = _props.image,
        onReaction = _props.onReaction,
        orderId = _props.orderId,
        albumId = _props.albumId;
    var oldReaction = image.likes;


    var newReaction = oldReaction === reaction ? _actions.DEFAULT_REACTION : reaction;

    onReaction(image, newReaction, albumId);

    var postData = {
      reaction_type: newReaction,
      image_uuid: image.id,
      order_id: orderId,
      index: image.index
    };

    (0, _actions.sendImageFeedback)(postData, function (_ref) {
      var status = _ref.status,
          textStatus = _ref.textStatus;
      return console.log(status || textStatus);
    });
  };

  ImageFeedbackHandler.prototype.onCommentImage = function onCommentImage() {};

  ImageFeedbackHandler.prototype.compileReactionList = function compileReactionList() {
    var _reactionList;

    var _props2 = this.props,
        likes = _props2.likes,
        liked = _props2.liked;

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

    return reactionList;
  };

  ImageFeedbackHandler.prototype.render = function render() {
    var _this2 = this;

    var _props3 = this.props,
        onClose = _props3.onClose,
        likes = _props3.image.likes,
        modal = _props3.modal,
        albumId = _props3.albumId;

    var reactionList = this.compileReactionList();

    return modal ? _react2.default.createElement(_feedback_panel_modal2.default, {
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
      reactions: reactionList,
      onClose: onClose
    }) : _react2.default.createElement(_feedback_panel2.default, {
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
  var _ownProps$image = ownProps.image,
      likes = _ownProps$image.likes,
      _ownProps$image$liked = _ownProps$image.liked,
      liked = _ownProps$image$liked === undefined ? [] : _ownProps$image$liked;


  return {
    orderId: order.id,
    likes: likes,
    liked: liked
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    onReaction: function onReaction(image, value, albumId) {
      dispatch((0, _actions.updateReaction)(image, value, albumId));
    },

    onComment: function onComment(image, comment) {
      dispatch((0, _actions.commentOnImage)(image, comment));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ImageFeedbackHandler);