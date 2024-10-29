// SERVIDOR
const express = require('express');
const path = require('path');
const app = express();


app.set('view engine', 'pug'); 
app.set('views', path.join(__dirname, 'views')); 


app.get('/hola', (req, res) => {
    res.render('holamundo'); 
});


app.get('/plantilla', (req, res) => {
    let opciones = {
        titulo: "Título de la plantilla",
        subtitulo: "Subtítulo en la plantilla"
    };
    res.render('plantilla', opciones); 
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
