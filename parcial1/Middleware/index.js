// SERVIDOR
const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());    //Middleware de terceros que tu instalas que ya hizo alguien mas
app.use((req,res,next) => { //Middleware de Aplicacion
    console.log(new Date());
    next();
})


app.use(express.json()); //Middleware incorporado, funciones que ya vienen en el express

// FUNCIONES DEL SERVIDOR
app.get('/', (req, res) => {
    res.json({mensaje:'Server express contestando a peticion get'})
    next(error);
});

app.post('/', (req, res) => {
    res.json({mensaje:'Server express contestando a peticion post'});
});

app.listen(3000,(req,res)=>{
    console.log("Servidor express corriendo en  puerto 3000")
});

app.use(function(err, req, res, next){   //middleware de manejo de errores, se identifica facilmente porque tiene error al inicio, va hasta el final
    res.staths(500).send('Algo no ha ido bien!');
});