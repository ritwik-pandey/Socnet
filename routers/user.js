
const express = require('express');
const router = new express.Router();
const bodyParser = require("body-parser");
const request = require('request');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cookieParser = require("cookie-parser");
router.use(cookieParser());


var { randString, sendMail } = require("../functions/sendEmail");

router.use(bodyParser.urlencoded({
    extended: true
}));


// SIGN UP

router.post('/signup', (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.render('signup', { msg: "Please enter all details" });
    } else {
        const username = req.body.username;
        const password = req.body.password;
        email = req.body.email;

        const hash = bcrypt.hashSync(password, saltRounds);
        const emailhash = bcrypt.hashSync(email, saltRounds);


        const url = "http://localhost:3000/users";
        const uniqueString = randString()
        sendMail(email, uniqueString, "verify")
        request.post(
            url,
            {
                json: {
                    email: emailhash,
                    username: username,
                    password: hash,
                    confirmed: false,
                    uniqueString: uniqueString
                },
            },
            (error, response, body) => {
                if (error) {
                    console.log(error)
                    res.render("signup", { msg: "Error! Please try again" });
                } else {
                    if (response.statusCode == 200) {
                        res.render("signup", { msg: "Please verfiy your mail. Link was sent" });
                    } else {
                        res.render("signup", { msg: body });
                    }
                }
            }
        )
    }

})

//LOGIN

router.post('/login', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    const url = "http://localhost:3000/login";

    request.post(
        url,
        {
            json: {
                username: username,
                password: password
            },
        },
        (error, response, cookie) => {
            if (error) {
                console.log(error)
                console.log("error");
            } else {
                if (response.statusCode == 200) {
                    if(!req.cookies.jwt){
                        res.cookie("jwt", cookie , {
                            expires: new Date(Date.now() + 6000000),
                            httpOnly: true
                        });
                    }
                    res.redirect("/" + username)
                } else {
                    res.render("login" , {msglogin: "Wrong details"})
                }
            }
        }
    )
})

//Verify the code
router.get('/verify/:uniqueString', async (req, res) => {
    const { uniqueString } = req.params
    const url = "http://localhost:3000/verify";
    request.post(
        url,
        {
            json: {
                uniqueString: uniqueString
            },
        },
        (error, response, body) => {
            if (error) {
                console.log(error)
                res.render("Fail!");
            } else {
                if (response.statusCode == 200) {
                    res.redirect("/login");
                } else {
                    res.redirect("/signup");
                }
            }
        }
    )
})

router.get("/signup", (req, res) => {
    res.render("signup", { msg: "Please remember your username.It's only way you can login." });
})

router.get("/login", (req, res) => {
    res.render("login" , {msglogin: "Please login"});
})

module.exports = router