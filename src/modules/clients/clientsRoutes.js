const express = require('express')

const responses = require('../../red/responses')

const controler = require('./index')
// const { updateData } = require('../../DB/mysql')

const router = express.Router()

router.get('/', get)
router.get('/:id', getOnlyOne)
router.patch('/', updateData)
router.post('/', addData)
router.delete('/:id', deleteData)

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
        if (req.body.id == 0){
           var message = 'Save Item successfully'
        } else {
           var message = 'Updated Item Successfully'
        }
        responses.success(req, res, message, 201)
    } catch(err){
        next(err)
    }
}

async function deleteData(req, res, next){
    try{
        const gets = await controler.deleteData(req.params.id)
        console.log("routes-body: ",req.body)
        console.log("routes: ",req.body.id)
        responses.success(req, res, "Delete item success", 200)
    } catch(err){
        next(err)
    }
}

module.exports = router