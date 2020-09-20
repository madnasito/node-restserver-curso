const express = require('express');
const app = express();
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion')

app.get('/usuario', verificaToken, (req, res) => {
    let limit = req.query.limit || 5;
    let skip = req.query.skip || 0;

    limit = Number(limit);
    skip = Number(skip);

    Usuario.find({})
        .skip(skip)
        .limit(limit)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: true,
                    err
                })
            }

            Usuario.countDocuments((err, conteo) => {
                if (err) {
                    return res.status(400).json({
                        ok: true,
                        err
                    })
                }
                res.json({
                    ok: true,
                    usuarios,
                    Total: conteo
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
                ok: true,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let body = _.pick(req.body, ['nombre', 'role', 'img', 'email']);
    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
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

app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;
    let cambiaEstado = {
        estado: false
    }

    Usuario.findOneAndUpdate(id, cambiaEstado, { new: true, runValidators: true }, (err, usuarioBorrado) => {
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
                    message: 'No es ha encontrado el usuario'
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