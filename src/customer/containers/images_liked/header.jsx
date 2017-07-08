import React, {Component} from "react"
import {connect} from "react-redux"

import ImageReactionHeader from "../../components/images_liked/header"
import { LIKE, DISLIKE, LOVE, LIKES, updateReactionFirstLoad, updateReactionChangeUser } from "../../actions"

class LikedHeaderConfiguration extends Component {
  constructor() {
    super()

    this.state = {

    }

    this.changeUser = this.changeUser.bind(this)
  }

  componentWillMount() {
    const { submitFirstLoad, files, imageSet } = this.props

    submitFirstLoad(files, imageSet)
  }

  changeUser(user) {
    const { changeUserInStore, files, imageSet } = this.props

    changeUserInStore(files, imageSet, user)
  }

  render() {
    const { likedCount, dislikedCount, lovedCount } = this.state
    const { filter, updateFilter, previewMode, updatePreviewMode, files, reactionByUser, users, changeUser } = this.props
    const { reaction, user, count=[] } = reactionByUser

    let userNodes = []

    for(let i in users) {
      userNodes.push({value: +i, label: users[i].email})
    }


    return (
      <ImageReactionHeader
        filter={filter}
        updateFilter={updateFilter}
        previewMode={previewMode}
        updatePreviewMode={updatePreviewMode}
        totalCount={files.length}
        likedCount={count[0]}
        dislikedCount={count[1]}
        lovedCount={count[2]}
        user={user}
        userNodes={userNodes}
        onChange={this.changeUser}
      />
    )
  }
}

const mapStateToProps = (store) => {
  const { images, albums, reactionByUser, users } = store
  let files = []

  for(let album in albums) {
    files = files.concat(albums[album].files)
  }

  return {
    imageSet: images,
    files,
    reactionByUser,
    users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitFirstLoad: (files, imageSet) => {
      dispatch(updateReactionFirstLoad(files, imageSet))
    },

    changeUserInStore: (files, imageSet, user) => {
      dispatch(updateReactionChangeUser(files, imageSet , user))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LikedHeaderConfiguration)
