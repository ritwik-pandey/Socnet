const nodemailer = require('nodemailer')

//Create random string
const randString = () => {
    const len = 100;
    let randStr = '';
    for(let i = 0 ; i < len ; ++i){
        const ch = Math.floor((Math.random() * 10) + 1)
        randStr += ch;
    }
    return randStr;
}

//Send mail
const sendMail = (email , uniqueString) => {
    var Transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "ritwikdevelopment@gmail.com",
            pass: process.env.PASSWORD
        }
    });
    var mailOptions;
    let sender = "ritwikdevelopment@gmail.com";
    mailOptions = {
        from: sender,
        to: email,
        subject: "Email conformation",
        html: `<h1>Press <a href=http://localhost:4000/verify/${uniqueString}> here </a> to verify your email. Thanks</h1>`
    }
    Transport.sendMail(mailOptions , function(error , response) {
        if(error){
            console.log(error);
        }else{
            console.log("Message sent");
        }
    });
}

module.exports = { randString, sendMail };