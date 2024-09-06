// SERVIDOR
const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());    //Middleware de terceros que tu instalas que ya hizo alguien mas
app.use(express.json()); //Middleware incorporado, funciones que ya vienen en el express

// FUNCIONES DEL SERVIDOR
app.get('/clientes/:id', (req, res) => {
    console.log(req.params);
    res.json({mensaje:'Server express contestando a peticion get'})
    
});

app.post('/clientes', (req, res) => {
    console.log(req.query)
    res.json({mensaje:'Server express contestando a peticion post'});
});

app.put('/clientes', (req, res) => {
    console.log(req.body)
    res.json({mensaje:'Server express contestando a peticion post put'});
});

app.listen(3000,(req,res)=>{
    console.log("Servidor express corriendo en  puerto 3000")
});

app.use(function(err, req, res, next){   //middleware de manejo de errores, se identifica facilmente porque tiene error al inicio, va hasta el final
    res.staths(500).send('Algo no ha ido bien!');
});