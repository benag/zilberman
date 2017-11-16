
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

    //async processApprove(order) {
    //    let userId = order.user._id
    //    let user = await User.findById(userId);
    //    if ((user.points - order.points) < 0) throw new Error('Not enough points')
    //    user.points = user.points - order.points
    //    await user.save()
    //    let dbOrder = await Order.findById(order._id)
    //    dbOrder.status = 'confirmed';
    //    return dbOrder.save()
    //}

    /**
     * Input should be an array of category id and products that were ordered
     */
    async processOrder(orders, user, total) {
        let dbUser  = await User.findById(user._id);
        if (!dbUser.points) dbUser.points = 0;
        if (dbUser.points - total < 0 ) { throw new Error('User doesnt have enough points') }
        else{ dbUser.points = dbUser.points - total; }

        let newOrder = new Order({user:user._id,orders:orders, createdAt:new Date(), status:'pending'});
        await newOrder.save();

        await dbUser.save();
        return newOrder;
    }

    async getOrders() {

        return await Order.find({}).limit(100).sort({createdAt:-1}).populate('user').exec();


    }


}

let oCtrl = new orderController();
module.exports = oCtrl;

