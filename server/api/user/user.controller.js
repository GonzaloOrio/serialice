const express = require("express");
const userController = express.Router();
const passport = require("passport");

const User = require("./user.model");

// Bcrypt let us encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// signup an user
userController.post("/signup", (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    res.status(400).json({
      message: "Provide username and password"
    });
    return;
  }
  User.findOne({
    username
  }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({
        message: "The username already exists"
      });
      return;
    }
    let salt = bcrypt.genSaltSync(bcryptSalt);
    let hashPass = bcrypt.hashSync(password, salt);

    let newUser = User({
      username,
      password: hashPass
    });
    newUser.save((err) => {
      if (err) {
        res.status(400).json({
          message: "Something went wrong"
        });
      } else {
        req.login(newUser, function(err) {
          if (err) {
            return res.status(500).json({
              message: 'something went wrong :('
            });
          }
          res.status(200).json(req.user);
        });
      }
    });
  });
});

// login an user
userController.post("/login", function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json(info);
    }
    req.login(user, function(err) {
      if (err) {
        return res.status(500).json({
          message: 'something went wrong :('
        });
      }
      res.status(200).json(req.user);
    });
  })(req, res, next);
});

// logout an user
userController.post("/logout", function(req, res) {
  req.logout();
  res.status(200).json({
    message: 'Success'
  });
});

// check the status of the user
userController.get("/loggedin", function(req, res) {
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  }
  return res.status(403).json({
    message: 'Unauthorized'
  });
});

module.exports = userController;
