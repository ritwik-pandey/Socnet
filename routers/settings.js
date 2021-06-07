const express = require('express')
const router = new express.Router();
const cookieParser = require("cookie-parser");
const request = require('request');

router.use(cookieParser());

router.get('/settings' , (req , res) => {
    const url = "http://localhost:3000/settings";
    request.post(
        url,
        {
            json: {
                cookie: req.cookies.jwt
            },
        },
        (error, response, body) => {
            if (error) {
                console.log(error)
                res.render("forgotpassword" , {msg: "Error. Please try again"});
            } else {
                if (response.statusCode == 200) {
                    res.render("settings")
                } else {
                    res.redirect('/login');
                }
            }
        }
    )
})


module.exports = router