
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var productsSchema = new Schema({
    category: String,
    products:[{
        name:String,
        title: String,
        img:String,
        cost:Number,
        description:String


    }]

});
mongoose.model('Product', productsSchema);