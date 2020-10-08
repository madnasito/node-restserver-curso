const express = require('express');
const app = express();
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion')
const _ = require("underscore");

app.get('/usuario', verificaToken, (req, res) => {

    let limit = req.query.limit || 5;
    let skip = req.query.skip || 0;
    limit = Number(limit);
    skip = Number(skip);

    Usuario.find({}, 'nombre email role estado google img')
        .skip(skip)
        .limit(limit)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Usuario.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    conteo
                })
            })

        })

})

app.post('/usuario', [verificaToken, verificaAdmin_Role], (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuarioDB
        })
    })

})

app.put('/usuario/:id', [verificaAdmin_Role, verificaToken], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'role', 'email', 'img', 'estado']);

    Usuario.findOneAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;
    let actualizaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, actualizaEstado, { new: true, runValidators: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No se pudo encontrar el usuario'
                }
            })
        }

        res.json({
            ok: true,
            usuarioBorrado
        })

    })
})

module.exports = app;