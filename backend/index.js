const express = require("express");
const path = require("path");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const wakeDyno = require("woke-dyno");
const compression = require("compression");
require("dotenv").config();
const mongoose = require("mongoose");
const passport = require("passport");

const Course = require("./routes/api/Course");
const CourseMedia = require("./routes/api/CourseMedia");
const User = require("./routes/api/User");
const Quiz = require("./routes/api/Quiz");
const Tag = require("./routes/api/Tag");


const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const mongooseOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  };

  mongoose
    .connect(process.env.MONGO_URI, mongooseOptions)
    .then(() => console.log("DB connected")).catch((err)=>console.log(err))

  mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`);
  });
  require("./config/passport")(passport);

  const app = express();
  app.use(compression());

  app.use(express.json({ limit: "50mb" }));

  app.use("/api/course", Course);
  app.use("/api/coursemedia", CourseMedia);
  app.use("/api/user", User);
  app.use("/api/quiz", Quiz);
  app.use("/api/tag", Tag);


  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, "../frontend/build")));

  // // Answer API requests.
  // app.get("/api", function(req, res) {
  //   res.set("Content-Type", "application/json");
  //   res.send('{"message":"Hello from the custom server!"}');
  // });

  // All remaining requests return the React app, so it can handle routing.
  app.get("*", function(request, response) {
    response.sendFile(
      path.resolve(__dirname, "../frontend/build", "index.html")
    );
  });

  app.listen(PORT, function() {
    wakeDyno(process.env.DYNO_URL).start();
    console.error(
      `Node ${
        isDev ? "dev server" : "cluster worker " + process.pid
      }: listening on port ${PORT}`
    );
  });

  // var bodyParser = require('body-parser')
  // var jsonParser = bodyParser.json()
  // // recieve post data from client
  // app.post('/api/course/poohtest', jsonParser, (req, res) => {
  //   console.log("submission recieved")
  //   console.log(req.body)
    
  // })  


}

