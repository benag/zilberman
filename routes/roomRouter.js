
var roomCtrl = require('../controllers/roomCtrl.js');

class roomRoutes {

    constructor (){

    }

    init(app) {

        app.get('/rooms', (req, res) => {
            roomCtrl.getRooms().then( rooms => res.json(rooms))
                .catch(err => res.status(400).send('Error finding rooms'));
        });
    }

}

const router = new roomRoutes();
module.exports = router;