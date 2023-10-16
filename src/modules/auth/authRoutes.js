const express = require('express')

const responses = require('../../red/responses')

const controler = require('./index')
// const { updateData } = require('../../DB/mysql')

const router = express.Router()

router.post('/login', login)

async function login(req, res, next){
    try{
        const token = await controler.login(req.body.user_name, req.body.password)
        responses.success(req, res, token, 200)
    } catch(err){
        next(err)
    }

}


module.exports = router