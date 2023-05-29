const express = require("express");
const router = express.Router();

const { getAllCafes } = require("../controller/cafeController");

router.get("/", async (req, res) => {
  let cafes = await getAllCafes();

  console.log("cafes", cafes);
  res.status(200).send({ message: "connected to cafe route successfully" });
});


// •	Create a GET endpoint /cafes?location=<location>
// sorted by the highest number of employees first
// If a valid location is provided, it will filter the list to return only cafes that is within the area
// If an invalid location is provided, it should return an empty list
// If no location is provided, it should list down all cafes






module.exports = router;
