import { connect } from "react-redux"

import AlbumList from "../components/album_list"

const mapStateToProps = (store) => {
  const { images, albums } = store

  const albumList = Object.keys(albums).map(albumId => (
    {id: albumId, name: albums[albumId].name, priority: albums[albumId].priority}
  ))

  albumList.sort((prev, curr) => prev.priority - curr.priority)

  return {
    albums: albumList
  }
}

export default connect(
  mapStateToProps
)(AlbumList)
