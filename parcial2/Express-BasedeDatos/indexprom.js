const express = require('express');
const cors = require('cors');
const mysql2 = require('mysql2/promise');
const app = express();

app.use(cors()); // Middleware de terceros
app.use(express.json()); // Middleware incorporado
app.use(express.text());

// Crear conexión a la base de datos
const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    database: 'prueba2',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// FUNCIONES DEL SERVIDOR

// Obtener personas
app.get('/personas', async (req, res) => { 
    const { ID_PERSONA } = req.query;

    let query = 'SELECT * FROM personas';
    const params = [];

    if (ID_PERSONA) {
        query += ' WHERE ID_PERSONA = ?';
        params.push(ID_PERSONA);
    }

    try {
        const [results] = await pool.query(query, params);

        if (results.length === 0) {
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
    } catch (err) {
        res.status(500).json({
            status: 0,
            mensaje: "Error en la consulta a la base de datos",
            error: err.message
        });
    }
});

// Alta de una nueva persona
app.post('/personas', async (req, res) => {
    const { ID_PERSONA, NOMBRE, APELLIDO, EDAD, PAIS } = req.body;

    if (!ID_PERSONA || !NOMBRE || !APELLIDO || !EDAD || !PAIS) {
        return res.status(400).json({
            status: 0,
            mensaje: "Datos incompletos, se requiere ID_PERSONA, NOMBRE, APELLIDO, EDAD y PAIS"
        });
    }

    const query = 'INSERT INTO personas (ID_PERSONA, NOMBRE, APELLIDO, EDAD, PAIS) VALUES (?, ?, ?, ?, ?)';

    try {
        await pool.query(query, [ID_PERSONA, NOMBRE, APELLIDO, EDAD, PAIS]);

        res.json({
            status: 1,
            mensaje: "Persona agregada exitosamente",
            datos: { ID_PERSONA, NOMBRE, APELLIDO, EDAD, PAIS }
        });
    } catch (err) {
        res.status(500).json({
            status: 0,
            mensaje: "Error al insertar en la base de datos",
            error: err.message
        });
    }
});

// Eliminar una persona por ID
app.delete('/personas', async (req, res) => {
    const { ID_PERSONA } = req.query;

    if (!ID_PERSONA) {
        return res.status(400).json({
            status: 0,
            mensaje: "Falta el ID_PERSONA para eliminar"
        });
    }

    const query = 'DELETE FROM personas WHERE ID_PERSONA = ?';

    try {
        const [result] = await pool.query(query, [ID_PERSONA]);

        if (result.affectedRows === 0) {
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
    } catch (err) {
        res.status(500).json({
            status: 0,
            mensaje: "Error al eliminar de la base de datos",
            error: err.message
        });
    }
});

// Actualizar persona (aún sin implementar)
app.put('/personas', (req, res) => {
    console.log(req.body);
    res.json({ mensaje: 'Server express contestando a petición PUT' });
});

app.listen(3001, () => {
    console.log("Servidor express corriendo en puerto 3001");
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo no ha ido bien!');
});
