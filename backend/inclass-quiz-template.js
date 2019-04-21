const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const InclassQuizTemplateSchema = new Schema(
  {
    classId: String,
    quizTitle: String, 
    question: String,
    answers: Array,
    responses: Array,
    isActive: Boolean
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
// 
module.exports = mongoose.model("InclassQuizTemplate", InclassQuizTemplateSchema, "inClassQuiz");