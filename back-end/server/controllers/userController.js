import Users from "../model/userModel.js";
import { token } from "../controllers/AuthController.js";

const catchAsync = (fn) => {
   return (req, res, next) => {
      fn(req, res, next).catch((err) => next(err));
   };
};
export const getAllCandidates = catchAsync(async (req, res) => {
   const candidates = await Users.find();
   res.status(200).json({
      status: "success",
      data: candidates,
   });
});
export const createAccount = catchAsync(async (req, res) => {
   const candidate = await Users.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
   });
   console.log(candidate._id, "candidate");
   res.status(201).json({
      status: "success",
      statusCode: 201,
      hasError: false,
      userInfo: candidate,
      token: token(candidate),
   });
});
export const getUser = catchAsync(async (req, res) => {
   const candidate = await Users.findById(req.params.id);
   res.status(200).json({
      status: "success",
      statusCode: 200,
      hasError: false,
      candidate,
   });
});
export const updateCandidateData = catchAsync(async (req, res) => {
   const candidate = await Users.findByIdAndUpdate(
      req.params.id,
      {
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email,
         password: req.body.password,
      },
      {
         new: true,
         runValidators: true,
      }
   );
   res.status(200).json({
      status: "success",
      statusCode: 200,
      hasError: false,
      candidate,
   });
});
