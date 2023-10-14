const db = require('../../DB/mysql')

const TABLE = 'clients'

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

module.exports = {
    get,
    getOnlyOne,
    updateData,
    deleteData
}