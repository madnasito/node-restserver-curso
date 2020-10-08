const express = require('express');
const app = express();
const colors = require('colors');
const path = require('path')
require('./config/config');
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, '../public')))

const mongoose = require('mongoose');

app.use(require('./routes/index'));

mongoose.connect(process.env.urlDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
    if (err) {
        return err;
    }

    console.log('Base de datos', 'Online'.green);

});

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto:', process.env.PORT.rainbow);
})