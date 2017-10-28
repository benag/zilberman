
"use strict";

let mongoose = require('mongoose');
let Order = mongoose.model('Order');
let User = mongoose.model('User');

class orderController{

    constructor(){
        this.init();

    }

    init () {

    }

    /**
     * Input should be an array of category id and products that were ordered
     */
    async processOrder(orders, user, total) {
        let newOrder = new Order({user:user._id,orders:orders, createdAt:new Date()});
        await newOrder.save();
        let dbUser  = await User.findById(user._id);
        if (!dbUser.points) dbUser.points = 0;
        (dbUser.points - total < 0 ) ? dbUser.points = 0 : dbUser.points = dbUser.points - total;
        await dbUser.save();
        return newOrder;
    }

    async getOrders() {

        return Order.find({}).limit(100).sort({createdAt:-1}).populate('user orders.categoryId').lean().exec();
    }


}

let oCtrl = new orderController();
module.exports = oCtrl;

