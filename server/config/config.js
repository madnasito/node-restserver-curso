process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



//Vencimiento del token
//60 segundos * 60 minutos * 24 horas * 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//Seed de autenticación 
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//Base de datos
let urlDB;

<<<<<<< HEAD
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
=======
 if (process.env.NODE_ENV === 'dev') {
     urlDB = 'mongodb://localhost:27017/cafe';
 } else {
    urlDB = process.env.MONGO_URI;
 }
>>>>>>> ec0880f11df055bc2fd25aa164af7a7269a7143c

process.env.urlDB = urlDB;
