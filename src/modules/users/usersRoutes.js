const express = require('express')

const secureToken = require('./security')

const responses = require('../../red/responses')

const controler = require('./index')
// const { updateData } = require('../../DB/mysql')

const router = express.Router()

router.get('/', get)
router.get('/:id', getOnlyOne)
router.post('/', addData)
router.patch('/', secureToken(), updateData)
router.put('/', secureToken(), deleteData)

async function get(req, res, next){
    try{
        const gets = await controler.get().then((items)=>{
            responses.success(req, res, items, 200)
        })
    } catch(err){
        next(err)
    }
}

async function getOnlyOne(req, res, next){
    try{
        const gets = await controler.getOnlyOne(req.params.id).then((items)=>{
            responses.success(req, res, items, 200)
        })
    } catch(err){
        next(err)

    }
}

async function addData(req, res, next){
    try{
        const items = await controler.addData(req.body)
        
        var message = 'Save Item successfully'
        
        responses.success(req, res, message, 201)
    } catch(err){
        next(err)
    }
}
async function updateData(req, res, next){
    try{
        const items = await controler.updateData(req.body)
        var message = 'Updated Item Successfully'
        
        responses.success(req, res, message, 201)
    } catch(err){
        next(err)
    }
}

async function deleteData(req, res, next){
    try{
        const gets = await controler.deleteData(req.body)
        responses.success(req, res, "Delete item success", 200)
    } catch(err){
        next(err)
    }
}

module.exports = router