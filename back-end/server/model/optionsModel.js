import mongoose from "mongoose";
const optionSchema = new mongoose.Schema({
   answer: { type: String, required: true },
   isCorrect: { type: Boolean },
   questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Questions",
      required: true,
   },
});
const options = mongoose.model("options", optionSchema);
export default options;
