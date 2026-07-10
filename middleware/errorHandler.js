
// middleware/errorHandler.js

const sendErrorDev = (err, res) => {
  // السر هنا: لازم يقرا الـ statusCode اللي جاي بعد التعديل
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

// الميدل وير المركزي في آخر الملف
module.exports = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.stack = err.stack;

  // قفش نوع الخطأ وتعديله
  if (err.name === 'CastError') error = handleCastErrorDB(err);
  if (err.code === 11000) error = handleDuplicateFieldsDB(err);
  if (err.name === 'ValidationError') error = handleValidationErrorDB(err);

  // تأكيد نقل الـ Status Code للـ error المعدل، وإذا مفيش ياخد statusCode الخطأ الأصلي أو 500
  error.statusCode = error.statusCode || err.statusCode || 500;
  error.status = error.status || err.status || 'error';

  if (process.env.NODE_ENV === 'production') {
    sendErrorProd(error, res);
  } else {
    // السحر هنا: بنمرر الـ error (المعدل) مش الـ err (الأصلي الكراش)
    sendErrorDev(error, res); 
  }
};