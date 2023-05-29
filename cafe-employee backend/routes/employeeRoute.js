const express = require("express");
const router = express.Router();
const db = require("../config/mysql");
const { getAllUsers, addUser } = require("../controller/employeeController");

router.get("/", async (req, res) => {
  getAllUsers()
    .then((response) => {
      res
        .status(200)
        .send({ message: "connected to employee route successfully", response });
    })
    .catch((err) => {
      if (err.sqlMessage) {
        console.log("error", err.sqlMessage);
        res.status(400).send({ errorMessage: err.sqlMessage });
        return;
      }
      res.status(400).send({ message: err });
    });
});

router.post("/", async (req, res) => {
  addUser()
    .then((response) => {
      console.log(response);
      res.status(200).send({ message: "create employee successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
