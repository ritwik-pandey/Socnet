const express = require('express');
const router = new express.Router();
const bodyParser = require("body-parser");
const request = require('request');



router.get('/:username', (req , res) => {
    const url = "http://localhost:3000/" + req.params.username
    request.post(
        url,
        {
            json: {
                user: req.params.username
            },
        },
        (error, response, body) => {
            if (error) {
                console.log(error)
                res.render("Fail!");
            } else {
                if (response.statusCode == 200) {
                    res.send(response.body)
                } else {
                    res.send(response.body);
                }
            }
        }
    )
})


module.exports = router