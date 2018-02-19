var Nexmo = require('nexmo');

var nexmo = new Nexmo({
    apiKey: 'd59e4113',
    apiSecret: 'a69b90efa342eadd'
}, {});

var nexmoService = {};

nexmoService.sms = function (toPhone, msg){

    let phoneNoZero = '972' + toPhone.substring(1);
    //972526749884
    return new Promise(function (fulfill, reject) {
        nexmo.message.sendSms('ZILBERMAN', toPhone, msg, {}, (err, res) => {
            if (err) reject(err);
            fulfill(res);
        });
    });


};

module.exports = nexmoService;
