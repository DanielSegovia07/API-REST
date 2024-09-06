// SERVIDOR
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
const upload = multer();
require('body-parser-xml')(bodyParser);

app.use(cors());  // Middleware de terceros que tú instalas que ya hizo alguien más.
app.use(express.json()); // Middleware incorporado para analizar JSON.
app.use(express.text()); // Middleware incorporado para analizar texto.
app.use(express.urlencoded({ extended: true })); // Middleware para analizar un formulario URLEncoded.
app.use(upload.none()); // Middleware para analizar un formulario form-data.
app.use(bodyParser.xml());

app.post('/clientes', (req, res) => {
  console.log(req.body);
  res.json({ mensaje: 'Server express contestando a petición POST' });
});

app.listen(3000, () => {
  console.log("Servidor express corriendo en el puerto 3000");
});

app.use(function (err, req, res, next) { // Middleware de manejo de errores, identificado porque tiene "err" al inicio. Va al final.
  res.status(500).send('¡Algo no ha ido bien!');
});
