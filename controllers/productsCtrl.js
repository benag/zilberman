
"use strict";

let mongoose = require('mongoose');
let User = mongoose.model('User');
let Product = mongoose.model('Product');

let productController ={};

productController.getProducts = ()=>{
    return Product.find({}).exec();
};

productController.updateProduct = (product)=>{
    return Product.update({'_id':product._id},{category: product.category, description:product.description})
};

productController.createProduct = (product)=>{
    let newProduct = new Product(product);
    return newProduct.save();
};

module.exports = productController;