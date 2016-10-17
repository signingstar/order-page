import { connect } from "react-redux"

import AlbumList from "../components/album_list"

const mapStateToProps = (store) => {
  const { images } = store

  const albumList = Object.keys(images).map(albumId => (
    {id: albumId, name: images[albumId].album_name}
  ))

  return {
    albums: albumList
  }
}

export default connect(
  mapStateToProps
)(AlbumList)
