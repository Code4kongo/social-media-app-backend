const mongoose = require('mongoose')

const postSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    title: {type : String, required : true},
    country: {type : String, required : true},
    author: {type : String, required : true},
    content: {type : String, required : true},
    date: String,
    likes: Number,
    comments: [String],
    postImage: {type : String, required : true}

})

module.exports = mongoose.model('Post', postSchema)