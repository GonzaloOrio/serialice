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
      res.status(200).json({message: "add good"});
    }
  });
});

listController.get("/list", (req, res, next) => {
  console.log("pasa por aqui 1");
  List.find({}, (err, series) => {
    console.log("pasa por aqui 2");
    if (err) {
      return res.json(err).status(500);
    }
    console.log("Sii! p.por aqui" + series);
    return res.json(series);
  });
});

module.exports = listController;
