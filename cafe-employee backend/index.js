const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.SECRET_PORT;
const app = express();

// db connection
const connection = require("./config/mysql");




// routes
const cafeRoutes = require("./routes/cafeRoute");
const employeeRoutes = require("./routes/employeeRoute");

app.use("/cafe", cafeRoutes);
app.use("/employee", employeeRoutes);

// to allow access into backend
app.use(cors({ origin: true }));

app.get("/", (req, res) => {
  console.log("connected to /");
  res.status(200).send({ message: "connected successfully" });
});

app.listen(port, () => {
  console.log(`App running on port ${port} on production server \n`);
});
