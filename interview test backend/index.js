const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");

require("dotenv").config();

const skillsController = require("./controllers/skillsController");

// initialise app
const app = express();
const port = process.env.SECRET_PORT;

app.use(cors({ origin: true }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("hello");
  res.status(200).send({ message: "please verify email" });
});

app.post("/", (req, res) => {
  let url = req.body;

  console.log("hello", url);

  res.status(200).send({ message: "please verify email" });
});

app.get("/skills", (req, res) => {
  if (!req.user.email_verified) {
    skillsController.getSkills(req, res);
  } else {
    res.send({ message: "please verify email" });
  }
});

app.listen(port, () => {
  console.log(`app started on ${port}`);
});
