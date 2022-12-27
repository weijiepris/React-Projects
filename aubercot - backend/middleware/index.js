const admin = require("../configurations/config");
class Middleware {
  async decodeToken(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      if (decodeValue) {
        req.user = decodeValue;
        return next();
      }
      return res.json({ message: "Unauthorise" });
    } catch (err) {
      res.status(500).send({ message: err });
    }
  }
}

module.exports = new Middleware();
