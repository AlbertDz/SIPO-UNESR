const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('La conexión de la base de datos fue cerrada')
        };
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('La base de datos tiene demasiadas conexiones')
        };
        if (err.code === 'ECONNREFUSED') {
            console.error('Se rechazó la conexión a la base de datos')
        };
    };
    if (connection) connection.release();
    console.log('Base de datos conectada');
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;