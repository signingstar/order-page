import React from "react";
import { connect } from "react-redux";

import FilesPreview from "../components/files_preview";

class FilesPreviewContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      isShowingModal: false
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({isShowingModal: true});
  }

  handleClose() {
    this.setState({isShowingModal: false});
  }

  render() {
    const {files} = this.props;
    const label = 'See Preview';
    const modalHeader = 'Selected ' + (files.length === 1 ? '1 file' : files.length + ' files') + ' to upload';

    return (
      <FilesPreview
        onClick={this.handleClick}
        onClose={this.handleClose}
        isShowing={this.state.isShowingModal}
        label={label} files={files}
        modalHeader={modalHeader}/>
    )
  }
}

const mapStateToProps = (orderApp) => {
  return {
    files: orderApp.selectionState.files || []
  }
}


export default connect(
  mapStateToProps
) (FilesPreviewContainer);
