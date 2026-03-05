const express = require('express');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());
app.use(authRoutes);
app.use(productRoutes);

module.exports = app;