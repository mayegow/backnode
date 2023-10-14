const express = require('express')

const responses = require('../../red/responses')

const controler = require('./controler')
// const { updateData } = require('../../DB/mysql')

const router = express.Router()

router.get('/', get)
router.get('/:id', getOnlyOne)
router.post('/', updateData)
router.put('/', deleteData)

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
        const gets = await controler.deleteData(req.body)
        responses.success(req, res, "Delete item success", 200)
    } catch(err){
        next(err)
    }
}

module.exports = router