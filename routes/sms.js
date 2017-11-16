
var nexmo = require('../services/nexmo');

class smsRoutes {

    constructor (){

    }

    init(app) {

        app.get('/twillo', (req, res) => {
            nexmo.sms('972526749884', 'test').then( response => console.log(response))
                .catch(err => res.status(400).send('Error sending sms'));
        });
    }

}

const router = new smsRoutes();
module.exports = router;