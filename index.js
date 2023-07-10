require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const uuidv1 = require("uuid");
//const bodyParser = require(body - parser);
let meetingId = 1;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  if (req.method === "POST") {
    meetingId++;
  }
  next();
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

//app.use(express.static(process.env.PUBLIC_FOLDER));

app.get("/", (req, res) => {
  res.json("Wellcomw to the Express World");
});

app.post("/", (req, res) => {
  // const { name, id } = req.body;
  const { meetingName, call_back_url, recording_status } = req.body;

  //const call_back_url = "http://localhost:5173/thankyou";
  //const time_stamp = Date.now();
  const uuid_id = uuidv1.v1();
  const meetingLink = `localhost:5173/meeting/${meetingName}/${uuid_id}`;
  const call_back_url_res = call_back_url;
  const recording_status_res = recording_status;
  console.log(call_back_url_res, recording_status_res);

  res.json({
    meetingLink,
    // meeting_name: name,
    id: uuid_id,
    //create_at: time_stamp,
    //call_back_url: call_back_url,
    meetingId: meetingId,
  });
});

app.get("/test", (req, res) => {
  const dateTime = new Date();
  const userId = uuidv1.v1();
  //console.log("UserId", userId); `This is a get method for  test route  ,  datetime is  ${dateTime} and UserId is ${userId} `
  res.json({
    date: dateTime,
    user: userId,
  });
});

app.post("/test", (req, res) => {
  const { dateTime, name, userId } = req.body;
  const time = new Date().toUTCString();
  //console.log(time); `Name is :${name} , UserId : ${userId}  ,  dateTime ${dateTime} and time ${time} `

  res.json({
    Name: name,
    DateTime: dateTime,
    userId: userId,
  });
});

app.get("/api/users", (req, res) => {
  const { user_id, token, meetinglink } = req.query;
  res.json({
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
  console.log(req.nam);
  res.json("Hello " + req.name + "!!!");
});

// app.get("/api/:version", (req, res) => {
//   res.json({
//     version: req.params.version,
//   });
// });

app.listen(PORT, () => console.log(`Express running on the ${PORT} number`));
