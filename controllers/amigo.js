'use strict'

//importamis los modelos
const Amigo=require('../models/amigo')

function getAmigo(req,res){
    let aid=req.params.aid
    Amigo.findById(cid,(err,amigo)=>{
        if(err) return res.status(500).send({message:`error al realizar la peticion ${err}`})
        if(!amigo) return res.status(404).send({message:`El comentario no existe`})
        res.status(200).send({amigo})
    })
}

function getAmigos(req,res){
    Amigo.find({},(err,amigos)=>{
        if(err) return res.status(500).send({message:`error al realizar la peticion ${err}`})
        if(!amigos) return res.status(404).send({message:`No existe la relacion`})
        res.status(200).send({amigos})
    })
}

function updateAmigo(req,res){
    let aid= req.params.aid
    let update=req.body
    Amigo.findByIdAndUpdate(aid,update,(err,amigoUpdate)=>{
        if(err) res.status(500).send({message:`Error al actualizar la relacion ${err}`})
        res.status(200).send({amigo:amigoUpdate})
    })
}
function deleteAmigo(req,res){
    let aid=req.params.aid
    Amigo.findById(aid,(err,amigo)=>{
        if(err) res.status(500).send({menssage:`Error al borrar la relaion ${err}`})
        amigo.remove(err=>{
            if(err) res.status(500).send({message:`Error al borrar la relacion ${err}`})
            res.status(200).send({message:`la relacion fue eliminada`})
        })
    })
}
function insertAmigo(req,res){
    console.log('POST /api/amigo')
    console.log(req.body)
    
    let amigo=new Amigo()
    amigo.user_id1=req.body.user_id1
    amigo.user_id2=req.body.user_id2

    amigo.save((err,amigoStored)=>{
        if(err){
            res.status(500).send({message:`Error al salvar en la BD: ${err}`})
        } 
        else{
            if(!amigoStored){
                res.status(404).send({message:`No se registro el comentario`})
            }
            else{
                res.status(200).send({amigo:amigoStored})
            }
        }
    })
}


module.exports={
    getAmigo,
    getAmigos,
    updateAmigo,
    deleteAmigo,
    insertAmigo
}