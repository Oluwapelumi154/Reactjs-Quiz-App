import Users from "../model/userModel.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import userRoute from "../Routes/userRoute.js";
const catchAsync = (fn) => {
   return (req, res, next) => {
      fn(req, res, next).catch((err) => next(err));
   };
};
export const token = (user) => {
   return jwt.sign(
      {
         _id: user._id,
         email: user.email,
         firstName: user.firstName,
         lastName: user.lastName,
      },
      process.env.JWT_SECRET_KEY,
      {
         expiresIn: "40m",
      }
   );
};
export const loginAccount = catchAsync(async (req, res, next) => {
   const { email, password } = req.body;
   if (!email || !password) {
      return next(new AppError("Kindly provide the required fields", 400));
   }
   const user = await Users.findOne({ email }).select("+password");
   if (!user || !(await user.comparePassword(password, user.password))) {
      return next(new AppError("Incorrect Email or password", 401));
   }
   res.status(200).json({
      status: "success",
      statusCode: 200,
      user,
      email: user.email,
      firstName: user.firstName,
      hasError: false,
      message: "login Successfully",
      token: token(user),
   });
});
export const protect = catchAsync(async (req, res, next) => {
   let token;
   if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
   ) {
      token = req.headers.authorization.split(" ")[1];
   }
   if (!token) {
      return next(
         new AppError(
            "You don't have access to perform this action login to gain access",
            403
         )
      );
   }
   const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_KEY
   );
   const user = await Users.findById(decoded._id);
   if (!user) {
      return next(
         new AppError("The user belonging to this token does not exist", 401)
      );
   }
   req.candidate = user;

   next();
});
