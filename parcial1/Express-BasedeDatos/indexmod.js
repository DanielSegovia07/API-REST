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
app.get('/personas', (req, res) => { 
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
                    datos: results 
                });
            }
        }
    );
});

// Alta de una nueva persona
app.post('/personas', (req, res) => {
    const { ID_PERSONA, NOMBRE, APELLIDO, EDAD, PAIS } = req.body; 
    if (!NOMBRE || !APELLIDO || !ID_PERSONA || !EDAD || !PAIS) {
        return res.status(400).json({
            status: 0,
            mensaje: "Datos incompletos, se requiere ID_PERSONA, NOMBRE, APELLIDO, EDAD y PAIS"
        });
    }

    const consulta = `INSERT INTO personas (ID_PERSONA, NOMBRE, APELLIDO, EDAD, PAIS) VALUES (?, ?, ?, ?, ?)`;

    connection.query(consulta, [ID_PERSONA, NOMBRE, APELLIDO, EDAD, PAIS], (err, results) => {
        if (err) {
            res.status(500).json({
                status: 0,
                mensaje: "Error al insertar en la base de datos",
                error: err
            });
            return;
        }

        res.json({
            status: 1,
            mensaje: "Persona agregada exitosamente",
            datos: { ID_PERSONA, NOMBRE, APELLIDO, EDAD, PAIS }
        });
    });
});


// Eliminar una persona 
app.delete('/personas', (req, res) => {
    const { ID_PERSONA } = req.query; 

    if (!ID_PERSONA) {
        return res.status(400).json({
            status: 0,
            mensaje: "Falta el ID_PERSONA para eliminar"
        });
    }

    const consulta = `DELETE FROM personas WHERE ID_PERSONA = ?`;

    connection.query(consulta, [ID_PERSONA], (err, results) => {
        if (err) {
            res.status(500).json({
                status: 0,
                mensaje: "Error al eliminar de la base de datos",
                error: err
            });
            return;
        }

        if (results.affectedRows === 0) {
            res.json({
                status: 0,
                mensaje: "ID_PERSONA no existe",
                datos: {}
            });
        } else {
            res.json({
                status: 1,
                mensaje: "Persona eliminada exitosamente",
                datos: { ID_PERSONA }
            });
        }
    });
});

app.put('/personas', (req, res) => {
    console.log(req.body);
    res.json({ mensaje: 'Server express contestando a petición PUT' });
});

app.listen(3001, () => {
    console.log("Servidor express corriendo en puerto 3001");
});

app.use(function(err, req, res, next) { // Middleware de manejo de errores
    res.status(500).send('Algo no ha ido bien!');
});
