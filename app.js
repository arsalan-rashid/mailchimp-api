//jshint esversion: 6

const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;

var data = {
members:[
  {
    email_address:email,
    status:"subscribed",
    merge_fields:{
    FNAME: firstName,
    LNAME: lastName
      }
  }

]

};


const jsonData = JSON.stringify(data);

const url = "https://us19.api.mailchimp.com/3.0/lists/0ab1748971";

const options = {
  method:"POST",
  auth:"arsalan:355725a9f68c2618d66b20e6e8e6a9dd-us19"
};

const request = https.request(url,options,function(response){

if (response.statusCode === 200){
res.send ("Sucessfully Subscribed!");}
  else{
    res.send ("Error!");
  }



  response.on("data",function(data){
    console.log(JSON.parse(data));
  });
});

request.write(jsonData);
request.end();
});

app.listen(3000,function(){
  console.log("Server started on port 3000");
});


// 355725a9f68c2618d66b20e6e8e6a9dd-us19

// id: 0ab1748971

// https://usX.api.mailchimp.com/3.0/lists
