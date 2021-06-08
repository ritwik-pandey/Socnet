const express = require("express");
require('dotenv').config()
var nodemailer = require("nodemailer");
const homeRouter = require('./routers/home');
const userRouter = require('./routers/user');
const settingsRouter = require('./routers/settings');
const deleteRouter = require('./routers/delete');
const notificationRouter = require('./routers/notifications');
const passwordRouter = require('./routers/forgotpassword');
const profileRouter = require('./routers/profile');
const postsRouter = require('./routers/posts');
const viewPostRouter = require('./routers/viewPost');
const share = require('./routers/share');
const search = require('./routers/search');
const ejs = require("ejs");
const router = require("./routers/home");

const app = express();

app.use(express.static("public"));
app.use(homeRouter);
app.use(userRouter);
app.use(settingsRouter);
app.use(deleteRouter);
app.use(passwordRouter);
app.use(postsRouter);
app.use(notificationRouter);
app.use(viewPostRouter);
app.use(search);
app.use(share);
app.use(profileRouter);
app.set('view engine', 'ejs');


app.listen(4000, function () {
  console.log("Server is running on port 4000.");
});