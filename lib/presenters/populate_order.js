'use strict';

exports.__esModule = true;

var _underscore = require('underscore');

var albumifyImages = function albumifyImages(imageList, albumList) {
  var albums = {};

  albumList.forEach(function (album, index) {
    return albums[album.id] = { name: album.name, priority: index + 1, files: [] };
  });

  imageList.forEach(function (image) {
    var _JSON$parse = JSON.parse(image);

    var album_id = _JSON$parse.album_id;
    var originalname = _JSON$parse.originalname;
    var size = _JSON$parse.size;
    var destination = _JSON$parse.destination;
    var filename = _JSON$parse.filename;


    albums[album_id].files.push({
      name: originalname,
      size: size,
      filesrc: destination + '/' + filename,
      uploaded: true
    });
  });

  Object.keys(albums).forEach(function (albumId) {
    var count = albums[albumId].uploaded = albums[albumId].files.length;
    var size = count > 1 ? albums[albumId].files.reduce(function (prev, curr) {
      return prev + curr.size;
    }, 0) : count > 0 ? albums[albumId].files[0].size : 0;
    albums[albumId].uploadedSize = size;
  });

  return albums;
};

var populateOrder = function populateOrder(results) {
  var products = results.products;
  var categories = results.categories;
  var _results$orderInfo = results.orderInfo;
  var order = _results$orderInfo.order;
  var files = _results$orderInfo.files;

  var productObj = products.find(function (product) {
    return product.id === +order.product;
  });

  order.product = productObj ? { key: productObj.id, value: productObj.description } : '';
  order.customer = (0, _underscore.pick)(order, 'email', 'phone_number', 'image_count', 'category');
  order.customer.cust_name = order.first_name + ' ' + order.last_name;

  var _pick = (0, _underscore.pick)(order, 'albums');

  var albums = _pick.albums;


  var image = albumifyImages(files, albums);

  return { products: products, categories: categories, order: order, image: image };
};

exports.default = populateOrder;
//# sourceMappingURL=populate_order.js.map