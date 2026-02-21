const express = require('express');

const app = express();
const PORT = 4000;

// Logger Middleware
app.use((req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] [${req.method}] ${req.url}`);
  next();
});

app.get('/products', (req, res) => {
  res.send('Products Page');
});

app.get('/status', (req, res) => {
  res.send('Status Page');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
