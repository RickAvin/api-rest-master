'use strict'
//importa las dependecias a usar
const mongoose= require('mongoose')
//importamos el app.js
const app=require('./app')
// exportamos el conifg
const config=require('./config')
//agregamos los controllers creados


mongoose.connect(config.db,(err,res)=>{
    if(err){
        return console.log(`Error en la conexion de BD:  ${err}`)
    }
    console.log("se conecto a la BD RedIco ")
    
    app.listen(config.port,() =>{
    console.log(`API REST corriendo en http//localhost:${config.port}`)
    })
})
