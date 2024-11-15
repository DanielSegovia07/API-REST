// SERVIDOR
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors())

app.get('/empleado',(req,res)=>{
    res.json({mensaje:"Server express"})
});

app.listen(3002,()=>{
    console.log('Server express escuhando')
})

