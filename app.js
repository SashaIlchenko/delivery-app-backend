const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require("dotenv").config();

const productsRouter = require('./routes/api/products');
const userOrderRouter = require('./routes/api/orders')
const authRouter = require('./routes/api/auth');
const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use('/api/products', productsRouter);
app.use('/api/orders', userOrderRouter);
app.use('/api/users', authRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message })
})

module.exports = app;
