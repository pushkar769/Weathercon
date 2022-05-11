const express = require ('express')
const https = require('https')
const path = require('path')
const app = express();
const port = process.env.PORT || 5000
app.use(express.static('public'));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})


app.use(express.urlencoded({extended:true}));
app.post("/",function(req,res){
   
    
    const query=req.body.CityName;
    const apikey="c287affa8d6deda0f89339b7f05b788f"
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units=metric";
    https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherdata = JSON.parse(data);
        const weatherdescription = weatherdata.weather[0].description
        const imgk = weatherdata.weather[0].icon
        const imgurl = "https://openweathermap.org/img/wn/"+imgk+"@2x.png"
        const temp = weatherdata.main.temp
        // temp=Math.floor((temp-32)*5/9);
        res.write("<h1><center>The Temperature in "+query+" is "+ temp + " degree Celcius</center></h1><br>")
        res.write("<h1> <center>"+weatherdescription+ "</center> </h1>")
        res.write("<center><img src="+imgurl+"></center>");
        res.send();
    })
})


})





app.listen(port, function(){
    console.log("Server Started");
})