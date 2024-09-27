// SERVIDOR
const express = require('express');
const cors = require('cors')
const path = require('path')
const app = express();

app.use(cors());

// FUNCIONES DEL SERVIDOR
app.get('/sendFile', (req, res) => {
    let archivo=path.join(__dirname,'/imagenes/pkmn.jpg')
    res.sendFile(archivo)
});

app.get('/download', (req, res) => {
    let archivo=path.join(__dirname,'/imagenes/pkmn.jpg')
    res.download(archivo)
});

app.get('/attachment', (req, res) => {
    let archivo=path.join(__dirname,'/imagenes/pkmn.jpg')
    res.attachment(archivo)
    res.sendFile(archivo)
});


app.listen(3000,(req,res)=>{
    console.log("Servidor express corriendo en  puerto 3000")
});