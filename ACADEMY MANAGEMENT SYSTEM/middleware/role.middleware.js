exports.authorizeRole = (role) => {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    if (req.session.user.role !== role) {
      return res.send("Access Denied");
    }

    next();
  };
};