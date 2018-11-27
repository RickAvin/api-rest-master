'use strict'

//importamis los modelos
const User=require('../models/user')
const fs=require('fs')
const path=require('path')

function getUser(req,res){
    let numCuenta=req.params.nCuenta
    User.find({nCuenta: numCuenta},(err,user)=>{
        if(err) return res.status(500).send({message:`error al realizar la peticion ${err}`})
        if(!user) return res.status(404).send({message:`El producto no existe`})
        res.status(200).send({user})
    })
}

function getUsers(req,res){
    User.find({},(err,users)=>{
        if(err)  res.status(500).send({message:`error al realizar la peticion ${err}`})
        if(!users) res.status(404).send({message:`No existe el producto`})
        res.status(200).send({users})
    })
}

function updateUser(req,res){
    var idUser= req.params.userid
    var update=req.body
    User.findByIdAndUpdate(idUser,update,(err,userUpdated)=>{
        if(err) res.status(500).send({message:`Error al actualizar el usuario ${err}`})
        res.status(200).send({user:userUpdated})
    })
}
function deleteUser(req,res){
    var idUser=req.params.userid
    User.findById(idUser,(err,user)=>{
        if(err) res.status(500).send({menssage:`Error al borrar el usuario ${err}`})
        user.remove(err=>{
            if(err) res.status(500).send({message:`Error al borrar al usuario ${err}`})
            res.status(200).send({message:`El usuario fue eliminado`})
        })
    })
}
function insertUser(req,res){
    console.log('POST /api/user')
    console.log(req.body)
    
    let user=new User()
    user.name=req.body.name
    user.paterno=req.body.paterno
    user.materno=req.body.materno
    user.nCuenta=req.body.nCuenta
    user.email=req.body.email
    user.celular=req.body.celular
    user.pass=req.body.pass
    user.foto=req.body.foto
    
    User.findOne({nCuenta:req.body.nCuenta},(err,usere)=>{
        if(err){
            res.status(500).send({message:`Error al comprobar que existe el usuario: ${err}`})
        }
        else{
            if(!usere){
                user.save((err,userStored)=>{
                    if(err){
                        res.status(500).send({message:`Error al salvar en la BD: ${err}`})
                    } 
                    else{
                        if(!userStored){
                            res.status(404).send({message:`No se registro el usuario`})
                        }
                        else{
                            res.status(200).send({user:userStored})
                        }
                    }
                })
            }
            else{
                res.status(200).send({message:`No se registro el usuario por que ya existe`})
            }
        }
    })
}

function findByLog(req,res){
    let numCuenta=req.body.nCuenta
    let password=req.body.pass
    console.log('POST /api/login')
    console.log(req.body)
    
    User.findOne({nCuenta:numCuenta,pass:password},(err,users)=>{
        if(err){
          return res.status(500).send({message:`error al realizar la peticion ${err}`})  
        }
        else{
            if(users){
                res.status(200).send({users})
            }
            else{
                res.status(400).send({message:'no se encuentra ese usuario'})
            }
        }        
    })
}

function uploadimg(req,res){
    console.log('POST /api/avatar/iduser')
    console.log(req.body)
    
    if(req.files){
        let file_path=req.files.imagen.path
        let file_split=file_path.split('\\')
        let file_name=file_split[2]
        let ext_split=file_name.split('\.')
        let file_ext=ext_split[1]
        
        if(file_ext=='png' || file_ext=='jpg' || file_ext=='jpeg'){
            let idUser= req.params.userid
            let update=req.body
            User.findByIdAndUpdate(idUser,{foto:file_name},{new:true},(err,userUpdate)=>{
                if(err){
                    res.status(500).send({message:`Error al actualizar foto de usuario ${err}`})
                }
                else{
                    if(!userUpdate){
                        res.status(400).send({message:'No se pudo actiualizar'})
                    }
                    else{
                        res.status(200).send({user:userUpdate, imagen:file_name})
                    }
                }
            })
        }
        else{
            fs.unlink(file_path,(err)=>{
                if(err){
                    res.status(200).send({message:'Extension no valida y archivo no borrado'})
                }
                else{
                    res.status(200).send({message:'Extension no valida'})
                }
            })
            res.status(200).send({message:'Extension no valida'})
        }
    }
    else{
        res.status(200).send({message:'no selecciono IMG'})
    }
}

function getFoto(req,res){
    var name=req.params.name
    var ruta='./uploads/avatar/'+name
    
    fs.exists(ruta,function(exists){
        if(exists){
            res.sendFile(path.resolve(ruta))
        }else{
            res.status(404).send({message:'No existe la img',ruta:ruta})
        }
    })
}

module.exports={
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    insertUser,
    findByLog,
    uploadimg,
    getFoto
}