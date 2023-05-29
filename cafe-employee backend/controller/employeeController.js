const db = require("../config/mysql");

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM employee";
    db.query(sql, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

const addUser = () => {
  return new Promise((resolve, reject) => {
    let value = {
      name: "test",
      email_address: "email.com",
      phone_number: 91771826,
      gender: "M",
    };
    let sql = "INSERT INTO employee SET ?";
    db.query(sql, value, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

module.exports = { getAllUsers, addUser };
