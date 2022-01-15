const express = require('express');
const morgan = require('morgan');
const cors = require("cors");

const { database } = require('./keys');

//Inicializaciones
const app = express();

//Configuraciones
app.set('port', 3000);

//Middlewares
app.use(morgan('dev'));

//Rutas
app.use(require('./routes/index'));
app.use('/users', require('./routes/users'));

//Inicializando el servidor
app.listen(app.get('port'), () => {
    console.log("SERVIDOR EN EL PUERTO ", app.get('port'));
})