const { Course } = require('../models');

exports.dashboard = async (req, res) => {
  const courses = await Course.findAll({
    where: { instructorId: req.session.user.id }
  });

  res.render('instructorDashboard', { courses });
};