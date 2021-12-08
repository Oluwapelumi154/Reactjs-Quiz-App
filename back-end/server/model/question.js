import mongoose from "mongoose";
const QuestionSchema = new mongoose.Schema(
   {
      title: { type: String },
      question: { type: String, required: true },
   },
   { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
QuestionSchema.virtual("answerOptions", {
   ref: "options",
   foreignField: "questionId",
   localField: "_id",
});

QuestionSchema.pre(/^find/, function (next) {
   this.populate({ path: "answerOptions", select: "-__v" });
   next();
});
const Questions = mongoose.model("Questions", QuestionSchema);

export default Questions;
