'use strict'

var express = require('express');

var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/mongo_proyecto2';


function getTweets(callback){
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
    
console.log("conectado a mongo");
    
    var tweets = db.collection("tweets");
    tweets.find({}).toArray(function (err , tweets){
       if (err) throw err;
        
        console.log("hay " + tweets.length + " tweets");
        
        callback(err,tweets);
    });
 // db.close();
});
    
}

var app = express();

// public es la ruta en la url
app.use("/public" , express.static("./static"));

app.get('/', function(req, res) {
  res.send('hello world');
});


app.get('/tweets', function(req, res) {

    getTweets(function (err ,tweets){
        if (err){
            res.json(["Error obteniendo tweets"]);
            return;
        }
       res.json(tweets);
    });
});

app.listen(8080, function (){
   console.log("Listening on 8080"); 
});