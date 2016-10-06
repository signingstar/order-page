import React from "react";
import { connect } from "react-redux";

import DesignFiles from "../components/upload_files_contents";
import { setFiles } from "../actions";

class UploadFiles extends React.Component {
  render() {
    let { files, onDrop } = this.props;

    const label = 'Print Design';
    const placeholder = 'Drop your files here, or click anywhere in this box to select files to upload';
    const acceptFiles = 'image/jpeg, image/png, .ai';

    return <DesignFiles
      label={label}
      placeholder={placeholder}
      onDrop={onDrop}
      accept={acceptFiles} />
  }
}

const mapStateToProps = (orderApp, ownProps) => {
  return {
    files: orderApp.order.files
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDrop: (files) =>
      dispatch(setFiles(files))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadFiles);
