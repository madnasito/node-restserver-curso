const express = require('express');
const app = express();

app.get('/usuario', (req, res) => {
    res.json({
        ok: true
    })
})

app.post('/usuario', (req, res) => {
    let body = req.body;
    res.json({
        body
    })
})

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json({
        id
    })
})

app.delete('/usuario', (req, res) => {
    res.json('Delete')
})

module.exports = app;