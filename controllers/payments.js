var paymentsService = require("../src/payments/payments-service");

var paymentsController = {
  listPayments: async function (req, res, next) {
    var payments = await paymentsService.listPayments();
    return res.json({ payments });
  },

  createPayment: async function (req, res, next) {
    var payment = req.body.payment;
    return res.json({ payments: await paymentsService.createPayment(payment) });
  },

  showPayment: async function (req, res, next) {
    var paymentId = req.params.id;
    return res.json({ payment: await paymentsService.showPayment(paymentId) });
  },

  updatePayment: async function (req, res, next) {
    var paymentId = req.params.id;
    var payment = req.body.payment;
    return res.json({
      payment: await paymentsService.updatePayment(paymentId, payment),
    });
  },

  deletePayment: async function (req, res, next) {
    var paymentId = req.params.id;
    return res.json({
      payment: await paymentsService.deletePayment(paymentId),
    });
  },
};

module.exports = paymentsController;
