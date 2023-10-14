const express = require('express')

const responses = require('../../red/responses')

const controler = require('./controler')

const router = express.Router()

router.get('/', async function(req, res){
    const gets = await controler.get().then((items)=>{
        responses.success(req, res, items, 200)
    })
})

router.get('/:id', async function(req, res){
    try{
        const gets = await controler.getOnlyOne(req.params.id).then((items)=>{
            responses.success(req, res, items, 200)
        })

    } catch(err){
        responses.error(req, res, err, 500)
    }
})

module.exports = router