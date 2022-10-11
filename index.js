const express = require('express');
const app = express();
const port = 3000;
const request = require('request');
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

var serviceAccount = require("./key.json");

initializeApp({
    credential: cert(serviceAccount),
}); 

const db = getFirestore();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/css',express.static(__dirname+'public/css'))
app.use('/img',express.static(__dirname+'public/img'))
app.use('/js',express.static(__dirname+'public/js'))
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("first")
 });

app.get("/signup", (req, res) => {
    res.render('signup');
 });
 



app.get('/signupsubmit', (req, res) => {
    
    const full_name = req.query.full_name;
    const last_name = req.query.last_name;
    const email = req.query.emil;
    const password = req.query.passwrd;
    
    //Adding data to the collection
    // sample comment
    db.collection('users')
    .add({
        name: full_name + last_name,
        email:email,
        password: password,
    })
    .then(() => {
        res.send("SignUP successfully");
    });
});

app.get("/signin", (req, res) => {
    res.render('signin');
 }); 

 app.get('/signinsubmit', (req, res) => {
    const email = req.query.emil;
    const password = req.query.passwrd;
    db.collection("users")
        .where("email", "==", email)
        .where("password", "==", password)
        .get()
        .then((docs) => {
            if(docs.size>0){
                res.render("hii2");
            }else{
                res.render("loginfailed");
            }
        
        });
 });

app.get("/movieinfo",(req,res)=>{
    res.render("movieinfo")
})

app.get("/searchmoviename",(req,res)=>{
    const moviename= req.query.moviename;
    var movieData = [];
    request("https://www.omdbapi.com/?t="+moviename+"&apikey=3389068b",function(error,response,body){
        if(JSON.parse(body).Response=="True"){
            var a = JSON.parse(body).Director;
            var b= JSON.parse(body).Title;
            var c = JSON.parse(body).Actors;
            var d= JSON.parse(body).Ratings[0].Value;
            var e= JSON.parse(body).Poster;
            var f= JSON.parse(body).Country;
            var g= JSON.parse(body).Awards;
            var h = JSON.parse(body).imdbRating;
            movieData.push(a);
            movieData.push(b);
            movieData.push(c);
            movieData.push(d);
            movieData.push(e);
            movieData.push(f);
            movieData.push(g);
            movieData.push(h);
            res.render("movieData",{userData: movieData},)
        /*    res.send(`Poster Image is ${e}<br><br>
            ${moviename}'s director is ${ a}<br><br>
            ${moviename}'s Title is ${b}<br> <br>
            Actors of the movie are ${c}<br><br>
            rating of the movie is ${d}<br> <br>
            Country is ${f}<br> <br>
            Awards fot this movie is ${g}<br> <br>
            IMDB Rating for the movie is ${h}`); */
            }
        else{
            res.render("movienameincorrect")

        }

    })
})
app.get("/carsinfo",(req,res)=>{
    res.render("carsinfo")
})
app.get("/carsdetailsubmit",(req,res)=>{
    var cararray = [];
    const carname = req.query.carname;
    console.log(carname);
    request({url: "https://newsapi.org/v2/everything?q="+carname+"&from=2022-10-08&sortBy=publishedAt&apiKey=dd3e0ad1bf3241e48c067fddb448707c", headers: {
    'User-Agent': 'request'
   }}, function (error, response, body) {
       if(JSON.parse(body).totalResults>0){
        var a= JSON.parse(body).articles[0].author;
        var b = JSON.parse(body).articles[0].url;
        var c = JSON.parse(body).articles[0].publishedAt;
        var d =JSON.parse(body).articles[1].author;
        var e = JSON.parse(body).articles[1].url;
        var f= JSON.parse(body).articles[1].publishedAt;
        var g= JSON.parse(body).articles[2].author;
        var h= JSON.parse(body).articles[2].url;
        var i = JSON.parse(body).articles[2].publishedAt;
        var j= JSON.parse(body).articles[3].author;
        var k= JSON.parse(body).articles[3].url;
        var l = JSON.parse(body).articles[3].publishedAt;
        var m= JSON.parse(body).articles[4].author;
        var n= JSON.parse(body).articles[4].url;
        var o = JSON.parse(body).articles[4].publishedAt;
        var p= JSON.parse(body).articles[5].author;
        var q= JSON.parse(body).articles[5].url;
        var r = JSON.parse(body).articles[5].publishedAt;
        var s= JSON.parse(body).articles[6].author;
        var t= JSON.parse(body).articles[6].url;
        var u = JSON.parse(body).articles[6].publishedAt;
        var v= JSON.parse(body).articles[7].author;
        var w= JSON.parse(body).articles[7].url;
        var x = JSON.parse(body).articles[7].publishedAt;
        cararray.push(a) ;cararray.push(b);cararray.push(c);cararray.push(d);cararray.push(e);cararray.push(f);cararray.push(g);cararray.push(h);cararray.push(i);cararray.push(j);cararray.push(k);cararray.push(l);cararray.push(m);cararray.push(n);cararray.push(o);cararray.push(p);cararray.push(q);cararray.push(r); cararray.push(s); cararray.push(t); cararray.push(u);cararray.push(v);cararray.push(w);cararray.push(x);

        console.log(cararray)
        res.render("carData",{userData2: cararray},)
       }
       else{
           res.render("carsdetailsincorrect");
       }
    });
}) 




app.get("/weatherinfo",(req,res)=>{
    res.render("weatherinfo.ejs");
})

app.get("/weatherinfosearch",function(req,res){
    var cityname = req.query.cityname;
    var weatherarrray=[];
    request("http://api.weatherapi.com/v1/current.json?key=2011281f54f3438799b90252222505&q="+cityname+"&aqi=nonewsapi.org",function(error,response,body){
       
     if(!error){
        var a1= cityname;
        console.log(JSON.parse(body))
        console.log(error);
        var a = JSON.parse(body).current.temp_c;
        var b = JSON.parse(body).current.condition.text;
        var c = JSON.parse(body).location.country;
        var d= JSON.parse(body).location.localtime;
        var e= JSON.parse(body).current.condition.icon;
        var f = JSON.parse(body).current.wind_mph;
        var g = JSON.parse(body).current.wind_kph;
        var h = JSON.parse(body).current.humidity;
        weatherarrray.push(a1);weatherarrray.push(a);weatherarrray.push(b);weatherarrray.push(c);weatherarrray.push(d);weatherarrray.push(e);weatherarrray.push(f);weatherarrray.push(g);weatherarrray.push(h);
        console.log(weatherarrray)
        res.render("weatherpage",{userData4 : weatherarrray},)
     }
     else{
         res.send("Heiii")
     }   
    })
})

app.get("/countryinfo",(req,res)=>{
    res.render("countryinfo");
})

app.get("/countryinfoarticle",(req,res)=>{
    var countryarray=[];
    const countryname = req.query.countryname;
    request({url: "https://newsapi.org/v2/top-headlines?country="+countryname+"&category=business&apiKey=dd3e0ad1bf3241e48c067fddb448707c", headers: {
        'User-Agent': 'request'
       }}, function (error, response, body) {
    if(JSON.parse(body).totalResults>0){
            var a= JSON.parse(body).articles[0].author;
            var b = JSON.parse(body).articles[0].url;
            var c = JSON.parse(body).articles[0].publishedAt;
            var d =JSON.parse(body).articles[1].author;
            var e = JSON.parse(body).articles[1].url;
            var f= JSON.parse(body).articles[1].publishedAt;
            var g= JSON.parse(body).articles[2].author;
            var h= JSON.parse(body).articles[2].url;
            var i = JSON.parse(body).articles[2].publishedAt;
            var j= JSON.parse(body).articles[3].author;
            var k= JSON.parse(body).articles[3].url;
            var l = JSON.parse(body).articles[3].publishedAt;
            var m= JSON.parse(body).articles[4].author;
            var n= JSON.parse(body).articles[4].url;
            var o = JSON.parse(body).articles[4].publishedAt;
            var p= JSON.parse(body).articles[5].author;
            var q= JSON.parse(body).articles[5].url;
            var r = JSON.parse(body).articles[5].publishedAt;
            var s= JSON.parse(body).articles[6].author;
            var t= JSON.parse(body).articles[6].url;
            var u = JSON.parse(body).articles[6].publishedAt;
            var v= JSON.parse(body).articles[7].author;
            var w= JSON.parse(body).articles[7].url;
            var x = JSON.parse(body).articles[7].publishedAt;
            var y= JSON.parse(body).articles[8].author;
            var z= JSON.parse(body).articles[8].url;
            var a1 = JSON.parse(body).articles[8].publishedAt;

            countryarray.push(a) ;countryarray.push(b);countryarray.push(c);countryarray.push(d);countryarray.push(e);countryarray.push(f);countryarray.push(g);countryarray.push(h);countryarray.push(i);countryarray.push(j);countryarray.push(k);countryarray.push(l);countryarray.push(m);countryarray.push(n);countryarray.push(o);countryarray.push(p);countryarray.push(q);countryarray.push(r); countryarray.push(s); countryarray.push(t); countryarray.push(u);countryarray.push(v);countryarray.push(w);countryarray.push(x);countryarray.push(y);countryarray.push(z);countryarray.push(a1);
            console.log(countryarray);
            res.render("countrydata",{userData3: countryarray},)
        }
        else{
            res.render("countrynameincorrect")

        }

    })

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    
 });


 




/*
const TelegramBot = require('node-telegram-bot-api');
const request = require('request');


const token = '5345103792:AAEh9gOVNwx71TOtzJjJ_EmUJIHuz3coczM';


const bot = new TelegramBot(token, {polling: true});

bot.on("message",function(msg){
    
})

*/