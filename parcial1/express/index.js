// SERVIDOR
const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());

// FUNCIONES DEL SERVIDOR
app.get('/', (req, res) => {
    if(tru) {
        res.json({mensaje:'Server express contestando a peticion get'});
    }
    else {
        res.json({mensaje:'Server express contestando a peticion post'})
        
        next(err);}
});

app.use((err,req,res,next)=>{
    console.log(err);
    res.status(501);
    res.json({error:err.message})
});

app.listen(3000,()=>{
    console.log("Servidor express corriendo en  puerto 3000")
});