import React from "react";
import { connect } from "react-redux";

import DesignFiles from "../components/design_files_contents";
import { FILES, setFiles } from "../actions/index";

class DesignFilesBox extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.shouldUpdate;
  }

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
  let { files, updateComponents } = orderApp.selectionState;

  return {
    files,
    shouldUpdate: updateComponents.indexOf(FILES) > -1
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
)(DesignFilesBox);
