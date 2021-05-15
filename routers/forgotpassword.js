const express = require('express');
const router = new express.Router();
const bodyParser = require("body-parser");
const request = require('request');
var nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.use(bodyParser.urlencoded({
    extended: true
}));


router.get('/forgotpassword' , (req , res) => {
    res.render('forgotpassword')
})

router.post('/forgotpassword' , (req , res) => {
    const email = req.body.email;
    const username = req.body.username;

    let url = "http://localhost:3000/forgotpassword";
    let result = false; 

    request.post(
        url,
        {
            json: {
                email: email,
                username: username,
            },
        },
        (error, response, body) => {
            if (error) {
                console.log(error)
                res.render("forgotpassword");
            } else {
                if (response.statusCode == 200) {
                    console.log("Fine");
                    result = true;
                } else {
                    console.log(body);
                    res.render("forgotpassword");
                }
            }
        }
    )

})


module.exports = router