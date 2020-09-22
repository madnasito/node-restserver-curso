const express = require('express')
const colors = require('colors');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('./config/config')
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(require('./routes/index'));

mongoose.connect(process.env.urlDB, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        return err
    }
    console.log('Base de datos', 'ONLINE'.green);
});

app.listen(process.env.PORT, () => {
    console.log('Servidor en el puerto', process.env.PORT.rainbow);
})
