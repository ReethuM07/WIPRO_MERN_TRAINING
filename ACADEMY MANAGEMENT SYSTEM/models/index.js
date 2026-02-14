const sequelize = require('../config/db');

const User = require('./user.model');
const Course = require('./course.model');
const Student = require('./student.model');
const Profile = require('./profile.model');
const Enrollment = require('./enrollment.model');

//RELATIONSHIPS

// One-to-Many (Instructor -> Courses)
User.hasMany(Course, { foreignKey: 'instructorId' });
Course.belongsTo(User, { foreignKey: 'instructorId' });

// One-to-One (Student <-> Profile)
Student.hasOne(Profile);
Profile.belongsTo(Student);

// Many-to-Many (Student <-> Courses)
Student.belongsToMany(Course, { through: Enrollment });
Course.belongsToMany(Student, { through: Enrollment });

//Revenue Reporting
Enrollment.belongsTo(Course);
Course.hasMany(Enrollment);

sequelize.sync({ alter: true });

module.exports = {
  sequelize,
  User,
  Course,
  Student,
  Profile,
  Enrollment
};
