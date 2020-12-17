var jwt = require("jsonwebtoken");

var authService = {
  loginMentor: function (mentor, password) {
    var isAuthenticated = mentor.comparePassword(password);

    if (!isAuthenticated) {
      return false;
    }

    var token = jwt.sign({ _id: mentor.id }, process.env.JWT_SECRET);
    return { token, mentor };
  },
};

module.exports = authService;
