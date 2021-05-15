const express = require('express');
const router = new express.Router();
const bodyParser = require("body-parser");
const request = require('request');
var nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const saltRounds = 10;
var {randString , sendMail} = require("../functions/sendEmail");

router.use(bodyParser.urlencoded({
    extended: true
}));


router.get('/forgotpassword' , (req , res) => {
    res.render('forgotpassword' , {msg: "Please enter your details"})
})

var newpassword;

router.post('/forgotpassword' , (req , res) => {
    var email = req.body.email;
    var username = req.body.username;
    newpassword = req.body.password;
    let confirmpassword = req.body.confirmpassword
    if(newpassword != confirmpassword){
        res.render('forgotpassword' , {msg: "Password does not match"})
    }

    let url = "http://localhost:3000/forgotpassword";
    let result = false; 
    const uniqueString = randString()

    request.post(
        url,
        {
            json: {
                email: email,
                username: username,
                uniqueString: uniqueString
            },
        },
        (error, response, body) => {
            if (error) {
                console.log(error)
                res.render("forgotpassword" , {msg: "Error. Please try again"});
            } else {
                if (response.statusCode == 200) {
                    sendMail(email , uniqueString , "forgotpassword")
                    res.render("forgotpassword" , {msg: "Verification link sent"});
                } else {
                    console.log(body);
                    res.render("forgotpassword" , {msg: "Wrong details"});
                }
            }
        }
    )

})

router.get('/forgotpassword/:uniqueString' , async(req , res) => {
    const { uniqueString } = req.params
    const url = "http://localhost:3000/forgotpassword2";
    const hash = bcrypt.hashSync(newpassword, saltRounds);
    request.post(
        url,
        {
            json: {
                uniqueString: uniqueString,
                password: hash
                
            },
        },
        (error, response, body) => {
            if (error) {
                console.log(error)
                res.render("forgotpassword" , {msg: "Error. Please try again"});
            } else {
                if (response.statusCode == 200) {
                    res.redirect("/login");
                } else {
                    res.render("forgotpassword" , {msg: "Fail"});
                }
            }
        }
    )
})



module.exports = router