const { Student, Course, Enrollment, User } = require('../models');
const { Sequelize } = require('sequelize');

//DASHBOARD
exports.dashboard = (req, res) => {
  res.render('adminDashboard');
};

//CREATE INSTRUCTOR
exports.showCreateInstructor = (req, res) => {
  res.render('createInstructor');
};

exports.createInstructor = async (req, res) => {
  try {
    const { username, password } = req.body;

    await User.create({
      username,
      password,
      role: 'instructor'
    });

    res.redirect('/admin/dashboard');
  } catch (error) {
    res.send("Error creating instructor: " + error.message);
  }
};

//CREATE COURSE
exports.showCreateCourse = async (req, res) => {
  try {
    const instructors = await User.findAll({
      where: { role: 'instructor' }
    });

    res.render('createCourse', { instructors });
  } catch (error) {
    res.send("Error loading instructors: " + error.message);
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { title, fee, instructorId } = req.body;

    await Course.create({
      title,
      fee,
      instructorId
    });

    res.redirect('/admin/dashboard');
  } catch (error) {
    res.send("Error creating course: " + error.message);
  }
};

//REPORTS
exports.reports = async (req, res) => {
  try {

    //Total Students Per Course
    const studentsPerCourse = await Course.findAll({
      attributes: [
        'title',
        [Sequelize.fn('COUNT', Sequelize.col('Students.id')), 'totalStudents']
      ],
      include: {
        model: Student,
        attributes: [],
        through: { attributes: [] }
      },
      group: ['Course.id']
    });

    //Total Revenue Per Instructor
    const revenuePerInstructor = await Enrollment.findAll({
      attributes: [
        [Sequelize.col('Course.User.username'), 'instructor'],
        [Sequelize.fn('SUM', Sequelize.col('paymentAmount')), 'totalRevenue']
      ],
      include: {
        model: Course,
        attributes: [],
        include: {
          model: User,
          attributes: []
        }
      },
      group: ['Course.User.id']
    });

    res.render('reports', {
      studentsPerCourse,
      revenuePerInstructor
    });

  } catch (error) {
    console.log(error);
    res.send("Error generating reports: " + error.message);
  }
};


