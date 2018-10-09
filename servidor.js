var express = require('express');
var jwt = require('jsonwebtoken');

var puerto = process.env.PORT || 3000; //Constante que usa Heroku
var app = express();

app.use(express.json());
app.get('/calificaciones', function (req, res) {
    res.json({
        mensaje: 'Bienvenido al API Kardex'
    });
});

app.post('/login', function (req, res) {
    //Devolver el token una vez que el usuario fue autenticado
    var token = jwt.sign({
        usuario: 'alumno'
    }, 'clavesupersecreta', { expiresIn: '60s' });
    console.log('Token generado' + token);
    res.json({
        eltoken: token
    })
});

app.listen(puerto, function () {
    console.log('Servidor corriendo en puerto: ' + puerto)
});