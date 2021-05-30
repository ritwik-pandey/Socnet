const express = require('express');
const router = new express.Router();

const request = require('request');

router.post('/search' , (req , res) => {
    const url = "http://localhost:3000/search"
    request.post(
        url,
        {
            json: {
                username: req.body.user,
                cookie: req.cookies.jwt
            },
        },
        (error, response, body) => {
            if (error) {
                console.log(error)
            } else if (response.statusCode == 200) {
                res.status(200).send("Yes")
            } else if (response.statusCode == 404) {
                res.status(404).send();
            } else if (response.statusCode == 400) {
                res.send("Fail");
            }else if(response.statusCode == 401){
                    res.redirect('/login')
            }else{
                res.render('error');
            }
        }
    )
})

module.exports = router