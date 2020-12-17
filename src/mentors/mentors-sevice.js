var mentorsDAL = require("./mentors-DAL");

var mentorsService = {
  findOneByField: async function (fieldNameObj) {
    return await mentorsDAL.findOneByField(fieldNameObj);
  },
};

module.exports = mentorsService;
