const express = require("express");
const listController = express.Router();
const List = require("./list.model");

listController.post("/list", (req, res, next) => {
  const userId = req.body.data.userId;
  const serieId = req.body.data.serieId;
  const newList = List({
    userId,
    serieId
  });
  newList.save((err) => {
    if (err) {
      res.status(400).json({
        message: "Something went wrong"
      });
    } else {
      res.status(200).json({
        message: "add good"
      });
    }
  });
});

listController.get("/list/:userId", (req, res, next) => {
  const userId = req.params.userId;
  List.find({
    userId
  }, (err, series) => {
    if (err) {
      return res.json(err).status(500);
    }
    return res.json(series);
  });
});

listController.put('/list/:id', (req, res, next) => {
  const relationId = req.params.id;
  const serieId = req.body.id;
  let isView = req.body.isView;
  if (isView === false) {
    isView = true;
  } else {
    isView = false;
  }
  List.findByIdAndUpdate(relationId, {
    serieId,
    isView
  }, (err) => {
    if (err) {
      res.status(400).json({
        message: "Something went wrong"
      });
    } else {
      res.status(200).json({
        message: "updated ok"
      });
    }
  });
});

listController.delete('/list/:id', (req, res, next) => {
  const relationId = req.params.id;
  List.findByIdAndRemove(relationId, (err) => {
    if (err) {
      res.status(400).json({
        message: "Something went wrong"
      });
    } else {
      res.status(200).json({
        message: "delete good"
      });
    }
  });
});

module.exports = listController;
