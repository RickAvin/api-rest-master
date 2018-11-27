'use strict'
//importamos las dependencias a usar
const mongoose=require('mongoose')
const Schema=mongoose.Schema
//creamos el schema para la BD
const UserSchema=Schema({
    name:String,
    paterno:String,
    materno:String,
    nCuenta:String,
    email:String,
    celular:String,
    pass:String,
    foto:String
})
//exportamos el schema para poder ocuparlo
module.exports=mongoose.model('User',UserSchema)