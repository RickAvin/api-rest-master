'use strict'
//importamos las dependencias a usar
const mongoose=require('mongoose')
const Schema=mongoose.Schema
//creamos el schema para la BD
const PublicacionSchema=Schema({
    ptexto:String,
    pfecha:String,
    user_id:{ type: Schema.ObjectId, ref:'User' }
})
//exportamos el schema para poder ocuparlo
module.exports=mongoose.model('Publicacion',PublicacionSchema)