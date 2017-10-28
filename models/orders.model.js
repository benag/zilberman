
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var ordersSchema = new Schema({
    user: {type: Schema.ObjectId, ref: 'User'},
    createdAt: Date,
    orders:[
        {
            categoryId: {type: Schema.ObjectId, ref: 'Product'},
            productId: String
        }
    ]
});

mongoose.model('Order', ordersSchema);