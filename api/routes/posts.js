const express = require('express')
const mongoose = require('mongoose')
const moment = require('moment')
const route = express.Router();
const Post = require('../models/post')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
})
const fileFilter = (req, file, cb ) => {
      if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true)
      } else {
          cb(null, false)
      }
}
const upload = multer({ 
        storage : storage, 
        limits : { fileSize : 1024 * 1024 * 5 },
        fileFilter : fileFilter
})


route.get('/', async(req, res, next) => {

    try {
            const posts = await Post.find()
            if(posts.length > 0){
                res.status(200).json({
                message : "ALL POSTS FETCHED SUCCESSFULLY",
                count : posts.length,
                posts 
            })
            }else {
                res.status(404).json({
                    message : "NO POSTS FOUND "})
            }
    }catch(error){
            res.status(500).json({
                message : "Something went wrong",
                error : error.message})
            }
})
route.get('/:postId', async(req, res, next) => {

    const postId = req.params.postId
    try {
            const post = await  Post.findById(postId)
            if(post){
                    res.status(200).json({
                        message : "POST SUCCESSFULLY FETCHED",
                        post })
            }else {
                res.status(404).json({
                    message : "No Valid entry found for provided Id"})
            }
    }catch(error){
            res.status(500).json({
                message : "AN ERROR OCCURED",
                error : error.message})
            }
})
route.post('/', upload.single('postImage'), async(req, res, next) => {

    const { title,country, author,content,likes, comments } = req.body
    const _id =  new mongoose.Types.ObjectId()
    let date = moment().format("MMM Do YY")

    const post = new Post({
        _id,title,country,author,content,date,likes, comments, postImage : req.file.path
    }) 
    try {
            const newPost = await post.save()
            res.json({
                message : "newPCREATED",
                createdPost : newPost,
                request : {
                    type : 'GET',
                    url : `localhost:8080/posts/${newPost._id}`} 
                    
            })
    }catch(error){
            res.status(500).json({
                message : "AN ERROR OCCURED",
                error : error.message });
    }
})
route.patch('/:postId', async(req, res, next) => {

    const postId = req.params.postId
    const props = req.body

    try {
            const post = await Post.update({_id : postId}, props)
            res.status(200).json({
                messgae : "POST SUCCESSFULLY UPDATED",
                post,
                request : {
                    type : 'GET',
                    url : `localhost:8080/posts/${post._id}`
                }
            })
    }catch(error){
            res.status(500).json({
                message : "AN ERROR OCCURED",
                error : error.message
            })
    }
})
route.delete('/:postId', async(req, res, next) => {

    const postId = req.params.postId
    try {
            const post = await Post.findByIdAndDelete({_id : postId})
            if(post){
                res.status(200).json({
                    message : "POST SUCCESSFULLY DELETED",
                    post,
                    request : {
                        type : 'CREATE POST',
                        url : `localhost:8080/posts/${post._id}`}
                })
            }else {
                res.status(404).json({
                    message : "NO POST FOUND" })
            }
    }catch(error){
            res.status(500).json({
                message : "AN ERROR OCCURED",
                error : error.message})
            }
})

module.exports =  route