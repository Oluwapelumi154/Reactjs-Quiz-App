import Questions from "../model/question.js";
import AppError from "../utils/AppError.js";
const catchAsync = (fn) => {
   return (req, res, next) => {
      fn(req, res, next).catch((err) => next(err));
   };
};
export const createQuestion = catchAsync(async (req, res) => {
   const question = await Questions.create({
      title: req.body.title,
      question: req.body.question,
   });
   res.status(201).json({
      status: "success",
      statusCode: 201,
      question,
   });
});
export const getAllQuestions = catchAsync(async (req, res) => {
   const questions = await Questions.find();

   console.log(questions);
   res.status(200).json({
      totalSize: questions.length,
      status: "success",
      statusCode: 200,
      questions,
   });
});
export const DeleteQuestions = catchAsync(async (req, res) => {
   const questions = await Questions.findByIdAndDelete(req.params.id);
   res.status(204).json({
      status: "success",
      statusCode: 200,
      questions,
   });
});
export const deleteAllQuestions = catchAsync(async (req, res) => {
   const questions = await Questions.deleteMany();
   res.status(204).json({
      status: "success",
      statusCode: 200,
      questions: null,
   });
});
