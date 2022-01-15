const mysql = require('mysql');

const { promisify } = require('util');

const Connection = require('mysql/lib/Connection');

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('CONEXION CON LA BASE DE DATOS FUE CERRADA');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('BASE DE DATOS TIENE DEMASIADAS CONEXIONES');
        }
        if (err.code === 'ECONnREFUSED') {
            console.error('ECONEXIÓN CON LA BASE DE DATOS RECHAZADA   ');
        }
    }

    if (connection) connection.release();

    console.log('DB ESTA CONECTADA');
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;