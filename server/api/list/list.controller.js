const express = require("express");
const listController = express.Router();
// Our user model
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

listController.post('/list/:relationId', (req, res, next) => {
  console.log("hola");
  const userId = req.body.data.userId;
  const serieId = req.body.data.serieId;
  console.log(userId, serieId);

  List.findOneAndRemove({
    userId,
    serieId
  }, (err, serie) => {
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

// listController.get("/list/:id", (req, res, next) => {
//   console.log("pasa por aqui 1");
//   List.find({}, (err, series) => {
//     if (err) {
//       return res.json(err).status(500);
//     }
//     console.log("Sii! p.por aqui" + series);
//     return res.json(series);
//   });
// });

module.exports = listController;
