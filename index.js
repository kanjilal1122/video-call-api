//require("dotenv").config() ;
//process.env.PORT
const express = require("express");
const app = express();
const PORT = 8080;
const uuidv1 = require("uuid");
//const bodyParser = require(body - parser);

//middleware
app.use(express.json());
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

app.listen(PORT, () => console.log(`Express running on the ${PORT} number`));
