const jwt = require("jsonwebtoken");

const SECRET_KEY = "admin_secret_key";

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Token missing");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).send("Invalid or expired token");
  }
}

module.exports = { auth, SECRET_KEY };
