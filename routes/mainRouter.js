
const roomRouter = require('./roomRouter');

class mainRouter {

    constructor(app) {


    }

    init (app) {
        roomRouter.init(app);
    }
}

const router = new mainRouter();
module.exports = router;