'use strict'

//importamis los modelos
const Comentario=require('../models/comentario')

function getComentario(req,res){
    let cid=req.params.cid
    Comentario.findById(cid,(err,comentario)=>{
        if(err) return res.status(500).send({message:`error al realizar la peticion ${err}`})
        if(!comentario) return res.status(404).send({message:`El comentario no existe`})
        res.status(200).send({comentario})
    })
}

function getComentarios(req,res){
    Comentario.find({},(err,comentarios)=>{
        if(err){
            return res.status(500).send({message:`error al realizar la peticion ${err}`})
        }
        else{
            if(!comentarios){
                return res.status(404).send({message:`No existe el comentario`})
            }
            else{
                res.status(200).send({comentarios})
            } 
        } 
    })
}

function updateComentario(req,res){
    let cid= req.params.cid
    let update=req.body
    Comentario.findByIdAndUpdate(cid,update,(err,ComentarioUpdated)=>{
        if(err) res.status(500).send({message:`Error al actualizar el Comentario ${err}`})
        res.status(200).send({comentario:ComentarioUpdated})
    })
}
function deleteComentario(req,res){
    let cid=req.params.cid
    Comentario.findById(cid,(err,comentario)=>{
        if(err) res.status(500).send({menssage:`Error al borrar el Comentario ${err}`})
        comentario.remove(err=>{
            if(err) res.status(500).send({message:`Error al borrar el Comentario ${err}`})
            res.status(200).send({message:`El Comentario fue eliminado`})
        })
    })
}
function insertComentario(req,res){
    console.log('POST /api/comentario')
    console.log(req.body)
    
    let comentario=new Comentario()
    comentario.ctexto=req.body.ctexto
    comentario.cfecha=req.body.cfecha
    comentario.user_id=req.body.user_id
    comentario.publicacion_id=req.body.publicacion_id

    comentario.save((err,comentarioStored)=>{
        if(err){
            res.status(500).send({message:`Error al salvar en la BD: ${err}`})
        } 
        else{
            if(!comentarioStored){
                res.status(404).send({message:`No se registro el comentario`})
            }
            else{
                res.status(200).send({comentario:comentarioStored})
            }
        }
    })
}

function getComentarioDePublicacion(req,res){
    let p_id=req.body.publicacion_id

    Comentario.find({publicacion_id:p_id},(err,comentarios)=>{
        if(err){
            return res.status(500).send({message:`error al realizar la peticion ${err}`})
        }
        else{
            if(!comentarios){
                return res.status(404).send({message:`No existe el comentario`})
            }
            else{
                res.status(200).send({comentarios})
            } 
        } 
    })
}

module.exports={
    getComentario,
    getComentarios,
    updateComentario,
    deleteComentario,
    insertComentario,
    getComentarioDePublicacion
}