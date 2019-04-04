const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const QuizTemplateSchema = new Schema(
  {
    quizTitle: String, 
    problems: Array,
    timelimit: Number,
    date: String,
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
// 
module.exports = mongoose.model("QuizTemplate", QuizTemplateSchema, "quizzes");