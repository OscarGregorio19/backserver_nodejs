// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); // para parsear los body

//inicializar variables
var app = express();

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//importar rutas 
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');

//conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/back-server', (err, res) => {
    if (err) throw err;

    console.log('MongoDB corriendo: \x1b[36m%s\x1b[0m', 'online');
});

//rutas
app.use('/usuario', usuarioRoutes);
app.use('/', appRoutes);


// Escuchar peticiones
app.listen(3000, () => {
    console.log('express server puerto 3000: \x1b[36m%s\x1b[0m', 'online');
});