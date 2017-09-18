'use strict'

var express = require('express');

var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

//var url = 'mongodb://localhost:27017/mongo_proyecto2';
var url = 'mongodb://web:123456Sha@ds141524.mlab.com:41524/shaserviciocotizaciones'




function getProductos(callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        console.log("conectado a mongo");

        var products = db.collection("productos");


        products.find({}).toArray(function (err, products) {
            if (err) throw err;

            console.log("hay " + products.length + " products");

            callback(err, products);
        });
        db.close();
    });

}

function getCotizaciones(callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        console.log("conectado a mongo");

        var cotizaciones = db.collection("cotizaciones");
        cotizaciones.find({}).toArray(function (err, cotizaciones) {
            if (err) throw err;

            console.log("hay " + cotizaciones.length + " cotizaciones");

            callback(err, cotizaciones);
        });
        db.close();
    });

}


function postCotizacion(callback, cotizacion) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        console.log("conectado a mongo");

        var cotizaciones = db.collection("cotizaciones");

        cotizaciones.insertMany([cotizacion], function (err, result) {
            
        });

        cotizaciones.find({}).toArray(function (err, cotizaciones) {
            if (err) throw err;

            console.log("hay " + cotizaciones.length + " cotizaciones");

            callback(err, cotizaciones);
        });
        db.close();
    });

}


var app = express();
var router = express.Router();


//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    //and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


//now we can set the route path & initialize the API
router.get('/', function (req, res) {
    res.json({
        message: 'API Initialized!'
    });
});
//Use our router configuration when we call /api
//app.use('/api', router);




// public es la ruta en la url
app.use("/public", express.static("./static"));

app.get('/', function (req, res) {
    res.send('hello world');
});


app.get('/products', function (req, res) {

    getProductos(function (err, products) {
        if (err) {
            res.json(["Error obteniendo productos"]);
            return;
        }
        res.json(products);
    });
});

app.get('/cotizaciones', function (req, res) {

    getCotizaciones(function (err, cotizaciones) {
        if (err) {
            res.json(["Error obteniendo cotizacones"]);
            return;
        }
        res.json(cotizaciones);
    });
});


app.post('/cotizacion', function (req, res) {
    
    console.log(req);

    var cotizacion = {};   
    cotizacion.email = req.body.email;
    cotizacion.fecha = req.body.fecha;
    cotizacion.nombreCliente = req.body.nombreCliente;
    cotizacion.telefono = req.body.telefono;
    cotizacion.estado = req.body.estado;
    cotizacion.productos = req.body.productos;

   postCotizacion(function (err, cotizaciones) {
        if (err) {
            res.json(["Error obteniendo cotizacones"]);
            return;
        }
        res.json(cotizaciones);
    }, cotizacion);
    
});





app.listen(8080, function () {
    console.log("Listening on 8080");
});