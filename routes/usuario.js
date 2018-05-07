var express = require('express');
var bcrypt = require('bcrypt');

var app = express();

var Usuario = require('../models/usuario');

// ==========================================
// Obtener todos los usuarios
// ==========================================
app.get('/', (req, res, next) => {

    Usuario.find({}, '-password') //quito el password en la respuesta la respuesta
        .exec(
            (err, usuarios) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error cargar usuarios',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });

            });
});
// ==========================================
// Crear usuario
// ==========================================
app.post('/', (req, res) => {

    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado
        });


    });

});
// ==========================================
// Actualizar usuario
// ==========================================
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;
    //console.log(id);

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id: ' + id + 'no existe'
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioActualizado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            //oculto la contraseña
            usuarioActualizado.password = ':)';

            res.status(200).json({
                ok: true,
                usuario: usuarioActualizado
            });
        });
    });

});

module.exports = app;