const express = require('express');

const app = express();
const PORT = 4000;

app.get('/courses/:id', (req, res) => {
  res.json({
    id: req.params.id,
    name: 'React Mastery',
    duration: '6 weeks'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
