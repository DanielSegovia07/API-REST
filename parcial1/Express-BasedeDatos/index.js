const express = require('express');
const cors = require('cors');
const mysql2 = require('mysql2');
const app = express();

app.use(cors());    // Middleware de terceros
app.use(express.json()); // Middleware incorporado
app.use(express.text());

// Crear conexión a la base de datos
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'prueba2'
});

// FUNCIONES DEL SERVIDOR
app.get('/personas', (req, res) => { // Consulta en el diagonal el nombre de la tabla
    console.log(req.query.ID_PERSONA);

    let consulta = '';

    if (typeof(req.query.ID_PERSONA) == 'undefined') {
        consulta = `SELECT * FROM personas`;
    } else {
        consulta = `SELECT * FROM personas WHERE ID_PERSONA = ${req.query.ID_PERSONA}`;
    }

    console.log(consulta);

    connection.query(
        consulta,
        function(err, results, fields) {
            if (err) {
                res.status(500).json({
                    status: 0,
                    mensaje: "Error en la consulta a la base de datos",
                    error: err
                });
                return;
            }

            if (results.length == 0) {
                res.json({
                    status: 0,
                    mensaje: "ID_PERSONA no existe",
                    datos: {}
                });
            } else {
                res.json({
                    status: 1,
                    mensaje: "Usuario(s) encontrado(s)",
                    datos: results // Aquí devolvemos todos los resultados
                });
            }
        }
    );
});

app.post('/personas', (req, res) => {
    console.log(req.body);
    res.json({ mensaje: 'Server express contestando a petición POST' });
});

app.put('/personas', (req, res) => {
    console.log(req.body);
    res.json({ mensaje: 'Server express contestando a petición PUT' });
});

app.listen(3001, () => {
    console.log("Servidor express corriendo en puerto 3000");
});

app.use(function(err, req, res, next) { // Middleware de manejo de errores
    res.status(500).send('Algo no ha ido bien!');
});
