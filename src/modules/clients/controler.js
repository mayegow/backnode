const db = require('../../DB/mysql')

const TABLE = 'clients'


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
    
    function updateData(body){
        return db.updateData(TABLE, body)
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