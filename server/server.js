const express = require('express');
const app = express();
const colors = require('colors');
require('./config/config');
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())
const mongoose = require('mongoose');


mongoose.connect(process.env.urlDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
    if (err) {
        console.log(err);
    }

    console.log('Base de datos', 'Online'.green);

});
app.use(require('./routes/usuario'));

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto:', process.env.PORT.rainbow);
})