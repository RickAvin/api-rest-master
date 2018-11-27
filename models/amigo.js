'use strict'
//importamos las dependencias a usar
const mongoose=require('mongoose')
const Schema=mongoose.Schema
//creamos el schema para la BD
const AmigoSchema=Schema({
    user_id1:{ type: Schema.ObjectId, ref:'User' },
    user_id2:{ type: Schema.ObjectId, ref:'User' }
})
//exportamos el schema para poder ocuparlo
module.exports=mongoose.model('Amigo',AmigoSchema)