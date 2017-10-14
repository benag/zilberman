
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var ordersSchema = new Schema({
    user: {type: Schema.ObjectId, ref: 'User'},
    createdAt: Date,
    orders:[
        {
            categoryId: String,
            productId: String
        }
    ]
});

mongoose.model('Order', ordersSchema);