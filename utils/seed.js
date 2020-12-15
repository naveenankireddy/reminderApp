var Mentor = require("../models/mentor");

Mentor.find({}).exec(function (err, mentors) {
  if (mentors.length == 0) {
    var mentor1 = new Mentor({
      name: "Naveen",
      email: "naveen@gmail.com",
      password: "qwerty",
    });

    mentor1.save();
  }
});
