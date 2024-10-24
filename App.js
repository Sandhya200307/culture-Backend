const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.json());

// API endpoint to calculate the total value of products
app.post('/api/products/total', async (req, res) => {
  const products = req.body.products;

  if (!Array.isArray(products)) {
    return res.status(400).json({ error: 'Products should be an array' });
  }

  try {
    const totalValue = products.reduce((acc, product) => {
      const productValue = product.price * product.quantity;
      return acc + productValue;
    }, 0);

    return res.json({ totalValue });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
