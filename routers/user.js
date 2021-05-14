require('dotenv').config()
const express = require('express');
const router = new express.Router();
const bodyParser = require("body-parser");
const request = require('request');
var nodemailer = require("nodemailer");
var {randString , sendMail} = require("../functions/sendEmail");

router.use(bodyParser.urlencoded({
    extended: true
}));


// SIGN UP

router.post('/signup', (req, res) => {
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
                        res.render("signup", { msg: "Please verfiy your mail. Link was sent" });
                    } else {
                        res.render("signup", { msg: body });
                    }
                }
            }
        )
    }

})

//LOGIN

router.post('/login' , (req , res) => {
    let email = req.body.email
    let password = req.body.password
    const url = "http://localhost:3000/login";

    request.post(
        url,
        {
            json: {
                email: email,
                password: password
            },
        },
        (error, response, body) => {
            if (error) {
                console.log(error)
                console.log("error");
            } else {
                if (response.statusCode == 200) {
                    console.log("Access granted!");
                } else {
                    console.log("Access declined!");
                }
            }
        }
    )    
})

//Verify the code
router.get('/verify/:uniqueString' , async (req,res) => {
    const { uniqueString } = req.params
    const url = "http://localhost:3000/verify";
    request.post(
        url,
        {
            json: {
                uniqueString: uniqueString
            },
        },
        (error, response, body) => {
            if (error) {
                console.log(error)
                res.render("Fail!");
            } else {
                if (response.statusCode == 200) {
                    res.redirect("/login");
                } else {
                    res.redirect("/signup");
                }
            }
        }
    )
})

router.get("/signup", (req, res) => {
    res.render("signup", { msg: " " });
})

router.get("/login", (req, res) => {
    res.render("login");
})

module.exports = router