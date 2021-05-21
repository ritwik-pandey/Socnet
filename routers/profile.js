const express = require('express');
const router = new express.Router();
const bodyParser = require("body-parser");
const request = require('request');
const cookieParser = require("cookie-parser");
router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());


//Logout

router.get('/logout', (req, res) => {
    try {
        res.clearCookie("jwt");
        res.redirect("/login")
    } catch (e) {
        res.send("Fail")
    }

})

//Follow

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

//Unfollow

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

//Get followers

router.post('/:username/followers', (req, res) => {
    if (req.url != '/favicon.ico') {
        const url = "http://localhost:3000/" + req.params.username + "/followers"
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
                } else {
                    res.redirect('/login');
                }
            }
        )
    } else {
        console.log("Fav");
    }
})

router.post('/:username/following', (req, res) => {
    if (req.url != '/favicon.ico') {
        const url = "http://localhost:3000/" + req.params.username + "/following"
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
                } else {
                    res.redirect('/login');
                }
            }
        )
    } else {
        console.log("Fav");
    }
})

router.get('/me' , (req , res) => {
    const url = "http://localhost:3000/me"
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
                    console.log(response.body);
                    res.redirect('/' + response.body)
                } else if (response.statusCode == 404) {
                    res.render('error');
                } else {
                    res.redirect('/login');
                }
            }
        )
})

//Get profile

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