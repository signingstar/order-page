'use strict';

exports.__esModule = true;

var _underscore = require('underscore');

var albumifyImages = function albumifyImages(imageList, albumList) {
  var albums = {};

  albumList.forEach(function (album, index) {
    return albums[album.id] = { name: album.name, priority: index + 1, files: [] };
  });

  imageList.forEach(function (file) {
    var _JSON$parse = JSON.parse(file),
        album_id = _JSON$parse.album_id,
        originalname = _JSON$parse.originalname,
        size = _JSON$parse.size,
        destination = _JSON$parse.destination,
        filename = _JSON$parse.filename;

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
  var products = results.products,
      categories = results.categories,
      orderInfo = results.orderInfo;


  if (!orderInfo) {
    return { products: products, categories: categories };
  }

  var order = orderInfo.order,
      files = orderInfo.files;

  var productObj = products.find(function (product) {
    return product.id === +order.product;
  });

  order.product = productObj ? { key: productObj.id, value: productObj.description } : '';
  order.customer = (0, _underscore.pick)(order, 'email', 'phone_number', 'image_count');
  order.customer.cust_name = order.first_name + ' ' + order.last_name;

  var _pick = (0, _underscore.pick)(order, 'albums'),
      albums = _pick.albums;

  albums = albumifyImages(files, albums);

  return { products: products, categories: categories, order: order, albums: albums };
};

exports.default = populateOrder;
//# sourceMappingURL=populate_order.js.map