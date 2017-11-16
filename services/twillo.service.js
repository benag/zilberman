var winston = require('winston'),
    Q = require('q'),
    client = require('twilio')('ACb4e21bde3cacce20e90f29431c8d16d3', '0b0125fd89af0aec17597476c7369a8a');

var twilloService = {};

twilloService.sms = function (toPhone, msg){
    if (toPhone.indexOf('+972') === -1) toPhone = '+972' + toPhone.substr(1);
    var deferred = Q.defer();
    client.sendMessage({
        to: toPhone, // Any number Twilio can deliver to
        from: '+972526285476', // A number you bought from Twilio and can use for outbound communication
        body: msg // body of the SMS message

    }, function(err, responseData) { //this function is executed when a response is received from Twilio

        if (!err) { // "err" is an error received during the request, if any
            winston.info('sent sms');
            deferred.resolve(responseData);
        }else{
            winston.info('error sending sms ' + err);
            deferred.reject(err);
        }
    });
    return deferred.promise;
};

module.exports = twilloService;
