const db = require("../config/mysql");

const getAllCafes = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM cafe", (error, results, fields) => {
      if (error) {
        console.error("Error executing query:", error);
        reject();
      }
      resolve(results);
    });
  });
};

module.exports = { getAllCafes };
