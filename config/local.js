/*
Filename: local.js
Author: Kevin Lamanna
StudentID: 301224451
Web App name: https://kevin-lamanna-comp229-midterm-fd3a782db0d9.herokuapp.com/
*/

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/user');

module.exports = () => {
    passport.use(new LocalStrategy(async (username, password, done) => {

        try {
            let user = await UserModel.findOne({ username: username });
            if (!user) {
                return done(null, false, {
                    message: 'Unknown user'
                });
            }

            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }

            return done(null, user);

        } catch (error) {
            return done(error);
        }
    }));
};