"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _reaction_filters = require("../components/reaction_filters");

var _reaction_filters2 = _interopRequireDefault(_reaction_filters);

var _actions = require("../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LikedHeaderConfiguration = function (_Component) {
  _inherits(LikedHeaderConfiguration, _Component);

  function LikedHeaderConfiguration() {
    _classCallCheck(this, LikedHeaderConfiguration);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.state = {};

    // this.updateFilter = this.updateFilter.bind(this)
    _this.changeUser = _this.changeUser.bind(_this);
    return _this;
  }

  LikedHeaderConfiguration.prototype.componentWillMount = function componentWillMount() {
    var _props = this.props,
        submitFirstLoad = _props.submitFirstLoad,
        files = _props.files,
        imageSet = _props.imageSet;


    submitFirstLoad(files, imageSet);
  };

  LikedHeaderConfiguration.prototype.changeUser = function changeUser(user) {
    var _props2 = this.props,
        changeUserInStore = _props2.changeUserInStore,
        files = _props2.files,
        imageSet = _props2.imageSet;


    changeUserInStore(files, imageSet, user);
  };

  LikedHeaderConfiguration.prototype.render = function render() {
    var _state = this.state,
        likedCount = _state.likedCount,
        dislikedCount = _state.dislikedCount,
        lovedCount = _state.lovedCount;
    var _props3 = this.props,
        filter = _props3.filter,
        updateFilter = _props3.updateFilter,
        previewMode = _props3.previewMode,
        updatePreviewMode = _props3.updatePreviewMode,
        files = _props3.files,
        reactionByUser = _props3.reactionByUser,
        users = _props3.users,
        changeUser = _props3.changeUser;
    var reaction = reactionByUser.reaction,
        user = reactionByUser.user,
        _reactionByUser$count = reactionByUser.count,
        count = _reactionByUser$count === undefined ? [] : _reactionByUser$count;


    var userNodes = [];

    for (var i in users) {
      userNodes.push({ value: +i, label: users[i].email });
    }

    return _react2.default.createElement(_reaction_filters2.default, {
      filter: reaction,
      updateFilter: updateFilter,
      previewMode: previewMode,
      updatePreviewMode: updatePreviewMode,
      totalCount: files.length,
      likedCount: count[0],
      dislikedCount: count[1],
      lovedCount: count[2],
      user: user,
      userNodes: userNodes,
      onChange: this.changeUser
    });
  };

  return LikedHeaderConfiguration;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store) {
  var images = store.images,
      albums = store.albums,
      reactionByUser = store.reactionByUser,
      users = store.users;

  var files = [];

  for (var album in albums) {
    files = files.concat(albums[album].files);
  }

  return {
    imageSet: images,
    files: files,
    reactionByUser: reactionByUser,
    users: users
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    submitFirstLoad: function submitFirstLoad(files, imageSet) {
      dispatch((0, _actions.updateReactionFirstLoad)(files, imageSet));
    },

    changeUserInStore: function changeUserInStore(files, imageSet, user) {
      dispatch((0, _actions.updateReactionChangeUser)(files, imageSet, user));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LikedHeaderConfiguration);
//# sourceMappingURL=images_liked_header.js.map