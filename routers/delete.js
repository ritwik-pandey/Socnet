const express = require('express')
const router = new express.Router();
const cookieParser = require("cookie-parser");
const request = require('request');
const bodyParser = require("body-parser");


router.use(bodyParser.urlencoded({
    extended: true
}));


router.use(cookieParser());

router.get('/deleteProfile' , (req , res) => {
    const url = "http://localhost:3000/deleteProfile"
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
            } else if (response.statusCode == 200) {
                res.render('delete' , {name: response.body});
            } else if (response.statusCode == 404) {
                res.render('error');
            } else if (response.statusCode == 401) {
                res.redirect('/login');
            } else {
                res.render('error');
            }
        }
    )
})

router.post('/deleteProfileFinal' , (req , res) => {
    const url = "http://localhost:3000/deleteProfileFinal"
    request.post(
        url,
        {
            json: {
                input: req.body.inputdelete,
                cookie: req.cookies.jwt
            },
        },
        (error, response, body) => {
            if (error) {
                console.log(error)
            } else if (response.statusCode == 200) {
                res.clearCookie("jwt");
                res.redirect('/login')
            } else if (response.statusCode == 404) {
                res.render('error');
            } else if (response.statusCode == 401) {
                res.redirect('/login');
            } else {
                res.render('error');
            }
        }
    )
})

router.post('/deletepost' , (req, res) => {
    const url = "http://localhost:3000/deletepost"
    request.post(
        url,
        {
            json: {
                id: req.body.id,
                user: req.body.user,
                cookie: req.cookies.jwt
            },
        },
        (error, response, body) => {
            if (error) {
                console.log(error)
            } else if (response.statusCode == 200) {
                res.status(200).send()
            } else if (response.statusCode == 404) {
                res.render('error');
            } else if (response.statusCode == 401) {
                res.redirect('/login');
            } else {
                res.send('error');
            }
        }
    )
})

module.exports = router