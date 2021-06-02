const express = require('express');
const router = new express.Router();

const request = require('request');

router.post('/share' , (req , res) => {
    const url = "http://localhost:3000/share"
    request.post(
        url,
        {
            json: {
                id: req.body.id,
                username: req.body.username,
                cookie: req.cookies.jwt
            },
        },
        (error, response, body) => {
            if (error) {
                console.log(error)
            } else if (response.statusCode == 200) {
                res.status(200).send()
            } else if (response.statusCode == 404) {
                res.status(404).send("ok");
            } else if (response.statusCode == 400) {
                res.status(400).send("ok");
            }else if(response.statusCode == 401){
                    res.redirect('/login')
            }else{
                res.render('error');
            }
        }
    )
})

module.exports = router