
bcrypt = require('bcrypt-nodejs');

class userService {
    constructor() {
        if (userService.singelton) return userService.singelton;
        sqlService.singleton = this;
        return sqlService.singleton;

    }
    comparePasswords (candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if (err) { return cb(err); }
            cb(null, isMatch);
        });
    }

}

module.exports = userService;