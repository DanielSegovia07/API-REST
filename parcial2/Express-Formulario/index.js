// SERVIDOR
const express = require('express');
const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser'); 
const cors = require('cors');
require('body-parser-xml')(bodyParser); 

const app = express();


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

app.listen(3000, () => {
  console.log("Servidor express corriendo en el puerto 3000");
});


app.use(function (err, req, res, next) {
  console.error(err.stack); 
  res.status(500).send('¡Algo no ha ido bien!');
});
