'use strict'

//importamis los modelos
const Publicacion=require('../models/publicacion')
const User=require('../models/user')
const fs=require('fs')
const path=require('path')

function getPublicacion(req,res){
    let pid=req.params.pid
    Publicacion.findById(pid,(err,publicacion)=>{
        if(err){
            return res.status(500).send({message:`error al realizar la peticion ${err}`})
        } 
        else if(!publicacion){
            return res.status(404).send({message:`La PubPublicacion no existe`})
        }
        else{
            res.status(200).send({publicacion})
        } 
    })
}

function getPublicaciones(req,res){
    Publicacion.find({},(err,publicaciones)=>{
        if(err){
            return res.status(500).send({message:`error al realizar la peticion ${err}`})
        } 
        else{
            if(!publicaciones){
                return res.status(404).send({message:`No hay publicaciones`})
            }
            else{
                User.populate(publicaciones,{path:"user_id"},function(err,publicaciones){
                    res.status(200).send({publicaciones})
                })
            } 
        }
    })
}

function updatePublicacion(req,res){
    let pid= req.params.pid
    let update=req.body
    Publicacion.findByIdAndUpdate(pid,update,(err,pupdate)=>{
        if(err) res.status(500).send({message:`Error al actualizar la publicaion ${err}`})
        if(!pupdate) res.status(404).send({menssage:'No encontrado'})
        res.status(200).send({publicaion:pupdate})
    })
}
function deletePublicacion(req,res){
    let pid=req.params.pid
    Publicacion.findById(pid,(err,publicacion)=>{
        if(err){
            res.status(500).send({menssage:`Error al borrar la publicacion ${err}`})
        } 
        else{
            publicacion.remove(err=>{
                if(err){
                    res.status(500).send({message:`Error al borrar la publicacion ${err}`})
                } 
                else{
                    res.status(200).send({message:`La publicaion fue eliminada`})
                }
        })
        }
    })
}
function insertPublicacion(req,res){
    console.log('POST /api/publicacion')
    console.log(req.body)
    let publicacion=new Publicacion()
    publicacion.ptexto=req.body.ptexto
    publicacion.pfecha=req.body.pfecha
    publicacion.user_id=req.body.user_id
    
    publicacion.save((err,PublicacionStored)=>{
        if(err){
            res.status(500).send({message:`Error al salvar en la BD: ${err}`})
        } 
        else{
            if(!PublicacionStored){
                res.status(404).send({message:`No se registro la Publicacion`})
            }
            else{
                res.status(200).send({publicacion:PublicacionStored})
            }
        }
    })
}



module.exports={
    getPublicacion,
    getPublicaciones,
    updatePublicacion,
    deletePublicacion,
    insertPublicacion
}