const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Company = require('../models/company')


route.get('/', (req, res, next) => {

    Company.find()
        .select('email company phone about info skills portfolio socialmedialink')
        .then(companys => {
            res.status(200).json({ 
                message : "companyS LISTS", 
                companys
            })
        })
        .catch(error =>{
            res.status(500).json({
                message : "AN ERROR OCCURED",
                error : error.message})
        
        })
})
route.get('/:companyId', (req, res, next) => {
    Company.findById({_id : req.params.companyId})
        .select('picture country name company email phone about education socialmedialink portfolio skills info')
        .then(company => {
            if(company){
                    res.status(200).json({
                        message : "COMPANY SUCCESSFULLY FETCHED",
                        company })
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

    let { company, password, picture, country, createdAt, email, phone, address, about, skills,portfolio,socialmedialink, info , total_number_employee} = req.body
    const { overview, awards } = info
    const  _id = new mongoose.Types.ObjectId() 

    Company.find({email : email})
        .then(existingCompany => {
            if(existingCompany.length >= 1){
                return res.status(409).json({
                    message : "EMAIL EXISTS"
                })
            }else{
                bcrypt.hash(password, 10)
                   .then(hashedPassword => {
                        password = hashedPassword

                        const newCompany = new Company({
                            _id , company,picture,country,createdAt,company,email,phone,address,about,
                            registered : Date.now(),
                            info: { overview, awards},
                            skills,
                            portfolio,
                            socialmedialink,
                            total_number_employee,
                            password
                        })
                        newCompany.save()
                        .then(company => {
                            res.json({
                                message : "COMPANY CREATED",
                                createdCompany : company,
                                request : {
                                    type : 'GET',
                                    url : `localhost:8080/company/${company._id}`
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
 
    Company.find({email : req.body.email})
    .then(company => {
        let companyPassword = company[0].password
        if(company.length < 1){
            res.status(404).json({
                message : " INVALID EMAIL OR PASSWORD "
            })
        }
        else{
            bcrypt.compare(req.body.password, companyPassword)
                  .then(result => {
                      console.log(result)
                      if(result){
                        res.status(200).json({
                            message : "SUCCESSFULLY LOGGED IN",
                            company
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
route.patch('/:companyId', (req, res, next ) => {
    const companyId = req.params.companyId
    const props = req.body
    Company.update({_id : companyId}, props)
            .then(company => {
                res.status(200).json({
                    messgae : "COMPANY SUCCESSFULLY UPDATED",
                    company,
                    request : {
                        type : 'GET',
                        url : `localhost:8080/company/${company._id}`
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
route.delete('/:companyId',(req, res, next) => {

    const companyId = req.params.companyId

    Company.remove({_id : companyId})
        .then(result => {
            res.status(200).json({
                message : "COMPANY SUCCESSFULLY DELETED",
                result,
                request : {
                    type : 'CREATE COMPANY',
                    url : `localhost:8080/company/`
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