const express = require("express");
var nodemailer = require("nodemailer");
const userRouter = require('./routers/user')
const ejs = require("ejs");

const app = express();

app.use(express.static("public"));
app.use(userRouter)
app.set('view engine', 'ejs');


app.use(userRouter)


app.listen(4000, function () {
  console.log("Server is running on port 4000.");
});