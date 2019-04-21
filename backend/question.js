const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const QuestionSchema = new Schema(
  {
    question: String,
    rank: Number
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Question", QuestionSchema, "questions");