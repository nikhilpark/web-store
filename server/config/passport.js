const User = require("../models/userData");
const bcrypt = require("bcrypt-nodejs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      }); 
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);

  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
        email:user.email,
        address1:user.address1,
        address2:user.address2,
        city:user.city,
        contactno:user.contactno,
        firstname:user.firstname,
        lastname:user.lastname,
        state:user.state,
        zip:user.zip,
        userRole:user.userRole
      };
      cb(err, userInformation);
    });
  });
};