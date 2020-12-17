var express = require("express");
var router = express.Router();
const authController = require("../../controllers/auth");
var validatorMiddleware = require("../../utils/validator-middleware");

/* POST Login */
router.post(
  "/login",
  validatorMiddleware.mustHaveFields(["email", "password"]),
  validatorMiddleware.isValidEmail("email"),
  authController.loginMentor
);

module.exports = router;
