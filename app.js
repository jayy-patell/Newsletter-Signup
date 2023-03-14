//jshint esversion:6

const express = require("express");
const bodyParser=require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded( {extended: true} ));
app.use(express.static("public"));   //to apply css stylesheet

app.get("/", function(req, res){
  res.sendFile("/signup.html");
});

app.post("/", function(req,res){

  const firstName=req.body.fName;
  const lastName=req.body.lName;
  const email=req.body.email;

  const data = {
    members: [
      {
        email_address: email,       // use = and not :
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us12.api.mailchimp.com/3.0/lists/5182cfb781";
  const options = {
    method: "POST",
    auth: "jay1:e922c76b7a2a1fb89d4fb0c47112eb3b-us12",
  }

  const request = https.request(url, options, function(response){

    if (response.statusCode===200) {
      // res.sendFile(__dirname + "/success.html");
      console.log("DONE");
    } else{
      // res.sendFile(__dirname + "/failure.html");
      console.log("NOOOOOO");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

  console.log(firstName,lastName,email);
});

app.post("/failure", function(req,res){         //see the path of what is going to be posted.(NO .html)
  res.redirect("/")
})

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
})


//Mailchimp API key- e922c76b7a2a1fb89d4fb0c47112eb3b-us12
//Audience ID- 5182cfb781
