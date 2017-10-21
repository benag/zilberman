
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


//app.post('/rooms', (req, res)=>{
//    roomCtrl.setRooms()
//    .then(function(rooms){
//        res.json({status:'ok', payload:rooms});
//    })
//    .catch(err => console.log(err) );
//})
const router = new roomRoutes();
module.exports = router;