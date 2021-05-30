const express = require('express');
const router = new express.Router();

const cookieParser = require("cookie-parser");

router.use(cookieParser());
const request = require('request');
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({
    extended: true
}));


router.post('/comment', (req, res) => {

    const url = "http://localhost:3000/comment"
    request.post(
        url,
        {
            json: {
                id: req.body.id,
                user: req.body.username,
                comment: req.body.comment,
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
            } else if (response.statusCode == 401) {
                res.redirect('/login');
            } else {
                res.render('error');
            }
        }
    )
})

router.post('/seelikesandcomments', (req, res) => {
    const url = "http://localhost:3000/seelikesandcomments"
    request.post(
        url,
        {
            json: {
                id: req.body.id,
                user: req.body.username,
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
            } else if (response.statusCode == 401) {
                res.redirect('/login');
            } else {
                res.render('error');
            }
        }
    )
})

router.post('/cookieLikesAndComments', (req, res) => {
    try {
        let obj = JSON.parse(req.body.likesandcomments);
        let cookie = obj.details.usersLiked
        res.cookie("usersLiked", cookie, {
            expires: new Date(Date.now() + 6000000),
            httpOnly: true
        });
        let cookie2 = obj.details.usersComments
        res.cookie("usersCommented", cookie2, {
            expires: new Date(Date.now() + 6000000),
            httpOnly: true
        });
        res.status(200).send()
    } catch (e) {
        console.log(e);
    }
})

router.get('/getlikes' , (req , res) => {
    res.status(200).send(req.cookies.usersLiked);
})

router.get('/getcomments' , (req ,res) => {
    res.status(200).send(req.cookies.usersCommented)
})

router.get('/destroycookies' , (req , res) => {
    try {
        res.clearCookie("usersLiked");
        res.clearCookie("usersCommented");
        res.status(200).send()
    } catch (e) {
        res.send("Fail")
    }
})


module.exports = router