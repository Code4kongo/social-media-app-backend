const mongoose = require('mongoose')
const companySchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId ,
    company: {type : String, required : true},
    password: {type : String, required : true},
    picture: {type : String, required : true},
    country: {type : String, required : true},
    createdAt : {type : String, required : true},
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
    total_number_employee : Number,
    info: {
        overview : {type : String, required : true},
        awards : [String],
    },
    skills: [String],
    portfolio: [String],
    socialmedialink: [String],    
  })


module.exports = mongoose.model('Company', companySchema)