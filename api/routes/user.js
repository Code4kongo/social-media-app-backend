const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')

route.get('/', async(req, res, next) => {

    try {
            const users = await User.find().select('email name company phone about education info skills portfolio socialmedialink')
            res.status(200).json({ 
                message : "USERS LISTS", 
                users
            })
    }catch(error){
            res.status(500).json({
                message : "AN ERROR OCCURED",
                error : error.message})
            }
})
route.get('/:userId', (req, res, next) => {
    User.findById({_id : req.params.userId})
        .select('picture country name company email phone about education socialmedialink portfolio skills info')
        .then(user => {
            if(user){
                    res.status(200).json({
                        message : "USER SUCCESSFULLY FETCHED",
                        user })
            }else {
                res.status(404).json({
                    message : "No Valid entry found for provided Id"})
            } })
        .catch(error => {
            res.status(500).json({
                message : "AN ERROR OCCURED",
                error : error.message})
        })
})
route.post('/signup',(req, res, next) => {

    let { username, password, picture, country, age, name, gender, company, email, phone, address, about, education, skills,portfolio,socialmedialink, info } = req.body
    const { overview, experience } = info
    const  _id = new mongoose.Types.ObjectId() 

    User.find({email : email})
        .then(existingUser => {
            if(existingUser.length >= 1){
                return res.status(409).json({
                    message : "EMAIL EXISTS"
                })
            }else{
                bcrypt.hash(password, 10)
                   .then(hashedPassword => {
                        password = hashedPassword

                        const user = new User({
                            _id , username,picture,country,age,name,gender,company,email,phone,address,about,
                            registered : Date.now(),
                            info: { overview, experience},
                            education,
                            skills,
                            portfolio,
                            socialmedialink,
                            password
                        })
                        user.save()
                        .then(user => {
                            res.json({
                                message : "USER CREATED",
                                createduser : user,
                                request : {
                                    type : 'GET',
                                    url : `localhost:8080/users/${user._id}`
                                } 
                            })
                        })
            })
        }})
        .catch(error => {
            res.status(500).json({
                message : "AN ERROR OCCURED",
                error : error.message
             });

        })
        
})
route.post('/login', (req, res, next ) => {
 
    User.find({email : req.body.email})
    .then(user => {
        let userPassword = user[0].password
        if(user.length < 1){
            res.status(404).json({
                message : " INVALID EMAIL OR PASSWORD "
            })
        }
        else{
            bcrypt.compare(req.body.password, userPassword)
                  .then(result => {
                      console.log(result)
                      if(result){
                        res.status(200).json({
                            message : "SUCCESSFULLY LOGGED IN",
                            user
                        })
                      }
                      else{
                        res.status(400).json({
                            message : "AUTHENTICATION FAILED !"
                        })
                      }
                  })
        }
    })
    .catch(error =>{
        res.status(500).json({
            message : "AN ERROR OCCURED",
            error : error.message})
    
    })
})
route.patch('/:userId', (req, res, next ) => {
    const userId = req.params.userId
    const props = req.body
    User.update({_id : userId}, props)
            .then(user => {
                res.status(200).json({
                    messgae : "USER SUCCESSFULLY UPDATED",
                    user,
                    request : {
                        type : 'GET',
                        url : `localhost:8080/user/${user._id}`
                    }
                })
            })
            .catch(error => {
                res.status(500).json({
                    message : "AN ERROR OCCURED",
                    error : error.message
                })
           })
})
route.delete('/:userId',(req, res, next) => {

    const userId = req.params.userId

    User.remove({_id : userId})
        .then(result => {
            res.status(200).json({
                message : "USER SUCCESSFULLY DELETED",
                result,
                request : {
                    type : 'CREATE USER',
                    url : `localhost:8080/user/`
                }
            })
        })
        .catch(error => {
            res.status(500).json({
                message : "AN ERROR OCCURED",
                error : error.message
            })

        })
})



module.exports = route