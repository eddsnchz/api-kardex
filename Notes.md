Autenticacion y atorizacion 
JSON Web Token
Cadena formada por
1) Encabezado { tipo de token, algoritmo de codificación }
2) Playload (datos)
3) Firma de verificación

Node
npm install jsonwebtoken
var jwt = require('jsonwebtoken)

jwt.sign(payload, clave, options)

CLIENTE ---> /login ----> API (Genera token)
        <---- token -----   