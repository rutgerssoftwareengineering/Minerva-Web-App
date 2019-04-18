const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const User = require("./user");
const Quiz = require("./quiz");
const Forum = require("./forum");
const CompletedQuiz = require("./completedquiz")
const Grade = require("./Grade")
const QuizTemplate = require("./quiz-template")
const announcements = require("./routes/api/announcements")

const API_PORT = 3001;
const app = express();
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(bodyParser.json());
const dbRoute = "mongodb+srv://minerva:minerva@minerva-c20xu.mongodb.net/minerva";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

router.get("/searchForum", (req, res) => {
  Forum.find({
    'title': {$regex: ".*" + req.query.title + ".*", $options: 'i'},
    'class': req.query.class
  },
    (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});


router.post("/updateQuiz", (req, res) => {
  
  const { quizTitle, problems, timeLimit, date, id} = req.body;
  
  
  QuizTemplate.findOneAndUpdate({"_id": id}, {$set: {"quizTitle": quizTitle, 
                                            "problems": problems, 
                                            "timelimit": timeLimit, 
                                            "date": date}},
                                            err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.get("/getGrades", (req, res) => {
  Grade.find({
    'classid': {$in:req.query.classes}
  },
    (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get("/loginUser", (req, res) => {
  User.find({
    'id': req.query.id,
    'password': req.query.password
  },
  (err, data) => {
    if(err) return res.json({ success: false, error: err });
    if(data.length === 0){
      return res.json([{success: false}])
    }
    return res.json({success: true, data: data});
  });
});

// this is our get method
// this method fetches all available data in our database
router.get("/getUsers", (req, res) => {
  User.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get("/getQuizzes", (req, res) => {
  Quiz.find({
    'class': req.query.class
    }, 
    (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get("/getForums", (req, res) => {
  Forum.find({
    'class': req.query.class
  },
  (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get("/getCompletedQuizzes", (req, res) => {
  CompletedQuiz.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post("/registerUser", (req, res) => {
  let user = new User();
  
  const { name, id, password } = req.body;
  if ((!name) || !id|| (!password)) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  user.name = name;  
  user.id = id;
  user.password = password;
  user.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post("/submitQuizT", (req, res) => {
  let quiz = new QuizTemplate();
  
  const { quizTitle, problems, timeLimit, date , className, quizType} = req.body;
  
  quiz.quizTitle = quizTitle;  
  quiz.problems = problems;
  quiz.timelimit = timeLimit;
  quiz.date = date;
  quiz.class = className;
  quiz.quizType = quizType;
  quiz.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post("/submitQuizS", (req, res) => {
  let quiz = new CompletedQuiz();
  const { id, quizId, score } = req.body;
  if ((!id && id !== 0) || !quizId || (!score && score !== 0)) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  quiz.id = id;  
  quiz.quizId = quizId;
  quiz.score = score;
  quiz.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post("/submitThread", (req, res) => {
  let thread = new Forum();
  const title = req.body.title
  const posts = req.body.posts 
  const users = req.body.users
  const classId = req.body.class
  /*if ((!id && id !== 0) || !quizId || (!score && score !== 0)) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }*/
  thread.title = title;  
  thread.posts[0] = posts;
  thread.users[0] = users;
  thread.endorsed = "2";
  thread.class = classId;
  thread.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete("/deleteQuiz", (req, res) => {
  var id = req.body.id;
  console.log("delete " + id);

  QuizTemplate.findOneAndDelete({"_id": id},
                                            err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
})

router.post("/registerClass", (req,res) => {
  const Uid = req.body.id;
  const newClasses = { classes: req.body.newClasses}
  console.log(newClasses)
  User.findOneAndUpdate({id: Uid}, newClasses, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);

app.use("/api/announcements", announcements);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));