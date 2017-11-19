
var professionCtrl = require('../controllers/professionCtrl.js');

class professionRoutes {

    constructor (){

    }

    init(app) {


        app.get('/professions', (req, res) => {
            professionCtrl.getProfessions().then( professions => res.json(professions))
                .catch(err => res.status(400).send(err.message));
        });
    }

}

const router = new professionRoutes();
module.exports = router;