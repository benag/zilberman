
"use strict";

let passport = require('passport'),
    //userService = require('../services/userService'),
    mysql = require('../services/sqlService'),
    config = require('./default'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    LocalStrategy = require('passport-local');



//const localOptions = { usernameField: 'email', passwordField: 'email', passReqToCallback: true };
const localOptions = { usernameField: 'email', passReqToCallback: true };
let sql = new mysql();
const localLogin = new LocalStrategy(localOptions, async function(req, email, password, done) {

    // let dbUser = await sql.query(`select * from tUsersAndRoles where uMobile=${email}`);
    // if (!dbUser || dbUser.recordset.length ==0) return done(null, false,{ error: 'Your login details could not be verified. Please try again.' });
    // userService.comparePassword(password, function(err, isMatch) {
    //     if (err) { return done(err); }
    //     if (!isMatch) { return done(null, false, { error: "Your login details could not be verified. Please try again." }); }

    //     return done(null, user);
    // });
    // User.findOne({ email: email }, function(err, user) {
    //     if(err) { return done(err); }
    //     if(!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }
    //     if (req.body.facebookId){
    //         if (user.facebookId === req.body.facebookId) return done(null, user);
    //         return done(null, false, { error: "Your login details could not be verified. Please try again." });
    //     }

    //     user.comparePassword(password, function(err, isMatch) {
    //         if (err) { return done(err); }
    //         if (!isMatch) { return done(null, false, { error: "Your login details could not be verified. Please try again." }); }

    //         return done(null, user);
    //     });
    // });
});

//const jwtOptions = {
//    // Telling Passport to check authorization headers for JWT
//    jwtFromRequest: ExtractJwt.fromAuthHeader(),
//    // Telling Passport where to find the secret
//    secretOrKey: config.secret
//};
var jwtOptions = {};
//jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
console.log('secter:' +config.secret);
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = config.secret;
//jwtOptions.issuer = 'accounts.examplesoft.com';
//jwtOptions.audience = 'yoursite.net';

// Setting up JWT login strategy
    const jwtLogin = new JwtStrategy(jwtOptions, async function(payload, done) {
        try{
            let user = (await sql.query("select * from tUsersAndRoles where uID =" + payload.uID)).recordset[0];
            if (user){
                done(null, user);
            }else{
                done(null, false);
            }
        }catch(err){
            return done(err, false);
        }
        

        // User.findById(payload.uID, function(err, user) {
        //     if (err) { return done(err, false); }

        //     if (user) {
        //         done(null, user);
        //     } else {
        //         done(null, false);
        //     }
        // });
    });

passport.use(jwtLogin);
passport.use(localLogin);