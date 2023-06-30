require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const uuidv1 = require("uuid");
//const bodyParser = require(body - parser);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(express.static(process.env.PUBLIC_FOLDER));

app.get("/", (req, res) => {
  res.json("Wellcomw to the Express World");
});

app.post("/", (req, res) => {
  res.send("This is a post route in homepage");
});

app.get("/test", (req, res) => {
  const dateTime = new Date();
  const userId = uuidv1.v1();
  console.log("UserId", userId);
  res.send(
    `This is a get method for  test route  ,  datetime is  ${dateTime} and UserId is ${userId} `
  );
});

app.post("/test", (req, res) => {
  const { dateTime, name, userId } = req.body;
  const time = new Date().toUTCString();
  console.log(time);

  res.send(
    `Name is :${name} , UserId : ${userId}  ,  dateTime ${dateTime} and time ${time} `
  );
});

app.get("/api/users", (req, res) => {
  const { user_id, token, meetinglink } = req.query;
  res.send({
    "user Id ": user_id,
    "Token ": token,
    "MeetingLink:": meetinglink,
  });
});

//target specificy a params using params functiion and this is the middleware 
app.param("name", (req, res, next, name) => {
  const changeName = name.toUpperCase();
  req.name = changeName;
  next();
});

app.get("/api/users/:name", (req, res) => {
  res.send("Hello " + req.name + "!!!");
});

app.get("/api/:version", (req, res) => {
  res.send({
    version: req.params.version,
  });
});

app.listen(PORT, () => console.log(`Express running on the ${PORT} number`));
