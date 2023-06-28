require("dotenv").config();
const express = require("express");
const app = express();

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
  res.send(`This is a test route `);
});

app.post("/test", (req, res) => {
  const { dateTime, name, userId } = req.body;

  res.json({ name, dateTime, userId });
});

app.listen(process.env.PORT, () =>
  console.log(`Express running on the ${process.env.PORT} number`)
);
