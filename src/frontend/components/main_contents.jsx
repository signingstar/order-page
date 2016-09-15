import React from "react";
import { connect } from "react-redux";

class MainContents extends React.Component {
  render () {
    return (
      <section>
        <div className='main-section-content'>
          {this.props.children}
        </div>
      </section>
    )
  }
}

const mapStateToProps = (orderApp, ownProps) => {
  let sessionStore = typeof sessionStorage === 'undefined'? undefined : sessionStorage;

  if(sessionStore) {
    let orderAppToStore = JSON.parse(JSON.stringify(orderApp));
    delete orderAppToStore.selectionState.files;
    sessionStore.setItem('orderApp', JSON.stringify(orderAppToStore));
  }

  return {
    children: ownProps.children
  }
}

export default connect(mapStateToProps)(MainContents);
