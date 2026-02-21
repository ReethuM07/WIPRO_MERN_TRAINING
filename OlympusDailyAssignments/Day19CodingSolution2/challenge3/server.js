const express = require('express');

const app = express();
const PORT = 4000;

// Route Middleware
const validateCourseId = (req, res, next) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid course ID' });
  }

  next();
};

app.get('/courses/:id', validateCourseId, (req, res) => {
  res.json({
    id: req.params.id,
    name: 'React Mastery',
    duration: '6 weeks'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
