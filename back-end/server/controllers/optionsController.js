import options from "../model/optionsModel.js";
const catchAsync = (fn) => {
   return (req, res, next) => {
      fn(req, res, next).catch((err) => next(err));
   };
};
export const getAllOptions = catchAsync(async (req, res) => {
   const Options = await options.find();
   console.log(Options);
   res.status(200).json({
      status: "success",
      hasError: false,
      Options,
   });
});
export const createOptions = catchAsync(async (req, res) => {
   const Options = await options.create({
      answer: req.body.answer,
      isCorrect: req.body.isCorrect,
      questionId: req.body.questionId,
   });
   res.status(201).json({
      status: "success",
      hasError: false,
      Options,
   });
});
export const getOptions = catchAsync(async (req, res) => {
   const Options = await options.findById(req.params.id);
   res.status(200).json({
      status: "fail",
      hasError: true,
      options,
   });
});
export const deleteOptions = catchAsync(async (req, res) => {
   const Options = await options.findByIdAndDelete(req.params.id);
   res.status(204).json({
      status: "success",
      hasError: false,
   });
});
