// SERVIDOR
const express = require('express');
const app = express();

// FUNCIONES DEL SERVIDOR
app.get('/', (req, res) => {
    res.send('Server express contestando a peticion get');
});

app.post('/', (req, res) => {
    res.send('Server express contestando a peticion post');
});

app.listen(3000,(req,res)=>{
    console.log("Servidor express corriendo en  puerto 3000")
});