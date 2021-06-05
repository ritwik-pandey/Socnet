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

router.get('/changeusername' , (req , res) => {
    const url = "http://localhost:3000/changeusername";
    request.post(
        url,
        {
            json: {
                cookie: req.cookies.jwt
            },
        },
        (error, response, body) => {
            if (error) {
                res.send(error);
            } else {
                if (response.statusCode == 200) {
                    res.render("changeusername" , {msg: ""})
                } else {
                    res.redirect('/login');
                }
            }
        }
    )
})

router.post('/changeusernamefinal' , (req, res) => {
    const url = "http://localhost:3000/changeusernamefinal";
    if(req.body.changeusernameinput === ''){
        res.render("changeusername" , {msg: "Not valid"})
    }else{
        request.post(
            url,
            {
                json: {
                    newusername: req.body.changeusernameinput,
                    cookie: req.cookies.jwt
                },
            },
            (error, response, body) => {
                if (error) {
                    res.send(error);
                } else {
                    if (response.statusCode == 200) {
                        res.clearCookie("jwt");
                        res.redirect('/login')
                    } else {
                        res.render("changeusername" , {msg: "Name already taken"})
                    }
                }
            }
        )
    }
})


module.exports = router