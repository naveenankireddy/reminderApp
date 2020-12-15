var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var monthsEnum = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
var paymentModeEnum = ["cash", "UPI", "Bank Transfer"];

var paymentSchema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "Student" },
    amount: { type: Number, required: true },
    mode: { type: String, enum: paymentModeEnum },
    month: { type: String, enum: monthsEnum },
    year: { type: Number },
    isStayFee: { type: Boolean, default: false },
    isTrainingFee: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
