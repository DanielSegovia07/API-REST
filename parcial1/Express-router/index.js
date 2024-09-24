//* SERVIDOR
const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const personas = require('./rutas/personas.js');


app.use(cors());
app.use(express.json());

//*RUTAS DEL ROUTER
app.use('/personas',personas.router);

app.listen(3000,(req,res)=>{
    console.log('Server express escuchando en puerto 3000')
});