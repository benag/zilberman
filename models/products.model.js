
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var productsSchema = new Schema({
    version: {type:Number, default:1},
    category: String,
    img: String,
    chosen: Boolean,
    description:String,
    products:[{
        title: String,
        chosen:Boolean,
        img:String,
        price:Number,
        description:String


    }]

});
mongoose.model('Product', productsSchema);