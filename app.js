const express = require("express");
const { log } = require("node:console");
const https = require("node:https");
const bodyParcer = require("body-parser");
const { parse } = require("node:querystring");
require('dotenv').config();

const app = express();
app.use(bodyParcer.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
    // console.log(process.env.apikey);
})

app.post("/",function(req,res){
    var city = req.body.city;
    var lat
    var lon

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&appid=" + process.env.apikey;
    https.get(url,function(respond){
        respond.on("data",function(data){
            const Thedata = JSON.parse(data);
            console.log(Thedata);
            lon = Thedata.coord.lon
            lat = Thedata.coord.lat

            const murl = "https://api.openweathermap.org/data/2.5/weather?lat=" +lat+ "&lon=" + lon + "&units=metric&appid=" + process.env.apikey;
            https.get(murl,function (respond) { 

                respond.on("data",function(data){

                    const weatherData = JSON.parse(data);
                    console.log(weatherData);

                    const temp = weatherData.main.temp;  // jason viewer awesome
                    console.log(temp);

                    const desc = weatherData.weather[0].description;
                    console.log(desc);

                    res.write("<h1>The tempreture in " + city +" is : " + temp + " 0C </h1>");
                    res.write("<p>The weather is : "  + desc + "</p>");
                    const icon = weatherData.weather[0].icon;

                    const imgurl = " https://openweathermap.org/img/wn/"+ icon +"@2x.png";
                    res.write("<img src = "+ imgurl +">")
                    res.send;
                })
            })
        })
    })

    // const murl = "https://api.openweathermap.org/data/2.5/weather?lat=" +lat+ "&lon=" + lon + "&units=metric&appid=76e98d8b63b3fb9e1f8f8b2c4507ad22";
    // https.get(murl,function (respond) { 

    //     respond.on("data",function(data){

    //         const weatherData = JSON.parse(data);
    //         console.log(weatherData);

    //         const temp = weatherData.main.temp;  // jason viewer awesome
    //         console.log(temp);

    //         const desc = weatherData.weather[0].description;
    //         console.log(desc);

    //         res.write("<h1>The tempreture in zocca is : " + temp + " 0C </h1>");
    //         res.write("<p>The weather is : "  + desc + "</p>");
    //         const icon = weatherData.weather[0].icon;

    //         const imgurl = " https://openweathermap.org/img/wn/"+ icon +"@2x.png";
    //         res.write("<img src = "+ imgurl +">")
    //         res.send;
    //     })
    // })
})

// in  order to use api we use native (inbuilt) https module of node
// https.get(url) will get all the data from the provided api url all the stuff
// in order to tap into the actual data we use .on()method
// respond.on("data",function(data)) will give the neccessary data to us in a hexadecimal format
// to convert  the hexa format to java object we use parse();

// app.get("/",function(req,res){
//     const url = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&units=metric&appid=76e98d8b63b3fb9e1f8f8b2c4507ad22";
//     https.get(url,function(respond){
//         console.log(respond.statusCode);
//         respond.on("data",function(data){
//             const weatherData = JSON.parse(data);
//             console.log(weatherData);
//             const temp = weatherData.main.temp;  // jason viewer awesome
//             console.log(temp);
//             const desc = weatherData.weather[0].description;
//             console.log(desc);
//             res.write("<h1>The tempreture in zocca is : " + temp + " 0C </h1>");
//             res.write("<p>The weather is : "  + desc + "</p>");
//             const icon = weatherData.weather[0].icon;
//             const imgurl = " https://openweathermap.org/img/wn/"+ icon +"@2x.png";
//             res.write("<img src = "+ imgurl +">")
//             res.send;
//             // res.send("The tempreture in zocca " + temp + "0C");
//         });

       
 // const obj = {
        //     name : "asssss",
        //     age : 3
        // }
        // console.log(JSON.stringify(obj));
//     });
// });

app.listen(3000,function(){
    console.log("server running at port 3000 ");
});