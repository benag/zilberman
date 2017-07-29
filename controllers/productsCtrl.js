
"use strict";

let mongoose = require('mongoose');
let User = mongoose.model('User');
let Product = mongoose.model('Product');

let productController ={};

productController.getProducts = ()=>{
    return Product.find({}).exec();
};

productController.updateProduct = (product)=>{
    return Product.findByIdAndUpdate(product._id, {category: product.category, description:product.description, img:product.img, products:product.products})
};
productController.addSubProduct = (product,subProduct)=>{
    return Product.findByIdAndUpdate(product._id, {$push:{products:subProduct}},{new:true})
};
productController.remove = (product)=>{
    return Product.remove({'_id':product._id});

};

productController.createProduct = (product)=>{
    let newProduct = new Product(product);
    return newProduct.save();
};

module.exports = productController;