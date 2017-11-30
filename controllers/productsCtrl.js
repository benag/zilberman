
"use strict";

let mongoose = require('mongoose');
let User = mongoose.model('User');
let Product = mongoose.model('Product');

class productController{

    constructor(){
        this.init();

    }

    init () {

    }

    getProducts (){
        return Product.find({}).exec();
    }

    updateProduct (product) {
        return Product.findByIdAndUpdate(product._id, {category: product.category, description:product.description, img:product.img, products:product.products})
    }

    addSubProduct (product, subProduct) {
        return Product.findByIdAndUpdate(product._id, {$push:{products:subProduct}},{new:true})
    }

    removeSubProduct (product, subProduct) {
        return Product.findByIdAndUpdate(product._id, {$pull:{products:subProduct}},  { new: true });
    }

    remove (product) {
        return Product.remove({'_id':product._id});
    }

    createProduct (product) {
        let newProduct = new Product(product);
        return newProduct.save();
    }


}

let pCtrl = new productController();
module.exports = pCtrl;

