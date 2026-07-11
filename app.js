const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const AppError = require('./utils/AppError');
const categoryRouter = require('./routes/categoryRoutes');
const { connectDB } = require('./db/connect.js');
const productRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config/config');
dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/orders', orderRouter);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;