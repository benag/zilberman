
"use strict";

let mongoose = require('mongoose');
let User = mongoose.model('User');
let Product = mongoose.model('Product');

let productController ={};

productController.getProducts = ()=>{
    return Product.find({}).exec()
};


module.exports = productController;