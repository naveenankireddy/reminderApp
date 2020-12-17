var express = require("express");
var router = express.Router();

var validatorMiddleware = require("../../utils/validator-middleware");
var studentsController = require("../../controllers/students");

router.get("/", studentsController.listStudents);

router.post(
  "/",
  validatorMiddleware.mustHaveFields(
    ["name", "email", "phoneNumber"],
    "student"
  ),
  validatorMiddleware.isValidEmail("email", "student"),
  studentsController.createStudent
);

router.get("/:id", studentsController.showStudent);

router.put(
  "/:id",
  validatorMiddleware.mustHaveFields(
    ["name", "email", "phoneNumber"],
    "student"
  ),
  studentsController.updateStudent
);

router.delete("/:id", studentsController.deleteStudent);

module.exports = router;
