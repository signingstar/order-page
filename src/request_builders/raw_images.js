import {getAllImages} from "../database/api/fetch_order_details"

const images = (orderid, modules, cb) => {
  getAllImages([orderid], modules, (err, res) => {
    if(err) return cb(err)
    cb(err, res[0].files)
  })
}

export default images
