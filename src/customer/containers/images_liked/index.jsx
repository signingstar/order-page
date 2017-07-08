import React, {Component} from "react"

import ImagesHeaderForReaction from "./header"
import ImagesByReaction from "./content"
import { LIKE } from "../../actions"

class ImagesLikedByPersonConfiguration extends Component {
  constructor() {
    super()

    this.state = {
      filter: LIKE,
      view: 'thumbnail'
    }

    this.updateFilter = this.updateFilter.bind(this)
    this.updateView = this.updateView.bind(this)
  }

  updateFilter(filter) {
    this.setState({
      filter: filter
    })
  }

  updateView(view) {
    this.setState({
      view
    })
  }

  updateUser(user) {
    this.setState({
      user
    })
  }

  render() {
    return (
      <div className='images-by-reaction'>
        <ImagesHeaderForReaction
          filter={this.state.filter}
          updateFilter={this.updateFilter}
          previewMode={this.state.view}
          updatePreviewMode={this.updateView}
          user={this.state.user}
        />
        <ImagesByReaction filter={this.state.filter} user={this.state.user} previewMode={this.state.view} pathname={this.props.pathname} />
      </div>
    )
  }
}

export default ImagesLikedByPersonConfiguration
