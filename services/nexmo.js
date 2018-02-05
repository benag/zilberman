var Nexmo = require('nexmo');

var nexmo = new Nexmo({
    apiKey: 'd59e4113',
    apiSecret: 'a69b90efa342eadd'
}, {});

var nexmoService = {};

nexmoService.sms = function (toPhone, msg){


    return new Promise(function (fulfill, reject) {
        nexmo.message.sendSms('TRIBU', toPhone, msg, {}, (err, res) => {
            if (err) reject(err);
            fulfill(res);
        });
    });


};

module.exports = nexmoService;
