const express = require('express')
const router = new express.Router();
const cookieParser = require("cookie-parser");
const request = require('request');
const bodyParser = require("body-parser");


router.use(bodyParser.urlencoded({
    extended: true
}));

router.use(cookieParser());

router.get('/', (req, res) => {
    const url = "http://localhost:3000/"
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
                res.render('home', { arr: response.body })
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


module.exports = router