var Mentor = require("../../models/mentor");

var mentorsDAL = {
  findOneByField: async function (fieldNameObj) {
    return await Mentor.findOne(fieldNameObj);
  },
};

module.exports = mentorsDAL;
