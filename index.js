'use strict'

var express = require('express');
var path = require('path');

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

function postProducto(callback, producto) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        console.log("conectado a mongo");

        var productos = db.collection("productos");

        productos.insertMany([producto], function (err, result) {
            
        });

        productos.find({}).toArray(function (err, productos) {
            if (err) throw err;

            console.log("hay " + productos.length + " cotizaciones");

            callback(err, productos);
        });
        db.close();
    });

}


function deleteProducto(callback, id) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        console.log("conectado a mongo");

        var productos = db.collection("productos");

        productos.remove({_id: ObjectID(id)}, function(err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result);
        });
        productos.find({}).toArray(function (err, productos) {
            if (err) throw err;

            console.log("hay " + productos.length + " cotizaciones");

            callback(err, productos);
        });
        db.close();
    });

}

function putCotizacion(callback, cotizacion , cotizacionId){
    
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        console.log("conectado a mongo");

        var cotizaciones = db.collection("cotizaciones");

        cotizaciones.collection.updateById(cotizacionId, cotizacion, function(err) { 
            if (err) {
                console.log(err);
            }
            
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
//router.get('/', function (req, res) {
//    res.json({
//        message: 'API Initialized!'
//    });
//});
//Use our router configuration when we call /api
//app.use('/api', router);


router.get('/users', function(req, res, next) {
    // Comment out this line:
 //res.send('respond with a resource');

 // And insert something like this instead:
 res.json([{
     id: 1,
     username: "samsepi0l"
 }, {
     id: 2,
     username: "D0loresH4ze"
 }]);
});

module.exports = router;

// public es la ruta en la url
//app.use("/public", express.static("./static"));

app.use(express.static(path.join(__dirname,'front/build/')));
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



app.post('/producto', function (req, res) {
    
    console.log(req);

    var producto = {}; 
    producto.nombre = req.body.nombre;
    producto.alto = req.body.alto;
    producto.largo = req.body.largo;
    producto.ancho = req.body.ancho;
    producto.alto = req.body.alto;
    producto.urlImagen = req.body.urlImagen;
    producto.descripcion = req.body.descripcion;
    

   postProducto(function (err, productos) {
        if (err) {
            res.json(["Error obteniendo productos"]);
            return;
        }
        res.json(productos);
    }, producto);
    
});


app.delete('/producto/:productId', function (req, res) {
    let productId = req.params.productId;
    
    
   deleteProducto(function (err, productos ) {
        if (err) {
            res.json(["Error obteniendo productos"]);
            return;
        }
        res.json(productos);
    }, productId);
    
});

app.put('/cotizacion/:cotizacionId', function (req, res) {
    let cotizacionId = req.params.cotizacionId;
    
    var cotizacion = {};   
    cotizacion.email = req.body.email;
    cotizacion.fecha = req.body.fecha;
    cotizacion.nombreCliente = req.body.nombreCliente;
    cotizacion.telefono = req.body.telefono;
    cotizacion.estado = req.body.estado;
    cotizacion.productos = req.body.productos;

    
    
   putCotizacion(function (err, cotizaciones) {
        if (err) {
            res.json(["Error obteniendo productos"]);
            return;
        }
        res.json(cotizaciones);
    }, cotizacion , cotizacionId);
    
});




app.listen(8080, function () {
    console.log("Listening on 8080");
});