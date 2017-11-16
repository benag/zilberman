
var twillo = require('../services/twillo.service.js');

class roomRoutes {

    constructor (){

    }

    init(app) {

        app.get('/twillo', (req, res) => {
            twillo.sms('0526749884', 'test').then( response => console.log(response))
                .catch(err => res.status(400).send('Error sending sms'));
        });
    }

}

const router = new roomRoutes();
module.exports = router;