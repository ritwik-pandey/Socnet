const express = require('express');
const router = new express.Router();
const cookieParser = require("cookie-parser");
const request = require('request');
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({
    extended: true
}));

router.use(cookieParser());

router.post('/:username/posts', (req, res) => {
    if (req.url != '/favicon.ico') {
        const url = "http://localhost:3000/" + req.params.username + "/posts"
        request.post(
            url,
            {
                json: {
                    user: req.params.username,
                    cookie: req.cookies.jwt
                },
            },
            (error, response, body) => {
                if (error) {
                    console.log(error)
                } else if (response.statusCode == 200) {
                    res.status(200).send(response.body);
                } else if (response.statusCode == 404) {
                    res.render('error');
                }else if(response.statusCode == 401){
                    res.redirect('/login');
                }else {
                    res.render('error');
                }
            }
        )
    } else {
        console.log("fav");
    }
})

router.get('/compose', (req, res) => {
    const url = "http://localhost:3000/compose"
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
                res.render('compose' , {name: response.body})
            } else if (response.statusCode == 400) {
                res.send('Error');
            }else if(response.statusCode == 401){
                res.redirect('/login')
            }else{
                res.render('error');
            }
        }
    )
})

router.post('/compose' , (req , res) => {
    const url = "http://localhost:3000/composeposts"
    request.post(
        url,
        {
            json: {
                post: req.body.postBody,
                cookie: req.cookies.jwt
            },
        },
        (error, response, body) => {
            if (error) {
                console.log(error)
            } else if (response.statusCode == 200) {
                console.log(response.body);
                res.redirect("/" + response.body)
            } else if (response.statusCode == 400) {
                res.send('Error');
            }else if(response.statusCode == 401){
                res.redirect('/login')
            } else {
                res.render('error');
            }
        }
    )
})

module.exports = router