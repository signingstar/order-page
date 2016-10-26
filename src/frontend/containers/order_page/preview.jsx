import React, {Component} from "react"
import { connect } from "react-redux"
import Redirect from "react-router/Redirect"
import { ajax } from "jquery"

import PreviewDialog from "../../components/order_page/preview"

class PreviewOrder extends Component {
  constructor() {
    super()

    this.state = {
      isShowingModal: false,
      fetching: false
    }
    this.content= {__html: ''}

    this.handleClose = this.handleClose.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const previewData = ({res}) => {
      this.content = {__html: res}
      this.setState({fetching: false})
    }

    const processOrder = (cb) => {
      this.setState({fetching: true})
      ajax({
        url: '/orders/143/preview',
      })
      .done((res, textStatus) => cb({res}))
      .fail((xhr, status, err) => cb({err: xhr.responseJSON, status: xhr.status}))
    }

    processOrder(previewData)
    this.setState({isShowingModal: true})
  }

  handleClose() {
    this.setState({isShowingModal: false})
  }

  render() {
    const {isShowingModal} = this.state
    return (
            <PreviewDialog
              onClose={this.handleClose}
              isShowing={isShowingModal}
              content={this.content}
              onClick={this.handleClick}
            />
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
  }
}

export default connect(
  mapStateToProps
) (PreviewOrder)
