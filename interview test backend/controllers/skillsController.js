const skillsModel = require("../models/skillsModel");

exports.getSkills = (req, res) => {
  skillsModel
    .getSkills()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send("error");
    });
};
