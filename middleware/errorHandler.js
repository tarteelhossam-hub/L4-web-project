const AppError = require('./../utils/AppError');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = { ...err };
  error.message = err.message;

  if (err.code === 11000 || (err.name === 'MongoServerError' && err.message.includes('E11000'))) {
    error.statusCode = 400;
    error.message = 'Duplicate field value. Please use another value!';
  }

  res.status(error.statusCode).json({
    status: err.status,
    message: error.message,
    stack: err.stack
  });
};