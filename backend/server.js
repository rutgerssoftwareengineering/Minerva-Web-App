const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const User = require("./user");
const Quiz = require("./quiz");
const Forum = require("./forum");
const Question = require("./question")
const CompletedQuiz = require("./completedquiz")
const Grade = require("./Grade")
const QuizTemplate = require("./quiz-template")
const InclassQuizTemplate = require("./inclass-quiz-template")
const announcements = require("./routes/api/announcements")
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const { mongo, connection } = require('mongoose');

const io = require('socket.io')();


const API_PORT = 3001;
const app = express();
const router = express.Router();
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
var gfs
db.once("open", () => {
  console.log("connected to the database");
  gfs = Grid(db.db, mongoose.mongo);
  gfs.collection('uploads')
});


// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

const storage = require('multer-gridfs-storage')({
  url: dbRoute,
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: 'uploads'
    }
  }
});
const upload = multer({ storage: storage }).single('file')

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
  
  
  QuizTemplate.findOneAndUpdate({"_id": id}, 
  {$set: 
  { "quizTitle": quizTitle, 
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
    'classid': req.query.classes
  },
    (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get("/getFeedback", (req, res) => {
  Question.find(/*{
    'classid': req.query.classes
  },*/
    (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get("/loginUser", (req, res) => {
  User.find({ id: req.query.id }, function(err, user) {
    if (err) throw err;
    user[0].comparePassword(req.query.password, function(err, isMatch) {
        if (err) throw err;
        if(user.length === 0){
          return res.json([{success: false}])
        }
        return res.json({success: true, data: user});
    });
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

router.get("/getInclassQuizzes", (req, res) => {
  Quiz.find({
    'class': req.query.class,
    'quizType': 'inclass'
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

router.post("/removeClass", (req,res) => {
  const Uid = req.body.id;
  const newClasses = { classes: req.body.newClasses}
  console.log(newClasses)
  User.findOneAndUpdate({id: Uid}, newClasses, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// Socketio connection for in class feedback!
io.on('connection', (client) => {
  client.on('subscribeToGradeDataTimer', (inputData) => {
    console.log('client is subscribing to timer with interval for grade data collection', inputData.timer);
    setInterval(() => {
      Grade.find({
        'classid': inputData.class
      },
        (err, data) => {
        
        if (err) data = "Error";
        //console.log("retdata =", data);
        client.emit('timer', data);
      });
    }, inputData.timer);
  });
});

const port = 8000;
io.listen(port);
console.log('socket listening on port ', port);

router.post('/upload', upload, (req, res) => {
  if (req.file) {
    return res.json({
      success: true,
      file: req.file
    });
  }
  res.send({ success: false });
});

router.get('/getFiles', (req,res) => {
  gfs.files.find().toArray((err, files) => {
    if(!files || files.length === 0){
       return res.status(404).json({
          message: "Could not find files"
       });
    }
    return res.json(files);
});
})

router.delete('/deleteFile/:id', (req, res) => {
    gfs.remove({ _id: req.params.id, root:'uploads' }, (err) => {
      if (err) return res.status(500).json({ success: false })
      return res.json({ success: true });
    })
})

<<<<<<< HEAD
=======

>>>>>>> 838110e19b5d7461ee71ddafa5bee0499e706b5a
router.post("/submitInclassQuizData", (req, res) => {
  let quiz = new InclassQuizTemplate();
  
  const { classId, quizTitle, question, answers, responses, isActive} = req.body;

  InclassQuizTemplate.updateOne({"classId": classId, "quizTitle": quizTitle, "question": question},
    {"classId": classId, 
      "quizTitle": quizTitle, 
      "question": question, 
      "isActive": isActive, 
      "responses": responses, 
      "answers": answers},
    { upsert : true },
    err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  
});

router.post("/updateActiveInclassQuiz", (req, res) => {
  
  const {classId, quizTitle, question, isActive} = req.body;
  

  InclassQuizTemplate.findOneAndUpdate({"classId": classId, "quizTitle": quizTitle, "question": question}, 
  {$set: 
  { "isActive": isActive}},
  err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

<<<<<<< HEAD
router.get("/getInclassQuizResponseData", (req, res) => {
  Quiz.find({
    "classId": req.query.classId, 
    "quizTitle": req.query.quizTitle, 
    "question": req.query.question
    }, 
    (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

=======
>>>>>>> 838110e19b5d7461ee71ddafa5bee0499e706b5a
router.get("/downloadFile/:id", (req, res) => {
  console.log(req.params.id)
  gfs.exist({ _id: req.params.id, root:'uploads' }, function(err,found){
    console.log(found)
  })
  gfs.findOne({ _id: req.params.id, root:'uploads' }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        error: "That File Doesn't Exist"
      });
    }
    res.set({
      "Content-Disposition": `attachment; filename=${file.filename}`,
      "Content-Type": file.contentType,
      "fileName": file.filename
    });
      // Read output to browser
      const readstream = gfs.createReadStream({
        _id: req.params.id,
        root:'uploads'
      });
      readstream.pipe(res);
  });
});
// append /api for our http requests
app.use("/api", router);

app.use("/api/announcements", announcements);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));