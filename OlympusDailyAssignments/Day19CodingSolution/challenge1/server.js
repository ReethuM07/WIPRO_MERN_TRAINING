const express = require('express');

const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
  res.send('Welcome to Express Server');
});

app.get('/status', (req, res) => {
  res.json({
    server: 'running',
    uptime: 'OK'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
