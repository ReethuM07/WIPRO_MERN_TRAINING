module.exports = (req, res, next) => {
  const token = req.headers["x-admin-token"];

  if (token !== "admin123") {
    return res.status(403).json({ error: "Admin access only" });
  }
  next();
};
