const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,
    title: {type : String},
    country: {type : String},
    author: {type : String},
    content: {type : String},
    email : { type : String},
    date: String,
    likes: Number,
    postImage: {type : String},
    comments: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment"
    }]
})

module.exports = mongoose.model('Post', postSchema)  