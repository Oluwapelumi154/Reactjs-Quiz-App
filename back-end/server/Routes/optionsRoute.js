import express from "express";
import * as optionController from "../controllers/optionsController.js";
const optionsRouter = express.Router();
optionsRouter
   .route("/")
   .post(optionController.createOptions)
   .get(optionController.getAllOptions);
optionsRouter
   .route("/:id")
   .get(optionController.getOptions)
   .delete(optionController.deleteOptions);
export default optionsRouter;
