// Instalar la librería: npm install jsonwebtoken

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const SECRET_KEY = 'your_secret_key';
app.use(express.json()); // Middleware para procesar JSON

// Credenciales de ejemplo (en un entorno real, estas deberían estar en una base de datos)
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

// Generar un token al autenticarse
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verificar si el usuario existe y la contraseña es correcta
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// Middleware para verificar JWT
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });
    
    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
        if (err) return res.status(500).json({ message: 'Failed to authenticate token' });
        req.user = decoded; // Guardar los datos del usuario en req.user
        next();
    });
}

// Ruta protegida que usa el JWT
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});

app.listen(3000, () => console.log('Server running on port 3000'));
