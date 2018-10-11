var express = require('express');
var jwt = require('jsonwebtoken');

var puerto = process.env.PORT || 3000; //Constante que usa Heroku
var app = express();

app.use(express.json()); //Middleware para que en el body pueda recibir datos de tipo JSON

app.get('/calificaciones', function (req, res) {
    console.log('Token recibido:' + req.query.token);

    jwt.verify(req.query.token, 'clavesupersecreta',
        function (err, token) {
            //Si el token no se pudo verificar
            if (err) {
                res.status(403).json({ mensaje: 'Autorizacion no valida' });
            }
            else {
                res.json({
                    mensaje: 'Bienvenido ' + token.usuario + '. Aqui estan las calificaciones'
                });
            }
        });
});

app.post('/login', function (req, res) {
    //Devolver el token una vez que el usuario fue autenticado

    //login simulado
    var alumno = {
        email: 'alumno@uaslp.mx',
        password: '123'
    };

    var profesor = {
        email: 'profesor@uaslp.mx',
        password: 'abc'
    };

    if (req.body.email == alumno.email && req.body.password == alumno.password) {
        var token = jwt.sign({
            usuario: 'alumno',
            nombre: 'Raul',
            clave_unica: 123456
        }, 'clavesupersecreta', { expiresIn: '1h' });
        console.log('Token generado' + token);
        res.json({
            mensaje: 'Bienvenido alumno',
            eltoken: token
        });
    }
    else if (req.body.email == profesor.email && req.body.password == profesor.password) {
        var token = jwt.sign({
            usuario: 'profesor',
        }, 'clavesupersecreta', { expiresIn: '1h' });
        console.log('Token generado' + token);
        res.json({
            mensaje: 'Bienvenido profesor',
            eltoken: token
        });
    }
    else {
        res.status(403).json({ mensaje: 'Credenciales no validas', eltoken: null });
    }

});

app.listen(puerto, function () {
    console.log('Servidor corriendo en puerto: ' + puerto)
});