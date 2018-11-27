'use strict'
//importa las dependecias a usar
const express= require('express')
const bodyParser= require('body-parser')
const api=require('./routes')
const app= express();

const userCtrl=require('./controllers/user')
const publicacionCtrl=require('./controllers/publicacion')
//para el json y bson
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//configuramos cabeceras y cors
//cors es la referencia cruzada de ajax entre dominios
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Authorization,X-API-Key,Origin,X-Requested-With,Content-Type,Accept,Access-Control-Allow-Request-Method')
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE')
    res.header('Allow','GET,POST,OPTIONS,PUT,DELETE')
    next();
})
//le agregamos el prefijo de api a las rutas
app.use('/api',api)
//exportamos el modulo
module.exports=app