const express = require("express");
const listController = express.Router();

// Our user model
const List = require("./list.model");

listController.post("/list", (req, res, next) => {
  var userId = req.body.data.userId;
  var serieId = req.body.data.serieId;
  console.log(req.body);
  var newList = List({
    userId,
    serieId
  });

  newList.save((err) => {
    if (err) {
      res.status(400).json({
        message: "Something went wrong"
      });
    } else {
      res.status(200).json(req.user);
    }
  });
});

module.exports = listController;
