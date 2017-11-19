
const roomRouter = require('./roomRouter');
const professionRouter = require('./professionRouter');

class mainRouter {

    constructor(app) {


    }

    init (app) {
        roomRouter.init(app);
        professionRouter.init(app);
    }
}

const router = new mainRouter();
module.exports = router;