const db = require('../../DB/mysql')

const TABLE = 'clients'

function get(){
    return db.get(TABLE)
}

function getOnlyOne(id){
    return db.getOnlyOne(TABLE, id)
}

module.exports = {
    get,
    getOnlyOne
}