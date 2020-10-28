const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bycrypt = require('bcrypt')

const User = require('../model/User')
users.use(cors())

process.env.SECRET_KEY = 'secret'

//register
users.post('/register', (req,res)=> {

    const userData = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        password: req.body.password
    }

    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user=> {
            if(!user){
                const hash = bycrypt.hashSync(userData.password, 10)
                userData.password = hash
                User.create(userData)
                .then( user => {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY,{
                        expiresIn:1440
                    })
                    res.json({ token : token })
                })
                .catch( err=>{
                    res.send('error 50555' + error)
                })
            }else{
                res.json({ error:'User already exists!' })
            }  
            })
        .catch(err=>{
            res.send('error' + error)
        })
})

//profile
users.get('/profile', (req, res)=> {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    users.findOne({
        where:{
            id: decode.id
        }
    })
        .then(user=> {
            if(user) {
                res.json(user)
            }else{
                res.send('User does not exist!')
            }
        })
        .catch(err=> {
            res.send('error: ' + err)
        })
})

module.exports = users

