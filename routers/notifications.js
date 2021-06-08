const express = require('express');
const router = new express.Router();
const cookieParser = require("cookie-parser");
const request = require('request');

router.use(cookieParser());

router.get('/notifications' , (req,res) => {
    const url = "http://localhost:3000/notifications"
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
                res.render('notifications' , {arr: response.body})
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


module.exports = router