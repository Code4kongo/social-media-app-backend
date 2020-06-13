const mongoose = require('mongoose');
const Post = require('../models/post')
const Job = require('../models/jobs')
const User = require('../models/user')
const Company = require('../models/company')
const Comment = require('../models/comments')

// const dbName = 'social-media-app'

mongoose.connect(`mongodb://127.0.0.1:27017/db`, { useNewUrlParser: true, useUnifiedTopology : true } );

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
    console.log("connection to db open")
});