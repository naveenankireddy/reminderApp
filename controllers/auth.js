const validator = require("validator");
const jwt = require("jsonwebtoken");
var Mentor = require("../models/mentor");
const authController = {
  loginMentor: function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(401).json({ error: "All fields are mandatory" });
    }
    if (!validator.isEmail(email)) {
      return res.status(401).json({ error: "Email is invalid" });
    }
    Mentor.findOne({ email }).exec(function (err, mentor) {
      if (err || !mentor) {
        return res.status(401).json({ error: "Email is invalid" });
      }
      const isAuthenticated = mentor.comparePassword(password);
      if (!isAuthenticated) {
        return res.status(401).json({ error: "Password is invalid" });
      }
      const token = jwt.sign({ _id: mentor.id }, process.env.JWT_SECRET);
      res.status(200).json({ token, mentor });
    });
  },
};

module.exports = authController;
