var studentsService = require("../src/students/students-service");

var studentsController = {
  listStudents: async function (req, res, next) {
    var students = await studentsService.listStudents();
    return res.json({ students });
  },

  createStudent: async function (req, res, next) {
    var student = req.body.student;
    return res.json({ students: await studentsService.createStudent(student) });
  },

  showStudent: async function (req, res, next) {
    var studentId = req.params.id;
    return res.json({ student: await studentsService.showStudent(studentId) });
  },

  updateStudent: async function (req, res, next) {
    var studentId = req.params.id;
    var student = req.body.student;
    return res.json({
      student: await studentsService.updateStudent(studentId, student),
    });
  },

  deleteStudent: async function (req, res, next) {
    var studentId = req.params.id;
    return res.json({
      student: await studentsService.deleteStudent(studentId),
    });
  },
};

module.exports = studentsController;
