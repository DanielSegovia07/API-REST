// SERVIDOR
const express = require('express');
const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser'); 
const cors = require('cors');
require('body-parser-xml')(bodyParser); 
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

// Cargar los certificados para HTTPS
const options = {
  key: fs.readFileSync(path.join(__dirname, 'Certificados/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'Certificados/cert.pem')),
};

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.xml());  

app.get('/usuario', [check('id_usuario').isNumeric()], (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    res.send("Validación exitosa");
  } else {
    res.send("No cumple las reglas");
  }
});


app.use(function (err, req, res, next) {
  console.error(err.stack); 
  res.status(500).send('¡Algo no ha ido bien!');
});

// Crear servidor HTTPS
https.createServer(options, app).listen(3008, () => {
  console.log("Servidor express corriendo en el puerto 3000 con HTTPS");
});
