
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var ordersSchema = new Schema({
    user: {type: Schema.ObjectId, ref: 'User'},
    createdAt: Date,
    status: {type: String, enum: ['pending','confirmed']},
    orders:[
        {
            category: String,
            title: String,
            price: Number

        }
    ]
});

mongoose.model('Order', ordersSchema);