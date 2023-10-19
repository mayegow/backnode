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
    
    function addData(body){
        return db.addData(TABLE, body)
    }

    function updateData(body){
        return db.updateData(TABLE, body)
    }
    
    function deleteData(id){
        return db.deleteData(TABLE, id)
    }
    return {
        get,
        getOnlyOne,
        addData,
        updateData,
        deleteData
    }
}