const mongoose = require('mongoose')
const userSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId ,
    username: {type : String, required : true},
    password: {type : String, required : true},
    picture: {type : String, required : true},
    country: {type : String, required : true},
    age: Number,
    name: {type : String, required : true},
    gender: {type : String, required : true},
    company: {type : String, required : true},
    email: {
        type : String, 
        required : true, 
        unique : true,
        match : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
    },
    phone: {type : String, required : true},
    address: {type : String, required : true},
    about: {type : String, required : true},
    registered: {type : String, required : true},
    info: {
        overview : {type : String, required : true},
        experience :{type : String, required : true},
    },
    education:{type : String, required : true},
    skills: [String],
    portfolio: [String],
    socialmedialink: [String],
  })


module.exports = mongoose.model('User', userSchema)