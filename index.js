require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const uuidv1 = require("uuid");
const db = require("./query");
//const bodyParser = require(body - parser);
let meeting_id = 1;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  if (req.method === "POST") {
    meeting_id++;
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

app.post("/", db.create_meeting);
//(req, res) => {
//   // const { name, id } = req.body;
//   const { meeting_name, callback_url, recording_status } = req.body;

//   //const callback_url = "http://localhost:5173/thankyou";
//   //const time_stamp = Date.now();
//   const meeting_uuid = uuidv1.v1();
//   const meeting_link = `https://vision.proteger.one/meeting/${meeting_uuid}`;
//   const dev_meeting_link = `localhost:5173/meeting/${meeting_uuid}`;
//   //const callback_url = callback_url;
//   //const recording_status_res = recording_status;
//   console.log(callback_url, recording_status);

//   res.json({
//     meeting_link,
//     dev_meeting_link,
//     meeting_name,
//     meeting_uuid,
//     //create_at: time_stamp,
//     //callback_url: callback_url,
//     meeting_id,
//   });
//});

// app.get("/meeting_details", (req, res) => {
//   const meeting_id = 12345;
//   const meeting_uuid = uuidv1.v1();
//   const meeting_link = `https://vision.proteger.one/meeting/${meeting_uuid}`;
//   const meeting_name = "geogo";
//   //const dev_meetingLink = `localhost:5173/meeting/${uuid_id}`;
//   res.json({
//     meeting_link,
//     meeting_name,
//     meeting_uuid,
//     meeting_id,
//   });
// });

// app.get("/meetings", db.get_meeting_details);
// app.get("/meeting/:id", db.get_meeting_details_by_id);
// app.post("/createmeeting", db.create_meeting);

post / create_meeting
app.get("/create_meeting", (req, res) => {
  const meeting_id = 12345;
  const meeting_uuid = uuidv1.v1();
  const meeting_link = `https://www.google.come`;
  const meeting_name = "geogo";

  res.json({
    meeting_name,
    meeting_uuid,
    meeting_id,
    meeting_link,
  });
});

app.post("/create_meeting/", (req, res) => {
  // const { name, id } = req.body;
  const { meeting_name, callback_url, recording_status } = req.body;
  //const callback_url = callback_url;
  //const recording_status_res = recording_status;
  console.log(callback_url, recording_status);

  //const callback_url = "http://localhost:5173/thankyou";
  //const time_stamp = Date.now();
  const meeting_uuid = uuidv1.v1();
  const meeting_link = `https://vision.proteger.one/meeting/${meeting_uuid}`;
  //const dev_meetingLink = `localhost:5173/meeting/${uuid_id}`;

  res.json({
    callback_url,
    recording_status,
    meeting_name,
    meeting_link,
    meeting_uuid,

    // dev_meetingLink,
    // meeting_name: meeting_name,
    //create_at: time_stamp,
    // callback_url: callback_url_res,
    // meetingId: meetingId,
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

// //target specificy a params using params functiion and this is the middleware
// app.param("name", (req, res, next, name) => {
//   const changeName = name.toUpperCase();
//   req.name = changeName;
//   next();
// });

// app.get("/api/users/:name", (req, res) => {
//   console.log(req.nam);
//   res.json("Hello " + req.name + "!!!");
// });

// app.get("/api/:version", (req, res) => {
//   res.json({
//     version: req.params.version,
//   });
// });

app.listen(PORT, () => console.log(`Express running on the ${PORT} number`));
