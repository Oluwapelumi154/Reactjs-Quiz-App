import AppError from "../utils/AppError.js";
const handleCastError = (err) => {
   const message = `Invalid ${err.path}: ${err.value}`;
   return new AppError(message, 400);
};
const handleValidationDbs = (err) => {
   const errors = Object.values(err.errors).map((el) => el.message);
   const message = `Kindly provide the required field`;
   return new AppError(message, 400);
};
const handleDuplicateFieldsDbs = (err) => {
   const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
   const message = `A user already exist with ${value}`;
   return new AppError(message, 400);
};
const handleJwtError = (err) => new AppError("Invalid Token", 401);
const handleTokenExpiredError = (err) => new AppError("Token Expired", 401);

const sendErrorDev = (err, res) => {
   return res.status(err.statusCode).json({
      status: err.status,
      hasError: true,
      statusCode: err.statusCode,
      stack: err.stack,
   });
};
const sendErrorProd = (err, res) => {
   if (err.isOperational) {
      return res.status(err.statusCode).json({
         status: err.status,
         hasError: true,
         statusCode: err.statusCode,
         message: err.message,
      });
   } else {
      res.status(500).json({
         status: "fail",
         message: "something went very wrong!",
      });
   }
};
const errorHandler = (err, req, res, next) => {
   err.statusCode = err.statusCode || 500;
   err.status = err.status || "error";
   if (process.env.NODE_ENV === "development") {
      sendErrorDev(err, res);
   } else if (process.env.NODE_ENV === "production") {
      if (err.name === "CastError") err = handleCastError(err);
      if (err.code === 11000) err = handleDuplicateFieldsDbs(err);
      if (err.name === "ValidationError") err = handleValidationDbs(err);
      if (err.name === "JsonWebTokenError") err = handleJwtError(err);
      if (err.name === "TokenExpiredError") err = handleTokenExpiredError(err);
      sendErrorProd(err, res);
   }
};

export default errorHandler;
