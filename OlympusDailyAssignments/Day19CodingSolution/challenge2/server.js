const express = require('express');

const app = express();
const PORT = 4000;

app.get('/products', (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.send('Please provide a product name');
  }

  res.send(`Searching for product: ${name}`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
