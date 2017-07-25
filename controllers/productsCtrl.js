
"use strict";

let mongoose = require('mongoose');
let User = mongoose.model('User');
let Product = mongoose.model('Product');

let productController ={};

productController.getProducts = ()=>{
    return Product.find({}).exec()
};
productController.updateProduct = (product)=>{
    return Product.update({'_id':product.id},{category: product.category, description:product.description})
};

module.exports = productController;