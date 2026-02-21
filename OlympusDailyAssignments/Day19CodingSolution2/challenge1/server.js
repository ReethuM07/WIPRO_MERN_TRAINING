const express = require('express');

const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
  res.send('Welcome to SkillSphere LMS API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
