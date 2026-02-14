let lastRequestTime = {};

module.exports = (req, res, next) => {
  const now = Date.now();
  const ip = req.ip;

  if (lastRequestTime[ip] && now - lastRequestTime[ip] < 3000) {
    return res.status(429).json({ error: "Too many requests" });
  }

  lastRequestTime[ip] = now;
  next();
};
