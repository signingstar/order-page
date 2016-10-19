import React, {Component} from "react"
import { connect } from "react-redux"

import SelectionCriteria from "../../components/confirm/image_selection_criteria"

class SelectionCriteriaConfiguration extends Component {
  render() {
    return (
      <SelectionCriteria />
    )
  }
}

export default connect()(SelectionCriteriaConfiguration)
