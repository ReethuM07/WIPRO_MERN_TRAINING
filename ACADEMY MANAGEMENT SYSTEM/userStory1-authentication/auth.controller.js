const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.showLogin = (req, res) => {
  res.render('login');
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });

  if (!user) return res.send("Invalid Username");

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.send("Invalid Password");

  req.session.user = {
    id: user.id,
    role: user.role
  };

  if (user.role === 'admin') {
    res.redirect('/admin/dashboard');
  } else {
    res.redirect('/instructor/dashboard');
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};