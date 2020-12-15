var express = require("express");
const authController = require("../../controllers/auth");
var router = express.Router();

/* POST Login */
router.post("/login", authController.loginMentor);

module.exports = router;
