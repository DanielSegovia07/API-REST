// SERVIDOR
const express = require('express');
const basicAuth = require('express-basic-auth');
const app = express();

// Configurar autenticación básica con express-basic-auth
app.use(basicAuth({
    users: { 'admin': 'password123' },  // Usuario y contraseña válidos
    challenge: true,  // Esto asegura que el cliente vea el prompt de autenticación
    unauthorizedResponse: (req) => 'Credenciales incorrectas'  // Respuesta en caso de error
}));

// FUNCIONES DEL SERVIDOR
app.get('/', (req, res) => {
    res.json({ mensaje: 'Server express contestando a petición GET' });
});

app.post('/', (req, res) => {
    res.json({ mensaje: 'Server express contestando a petición POST' });
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log("Servidor express corriendo en puerto 3000");
});
