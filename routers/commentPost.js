const express = require('express');
const router = new express.Router();

const cookieParser = require("cookie-parser");
const request = require('request');
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({
    extended: true
}));

router.use(cookieParser());


router.post('/comment' , (req , res) => {
    
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
                }else if(response.statusCode == 401){
                    res.redirect('/login');
                }else {
                    res.render('error');
                }
            }
        )
})



module.exports = router