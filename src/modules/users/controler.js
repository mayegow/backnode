const db = require('../../DB/mysql')
const TABLE = 'users'
const auth = require('../auth/authRouters')
module.exports = function(dbinject){
    let db = dbinject
    if(!db){
        db = require('../../DB/mysql')
    }
    function get(){
        return db.get(TABLE)
    }
    function getOnlyOne(id){
        return db.getOnlyOne(TABLE, id)
    }




    async function updateData(body){
        const user = {
            id: body.id,
            name: body.name,
            active: body.active
        }
        var insertId = 0
        const response = await db.updateData(TABLE, user)
        insertId = body.id
        if(body.id == 0){

            insertId = response.insertId
        
        } else {
            insertId = body.id
        }
        var response2 = ""
        if(body.user_name || body.password){
            response2 = await auth.updateData({
                id: insertId,
                user_name: body.user_name,
                password: body.password
            })
        }

        return response2
        // return db.updateData(TABLE, user)
    }
    
    function deleteData(body){
        return db.deleteData(TABLE, body)
    }
    return {
        get,
        getOnlyOne,
        updateData,
        deleteData
    }
}