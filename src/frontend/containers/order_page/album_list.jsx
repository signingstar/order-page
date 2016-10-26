import React, {Component} from "react"
import { connect } from "react-redux"

import AlbumList from "../../components/order_page/album_list"

class AlbumListConfiguration extends Component {
  constructor() {
    super()

    this.itemHeight = 50
    this.itemSpacing = 10
  }


  render() {
    const {imageList} = this.props

    return (
      <AlbumList
        albumList={imageList}
        itemHeight={this.itemHeight}
        itemSpacing={this.itemSpacing}
      />
    )
  }
}

const mapStateToProps = (store) => {
  return {
    order_id: store.order.id,
    imageList: store.imageList || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumListConfiguration)
