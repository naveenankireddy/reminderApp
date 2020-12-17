var mentorsService = require("../src/mentors/mentors-sevice");
var authService = require("../src/auth/auth-service");

var authController = {
  loginMentor: async function (req, res) {
    var { email, password } = req.body;

    var mentor = await mentorsService.findOneByField({ email });
    var response = await authService.loginMentor(mentor, password);

    if (!response) {
      return res.status(401).json({ error: "Password is invalid" });
    }

    return res.json(response);
  },
};

module.exports = authController;
