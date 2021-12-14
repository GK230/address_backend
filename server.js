const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/add", (req, res) => {
  console.log(req.body);
});

app.listen(4000, function () {
  console.log("listening on 4000");
});
