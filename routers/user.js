require('dotenv').config()
const express = require('express');
const router = new express.Router();
const bodyParser = require("body-parser");
const request = require('request');
var nodemailer = require("nodemailer");
var xoauth2 = require('xoauth2');

router.use(bodyParser.urlencoded({
    extended: true
}));

var email;

router.post('/signup', (req, res) => {
    console.log(req.body);
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.render('signup', { msg: "Please enter all details" });
    } else {
        const username = req.body.username;
        const password = req.body.password;
        email = req.body.email;

        const url = "http://localhost:3000/users";
        const uniqueString = randString()
        sendMail(email , uniqueString)
        request.post(
            url,
            {
                json: {
                    email: email,
                    username: username,
                    password: password,
                    confirmed: false,
                    uniqueString: uniqueString
                },
            },
            (error, response, body) => {
                if (error) {
                    console.log(error)
                    res.render("signup", { msg: "Error! Please try again" });
                } else {
                    if (response.statusCode == 200) {
                        res.render("signup", { msg: "Success" });
                    } else {
                        res.render("signup", { msg: body });
                    }
                }
            }
        )
    }

})

const randString = () => {
    const len = 8;
    let randStr = '';
    for(let i = 0 ; i < len ; ++i){
        const ch = Math.floor((Math.random() * 10) + 1)
        randStr += ch;
    }
    return randStr;
}


const sendMail = (email , uniqueString) => {
    var Transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "ritwikdevelopment@gmail.com",
            pass: process.env.PASSWORD
        }
    });
    var mailOptions;
    let sender = "ritwikdevelopment@gmail.com";
    mailOptions = {
        from: sender,
        to: email,
        subject: "Email conformation",
        html: `Press <a href=http://localhost:4000/verify/${uniqueString}> here </a> to verify your email. Thanks`
    }
    Transport.sendMail(mailOptions , function(error , response) {
        if(error){
            console.log(error);
        }else{
            console.log("Message sent");
        }
    });
}

router.get('/verify/:uniqueString' , async (req,res) => {
    const { uniqueString } = req.params
    const user = users.where('UniqueString', '==', uniqueString);
    if(user) {
        const res = await user.update({
            confirmed: true    
        });
    }else{
        console.log("User not found");
    }
})


router.get("/signup", (req, res) => {
    res.render("signup", { msg: " " });
})

router.get("/login", (req, res) => {
    res.render("login");
})

module.exports = router