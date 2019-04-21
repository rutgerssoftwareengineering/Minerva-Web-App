const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const gradeSchema = new Schema(
  {
    classid: String,
    className: String,
    members: Array,
    grades: Array,
    feedback: Array
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Grade", gradeSchema, "grades");