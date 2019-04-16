const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const ForumSchema = new Schema(
  {
    title: String,
    posts: Array,
    users: Array,
    endorsed: Number,
    class: String
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Forum", ForumSchema, "forums");