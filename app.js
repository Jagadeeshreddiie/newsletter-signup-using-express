const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var mail = req.body.mail;
    var data = {
        members: [
            {   email_address: mail,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname,
                }}]};
    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us11.api.mailchimp.com/3.0/lists/664b9dba38",
        method: "POST",
        headers: {
            "Authorization": "jagadeesh1432 9eba8ab2e82a673581b9905cfd9ce8d0-us11"
        },
        body: jsonData,
    };
    request(options, function (error, response, body) {
        if (error) {
            res.sendFile(__dirname + "/error.html");
        }
        else {
            if (response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
            }
            else {
                res.sendFile(__dirname + "/error.html");
            }
        }
    });
});

app.post('/failure',function(req,res){
    res.redirect('/');
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is started at localhost:3000 ..");
});

// Api Key
// 78e8855d5c3d49fa7a8306878a42ef57-us11

// list id
// 664b9dba38
