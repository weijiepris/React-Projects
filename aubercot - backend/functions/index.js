const express = require("express");
const cors = require("cors");
require("dotenv").config();

const skillsController = require("./controllers/skillsController");

// initialise app
const app = express();
const port = process.env.SECRET_PORT;

// applying middleware
app.use(cors({ origin: true }));

app.get("/", (req, res) => {
  skillsController.getSkills(req, res);
});

app.listen(port, () => {
  console.log(`app started on ${port}`);
});
