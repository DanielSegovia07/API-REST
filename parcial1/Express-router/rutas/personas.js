const express = require('express');
const mysql2 = require('mysql2');

const app = express();
const router = express.Router();

//* CONEXION A LA BASE DE DATOS
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'agos0708', 
    database: 'prueba2'  
});


router.get('/', (req, res) => {
    const { ID_PERSONA } = req.query;
    
    let consulta = '';

    if (!ID_PERSONA) {
        consulta = 'SELECT * FROM personas';
    } else {
        consulta = `SELECT * FROM personas WHERE ID_PERSONA = ?`;
    }

    connection.query(consulta, [ID_PERSONA], (err, results) => {
        if (err) {
            return res.status(500).json({
                status: 0,
                mensaje: "Error al consultar la base de datos",
                error: err
            });
        }

        if (results.length === 0) {
            return res.json({
                status: 0,
                mensaje: ID_PERSONA ? "No se encontró ninguna persona con ese ID" : "No se encontraron personas en la base de datos",
                datos: {}
            });
        } else {
            return res.json({
                status: 1,
                mensaje: "Consulta exitosa",
                datos: results
            });
        }
    });
});

//* ALTA DE UNA PERSONA
router.post('/', (req, res) => {
    const { ID_PERSONA, NOMBRE, APELLIDO, EDAD, PAIS } = req.body;
    
    if (!ID_PERSONA || !NOMBRE || !APELLIDO || !EDAD || !PAIS) {
        return res.status(400).json({
            status: 0,
            mensaje: "Datos incompletos, se requiere ID_PERSONA, NOMBRE, APELLIDO, EDAD y PAIS"
        });
    }

    const consulta = `INSERT INTO personas (ID_PERSONA, NOMBRE, APELLIDO, EDAD, PAIS) VALUES (?, ?, ?, ?, ?)`;

    connection.query(consulta, [ID_PERSONA, NOMBRE, APELLIDO, EDAD, PAIS], (err, results) => {
        if (err) {
            return res.status(500).json({
                status: 0,
                mensaje: "Error al insertar en la base de datos",
                error: err
            });
        }

        res.json({
            status: 1,
            mensaje: "Persona agregada exitosamente",
            datos: { ID_PERSONA, NOMBRE, APELLIDO, EDAD, PAIS }
        });
    });
});

//* ELIMINAR UNA PERSONA
router.delete('/', (req, res) => {
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
            return res.status(500).json({
                status: 0,
                mensaje: "Error al eliminar de la base de datos",
                error: err
            });
        }

        if (results.affectedRows === 0) {
            return res.json({
                status: 0,
                mensaje: "ID_PERSONA no existe",
                datos: {}
            });
        } else {
            return res.json({
                status: 1,
                mensaje: "Persona eliminada exitosamente",
                datos: { ID_PERSONA }
            });
        }
    });
});

//* ACTUALIZAR DATOS DE UNA PERSONA
router.put('/', (req, res) => {
    const { ID_PERSONA, NOMBRE, APELLIDO, EDAD, PAIS } = req.body;

    if (!ID_PERSONA || !NOMBRE || !APELLIDO || !EDAD || !PAIS) {
        return res.status(400).json({
            status: 0,
            mensaje: "Datos incompletos, se requiere ID_PERSONA, NOMBRE, APELLIDO, EDAD y PAIS"
        });
    }

    const consulta = `UPDATE personas SET NOMBRE = ?, APELLIDO = ?, EDAD = ?, PAIS = ? WHERE ID_PERSONA = ?`;

    connection.query(consulta, [NOMBRE, APELLIDO, EDAD, PAIS, ID_PERSONA], (err, results) => {
        if (err) {
            return res.status(500).json({
                status: 0,
                mensaje: "Error al actualizar en la base de datos",
                error: err
            });
        }

        if (results.affectedRows === 0) {
            return res.json({
                status: 0,
                mensaje: "ID_PERSONA no existe",
                datos: {}
            });
        } else {
            return res.json({
                status: 1,
                mensaje: "Persona actualizada exitosamente",
                datos: { ID_PERSONA, NOMBRE, APELLIDO, EDAD, PAIS }
            });
        }
    });
});

module.exports.router = router;
