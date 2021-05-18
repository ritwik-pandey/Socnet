const express = require('express');
const router = new express.Router();
const bodyParser = require("body-parser");
const request = require('request');
const cookieParser = require("cookie-parser");
router.use(cookieParser());


router.get('/logout', (req, res) => {
    try {
        res.clearCookie("jwt");
        res.send("Success")
    }catch(e){
        res.send("Fail")
    }
    
})

router.get('/:username', (req, res) => {
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
            } else {
                res.send(response.body);
            }
        }
    )
})


module.exports = router