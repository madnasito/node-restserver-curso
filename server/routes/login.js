const express = require('express');
const app = express()
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
app.post('/login', (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!usuarioDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El usuario no existe'
                }
            })
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Contraseña incorrecta'
                }
            })
        }

        let token = jwt.sign({ usuario: usuarioDB }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })
    })
})

module.exports = app;