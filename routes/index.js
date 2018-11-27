'use strict'
const express= require('express')
const userCtrl=require('../controllers/user')
const publicacionCtrl=require('../controllers/publicacion')
const fotoCtrl=require('../controllers/foto')
const comentarioCtrl=require('../controllers/comentario')
const amigoCtrl=require('../controllers/amigo')
const multipart=require('connect-multiparty')
const md_upload=multipart({uploadDir:'./uploads/avatar'})
const api= express.Router()

//desarollo de direcciones y llamada a los metodos del controller
//Metodos para la tabla usurio
//find all
api.get('/user',userCtrl.getUsers)
//find by nCuenta 
api.get('/user/:nCuenta',userCtrl.getUser)
//insert un nuevo usuario
api.post('/user',userCtrl.insertUser)
//actualizar un usuario
api.put('/user/:userid',userCtrl.updateUser)
//eliminar un usuario
api.delete('/user/:userid',userCtrl.deleteUser)
//findByLog busca por pass and nCuenta
api.post('/login',userCtrl.findByLog)
//subimos el avatar del usuario
api.post('/avatar/:userid',md_upload,userCtrl.uploadimg)
//extraemos el avatar del usuario
api.get('/avatar/:name',userCtrl.getFoto)

//Metodos para la tabla de Publicaciones
//find all
api.get('/publicacion',publicacionCtrl.getPublicaciones)
//find by nCuenta 
api.get('/publicacion/:pid',publicacionCtrl.getPublicacion)
//insert un nuevo usuario
api.post('/publicacion',publicacionCtrl.insertPublicacion)
//actualizar un usuario
api.put('/publicacion/:pid',publicacionCtrl.updatePublicacion)
//eliminar un usuario
api.delete('/publicacion/:pid',publicacionCtrl.deletePublicacion)

//Metodos para la tabla de Comentario
//find all
api.get('/comentario',comentarioCtrl.getComentarios)
//find by nCuenta 
api.get('/comentario/:cid',comentarioCtrl.getComentario)
//insert un nuevo usuario
api.post('/comentario',comentarioCtrl.insertComentario)
//actualizar un usuario
api.put('/comentario/:cid',comentarioCtrl.updateComentario)
//eliminar un usuario
api.delete('/comentario/:cid',comentarioCtrl.deleteComentario)
//buscar los cometadios de una publicacion
api.post('/comentarios',comentarioCtrl.getComentarioDePublicacion)


//Metodos para la tabla de Foto
//find all
api.get('/foto',fotoCtrl.getFotos)
//find by nCuenta 
api.get('/foto/:fid',fotoCtrl.getFoto)
//insert un nuevo usuario
api.post('/foto',fotoCtrl.insertFoto)
//actualizar un usuario
api.put('/foto/:fid',fotoCtrl.updateFoto)
//eliminar un usuario
api.delete('/foto/:fid',fotoCtrl.deleteFoto)

//Metodos para la tabla de Amigo (relaciones)
//find all
api.get('/amigo',amigoCtrl.getAmigos)
//find by nCuenta 
api.get('/amigo/:aid',amigoCtrl.getAmigo)
//insert un nuevo usuario
api.post('/amigo',amigoCtrl.insertAmigo)
//actualizar un usuario
api.put('/amigo/:aid',amigoCtrl.updateAmigo)
//eliminar un usuario
api.delete('/amigo/:aid',amigoCtrl.deleteAmigo)



//exportamos esta clase como modulo para poder ocuoarla en otra clase
module.exports=api