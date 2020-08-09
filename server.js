const express = require('express')
const path = require('path')
require('dotenv').config()
const morgan = require('morgan')
const bodyParser = require('body-parser')

require('./api/database/mongoosedb')

const app = express()
const port = process.env.PORT || 8080

const postsRoutes = require('./api/routes/posts')
const jobsRoutes = require('./api/routes/jobs')
const userRoutes = require('./api/routes/user')
const companyRoutes = require('./api/routes/company')
const commentsRoutes = require('./api/routes/comment')
const emailRoutes = require('./api/routes/email')

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', '*')
        return res.status(200).json({})
    }
    next()
})

app.use('/uploads/posts',express.static('uploads/posts'))
app.use('/uploads/user-profil',express.static('uploads/user-profil'))
app.use('/uploads/company-profil',express.static('uploads/company-profil'))
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

// app.use(morgan("dev"))
app.use('/posts', postsRoutes)
app.use('/jobs', jobsRoutes)
app.use('/user', userRoutes)
app.use('/company', companyRoutes)
app.use('/comments', commentsRoutes)
app.use('/', emailRoutes)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (res, req) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build' , 'index.html'))
    })
}



app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500 ).json({
        error : {
            message : error.message
        }
    })
})


app.listen(port, () => {
    console.log(`Your server is running on port ${port}`)
})

