var express = require("express");
var router = express.Router();

var validatorMiddleware = require("../../utils/validator-middleware");
var paymentsController = require("../../controllers/payments");

router.get("/", paymentsController.listPayments);

router.post(
  "/",
  validatorMiddleware.mustHaveFields(["amount"], "payment"),
  paymentsController.createPayment
);

router.get("/:id", paymentsController.showPayment);

router.put(
  "/:id",
  validatorMiddleware.mustHaveFields(["amount"], "payment"),
  paymentsController.updatePayment
);

router.delete("/:id", paymentsController.deletePayment);

module.exports = router;
