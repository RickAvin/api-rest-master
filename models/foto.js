'use strict'
//importamos las dependencias a usar
const mongoose=require('mongoose')
const Schema=mongoose.Schema
//creamos el schema para la BD
const FotoSchema=Schema({
    ffecha:String,
    user_id:{ type: Schema.ObjectId, ref:'User' },
    publicacion_id:{ type: Schema.ObjectId, ref:'Publicacion' }
})
//exportamos el schema para poder ocuparlo
module.exports=mongoose.model('Foto',FotoSchema)