const { Student, Profile, Course, Enrollment, sequelize } = require('../models');

exports.showCreateStudent = (req, res) => {
  res.render('createStudent');
};

exports.createStudent = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { name, email, phone, address } = req.body;

    const student = await Student.create({ name, email }, { transaction: t });

    await Profile.create(
      { phone, address, StudentId: student.id },
      { transaction: t }
    );

    await t.commit();
    res.redirect('/students');
  } catch (error) {
    await t.rollback();
    res.send("Transaction Failed");
  }
};

exports.listStudents = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;

  const students = await Student.findAll({
    limit,
    offset
  });

  res.render('students', { students, page });
};

exports.showEnroll = async (req, res) => {
  const students = await Student.findAll();
  const courses = await Course.findAll();

  res.render('enrollStudent', { students, courses });
};

exports.enrollStudent = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { studentId, courseId, paymentAmount } = req.body;

    await Enrollment.create(
      { StudentId: studentId, CourseId: courseId, paymentAmount },
      { transaction: t }
    );

    await t.commit();
    res.redirect('/students');
  } catch (error) {
    await t.rollback();
    res.send("Enrollment Failed");
  }
};
