const express = require("express");
const cors = require("cors");
require("dotenv").config();
const firebase = require("./configurations/config");

const skillsController = require("./controllers/skillsController");

const authMiddleware = require("./middleware");

// initialise app
const app = express();
const port = process.env.SECRET_PORT;

// applying middleware
app.use(cors({ origin: true }));
app.use(authMiddleware.decodeToken);

app.get("/", (req, res) => {
  console.log(req.user);
  if (!req.user.email_verified) {
    res.send({ message: "please verify email" });
  }
});

app.get("/:token", (req, res) => {
  console.log(req.params.token);
  res.send("success");
});

app.listen(port, () => {
  console.log(`app started on ${port}`);
});
