const express = require("express");
var nodemailer = require("nodemailer");
const userRouter = require('./routers/user')
const passwordRouter = require('./routers/forgotpassword')
const profileRouter = require('./routers/profile')
const ejs = require("ejs");

const app = express();

app.use(express.static("public"));
app.use(userRouter)
app.use(passwordRouter)
app.use(profileRouter)
app.set('view engine', 'ejs');



app.listen(4000, function () {
  console.log("Server is running on port 4000.");
});