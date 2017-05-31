
"use strict"

var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

let instance = null;

class Auth {
    constructor(app, domain, clientId, clientSecret) {

        if(!instance){

            var strategy = new Auth0Strategy({
                domain:       domain,
                clientID:     clientId,
                clientSecret: clientSecret,
                callbackURL:  'http://localhost:3000/callback'
            }, function(accessToken, refreshToken, extraParams, profile, done) {
                // accessToken is the token to call Auth0 API (not needed in the most cases)
                // extraParams.id_token has the JSON Web Token
                // profile has all the information from the user
                return done(null, profile);
            });

            passport.use(strategy);

            passport.serializeUser(function(user, done) {
                done(null, user);
            });

            passport.deserializeUser(function(user, done) {
                done(null, user);
            });

            app.use(passport.initialize());
            app.use(passport.session());

            app.get('/login',
                function(req, res){
                    res.render('login', { env: process.env });
                });


            app.get('/logout', function(req, res){
                req.logout();
                res.redirect('/');
            });


            app.get('/callback',
                passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
                function(req, res) {
                    res.redirect(req.session.returnTo || '/user');
                });

            app.get('/', ensureLoggedIn, function(req, res, next) {
                res.render('user', { user: req.user });
            });

            instance = this;
        }
        return instance;

    }
}


module.exports = Auth;