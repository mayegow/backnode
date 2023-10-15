const express = require('express')

const responses = require('../../red/responses')

const controler = require('./index')
// const { updateData } = require('../../DB/mysql')

const router = express.Router()

router.get('/login', login)
// router.get('/:id', getOnlyOne)
// router.post('/', updateData)
// router.put('/', deleteData)

async function login(req, res, next){
    try{
        const token = await controler.login(req.body.user_name, req.body.passsword)
        responses.success(req, res, token, 200)
        
    } catch(err){
        next(err)
    }
}


module.exports = router