const express = require('express');
const router = new express.Router();
const bodyParser = require("body-parser");
const request = require('request');
const cookieParser = require("cookie-parser");
router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());


router.get('/logout', (req, res) => {
    try {
        res.clearCookie("jwt");
        res.send("Success")
    } catch (e) {
        res.send("Fail")
    }

})

router.post('/follow', (req, res) => {
    const url = "http://localhost:3000/follow"
    request.post(
        url,
        {
            json: {
                username: req.body.clickedid,
                cookie: req.cookies.jwt
            },
        },
        (error, response, body) => {
            if (error) {
                console.log(error)
            } else if (response.statusCode == 200) {
                res.redirect("/" + req.body.clickedid)
            } else if (response.statusCode == 404) {
                res.render('error');
            } else if (response.statusCode == 400) {
                res.send("Fail");
            } else {
                res.redirect('/login');
            }
        }
    )
})

router.post('/unfollow', (req, res) => {
    const url = "http://localhost:3000/unfollow"
    request.post(
        url,
        {
            json: {
                username: req.body.clickedid,
                cookie: req.cookies.jwt
            },
        },
        (error, response, body) => {
            if (error) {
                console.log(error)
            } else if (response.statusCode == 200) {
                res.redirect("/" + req.body.clickedid)
            } else if (response.statusCode == 404) {
                res.render('error');
            } else if (response.statusCode == 400) {
                res.send("Fail");
            } else {
                res.redirect('/login');
            }
        }
    )
})

router.get('/:username', (req, res) => {
    if (req.url != '/favicon.ico') {
        const url = "http://localhost:3000/" + req.params.username
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
                    res.render("profile", {
                        username: response.body.user.username,
                        followers: response.body.user.followers.length,
                        following: response.body.user.following.length,
                        posts: response.body.user.posts.length,
                        isFollowing: response.body.isFollowing
                    });

                } else if (response.statusCode == 404) {
                    res.render('error');
                } else {
                    res.redirect('/login');
                }
            }
        )
    } else {
        console.log("Fav");
    }
})


module.exports = router