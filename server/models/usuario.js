const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}
const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'El email es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    img: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser unico'
})

module.exports = mongoose.model('Usuario', usuarioSchema);