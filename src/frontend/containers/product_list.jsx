import { connect } from "react-redux"

import Products from "../components/product"

const mapStateToProps = (store, ownProps) => {
  const {products = []} = store

  return {
    items: products
  }
}

export default connect(
  mapStateToProps
)(Products)
